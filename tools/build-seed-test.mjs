#!/usr/bin/env node
/**
 * Buduje dwa pliki danych:
 *
 *   1. `config/seed-test.js` - lustro danych lokalu dla środowiska KEDAI-test.
 *      Testowe urządzenie ma wyglądać dokładnie tak, jak telefon lokalu (menu,
 *      zakładki, magazyn), żeby dało się na nim sprawdzać zmiany na prawdziwych
 *      danych. Aplikacja wgrywa go WYŁĄCZNIE w środowisku testowym - w wydaniu
 *      lokalu ten plik jest ignorowany.
 *
 *   2. `config/seed-warehouse.js` - uzupełnienie magazynu dla wydania LOKALU.
 *      Tylko to, czego w magazynie nie ma (nowe pozycje i te usunięte, których
 *      nadal wymagają receptury) plus kolejność i przydział istniejących
 *      pozycji do zakładek. Stanów, cen i progów istniejących pozycji nie
 *      rusza, nic nie kasuje.
 *
 * Do tego dochodzą SUGEROWANE pozycje magazynu - takie, których wymaga menu,
 * a których w magazynie nie ma (albo zostały usunięte, a receptury nadal ich
 * używają).
 *
 * Użycie:
 *   node tools/build-seed-test.mjs
 *
 * Dane czytamy z `tools/db.mjs` (tylko odczyt, korzysta z zapisanej sesji),
 * więc pliki seedów są wytworem, a nie ręcznie przepisaną listą. Po zmianach
 * w lokalu wystarczy uruchomić to polecenie ponownie.
 */
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUTPUT = join(ROOT, 'config', 'seed-test.js');
const OUTPUT_WAREHOUSE = join(ROOT, 'config', 'seed-warehouse.js');

/**
 * Zakładki magazynu razem z kolejnością pozycji. Pozycje, których tu nie ma,
 * lądują NA GÓRZE listy (przed pierwszą zakładką) - dzięki temu od razu widać,
 * co jeszcze nie zostało przypisane.
 */
const SECTIONS = [
  {
    id: 'sec_bumbu',
    name: 'Bumbu & saus',
    color: 30,
    items: [
      'Bawang merah', 'Bawang putih', 'Cabai rawit merah', 'Garam', 'Kaldu bubuk',
      'Kencur', 'Gula pasir', 'Kecap manis', 'Saus sambal', 'Saus tomat',
      'Przyprawa do seblak', 'Olej'
    ]
  },
  {
    id: 'sec_sayur',
    name: 'Sayur & segar',
    color: 120,
    items: ['Sawi hijau', 'Kol', 'Kentang', 'Jamur enoki', 'Tahu', 'Tempe']
  },
  {
    id: 'sec_protein',
    name: 'Protein & frozen',
    color: 355,
    items: [
      'Jajka', 'Telur puyuh', 'Mięso cekier', 'Daging ayam', 'Sosis',
      'Bakso sapi', 'Bakso ikan', 'Nugget ayam', 'Dou twister'
    ]
  },
  {
    id: 'sec_kering',
    name: 'Kering & mie',
    color: 55,
    items: [
      'Mąka pszenna', 'Tepung bumbu', 'Aci (tapioka)', 'Mie keriting',
      'Mie kuning', 'Mie tiaw', 'Krupuk mentah', 'Aneka kerupuk', 'Roti tawar'
    ]
  },
  {
    id: 'sec_minuman',
    name: 'Minuman & jualan',
    color: 200,
    items: [
      'Air mineral 600 ml', 'Air isi ulang', 'Es batu', 'Kopi bubuk', 'Kopi sachet',
      'Susu kental manis', 'Pop Ice', 'Nutrisari', 'Coca-cola', 'Fanta', 'Chips'
    ]
  }
];

/**
 * Pozycje, których w magazynie nie ma, a menu ich wymaga. `restore: true`
 * oznacza "przywróć z usuniętych" - bierzemy wtedy nazwę, jednostkę, cenę
 * i progi z wiersza, który już istnieje w bazie (ten sam identyfikator, więc
 * receptury od razu go widzą). Reszta to nowe wpisy z szacowaną ceną.
 */
