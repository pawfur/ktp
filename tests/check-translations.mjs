#!/usr/bin/env node
/**
 * Kedai POS – sprawdzanie tłumaczeń.
 *
 * Uruchomienie:
 *   node tests/check-translations.mjs
 *
 * Skrypt nie wymaga żadnych zależności ani przeglądarki.
 * Czyta pliki źródłowe i sprawdza spójność tłumaczeń PL/EN/ID.
 */

import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LANGUAGES = ['pl', 'en', 'id'];
const BASE_LANGUAGE = 'pl';

/**
 * Wartości, które mogą być identyczne z polskimi, bo tak brzmią w obu językach.
 * Każdy wpis tutaj jest świadomą decyzją, a nie przeoczeniem.
 */
const ALLOWED_IDENTICAL = new Set(['menu', 'edit']);

/**
 * Klucze wybierane dynamicznie. Moduł chmury zwraca nazwę klucza
 * (np. 'syncErrTables'), a app.js tłumaczy ją w syncDetailText().
 * Statyczna analiza takich odwołań nie widzi, więc są wypisane tutaj.
 */
const DYNAMIC_KEYS = new Set(['syncErrTables', 'syncErrColumn', 'syncErrAccess', 'syncErrOffline']);

const colors = {
  reset: '\u001b[0m',
  red: '\u001b[31m',
  green: '\u001b[32m',
  yellow: '\u001b[33m',
  gray: '\u001b[90m',
  bold: '\u001b[1m'
};

const errors = [];
const warnings = [];
const notes = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

/**
 * Wycina z tekstu literał obiektu, zaczynając od podanego znacznika.
 * Liczy nawiasy tylko poza łańcuchami znaków, dzięki czemu nawiasy klamrowe
 * w tłumaczeniach, np. "Usunąć pozycję {name}?", nie psują dopasowania.
 */
function extractObjectLiteral(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error(`Nie znaleziono w pliku znacznika: ${marker}`);
  }

  const start = source.indexOf('{', markerIndex);
  if (start === -1) {
    throw new Error(`Nie znaleziono nawiasu otwierającego po: ${marker}`);
  }

  let depth = 0;
  let quote = null;
  let escaped = false;

  for (let index = start; index < source.length; index += 1) {
    const char = source[index];

    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === '\\') {
        escaped = true;
      } else if (char === quote) {
        quote = null;
      }
      continue;
    }

    if (char === "'" || char === '"' || char === '`') {
      quote = char;
      continue;
    }

    if (char === '{') {
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0) {
        return source.slice(start, index + 1);
      }
    }
  }

  throw new Error(`Nie udało się dopasować nawiasów dla: ${marker}`);
}

/** Zamienia literał obiektu na zwykły obiekt JavaScript. */
function parseObjectLiteral(literal) {
  return new Function(`"use strict"; return (${literal});`)();
}

/** Zwraca nazwy symboli zastępczych, np. {name}, {date}. */
function placeholders(value) {
  return [...String(value).matchAll(/\{(\w+)\}/g)].map(match => match[1]).sort();
}

/** Znajduje powtórzone klucze w bloku jednego języka. */
function findDuplicateKeys(blockSource) {
  const keys = [...blockSource.matchAll(/^\s{2,}([A-Za-z_][A-Za-z0-9_]*)\s*:/gm)].map(match => match[1]);
  const seen = new Set();
  const duplicates = new Set();
  keys.forEach(key => {
    if (seen.has(key)) duplicates.add(key);
    seen.add(key);
  });
  return [...duplicates];
}

function readSources() {
  return {
    app: readFileSync(join(ROOT, 'app.js'), 'utf8'),
    html: readFileSync(join(ROOT, 'index.html'), 'utf8')
  };
}

function checkTranslations(translations) {
  const baseKeys = Object.keys(translations[BASE_LANGUAGE]);

  LANGUAGES.forEach(language => {
    if (!translations[language]) {
      fail(`Brak całego bloku tłumaczeń dla języka: ${language}`);
    }
  });

  LANGUAGES.filter(language => language !== BASE_LANGUAGE).forEach(language => {
    const keys = Object.keys(translations[language] || {});
    baseKeys.filter(key => !keys.includes(key)).forEach(key => {
      fail(`Język "${language}" nie ma klucza "${key}" (jest w "${BASE_LANGUAGE}")`);
    });
    keys.filter(key => !baseKeys.includes(key)).forEach(key => {
      fail(`Język "${language}" ma klucz "${key}", którego nie ma w "${BASE_LANGUAGE}"`);
    });
  });

  LANGUAGES.forEach(language => {
    baseKeys.forEach(key => {
      const value = translations[language]?.[key];
      if (value === undefined) return;

      const expected = placeholders(translations[BASE_LANGUAGE][key]);
      const actual = placeholders(value);
      if (expected.join(',') !== actual.join(',')) {
        fail(
          `Klucz "${key}" w języku "${language}" ma inne symbole zastępcze: `
          + `oczekiwano {${expected.join('}, {')}}, jest {${actual.join('}, {')}}`
        );
      }

      if (String(value).trim() === '') {
        fail(`Klucz "${key}" w języku "${language}" jest pusty`);
      }
    });
  });

  baseKeys.forEach(key => {
    const identical = LANGUAGES
      .filter(language => language !== BASE_LANGUAGE)
      .filter(language => translations[language]?.[key] === translations[BASE_LANGUAGE][key]);

    if (identical.length && !ALLOWED_IDENTICAL.has(key)) {
      warn(
        `Klucz "${key}" ma identyczną treść w językach: ${identical.join(', ')} – `
        + 'sprawdź, czy to celowe (jeśli tak, dopisz klucz do ALLOWED_IDENTICAL)'
      );
    }
  });

  return baseKeys;
}

