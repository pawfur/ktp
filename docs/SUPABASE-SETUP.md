# Połączenie z Supabase — co zrobić

Cel: aplikacja na telefonie **wysyła** dane do Supabase (jednokierunkowo), a Ty czytasz je z komputera — w panelu Supabase albo własnymi zapytaniami SQL. Dane lokalne na telefonie pozostają najważniejsze i działają bez internetu.

Połączenie Supabase z GitHubem (w panelu Supabase) **nie jest do tego potrzebne** — służy do wdrażania funkcji Edge i branchy z repozytorium. Aplikacja nie dostaje przez nie dostępu do danych.

## Co jest potrzebne

| # | Co | Kto to robi | Stan |
|---|---|---|---|
| 1 | Adres projektu i klucz w `config/supabase-config.js` | Ty | zrobione |
| 2 | Uruchomienie `docs/supabase-schema.sql` w SQL Editor | Ty | **do zrobienia** |
| 3 | Utworzenie konta lokalu w Authentication | Ty | **do zrobienia** |
| 4 | Kod wysyłający dane (`modules/sync.js`) | ja | zrobione |
| 5 | Karta „Chmura” w Ustawieniach | ja | zrobione |

Zostały dwa kroki.

## Krok 1 — dane połączenia (zrobione)

Panel Supabase → Twój projekt → **Settings (⚙) → API**. Skopiuj do `config/supabase-config.js`:

- **Project URL** → pole `url`,
- **klucz publiczny** (`anon public` albo `sb_publishable_...`) → pole `anonKey`.

⚠️ Ten klucz jest z założenia publiczny — i tak trafia do przeglądarki. **Nigdy** nie wklejaj tam klucza `service_role` ani `secret`; one omijają reguły RLS, więc każdy, kto odczytałby go z aplikacji, miałby pełny dostęp do bazy.

## Krok 2 — tabele

Panel Supabase → **SQL Editor → New query** → wklej całą zawartość `docs/supabase-schema.sql` → **Run**.

Plik można i **trzeba** uruchamiać ponownie po każdej zmianie schematu — jest napisany tak, żeby nie usuwać danych. Sekcja „4c” zmienia klucze tabel, również tych, które już istnieją.

Tworzy cztery tabele i włącza reguły RLS:

| Tabela | Zawartość |
|---|---|
| `menu_items` | menu: pozycje i kategorie |
| `ingredients` | składniki magazynu wraz ze stanem |
| `client_orders` | zamówienia klientów (aktywne i archiwalne) |
| `purchase_orders` | zamówienia zakupowe składników |

Na końcu zapytanie kontrolne powinno zwrócić **4 wiersze**, każdy z `rowsecurity = true`. Jeżeli RLS byłoby wyłączone, klucz `anon` dawałby każdemu dostęp do danych.

Każdy wiersz ma dwie kolumny opisujące pochodzenie danych:

- `device_id` — techniczny identyfikator telefonu. Chroni przed nadpisaniem starych zamówień po skasowaniu danych w telefonie: identyfikatory zamówień liczą się wtedy od nowa, a bez `device_id` nowe zamówienie numer 1 nadpisałoby dawne zamówienie numer 1.
- `user_name` — **nazwa użytkownika z Ustawień**. Nadaje jej człowiek i ona właśnie trafia do raportów, np. `Kedai Seblak` albo imię osoby na zmianie.

## Krok 3 — konto lokalu

### Najpierw: GitHub to nie jest login aplikacji

Połączenie z GitHubem dotyczy **właściciela projektu**, a nie osób, które korzystają z aplikacji w lokalu:

| Co | Do czego służy |
|---|---|
| `Continue with GitHub` przy zakładaniu konta Supabase | Tak **Ty** logujesz się do panelu Supabase. Aplikacja nie używa tego konta. |
| Integracja GitHub w ustawieniach projektu | Wdrażanie funkcji Edge i branchy z repozytorium. Też nie dotyczy logowania w aplikacji. |
| GitHub Pages (`pawfur/ktp`) | Hosting samej aplikacji. Nie dotyczy logowania. |
| **Authentication → Users** | **To** jest login aplikacji. Zupełnie osobny mechanizm. |

Gdyby ktoś musiał tłumaczyć to jednym zdaniem: GitHub daje Ci dostęp do **panelu**, a użytkownik w `Authentication` daje dostęp do **danych**.

W aplikacji polega się na zwykłym koncie **e-mail + hasło** utworzonym wewnątrz projektu. Nie musisz mieć hasła do Supabase, nie używasz tu swojego konta GitHub i nie musisz zakładać żadnego nowego konta w internecie.

