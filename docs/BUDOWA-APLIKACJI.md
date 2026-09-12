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
├── logoKTP.png
├── push-github.ps1
├── config/
│   ├── default-state.js
│   └── supabase-config.js
├── modules/
│   ├── dialogs.js
│   ├── icon.svg
│   ├── sync.js
│   └── ui.js
├── tools/
│   └── push-release.mjs
├── tests/
│   └── check-translations.mjs
└── docs/
    ├── README.md
    ├── PWA-Lokalny-zapis.md
    ├── BUDOWA-APLIKACJI.md
    ├── SUPABASE-SETUP.md
    ├── supabase-schema.sql
    └── TESTS.md
```

## 3. Odpowiedzialność plików

### `index.html`

Zawiera strukturę interfejsu: nagłówek, zakładki, formularz menu, obsługę klienta, zamówienia, archiwum, ustawienia i dolną nawigację. Ładuje pozostałe pliki w ustalonej kolejności.

Górny pasek (`.app-header`) zawiera trzy elementy: logo `logoKTP.png` po lewej, nazwę aktualnej zakładki na środku oraz datę z nazwą dnia tygodnia po prawej. Logo leży wprost na pomarańczowym pasku (bez białego tła) i jest kadrowane przez `.app-logo-box` z `overflow: hidden` – plik logo ma przezroczyste marginesy wokół znaku, więc obraz jest powiększony (`.app-logo` z `translate(-50%, -50%)`), a nadmiar jest obcinany. Ponieważ plik jest jednokolorowy (brązowy), w CSS jest `filter: brightness(0) invert(1)`, który rozjaśnia znak do bieli – bez tego był niewidoczny na pasku. Nazwy zakładek w pasku to wszystkie warianty językowe w `<h1 class="app-title">` – widoczny jest tylko ten z klasą `.tab-title.active`, ustawianą przy zmianie zakładki. Dlatego panele nie mają już własnych nagłówków z nazwą zakładki (odsyłacze `data-i18n` zostały w pasku, dzięki czemu klucze tłumaczeń nadal są używane).

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
- przełączanie zakładek (razem z nazwą zakładki w górnym pasku),
- datę i nazwę dnia tygodnia w górnym pasku (`renderHeaderDate`, odświeżana też po północy),
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

Opisuje aplikację PWA: nazwę, ikonę, zakres, kolor i tryb `standalone`, dzięki któremu aplikacja uruchamia się bez paska adresu po dodaniu do ekranu głównego. Ikona to `logoKTP.png` (ten sam plik co logo w górnym pasku).

### `service-worker.js`

Cache'uje pliki aplikacji i umożliwia uruchomienie offline. Działa w trybie **najpierw cache**: aplikacja korzysta z wersji zapisanej w cache tak długo, aż użytkownik sam zatwierdzi aktualizację. Nowy service worker instaluje się w tle, pobiera pliki nowej wersji i czeka w stanie `waiting` – przejmuje kontrolę dopiero po komunikacie `SKIP_WAITING`. Plik `version.json` jest zawsze pobierany z sieci z pominięciem cache, dzięki czemu aplikacja wie o nowej wersji, ale jej nie instaluje.

### `version.json`

Jest publicznym źródłem aktualnej wersji opublikowanej na serwerze. Aplikacja porównuje tę wartość z wersją w `config/default-state.js`.

### `config/supabase-config.js`

Przechowuje adres projektu Supabase i klucz publiczny oraz nazwy tabel. Klucz publiczny jest z założenia jawny — trafia do przeglądarki, a danych bronią reguły RLS w bazie.

### `modules/sync.js`

Wysyła dane do Supabase. Odsłania `window.KedaiSync` i spełnia cztery warunki: kierunek jest tylko jeden (telefon wysyła, chmura przyjmuje), wysyłka nigdy nie blokuje zapisu lokalnego, brak internetu nie zużywa prób, a po trzech nieudanych próbach moduł czeka na kolejną zmianę danych. Każdy wiersz podpisuje nazwą użytkownika z Ustawień. Szczegóły wdrożenia opisuje [SUPABASE-SETUP.md](SUPABASE-SETUP.md).

### `tests/check-translations.mjs`

Sprawdza spójność tłumaczeń PL/EN/ID bez uruchamiania przeglądarki: kompletność kluczy, symbole zastępcze, duplikaty oraz użycie kluczy w HTML i w kodzie. Uruchamianie i szczegóły opisuje [TESTS.md](TESTS.md).

### `tools/push-release.mjs` i `push-github.ps1`

Skrypt wydania. `push-release.mjs` (Node) wykonuje całą procedurę publikacji: numer wersji z zegara, podbicie `CACHE_NAME`, testy, commit i push. `push-github.ps1` to cienka nakładka dla Windows – przekazuje argumenty i nie zamyka okna przy uruchomieniu dwuklikiem. Opis w rozdziale 9.

## 4. Menu, orientacja i magazyn

Menu jest listą uporządkowanych elementów dwóch typów: `product` oraz `section`. Element `section` jest nagłówkiem kategorii, np. „Dania główne” albo „Napoje”. Można go przesuwać, edytować i usuwać tak samo jak produkt, ale nie ma ceny ani kontroli ilości. W zakładce Obsługa jest widoczny jako separator grupujący produkty.

Aplikacja jest przeznaczona wyłącznie do pracy w pionie. `manifest.json` ustawia `portrait-primary`, a przy uruchomieniu aplikacja próbuje zablokować orientację ekranu przez Screen Orientation API.

### Magazyn

Moduł magazynu jest podzielony na dwa osobne widoki, które mają różne zadania.

**Zakładka Magazyn** to widok tylko do odczytu. Pokazuje:

- łączną wartość magazynu,
- listę składników z aktualną ilością i jednostką,
- cenę jednostkową i wartość stanu danej pozycji,
- wyróżnienie pozycji poniżej stanu minimalnego czerwoną poświatą.

W tym widoku nie ma możliwości edycji. Dostępne są wyłącznie przyciski **Zamów** i **Lista zamówień**.

**Edycja magazynu** to osobny ekran otwierany przyciskiem w Ustawieniach. Zawiera formularz dodawania i edycji składników oraz listę z przyciskami **Edytuj** i **Usuń**.

Każdy składnik ma pola:

- `name` – nazwa,
- `unit` – jednostka: `szt`, `g` albo `ml`,
- `stock` – aktualna ilość,
- `unit_price` – cena jednostkowa,
- `min_stock` – stan minimalny,
- `target_stock` – stan zalecany, do którego dąży uzupełnienie,
- `min_order_quantity` – minimalna ilość zamówienia,
- `unit_step` – krok zamówienia, np. pieczywo zamawia się po 10 sztuk.

Przy pierwszym uruchomieniu aplikacja wprowadza przykładowe składniki ułatwiające start. Wprowadzenie odbywa się tylko raz i jest zapamiętywane flagą `ingredientsSeeded` w `AppState`. Dzięki temu użytkownik, który celowo usunie wszystkie składniki, nie zobaczy ich ponownie.

Ekran **Zamów** działa podobnie do obsługi klienta. Przyciski `−` i `+` zmieniają ilość o `unit_step`, więc nie da się zamówić ilości spoza kroku. Pod listą znajduje się podsumowanie z wartością zamówienia. Przycisk **Akceptuj** zapisuje zamówienie, a **Anuluj** czyści wybór. Jeżeli ilość nie jest wielokrotnością kroku lub jest mniejsza niż minimalna ilość zamówienia, aplikacja pokazuje komunikat i nie zapisuje zamówienia.

Dla każdego składnika wyświetlana jest proponowana ilość do zamówienia, wyliczana ze stanu zalecanego, kroku zamówienia i minimalnej ilości zamówienia.

**Lista zamówień** pokazuje historię zapisanych zamówień zakupowych z możliwością usunięcia.

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

   Eksport działa dwutorowo, bo w zainstalowanej aplikacji PWA na Androidzie zwykłe pobieranie pliku bywa po cichu ignorowane:

   - najpierw używany jest **arkusz udostępniania** (`navigator.share` z plikiem) – wtedy użytkownik sam wybiera, gdzie zapisać kopię (Pliki, Dysk, wysyłka na inny telefon),
   - dopiero gdy udostępnianie jest niedostępne, plik jest pobierany przez link `download` do folderu Pobrane.

   Adres `blob:` jest zwalniany **z opóźnieniem** (60 s), a nie od razu po kliknięciu. Natychmiastowe `revokeObjectURL` przerywało pobieranie na Androidzie, bo system przejmuje plik asynchronicznie – mimo to aplikacja pokazywała komunikat o powodzeniu. Teraz komunikat sukcesu pojawia się tylko po faktycznym udostępnieniu lub pobraniu, a niepowodzenie zgłasza osobny komunikat `exportFailed`.
5. **Zmiana języka nie nadpisuje menu** – język zapisuje się osobnym rekordem (`saveLanguage`), więc stare okno aplikacji nie może cofnąć zmian w menu.
6. **Pusta lista menu nie jest resetowana** – jeżeli użytkownik celowo usunie wszystkie pozycje, aplikacja nie przywraca domyślnego menu.

Stan magazynu jest widoczny w Ustawieniach razem z informacją, czy pamięć trwała jest włączona.

## 7. Aktualizacje aplikacji

Aktualizacje są **wyłącznie ręczne**. Aplikacja nigdy nie instaluje nowej wersji samoczynnie – dzięki temu wersja działająca w lokalu nie zmienia się w trakcie pracy.

Wersja lokalna jest zapisana w `config/default-state.js`, a wersja serwera w `version.json`. W Ustawieniach użytkownik może sprawdzić aktualizacje.

Jeżeli wersja serwerowa jest większa według kolejności `YY.MM.DD.hhmm`, aplikacja pokazuje komunikat o nowszej wersji oraz przycisk **Aktualizuj aplikację**. Do tego momentu aplikacja nadal działa w starej wersji z cache, mimo nowego service workera czekającego w tle.

Kliknięcie przycisku wysyła do oczekującego service workera komunikat `SKIP_WAITING`. Aplikacja pokazuje pasek postępu, czeka na przejęcie kontroli nad stroną i dopiero wtedy proponuje ponowne uruchomienie. Ponowne uruchomienie oznacza przeładowanie aplikacji i **nie usuwa danych z IndexedDB**.

W `service-worker.js` brak wywołania `skipWaiting()` jest celowy – to właśnie ono powodowało automatyczne aktualizacje. Nowy worker czeka na decyzję użytkownika.

Jeżeli po kliknięciu aktualizacji wersja nadal się nie zmienia, przyczyną jest zwykle cache przeglądarki lub systemu. W takim wypadku wystarczy ponownie otworzyć aplikację i powtórzyć aktualizację.

Po każdej publikacji należy:

1. zmienić numer w `config/default-state.js`,
2. wpisać tę samą wartość w `version.json`,
3. zwiększyć `CACHE_NAME` w `service-worker.js`,
4. wykonać commit i push na GitHub.

Wszystkie te kroki (i uruchomienie testów) wykonuje za Ciebie skrypt wydania z rozdziału 9.

Użytkownik zobaczy nową wersję dopiero po kliknięciu **Aktualizuj aplikację** w Ustawieniach.

## 8. Chmura (Supabase)

Aplikacja może wysyłać dane do Supabase, żeby raporty ze sprzedaży i zamówień robić z komputera. Wysyłka jest **jednokierunkowa** i jest dodatkiem do pracy lokalnej, nie zamiennikiem: źródłem prawdy pozostają dane w telefonie.

Każdy wiersz niesie dwie kolumny opisujące pochodzenie:

- `device_id` — techniczny identyfikator telefonu. Chroni przed nadpisaniem dawnych zamówień po skasowaniu danych aplikacji, gdy lokalne identyfikatory liczą się od nowa.
- `user_name` — nazwa użytkownika wpisana w Ustawieniach. To ona trafia do raportów.

Zapis do chmury jest wykonywany przez `POST` z nagłówkiem `Prefer: resolution=merge-duplicates`, czyli **nadpisuje wiersz o tym samym kluczu**, a nie tworzy duplikatów. Usunięcie zamówienia, składnika albo zamówienia zakupowego usuwa też odpowiedni wiersz w chmurze.

Zasady bezpieczeństwa: dostęp mają wyłącznie zalogowani użytkownicy (jedno wspólne konto lokalu), tabele mają włączone RLS, a w aplikacji jest tylko klucz publiczny. Wysyłka nie startuje, gdy brak konfiguracji lub gdy użytkownik nie jest zalogowany — wtedy aplikacja nie wykonuje żadnego zapytania do sieci.

## 9. Publikacja

Wydanie nowej wersji robi jeden skrypt. Wystarczy w katalogu projektu:

```powershell
.\push-github.ps1 -m "Krótki opis zmiany"
```

albo bezpośrednio przez Node:

```powershell
node tools/push-release.mjs -m "Krótki opis zmiany"
```

Skrypt po kolei:

1. sprawdza, że jesteś na gałęzi `main` i nie masz zaległości z origina,
2. wylicza numer wersji z bieżącego czasu lokalnego (`YY.MM.DD.hhmm`),
3. wpisuje go do `config/default-state.js` i `version.json`,
4. podbija `CACHE_NAME` w `service-worker.js`,
5. uruchamia wszystkie testy `tests/check-*.mjs`,
6. pokazuje listę plików, które trafią do commita,
7. robi commit i `git push origin main`,
8. czeka, aż GitHub Pages opublikuje nowy `version.json`.

Jeżeli test nie przejdzie, skrypt **przywraca poprzedni numer wersji**, więc nieudane wydanie nie zostawia zmian w plikach.

Przydatne opcje:

| Opcja | Znaczenie |
| --- | --- |
| `--dry-run` | pokazuje plan i nic nie zmienia |
| `-y` | pomija pytanie „Wysłać na GitHub?” |
| `-v 26.09.12.0330` | numer wersji podany ręcznie |
| `--no-test` | pomija testy |
| `--no-push` | robi tylko commit lokalnie |
| `--no-verify` | nie czeka na publikację GitHub Pages |
| `-h` | pomoc |

Uwagi:

- Kopie zapasowe danych (`kedai-pos-backup-*.json`) są **celowo pomijane** — repozytorium jest publiczne, a pliki zawierają prawdziwe zamówienia.
- Uruchomienie bez `-m` zapyta o opis zmiany, a przed wysłaniem poprosi o potwierdzenie. Do treści commita dołączany jest automatycznie numer wersji i `CACHE_NAME`.
- Numer wersji musi być większy od poprzedniego. Przy dwóch wydaniach w tej samej minucie skrypt poprosi o odczekanie minuty albo o numer podany przez `-v`.
- Nie używaj `git add -A` ręcznie — łatwo wtedy wysłać kopię zapasową danych na publiczne repozytorium.

Sprawdzenie samych tłumaczeń (bez publikacji):

```powershell
node tests/check-translations.mjs
```

GitHub Pages udostępnia aplikację pod adresem:

```text
https://pawfur.github.io/ktp/
```

Po publikacji Android może zainstalować aplikację jako PWA przez Chrome i uruchamiać ją bez paska adresu.
