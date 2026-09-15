/**
 * Jednorazowe uzupełnienie magazynu i receptur dla telefonu PIPIN.
 *
 * Ten plik to DANE, nie logika - ceny, progi i gramatury można swobodnie
 * poprawiać bez ruszania kodu aplikacji (mechanizm: `applyPipinSeed` w app.js).
 *
 * WAŻNE: seed wykonuje się raz na urządzenie i zapamiętuje swoją `version`.
 * Poprawienie treści przy tej samej wersji NIE zostanie już zaaplikowane na
 * telefonie, który ją widział - każdą korektę trzeba wypuścić z podniesioną
 * `version`.
 *
 * Zasady:
 *  - działa wyłącznie dla użytkownika o nazwie `userName` (inne telefony bez zmian),
 *  - składniki wypisane w `remove`, których nie ma na liście `ingredients`,
 *    dostają nagrobek (`deleted`) - w chmurze zostają, z telefonu znikają,
 *  - istniejące stany magazynowe są ZACHOWYWANE, podmieniamy tylko cenę i progi,
 *  - receptury wypełniamy wyłącznie tam, gdzie są puste (ręcznej pracy nie nadpisujemy).
 *
 * Identyfikatory użyte ponownie z obecnego magazynu PIPIN (żeby historia stanów
 * i nazwy nie rozjechały się w chmurze): ing_ceker, ing_maka, ing_jajka,
 * ing_olej, ing_przyprawa oraz ing_1789150106428_03q15s (dawny "Krupuk").
 *
 * Ceny są orientacyjne (małe miasteczko we wschodniej Jawie) i wymagają
 * weryfikacji z lokalnym rynkiem lub fakturami.
 */