### Utworzenie konta

Panel Supabase → **Authentication → Users → Add user → Create new user**:

- **e-mail** — najlepiej taki, do którego masz dostęp (np. Twój zwykły adres). Nie musi być związany z GitHubem i nie musi być firmowy. Ważne jest tylko to, żebyś mógł na niego zajrzeć, gdybyś kiedyś zapomniał hasła.
- **hasło** — wymyślone przez Ciebie, dowolne. To ono będzie wpisywane w aplikacji w Ustawieniach.
- włącz **Auto Confirm User** — bez tego logowanie poczeka na maila potwierdzającego, którego możesz nie dostać.

Po utworzeniu konto pojawi się na liście **Authentication → Users**. Te dane (e-mail i hasło) wpiszesz raz w aplikacji — w krokach niżej.

Nie musisz podawać mi tego hasła ani nigdzie go zapisywać w plikach. Podajesz je wyłącznie w aplikacji na telefonie.

## Krok 4 — nazwa użytkownika w aplikacji

Aplikacja → **Ustawienia → Chmura (Supabase)**:

1. Wpisz **Nazwę użytkownika**, np. `Kedai Seblak`. Zatwierdzenie (klawisz Enter albo wyjście z pola) zapisuje nazwę w telefonie.
2. Wpisz **e-mail i hasło** konta z kroku 3 i kliknij **Zaloguj do chmury**. Logujesz się **raz** — aplikacja pamięta sesję i sama odnawia token.
3. Kliknij **Wyślij teraz**, żeby wysłać wszystko od razu.

Od tego momentu każda zmiana w aplikacji jest wysyłana w tle i każdy wiersz jest podpisany tą nazwą. Zmiana nazwy powoduje, że przy najbliższej wysyłce wszystkie wiersze dostaną nową nazwę.

Jeżeli czegoś brakuje — tabel, kolumny, sesji — aplikacja napisze o tym pod przyciskiem i w Ustawieniach, zamiast milczeć.

## Krok 5 — raporty z komputera

Po kilku dniach działania w SQL Editor zadziałają gotowe zapytania.

Sprzedaż dzień po dniu:

```sql
select
  date_trunc('day', created_at)::date as dzien,
  count(*)                            as liczba_zamowien,
  sum(total)                          as sprzedaz
from public.client_orders
where status = 'active'
group by 1
order by 1 desc;
```

Sprzedaż według użytkownika (telefonu):

```sql
select
  user_name,
  date_trunc('day', created_at)::date as dzien,
  count(*)                            as liczba_zamowien,
  sum(total)                          as sprzedaz
from public.client_orders
where status = 'active'
group by 1, 2
order by 2 desc, 4 desc;
```

Najczęściej sprzedawane pozycje:

```sql
select
  item->>'name'                      as produkt,
  sum((item->>'qty')::numeric)       as sztuk,
  sum((item->>'lineTotal')::numeric) as sprzedaz
from public.client_orders,
     jsonb_array_elements(items) as item
group by 1
order by 3 desc;
```

Zamówienia z ostatnich 7 dni:

```sql
select created_at, user_name, total, status, items
from public.client_orders
where created_at > now() - interval '7 days'
order by created_at desc;
```

## Gdzie oglądać dane

### Table Editor — najprościej, bez pisania zapytań

Supabase → **Table Editor** → wybierz tabelę z listy po lewej. Widzisz wiersze jak w arkuszu kalkulacyjnym:

| Tabela | Co pokazuje |
|---|---|
| `client_orders` | zamówienia klientów — od tego zacznij |
| `purchase_orders` | zamówienia zakupowe składników |
| `menu_items` | menu wraz z kategoriami |
| `ingredients` | magazyn wraz z aktualnym stanem |

Kolumna `user_name` mówi, z którego telefonu przyszły dane, a `device_id` odróżnia telefony od siebie.

W Table Editor możesz sortować po nagłówku kolumny, filtrować wiersze, a przyciskiem pobierania zapisać widok do pliku **CSV**, który otworzysz w Excelu lub Arkuszach Google.

Panel Supabase pokazuje wszystkie wiersze, bo działa z pominięciem reguł RLS. Dlatego widzisz w nim dane, których nie widzi klucz publiczny używany przez aplikację — i tak ma być.

### SQL Editor — do raportów i podsumowań

**SQL Editor → New query**, wklej zapytanie i kliknij **Run**. Przycisk **Save** zapisuje zapytanie na liście, żeby nie wklejać go ponownie.

Dwa dodatkowe zapytania na start:

```sql
-- Zamówienia z dzisiaj
select created_at, user_name, total
from public.client_orders
where created_at::date = current_date
order by created_at desc;
```

