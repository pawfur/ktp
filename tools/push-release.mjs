#!/usr/bin/env node
/* eslint-disable no-console */

/**
 * Kedai POS – publikacja nowej wersji na GitHubie.
 *
 * Skrypt wykonuje dokładnie te kroki, które trzeba zrobić przy każdym wydaniu:
 *
 *   1. sprawdza stan repozytorium (gałąź `main`, brak operacji git w toku,
 *      brak commitów na origin, których nie ma lokalnie),
 *   2. wylicza numer wersji z bieżącego CZASU LOKALNEGO (`YY.MM.DD.hhmm`),
 *   3. wpisuje go do `config/default-state.js` i `version.json`,
 *   4. podbija `CACHE_NAME` w `service-worker.js` (np. `kedai-pos-v31` → `v32`),
 *   5. uruchamia wszystkie testy `tests/check-*.mjs`,
 *   6. pokazuje listę plików do wysłania – kopie zapasowe danych
 *      (`kedai-pos-backup-*.json`) są pomijane, bo repo jest publiczne,
 *   7. robi commit i `git push origin main`,
 *   8. czeka, aż GitHub Pages opublikuje nowy `version.json`.
 *
 * Gdy test się nie powiedzie, skrypt przywraca poprzednią treść trzech plików
 * z wersją, więc nieudane wydanie nie zostawia bałaganu w repozytorium.
 *
 * Użycie:
 *   node tools/push-release.mjs -m "Opis zmiany"
 *   node tools/push-release.mjs                    (zapyta o opis zmiany)
 *   node tools/push-release.mjs --dry-run          (nic nie zmienia)
 *   node tools/push-release.mjs -m "..." -y        (bez pytania o potwierdzenie)
 *   node tools/push-release.mjs -v 26.09.12.0330   (numer wersji z ręki)
 *
 * Opcje:
 *   -m, --message <tekst>    opis zmiany (commit message)
 *   -v, --version <numer>    numer wersji YY.MM.DD.hhmm (domyślnie z zegara)
 *   -y, --yes                nie pytaj o potwierdzenie
 *       --dry-run            pokaż plan, ale nic nie zmieniaj
 *       --no-test            pomiń testy
 *       --no-push            zrób commit, ale nie wysyłaj na GitHub
 *       --no-verify          nie czekaj na publikację GitHub Pages
 *       --verify-timeout <s> ile sekund czekać na Pages (domyślnie 180)
 *   -h, --help               ta pomoc
 */

import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline/promises';
import { setTimeout as sleep } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';

/* ------------------------------------------------------------------ */
/* Konfiguracja                                                        */
/* ------------------------------------------------------------------ */

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BRANCH = 'main';
const REMOTE = 'origin';
const PAGES_BASE = 'https://pawfur.github.io/ktp';
const DEFAULT_VERIFY_TIMEOUT_MS = 180_000;

/** Pliki z numerem wersji: [ścieżka, wzorzec – grupa 2 to sam numer]. */
const VERSION_SOURCES = [
  ['config/default-state.js', /(version:\s*')(\d{2}\.\d{2}\.\d{2}\.\d{4})(')/],
  ['version.json', /("version"\s*:\s*")(\d{2}\.\d{2}\.\d{2}\.\d{4})(")/]
];

const SERVICE_WORKER = 'service-worker.js';
const CACHE_PATTERN = /(const CACHE_NAME = 'kedai-pos-v)(\d+)(';)/;

/**
 * Czego skrypt NIGDY nie doda do repozytorium. Kopie zapasowe danych lokalu
 * zawierają prawdziwe zamówienia, a repozytorium jest publiczne (GitHub Pages).
 */
const NEVER_STAGE = [/^kedai-pos-backup.*\.json$/i, /backup.*\.json$/i];

const VERSION_PATTERN = /^\d{2}\.\d{2}\.\d{2}\.\d{4}$/;

/* ------------------------------------------------------------------ */
/* Wyjście na konsolę                                                  */
/* ------------------------------------------------------------------ */

const useColor = Boolean(process.stdout.isTTY) && !process.env.NO_COLOR;
const paint = (code, text) => (useColor ? `\u001b[${code}m${text}\u001b[0m` : text);
const bold = text => paint('1', text);
const dim = text => paint('2', text);
const green = text => paint('32', text);
const yellow = text => paint('33', text);
const red = text => paint('31', text);
const cyan = text => paint('36', text);