const SUGGESTIONS = [
  { id: 'ing_air', restore: true, section: 'Minuman & jualan', note: 'Receptury drinków (200 ml na szklankę)' },
  { id: 'ing_aci', restore: true, section: 'Kering & mie', note: 'Seblak, Bakso Aci' },
  { id: 'ing_bakso', restore: true, section: 'Protein & frozen', note: 'Bakso, Baso goreng, topping' },
  { id: 'ing_bamer', restore: true, section: 'Bumbu & saus', note: 'Bumbu seblak' },
  { id: 'ing_baput', restore: true, section: 'Bumbu & saus', note: 'Bumbu seblak' },
  { id: 'ing_cabai', restore: true, section: 'Bumbu & saus', note: 'Bumbu seblak' },
  { id: 'ing_garam', restore: true, section: 'Bumbu & saus', note: 'Bumbu seblak' },
  { id: 'ing_przyprawa', restore: true, section: 'Bumbu & saus', note: 'Bumbu seblak' },
  { id: 'ing_tepung_bumbu', restore: true, section: 'Kering & mie', note: 'Tempe mendoan' },

  { id: 'ing_daging_ayam', name: 'Daging ayam', unit: 'g', unit_price: 40, min_stock: 1000, unit_step: 500, section: 'Protein & frozen', note: 'Mie ayam, Mie jebew' },
  { id: 'ing_bakso_ikan', name: 'Bakso ikan', unit: 'g', unit_price: 45, min_stock: 500, unit_step: 250, section: 'Protein & frozen', note: 'Bakso ikan, topping' },
  { id: 'ing_nugget', name: 'Nugget ayam', unit: 'g', unit_price: 30, min_stock: 500, unit_step: 250, section: 'Protein & frozen', note: 'Naget goreng, Frozen food' },
  { id: 'ing_telur_puyuh', name: 'Telur puyuh', unit: 'szt', unit_price: 700, min_stock: 20, unit_step: 10, section: 'Protein & frozen', note: 'Topping Telor puyuh' },
  { id: 'ing_dou_twister', name: 'Dou twister', unit: 'szt', unit_price: 2500, min_stock: 5, unit_step: 5, section: 'Protein & frozen', note: 'Topping Dou Twister' },
  { id: 'ing_tempe', name: 'Tempe', unit: 'g', unit_price: 15, min_stock: 500, unit_step: 250, section: 'Sayur & segar', note: 'Tempe mendoan' },
  { id: 'ing_mie_kuning', name: 'Mie kuning', unit: 'g', unit_price: 14, min_stock: 1000, unit_step: 500, section: 'Kering & mie', note: 'Mie ayam, topping Mie kuning' },
  { id: 'ing_mie_tiaw', name: 'Mie tiaw', unit: 'g', unit_price: 14, min_stock: 1000, unit_step: 500, section: 'Kering & mie', note: 'Mie tiaw goreng, topping' },
  { id: 'ing_roti', name: 'Roti tawar', unit: 'szt', unit_price: 15000, min_stock: 2, unit_step: 1, section: 'Kering & mie', note: 'Toast keju / cokelat / telur' },
  { id: 'ing_saus_tomat', name: 'Saus tomat', unit: 'ml', unit_price: 20, min_stock: 200, unit_step: 100, section: 'Bumbu & saus', note: 'Sausy' },
  { id: 'ing_coca', name: 'Coca-cola', unit: 'szt', unit_price: 4000, min_stock: 6, unit_step: 6, section: 'Minuman & jualan', note: 'Coka-cola' },
  { id: 'ing_fanta', name: 'Fanta', unit: 'szt', unit_price: 4000, min_stock: 6, unit_step: 6, section: 'Minuman & jualan', note: 'Fanta' },
  { id: 'ing_chips', name: 'Chips', unit: 'szt', unit_price: 800, min_stock: 10, unit_step: 10, section: 'Minuman & jualan', note: 'chips (sprzedawane po Rp 1000)' }
];

/** Czyta tabelę przez mostek raportowy (tylko odczyt). */
function readTable(command, extra = []) {
  const output = execFileSync(
    process.execPath,
    [join(ROOT, 'tools', 'db.mjs'), command, '--json', '--no-color', ...extra],
    { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 }
  );
  return JSON.parse(output);
}