```sql
-- Stan magazynu, braki na początku
select name, stock, unit, min_stock, target_stock
from public.ingredients
order by (stock <= min_stock) desc, name;
```

### Lista zamówień — jak w aplikacji

Dwa gotowe sposoby. Pierwszy jest wygodniejszy do Excela, drugi wygląda jak karty w aplikacji.

**Wszystkie pozycje, jedna pod drugą:**

```sql
select
  co.local_id                                                            as nr,
  to_char(co.created_at at time zone 'Asia/Jakarta', 'DD.MM.YYYY HH24:MI') as data,
  co.user_name                                                           as uzytkownik,
  co.status                                                              as status,
  item->>'name'                                                          as pozycja,
  (item->>'qty')::numeric                                                as sztuk,
  'Rp ' || to_char((item->>'lineTotal')::numeric, 'FM999G999G999')        as wartosc
from public.client_orders co,
     jsonb_array_elements(co.items) as item
order by co.created_at desc, item->>'name';
```

**Jedno zamówienie w jednym wierszu — najbliżej widoku z aplikacji:**

```sql
select
  co.local_id                                                            as nr,
  to_char(co.created_at at time zone 'Asia/Jakarta', 'DD.MM.YYYY HH24:MI') as data,
  co.user_name                                                           as uzytkownik,
  co.status                                                              as status,
  (
    select string_agg(
             (item->>'qty') || '× ' || (item->>'name') || ' — Rp ' ||
             to_char((item->>'lineTotal')::numeric, 'FM999G999G999'),
             E'\n' order by t.ordinality
           )
    from jsonb_array_elements(co.items) with ordinality as t(item, ordinality)
  )                                                                      as pozycje,
  'Rp ' || to_char(co.total, 'FM999G999G999')                            as razem
from public.client_orders co
order by co.created_at desc;
```

Godziny są przeliczane na strefę **Asia/Jakarta**, żeby zgadzały się z zegarem w lokalu — baza przechowuje czas w UTC.

Żeby zawęzić do jednego dnia, dopisz przed `order by`:

```sql
where (co.created_at at time zone 'Asia/Jakarta')::date
      = (now() at time zone 'Asia/Jakarta')::date
```

### Kiedy dane są puste

Gdy `client_orders` jest pusta, dane jeszcze nie dotarły. W aplikacji na telefonie: **Ustawienia → Chmura (Supabase) → Wyślij teraz**. Komunikat pod przyciskiem powie, czy wysyłka się udała.

## Najczęstsze problemy

Aplikacja pokazuje dokładny powód pod przyciskiem logowania (na czerwono) i w krótkim komunikacie na dole ekranu.

### „Konto w Supabase nie zostało potwierdzone”

Najczęstsza przyczyna. Konto istnieje, ale e-mail nie jest potwierdzony, więc Supabase odmawia logowania.

Dzieje się tak, gdy przy dodawaniu użytkownika **nie było zaznaczone „Auto Confirm User”**, albo gdy użytkownik został dodany przez zaproszenie i nigdy nie kliknął linku z maila. Domyślny e-mail Supabase często nie dociera, więc zaproszenie przepada.

Dwa sposoby naprawy — wystarczy jeden:

1. **W panelu** (zalecane): Supabase → **Authentication → Users** → otwórz użytkownika i potwierdź jego e-mail. Jeżeli panel nie daje takiej opcji, usuń użytkownika i dodaj go ponownie, tym razem zaznaczając **Auto Confirm User**.
2. **Zapytaniem SQL**, w SQL Editor:

   ```sql
   update auth.users
   set email_confirmed_at = now()
   where email = 'twoj.adres@gmail.com';
   ```

   Podmień adres na e-mail konta. Zapytanie zmienia tylko znacznik potwierdzenia — hasła i uprawnień nie rusza.

### „Błędny e-mail lub hasło”

- Sprawdź, czy konto powstało **w tym samym projekcie**, którego adres jest w `config/supabase-config.js`. Drugi projekt Supabase ma osobne konta i osobne dane.
- Jeżeli konto dodawałeś przez **Authentication → Users → Add user**, to nie jest konto Supabase z ekranu logowania do panelu — to zwykły użytkownik i jego hasło jest tym, które wpisałeś w formularzu.
- Login do aplikacji **nie** używa konta GitHub ani e-maila z GitHuba.

### „Brak tabel w Supabase”

Znaczy, że `docs/supabase-schema.sql` nie został jeszcze uruchomiony w SQL Editor. Logowanie może wtedy działać, ale wysyłka danych nie.

### „Brakuje kolumny w tabeli”