const log = (...args) => console.log(...args);
const step = (number, text) => log(`\n${cyan(`[${number}/8]`)} ${bold(text)}`);
const warn = text => log(`  ${yellow('!')} ${text}`);

class ReleaseError extends Error {}

function fail(message) {
  throw new ReleaseError(message);
}

/* ------------------------------------------------------------------ */
/* Git                                                                 */
/* ------------------------------------------------------------------ */

function gitCapture(args) {
  try {
    return { ok: true, out: execFileSync('git', args, { cwd: ROOT, encoding: 'utf8' }).trimEnd() };
  } catch (error) {
    const details = (error.stderr || error.stdout || '').toString().trim();
    return { ok: false, out: '', error: details || error.message };
  }
}

function git(args) {
  const result = gitCapture(args);
  if (!result.ok) fail(`git ${args.join(' ')} nie powiodło się:\n  ${result.error}`);
  return result.out;
}

/** Uruchamia git z wyjściem przekazanym wprost do konsoli (commit, push). */
function gitInteractive(args) {
  const result = spawnSync('git', args, { cwd: ROOT, stdio: 'inherit' });
  if (result.error) fail(`Nie udało się uruchomić gita: ${result.error.message}`);
  return result.status ?? 1;
}

/* ------------------------------------------------------------------ */
/* Wersja                                                              */
/* ------------------------------------------------------------------ */

/**
 * Numer wersji z czasu LOKALNEGO. Świadomie nie używamy `toISOString()`,
 * bo UTC przesuwa datę i godzinę (dotyczy to też filtra archiwum).
 */
function versionFromDate(date = new Date()) {
  const pad = value => String(value).padStart(2, '0');
  return [
    pad(date.getFullYear() % 100),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    `${pad(date.getHours())}${pad(date.getMinutes())}`
  ].join('.');
}

function readVersionState() {
  const files = new Map();

  for (const [relative, pattern] of VERSION_SOURCES) {
    const absolute = path.join(ROOT, relative);
    if (!fs.existsSync(absolute)) fail(`Brak pliku ${relative}.`);
    const text = fs.readFileSync(absolute, 'utf8');
    const match = text.match(pattern);
    if (!match) fail(`Nie znalazłem numeru wersji w ${relative} – wzorzec się nie dopasował.`);
    files.set(relative, { text, version: match[2] });
  }

  const absoluteSw = path.join(ROOT, SERVICE_WORKER);
  if (!fs.existsSync(absoluteSw)) fail(`Brak pliku ${SERVICE_WORKER}.`);
  const swText = fs.readFileSync(absoluteSw, 'utf8');
  const swMatch = swText.match(CACHE_PATTERN);
  if (!swMatch) fail(`Nie znalazłem CACHE_NAME w ${SERVICE_WORKER}.`);

  const versions = [...files.values()].map(file => file.version);
  const current = versions.sort().at(-1);
  if (new Set(versions).size > 1) {
    warn(`Pliki z wersją nie są zgodne (${versions.join(', ')}) – biorę najnowszą: ${current}.`);
  }

  return { files, version: current, cacheNumber: swMatch[2], swText };
}

/** Zapisuje numer wersji i podbija CACHE_NAME. Zwraca listę zmienionych plików. */
function writeVersionFiles(state, version, cacheNumber) {
  const written = [];

  for (const [relative, pattern] of VERSION_SOURCES) {
    const { text } = state.files.get(relative);
    // Podmieniamy wyłącznie sam numer – reszta pliku (kodowanie, końce linii) bez zmian.
    fs.writeFileSync(path.join(ROOT, relative), text.replace(pattern, `$1${version}$3`), 'utf8');
    written.push(relative);
  }

  fs.writeFileSync(
    path.join(ROOT, SERVICE_WORKER),
    state.swText.replace(CACHE_PATTERN, `$1${cacheNumber}$3`),
    'utf8'
  );
  written.push(SERVICE_WORKER);

  return written;
}

/** Przywraca pliki z wersją do stanu sprzed uruchomienia skryptu. */
function restoreVersionFiles(state) {
  for (const [relative, file] of state.files) {
    fs.writeFileSync(path.join(ROOT, relative), file.text, 'utf8');
  }
  fs.writeFileSync(path.join(ROOT, SERVICE_WORKER), state.swText, 'utf8');
}

