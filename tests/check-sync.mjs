#!/usr/bin/env node
/**
 * Kedai POS – testy modułu wysyłki (modules/sync.js).
 *
 * Uruchomienie:
 *   node tests/check-sync.mjs
 *
 * Test nie wymaga przeglądarki ani sieci: podstawia własną pamięć lokalną
 * i własny `fetch`, a następnie sprawdza to, co najłatwiej zepsuć w tym
 * module, czyli:
 *   1. wysyłka nadmiarowa nie robi żadnych zapytań,
 *   2. usunięcie w aplikacji NIE kasuje wiersza w chmurze (żadnego DELETE),
 *   3. błędny wiersz nie blokuje poprawnych,
 *   4. zmiana danych w trakcie wysyłki nie zapisuje fałszywego odcisku,
 *   5. zmiana nazwy użytkownika wymusza wysłanie danych ponownie,
 *   6. licznik zaległości jest widoczny dla użytkownika.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { setTimeout as sleep } from 'node:timers/promises';
import vm from 'node:vm';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = readFileSync(join(ROOT, 'modules', 'sync.js'), 'utf8');

const colors = {
  reset: '\u001b[0m',
  red: '\u001b[31m',
  green: '\u001b[32m',
  gray: '\u001b[90m',
  bold: '\u001b[1m'
};

let checks = 0;
const failures = [];

function check(condition, message) {
  checks += 1;
  if (condition) {
    process.stdout.write(`${colors.green}  ✓ ${message}${colors.reset}\n`);
  } else {
    failures.push(message);
    process.stdout.write(`${colors.red}  ✗ ${message}${colors.reset}\n`);
  }
}

function section(title) {
  process.stdout.write(`\n${colors.bold}${title}${colors.reset}\n`);
}

/** Odpowiedź HTTP w kształcie, jakiego oczekuje moduł (ok/status/text). */
function response(status, payload = '') {
  return {
    ok: status >= 200 && status < 300,
    status,
    text: async () => (payload ? JSON.stringify(payload) : '')
  };
}

function tableOf(url) {
  const match = /\/rest\/v1\/([a-z_]+)/.exec(url);
  return match ? match[1] : '';
}

/**
 * Tworzy odizolowane „środowisko przeglądarki" i ładuje w nim modules/sync.js.
 * `handler` decyduje, co odpowiada `fetch`.
 */
function createWorld(handler = () => response(201)) {
  const store = new Map();
  const requests = [];

  const localStorage = {
    getItem: key => (store.has(key) ? store.get(key) : null),
    setItem: (key, value) => store.set(key, String(value)),
    removeItem: key => store.delete(key)
  };

  store.set('kedai_pos_supabase_session', JSON.stringify({
    access_token: 'access-token',
    refresh_token: 'refresh-token',
    expires_at: Date.now() + 3600000,
    email: 'lokal@example.com'
  }));
  store.set('kedai_pos_user_name', 'PIPIN');
  store.set('kedai_pos_device_id', 'device-1');

  const sandbox = {
    console,
    Date,
    Math,
    JSON,
    Number,
    String,
    Boolean,
    Object,
    Array,
    Promise,
    Error,
    RegExp,
    setTimeout,
    clearTimeout,
    setInterval: () => 0,
    clearInterval: () => {},
    crypto: { randomUUID: () => '00000000-0000-4000-8000-000000000000' },
    CustomEvent: class {
      constructor(type) {
        this.type = type;
      }
    },
    navigator: { onLine: true },
    document: { visibilityState: 'visible', addEventListener: () => {} },
    localStorage,
    fetch: async (url, init = {}) => {
      const request = {
        url,
        method: init.method || 'GET',
        body: init.body ? JSON.parse(init.body) : null,
        prefer: init.headers?.Prefer || ''
      };
      requests.push(request);
      return handler(request, requests.length);
    }
  };

  sandbox.window = sandbox;
  sandbox.window.addEventListener = () => {};
  sandbox.window.dispatchEvent = () => true;
  sandbox.window.KedaiSupabaseConfig = {
    url: 'https://test.supabase.co',
    anonKey: 'anon-key',
    tables: {
      menu: 'menu_items',
      ingredients: 'ingredients',
      clientOrders: 'client_orders',
      purchaseOrders: 'purchase_orders'
    }
  };

  vm.runInNewContext(SOURCE, sandbox, { filename: 'modules/sync.js' });

  return {
    api: sandbox.window.KedaiSync,
    store,
    requests,
    postsFor: table => requests.filter(request => request.method === 'POST' && tableOf(request.url) === table),
    postsOf: table => requests.filter(request => request.method === 'POST' && tableOf(request.url) === table).flatMap(request => request.body || [])
  };
}

