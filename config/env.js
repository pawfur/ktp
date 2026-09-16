/**
 * Znacznik środowiska dla nazw zasobów przeglądarki.
 *
 * Wydanie OFICJALNE (telefon lokalu) NIE zmienia ani jednej nazwy — sufiks jest
 * pusty. Dzięki temu aktualizacja nie gubi odcisków wysyłki ani nagrobków
 * i nie wymaga żadnej migracji danych na telefonie PIPIN.
 *
 * Wydanie TESTOWE dostaje sufiks `_test`, bo obie aplikacje leżą na tej samej
 * domenie, a przeglądarka trzyma dla nich WSPÓLNY magazyn: localStorage
 * i IndexedDB należą do domeny, a nie do katalogu w adresie. Bez rozdziału:
 *
 *   - sesja logowania jednej wersji podmieniałaby sesję drugiej,
 *   - odciski wysyłki mieszałyby się, więc dane po cichu nie docierałyby,
 *   - nagrobki jednej wersji trafiałyby do kolejki drugiej,
 *   - obie wersje pisałyby do tej samej bazy lokalnej i tej samej kopii zapasowej.
 *
 * Ten plik musi być wczytany PO obu plikach konfiguracji i PRZED database.js.
 */
window.KedaiEnv = (function () {
  const config = window.KedaiSupabaseConfig || {};
  const isTest = config.env === 'test';
  const suffix = isTest ? '_test' : '';

  return {
    isTest: isTest,
    suffix: suffix,

    /** Pełna nazwa klucza w pamięci lokalnej przeglądarki. */
    key: function (name) {
      return name + suffix;
    },

    /** Nazwa lokalnej bazy danych (IndexedDB). */
    dbName: 'KedaiPOS' + suffix
  };
})();