function number(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function build() {
  const warehouse = readTable('warehouse', ['--all']);
  const menuRows = readTable('menu');

  const live = warehouse.filter(row => !row.deleted);
  const gone = new Map(warehouse.filter(row => row.deleted).map(row => [row.local_id, row]));

  // --- magazyn -------------------------------------------------------------
  const byName = new Map(live.map(row => [String(row.name), row]));
  const used = new Set();
  const items = [];
  const problems = [];

  const takeLive = row => {
    used.add(row.local_id);
    return {
      id: row.local_id,
      name: String(row.name),
      unit: String(row.unit || ''),
      stock: number(row.stock),
      unit_price: number(row.unit_price),
      min_stock: number(row.min_stock),
      unit_step: number(row.unit_step)
    };
  };

  const buildSuggestion = suggestion => {
    if (suggestion.restore) {
      const row = gone.get(suggestion.id);
      if (!row) {
        problems.push(`nie ma czego przywrócić: ${suggestion.id}`);
        return null;
      }
      return {
        id: row.local_id,
        name: String(row.name),
        unit: String(row.unit || ''),
        // Stan z nagrobka bywa stary, a towar mógł zostać zużyty - liczymy od zera.
        stock: 0,
        unit_price: number(row.unit_price),
        min_stock: number(row.min_stock),
        unit_step: number(row.unit_step)
      };
    }
    return {
      id: suggestion.id,
      name: suggestion.name,
      unit: suggestion.unit,
      stock: 0,
      unit_price: suggestion.unit_price,
      min_stock: suggestion.min_stock,
      unit_step: suggestion.unit_step
    };
  };

  const suggestionsByName = new Map(
    SUGGESTIONS.map(suggestion => [suggestion.restore ? gone.get(suggestion.id)?.name : suggestion.name, suggestion])
  );

  const resolve = name => {
    const liveRow = byName.get(name);
    if (liveRow) return takeLive(liveRow);

    const suggestion = suggestionsByName.get(name);
    if (suggestion) {
      const built = buildSuggestion(suggestion);
      if (built) used.add(built.id);
      return built;
    }

    problems.push(`nie znalazłem pozycji "${name}"`);
    return null;
  };

  // Pozycje bez zakładki (śmieci z testów, nowe rzeczy) idą na samą górę.
  const unassigned = live.filter(row => !SECTIONS.some(section => section.items.includes(String(row.name))));

  unassigned.forEach(row => items.push(takeLive(row)));

  SECTIONS.forEach((section, index) => {
    items.push({
      id: section.id,
      name: section.name,
      type: 'section',
      color: section.color,
      unit: '',
      stock: 0,
      unit_price: 0,
      min_stock: 0,
      unit_step: 0,
      order: index + 1
    });
    section.items.forEach(name => {
      const item = resolve(name);
      if (item) items.push(item);
    });
  });

  const sectionIds = new Set(SECTIONS.map(section => section.id));
  const sectionsBuilt = new Set();

  // --- menu ----------------------------------------------------------------
  // Kolejność przepisujemy na 0..n-1: w bazie lokalu zdarzają się powtórzone
  // numery, a lista ma wyglądać dokładnie tak, jak na telefonie.
  const menu = menuRows
    .filter(row => !row.deleted)
    .map((row, index) => {
      const item = {
        id: row.local_id,
        name: String(row.name),
        type: row.type === 'section' ? 'section' : 'product',
        price: number(row.price),
        order: index,
        visible: row.visible !== false
      };
      if (row.color !== null && row.color !== undefined) item.color = Math.round(number(row.color));
      const recipe = Array.isArray(row.recipe)
        ? row.recipe.filter(entry => entry && entry.id && number(entry.qty) > 0)
        : [];
      if (recipe.length) item.recipe = recipe.map(entry => ({ id: String(entry.id), qty: number(entry.qty) }));
      return item;
    });

  // --- znaczniki -----------------------------------------------------------
  const withOrder = items.map((item, index) => {
    if (item.type === 'section') return { ...item, sort_order: index };
    if (sectionIds.has(item.id)) sectionsBuilt.add(item.id);
    return { ...item, type: 'product', sort_order: index, section: undefined };
  });

  const payload = { menu, ingredients: withOrder };
  const version = createHash('sha1').update(JSON.stringify(payload)).digest('hex').slice(0, 10);

  return { items: withOrder, menu, version, problems, used, live, gone, sectionsBuilt };
}

function render(result) {
  const builtAt = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'long', timeStyle: 'short' }).format(new Date());
  const products = result.items.filter(item => item.type !== 'section');
  const sections = result.items.filter(item => item.type === 'section');

  const lines = [];
  lines.push('/**');
  lines.push(' * Lustro danych lokalu dla środowiska KEDAI-test (menu + magazyn + zakładki).');
  lines.push(' *');
  lines.push(' * PLIK GENEROWANY - nie edytuj ręcznie. Odświeżenie po zmianach w lokalu:');
  lines.push(' *   node tools/build-seed-test.mjs');
  lines.push(' *');
  lines.push(` * Zbudowano: ${builtAt}`);
  lines.push(` * Odcisk treści (version): ${result.version}`);
  lines.push(` * Pozycje: ${products.length} składników w ${sections.length} zakładkach, menu: ${result.menu.length} wierszy.`);
  lines.push(' *');
  lines.push(' * Aplikacja wgrywa ten plik TYLKO w środowisku testowym (window.KedaiEnv.isTest)');
  lines.push(' * i tylko raz na odcisk - potem testowe urządzenie wygląda jak telefon lokalu.');
  lines.push(' */');
  lines.push('window.KedaiSeedTest = {');
  lines.push(`  version: '${result.version}',`);
  lines.push(`  builtAt: '${builtAt}',`);
  lines.push('  menu: [');
  result.menu.forEach(item => {
    const parts = [
      `id: '${item.id}'`,
      `name: ${JSON.stringify(item.name)}`,
      `type: '${item.type}'`,
      `price: ${item.price}`,
      `order: ${item.order}`,
      `visible: ${item.visible}`
    ];
    if (item.color !== undefined) parts.push(`color: ${item.color}`);
    if (item.recipe) parts.push(`recipe: ${JSON.stringify(item.recipe)}`);
    lines.push(`    { ${parts.join(', ')} },`);
  });
  lines.push('  ],');
  lines.push('  ingredients: [');
  result.items.forEach(item => {
    const parts = [
      `id: '${item.id}'`,
      `name: ${JSON.stringify(item.name)}`,
      `type: '${item.type}'`,
      `sort_order: ${item.sort_order}`
    ];
    if (item.color !== undefined) parts.push(`color: ${item.color}`);
    parts.push(`unit: '${item.unit}'`);
    parts.push(`stock: ${item.stock}`);
    parts.push(`unit_price: ${item.unit_price}`);
    parts.push(`min_stock: ${item.min_stock}`);
    parts.push(`unit_step: ${item.unit_step}`);
    lines.push(`    { ${parts.join(', ')} },`);
  });
  lines.push('  ]');
  lines.push('};');
  lines.push('');

  return lines.join('\n');
}