function sampleState() {
  return {
    menu: [{ id: 'prod_1', name: 'Seblak', price: 20000, type: 'product', order: 0 }],
    ingredients: [{ id: 'ing_1', name: 'Kerupuk', unit: 'kg', stock: 5, unit_price: 1000 }],
    activeOrders: [{
      id: 7,
      createdAt: '2026-09-12T04:00:00.000Z',
      date: '2026-09-12T04:00:00.000Z',
      total: 25000,
      items: [{ productId: 'prod_1', name: 'Seblak', price: 25000, qty: 1 }]
    }],
    archive: [],
    purchaseOrders: [{ id: 3, createdAt: '2026-09-12T05:00:00.000Z', date: '2026-09-12T05:00:00.000Z', items: [], total_price: 5000, total_quantity: 5 }]
  };
}

async function waitFor(predicate, tries = 100) {
  for (let index = 0; index < tries; index += 1) {
    if (predicate()) return true;
    await sleep(0);
  }
  return false;
}

async function main() {
  process.stdout.write(`${colors.bold}Kedai POS – sprawdzanie wysyłki do Supabase${colors.reset}\n`);

  /* ---------------------------------------------------------------- 1. wysyłka */
  section('1. Pierwsza wysyłka i wysyłka bez zmian');

  const first = createWorld();
  const state = sampleState();
  const firstResult = await first.api.pushNow(state);
  check(firstResult.ok && firstResult.sent === 4, `pierwsza wysyłka wysyła 4 wiersze (sent = ${firstResult.sent})`);
  check(first.postsFor('client_orders').length === 1, 'zamówienie trafia do tabeli client_orders');
  check(first.postsOf('menu_items')[0].user_name === 'PIPIN', 'wiersz niesie nazwę użytkownika');
  check(first.api.getStatus().pending === 0, 'po wysyłce licznik zaległości wynosi 0');

  const secondResult = await first.api.pushNow(state);
  check(secondResult.ok && secondResult.sent === 0, 'druga wysyłka bez zmian nie wysyła nic');

  /* ------------------------------------------------------------ 2. usuwanie */
  section('2. Usunięcie nie kasuje wiersza w chmurze');

  const deleter = createWorld();
  const deleteState = sampleState();
  await deleter.api.pushNow(deleteState);

  deleter.api.softDelete('clientOrders', [deleteState.activeOrders[0]]);
  deleter.api.softDelete('ingredients', [deleteState.ingredients[0]]);
  const deleteResult = await deleter.api.pushNow(deleteState);

  const deleteCalls = deleter.requests.filter(request => request.method === 'DELETE');
  check(deleteCalls.length === 0, 'moduł nie wysyła żadnego zapytania DELETE');
  check(deleteResult.ok, 'wysyłka znaczników usunięcia kończy się powodzeniem');

  const orderRow = deleter.postsOf('client_orders').pop();
  check(orderRow.deleted === true, 'zamówienie dostaje znacznik deleted');
  check(orderRow.status === 'deleted', 'zamówienie dostaje status deleted');
  check(Boolean(orderRow.deleted_at), 'zamówienie dostaje datę usunięcia');
  check(orderRow.created_at === '2026-09-12T04:00:00.000Z', 'klucz wiersza nie zmienia się przy usuwaniu');

  const ingredientRow = deleter.postsOf('ingredients').pop();
  check(ingredientRow.deleted === true, 'skasowany składnik dostaje znacznik deleted');

  const afterDelete = await deleter.api.pushNow(deleteState);
  check(afterDelete.sent === 0, 'potwierdzony znacznik usunięcia nie jest wysyłany w kółko');
  check(deleter.postsOf('client_orders').length === 2, 'odtworzenie danych nie przywraca skasowanego zamówienia jako aktywnego');

  /* ------------------------------------------------- 3. izolacja błędnych wierszy */
  section('3. Błędny wiersz nie blokuje poprawnych');

  const brokenRow = { code: 'PGRST204', message: 'column not found' };
  const mixed = createWorld(request => {
    if (tableOf(request.url) !== 'client_orders') return response(201);
    const rows = request.body || [];
    const bad = rows.some(row => row.total === 99999);
    if (rows.length === 1 && !bad) return response(201);
    return response(400, brokenRow);
  });

  const mixedState = sampleState();
  mixedState.archive = [{
    id: 8,
    createdAt: '2026-09-12T06:00:00.000Z',
    date: '2026-09-12T06:00:00.000Z',
    total: 99999,
    items: []
  }];

  const mixedResult = await mixed.api.pushNow(mixedState);
  check(mixedResult.ok === true, 'wysyłka częściowo udana nie jest traktowana jak całkowita porażka');
  check(mixedResult.rejected.length === 1 && mixedResult.rejected[0].detail === 'syncErrColumn', 'odrzucony wiersz trafia na listę z czytanym powodem');
  check(mixed.api.getStatus().failed === 1, 'panel Ustawień widzi odrzucony wiersz');

  const afterMixed = await mixed.api.pushNow(mixedState);
  check(afterMixed.sent === 0, 'poprawny wiersz nie jest wysyłany ponownie, a odrzucony czeka na swoją kolej');

  /* --------------------------------------------- 4. wysyłka liczy stan przed await */
  section('4. Zmiana danych w trakcie wysyłki');

  let deferred;
  let firstCall = true;
  const racy = createWorld(() => {
    if (firstCall) {
      firstCall = false;
      return new Promise(resolve => {
        deferred = resolve;
      });
    }
    return response(201);
  });

  const racyState = sampleState();
  const pendingPush = racy.api.pushNow(racyState);
  await waitFor(() => racy.requests.length > 0);

  // Składnik jest mutowany W TRAKCIE wysyłki (tak działa edycja w magazynie).
  racyState.ingredients[0].stock = 999;
  deferred(response(201));
  await pendingPush;

  const sentStock = racy.postsOf('ingredients')[0].stock;
  check(sentStock === 5, 'do chmury poszła wartość z chwili rozpoczęcia wysyłki');

  await racy.api.pushNow(racyState);
  const rows = racy.postsOf('ingredients');
  check(rows.length === 2 && rows[1].stock === 999, 'nowa wartość zostaje wysłana w następnej wysyłce (odcisk nie kłamie)');

  /* ------------------------------------------------- 5. zmiana nazwy użytkownika */
  section('5. Zmiana nazwy użytkownika');

  const namer = createWorld();
  const nameState = sampleState();
  await namer.api.pushNow(nameState);
  namer.api.setUserName('  Paul  ');
  const renameResult = await namer.api.pushNow(nameState);
  check(renameResult.sent === 4, 'zmiana nazwy przemianowuje wszystkie wiersze w chmurze');
  check(namer.postsOf('client_orders').pop().user_name === 'Paul', 'nazwa jest przycięta i zapisana w wierszu');

  /* ----------------------------------------------------- 6. licznik zaległości */
  section('6. Widoczny licznik zaległości');

  const offline = createWorld();
  const offlineState = sampleState();
  offline.api.notifyChange(offlineState);
  check(offline.api.getStatus().pending === 4, 'przed wysyłką widać 4 wiersze czekające na chmurę');

  await offline.api.pushNow(offlineState);
  check(offline.api.getStatus().pending === 0, 'po wysyłce licznik wraca do zera');
  check(Boolean(offline.api.getStatus().lastOkAt), 'zapamiętana jest data ostatniej udanej wysyłki');

  const stored = JSON.parse(offline.store.get('kedai_pos_sync_status'));
  check(stored.lastOkAt === offline.api.getStatus().lastOkAt, 'stan wysyłki przetrwa zamknięcie aplikacji');

  /* ------------------------------------------------------------------- wynik */
  process.stdout.write('\n');
  if (failures.length) {
    process.stdout.write(`${colors.red}${colors.bold}Sprawdzenie nie przeszło: ${failures.length} z ${checks}.${colors.reset}\n`);
    failures.forEach(message => process.stdout.write(`${colors.red}  ✗ ${message}${colors.reset}\n`));
    process.exit(1);
  }

  process.stdout.write(`${colors.green}${colors.bold}OK${colors.reset} ${colors.green}– sprawdzeń: ${checks}${colors.reset}\n`);
}

main().catch(error => {
  process.stdout.write(`${colors.red}Test nie mógł się wykonać: ${error?.stack || error}${colors.reset}\n`);
  process.exit(1);
});