/* ------------------------------------------------------------------ */
/* Zmiany w repozytorium                                               */
/* ------------------------------------------------------------------ */

function collectChanges() {
  const lines = git(['status', '--porcelain']).split('\n').filter(line => line.trim() !== '');
  const tracked = [];
  const untracked = [];

  for (const line of lines) {
    const code = line.slice(0, 2);
    let file = line.slice(2).trim();
    if (file.includes(' -> ')) file = file.slice(file.lastIndexOf(' -> ') + 4);
    if (file.startsWith('"') && file.endsWith('"')) file = file.slice(1, -1);
    if (code.includes('?')) untracked.push(file);
    else tracked.push(file);
  }

  const skipped = untracked.filter(file => NEVER_STAGE.some(pattern => pattern.test(file)));
  const added = untracked.filter(file => !NEVER_STAGE.some(pattern => pattern.test(file)));

  return { tracked, added, skipped };
}

function listTests() {
  const directory = path.join(ROOT, 'tests');
  if (!fs.existsSync(directory)) return [];
  return fs
    .readdirSync(directory)
    .filter(name => /^check-.*\.mjs$/.test(name))
    .sort()
    .map(name => path.join('tests', name));
}

/* ------------------------------------------------------------------ */
/* GitHub Pages                                                        */
/* ------------------------------------------------------------------ */

async function waitForPages(version, timeoutMs) {
  const started = Date.now();
  process.stdout.write('  GitHub Pages: czekam');
  let lastSeen = null;

  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(`${PAGES_BASE}/version.json?cb=${Date.now()}${Math.random()}`, {
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000)
      });
      if (response.ok) {
        const data = await response.json();
        if (data.version === version) {
          process.stdout.write('\n');
          return { ok: true, seconds: Math.round((Date.now() - started) / 1000) };
        }
        lastSeen = data.version;
      }
    } catch {
      /* brak sieci albo Pages jeszcze nie odpowiada – próbujemy dalej */
    }
    process.stdout.write('.');
    await sleep(5_000);
  }

  process.stdout.write('\n');
  return { ok: false, seconds: Math.round((Date.now() - started) / 1000), lastSeen };
}

/* ------------------------------------------------------------------ */
/* Pytania do użytkownika                                              */
/* ------------------------------------------------------------------ */

async function ask(question, fallback) {
  if (!process.stdin.isTTY) return fallback;
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  try {
    const answer = (await rl.question(question)).trim();
    return answer || fallback;
  } finally {
    rl.close();
  }
}

/* ------------------------------------------------------------------ */
/* Opcje wiersza poleceń                                               */
/* ------------------------------------------------------------------ */

function parseArgs(argv) {
  const options = {
    message: null,
    version: null,
    yes: false,
    dryRun: false,
    tests: true,
    push: true,
    verify: true,
    verifyTimeoutMs: DEFAULT_VERIFY_TIMEOUT_MS,
    help: false
  };

  const value = index => {
    if (index + 1 >= argv.length) fail(`Opcja ${argv[index]} wymaga wartości (użyj --help).`);
    return argv[index + 1];
  };

  for (let index = 0; index < argv.length; index += 1) {
    switch (argv[index]) {
      case '-m':
      case '--message':
        options.message = value(index);
        index += 1;
        break;
      case '-v':
      case '--version':
        options.version = value(index);
        index += 1;
        break;
      case '-y':
      case '--yes':
        options.yes = true;
        break;
      case '--dry-run':
        options.dryRun = true;
        break;
      case '--no-test':
        options.tests = false;
        break;
      case '--no-push':
        options.push = false;
        break;
      case '--no-verify':
        options.verify = false;
        break;
      case '--verify-timeout':
        options.verifyTimeoutMs = Number(value(index)) * 1000;
        index += 1;
        if (!Number.isFinite(options.verifyTimeoutMs) || options.verifyTimeoutMs < 0) {
          fail('--verify-timeout wymaga liczby sekund.');
        }
        break;
      case '-h':
      case '--help':
        options.help = true;
        break;
      default:
        fail(`Nieznana opcja: ${argv[index]} (użyj --help).`);
    }
  }

  return options;
}

