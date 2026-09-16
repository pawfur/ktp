/**
 * Wysyłka danych do Supabase.
 *
 * Zasady, które ten moduł musi spełniać:
 *  1. Kierunek jest JEDEN: telefon wysyła, chmura przyjmuje. Moduł nigdy nie
 *     usuwa ani nie nadpisuje danych lokalnych.
 *  2. Z CHMURY NIC NIGDY NIE ZNIKA. Ten moduł nie wykonuje żadnych zapytań
 *     DELETE. Usunięcie pozycji w aplikacji wysyła ten sam wiersz ze
 *     znacznikiem `deleted` (a zamówienia ze `status` = 'deleted').
 *  3. Nic nie ginie po cichu: zaległe wiersze są ponawiane po odzyskaniu
 *     sieci, po powrocie do aplikacji i cyklicznie, a licznik zaległości
 *     jest widoczny dla użytkownika.
 *  4. Nie blokuje interfejsu. `notifyChange` tylko ustawia licznik czasu,
 *     a sama wysyłka leci w tle.
 *  5. Kiedy sieci nie ma, nie próbuje w ogóle - nie zużywa baterii, ale
 *     zapamiętuje, że ma co wysłać.
 *  6. Jeden błędny wiersz nie blokuje reszty: po błędzie partii wiersze są
 *     ponawiane pojedynczo, a odrzucone trafiają na listę z powodem.
 *  7. Każdy wiersz niesie `user_name` - nazwę użytkownika z Ustawień, żeby
 *     w raportach było widać, z którego telefonu przyszły dane.
 */
