#!/usr/bin/env node
/**
 * Kedai POS – pomost do bazy Supabase (raporty z komputera).
 *
 * Uruchomienie:
 *   node tools/db.mjs help
 *   node tools/db.mjs login
 *   node tools/db.mjs devices
 *   node tools/db.mjs orders --user PIPIN --days 3
 *   node tools/db.mjs sales --days 7
 *   node tools/db.mjs menu --user PIPIN
 *   node tools/db.mjs gaps
 *   node tools/db.mjs deleted
 *   node tools/db.mjs counts
 *
 * Zasady, których ten skrypt pilnuje:
 *  1. TYLKO CZYTA. Jedyny zapis, jaki wykonuje, to logowanie do Supabase
 *     (pobranie tokenu). Nie ma tu ani jednego INSERT/UPDATE/DELETE, więc
 *     nawet pomyłka w parametrach nie uszkodzi danych.
 *  2. Zero zależności - wystarczy Node.js 18+ (wbudowany fetch).
 *  3. Dane połączenia (adres + klucz publishable) czyta z
 *     config/supabase-config.js, żeby nie trzymać ich w dwóch miejscach.
 *  4. Hasła NIE zapisuje. Trzyma tylko token odświeżania w pliku
 *     db.local.json, który jest ignorowany przez git.
 *  5. Godziny pokazuje w czasie lokalu (Asia/Jakarta), bo tak liczy je aplikacja.
 *
 * Dodawanie nowych poleceń: dopisz funkcję i wpis w obiekcie COMMANDS
 * (na końcu pliku). Każde polecenie dostaje gotowe narzędzia: rest(), countRows(),
 * table(), jakarta(), rp() itd.
 */

import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline/promises';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG_FILE = join(ROOT, 'config', 'supabase-config.js');
const SESSION_FILE = join(ROOT, 'db.local.json');

const TIME_ZONE = 'Asia/Jakarta';
const TIME_ZONE_OFFSET = '+07:00';
const PAGE_SIZE = 1000;
const PAGE_LIMIT = 50000;
const TABLES = {
  menu: { table: 'menu_items', key: 'local_id' },
  ingredients: { table: 'ingredients', key: 'local_id' },
  clientOrders: { table: 'client_orders', key: 'created_at' },
  purchaseOrders: { table: 'purchase_orders', key: 'created_at' }
};

let CONN = null;
let useColor = true;

/* ------------------------------------------------------------------ kolory */

const color = (code, text) => (useColor ? `\u001b[${code}m${text}\u001b[0m` : String(text));
const bold = text => color('1', text);
const gray = text => color('90', text);
const green = text => color('32', text);
const yellow = text => color('33', text);
const red = text => color('31', text);

/* ------------------------------------------------------------- konfiguracja */

function readConnection() {
  if (!existsSync(CONFIG_FILE)) {
    throw new Error(`Nie znalazłem pliku ${CONFIG_FILE}`);
  }
  const source = readFileSync(CONFIG_FILE, 'utf8');
  const url = /url:\s*['"]([^'"]+)['"]/.exec(source)?.[1];
  const anonKey = /anonKey:\s*['"]([^'"]+)['"]/.exec(source)?.[1];
  if (!url || !anonKey) {
    throw new Error('W config/supabase-config.js brakuje adresu projektu albo klucza publishable.');
  }
  return { url: url.replace(/\/+$/, ''), anonKey };
}

