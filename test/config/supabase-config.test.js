/**
 * Dane połączenia z bazą TESTOWĄ (projekt KTP-test).
 *
 * Ten plik jest ładowany po `supabase-config.js` i podmienia dane połączenia
 * TYLKO wtedy, gdy aplikacja działa ze środowiska testowego:
 *
 *   /test/                 → wydanie testowe na GitHub Pages
 *   localhost / 127.0.0.1  → praca na komputerze
 *
 * Wydanie oficjalne (telefon lokalu) nigdy nie wchodzi w ten warunek, więc
 * działa na dokładnie tym samym połączeniu co dotychczas. To celowe: o tym,
 * z którą bazą rozmawia aplikacja, decyduje ADRES, a nie żadne ustawienie
 * w telefonie. Nie da się tego przestawić przez pomyłkę w Ustawieniach.
 *
 * Klucz publikowalny jest jawny z założenia (trafia do przeglądarki) — danych
 * bronią reguły RLS uruchomione w projekcie testowym. Klucza "secret" ani
 * "service_role" NIE wolno tu wpisywać: omija RLS i dałby pełny dostęp do bazy.
 */
(function () {
  const fromTestBuild = /\/test\//.test(window.location.pathname);
  const fromComputer = window.location.hostname === 'localhost'
    || window.location.hostname === '127.0.0.1';

  if (!fromTestBuild && !fromComputer) return;

  window.KedaiSupabaseConfig = {
    // Środowisko testowe: oprócz innej bazy dostaje własne nazwy kluczy
    // przeglądarki (config/env.js), żeby nie mieszało się z wydaniem lokalu.
    env: 'test',
    url: 'https://iajltsthhcwddruflybv.supabase.co',
    anonKey: 'sb_publishable_4QkxY8AonRE8oil2njKw8A_WXAFdzOk',

    // Kolejność wysyłania. Można zostawić bez zmian.
    tables: {
      menu: 'menu_items',
      ingredients: 'ingredients',
      clientOrders: 'client_orders',
      purchaseOrders: 'purchase_orders'
    }
  };
})();
