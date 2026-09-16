#!/usr/bin/env node
/**
 * Wydanie TESTOWE pod adresem https://pawfur.github.io/ktp/test/
 *
 * Po co osobny skrypt: `push-release.mjs` wypuszcza wersje dla lokalu i ma
 * podnosić numer wersji oraz czekać na aktualizację PIPIN. Ten plik jest
 * całkowicie niezależny i NIE dotyka tamtego narzędzia ani wersji oficjalnej.
 *
 * Co robi:
 *   1. kopiuje aplikację do podkatalogu `test/`,
 *   2. w kopii nadaje własną nazwę cache (z datą publikacji) i włącza
 *      automatyczną aktualizację - testowy telefon ma zawsze dostać świeży kod,
 *      a dane lokalne i tak są nietykane przez aktualizację service workera,
 *   3. pilnuje, żeby kopie nie kasowały sobie nawzajem cache (wspólna domena!),
 *   4. commituje i wypycha, a potem sprawdza adres w sieci.
 *
 * Numer wersji lokalu NIE jest ruszany - testowe wydanie dostaje własny numer
 * z chwili publikacji, żeby dało się je odróżnić.
 *
 * Użycie:
 *   node tools/push-test.mjs            # publikacja z potwierdzeniem
 *   node tools/push-test.mjs -y         # bez pytania
 *   node tools/push-test.mjs --no-push  # tylko zbuduj katalog test/
 *   node tools/push-test.mjs --no-verify
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const TEST_DIR = path.join(ROOT, 'test');
const REMOTE = 'origin';
const BRANCH = 'main';
const PREVIEW_URL = 'https://pawfur.github.io/ktp/test/version.json';

/** Pliki aplikacji kopiowane do wydania testowego. */
const APP_FILES = [
  'index.html',
  'styles.css',
  'app.js',
  'database.js',
  'manifest.json',
  'service-worker.js',
  'version.json',
  'logoKTP.png'
];

/** Katalogi kopiowane w całości (config/ zawiera wybór środowiska). */
const APP_DIRS = ['config', 'modules'];

const args = process.argv.slice(2);
const flag = name => args.includes(name);
const SKIP_CONFIRM = flag('-y') || flag('--yes');
const SKIP_PUSH = flag('--no-push');
const SKIP_VERIFY = flag('--no-verify');

const colors = {
  reset: '\u001b[0m',
  dim: '\u001b[2m',
  green: '\u001b[32m',
  yellow: '\u001b[33m',
  red: '\u001b[31m',
  bold: '\u001b[1m'
};

const log = message => console.log(message);
const ok = message => log(`  ${colors.green}✓${colors.reset} ${message}`);
const warn = message => log(`  ${colors.yellow}!${colors.reset} ${message}`);
const fail = message => {
  log(`  ${colors.red}✗${colors.reset} ${message}`);
  process.exit(1);
};

function git(gitArgs) {
  return execFileSync('git', gitArgs, { cwd: ROOT, encoding: 'utf8' }).trim();
}

/** Numer wersji z zegara lokalnego - identyczny format jak wersja lokalu. */
function localStamp(date = new Date()) {
  const pad = value => String(value).padStart(2, '0');
  return `${String(date.getFullYear()).slice(2)}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`
    + `.${pad(date.getHours())}${pad(date.getMinutes())}`;
}

function copyAppInto(targetDir) {
  fs.rmSync(targetDir, { recursive: true, force: true });
  fs.mkdirSync(targetDir, { recursive: true });

  for (const file of APP_FILES) {
    const source = path.join(ROOT, file);
    if (!fs.existsSync(source)) fail(`Brak pliku ${file} w katalogu głównym.`);
    fs.copyFileSync(source, path.join(targetDir, file));
  }

  for (const dir of APP_DIRS) {
    const source = path.join(ROOT, dir);
    if (!fs.existsSync(source)) fail(`Brak katalogu ${dir}/.`);
    fs.cpSync(source, path.join(targetDir, dir), { recursive: true });
  }
}

