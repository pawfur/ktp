# Budowa aplikacji Kedai POS

## 1. Cel

Kedai POS jest lokalnym systemem sprzedaży dla Kedai Seblak. Aplikacja działa jako PWA na Androidzie, zapisuje dane w IndexedDB i może pracować bez stałego połączenia z internetem.

## 2. Struktura plików

```text
Kedai/
├── index.html
├── styles.css
├── app.js
├── database.js
├── manifest.json
├── service-worker.js
├── version.json
├── config/
│   └── default-state.js
├── modules/
│   ├── dialogs.js
│   ├── icon.svg
│   └── ui.js
└── docs/
    ├── README.md
    ├── PWA-Lokalny-zapis.md
    └── BUDOWA-APLIKACJI.md
```

## 3. Odpowiedzialność plików

### `index.html`

Zawiera strukturę interfejsu: nagłówek, zakładki, formularz menu, obsługę klienta, zamówienia, archiwum, ustawienia i dolną nawigację. Ładuje pozostałe pliki w ustalonej kolejności.

### `styles.css`

Zawiera własne style aplikacji, między innymi wygląd kart, nawigacji, przycisków, responsywność i `touch-action: manipulation`, które ogranicza przypadkowe podwójne powiększenie na telefonie.

### `config/default-state.js`

Przechowuje domyślne menu, początkowy stan aplikacji i numer lokalnej wersji. Numer wersji ma format:

```text
YY.MM.DD.hhmm
```

Przykład: `26.09.09.2138` oznacza rok 2026, 9 września, godzinę 21:38.

### `app.js`

Jest głównym kontrolerem aplikacji. Odpowiada za:

- tłumaczenia PL/EN/ID,
- przełączanie zakładek,
- renderowanie menu, obsługi, zamówień i archiwum,
- dodawanie, edycję, usuwanie i porządkowanie menu,
- tworzenie i edycję zamówień,
- archiwizację i usuwanie zamówień,
- komunikaty i potwierdzenia,
- sprawdzanie wersji serwerowej.

Udostępnia `window.KedaiDatabase`. Otwiera bazę IndexedDB, wykonuje migracje w `onupgradeneeded` i zapisuje stan aplikacji oraz zamówienia.

### `modules/ui.js`

Zawiera wspólne helpery: formatowanie IDR, daty, bezpieczne kodowanie HTML i generowanie identyfikatorów.

### `modules/dialogs.js`

Obsługuje mobilne okna potwierdzeń przed usunięciem, anulowaniem i innymi operacjami wymagającymi potwierdzenia.

### `manifest.json`

Opisuje aplikację PWA: nazwę, ikonę, zakres, kolor i tryb `standalone`, dzięki któremu aplikacja uruchamia się bez paska adresu po dodaniu do ekranu głównego.

### `service-worker.js`

Cache'uje pliki aplikacji, umożliwia uruchomienie offline i pobiera nowe wersje zasobów po zmianie numeru cache. Plik `version.json` jest zawsze pobierany z sieci, aby sprawdzanie aktualizacji nie korzystało ze starej wersji.

### `version.json`

Jest publicznym źródłem aktualnej wersji opublikowanej na serwerze. Aplikacja porównuje tę wartość z wersją w `config/default-state.js`.

## 4. Kategorie menu i orientacja

Menu jest listą uporządkowanych elementów dwóch typów: `product` oraz `section`. Element `section` jest nagłówkiem kategorii, np. „Dania główne” albo „Napoje”. Można go przesuwać, edytować i usuwać tak samo jak produkt, ale nie ma ceny ani kontroli ilości. W zakładce Obsługa jest widoczny jako separator grupujący produkty.

Aplikacja jest przeznaczona wyłącznie do pracy w pionie. `manifest.json` ustawia `portrait-primary`, a przy uruchomieniu aplikacja próbuje zablokować orientację ekranu przez Screen Orientation API.

## 5. IndexedDB

Baza nazywa się `KedaiPOS` i jest wersjonowana. Obecnie zawiera:

- `Ingredients` – surowce i stany magazynowe,
- `Recipes` – powiązania dań z surowcami,
- `StockOperations` – historię dostaw, strat, sprzedaży i korekt,
- `Orders` – aktywne i zarchiwizowane zamówienia,
- `AppState` – menu i język interfejsu.

`Orders` ma autoinkrementowane `id`, kwotę, tablicę pozycji, dokładną datę ISO i status `active` albo `archived`.

## 6. Aktualizacje aplikacji

Wersja lokalna jest zapisana w `config/default-state.js`, a wersja serwera w `version.json`. W Ustawieniach użytkownik może sprawdzić aktualizacje.

Jeżeli wersja serwerowa jest większa według kolejności `YY.MM.DD.hhmm`, aplikacja pokazuje przycisk **Aktualizuj aplikację**. Kliknięcie wymusza aktualizację service workera i przeładowanie plików PWA.

Aktualizacja pokazuje pasek postępu. Aplikacja czeka na zakończenie instalacji nowego service workera i przejęcie kontroli nad stroną. Dopiero po ukończeniu wyświetla prośbę o ponowne uruchomienie aplikacji. Ponowne uruchomienie oznacza przeładowanie aplikacji i nie usuwa danych z IndexedDB.

Po każdej publikacji należy:

1. zmienić numer w `config/default-state.js`,
2. wpisać tę samą wartość w `version.json`,
3. zwiększyć `CACHE_NAME` w `service-worker.js`,
4. wykonać commit i push na GitHub.

## 7. Publikacja

GitHub Pages udostępnia aplikację pod adresem:

```text
https://pawfur.github.io/ktp/
```

Po publikacji Android może zainstalować aplikację jako PWA przez Chrome i uruchamiać ją bez paska adresu.
