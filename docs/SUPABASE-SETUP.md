# Połączenie z Supabase — co zrobić

Cel: aplikacja na telefonie **wysyła** dane do Supabase (jednokierunkowo), a Ty czytasz je z komputera — w panelu Supabase albo własnymi zapytaniami SQL. Dane lokalne na telefonie pozostają najważniejsze i działają bez internetu.

Połączenie Supabase z GitHubem (w panelu Supabase) **nie jest do tego potrzebne** — służy do wdrażania funkcji Edge i branchy z repozytorium. Aplikacja nie dostaje przez nie dostępu do danych.

## Co jest potrzebne

| # | Co | Kto to robi |
|---|---|---|
| 1 | Adres projektu i klucz `anon public` w `config/supabase-config.js` | Ty |
| 2 | Uruchomienie `docs/supabase-schema.sql` w SQL Editor | Ty |
| 3 | Utworzenie konta lokalu w Authentication | Ty |
| 4 | Kod wysyłający dane (`modules/sync.js`) | ja |

Trzy pierwsze kroki zajmują kilka minut.

## Krok 1 — dane połączenia

Panel Supabase → Twój projekt → **Settings (⚙) → API**. Skopiuj do `config/supabase-config.js`:

- **Project URL** → pole `url` (np. `https://abcdefgh.supabase.co`),
- **anon public** → pole `anonKey` (długi ciąg od `eyJ...`).

⚠️ Klucz `anon public` jest z założenia publiczny — i tak trafia do przeglądarki. **Nigdy** nie wklejaj tam klucza `service_role` ani `secret`; one omijają reguły RLS, więc każdy, kto odczytałby go z aplikacji, miałby pełny dostęp do bazy.

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

Każdy wiersz ma kolumnę `device_id`. Chroni ona przed nadpisaniem starych zamówień po skasowaniu danych w telefonie: identyfikatory zamówień liczą się od nowa, a bez `device_id` nowe zamówienie numer 1 nadpisałoby dawne zamówienie numer 1.

## Krok 3 — konto lokalu

Panel Supabase → **Authentication → Users → Add user → Create new user**:

- e-mail, np. `kedai@twojadomena.pl`,
- hasło,
- włącz **Auto Confirm User** (bez tego logowanie poczeka na maila potwierdzającego).

Te dane wpiszesz raz w aplikacji w Ustawieniach. Jedno wspólne konto dla całego lokalu.

## Krok 4 — raporty z komputera

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

Najczęściej sprzedawane pozycje:

```sql
select
  item->>'name'                  as produkt,
  sum((item->>'qty')::numeric)   as sztuk,
  sum((item->>'lineTotal')::numeric) as sprzedaz
from public.client_orders,
     jsonb_array_elements(items) as item
group by 1
order by 3 desc;
```

Zamówienia z ostatnich 7 dni:

```sql
select created_at, total, status, items
from public.client_orders
where created_at > now() - interval '7 days'
order by created_at desc;
```

## Jak to będzie działać w aplikacji

- Wysyłka jest **jednokierunkowa**: telefon wysyła, Supabase tylko przyjmuje. Nic nie nadpisze danych na telefonie — to ważne, bo aplikacja jest w codziennym użyciu w lokalu.
- Wysyłka startuje w tle po zmianie danych i **nie blokuje** zapisu lokalnego ani interfejsu.
- Gdy nie ma internetu: wysyłka jest pomijana i ponawiana przy kolejnej zmianie. Po **trzech** nieudanych próbach aplikacja odpuszcza, żeby nie marnować baterii i danych, i czeka na następną zmianę.
- Brak logowania lub brak danych w `config/supabase-config.js` = synchronizacja wyłączona, aplikacja działa jak dotychczas.