/**
 * Drugi plik: uzupełnienie magazynu dla wydania LOKALU.
 *
 * Środowisko testowe dostaje całe lustro (`seed-test.js`), ale telefon lokalu
 * nie może dostać kopii własnych danych - potrzebuje tylko tego, czego nie ma:
 * nowych pozycji i tych, które kiedyś usunął, a receptury nadal ich używają.
 * Dlatego ten plik jest wyłącznie dodający:
 *
 *   - `sections` i `items` — pozycje, których w magazynie nie ma (dopisujemy),
 *   - `order` — kolejność i przydział do zakładki dla pozycji już istniejących
 *     (stan, cena i progi zostają nietknięte),
 *   - nic nie jest kasowane ani nadpisywane poza kolejnością.
 */
function renderWarehouseSeed(result, version) {
  const builtAt = new Intl.DateTimeFormat('pl-PL', { dateStyle: 'long', timeStyle: 'short' }).format(new Date());
  const liveIds = new Set(result.live.map(row => row.local_id));
  const sections = result.items.filter(item => item.type === 'section');
  const added = result.items.filter(item => item.type !== 'section' && !liveIds.has(item.id));
  const order = result.items.filter(item => item.type !== 'section' && liveIds.has(item.id));

  const lines = [];
  lines.push('/**');
  lines.push(' * Uzupełnienie magazynu dla wydania LOKALU (KTP).');
  lines.push(' *');
  lines.push(' * PLIK GENEROWANY - nie edytuj ręcznie. Odświeżenie:');
  lines.push(' *   node tools/build-seed-test.mjs');
  lines.push(' *');
  lines.push(` * Zbudowano: ${builtAt}`);
  lines.push(` * Odcisk treści (version): ${version}`);
  lines.push(` * Do dopisania: ${added.length} pozycji w ${sections.length} zakładkach;`);
  lines.push(` * kolejność ustawiana dla ${order.length} istniejących pozycji.`);
  lines.push(' *');
  lines.push(' * Aplikacja stosuje to TYLKO w wydaniu lokalu (nie w środowisku testowym),');
  lines.push(" * tylko na telefonie o nazwie użytkownika 'PIPIN' (identyfikatory pozycji są");
  lines.push(' * wspólne między telefonami, więc inne urządzenie wniosłoby je do chmury');
  lines.push(' * pod swoim imieniem), raz na odcisk, i tylko dodaje brakujące pozycje -');
  lines.push(' * stany magazynowe, ceny i progi istniejących pozycji zostają bez zmian.');
  lines.push(' */');
  lines.push('window.KedaiSeedWarehouse = {');
  lines.push(`  version: '${version}',`);
  lines.push(`  builtAt: '${builtAt}',`);
  lines.push("  userName: 'PIPIN',");
  lines.push('  sections: [');
  sections.forEach(item => {
    lines.push(`    { id: '${item.id}', name: ${JSON.stringify(item.name)}, type: 'section', color: ${item.color}, sort_order: ${item.sort_order}, unit: '', stock: 0, unit_price: 0, min_stock: 0, unit_step: 0 },`);
  });
  lines.push('  ],');
  lines.push('  items: [');
  added.forEach(item => {
    lines.push(`    { id: '${item.id}', name: ${JSON.stringify(item.name)}, unit: '${item.unit}', unit_price: ${item.unit_price}, min_stock: ${item.min_stock}, unit_step: ${item.unit_step}, stock: ${item.stock}, sort_order: ${item.sort_order} },`);
  });
  lines.push('  ],');
  lines.push('  order: [');
  order.forEach(item => {
    lines.push(`    { id: '${item.id}', sort_order: ${item.sort_order} },`);
  });
  lines.push('  ]');
  lines.push('};');
  lines.push('');

  return lines.join('\n');
}

