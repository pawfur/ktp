# Kedai POS

Kedai POS to lokalna aplikacja POS dla telefonu z Androidem. Działa jako strona webowa/PWA i przechowuje dane wyłącznie w IndexedDB przeglądarki. Aplikacja nie korzysta z Google Sheets, Apps Script ani zewnętrznego serwera danych.

## Funkcje

- zarządzanie menu i cenami,
- wybieranie produktów i ilości dla klienta,
- aktywne zamówienia,
- archiwum sprzedaży,
- potwierdzenia przed operacjami usuwania/anulowania,
- język polski, angielski i indonezyjski,
- waluta IDR,
- działanie lokalne i offline po pierwszym załadowaniu zasobów.

## PWA na Androidzie

Aplikacja zawiera `manifest.json` z trybem `standalone` oraz `service-worker.js`. Po publikacji przez GitHub Pages należy otworzyć adres HTTPS w Chrome, usunąć wcześniejszy skrót z ekranu głównego i dodać aplikację ponownie przez **Dodaj do ekranu głównego**. Nowy skrót uruchomi Kedai POS bez paska adresu.

## Struktura projektu

- `index.html` – widok aplikacji, formularze, zakładki i obsługa interakcji.
- `styles.css` – własne style aplikacji, niezależne od struktury HTML.
- `config/default-state.js` – domyślne menu, początkowy stan aplikacji i numer wersji.
- `database.js` – warstwa IndexedDB: otwieranie bazy, `onupgradeneeded`, migracje, transakcje i operacje na zamówieniach.
- `modules/ui.js` – formatowanie waluty i dat, bezpieczne HTML oraz generowanie identyfikatorów.
- `modules/dialogs.js` – wspólny mobilny dialog potwierdzeń.
- `README.md` – opis techniczny aplikacji i bazy.
- `PWA-Lokalny-zapis.md` – decyzje dotyczące PWA i lokalnego przechowywania danych.
- `BUDOWA-APLIKACJI.md` – pełny opis budowy, wersjonowania i aktualizacji aplikacji.

`index.html` korzysta z publicznego API `window.KedaiDatabase`, dlatego logika bazy nie jest wymieszana z widokiem. Dzięki temu kolejne moduły, np. magazyn i receptury, można dodawać bez umieszczania operacji IndexedDB w HTML.

## Baza IndexedDB

Baza ma nazwę `KedaiPOS` i wersję `2`. Schemat jest tworzony oraz aktualizowany w funkcji `onupgradeneeded`.

Wymagane sklepy obiektów:

### `Ingredients`

Słownik surowców magazynowych. Klucz: `id`.

- `id`
- `name`
- `unit`: `g`, `ml` albo `szt`
- `stock`
- `min_stock`
- `target_stock`
- `package_size`
- `min_order_quantity` / `moq`
- indeks `by_name`

### `Recipes`

Powiązanie dań z surowcami. Klucz: `id`.

- `id`
- `meal_id`
- `ingredient_id`
- `amount`: zużycie na jedną porcję
- indeksy `by_meal_id` i `by_ingredient_id`

### `StockOperations`

Dziennik zmian magazynowych. Klucz: `id`, autoinkrementacja.

- `id`
- `ingredient_id`
- `type`: `sale`, `delivery`, `loss` albo `audit_adjustment`
- `change`
- `date`: data i czas w formacie ISO
- `notes`
- indeksy `by_ingredient_id` i `by_date`

### `Orders`

Historia zamówień klientów. Klucz: `id`, autoinkrementacja.

- `id`
- `total_price`
- `items`: tablica obiektów zawierających `meal_id`, `quantity` i `custom_modifications`
- `date`: dokładna data i czas w formacie ISO
- dodatkowo aplikacja przechowuje status `active` albo `archived`, aby obsługiwać zakładki Zamówienia i Archiwum.
- indeksy `by_status` i `by_date`

### `AppState`

Dodatkowy sklep techniczny dla danych interfejsu, których nie przechowują sklepy domenowe:

- menu,
- wybrany język.

## Wersjonowanie bazy

Przy zwiększeniu `DB_VERSION` należy w `onupgradeneeded` dodać migrację warunkową, np.:

```js
if (event.oldVersion < 2) {
  // zmiana schematu dla wersji 2
}
```

Nie należy usuwać ani zmieniać istniejących danych bez migracji. Dzięki wersjonowaniu IndexedDB aplikacja może rozwijać model magazynu, receptur i sprzedaży bez ręcznego czyszczenia danych na telefonie.

## Uruchomienie na Androidzie

Uruchom lokalny serwer w folderze projektu:

```powershell
python -m http.server 8000
```

Następnie na telefonie podłączonym do tej samej sieci Wi-Fi otwórz adres IP komputera, np.:

```text
http://172.20.10.4:8000
```

W Chrome można dodać stronę do ekranu głównego. Po przygotowaniu manifestu i service workera będzie można używać jej jako PWA.

## Kopia danych

Dane są lokalne dla konkretnej przeglądarki i urządzenia. Usunięcie danych witryny może usunąć bazę IndexedDB, dlatego kolejnym rozsądnym krokiem jest dodanie eksportu/importu lokalnej kopii, np. do pliku JSON lub CSV. Nie jest to synchronizacja z Google Sheets.