function checkHtmlKeys(html, translations) {
  const used = new Set([...html.matchAll(/data-i18n="([^"]+)"/g)].map(match => match[1]));
  used.forEach(key => {
    LANGUAGES.forEach(language => {
      if (!(key in (translations[language] || {}))) {
        fail(`index.html używa klucza "${key}", którego brak w języku "${language}"`);
      }
    });
  });
  notes.push(`Klucze użyte w index.html: ${used.size}`);
}

function checkKeyUsage(appSource, html, translations) {
  const fromHtml = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(match => match[1]);
  const fromTranslate = [...appSource.matchAll(/translate\(\s*'([A-Za-z_][A-Za-z0-9_]*)'/g)].map(match => match[1]);
  // Klucze przekazywane jako argumenty, np. getCounterLabel(count, 'item', 'items').
  const fromHelpers = [...appSource.matchAll(/getCounterLabel\(([^)]*)\)/g)]
    .flatMap(match => [...match[1].matchAll(/'([A-Za-z_][A-Za-z0-9_]*)'/g)].map(inner => inner[1]));

  const used = new Set([...fromHtml, ...fromTranslate, ...fromHelpers]);
  const allKeys = Object.keys(translations[BASE_LANGUAGE]);
  const unused = allKeys.filter(key => !used.has(key) && !DYNAMIC_KEYS.has(key));

  if (unused.length) {
    warn(`Klucze zdefiniowane, ale nigdzie nieużywane: ${unused.join(', ')}`);
  }
  notes.push(`Klucze użyte w kodzie: ${used.size} z ${allKeys.length}`);
}

function main() {
  process.stdout.write(`${colors.bold}Kedai POS – sprawdzanie tłumaczeń${colors.reset}\n\n`);

  let sources;
  try {
    sources = readSources();
  } catch (error) {
    process.stdout.write(`${colors.red}Nie udało się wczytać plików projektu: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  let literal;
  let translations;
  try {
    literal = extractObjectLiteral(sources.app, 'const translations');
    translations = parseObjectLiteral(literal);
  } catch (error) {
    process.stdout.write(`${colors.red}Nie udało się odczytać tłumaczeń z app.js: ${error.message}${colors.reset}\n`);
    process.exit(1);
  }

  const baseKeys = checkTranslations(translations);

  LANGUAGES.forEach(language => {
    const blockStart = literal.indexOf(`${language}: {`);
    if (blockStart === -1) return;
    const blockEnd = literal.indexOf('\n        },', blockStart);
    const blockSource = literal.slice(blockStart, blockEnd === -1 ? literal.length : blockEnd);
    findDuplicateKeys(blockSource).forEach(key => {
      fail(`Język "${language}" ma powtórzony klucz "${key}" – jedna wartość nadpisuje drugą`);
    });
  });

  checkHtmlKeys(sources.html, translations);
  checkKeyUsage(sources.app, sources.html, translations);

  notes.forEach(note => {
    process.stdout.write(`${colors.gray}· ${note}${colors.reset}\n`);
  });

  warnings.forEach(message => {
    process.stdout.write(`${colors.yellow}! ${message}${colors.reset}\n`);
  });

  if (errors.length) {
    process.stdout.write(`\n${colors.red}${colors.bold}Błędy: ${errors.length}${colors.reset}\n`);
    errors.forEach(message => {
      process.stdout.write(`${colors.red}  ✗ ${message}${colors.reset}\n`);
    });
    process.stdout.write(`\n${colors.red}Sprawdzenie nie przeszło.${colors.reset}\n`);
    process.exit(1);
  }

  process.stdout.write(
    `\n${colors.green}${colors.bold}OK${colors.reset} `
    + `${colors.green}– języki: ${LANGUAGES.join(', ')}, klucze: ${baseKeys.length}`
    + (warnings.length ? `, ostrzeżenia: ${warnings.length}` : '')
    + `${colors.reset}\n`
  );
}

main();