(function () {
  const CONFIG = window.KedaiSupabaseConfig || {};
  const TABLES = CONFIG.tables || {};

  // Nazwy kluczy zależą od środowiska (config/env.js). Wydanie OFICJALNE -
  // czyli to na telefonie lokalu - zostaje przy dotychczasowych nazwach, więc
  // nic nie wymaga migracji i nie grozi utratą nagrobków. Sufiks `_test`
  // dostaje tylko wydanie testowe, dzięki czemu obie aplikacje mogą mieszkać
  // w tej samej przeglądarce, nie widząc nawzajem swoich sesji, odcisków,
  // nagrobków ani kolejki odrzuconych wierszy.
  const ENV = window.KedaiEnv || { key: name => name };

  const SESSION_KEY = ENV.key('kedai_pos_supabase_session');
  const DEVICE_KEY = ENV.key('kedai_pos_device_id');
  const USER_NAME_KEY = ENV.key('kedai_pos_user_name');
  const SYNCED_PREFIX = ENV.key('kedai_pos_synced_');
  const TOMBSTONE_PREFIX = ENV.key('kedai_pos_deleted_');
  const FAILED_PREFIX = ENV.key('kedai_pos_sync_failed_');
  const STATUS_KEY = ENV.key('kedai_pos_sync_status');

  const MAX_ATTEMPTS = 3;
  const DEBOUNCE_MS = 2000;
  const RETRY_DELAY_MS = 6000;
  const MAX_RETRY_DELAY_MS = 120000;
  const SWEEP_MS = 60000;
  const FAILED_RETRY_MS = 300000;
  const KEEPALIVE_LIMIT = 60000;
  const NAME_MAX_LENGTH = 60;
  /**
   * Znacznik w rejestrze wysyłki: ten wiersz jest w chmurze oznaczony jako
   * usunięty. Dzięki niemu odtworzenie starej kopii na telefonie nie potrafi
   * już „odmrozić” skasowanego zamówienia.
   */
  const DELETED_MARK = '#deleted';

  const TABLE_LIST = [
    ['menu', TABLES.menu || 'menu_items'],
    ['ingredients', TABLES.ingredients || 'ingredients'],
    ['clientOrders', TABLES.clientOrders || 'client_orders'],
    ['purchaseOrders', TABLES.purchaseOrders || 'purchase_orders']
  ];

  let pendingTimer = null;
  let sweepTimer = null;
  let listenersReady = false;
  let inFlight = false;
  let latestState = null;
  let revision = 0;
  let pendingCache = { key: null, value: 0 };
  let status = { code: 'idle', detail: '', at: null, lastOkAt: null, pending: 0, failed: 0 };

  function readStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function writeStorage(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.warn('Nie udało się zapisać w pamięci lokalnej:', key);
    }
  }

  function isConfigured() {
    return Boolean(CONFIG.url && CONFIG.anonKey);
  }

  /* ------------------------------------------------------------------ nazwa */

  function getUserName() {
    return readStorage(USER_NAME_KEY) || '';
  }

  function setUserName(value) {
    const clean = String(value || '').trim().replace(/\s+/g, ' ').slice(0, NAME_MAX_LENGTH);
    writeStorage(USER_NAME_KEY, clean);
    return clean;
  }

  /**
   * Stały identyfikator tego telefonu. Bez niego, po skasowaniu danych
   * aplikacji identyfikatory zamówień zaczynają się od nowa i nowe zamówienie
   * numer 1 nadpisałoby w chmurze dawne zamówienie numer 1.
   */
  function getDeviceId() {
    let id = readStorage(DEVICE_KEY);
    if (!id) {
      id = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `dev_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      writeStorage(DEVICE_KEY, id);
    }
    return id;
  }

  /* ------------------------------------------------------------------- HTTP */

  async function request(url, options = {}) {
    const { method = 'GET', body, accessToken, prefer, keepalive } = options;
    const headers = { apikey: CONFIG.anonKey, 'Content-Type': 'application/json' };
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
    if (prefer) headers.Prefer = prefer;

    const serialized = body === undefined ? undefined : JSON.stringify(body);
    const init = {
      method,
      headers,
      body: serialized,
      cache: 'no-store'
    };
    // `keepalive` pozwala dokończyć wysyłkę, gdy karta jest właśnie zamykana.
    // Przeglądarki mają na to limit rozmiaru, dlatego używamy go tylko dla
    // małych paczek.
    if (keepalive && serialized && serialized.length < KEEPALIVE_LIMIT) {
      init.keepalive = true;
    }

    const response = await fetch(url, init);

    const text = await response.text();
    let payload = null;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch (error) {
        payload = null;
      }
    }

    if (!response.ok) {
      const error = new Error(payload?.msg || payload?.message || `HTTP ${response.status}`);
      error.status = response.status;
      // GoTrue zwraca kod błędu w `error_code`, a PostgREST w tekstowym `code`.
      // Liczbowe `code` to tylko numer HTTP, więc go pomijamy.
      error.code = payload?.error_code
        || (typeof payload?.code === 'string' ? payload.code : '')
        || '';
      throw error;
    }
    return payload;
  }

  /* ------------------------------------------------------------------- sesja */

  function getSession() {
    const raw = readStorage(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (error) {
      return null;
    }
  }

  function isSignedIn() {
    return Boolean(getSession()?.refresh_token);
  }

  function clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      // Brak sesji to nie problem - aplikacja działa dalej lokalnie.
    }
  }

  function storeToken(data, email) {
    const session = {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_at: Date.now() + Number(data.expires_in || 3600) * 1000,
      email: data.user?.email || email || getSession()?.email || ''
    };
    writeStorage(SESSION_KEY, JSON.stringify(session));
    return session;
  }

  async function signIn(email, password) {
    const data = await request(`${CONFIG.url}/auth/v1/token?grant_type=password`, {
      method: 'POST',
      body: { email: String(email || '').trim(), password: String(password || '') }
    });
    return storeToken(data, email);
  }

  function signOut() {
    clearSession();
    if (pendingTimer) {
      clearTimeout(pendingTimer);
      pendingTimer = null;
    }
    setStatus('signed-out');
  }

  /** Zwraca aktualny token, w razie potrzeby odnawiając sesję. */
  async function getAccessToken() {
    const session = getSession();
    if (!session?.refresh_token) return null;

    if (session.access_token && session.expires_at && session.expires_at - 60000 > Date.now()) {
      return session.access_token;
    }

    try {
      const data = await request(`${CONFIG.url}/auth/v1/token?grant_type=refresh_token`, {
        method: 'POST',
        body: { refresh_token: session.refresh_token }
      });
      return storeToken(data, session.email).access_token;
    } catch (error) {
      // Token odrzucony - trzeba zalogować się ponownie.
      clearSession();
      setStatus('session-expired', describe(error));
      return null;
    }
  }

  /* ------------------------------------------------------------- mapowanie */

  function buildMeta() {
    return {
      deviceId: getDeviceId(),
      userName: getUserName(),
      now: new Date().toISOString()
    };
  }

  /**
   * Krótki odcisk treści wiersza. Pozwala poznać, co się zmieniło, bez
   * tworzenia i porównywania pełnych obiektów.
   */
  function fingerprintOf(parts) {
    const text = parts.join('|');
    let hash = 5381;
    for (let index = 0; index < text.length; index += 1) {
      hash = ((hash * 33) ^ text.charCodeAt(index)) >>> 0;
    }
    return hash.toString(36);
  }

  function readSynced(name) {
    const raw = readStorage(SYNCED_PREFIX + name);
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function writeSynced(name, map) {
    writeStorage(SYNCED_PREFIX + name, JSON.stringify(map));
  }

  /**
   * Nagrobki: wiersze usunięte w aplikacji, które trzeba jeszcze raz wysłać
   * do chmury ze znacznikiem `deleted`. Trzymamy je, dopóki chmura nie
   * potwierdzi zmiany - inaczej usunięcie przepadłoby po zamknięciu aplikacji.
   */
  function readTombstones(name) {
    const raw = readStorage(TOMBSTONE_PREFIX + name);
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function writeTombstones(name, map) {
    writeStorage(TOMBSTONE_PREFIX + name, JSON.stringify(map));
  }

  /** Wiersze odrzucone przez chmurę - z powodem, żeby problem był widoczny. */
  function readFailed(name) {
    const raw = readStorage(FAILED_PREFIX + name);
    if (!raw) return {};
    try {
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? parsed : {};
    } catch (error) {
      return {};
    }
  }

  function writeFailed(name, map) {
    writeStorage(FAILED_PREFIX + name, JSON.stringify(map));
  }

  function totalFailed() {
    return TABLE_LIST.reduce((sum, [name]) => sum + Object.keys(readFailed(name)).length, 0);
  }

  /**
   * Wiersz odrzucony przez chmurę nie jest ponawiany w kółko (to obciążałoby
   * telefon), ale po FAILED_RETRY_MS wraca do kolejki - gdyby problem zniknął.
   */
  function isBlocked(name, identity) {
    const entry = readFailed(name)[identity];
    if (!entry) return false;
    return Date.now() - Number(entry.at || 0) < FAILED_RETRY_MS;
  }

  function noteFailure(name, identity, detail) {
    const failed = readFailed(name);
    failed[identity] = { detail, at: Date.now() };
    writeFailed(name, failed);
    invalidatePending();
  }

  function clearFailure(name, identity) {
    const failed = readFailed(name);
    if (!(identity in failed)) return;
    delete failed[identity];
    writeFailed(name, failed);
    invalidatePending();
  }

  /** Czyści zapamiętane odciski, żeby następna wysyłka poszła w całości. */
  function forgetSynced() {
    TABLE_LIST.forEach(([name]) => {
      try {
        localStorage.removeItem(SYNCED_PREFIX + name);
        localStorage.removeItem(FAILED_PREFIX + name);
      } catch (error) {
        // Brak wpisu to nie problem.
      }
    });
    invalidatePending();
  }

  /**
   * Krótki opis zawartości zamówienia. Bez niego zmiana pozycji przy
   * niezmienionej sumie byłaby dla porównywania odcisków niewidoczna.
   */
  function itemsSignature(items) {
    if (!Array.isArray(items) || !items.length) return '0';
    return items
      .map(item => [
        item.productId || item.meal_id || item.name || '',
        Number(item.qty ?? item.quantity ?? 0),
        Number(item.price ?? item.unit_price ?? 0)
      ].join(':'))
      .join(',');
  }

  /** Liczba albo null. `Number(null)` daje 0, więc nie da się tego sprawdzić skrótowo. */
  function nullableNumber(value) {
    if (value === null || value === undefined || value === '') return null;
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  /** Krótki opis zużycia magazynu - zmiana ilości albo ceny musi być widoczna dla odcisku. */
  function costSignature(items) {
    if (!Array.isArray(items)) return '';
    return items
      .map(entry => [
        entry.id || entry.name || '',
        Number(entry.amount ?? 0),
        Number(entry.unit_price ?? 0)
      ].join(':'))
      .join(',');
  }

  /** Krótki opis receptury - bez niego zmiana składników byłaby niewidoczna. */
  function recipeSignature(recipe) {
    if (!Array.isArray(recipe) || !recipe.length) return '0';
    return recipe
      .map(entry => `${entry.id}:${Number(entry.qty || 0)}`)
      .join(',');
  }

  function orderTimestamp(order) {
    return order.date || order.createdAt || '';
  }

  /**
   * Opisuje, co i jak wysyłać. `identity` to nazwa wiersza po stronie bazy,
   * `fingerprint` - odcisk treści, a `row` - gotowy wiersz do wysłania.
   */
  function buildPlan(state, meta) {
    return [
      {
        name: 'menu',
        table: TABLES.menu || 'menu_items',
        entries: (state.menu || []).map((item, index) => ({ item, index })),
        identity: entry => String(entry.item.id),
        fingerprint: entry => fingerprintOf([
          meta.userName,
          entry.item.name,
          entry.item.price,
          entry.item.type === 'section' ? 'section' : 'product',
          entry.item.order ?? entry.index,
          entry.item.deleted === true ? 'deleted' : 'active',
          entry.item.visible === false ? 'hidden' : 'visible',
          entry.item.color ?? '',
          recipeSignature(entry.item.recipe)
        ]),
        row: entry => ({
          device_id: meta.deviceId,
          local_id: String(entry.item.id),
          name: String(entry.item.name || ''),
          price: Number(entry.item.price || 0),
          type: entry.item.type === 'section' ? 'section' : 'product',
          sort_order: Number.isFinite(Number(entry.item.order)) ? Number(entry.item.order) : entry.index,
          user_name: meta.userName,
          visible: entry.item.visible !== false,
          color: Number.isFinite(Number(entry.item.color)) && entry.item.color !== null ? Math.round(Number(entry.item.color)) : null,
          recipe: Array.isArray(entry.item.recipe) ? entry.item.recipe : [],
          deleted: entry.item.deleted === true,
          deleted_at: entry.item.deleted_at || null,
          updated_at: meta.now
        })
      },
      {
        name: 'ingredients',
        table: TABLES.ingredients || 'ingredients',
        entries: (state.ingredients || []).map(item => ({ item })),
        identity: entry => String(entry.item.id),
        fingerprint: entry => fingerprintOf([
          meta.userName,
          entry.item.name,
          entry.item.unit,
          entry.item.stock,
          entry.item.unit_price,
          entry.item.min_stock,
          entry.item.target_stock,
          entry.item.min_order_quantity,
          entry.item.unit_step,
          entry.item.type === 'section' ? 'section' : 'product',
          entry.item.color ?? '',
          entry.item.sort_order,
          entry.item.deleted === true ? 'deleted' : 'active'
        ]),
        row: entry => ({
          device_id: meta.deviceId,
          local_id: String(entry.item.id),
          name: String(entry.item.name || ''),
          unit: String(entry.item.unit || ''),
          stock: Number(entry.item.stock || 0),
          unit_price: Number(entry.item.unit_price || 0),
          min_stock: Number(entry.item.min_stock || 0),
          target_stock: Number(entry.item.target_stock || 0),
          min_order_quantity: Number(entry.item.min_order_quantity || 0),
          unit_step: Number(entry.item.unit_step || 0),
          type: entry.item.type === 'section' ? 'section' : 'product',
          color: Number.isFinite(Number(entry.item.color)) && entry.item.color !== null ? Math.round(Number(entry.item.color)) : null,
          sort_order: Number.isFinite(Number(entry.item.sort_order)) ? Number(entry.item.sort_order) : entry.index,
          user_name: meta.userName,
          deleted: entry.item.deleted === true,
          deleted_at: entry.item.deleted_at || null,
          updated_at: meta.now
        })
      },
      {
        name: 'clientOrders',
        table: TABLES.clientOrders || 'client_orders',
        entries: [
          ...(state.activeOrders || []).map(item => ({ item, orderStatus: 'active' })),
          ...(state.archive || []).map(item => ({ item, orderStatus: 'archived' }))
        ],
        identity: entry => orderTimestamp(entry.item),
        fingerprint: entry => fingerprintOf([
          meta.userName,
          entry.item.deleted === true ? 'deleted' : entry.orderStatus,
          entry.item.total ?? entry.item.total_price ?? 0,
          entry.item.id ?? '',
          itemsSignature(entry.item.items),
          nullableNumber(entry.item.costTotal),
          costSignature(entry.item.costItems)
        ]),
        row: entry => ({
          device_id: meta.deviceId,
          local_id: Number(entry.item.id),
          status: entry.orderStatus,
          created_at: orderTimestamp(entry.item),
          total: Number(entry.item.total ?? entry.item.total_price ?? 0),
          items: Array.isArray(entry.item.items) ? entry.item.items : [],
          user_name: meta.userName,
          // Koszt jest migawką z chwili archiwizacji. null = zamówienie sprzed
          // wprowadzenia kosztów (albo jeszcze aktywne), 0 = naliczone, ale nic
          // nie zeszło ze stanu. Te dwa przypadki muszą być rozróżnialne.
          cost_total: nullableNumber(entry.item.costTotal),
          stock_used: Array.isArray(entry.item.costItems) ? entry.item.costItems : null,
          cost_at: entry.item.costAt || null,
          deleted: entry.item.deleted === true,
          deleted_at: entry.item.deleted_at || null,
          updated_at: meta.now
        })
      },
      {
        name: 'purchaseOrders',
        table: TABLES.purchaseOrders || 'purchase_orders',
        entries: (state.purchaseOrders || []).map(item => ({ item })),
        identity: entry => orderTimestamp(entry.item),
        fingerprint: entry => fingerprintOf([
          meta.userName,
          entry.item.deleted === true ? 'deleted' : (entry.item.status || 'ordered'),
          entry.item.total_price,
          entry.item.total_quantity,
          entry.item.id ?? '',
          itemsSignature(entry.item.items)
        ]),
        row: entry => ({
          device_id: meta.deviceId,
          local_id: Number(entry.item.id),
          status: entry.item.deleted === true ? 'deleted' : (entry.item.status || 'ordered'),
          created_at: orderTimestamp(entry.item) || meta.now,
          total_price: Number(entry.item.total_price || 0),
          total_quantity: Number(entry.item.total_quantity || 0),
          items: Array.isArray(entry.item.items) ? entry.item.items : [],
          user_name: meta.userName,
          deleted: entry.item.deleted === true,
          deleted_at: entry.item.deleted_at || null,
          updated_at: meta.now
        })
      }
    ];
  }

  /**
   * Zamienia plan tabel na gotowe wiersze wraz z odciskami. Wszystko liczone
   * jest SYNCHRONICZNIE, przed jakimkolwiek `await` - dzięki temu zmiana danych
   * w trakcie wysyłki nie podmienia treści wiersza na nowszą wersję (co
   * wcześniej mogło zapisać odcisk nowych danych, gdy do chmury poszły stare).
   *
   * Do wierszy bieżących dokładamy nagrobki (pozycje usunięte w aplikacji),
   * żeby w chmurze zmienił się tylko znacznik `deleted`.
   */
  function buildRows(state, meta, wantRows) {
    return buildPlan(state, meta).map(plan => {
      const orderLike = plan.name === 'clientOrders' || plan.name === 'purchaseOrders';
      const tombstoneEntries = Object.values(readTombstones(plan.name)).map(item => (orderLike
        ? { item, orderStatus: 'deleted', isTombstone: true }
        : { item, isTombstone: true }));
      const removedIdentity = new Set(tombstoneEntries.map(entry => plan.identity(entry)).filter(Boolean));

      // Nagrobek wygrywa z bieżącym wierszem o tym samym identyfikatorze:
      // usunięta pozycja nie może wrócić do chmury jako aktywna.
      const entries = [
        ...plan.entries.filter(entry => !removedIdentity.has(plan.identity(entry))),
        ...tombstoneEntries
      ];

      return {
        name: plan.name,
        table: plan.table,
        entries: entries.map(entry => ({
          identity: plan.identity(entry),
          fingerprint: plan.fingerprint(entry),
          row: wantRows ? plan.row(entry) : null,
          isTombstone: entry.isTombstone === true
        }))
      };
    });
  }

  /**
   * Czy wiersz czeka na potwierdzenie chmury. Wiersz bieżący, który został już
   * oznaczony jako usunięty, nie liczy się jako zaległość - inaczej aplikacja
   * wysyłałaby go w kółko.
   */
  function isPending(synced, entry) {
    if (!entry.identity) return false;
    const mark = synced[entry.identity];
    if (mark === DELETED_MARK && !entry.isTombstone) return false;
    return mark !== entry.fingerprint;
  }

  /**
   * Każda zmiana rejestru wysyłki unieważnia policzone wcześniej zaległości.
   * Bez tego licznik (i kropka w pasku) pokazywałyby stan sprzed wysyłki
   * jeszcze długo po jej zakończeniu.
   */
  function invalidatePending() {
    pendingCache = { key: null, value: 0 };
  }

  /* --------------------------------------------------------------- wysyłka */

  /** Zwraca klucz tłumaczenia albo surowy komunikat z Supabase. */
  function describe(error) {
    if (!error) return '';
    if (error.code === 'PGRST205') return 'syncErrTables';
    if (error.code === 'PGRST204') return 'syncErrColumn';
    if (error.status === 401 || error.status === 403) return 'syncErrAccess';
    if (error.message === 'Failed to fetch') return 'syncErrOffline';
    return error.message || '';
  }

  function setStatus(code, detail = '') {
    status = { ...status, code, detail, at: new Date().toISOString() };
    persistStatus();
  }

  async function sendBatch(plan, entries, accessToken) {
    await request(`${CONFIG.url}/rest/v1/${plan.table}`, {
      method: 'POST',
      accessToken,
      prefer: 'resolution=merge-duplicates,return=minimal',
      body: entries.map(entry => entry.row)
    });
  }

  /**
   * Wysyła wszystkie zmienione wiersze. Gdy chmura odrzuci całą partię,
   * wiersze są ponawiane pojedynczo - jeden błędny wiersz (np. brak kolumny
   * albo zły typ) nie blokuje już całej tabeli na zawsze.
   */
  async function pushTables(state) {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      const error = new Error('Nie jesteś zalogowany');
      error.code = 'no-session';
      throw error;
    }

    const meta = buildMeta();
    const plans = buildRows(state, meta, true);
    let sent = 0;
    const rejected = [];

    const recordSent = (plan, entries) => {
      // Odcisk zapisujemy dopiero po udanej wysyłce. Inaczej nieudana próba
      // kazałaby aplikacji uznać, że dane są już w chmurze.
      const updated = { ...readSynced(plan.name) };
      entries.forEach(entry => {
        // Usunięcia zapamiętujemy jako trwały znacznik - dzięki temu wiersz
        // nie wróci do chmury jako aktywny po odtworzeniu starej kopii.
        updated[entry.identity] = entry.isTombstone ? DELETED_MARK : entry.fingerprint;
        clearFailure(plan.name, entry.identity);
      });
      writeSynced(plan.name, updated);
      invalidatePending();
      sent += entries.length;

      // Potwierdzone nagrobki nie są już potrzebne - sam wiersz w chmurze
      // zostaje, zmienił się tylko znacznik `deleted`.
      const confirmed = entries.filter(entry => entry.isTombstone);
      if (confirmed.length) {
        const tombstones = readTombstones(plan.name);
        confirmed.forEach(entry => { delete tombstones[entry.identity]; });
        writeTombstones(plan.name, tombstones);
      }
    };

    for (const plan of plans) {
      const synced = readSynced(plan.name);
      const changed = plan.entries.filter(entry =>
        isPending(synced, entry) && !isBlocked(plan.name, entry.identity)
      );
      if (!changed.length) continue;

      try {
        await sendBatch(plan, changed, accessToken);
        recordSent(plan, changed);
        continue;
      } catch (batchError) {
        if (changed.length === 1) {
          const detail = describe(batchError);
          noteFailure(plan.name, changed[0].identity, detail);
          rejected.push({ table: plan.name, identity: changed[0].identity, detail });
          continue;
        }

        // Partia padła - ratujemy to, co się da, wiersz po wierszu.
        const accepted = [];
        for (const entry of changed) {
          try {
            await sendBatch(plan, [entry], accessToken);
            accepted.push(entry);
          } catch (rowError) {
            const detail = describe(rowError);
            noteFailure(plan.name, entry.identity, detail);
            rejected.push({ table: plan.name, identity: entry.identity, detail });
          }
        }
        if (accepted.length) recordSent(plan, accepted);
      }
    }

    return { sent, rejected };
  }

  function schedule(delay, attempt) {
    if (pendingTimer) clearTimeout(pendingTimer);
    pendingTimer = setTimeout(() => {
      pendingTimer = null;
      runPush(attempt);
    }, delay);
  }

  /** Ile wierszy czeka na potwierdzenie chmury (bez pytań do sieci). */
  function pushPendingCount() {
    if (!latestState) return 0;
    const key = String(revision);
    if (pendingCache.key === key) return pendingCache.value;

    let count = 0;
    buildRows(latestState, buildMeta(), false).forEach(plan => {
      const synced = readSynced(plan.name);
      plan.entries.forEach(entry => {
        if (isPending(synced, entry)) count += 1;
      });
    });

    pendingCache = { key, value: count };
    return count;
  }

  function notifyStatusListeners() {
    try {
      window.dispatchEvent(new CustomEvent('kedai-sync-status'));
    } catch (error) {
      // Zdarzenie służy tylko interfejsowi - jego brak niczego nie psuje.
    }
  }

  /** Stan wysyłki przetrwa zamknięcie aplikacji - żeby nic nie ginęło po cichu. */
  function persistStatus() {
    writeStorage(STATUS_KEY, JSON.stringify(status));
    notifyStatusListeners();
  }

  function refreshStatus() {
    status = { ...status, pending: pushPendingCount(), failed: totalFailed() };
    persistStatus();
  }

  async function runPush(attempt = 0) {
    if (!isConfigured() || !latestState || !isSignedIn()) return;
    // Bez sieci nie ma po co próbować - to nie jest nieudana próba, a wiersze
    // zostają w kolejce i pójdą po odzyskaniu połączenia.
    if (navigator.onLine === false) {
      setStatus('offline');
      return;
    }
    if (inFlight) {
      schedule(1500, attempt);
      return;
    }

    inFlight = true;
    const snapshot = revision;
    try {
      const result = await pushTables(latestState);
      if (result.rejected.length) {
        setStatus('partial', result.rejected[0].detail);
      } else {
        status = { ...status, code: 'ok', detail: '', at: new Date().toISOString(), lastOkAt: new Date().toISOString() };
      }
    } catch (error) {
      setStatus(attempt + 1 >= MAX_ATTEMPTS ? 'failed' : 'retrying', describe(error));
      if (attempt + 1 < MAX_ATTEMPTS) {
        schedule(Math.min(RETRY_DELAY_MS * (attempt + 1), MAX_RETRY_DELAY_MS), attempt + 1);
      }
      // Po wyczerpaniu prób wysyłkę przejmie dyżur okresowy - zaległości nie
      // zostają bez opieki do przypadkowej następnej zmiany w aplikacji.
    } finally {
      inFlight = false;
      refreshStatus();
      if (revision !== snapshot) schedule(1000, 0);
    }
  }

  /** Natychmiastowa próba wysyłki, np. gdy karta jest zamykana. */
  function flushNow() {
    if (pendingTimer) {
      clearTimeout(pendingTimer);
      pendingTimer = null;
    }
    runPush(0);
  }

  function startSweep() {
    if (sweepTimer) return;
    sweepTimer = setInterval(() => {
      if (!latestState || !isConfigured() || !isSignedIn() || inFlight) return;
      if (navigator.onLine === false) return;
      if (pushPendingCount() > 0) schedule(0, 0);
    }, SWEEP_MS);
  }

  function registerListeners() {
    if (listenersReady || typeof window === 'undefined') return;
    listenersReady = true;

    window.addEventListener('online', () => schedule(500, 0));
    window.addEventListener('offline', () => setStatus('offline'));
    window.addEventListener('pagehide', flushNow);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') flushNow();
      else schedule(500, 0);
    });
  }

  /**
   * Uruchamiane raz, po starcie aplikacji. Nadrabia zaległości z poprzedniej
   * sesji - wcześniej aplikacja nie wysyłała nic, dopóki użytkownik nie zrobił
   * kolejnej zmiany, więc ostatnie zamówienia mogły nie wyjść nigdy.
   */
  function start(state) {
    latestState = state;
    status = readStoredStatus();
    registerListeners();
    startSweep();
    notifyStatusListeners();
    if (isConfigured() && isSignedIn()) schedule(500, 0);
  }

  function readStoredStatus() {
    const fallback = { code: 'idle', detail: '', at: null, lastOkAt: null, pending: 0, failed: 0 };
    const raw = readStorage(STATUS_KEY);
    if (!raw) return fallback;
    try {
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return fallback;
      // Przerwana wysyłka z poprzedniej sesji nie może wyglądać na trwającą.
      if (parsed.code === 'retrying') parsed.code = 'failed';
      return { ...fallback, ...parsed };
    } catch (error) {
      return fallback;
    }
  }

  /** Wywoływane po każdej zmianie danych. Tylko ustawia licznik czasu. */
  function notifyChange(state) {
    latestState = state;
    revision += 1;
    if (!isConfigured() || !isSignedIn()) {
      refreshStatus();
      return;
    }
    schedule(DEBOUNCE_MS, 0);
  }

  /** Ręczna wysyłka z Ustawień. Zwraca wynik, żeby pokazać komunikat. */
  async function pushNow(state) {
    if (!isConfigured()) return { ok: false, detail: 'Brak konfiguracji Supabase' };
    if (!isSignedIn()) return { ok: false, detail: 'Nie jesteś zalogowany' };
    latestState = state;
    if (pendingTimer) {
      clearTimeout(pendingTimer);
      pendingTimer = null;
    }
    try {
      const result = await pushTables(state);
      if (result.rejected.length) {
        setStatus('partial', result.rejected[0].detail);
        refreshStatus();
        return { ok: true, sent: result.sent, rejected: result.rejected };
      }
      status = { ...status, code: 'ok', detail: '', at: new Date().toISOString(), lastOkAt: new Date().toISOString() };
      refreshStatus();
      return { ok: true, sent: result.sent, rejected: [] };
    } catch (error) {
      const detail = describe(error);
      setStatus('failed', detail);
      refreshStatus();
      return { ok: false, detail };
    }
  }

  /* ------------------------------------------------------------- usuwanie */

  /**
   * Miękkie usuwanie: wiersz NIGDY nie znika z chmury. Zamiast zapytania
   * DELETE wysyłamy ten sam wiersz ze znacznikiem `deleted` i datą
   * usunięcia (zamówienia dostają dodatkowo `status` = 'deleted').
   *
   * Dzięki temu raporty zachowują historię, a usunięcie na jednym telefonie
   * nie może już skasować danych, których używa drugi telefon.
   */
  function softDelete(name, items) {
    if (!isConfigured() || !name || !Array.isArray(items) || !items.length) return;
    const plan = buildPlan({}, buildMeta()).find(item => item.name === name);
    if (!plan) return;

    const tombstones = readTombstones(name);
    const deletedAt = new Date().toISOString();
    items.forEach(item => {
      const marked = { ...item, deleted: true, deleted_at: deletedAt };
      if (name === 'clientOrders' || name === 'purchaseOrders') marked.status = 'deleted';
      const identity = plan.identity({ item: marked });
      if (identity) tombstones[identity] = marked;
    });
    writeTombstones(name, tombstones);
    invalidatePending();

    if (latestState) notifyChange(latestState);
  }

  /** Czy dany wiersz został już potwierdzony przez chmurę. */
  function isSent(name, identity) {
    if (!name || !identity) return false;
    return Boolean(readSynced(name)[identity]);
  }

  /**
   * Ile wierszy jest w chmurze. Odpowiedź ma stały rozmiar niezależnie od
   * liczby zamówień - liczba siedzi w nagłówku, a nie w treści.
   */
  async function countRows() {
    if (!isConfigured() || !isSignedIn()) return null;
    const accessToken = await getAccessToken();
    if (!accessToken) return null;

    const counts = {};
    for (const [name, table] of TABLE_LIST) {
      const response = await fetch(`${CONFIG.url}/rest/v1/${table}?select=local_id&limit=1`, {
        headers: {
          apikey: CONFIG.anonKey,
          Authorization: `Bearer ${accessToken}`,
          Prefer: 'count=exact'
        },
        cache: 'no-store'
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const range = response.headers.get('content-range') || '';
      const total = range.includes('/') ? Number(range.split('/')[1]) : 0;
      counts[name] = Number.isFinite(total) ? total : 0;
    }
    return counts;
  }

  function getStatus() {
    return {
      configured: isConfigured(),
      signedIn: isSignedIn(),
      email: getSession()?.email || '',
      userName: getUserName(),
      deviceId: isConfigured() ? getDeviceId() : '',
      code: status.code,
      detail: status.detail,
      at: status.at,
      lastOkAt: status.lastOkAt || '',
      pending: pushPendingCount(),
      failed: totalFailed()
    };
  }

  /**
   * Zapomina o usunięciu podanych pozycji: kasuje nagrobki i znaczniki
   * `#deleted` z rejestru wysyłki.
   *
   * Potrzebne wtedy, gdy aplikacja SAMA przywraca pozycję (np. uzupełnienie
   * magazynu wpisami z konfiguracji). Bez tego wiersz nigdy nie wróciłby do
   * chmury: znacznik usunięcia jest trwały, żeby odtworzenie starej kopii na
   * telefonie nie „odmrażało” skasowanych danych.
   */
  function clearDeletion(name, ids) {
    if (!TABLE_LIST.some(entry => entry[0] === name)) return 0;
    const list = (Array.isArray(ids) ? ids : [ids]).map(id => String(id || '')).filter(Boolean);
    if (!list.length) return 0;

    const tombstones = readTombstones(name);
    list.forEach(id => { delete tombstones[id]; });
    writeTombstones(name, tombstones);

    const synced = { ...readSynced(name) };
    list.forEach(id => { if (synced[id] === DELETED_MARK) delete synced[id]; });
    writeSynced(name, synced);

    invalidatePending();
    return list.length;
  }

  window.KedaiSync = {
    isConfigured,
    isSignedIn,
    signIn,
    signOut,
    getUserName,
    setUserName,
    getDeviceId,
    getStatus,
    start,
    notifyChange,
    pushNow,
    countRows,
    softDelete,
    clearDeletion,
    isSent,
    forgetSynced
  };
})();
