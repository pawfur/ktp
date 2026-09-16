# Dwa środowiska bazy — co jest gdzie

Kedai POS rozmawia z **dwiema** bazami Supabase. Ten plik mówi, gdzie co wpisać,
żeby ich nie pomylić. Cztery miejsca, cztery różne zadania — nie mieszają się.

## Skrót

| Baza | Kto jej używa | Konto do logowania w aplikacji |
|---|---|---|
| **KTP** (oficjalna) | telefon lokalu (PIPIN) | konto lokalu |
| **KTP-test** | Twój telefon testowy i komputer | `dpsk@test.pl` |

O tym, którą bazę widzi aplikacja, **decyduje adres, z którego działa** — nie żadne
ustawienie w telefonie. Nie da się tego przestawić przez pomyłkę.

| Adres aplikacji | Baza |
|---|---|
| `pawfur.github.io/ktp/` | KTP (oficjalna) |
| `pawfur.github.io/ktp/test/` | KTP-test |
| `localhost:8000` (komputer) | KTP-test |

## 1. Projekty w Supabase

| | KTP (oficjalny) | KTP-test |
|---|---|---|
| ref projektu | `gbtiuowskxigyqvmaukw` | `iajltsthhcwddruflybv` |
| adres | `https://gbtiuowskxigyqvmaukw.supabase.co` | `https://iajltsthhcwddruflybv.supabase.co` |
| klucz publikowalny | `sb_publishable_auYiI3QTVh9EZPSycQ7Qrw_bcZTIpEx` | `sb_publishable_4QkxY8AonRE8oil2njKw8A_WXAFdzOk` |
| organizacja | KTP | KTP |
| schemat tabel | uruchomiony | uruchomiony (16.09) |

Klucze publikowalne są jawne z założenia — trafiają do przeglądarki i są w tym
repozytorium. Danych bronią reguły RLS. **Kluczy `secret` / `service_role` nie
wpisuje się nigdzie w tym projekcie.**

## 2. Pliki w repozytorium (aplikacja)

| Plik | Baza | Kiedy działa |
|---|---|---|
| `config/supabase-config.js` | KTP (oficjalna) | zawsze, chyba że nadpisze ją plik testowy |
| `config/supabase-config.test.js` | KTP-test | tylko z `/test/` i z `localhost` / `127.0.0.1` |

Plik testowy jest ładowany **po** oficjalnym i podmienia dane połączenia tylko przy
swoim warunku. Na telefonie lokalu nie wchodzi w ten warunek nigdy.

## 3. VS Code — dostęp dla asystenta (MCP)

Trzy wpisy w `%APPDATA%\Code\User\mcp.json`. Każdy potrzebuje **własnego tokenu**,
żeby nie nadpisać pozostałych:

| Serwer MCP | Projekt | Token |
|---|---|---|
| `supabase` | KTP | nie potrzebuje (tylko odczyt) |
| `supabase-write` | KTP | `supabase-pat` |
| `supabase-test` | KTP-test | `supabase-pat-test` |

Tokeny tworzy się na https://supabase.com/dashboard/account/tokens — przy tworzeniu
zaznacz organizację `KTP`. Token wkleja się **raz**, w okienko VS Code; trafia do
magazynu haseł systemu, nie do pliku i nie do czatu.

Uwaga: token `supabase-pat` powstał zanim istniał projekt KTP-test, dlatego
`supabase-test` wymaga **nowego** tokenu — inaczej odpowiada „brak uprawnień".

## 4. Logowanie w aplikacji

Login i hasło wpisuje się **w aplikacji**, w Ustawieniach → Chmura. Nigdy w plikach
i nigdy w czacie.

| Gdzie | E-mail | Hasło |
|---|---|---|
| telefon PIPIN (`/ktp/`) | konto lokalu | hasło lokalu |
| telefon testowy (`/ktp/test/`) | `dpsk@test.pl` | hasło konta testowego |
| komputer (`localhost:8000`) | `dpsk@test.pl` | hasło konta testowego |