/**
 * Poprawki w kopii. Wszystkie dotyczą WYŁĄCZNIE wydania testowego.
 */
function adaptTestBuild(targetDir, stamp) {
  const changes = [];

  // 1. Service worker: własna nazwa cache z datą publikacji. Dzięki temu każde
  //    wydanie testowe jest dla telefonu nową wersją i sam się zaktualizuje.
  const cacheName = `kedai-pos-test-${stamp}`;
  const swPath = path.join(targetDir, 'service-worker.js');
  let sw = fs.readFileSync(swPath, 'utf8');

  // Pliki w repozytorium mają końce linii CRLF - zachowujemy je w poprawkach,
  // żeby kopia nie była mieszanką dwóch sposobów łamania linii.
  const newline = sw.includes('\r\n') ? '\r\n' : '\n';

  if (!/const CACHE_NAME = '[^']*';/.test(sw)) fail('Nie znalazłem CACHE_NAME w service-worker.js.');
  sw = sw.replace(/const CACHE_NAME = '[^']*';/, `const CACHE_NAME = '${cacheName}';`);
  changes.push(`CACHE_NAME → ${cacheName}`);

  // 2. Automatyczna aktualizacja. W wydaniu lokalu jest celowo wyłączona
  //    (dane w lokalu!), ale telefon testowy ma dostawać świeży kod sam.
  //    Uwaga: pliki w repozytorium mają końce linii CRLF, więc dopasowujemy
  //    pojedyncze fragmenty, a nie całe bloki - inaczej dopasowanie pęka.
  if (!/event\.waitUntil\(preloadAppShell\(\)\);/.test(sw)) {
    fail('Nie znalazłem wywołania preloadAppShell w service-worker.js.');
  }
  sw = sw.replace(
    /\/\/ Celowo bez skipWaiting\(\)\.[\s\S]*?samoczynnie\./,
    [
      '// WYDANIE TESTOWE: auto-aktualizacja włączona celowo. Telefon testowy ma',
      '  // zawsze dostać najnowszy kod bez klikania; aktualizacja service workera',
      '  // nie dotyka danych w IndexedDB.'
    ].join(newline)
  );
  sw = sw.replace(
    /event\.waitUntil\(preloadAppShell\(\)\);/,
    'event.waitUntil(preloadAppShell().then(() => self.skipWaiting()));'
  );
  changes.push('install → automatyczna aktywacja (skipWaiting)');

  // 3. Kasowanie cache TYLKO w obrębie wydania testowego. Obie aplikacje leżą
  //    na tej samej domenie i dzielą magazyn cache, więc bez tego warunku
  //    wydanie testowe usunęłoby cache aplikacji lokalu (i odwrotnie).
  if (!/keys\.filter\(key => key !== CACHE_NAME\)\.map\(key => caches\.delete\(key\)\)\);/.test(sw)) {
    fail('Nie rozpoznałem sprzątania cache w service-worker.js.');
  }
  sw = sw.replace(
    /keys\.filter\(key => key !== CACHE_NAME\)\.map\(key => caches\.delete\(key\)\)\);/,
    [
      'keys',
      "      .filter(key => key.startsWith('kedai-pos-test-') && key !== CACHE_NAME)",
      '      .map(key => caches.delete(key)));'
    ].join(newline)
  );
  changes.push('activate → sprząta tylko cudze cache testowe');

  fs.writeFileSync(swPath, sw, 'utf8');

  // 4. Własny numer wersji, żeby dało się odróżnić wydanie testowe od lokalu.
  fs.writeFileSync(
    path.join(targetDir, 'version.json'),
    `${JSON.stringify({ version: stamp }, null, 2)}\n`,
    'utf8'
  );

  const statePath = path.join(targetDir, 'config', 'default-state.js');
  let state = fs.readFileSync(statePath, 'utf8');
  if (!/version: '[^']*'/.test(state)) fail('Nie znalazłem numeru wersji w config/default-state.js.');
  state = state.replace(/version: '[^']*'/, `version: '${stamp}'`);
  fs.writeFileSync(statePath, state, 'utf8');
  changes.push(`numer wersji → ${stamp}`);

  return changes;
}