window.KedaiSeed = {
  version: 1,
  userName: 'PIPIN',

  ingredients: [
    /* --- składniki kuchenne --- */
    { id: 'ing_mie', name: 'Mie keriting', unit: 'g', stock: 4000, unit_price: 15, min_stock: 2000, target_stock: 8000, min_order_quantity: 500, unit_step: 500 },
    { id: 'ing_enoki', name: 'Jamur enoki', unit: 'g', stock: 600, unit_price: 65, min_stock: 400, target_stock: 2000, min_order_quantity: 100, unit_step: 100 },
    { id: 'ing_ceker', name: 'Ceker ayam', unit: 'g', stock: 3000, unit_price: 28, min_stock: 1000, target_stock: 5000, min_order_quantity: 500, unit_step: 500 },
    { id: 'ing_bakso', name: 'Bakso sapi', unit: 'g', stock: 1500, unit_price: 60, min_stock: 500, target_stock: 3000, min_order_quantity: 500, unit_step: 500 },
    { id: 'ing_aci', name: 'Aci (tapioka)', unit: 'g', stock: 2000, unit_price: 11, min_stock: 1000, target_stock: 5000, min_order_quantity: 500, unit_step: 500 },
    { id: 'ing_maka', name: 'Tepung terigu', unit: 'g', stock: 9000, unit_price: 12, min_stock: 1000, target_stock: 5000, min_order_quantity: 500, unit_step: 500 },
    { id: 'ing_tepung_bumbu', name: 'Tepung bumbu', unit: 'g', stock: 1000, unit_price: 20, min_stock: 500, target_stock: 2000, min_order_quantity: 250, unit_step: 250 },
    { id: 'ing_jajka', name: 'Telur ayam', unit: 'szt', stock: 18, unit_price: 2500, min_stock: 20, target_stock: 60, min_order_quantity: 12, unit_step: 6 },
    { id: 'ing_kentang', name: 'Kentang', unit: 'g', stock: 3000, unit_price: 15, min_stock: 2000, target_stock: 8000, min_order_quantity: 1000, unit_step: 1000 },
    { id: 'ing_sosis', name: 'Sosis', unit: 'g', stock: 1000, unit_price: 35, min_stock: 500, target_stock: 2000, min_order_quantity: 250, unit_step: 250 },
    { id: 'ing_tahu', name: 'Tahu', unit: 'szt', stock: 20, unit_price: 800, min_stock: 10, target_stock: 40, min_order_quantity: 10, unit_step: 10 },
    { id: 'ing_sawi', name: 'Sawi hijau', unit: 'g', stock: 1500, unit_price: 10, min_stock: 1000, target_stock: 4000, min_order_quantity: 500, unit_step: 500 },
    { id: 'ing_kol', name: 'Kol', unit: 'g', stock: 1500, unit_price: 9, min_stock: 1000, target_stock: 4000, min_order_quantity: 500, unit_step: 500 },
    { id: 'ing_1789150106428_03q15s', name: 'Krupuk mentah', unit: 'g', stock: 20, unit_price: 14, min_stock: 500, target_stock: 3000, min_order_quantity: 250, unit_step: 250 },
    { id: 'ing_baput', name: 'Bawang putih', unit: 'g', stock: 300, unit_price: 35, min_stock: 200, target_stock: 1000, min_order_quantity: 100, unit_step: 100 },
    { id: 'ing_bamer', name: 'Bawang merah', unit: 'g', stock: 300, unit_price: 40, min_stock: 200, target_stock: 1000, min_order_quantity: 100, unit_step: 100 },
    { id: 'ing_cabai', name: 'Cabai rawit merah', unit: 'g', stock: 500, unit_price: 50, min_stock: 300, target_stock: 1500, min_order_quantity: 100, unit_step: 100 },
    { id: 'ing_kencur', name: 'Kencur', unit: 'g', stock: 200, unit_price: 25, min_stock: 100, target_stock: 500, min_order_quantity: 50, unit_step: 50 },
    { id: 'ing_olej', name: 'Minyak goreng', unit: 'ml', stock: 1200, unit_price: 16, min_stock: 1000, target_stock: 5000, min_order_quantity: 1000, unit_step: 500 },
    { id: 'ing_przyprawa', name: 'Bumbu seblak', unit: 'g', stock: 400, unit_price: 120, min_stock: 200, target_stock: 1000, min_order_quantity: 100, unit_step: 100 },
    { id: 'ing_garam', name: 'Garam', unit: 'g', stock: 500, unit_price: 5, min_stock: 200, target_stock: 1000, min_order_quantity: 100, unit_step: 100 },
    { id: 'ing_gula', name: 'Gula pasir', unit: 'g', stock: 1000, unit_price: 16, min_stock: 500, target_stock: 2000, min_order_quantity: 250, unit_step: 250 },
    { id: 'ing_penyedap', name: 'Kaldu bubuk', unit: 'g', stock: 250, unit_price: 50, min_stock: 100, target_stock: 500, min_order_quantity: 50, unit_step: 50 },
    { id: 'ing_kecap', name: 'Kecap manis', unit: 'ml', stock: 400, unit_price: 25, min_stock: 200, target_stock: 800, min_order_quantity: 100, unit_step: 100 },
    { id: 'ing_saus', name: 'Saus sambal', unit: 'ml', stock: 400, unit_price: 20, min_stock: 200, target_stock: 800, min_order_quantity: 100, unit_step: 100 },

    /* --- składniki sklepowe (sprzedawane gotowe, ale muszą mieć stan) --- */
    { id: 'ing_air_botol', name: 'Air mineral 600 ml', unit: 'botol', stock: 12, unit_price: 3500, min_stock: 6, target_stock: 24, min_order_quantity: 6, unit_step: 6 },
    { id: 'ing_air', name: 'Air isi ulang', unit: 'ml', stock: 10000, unit_price: 1, min_stock: 5000, target_stock: 20000, min_order_quantity: 5000, unit_step: 5000 },
    { id: 'ing_es_batu', name: 'Es batu kristal', unit: 'g', stock: 5000, unit_price: 5, min_stock: 2000, target_stock: 10000, min_order_quantity: 1000, unit_step: 1000 },
    { id: 'ing_nutrisari', name: 'Nutrisari', unit: 'sachet', stock: 20, unit_price: 1300, min_stock: 10, target_stock: 40, min_order_quantity: 10, unit_step: 10 },
    { id: 'ing_popice', name: 'Pop Ice', unit: 'sachet', stock: 20, unit_price: 800, min_stock: 10, target_stock: 40, min_order_quantity: 10, unit_step: 10 },
    { id: 'ing_kopi', name: 'Kopi bubuk', unit: 'g', stock: 250, unit_price: 80, min_stock: 100, target_stock: 500, min_order_quantity: 50, unit_step: 50 },
    { id: 'ing_kopi_sachet', name: 'Kopi sachet', unit: 'sachet', stock: 20, unit_price: 1500, min_stock: 10, target_stock: 40, min_order_quantity: 10, unit_step: 10 },
    { id: 'ing_skm', name: 'Susu kental manis', unit: 'g', stock: 500, unit_price: 35, min_stock: 200, target_stock: 1000, min_order_quantity: 100, unit_step: 100 }
  ],

  /* Stare pozycje bez odpowiednika w nowym magazynie - dostaną nagrobek. */
  remove: ['ing_bulki'],

  /**
   * Receptury na JEDNĄ porcję, czyli jedno danie dla jednej osoby.
   * Klucz to identyfikator pozycji menu PIPIN z chmury.
   *
   * Pozycje "Aneka Bakaran" (prod_1789190397123_h1im5l oraz
   * prod_1789190406970_s0gish) są celowo pominięte - PIPIN uzupełni je sam.
   */
  recipes: {
    /* Seblak jamur enoki */
    prod_1789393480774_e0h33e: [
      { id: 'ing_mie', qty: 60 },
      { id: 'ing_enoki', qty: 50 },
      { id: 'ing_aci', qty: 15 },
      { id: 'ing_1789150106428_03q15s', qty: 20 },
      { id: 'ing_sawi', qty: 30 },
      { id: 'ing_przyprawa', qty: 12 },
      { id: 'ing_baput', qty: 4 },
      { id: 'ing_bamer', qty: 4 },
      { id: 'ing_cabai', qty: 8 },
      { id: 'ing_kencur', qty: 3 },
      { id: 'ing_olej', qty: 10 },
      { id: 'ing_garam', qty: 1 },
      { id: 'ing_penyedap', qty: 2 },
      { id: 'ing_gula', qty: 2 }
    ],

    /* Kentang goreng */
    prod_1789278197496_4tnvj0: [
      { id: 'ing_kentang', qty: 150 },
      { id: 'ing_olej', qty: 20 },
      { id: 'ing_tepung_bumbu', qty: 10 },
      { id: 'ing_garam', qty: 1 },
      { id: 'ing_saus', qty: 15 }
    ],

    /* Baso aci */
    prod_1789112921586_4jwyvf: [
      { id: 'ing_aci', qty: 80 },
      { id: 'ing_maka', qty: 20 },
      { id: 'ing_ceker', qty: 30 },
      { id: 'ing_cabai', qty: 10 },
      { id: 'ing_baput', qty: 4 },
      { id: 'ing_kencur', qty: 4 },
      { id: 'ing_przyprawa', qty: 8 },
      { id: 'ing_garam', qty: 2 },
      { id: 'ing_penyedap', qty: 2 },
      { id: 'ing_gula', qty: 2 },
      { id: 'ing_olej', qty: 5 }
    ],

    /* Es */
    prod_1789112936075_37in8m: [
      { id: 'ing_es_batu', qty: 150 }
    ],

    /* Pop es */
    prod_1789112941866_bq351u: [
      { id: 'ing_popice', qty: 1 },
      { id: 'ing_es_batu', qty: 150 },
      { id: 'ing_air', qty: 200 },
      { id: 'ing_gula', qty: 10 }
    ],

    /* Nutrisari */
    prod_1789112947763_86lach: [
      { id: 'ing_nutrisari', qty: 1 },
      { id: 'ing_es_batu', qty: 150 },
      { id: 'ing_air', qty: 200 }
    ],

    /* Es kopi */
    prod_1789113005276_4o7hce: [
      { id: 'ing_kopi', qty: 12 },
      { id: 'ing_gula', qty: 15 },
      { id: 'ing_skm', qty: 20 },
      { id: 'ing_es_batu', qty: 150 },
      { id: 'ing_air', qty: 150 }
    ],

    /* Air mineral */
    prod_1789112958431_121u07: [
      { id: 'ing_air_botol', qty: 1 }
    ],

    /* Kopi pait */
    prod_1789113012036_x5aqgy: [
      { id: 'ing_kopi', qty: 10 },
      { id: 'ing_air', qty: 200 }
    ],

    /* Kopi manis */
    prod_1789113026295_mjc45g: [
      { id: 'ing_kopi_sachet', qty: 1 },
      { id: 'ing_gula', qty: 10 },
      { id: 'ing_air', qty: 200 }
    ]
  }
};
