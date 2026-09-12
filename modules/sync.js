/**
 * Wysyłka danych do Supabase.
 *
 * Zasady, które ten moduł musi spełniać:
 *  1. Kierunek jest JEDEN: telefon wysyła, chmura przyjmuje. Moduł nigdy nie
 *     usuwa ani nie nadpisuje danych lokalnych.
 *  2. Nie blokuje interfejsu. `notifyChange` tylko ustawia licznik czasu,
 *     a sama wysyłka leci w tle.
 *  3. Kiedy sieci nie ma, nie próbuje w ogóle - nie zużywa baterii.
 *  4. Po MAX_ATTEMPTS nieudanych próbach odpuszcza i czeka na kolejną zmianę.
 *  5. Każdy wiersz niesie `user_name` - nazwę użytkownika z Ustawień, żeby
 *     w raportach było widać, z którego telefonu przyszły dane.
 */
(function () {
  const CONFIG = window.KedaiSupabaseConfig || {};
  const TABLES = CONFIG.tables || {};

  const SESSION_KEY = 'kedai_pos_supabase_session';
  const DEVICE_KEY = 'kedai_pos_device_id';
  const USER_NAME_KEY = 'kedai_pos_user_name';
  const SYNCED_PREFIX = 'kedai_pos_synced_';

  const MAX_ATTEMPTS = 3;
  const DEBOUNCE_MS = 2000;
  const RETRY_DELAY_MS = 6000;
  const NAME_MAX_LENGTH = 60;

  /** Kolumna rozpoznająca wiersz. Musi zgadzać się z kluczem głównym tabeli. */
  const IDENTITY_COLUMN = {
    menu: 'local_id',
    ingredients: 'local_id',
    clientOrders: 'created_at',
    purchaseOrders: 'created_at'
  };

  const TABLE_LIST = [
    ['menu', TABLES.menu || 'menu_items'],
    ['ingredients', TABLES.ingredients || 'ingredients'],
    ['clientOrders', TABLES.clientOrders || 'client_orders'],
    ['purchaseOrders', TABLES.purchaseOrders || 'purchase_orders']
  ];

  let pendingTimer = null;
  let inFlight = false;
  let latestState = null;
  let revision = 0;
  let status = { code: 'idle', detail: '', at: null };

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
    const { method = 'GET', body, accessToken, prefer } = options;
    const headers = { apikey: CONFIG.anonKey, 'Content-Type': 'application/json' };
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
    if (prefer) headers.Prefer = prefer;

    const response = await fetch(url, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store'
    });

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

  /** Czyści zapamiętane odciski, żeby następna wysyłka poszła w całości. */
  function forgetSynced() {
    TABLE_LIST.forEach(([name]) => {
      try {
        localStorage.removeItem(SYNCED_PREFIX + name);
      } catch (error) {
        // Brak wpisu to nie problem.
      }
    });
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
          entry.item.order ?? entry.index
        ]),
        row: entry => ({
          device_id: meta.deviceId,
          local_id: String(entry.item.id),
          name: String(entry.item.name || ''),
          price: Number(entry.item.price || 0),
          type: entry.item.type === 'section' ? 'section' : 'product',
          sort_order: Number.isFinite(Number(entry.item.order)) ? Number(entry.item.order) : entry.index,
          user_name: meta.userName,
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
          entry.item.unit_step
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
          user_name: meta.userName,
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
          entry.orderStatus,
          entry.item.total ?? entry.item.total_price ?? 0
        ]),
        row: entry => ({
          device_id: meta.deviceId,
          local_id: Number(entry.item.id),
          status: entry.orderStatus,
          created_at: orderTimestamp(entry.item),
          total: Number(entry.item.total ?? entry.item.total_price ?? 0),
          items: Array.isArray(entry.item.items) ? entry.item.items : [],
          user_name: meta.userName,
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
          entry.item.status || 'ordered',
          entry.item.total_price,
          entry.item.total_quantity
        ]),
        row: entry => ({
          device_id: meta.deviceId,
          local_id: Number(entry.item.id),
          status: entry.item.status || 'ordered',
          created_at: orderTimestamp(entry.item) || meta.now,
          total_price: Number(entry.item.total_price || 0),
          total_quantity: Number(entry.item.total_quantity || 0),
          items: Array.isArray(entry.item.items) ? entry.item.items : [],
          user_name: meta.userName,
          updated_at: meta.now
        })
      }
    ];
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
    status = { code, detail, at: new Date().toISOString() };
  }

  async function pushTables(state) {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      const error = new Error('Nie jesteś zalogowany');
      error.code = 'no-session';
      throw error;
    }

    const meta = buildMeta();
    let sent = 0;

    for (const plan of buildPlan(state, meta)) {
      const synced = readSynced(plan.name);
      const changed = plan.entries.filter(entry => {
        const identity = plan.identity(entry);
        return identity && synced[identity] !== plan.fingerprint(entry);
      });
      if (!changed.length) continue;

      await request(`${CONFIG.url}/rest/v1/${plan.table}`, {
        method: 'POST',
        accessToken,
        prefer: 'resolution=merge-duplicates,return=minimal',
        body: changed.map(entry => plan.row(entry))
      });

      // Odcisk zapisujemy dopiero po udanej wysyłce. Inaczej nieudana próba
      // kazałaby aplikacji uznać, że dane są już w chmurze.
      const updated = { ...synced };
      plan.entries.forEach(entry => {
        const identity = plan.identity(entry);
        if (identity) updated[identity] = plan.fingerprint(entry);
      });
      writeSynced(plan.name, updated);
      sent += changed.length;
    }

    return sent;
  }

  function schedule(delay, attempt) {
    if (pendingTimer) clearTimeout(pendingTimer);
    pendingTimer = setTimeout(() => {
      pendingTimer = null;
      runPush(attempt);
    }, delay);
  }

  async function runPush(attempt = 0) {
    if (!isConfigured() || !latestState) return;
    // Bez sieci nie ma po co próbować - to nie jest nieudana próba.
    if (navigator.onLine === false) return;
    if (inFlight) {
      schedule(1500, attempt);
      return;
    }

    inFlight = true;
    const snapshot = revision;
    try {
      await pushTables(latestState);
      setStatus('ok');
      if (revision !== snapshot) schedule(1000, 0);
    } catch (error) {
      setStatus(attempt + 1 >= MAX_ATTEMPTS ? 'failed' : 'retrying', describe(error));
      if (attempt + 1 < MAX_ATTEMPTS) {
        schedule(RETRY_DELAY_MS * (attempt + 1), attempt + 1);
      }
      // Po wyczerpaniu prób czekamy na kolejną zmianę danych.
    } finally {
      inFlight = false;
    }
  }

  /** Wywoływane po każdej zmianie danych. Tylko ustawia licznik czasu. */
  function notifyChange(state) {
    latestState = state;
    revision += 1;
    if (!isConfigured() || !isSignedIn()) return;
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
      const sent = await pushTables(state);
      setStatus('ok');
      return { ok: true, sent };
    } catch (error) {
      const detail = describe(error);
      setStatus('failed', detail);
      return { ok: false, detail };
    }
  }

  /* ------------------------------------------------------------- usuwanie */

  /**
   * Usuwa pojedyncze wiersze w chmurze. Wywoływane tylko wtedy, gdy
   * użytkownik sam coś skasował w aplikacji.
   */
  async function deleteRows(key, values) {
    if (!isConfigured() || !isSignedIn()) return;
    const table = TABLES[key];
    const column = IDENTITY_COLUMN[key] || 'local_id';
    const cleaned = (values || []).filter(value => value !== undefined && value !== null && value !== '');
    if (!table || !cleaned.length) return;

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) return;
      for (const value of cleaned) {
        const filter = `${column}=eq.${encodeURIComponent(String(value))}`;
        await request(`${CONFIG.url}/rest/v1/${table}?${filter}`, {
          method: 'DELETE',
          accessToken,
          prefer: 'return=minimal'
        });
      }
    } catch (error) {
      // Usuwanie jest pomocnicze: brak sieci nie może psuć pracy aplikacji.
      console.warn('Nie udało się usunąć wierszy w Supabase:', error);
    }
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
      at: status.at
    };
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
    notifyChange,
    pushNow,
    countRows,
    deleteRows,
    forgetSynced
  };
})();
