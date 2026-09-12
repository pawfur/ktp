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

  const MAX_ATTEMPTS = 3;
  const DEBOUNCE_MS = 2000;
  const RETRY_DELAY_MS = 6000;
  const NAME_MAX_LENGTH = 60;

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

  function menuRows(state, meta) {
    return (state.menu || []).map((item, index) => ({
      device_id: meta.deviceId,
      local_id: String(item.id),
      name: String(item.name || ''),
      price: Number(item.price || 0),
      type: item.type === 'section' ? 'section' : 'product',
      sort_order: Number.isFinite(Number(item.order)) ? Number(item.order) : index,
      user_name: meta.userName,
      updated_at: meta.now
    }));
  }

  function ingredientRows(state, meta) {
    return (state.ingredients || []).map(ingredient => ({
      device_id: meta.deviceId,
      local_id: String(ingredient.id),
      name: String(ingredient.name || ''),
      unit: String(ingredient.unit || ''),
      stock: Number(ingredient.stock || 0),
      unit_price: Number(ingredient.unit_price || 0),
      min_stock: Number(ingredient.min_stock || 0),
      target_stock: Number(ingredient.target_stock || 0),
      min_order_quantity: Number(ingredient.min_order_quantity || 0),
      unit_step: Number(ingredient.unit_step || 0),
      user_name: meta.userName,
      updated_at: meta.now
    }));
  }

  function clientOrderRows(state, meta) {
    const rows = [];
    const add = (order, orderStatus) => {
      const createdAt = order.date || order.createdAt;
      if (!createdAt || order.id === undefined || order.id === null) return;
      rows.push({
        device_id: meta.deviceId,
        local_id: Number(order.id),
        status: orderStatus,
        created_at: createdAt,
        total: Number(order.total ?? order.total_price ?? 0),
        items: Array.isArray(order.items) ? order.items : [],
        user_name: meta.userName,
        updated_at: meta.now
      });
    };

    (state.activeOrders || []).forEach(order => add(order, 'active'));
    (state.archive || []).forEach(order => add(order, 'archived'));
    return rows;
  }

  function purchaseOrderRows(state, meta) {
    return (state.purchaseOrders || []).map(order => {
      const createdAt = order.date || order.createdAt;
      return {
        device_id: meta.deviceId,
        local_id: Number(order.id),
        status: order.status || 'ordered',
        created_at: createdAt || meta.now,
        total_price: Number(order.total_price || 0),
        total_quantity: Number(order.total_quantity || 0),
        items: Array.isArray(order.items) ? order.items : [],
        user_name: meta.userName,
        updated_at: meta.now
      };
    });
  }

  function buildPlan(state, meta) {
    return [
      [TABLES.menu || 'menu_items', menuRows(state, meta)],
      [TABLES.ingredients || 'ingredients', ingredientRows(state, meta)],
      [TABLES.clientOrders || 'client_orders', clientOrderRows(state, meta)],
      [TABLES.purchaseOrders || 'purchase_orders', purchaseOrderRows(state, meta)]
    ];
  }

  /* --------------------------------------------------------------- wysyłka */

  function describe(error) {
    if (!error) return '';
    if (error.code === 'PGRST205') return 'Brak tabel w Supabase - uruchom docs/supabase-schema.sql';
    if (error.code === 'PGRST204') return 'Brakuje kolumny w tabeli - uruchom ponownie docs/supabase-schema.sql';
    if (error.status === 401 || error.status === 403) return 'Brak dostępu - zaloguj się ponownie';
    if (error.message === 'Failed to fetch') return 'Brak połączenia z internetem';
    return error.message || 'Nieznany błąd';
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
    for (const [table, rows] of buildPlan(state, meta)) {
      if (!rows.length) continue;
      await request(`${CONFIG.url}/rest/v1/${table}`, {
        method: 'POST',
        accessToken,
        prefer: 'resolution=merge-duplicates,return=minimal',
        body: rows
      });
    }
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
      await pushTables(state);
      setStatus('ok');
      return { ok: true };
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
  async function deleteRows(key, localIds) {
    if (!isConfigured() || !isSignedIn()) return;
    const table = TABLES[key];
    const ids = (localIds || []).filter(id => id !== undefined && id !== null);
    if (!table || !ids.length) return;

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) return;
      const device = encodeURIComponent(getDeviceId());
      for (const id of ids) {
        const filter = `device_id=eq.${device}&local_id=eq.${encodeURIComponent(String(id))}`;
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
    deleteRows
  };
})();