/** Wypisuje opis z nagłówka tego pliku. */
function printHelp() {
  const source = fs.readFileSync(fileURLToPath(import.meta.url), 'utf8');
  const description = source.match(/\/\*\*([\s\S]*?)\*\//);
  if (!description) {
    log('Kedai POS – skrypt publikacji wersji. Opis nie został znaleziony w pliku.');
    return;
  }
  log(description[1].replace(/^[ \t]*\*[ \t]?/gm, '').trim());
}

/* ------------------------------------------------------------------ */
/* Główny przebieg                                                     */
/* ------------------------------------------------------------------ */

function checkRepository() {
  if (!fs.existsSync(path.join(ROOT, '.git'))) {
    fail(`Katalog ${ROOT} nie jest repozytorium git.`);
  }

  const branch = git(['rev-parse', '--abbrev-ref', 'HEAD']);
  if (branch !== BRANCH) {
    fail(`Jesteś na gałęzi "${branch}", a skrypt publikuje z "${BRANCH}".`);
  }

  const inProgress = ['.git/MERGE_HEAD', '.git/REBASE_HEAD', '.git/CHERRY_PICK_HEAD', '.git/BISECT_LOG']
    .filter(name => fs.existsSync(path.join(ROOT, name)));
  if (inProgress.length > 0) {
    fail(`W toku jest operacja git (${inProgress.join(', ')}) – dokończ ją przed publikacją.`);
  }

  const remote = gitCapture(['remote', 'get-url', REMOTE]);
  if (!remote.ok) fail(`Brak zdalnego repozytorium "${REMOTE}".`);
  log(`  Repozytorium: ${dim(remote.out)}`);
  log(`  Gałąź:        ${dim(BRANCH)}`);

  const fetched = gitCapture(['fetch', '--quiet', REMOTE, BRANCH]).ok;
  if (!fetched) {
    warn('Nie udało się odpytać origin (brak sieci?) – pomijam kontrolę zaległości.');
  } else {
    const behind = Number(gitCapture(['rev-list', '--count', `HEAD..${REMOTE}/${BRANCH}`]).out || '0');
    if (behind > 0) {
      fail(`Origin ma ${behind} commit(y), których nie masz lokalnie. Zrób najpierw "git pull".`);
    }
  }

  return { branch, fetched };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }

  log(bold('\nKedai POS – publikacja nowej wersji na GitHubie'));

  step(1, 'Stan repozytorium');
  checkRepository();

  step(2, 'Numer wersji');
  const state = readVersionState();
  const version = options.version ?? versionFromDate();
  if (!VERSION_PATTERN.test(version)) {
    fail(`Numer "${version}" nie pasuje do formatu YY.MM.DD.hhmm.`);
  }
  if (version <= state.version) {
    fail(
      `Nowy numer (${version}) nie jest większy od obecnego (${state.version}).\n` +
      '  Aplikacja rozpoznaje aktualizację po porównaniu numerów, więc musisz poczekać\n' +
      '  do następnej minuty (albo podać numer ręcznie przez -v).'
    );
  }
  const today = versionFromDate().slice(0, 8);
  if (version.slice(0, 8) !== today) {
    warn(`Numer wersji ma inną datę (${version.slice(0, 8)}) niż dziś (${today}).`);
  }
  const cacheNumber = String(Number(state.cacheNumber) + 1);
  log(`  Obecnie:  ${dim(state.version)}   (CACHE_NAME kedai-pos-v${state.cacheNumber})`);
  log(`  Nowa:     ${green(version)}   (CACHE_NAME kedai-pos-v${cacheNumber})`);

  step(3, 'Pliki do wysłania');
  const changes = collectChanges();
  const tests = listTests();
  for (const file of VERSION_SOURCES.map(([relative]) => relative).concat(SERVICE_WORKER)) {
    log(`  ${green('M')} ${file} ${dim('(numer wersji / cache)')}`);
  }
  for (const file of changes.tracked) log(`  ${yellow('M')} ${file}`);
  for (const file of changes.added) log(`  ${green('A')} ${file}`);
  for (const file of changes.skipped) log(`  ${dim(`- ${file} (pomijam – dane lokalu)`)}`);

  if (changes.tracked.length === 0 && changes.added.length === 0) {
    warn('Poza numerem wersji nie ma żadnych zmian.');
  }

  if (options.dryRun) {
    log(`\n${yellow('--dry-run')} – nic nie zostało zmienione ani wysłane.`);
    return;
  }

  step(4, 'Opis zmiany');
  const subject = options.message ?? await ask(
    `  Opis zmiany (Enter = "Release version ${version}"): `,
    `Release version ${version}`
  );
  const body = `Wersja ${version}, CACHE_NAME kedai-pos-v${cacheNumber}.`;
  log(`  ${dim(subject)}`);

  if (!options.yes) {
    if (!process.stdin.isTTY) {
      fail('Brak interaktywnej konsoli, więc nie mogę zapytać o potwierdzenie. Dodaj -y, aby wysłać bez pytania.');
    }
    const answer = await ask(`\n  Wysłać na GitHub? [${bold('t')}/N] `, 'n');
    if (!/^(t|tak|y|yes)$/i.test(answer)) {
      log(`\n${yellow('Anulowano')} – nic nie zostało zmienione.`);
      return;
    }
  }

  step(5, 'Zapis numeru wersji');
  let written;
  try {
    written = writeVersionFiles(state, version, cacheNumber);
  } catch (error) {
    restoreVersionFiles(state);
    fail(`Nie udało się zapisać numeru wersji: ${error.message}`);
  }
  log(`  Zapisano: ${written.join(', ')}`);

  if (options.tests && tests.length > 0) {
    step(6, `Testy (${tests.join(', ')})`);
    for (const test of tests) {
      const result = spawnSync(process.execPath, [test], { cwd: ROOT, stdio: 'inherit' });
      if (result.status !== 0) {
        restoreVersionFiles(state);
        fail(`Test ${test} nie przeszedł – przywróciłem poprzedni numer wersji.`);
      }
    }
  } else {
    step(6, 'Testy');
    log(`  ${dim('pominięte')}`);
  }

  step(7, 'Commit i push');
  if (changes.tracked.length > 0) {
    git(['add', '-u']);
  }
  if (changes.added.length > 0) {
    git(['add', '--', ...changes.added]);
  }

  const staged = git(['diff', '--cached', '--name-only']).split('\n').filter(Boolean);
  if (staged.length === 0) {
    restoreVersionFiles(state);
    fail('Nie ma czego commitować – przywróciłem poprzedni numer wersji.');
  }
  log(`  Plików w commicie: ${staged.length}`);

  if (gitInteractive(['commit', '-m', subject, '-m', body]) !== 0) {
    restoreVersionFiles(state);
    fail('Commit nie powiódł się – przywróciłem poprzedni numer wersji.');
  }
  const sha = git(['rev-parse', '--short', 'HEAD']);

  if (options.push) {
    if (gitInteractive(['push', REMOTE, BRANCH]) !== 0) {
      fail(
        `Push nie powiódł się, ale commit ${sha} już istnieje lokalnie.\n` +
        `  Po naprawieniu problemu wystarczy: git push ${REMOTE} ${BRANCH}\n` +
        '  (albo cofnij commit poleceniem: git reset --soft HEAD~1)'
      );
    }
    log(`  ${green('✓')} ${sha} → ${REMOTE}/${BRANCH}`);
  } else {
    log(`  ${green('✓')} commit ${sha} lokalnie ${dim('(--no-push)')}`);
  }

  if (options.verify && options.push) {
    step(8, 'Publikacja na GitHub Pages');
    const result = await waitForPages(version, options.verifyTimeoutMs);
    if (result.ok) {
      log(`  ${green('✓')} wersja ${version} widoczna w sieci (po ${result.seconds} s)`);
    } else {
      warn(`Po ${result.seconds} s Pages nadal pokazuje ${result.lastSeen ?? 'starą wersję'}.`);
      log(`  ${dim('To normalne – Pages publikuje z opóźnieniem. Sprawdź później:')} ${PAGES_BASE}/version.json`);
    }
  } else {
    step(8, 'Publikacja na GitHub Pages');
    log(`  ${dim('pominięte')}`);
  }

  log(`\n${green(bold('Gotowe:'))} wersja ${version}, commit ${sha}`);
  log(`  W lokalu: Ustawienia → ${bold('Aktualizuj aplikację')} – dopiero wtedy telefon pobierze nową wersję.`);
}

main().catch(error => {
  const message = error instanceof ReleaseError ? error.message : (error.stack || String(error));
  console.error(`\n${red('✗')} ${message}`);
  process.exit(1);
});
