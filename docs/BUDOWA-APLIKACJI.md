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
├── tests/
│   └── check-translations.mjs
└── docs/
    ├── README.md
    ├── PWA-Lokalny-zapis.md
    ├── BUDOWA-APLIKACJI.md
    └── TESTS.md
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

### `tests/check-translations.mjs`

Sprawdza spójność tłumaczeń PL/EN/ID bez uruchamiania przeglądarki: kompletność kluczy, symbole zastępcze, duplikaty oraz użycie kluczy w HTML i w kodzie. Uruchamianie i szczegóły opisuje [TESTS.md](TESTS.md).

## 4. Menu, orientacja i magazyn

Menu jest listą uporządkowanych elementów dwóch typów: `product` oraz `section`. Element `section` jest nagłówkiem kategorii, np. „Dania główne” albo „Napoje”. Można go przesuwać, edytować i usuwać tak samo jak produkt, ale nie ma ceny ani kontroli ilości. W zakładce Obsługa jest widoczny jako separator grupujący produkty.

Aplikacja jest przeznaczona wyłącznie do pracy w pionie. `manifest.json` ustawia `portrait-primary`, a przy uruchomieniu aplikacja próbuje zablokować orientację ekranu przez Screen Orientation API.

### Magazyn

Zakładka Magazyn przechowuje składniki i pozwala je zamawiać. Każdy składnik ma pola:

- `name` – nazwa,
- `unit` – jednostka: `szt`, `g` albo `ml`,
- `stock` – aktualna ilość,
- `unit_price` – cena jednostkowa,
- `min_stock` – stan minimalny, poniżej którego pozycja jest wyróżniona na czerwono,
- `target_stock` – stan zalecany, do którego dąży uzupełnienie,
- `min_order_quantity` – minimalna ilość zamówienia,
- `unit_step` – krok zamówienia, np. pieczywo zamawia się po 10 sztuk.

Zakładka udostępnia dwa przyciski:

- **Zamów** – ekran zamawiania wzorowany na obsłudze klienta. Przyciski `−` i `+` zmieniają ilość o `unit_step`, więc nie da się zamówić ilości spoza kroku. Pod listą znajduje się podsumowanie z wartością zamówienia. Przycisk **Akceptuj** zapisuje zamówienie, a **Anuluj** czyści wybór. Jeżeli ilość nie jest wielokrotnością kroku lub jest mniejsza niż minimalna ilość zamówienia, aplikacja pokazuje odpowiedni komunikat i nie zapisuje zamówienia.
- **Lista zamówień** – historia zapisanych zamówień zakupowych z możliwością usunięcia.

Dla każdego składnika wyświetlana jest także proponowana ilość do zamówienia, wyliczana ze stanu zalecanego, kroku zamówienia i minimalnej ilości zamówienia.

Edycja i usuwanie składników działa tak samo jak w menu: przycisk **Edytuj** wypełnia formularz, a **Usuń** wymaga potwierdzenia. Skrót **Edycja magazynu** znajduje się także w Ustawieniach.

## 5. IndexedDB

Baza nazywa się `KedaiPOS` i jest wersjonowana. Obecna wersja to `3`. Zawiera:

- `Ingredients` – składniki magazynowe,
- `Recipes` – powiązania dań z surowcami,
- `StockOperations` – historię dostaw, strat, sprzedaży i korekt,
- `Orders` – aktywne i zarchiwizowane zamówienia klientów,
- `PurchaseOrders` – zamówienia zakupowe składników,
- `AppState` – menu i język interfejsu.

`Orders` ma autoinkrementowane `id`, kwotę, tablicę pozycji, dokładną datę ISO i status `active` albo `archived`.

`PurchaseOrders` ma autoinkrementowane `id`, pozycje z ilością i ceną jednostkową, łączną wartość, datę ISO oraz status `ordered`. Wersja 3 bazy dodała właśnie ten magazyn.

