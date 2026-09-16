/**
 * Uzupełnienie magazynu dla wydania LOKALU (KTP).
 *
 * PLIK GENEROWANY - nie edytuj ręcznie. Odświeżenie:
 *   node tools/build-seed-test.mjs
 *
 * Zbudowano: 17 września 2026 01:04
 * Odcisk treści (version): acb66b6ecf
 * Do dopisania: 22 pozycji w 5 zakładkach;
 * kolejność ustawiana dla 25 istniejących pozycji.
 *
 * Aplikacja stosuje to TYLKO w wydaniu lokalu (nie w środowisku testowym),
 * tylko na telefonie o nazwie użytkownika 'PIPIN' (identyfikatory pozycji są
 * wspólne między telefonami, więc inne urządzenie wniosłoby je do chmury
 * pod swoim imieniem), raz na odcisk, i tylko dodaje brakujące pozycje -
 * stany magazynowe, ceny i progi istniejących pozycji zostają bez zmian.
 */
window.KedaiSeedWarehouse = {
  version: 'acb66b6ecf',
  builtAt: '17 września 2026 01:04',
  userName: 'PIPIN',
  sections: [
    { id: 'sec_bumbu', name: "Bumbu & saus", type: 'section', color: 30, sort_order: 0, unit: '', stock: 0, unit_price: 0, min_stock: 0, unit_step: 0 },
    { id: 'sec_sayur', name: "Sayur & segar", type: 'section', color: 120, sort_order: 13, unit: '', stock: 0, unit_price: 0, min_stock: 0, unit_step: 0 },
    { id: 'sec_protein', name: "Protein & frozen", type: 'section', color: 355, sort_order: 20, unit: '', stock: 0, unit_price: 0, min_stock: 0, unit_step: 0 },
    { id: 'sec_kering', name: "Kering & mie", type: 'section', color: 55, sort_order: 30, unit: '', stock: 0, unit_price: 0, min_stock: 0, unit_step: 0 },
    { id: 'sec_minuman', name: "Minuman & jualan", type: 'section', color: 200, sort_order: 40, unit: '', stock: 0, unit_price: 0, min_stock: 0, unit_step: 0 },
  ],
  items: [
    { id: 'ing_bamer', name: "Bawang merah", unit: 'g', unit_price: 40, min_stock: 200, unit_step: 100, stock: 0, sort_order: 1 },
    { id: 'ing_baput', name: "Bawang putih", unit: 'g', unit_price: 35, min_stock: 200, unit_step: 100, stock: 0, sort_order: 2 },
    { id: 'ing_cabai', name: "Cabai rawit merah", unit: 'g', unit_price: 50, min_stock: 300, unit_step: 100, stock: 0, sort_order: 3 },
    { id: 'ing_garam', name: "Garam", unit: 'g', unit_price: 5, min_stock: 200, unit_step: 100, stock: 0, sort_order: 4 },
    { id: 'ing_saus_tomat', name: "Saus tomat", unit: 'ml', unit_price: 20, min_stock: 200, unit_step: 100, stock: 0, sort_order: 10 },
    { id: 'ing_przyprawa', name: "Przyprawa do seblak", unit: 'g', unit_price: 120, min_stock: 500, unit_step: 100, stock: 0, sort_order: 11 },
    { id: 'ing_tempe', name: "Tempe", unit: 'g', unit_price: 15, min_stock: 500, unit_step: 250, stock: 0, sort_order: 19 },
    { id: 'ing_telur_puyuh', name: "Telur puyuh", unit: 'szt', unit_price: 700, min_stock: 20, unit_step: 10, stock: 0, sort_order: 22 },
    { id: 'ing_daging_ayam', name: "Daging ayam", unit: 'g', unit_price: 40, min_stock: 1000, unit_step: 500, stock: 0, sort_order: 24 },
    { id: 'ing_bakso', name: "Bakso sapi", unit: 'g', unit_price: 60, min_stock: 500, unit_step: 500, stock: 0, sort_order: 26 },
    { id: 'ing_bakso_ikan', name: "Bakso ikan", unit: 'g', unit_price: 45, min_stock: 500, unit_step: 250, stock: 0, sort_order: 27 },
    { id: 'ing_nugget', name: "Nugget ayam", unit: 'g', unit_price: 30, min_stock: 500, unit_step: 250, stock: 0, sort_order: 28 },
    { id: 'ing_dou_twister', name: "Dou twister", unit: 'szt', unit_price: 2500, min_stock: 5, unit_step: 5, stock: 0, sort_order: 29 },
    { id: 'ing_tepung_bumbu', name: "Tepung bumbu", unit: 'g', unit_price: 20, min_stock: 500, unit_step: 250, stock: 0, sort_order: 32 },
    { id: 'ing_aci', name: "Aci (tapioka)", unit: 'g', unit_price: 11, min_stock: 1000, unit_step: 500, stock: 0, sort_order: 33 },
    { id: 'ing_mie_kuning', name: "Mie kuning", unit: 'g', unit_price: 14, min_stock: 1000, unit_step: 500, stock: 0, sort_order: 35 },
    { id: 'ing_mie_tiaw', name: "Mie tiaw", unit: 'g', unit_price: 14, min_stock: 1000, unit_step: 500, stock: 0, sort_order: 36 },
    { id: 'ing_roti', name: "Roti tawar", unit: 'szt', unit_price: 15000, min_stock: 2, unit_step: 1, stock: 0, sort_order: 39 },
    { id: 'ing_air', name: "Air isi ulang", unit: 'ml', unit_price: 1, min_stock: 5000, unit_step: 5000, stock: 0, sort_order: 42 },
    { id: 'ing_coca', name: "Coca-cola", unit: 'szt', unit_price: 4000, min_stock: 6, unit_step: 6, stock: 0, sort_order: 49 },
    { id: 'ing_fanta', name: "Fanta", unit: 'szt', unit_price: 4000, min_stock: 6, unit_step: 6, stock: 0, sort_order: 50 },
    { id: 'ing_chips', name: "Chips", unit: 'szt', unit_price: 800, min_stock: 10, unit_step: 10, stock: 0, sort_order: 51 },
  ],
  order: [
    { id: 'ing_penyedap', sort_order: 5 },
    { id: 'ing_kencur', sort_order: 6 },
    { id: 'ing_gula', sort_order: 7 },
    { id: 'ing_kecap', sort_order: 8 },
    { id: 'ing_saus', sort_order: 9 },
    { id: 'ing_olej', sort_order: 12 },
    { id: 'ing_sawi', sort_order: 14 },
    { id: 'ing_kol', sort_order: 15 },
    { id: 'ing_kentang', sort_order: 16 },
    { id: 'ing_enoki', sort_order: 17 },
    { id: 'ing_tahu', sort_order: 18 },
    { id: 'ing_jajka', sort_order: 21 },
    { id: 'ing_ceker', sort_order: 23 },
    { id: 'ing_sosis', sort_order: 25 },
    { id: 'ing_maka', sort_order: 31 },
    { id: 'ing_mie', sort_order: 34 },
    { id: 'ing_1789150106428_03q15s', sort_order: 37 },
    { id: 'ing_1789468269423_7th3aw', sort_order: 38 },
    { id: 'ing_air_botol', sort_order: 41 },
    { id: 'ing_es_batu', sort_order: 43 },
    { id: 'ing_kopi', sort_order: 44 },
    { id: 'ing_kopi_sachet', sort_order: 45 },
    { id: 'ing_skm', sort_order: 46 },
    { id: 'ing_popice', sort_order: 47 },
    { id: 'ing_nutrisari', sort_order: 48 },
  ]
};