async function verifyPreview(stamp, attempts = 20, delayMs = 6000) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(`${PREVIEW_URL}?cb=${Date.now()}`, { cache: 'no-store' });
      if (response.ok) {
        const payload = await response.json();
        if (payload?.version === stamp) return true;
      }
    } catch (error) {
      // Sieć bywa chwilowa - próbujemy dalej.
    }
    log(`  ${colors.dim}czekam na GitHub Pages... (${attempt}/${attempts})${colors.reset}`);
    await new Promise(resolve => setTimeout(resolve, delayMs));
  }
  return false;
}

async function main() {
  log(`\n${colors.bold}Kedai POS - wydanie TESTOWE (${colors.green}/ktp/test/${colors.reset}${colors.bold})${colors.reset}\n`);

  const stamp = localStamp();
  log(`[1/5] Numer wydania testowego\n  ${stamp}`);

  log('\n[2/5] Kopiowanie aplikacji do test/');
  copyAppInto(TEST_DIR);
  for (const file of APP_FILES) log(`  ${colors.dim}${file}${colors.reset}`);
  for (const dir of APP_DIRS) log(`  ${colors.dim}${dir}/ (cały katalog)${colors.reset}`);

  log('\n[3/5] Poprawki tylko w kopii');
  for (const change of adaptTestBuild(TEST_DIR, stamp)) ok(change);

  if (SKIP_PUSH) {
    log(`\n${colors.yellow}Gotowe bez publikacji (--no-push).${colors.reset}`);
    log('Katalog test/ zawiera wydanie testowe.\n');
    return;
  }

  log('\n[4/5] Commit i push');
  git(['add', '--', 'test']);
  const staged = git(['diff', '--cached', '--name-only']).split('\n').filter(Boolean);
  if (!staged.length) {
    log('  Brak zmian do wysłania - wydanie testowe jest już aktualne.');
    return;
  }
  log(`  Plików w commicie: ${staged.length}`);
  git(['commit', '-m', `Wydanie testowe ${stamp}`]);
  const sha = git(['rev-parse', '--short', 'HEAD']);
  ok(`${sha} → ${REMOTE}/${BRANCH}`);

  // Wydanie testowe jest samodzielne (ma własne kopie plików), więc kod
  // źródłowy w katalogu głównym celowo zostaje niezacommitowany - trafi do
  // repozytorium dopiero przy oficjalnym wydaniu dla lokalu.
  const leftovers = git(['status', '--short']).split('\n').filter(Boolean);
  if (leftovers.length) {
    log(`  ${colors.dim}Poza wydaniem testowym zmienione (trafią przy oficjalnym wydaniu):${colors.reset}`);
    for (const line of leftovers) log(`  ${colors.dim}${line}${colors.reset}`);
  }

  try {
    git(['push', REMOTE, BRANCH]);
  } catch (error) {
    fail(`Push nie udał się: ${error.message}`);
  }

  log('\n[5/5] Publikacja na GitHub Pages');
  if (SKIP_VERIFY) {
    warn('Pomijam sprawdzanie (--no-verify).');
  } else if (await verifyPreview(stamp)) {
    ok(`wydanie testowe widoczne w sieci (${stamp})`);
  } else {
    warn('Nie potwierdziłem adresu w sieci - sprawdź https://pawfur.github.io/ktp/test/ ręcznie.');
  }

  log(`\n${colors.bold}Adres do testów:${colors.reset} https://pawfur.github.io/ktp/test/`);
  log(`${colors.bold}Baza:${colors.reset} projekt KTP-test (środowisko wybiera adres, nie ustawienie)`);
  log(`${colors.bold}Wydanie lokalu:${colors.reset} nietknięte - inny numer wersji i inny cache\n`);
}

main().catch(error => {
  log(`\n${colors.red}Błąd: ${error.message}${colors.reset}\n`);
  process.exit(1);
});