## 6. Ochrona danych przed utratą

Dane są zapisywane lokalnie na telefonie, dlatego aplikacja stosuje kilka zabezpieczeń:

1. **Brak zapisu przy starcie** – `initialize()` tylko odczytuje bazę. Zapis następuje wyłącznie po działaniu użytkownika. Wcześniej aplikacja zapisywała stan przy każdym uruchomieniu, przez co błędny lub pusty odczyt natychmiast zastępował prawdziwe dane domyślnym menu.
2. **Trwały magazyn** – przy starcie aplikacja wywołuje `navigator.storage.persist()`, aby system nie usuwał danych przy braku miejsca.
3. **Kopia zapasowa w `localStorage`** – po każdym zapisie aktualizowana jest kopia pod kluczem `kedai_pos_backup_v1`. Jeżeli IndexedDB zostanie wyczyszczona, a kopia istnieje, aplikacja automatycznie odtworzy menu, zamówienia i archiwum.
4. **Eksport i import** – w Ustawieniach znajduje się sekcja kopii zapasowej, która pozwala zapisać dane do pliku JSON i wczytać je na innym telefonie. Kopia obejmuje menu, składniki magazynowe, zamówienia klientów i zamówienia zakupowe. To najbezpieczniejszy sposób przenoszenia danych.
5. **Zmiana języka nie nadpisuje menu** – język zapisuje się osobnym rekordem (`saveLanguage`), więc stare okno aplikacji nie może cofnąć zmian w menu.
6. **Pusta lista menu nie jest resetowana** – jeżeli użytkownik celowo usunie wszystkie pozycje, aplikacja nie przywraca domyślnego menu.

Stan magazynu jest widoczny w Ustawieniach razem z informacją, czy pamięć trwała jest włączona.

## 7. Aktualizacje aplikacji

Wersja lokalna jest zapisana w `config/default-state.js`, a wersja serwera w `version.json`. W Ustawieniach użytkownik może sprawdzić aktualizacje.

Jeżeli wersja serwerowa jest większa według kolejności `YY.MM.DD.hhmm`, aplikacja pokazuje przycisk **Aktualizuj aplikację**. Kliknięcie wymusza aktualizację service workera i przeładowanie plików PWA.

Aktualizacja pokazuje pasek postępu. Aplikacja czeka na zakończenie instalacji nowego service workera i przejęcie kontroli nad stroną. Dopiero po ukończeniu wyświetla prośbę o ponowne uruchomienie aplikacji. Ponowne uruchomienie oznacza przeładowanie aplikacji i nie usuwa danych z IndexedDB.

Service worker działa w trybie **najpierw sieć, cache jako tryb offline**. Pliki aplikacji są pobierane z rewalidacją (`cache: 'no-cache'`), dzięki czemu przeglądarka nie podaje starej wersji z cache HTTP. Gdy nie ma internetu, aplikacja korzysta z zapisanej kopii. Plik `version.json` jest zawsze pobierany z pominięciem cache.

Jeżeli mimo to wersja się nie zmienia, przyczyną jest zwykle cache przeglądarki lub systemu. Wtedy warto wyczyścić dane witryny albo użyć przycisku aktualizacji, który dodatkowo usuwa cache `kedai-pos-*`.

Po każdej publikacji należy:

1. zmienić numer w `config/default-state.js`,
2. wpisać tę samą wartość w `version.json`,
3. zwiększyć `CACHE_NAME` w `service-worker.js`,
4. wykonać commit i push na GitHub.

## 8. Publikacja

Przed publikacją warto uruchomić sprawdzanie tłumaczeń:

```powershell
node tests/check-translations.mjs
```

GitHub Pages udostępnia aplikację pod adresem:

```text
https://pawfur.github.io/ktp/
```

Po publikacji Android może zainstalować aplikację jako PWA przez Chrome i uruchamiać ją bez paska adresu.
