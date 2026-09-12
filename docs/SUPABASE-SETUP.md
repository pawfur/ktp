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

### „Brak dostępu — zaloguj się ponownie”

Sesja wygasła albo hasło konta zostało zmienione. Zaloguj się jeszcze raz w Ustawieniach.

## Jak to działa w aplikacji

- Wysyłka jest **jednokierunkowa**: telefon wysyła, Supabase tylko przyjmuje. Nic nie nadpisze ani nie usunie danych na telefonie — to ważne, bo aplikacja jest w codziennym użyciu w lokalu.
- Po każdej zmianie aplikacja czeka 2 sekundy i wysyła w tle. Zapis lokalny i interfejs zawsze mają pierwszeństwo.
- Bez internetu wysyłka jest **pomijana** — to nie jest nieudana próba. Po **trzech** nieudanych próbach aplikacja odpuszcza i czeka na następną zmianę, żeby nie marnować baterii.
- Gdy usuniesz zamówienie, składnik albo zamówienie zakupowe, odpowiedni wiersz znika też w chmurze.
- Brak logowania lub brak danych w `config/supabase-config.js` = **zero połączeń z siecią**, aplikacja działa wyłącznie lokalnie.
- Aplikacja wysyła dane przy każdej zmianie, więc działa też jako kopia zapasowa poza telefonem. Nie zastępuje jednak eksportu do pliku — to nadal najpewniejszy sposób przeniesienia danych.