Uruchomiłeś starszą wersję schematu i brakuje kolumny `user_name`. Uruchom `docs/supabase-schema.sql` jeszcze raz — plik jest napisany tak, żeby można go było bezpiecznie powtarzać.

### „W raportach sprzedaż jest podwójna”

Dwa zamówienia o tej samej treści, ale innym `device_id`. Powstaje tak, gdy dane zostaną odtworzone z kopii na nowym telefonie, a kluczem tabeli jest numer nadawany przez urządzenie.

Naprawa: uruchom `docs/supabase-schema.sql` jeszcze raz — sekcja „4c” przestawia klucz zamówień na `created_at`. Po tej zmianie duplikaty trzeba usunąć ręcznie:

```sql
-- Pokaż duplikaty (po dacie powstania)
select created_at, count(*)
from public.client_orders
group by created_at
having count(*) > 1;

-- Zostaw jeden wiersz na datę
-- Najpierw sprawdź wynik, dopiero potem usuwaj.
```

### „Brak dostępu — zaloguj się ponownie”

Sesja wygasła albo hasło konta zostało zmienione. Zaloguj się jeszcze raz w Ustawieniach.

## Jak to działa w aplikacji

- Wysyłka jest **jednokierunkowa**: telefon wysyła, Supabase tylko przyjmuje. Nic nie nadpisze ani nie usunie danych na telefonie — to ważne, bo aplikacja jest w codziennym użyciu w lokalu.
- **Wysyłane są tylko zmienione wiersze.** Każdy wiersz ma w telefonie zapisany „odcisk” ostatniej wysłanej wersji, więc powtórna wysyłka bez zmian **nie wykonuje żadnego zapytania do sieci**. Wysłanie zmienionej ceny w menu to jedno żądanie zamiast wysyłania całego menu.
- **Po zalogowaniu aplikacja wysyła wszystko od razu**, bez czekania na kolejną zmianę. Dlatego nie trzeba pamiętać o przycisku „Wyślij teraz”.
- Pod przyciskiem widać potwierdzenie z chmury: **„W chmurze: menu 12, składniki 6, zamówienia 3, zakupy 1”**. To liczba wierszy faktycznie widocznych w Supabase, a nie to, ile aplikacja próbowała wysłać. Odpowiedź ma stały rozmiar — liczba siedzi w nagłówku, więc tysiąc zamówień jej nie powiększa.
- Po każdej zmianie aplikacja czeka 2 sekundy i wysyła w tle. Zapis lokalny i interfejs zawsze mają pierwszeństwo.
- Puste tabele są pomijane — jeśli nie ma jeszcze żadnych zamówień, aplikacja nie wysyła pustego zapytania.
- Bez internetu wysyłka jest **pomijana** — to nie jest nieudana próba. Po **trzech** nieudanych próbach aplikacja odpuszcza i czeka na następną zmianę, żeby nie marnować baterii.
- Gdy usuniesz zamówienie, składnik albo zamówienie zakupowe, odpowiedni wiersz znika też w chmurze.
- Brak logowania lub brak danych w `config/supabase-config.js` = **zero połączeń z siecią**, aplikacja działa wyłącznie lokalnie.

### Dlaczego powtórna wysyłka nie tworzy duplikatów

O tym, czy dwa wiersze to ten sam wiersz, decyduje **klucz główny** tabeli, ustawiony w `docs/supabase-schema.sql`:

| Tabela | Klucz | Dlaczego tak |
|---|---|---|
| `client_orders`, `purchase_orders` | `created_at` | Zamówienie ma własną tożsamość: moment powstania. Data jedzie w kopii zapasowej, więc odtworzenie danych na innym telefonie **nadpisze** to samo zamówienie, zamiast dopisać drugą kopię. |
| `menu_items`, `ingredients` | `local_id` | To stan, a nie zdarzenie — jeden wiersz na pozycję menu i na składnik. |

Gdyby kluczem był numer nadawany przez telefon, po skasowaniu danych i odtworzeniu z kopii numeracja ruszyłaby od nowa i **sprzedaż w raportach wyszłaby podwójnie**. Właśnie dlatego kluczem jest data.

`device_id` i `user_name` zostały jako zwykłe kolumny opisowe — do raportów „z którego telefonu”.

### Czego wysyłka nie robi

Nie kasuje historii poza jawnym usunięciem w aplikacji (wtedy leci `DELETE`). Nie przechowuje też historii zmian: stan magazynu jest nadpisywany, więc nie zobaczysz, ile bułek było wczoraj. Zamówienia są bezpieczne, bo po utworzeniu się nie zmieniają.