async function apiRequest(path, { method = 'GET', body, headers = {} } = {}) {
  const response = await fetch(`${CONN.url}${path}`, {
    method,
    headers: {
      apikey: CONN.anonKey,
      'Content-Type': 'application/json',
      ...headers
    },
    body: body === undefined ? undefined : JSON.stringify(body)
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
    const message = payload?.msg || payload?.message || payload?.error_description || `HTTP ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.code = payload?.error_code || (typeof payload?.code === 'string' ? payload.code : '');
    throw error;
  }
  return payload;
}

/* ------------------------------------------------------------------- sesja */

function readSession() {
  if (!existsSync(SESSION_FILE)) return null;
  try {
    return JSON.parse(readFileSync(SESSION_FILE, 'utf8'));
  } catch (error) {
    return null;
  }
}

function writeSession(session) {
  writeFileSync(SESSION_FILE, `${JSON.stringify(session, null, 2)}\n`, 'utf8');
}

function toSession(payload, previous = {}) {
  return {
    email: payload.user?.email || previous.email || '',
    refresh_token: payload.refresh_token || previous.refresh_token,
    access_token: payload.access_token,
    expires_at: Date.now() + Number(payload.expires_in || 3600) * 1000,
    saved_at: new Date().toISOString()
  };
}

/** Zwraca ważny token dostępu, w razie potrzeby odświeżając sesję. */
async function ensureSession() {
  const session = readSession();
  if (!session?.refresh_token) {
    throw new Error('Brak zapisanej sesji. Uruchom najpierw:\n  node tools/db.mjs login');
  }
  if (session.access_token && session.expires_at - 60000 > Date.now()) return session;

  try {
    const payload = await apiRequest('/auth/v1/token?grant_type=refresh_token', {
      method: 'POST',
      body: { refresh_token: session.refresh_token }
    });
    const updated = toSession(payload, session);
    writeSession(updated);
    return updated;
  } catch (error) {
    throw new Error(`Sesja wygasła (${error.message}). Zaloguj się ponownie:\n  node tools/db.mjs login`);
  }
}

/* -------------------------------------------------------------------- HTTP */

/** Czyta wiersze z tabeli lub widoku (z automatycznym stronicowaniem). */
async function rest(table, params = {}) {
  const session = await ensureSession();
  const rows = [];
  let offset = 0;

  for (;;) {
    const url = new URL(`${CONN.url}/rest/v1/${table}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') url.searchParams.set(key, value);
    });

    const response = await fetch(url, {
      headers: {
        apikey: CONN.anonKey,
        Authorization: `Bearer ${session.access_token}`,
        'Range-Unit': 'items',
        Range: `${offset}-${offset + PAGE_SIZE - 1}`
      }
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Zapytanie do ${table} nie udało się: HTTP ${response.status} ${text.slice(0, 200)}`);
    }

    const chunk = await response.json();
    rows.push(...chunk);
    if (chunk.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
    if (offset >= PAGE_LIMIT) {
      process.stderr.write(yellow(`Uwaga: przerwano na ${PAGE_LIMIT} wierszach.\n`));
      break;
    }
  }

  return rows;
}

/** Liczba wierszy bez pobierania ich treści (nagłówek content-range). */
async function countRows(table, key = 'created_at', extra = {}) {
  const session = await ensureSession();
  const url = new URL(`${CONN.url}/rest/v1/${table}`);
  url.searchParams.set('select', key);
  url.searchParams.set('limit', '1');
  Object.entries(extra).forEach(([name, value]) => url.searchParams.set(name, value));

  const response = await fetch(url, {
    headers: {
      apikey: CONN.anonKey,
      Authorization: `Bearer ${session.access_token}`,
      Prefer: 'count=exact'
    }
  });
  const range = response.headers.get('content-range') || '';
  return range.includes('/') ? Number(range.split('/')[1]) : null;
}

/* ------------------------------------------------------------------ format */

const jakartaFormat = new Intl.DateTimeFormat('sv-SE', {
  timeZone: TIME_ZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit'
});

/** '2026-09-13 22:29' -> '13.09.2026 22:29' (czas lokalu). */
function jakarta(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  const [day, time] = jakartaFormat.format(date).split(' ');
  const [year, month, dayOfMonth] = day.split('-');
  return `${dayOfMonth}.${month}.${year} ${time}`;
}

/** Data (bez godziny) w czasie lokalu - do grupowania sprzedaży dziennej. */
function jakartaDay(value) {
  const full = jakarta(value);
  return full ? full.slice(0, 10) : '';
}

function hoursSince(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return (Date.now() - date.getTime()) / 3600000;
}

function rp(value) {
  const number = Number(value || 0);
  return `Rp ${number.toLocaleString('id-ID', { maximumFractionDigits: 0 })}`;
}

function shortDevice(deviceId) {
  return String(deviceId || '').slice(0, 8);
}

/** Prosty druk tabeli z wyrównaniem kolumn. */
function table(headers, rows) {
  if (!rows.length) {
    process.stdout.write(gray('  (brak wierszy)\n'));
    return;
  }
  const widths = headers.map((header, index) => Math.max(
    header.length,
    ...rows.map(row => String(row[index] ?? '').length)
  ));
  const line = values => values.map((value, index) => String(value ?? '').padEnd(widths[index])).join('  ');
  process.stdout.write(`${bold(line(headers))}\n`);
  process.stdout.write(gray(`${line(widths.map(width => '─'.repeat(width)))}\n`));
  rows.forEach(row => process.stdout.write(`${line(row)}\n`));
}

function itemsText(items) {
  if (!Array.isArray(items) || !items.length) return '';
  return items
    .map(item => {
      const qty = Number(item.qty ?? item.quantity ?? 0);
      const name = item.name || item.productId || item.meal_id || '?';
      const line = Number(item.lineTotal ?? (qty * Number(item.price ?? item.unit_price ?? 0)));
      return `${qty}× ${name} — ${rp(line)}`;
    })
    .join('; ');
}

function summary(rows) {
  const total = rows.reduce((sum, row) => sum + Number(row.total || 0), 0);
  process.stdout.write(`\n${bold('Razem')}: ${rows.length} zamówień, ${bold(rp(total))}\n`);
}

/* ---------------------------------------------------------------- filtry */

function dateFilters(options) {
  const filters = {};
  if (options.days) filters.from = new Date(Date.now() - Number(options.days) * 86400000).toISOString();
  if (options.from) filters.from = `${options.from}T00:00:00${TIME_ZONE_OFFSET}`;
  if (options.to) filters.to = `${options.to}T23:59:59${TIME_ZONE_OFFSET}`;
  return filters;
}

function orderFilters(options) {
  const filters = dateFilters(options);
  if (options.user) filters.user_name = `ilike.*${options.user}*`;
  if (options.device) filters.device_id = `eq.${options.device}`;
  return filters;
}

/**
 * PostgREST nie przyjmuje dwóch warunków na tej samej kolumnie w jednym
 * zapytaniu, dlatego górną granicę daty zawężamy po stronie skryptu (isWithin).
 */
function applyOrderFilters(target, filters) {
  if (filters.user_name) target.user_name = filters.user_name;
  if (filters.device_id) target.device_id = filters.device_id;
  if (filters.from) target.created_at = `gte.${filters.from}`;
  return target;
}

function isWithin(filters, value) {
  if (filters.from && new Date(value) < new Date(filters.from)) return false;
  if (filters.to && new Date(value) > new Date(filters.to)) return false;
  return true;
}

/* -------------------------------------------------------------- polecenia */

const COMMANDS = {};

COMMANDS.help = {
  summary: 'lista poleceń',
  run() {
    process.stdout.write(`${bold('Kedai POS – pomost do bazy Supabase')}\n`);
    process.stdout.write(`${gray('Tylko czyta dane. Nic nie zapisuje ani nie kasuje.')}\n\n`);
    process.stdout.write(`${bold('Polecenia:')}\n`);
    const rows = Object.entries(COMMANDS)
      .filter(([name]) => name !== 'help')
      .map(([name, command]) => [`  ${name}`, command.summary || '']);
    table(['polecenie', 'co robi'], rows);
    process.stdout.write(`\n${bold('Wspólne opcje:')}\n`);
    table(['opcja', 'znaczenie'], [
      ['  --user NAZWA', 'filtr po nazwie użytkownika (dopasowanie częściowe)'],
      ['  --device ID', 'filtr po identyfikatorze telefonu (początek wystarczy)'],
      ['  --days N', 'tylko dane z ostatnich N dni'],
      ['  --from RRRR-MM-DD', 'od dnia (czas lokalu)'],
      ['  --to RRRR-MM-DD', 'do dnia (czas lokalu)'],
      ['  --deleted', 'pokaż tylko usunięte w aplikacji'],
      ['  --all', 'pokaż wszystkie, także usunięte'],
      ['  --limit N', 'ogranicz liczbę wierszy'],
      ['  --json', 'wynik jako JSON (do dalszego przetwarzania)'],
      ['  --no-color', 'bez kolorów']
    ]);
    process.stdout.write(`\n${bold('Przykłady:')}\n`);
    process.stdout.write(gray('  node tools/db.mjs login\n'));
    process.stdout.write(gray('  node tools/db.mjs devices\n'));
    process.stdout.write(gray('  node tools/db.mjs orders --user PIPIN --days 3\n'));
    process.stdout.write(gray('  node tools/db.mjs sales --days 7 --user PIPIN\n'));
    process.stdout.write(gray('  node tools/db.mjs menu --user PIPIN\n'));
    process.stdout.write(gray('  node tools/db.mjs gaps\n'));
    process.stdout.write(`\n${bold('Pierwsze uruchomienie:')} node tools/db.mjs login (pyta o e-mail i hasło konta lokalu)\n`);
  }
};

COMMANDS.login = {
  summary: 'zaloguj się i zapamiętaj sesję',
  async run() {
    const previous = readSession();
    const { email, password } = await askCredentials(previous?.email);
    if (!email || !password) throw new Error('Podaj e-mail i hasło.');

    const payload = await apiRequest('/auth/v1/token?grant_type=password', {
      method: 'POST',
      body: { email, password }
    });
    writeSession(toSession(payload, { email }));
    process.stdout.write(`${green('Zalogowano')}: ${payload.user?.email || email}\n`);
    process.stdout.write(gray(`Sesja zapisana w ${SESSION_FILE} (plik ignorowany przez git - zawiera tylko token odświeżania).\n`));
  }
};

COMMANDS.whoami = {
  summary: 'pokaż, kim jesteś zalogowany (--logout wylogowuje)',
  async run(options) {
    if (options.logout) {
      if (existsSync(SESSION_FILE)) rmSync(SESSION_FILE);
      process.stdout.write(`${green('Sesja usunięta.')}\n`);
      return;
    }
    const session = readSession();
    if (!session) {
      process.stdout.write(`${yellow('Brak zapisanej sesji.')} Uruchom: node tools/db.mjs login\n`);
      return;
    }
    const valid = session.expires_at - 60000 > Date.now();
    process.stdout.write(`Konto: ${bold(session.email || '(brak)')}\n`);
    process.stdout.write(`Token: ${valid ? green('ważny') : yellow('odświeży się automatycznie')}\n`);
    process.stdout.write(`Zapisany: ${jakarta(session.saved_at)}\n`);
  }
};

COMMANDS.devices = {
  summary: 'które telefony wysyłają dane, ile i kiedy ostatnio',
  async run(options) {
    const filters = orderFilters(options);
    const rows = await rest('client_orders', {
      select: 'device_id,user_name,local_id,created_at,updated_at,status,deleted',
      order: 'created_at'
    });

    const devices = new Map();
    rows.forEach(row => {
      if (!isWithin(filters, row.created_at)) return;
      if (!devices.has(row.device_id)) {
        devices.set(row.device_id, {
          deviceId: row.device_id, names: new Set(), ids: [], rows: 0,
          deleted: 0, lastCreated: null, lastPushed: null
        });
      }
      const device = devices.get(row.device_id);
      device.names.add(row.user_name || '(bez nazwy)');
      device.ids.push(Number(row.local_id));
      device.rows += 1;
      if (row.deleted) device.deleted += 1;
      if (!device.lastCreated || row.created_at > device.lastCreated) device.lastCreated = row.created_at;
      if (!device.lastPushed || row.updated_at > device.lastPushed) device.lastPushed = row.updated_at;
    });

    const output = [...devices.values()]
      .sort((first, second) => String(second.lastPushed).localeCompare(String(first.lastPushed)))
      .map(device => {
        const sorted = device.ids.slice().sort((first, second) => first - second);
        const missing = [];
        for (let index = 1; index < sorted.length; index += 1) {
          if (sorted[index] !== sorted[index - 1] + 1) missing.push(`${sorted[index - 1] + 1}..${sorted[index] - 1}`);
        }
        const silent = hoursSince(device.lastPushed);
        const flag = silent !== null && silent > 24 ? red('milczy >24h') : green('ok');
        return [
          shortDevice(device.deviceId),
          [...device.names].join(' / '),
          device.rows,
          `${sorted[0]}..${sorted[sorted.length - 1]}`,
          missing.length ? red(missing.join(', ')) : green('brak'),
          jakarta(device.lastCreated),
          jakarta(device.lastPushed),
          flag
        ];
      });

    if (options.json) return printJson(output);
    table(['telefon', 'nazwa', 'wierszy', 'id od-do', 'dziury', 'ostatnie zamówienie', 'ostatnia wysyłka', 'stan'], output);
    process.stdout.write(`\n${gray('Wskazówka: telefon, którego tu nie ma, nigdy nie wysłał żadnego wiersza.')}\n`);
    process.stdout.write(`${gray('Nazwę ustawia się w aplikacji: Ustawienia → Chmura → Nazwa użytkownika.')}\n`);
  }
};

COMMANDS.orders = {
  summary: 'lista zamówień (--user, --device, --days/--from/--to, --limit)',
  async run(options) {
    const filters = orderFilters(options);
    const params = applyOrderFilters({
      select: 'local_id,created_at,status,total,user_name,device_id,items,deleted',
      order: 'created_at.desc',
      limit: options.limit ? String(options.limit) : String(PAGE_SIZE)
    }, filters);
    if (!options.all && !options.deleted) params.deleted = 'eq.false';
    if (options.deleted) params.deleted = 'eq.true';

    let rows = await rest('client_orders', params);
    rows = rows.filter(row => isWithin(filters, row.created_at));
    if (options.limit) rows = rows.slice(0, Number(options.limit));

    if (options.json) return printJson(rows);

    table(['nr', 'powstało (JKT)', 'status', 'użytkownik', 'telefon', 'pozycje', 'razem'], rows.map(row => [
      row.local_id,
      jakarta(row.created_at),
      row.deleted ? red('usunięte') : row.status,
      row.user_name,
      shortDevice(row.device_id),
      itemsText(row.items),
      rp(row.total)
    ]));
    summary(rows);
  }
};

COMMANDS.sales = {
  summary: 'sprzedaż dzienna (--days, --user, --device)',
  async run(options) {
    const filters = orderFilters(options);
    const params = applyOrderFilters({
      select: 'created_at,total,status,user_name,device_id,deleted',
      order: 'created_at'
    }, filters);
    params.deleted = 'eq.false';

    const rows = (await rest('client_orders', params)).filter(row => isWithin(filters, row.created_at));
    const days = new Map();
    rows.forEach(row => {
      const day = jakartaDay(row.created_at);
      if (!days.has(day)) days.set(day, { day, count: 0, total: 0 });
      const entry = days.get(day);
      entry.count += 1;
      entry.total += Number(row.total || 0);
    });

    const output = [...days.values()].sort((first, second) => second.day.localeCompare(first.day));
    if (options.json) return printJson(output);

    table(['dzień', 'zamówień', 'sprzedaż'], output.map(entry => [entry.day, entry.count, rp(entry.total)]));
    summary(rows);
  }
};

COMMANDS.menu = {
  summary: 'pełne menu z zakładkami (--user, --device)',
  async run(options) {
    const params = { select: 'device_id,user_name,sort_order,name,price,type,local_id,deleted', order: 'sort_order' };
    if (options.device) params.device_id = `eq.${options.device}`;
    if (options.user && !options.device) params.user_name = `ilike.*${options.user}*`;
    params.deleted = 'eq.false';

    const rows = await rest('menu_items', params);
    if (options.json) return printJson(rows);

    const groups = new Map();
    rows.forEach(row => {
      const key = `${shortDevice(row.device_id)} ${row.user_name}`;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(row);
    });

    [...groups.entries()].forEach(([label, items]) => {
      process.stdout.write(`\n${bold(label)} ${gray(`(${items.length} wierszy)`)}\n`);
      items.sort((first, second) => Number(first.sort_order) - Number(second.sort_order));
      items.forEach(item => {
        if (item.type === 'section') {
          process.stdout.write(`\n  ${bold(`▸ ${item.name}`)} ${gray(`(zakładka, pozycja ${item.sort_order})`)}\n`);
          return;
        }
        process.stdout.write(`    ${String(item.sort_order).padStart(3)}  ${item.name.padEnd(22)} ${rp(item.price)}  ${gray(item.local_id)}\n`);
      });
    });
  }
};

COMMANDS.gaps = {
  summary: 'brakujące numery (local_id) per telefon',
  async run(options) {
    const rows = await rest('client_orders', { select: 'device_id,local_id,created_at,user_name', order: 'local_id' });
    const devices = new Map();
    rows.forEach(row => {
      if (options.device && !String(row.device_id).startsWith(options.device)) return;
      if (!devices.has(row.device_id)) devices.set(row.device_id, { ids: [], name: row.user_name, last: null });
      const device = devices.get(row.device_id);
      device.ids.push(Number(row.local_id));
      if (!device.last || row.created_at > device.last) device.last = row.created_at;
    });

    const output = [...devices.entries()].map(([deviceId, device]) => {
      const sorted = device.ids.slice().sort((first, second) => first - second);
      const missing = [];
      for (let index = 1; index < sorted.length; index += 1) {
        if (sorted[index] !== sorted[index - 1] + 1) missing.push(`${sorted[index - 1] + 1}..${sorted[index] - 1}`);
      }
      return {
        device: shortDevice(deviceId),
        user: device.name,
        rows: sorted.length,
        expected: sorted[sorted.length - 1],
        missing: missing.join(', '),
        last: jakarta(device.last)
      };
    });

    if (options.json) return printJson(output);
    table(['telefon', 'nazwa', 'wierszy', 'max id', 'brakujące id', 'ostatnie zamówienie'], output.map(entry => [
      entry.device, entry.user, entry.rows, entry.expected,
      entry.missing ? red(entry.missing) : green('brak'), entry.last
    ]));
    process.stdout.write(`\n${gray('Luka oznacza, że numer został zużyty na telefonie, ale wiersza nie ma w chmurze')}\n`);
    process.stdout.write(`${gray('(albo zamówienie zostało usunięte w aplikacji przed wysyłką, albo nigdy nie dotarło).')}\n`);
  }
};

COMMANDS.deleted = {
  summary: 'co zostało usunięte w aplikacji (miękkie usuwanie)',
  async run(options) {
    const result = {};
    for (const [name, definition] of Object.entries(TABLES)) {
      const rows = await rest(definition.table, { select: '*', deleted: 'eq.true', order: `${definition.key}.desc` });
      result[name] = rows;
    }

    if (options.json) return printJson(result);

    Object.entries(result).forEach(([name, rows]) => {
      process.stdout.write(`\n${bold(name)}: ${rows.length} usuniętych\n`);
      if (!rows.length) return;
      const preview = rows.slice(0, 10).map(row => [
        row.local_id ?? row.created_at,
        jakarta(row.deleted_at),
        row.user_name,
        row.name || rp(row.total ?? row.total_price ?? 0)
      ]);
      table(['id / data', 'usunięto (JKT)', 'kto', 'co'], preview);
      if (rows.length > 10) process.stdout.write(gray(`  ... i ${rows.length - 10} więcej\n`));
    });
  }
};

COMMANDS.counts = {
  summary: 'liczba wierszy w każdej tabeli',
  async run(options) {
    const output = [];
    for (const [name, definition] of Object.entries(TABLES)) {
      const total = await countRows(definition.table, definition.key);
      const deleted = await countRows(definition.table, definition.key, { deleted: 'eq.true' });
      output.push({ name, total, deleted, active: total === null || deleted === null ? null : total - deleted });
    }

    if (options.json) return printJson(output);
    table(['tabela', 'wszystkich', 'usuniętych', 'aktywnych'], output.map(entry => [
      entry.name, entry.total, entry.deleted, entry.active
    ]));
  }
};

function printJson(payload) {
  process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
}

/* ------------------------------------------------------------ pytania do UI */

/**
 * Jedno wejście dla całego logowania: najpierw e-mail (widoczny), potem hasło
 * (wpisywane znaki są wyciszone). Osobne interfejsy dla każdego pytania psują
 * czytanie klawiatury na Windows, dlatego korzystamy z jednego.
 */
async function askCredentials(previousEmail) {
  // Wariant dla automatyzacji: dane z zmiennych środowiskowych, bez pytania.
  if (process.env.KEDAI_EMAIL && process.env.KEDAI_PASSWORD) {
    return { email: process.env.KEDAI_EMAIL.trim(), password: process.env.KEDAI_PASSWORD };
  }
  if (!process.stdin.isTTY) {
    throw new Error('Logowanie wymaga terminala. Uruchom:\n  node tools/db.mjs login');
  }

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: Boolean(process.stdin.isTTY)
  });

  try {
    const email = (await rl.question(`E-mail konta lokalu${previousEmail ? ` [${previousEmail}]` : ''}: `)).trim()
      || previousEmail
      || '';

    // Wyciszamy echo tylko na czas hasła: własny nagłówek + tryb raw terminala
    // (raw wyłącza echo na poziomie konsoli, czego samo readline nie gwarantuje).
    const original = rl._writeToOutput ? rl._writeToOutput.bind(rl) : null;
    const canHide = typeof process.stdin.setRawMode === 'function' && Boolean(process.stdin.isTTY);
    process.stdout.write('Hasło (nie będzie widoczne): ');

    let password = '';
    try {
      if (canHide) process.stdin.setRawMode(true);
      if (original) rl._writeToOutput = () => {};
      password = await rl.question('');
    } finally {
      if (original) rl._writeToOutput = original;
      if (canHide) process.stdin.setRawMode(false);
      process.stdout.write('\n');
    }

    return { email, password };
  } catch (error) {
    // Przerwane wejście (Ctrl+C, koniec danych) nie może wyglądać jak awaria skryptu.
    if (error?.code === 'ABORT_ERR' || error?.name === 'AbortError') {
      throw new Error('Przerwano logowanie (brak danych wejściowych).');
    }
    throw error;
  } finally {
    rl.close();
  }
}

/* ------------------------------------------------------------------- start */

function parseArgs(argv) {
  const options = { _: [] };
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (token === '--no-color') {
      options.color = false;
      continue;
    }
    if (token.startsWith('--')) {
      const name = token.slice(2);
      const next = argv[index + 1];
      if (next === undefined || next.startsWith('--')) {
        options[name] = true;
      } else {
        options[name] = next;
        index += 1;
      }
    } else {
      options._.push(token);
    }
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  useColor = options.color !== false && !process.env.NO_COLOR;
  CONN = readConnection();

  const name = options._[0] || 'help';
  const command = COMMANDS[name];
  if (!command) {
    process.stdout.write(`${red(`Nie znam polecenia "${name}".`)}\n\n`);
    COMMANDS.help.run();
    process.exitCode = 1;
    return;
  }

  if (options.help) {
    COMMANDS.help.run();
    return;
  }

  await command.run(options);
}

main().catch(error => {
  process.stdout.write(`${red('Błąd:')} ${error?.message || error}\n`);
  process.exitCode = 1;
});