const result = build();
writeFileSync(OUTPUT, render(result), 'utf8');

const liveIdsForWarehouse = new Set(result.live.map(row => row.local_id));
const addedForWarehouse = result.items.filter(item => item.type !== 'section' && !liveIdsForWarehouse.has(item.id));
const warehousePayload = {
  sections: result.items.filter(item => item.type === 'section'),
  items: addedForWarehouse,
  order: result.items.filter(item => item.type !== 'section' && liveIdsForWarehouse.has(item.id)).map(item => ({ id: item.id, sort_order: item.sort_order }))
};
const warehouseVersion = createHash('sha1').update(JSON.stringify(warehousePayload)).digest('hex').slice(0, 10);
writeFileSync(OUTPUT_WAREHOUSE, renderWarehouseSeed(result, warehouseVersion), 'utf8');

const products = result.items.filter(item => item.type !== 'section');
const sections = result.items.filter(item => item.type === 'section');
process.stdout.write(`Zapisano ${OUTPUT}\n`);
process.stdout.write(`  wersja odcisku: ${result.version}\n`);
process.stdout.write(`  magazyn: ${products.length} składników, ${sections.length} zakładek\n`);
process.stdout.write(`  menu: ${result.menu.length} wierszy (z recepturami)\n`);

const firstSection = result.items.findIndex(item => item.type === 'section');
const unassigned = result.items.slice(0, firstSection === -1 ? 0 : firstSection).map(item => item.name);
process.stdout.write(`  bez zakładki (na górze listy): ${unassigned.join(', ') || 'brak'}\n`);
const liveIds = new Set(result.live.map(row => row.local_id));
const added = products.filter(item => !liveIds.has(item.id)).map(item => item.name);
process.stdout.write(`  dołożone pozycje (${added.length}): ${added.join(', ')}\n`);

process.stdout.write(`Zapisano ${OUTPUT_WAREHOUSE} (wydanie lokalu)\n`);
process.stdout.write(`  wersja odcisku: ${warehouseVersion}\n`);
process.stdout.write(`  do dopisania: ${addedForWarehouse.length} pozycji, ${warehousePayload.sections.length} zakładek\n`);
process.stdout.write(`  kolejność ustawiana dla ${warehousePayload.order.length} istniejących pozycji\n`);

if (result.problems.length) {
  process.stdout.write('\nPROBLEMY:\n');
  result.problems.forEach(problem => process.stdout.write(`  ! ${problem}\n`));
  process.exitCode = 1;
}