Konto w projekcie testowym musi mieć zaznaczone **Auto Confirm User**, inaczej
logowanie zwróci `email_not_confirmed`.

## 5. Narzędzia z linii poleceń

| Polecenie | Co robi | Baza |
|---|---|---|
| `.\push-github.ps1 -m "opis"` | wydanie dla lokalu (podbija numer wersji) | — |
| `node tools/push-test.mjs` | wydanie testowe pod `/ktp/test/` | — |
| `node tools/db.mjs <polecenie>` | raporty, tylko odczyt | **KTP (oficjalna)** |
| `node tools/build-seed-test.mjs` | buduje `config/seed-test.js` (lustro danych dla środowiska testowego) | **KTP (oficjalna)** — czyta przez `db.mjs` |

`tools/db.mjs` czyta adres z `config/supabase-config.js`, czyli zawsze z bazy
oficjalnej — i tak ma być, bo raporty dotyczą lokalu. Ma też polecenie
`warehouse` (pełny magazyn z zakładkami); `--json` daje surowe wiersze do
dalszego przetwarzania.

## 6. Jak sprawdzić, z którą bazą rozmawia aplikacja

W konsoli przeglądarki (albo w narzędziach deweloperskich na telefonie):

```js
window.KedaiSupabaseConfig.url
```

- `https://gbtiuowskxigyqvmaukw.supabase.co` → baza oficjalna
- `https://iajltsthhcwddruflybv.supabase.co` → baza testowa

## 7. Dlaczego obie aplikacje nie psują sobie danych na jednym telefonie

Obie leżą na tej samej domenie, a przeglądarka dzieli `localStorage`, `IndexedDB`
i cache dla całej domeny. Dlatego aplikacja rozdziela wszystko znacznikiem
środowiska:

| | Wydanie oficjalne | Wydanie testowe |
|---|---|---|
| sesja | `kedai_pos_supabase_session` | `…_test` |
| dane lokalne (IndexedDB) | `KedaiPOS` | `KedaiPOS_test` |
| odciski wysyłki | `kedai_pos_synced_*` | `…_test` |
| nagrobki (usunięte) | `kedai_pos_deleted_*` | `…_test` |
| cache service workera | `kedai-pos-v*` | `kedai-pos-test-*` |

## 8. Lustro danych lokalu w środowisku testowym

Testowe urządzenie może wyglądać dokładnie tak, jak telefon lokalu: menu,
zakładki, magazyn (z kolorami) i receptury. Odpowiada za to
**`config/seed-test.js`** — plik generowany z danych oficjalnej bazy:

```
node tools/build-seed-test.mjs
```

Zasady działania:

- plik jest **wytworem** — nie edytuje się go ręcznie, po zmianach w lokalu
  wystarczy uruchomić generator ponownie,
- aplikacja wgrywa go **tylko** gdy `window.KedaiEnv.isTest` (wydanie lokalu
  nigdy nie wchodzi w tę gałąź) i tylko raz na odcisk treści (`version`),
- wgranie jest **lustrem**: pozycje spoza seeda dostają nagrobek i znikają
  z testowego urządzenia, a kolejność, zakładki i kolory są przepisane
  z pliku,
- do lustra dochodzą **sugerowane pozycje magazynu** (patrz `SUGGESTIONS`
  w `tools/build-seed-test.mjs`): przywrócone wpisy, których nadal używają
  receptury, oraz nowe pozycje wynikające z menu (np. daging ayam, mie tiaw,
  roti tawar). Nowe i przywrócone wpisy mają stan `0` — trzeba je policzyć
  w lokalu,
- testowe zamówienia zakupowe i sprzedaż **nie** są kopiowane — to lustro
  słowników, nie historii.

Oficjalna baza i telefon lokalu nie są przy tym w żaden sposób dotykane:
seed jest zapisywany wyłącznie lokalnie i wysyłany do projektu KTP-test.
