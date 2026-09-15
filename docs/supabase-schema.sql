-- ============================================================================
-- Kedai POS – schemat tabel w Supabase
--
-- Uruchom CAŁY ten plik w panelu Supabase:
--   Project → SQL Editor → New query → wklej → Run
--
-- Plik można uruchamiać wielokrotnie. Nie usuwa żadnych danych.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- KLUCZE WIERSZY - najważniejsza decyzja w tym pliku
--
-- Klucz główny mówi bazie, kiedy dwa wiersze to TEN SAM wiersz. Od tego
-- zależy, czy powtórna wysyłka nadpisze dane, czy je zdubluje.
--
--   zamówienia   -> kluczem jest moment powstania (created_at)
--   menu, magazyn -> kluczem jest identyfikator pozycji (local_id)
--
-- Dzięki temu odtworzenie kopii zapasowej na innym telefonie nadpisuje te
-- same zamówienia, zamiast dopisywać drugą kopię. Gdyby kluczem był numer
-- nadawany przez telefon, po odtworzeniu danych liczyłby się od nowa
-- i w raportach sprzedaż wyszłaby podwójnie.
-- ---------------------------------------------------------------------------

-- ---------------------------------------------------------------------------
-- 1. Menu (pozycje i kategorie)
-- ---------------------------------------------------------------------------
create table if not exists public.menu_items (
  device_id   text        not null,
  local_id    text        not null,
  name        text        not null,
  price       numeric     not null default 0,
  type        text        not null default 'product',
  sort_order  integer     not null default 0,
  user_name   text        not null default '',
  updated_at  timestamptz not null default now(),
  primary key (local_id)
);

-- ---------------------------------------------------------------------------
-- 2. Składniki magazynu
-- ---------------------------------------------------------------------------
create table if not exists public.ingredients (
  device_id           text        not null,
  local_id            text        not null,
  name                text        not null,
  unit                text,
  stock               numeric     not null default 0,
  unit_price          numeric     not null default 0,
  min_stock           numeric     not null default 0,
  target_stock        numeric     not null default 0,
  min_order_quantity  numeric     not null default 0,
  unit_step           numeric     not null default 0,
  user_name           text        not null default '',
  updated_at          timestamptz not null default now(),
  primary key (local_id)
);

-- ---------------------------------------------------------------------------
-- 3. Zamówienia klientów (aktywne i archiwalne)
-- ---------------------------------------------------------------------------
create table if not exists public.client_orders (
  device_id   text        not null,
  local_id    bigint      not null,
  status      text        not null default 'active',
  created_at  timestamptz not null,
  total       numeric     not null default 0,
  items       jsonb       not null default '[]'::jsonb,
  user_name   text        not null default '',
  updated_at  timestamptz not null default now(),
  primary key (created_at)
);

-- ---------------------------------------------------------------------------
-- 4. Zamówienia zakupowe składników
-- ---------------------------------------------------------------------------
create table if not exists public.purchase_orders (
  device_id       text        not null,
  local_id        bigint      not null,
  status          text        not null default 'ordered',
  created_at      timestamptz not null,
  total_price     numeric     not null default 0,
  total_quantity  numeric     not null default 0,
  items           jsonb       not null default '[]'::jsonb,
  user_name       text        not null default '',
  updated_at      timestamptz not null default now(),
  primary key (created_at)
);

-- ---------------------------------------------------------------------------
-- 4b. Kolumna user_name w tabelach, które powstały wcześniej
--
-- "create table if not exists" nie dodaje kolumn do istniejącej tabeli,
-- dlatego te polecenia są potrzebne przy ponownym uruchomieniu pliku.
-- Wypełniają istniejące wiersze pustym tekstem.
-- ---------------------------------------------------------------------------
alter table public.menu_items      add column if not exists user_name text not null default '';
alter table public.ingredients     add column if not exists user_name text not null default '';
alter table public.client_orders   add column if not exists user_name text not null default '';
alter table public.purchase_orders add column if not exists user_name text not null default '';

-- ---------------------------------------------------------------------------
-- 4c. Zmiana kluczy w tabelach, które powstały wcześniej
--
-- „create table if not exists” nie zmienia klucza istniejącej tabeli, dlatego
-- te polecenia są potrzebne przy ponownym uruchomieniu pliku. Można je
-- uruchamiać wielokrotnie.
--
-- Jeżeli któreś polecenie zwróci błąd o zduplikowanym kluczu, znaczy to, że
-- w tabeli są już dwa zamówienia o identycznym czasie powstania. Wtedy napisz
-- o tym - nie usuwaj danych, jest na to sposób.
-- ---------------------------------------------------------------------------
alter table public.menu_items      drop constraint if exists menu_items_pkey;
alter table public.menu_items      add  constraint menu_items_pkey primary key (local_id);

alter table public.ingredients     drop constraint if exists ingredients_pkey;
alter table public.ingredients     add  constraint ingredients_pkey primary key (local_id);

alter table public.client_orders   drop constraint if exists client_orders_pkey;
alter table public.client_orders   add  constraint client_orders_pkey primary key (created_at);

alter table public.purchase_orders drop constraint if exists purchase_orders_pkey;
alter table public.purchase_orders add  constraint purchase_orders_pkey primary key (created_at);

-- Klucz główny zakłada własny indeks, więc osobny indeks na created_at
-- byłby tylko zbędnym obciążeniem przy zapisie.
drop index if exists public.client_orders_created_at_idx;
drop index if exists public.purchase_orders_created_at_idx;

-- ---------------------------------------------------------------------------
-- 4d. Miękkie usuwanie - w chmurze nic nie znika
--
-- Aplikacja nie wykonuje już żadnych zapytań DELETE. Gdy pozycja jest
-- usuwana w telefonie, wysyłany jest ten sam wiersz ze znacznikiem
-- `deleted` = true i datą `deleted_at`. Zamówienia dostają dodatkowo
-- `status` = 'deleted'.
--
-- Raporty powinny więc filtrować:  ... where not deleted
-- (a jeśli chcesz zobaczyć też usunięte: bez tego warunku).
-- ---------------------------------------------------------------------------
alter table public.menu_items      add column if not exists deleted boolean not null default false;
alter table public.ingredients     add column if not exists deleted boolean not null default false;
alter table public.client_orders   add column if not exists deleted boolean not null default false;
alter table public.purchase_orders add column if not exists deleted boolean not null default false;

alter table public.menu_items      add column if not exists deleted_at timestamptz;
alter table public.ingredients     add column if not exists deleted_at timestamptz;
alter table public.client_orders   add column if not exists deleted_at timestamptz;
alter table public.purchase_orders add column if not exists deleted_at timestamptz;

-- ---------------------------------------------------------------------------
-- 4e. Widoczność pozycji menu (ukrywanie bez utraty danych)
--
-- W aplikacji każdą pozycję menu i każdą zakładkę można czasowo wyłączyć
-- (Ustawienia → Edytuj menu → przełącznik przy pozycji). Wyłączona pozycja znika
-- z widoku obsługi klienta, ale zostaje w bazie, w edytorze menu i w kopii
-- zapasowej. Wyłączenie zakładki ukrywa wyłącznie jej nagłówek - pozycje pod nią
-- zostają widoczne, chyba że wyłączy się je osobno.
--
-- Dla raportów sprzedaży nic się nie zmienia: zamówienie zapisuje nazwę i cenę
-- z momentu sprzedaży, a wiersze menu są tylko bieżącym stanem cennika.
-- ---------------------------------------------------------------------------
alter table public.menu_items add column if not exists visible boolean not null default true;

-- ---------------------------------------------------------------------------
-- 4f. Kolor zakładki menu (barwa 0-360)
--
-- Zakładka (type = 'section') może mieć kolor wybrany suwakiem w aplikacji.
-- Podajemy samą barwę (HUE) w stopniach - jasność i nasycenie dobiera aplikacja,
-- żeby tła były pastelowe i czytelne. NULL = brak koloru (białe tło).
-- ---------------------------------------------------------------------------
alter table public.menu_items add column if not exists color integer;

alter table public.menu_items
  drop constraint if exists menu_items_color_range;

alter table public.menu_items
  add constraint menu_items_color_range check (color is null or (color >= 0 and color <= 360));

-- ---------------------------------------------------------------------------
-- 4g. Receptury pozycji menu
--
-- Receptura to lista składników i ilości zużywanych na JEDNĄ porcję dania,
-- np. [{"id":"ing_1","qty":0.25}]. Pusta lista = danie bez receptury.
--
-- Receptura nic sama nie odejmuje: zużycie schodzi ze stanu magazynu dopiero
-- wtedy, gdy zamówienie trafia do archiwum, i widac je potem w kolumnie
-- ingredients.stock (aplikacja przelicza to lokalnie i wysyła nowy stan).
-- ---------------------------------------------------------------------------
alter table public.menu_items add column if not exists recipe jsonb not null default '[]'::jsonb;

-- ---------------------------------------------------------------------------
-- 4h. Koszt zamówienia i zużycie magazynu (migawka z chwili archiwizacji)
--
-- Gdy zamówienie trafia do archiwum, aplikacja nalicza koszt z receptur
-- i zapisuje MIGAWKĘ: ile czego zeszło ze stanu i po jakiej cenie z tamtej
-- chwili. Bez migawki zmiana ceny składnika przepisywałaby historię.
--
-- cost_total - suma kosztu zamówienia. NULL = zamówienie zarchiwizowane przed
--              wprowadzeniem kosztów, nie da się go wiarygodnie odtworzyć.
-- stock_used - lista składników zdjętych ze stanu, np.
--              [{"id":"ing_ceker","name":"Ceker ayam","unit":"g",
--                "amount":60,"unit_price":28,"cost":1680}]
-- cost_at    - kiedy koszt został naliczony.
--
-- Uwaga: koszt obejmuje WYŁĄCZNIE to, co faktycznie zeszło ze stanu.
-- Jeśli receptura wskazuje składnik usunięty z magazynu, nie ma go ani
-- w koszcie, ani w zużyciu.
-- ---------------------------------------------------------------------------
alter table public.client_orders add column if not exists cost_total numeric;
alter table public.client_orders add column if not exists stock_used jsonb;
alter table public.client_orders add column if not exists cost_at timestamptz;

-- ---------------------------------------------------------------------------
-- 5. Zabezpieczenia (RLS)
--
-- Bez tego kroku klucz anon, który jest publicznie widoczny w aplikacji,
-- pozwoliłby każdemu czytać i kasować dane.
-- Dostęp mają wyłącznie zalogowani użytkownicy (jedno wspólne konto lokalu).
-- ---------------------------------------------------------------------------
alter table public.menu_items      enable row level security;
alter table public.ingredients     enable row level security;
alter table public.client_orders   enable row level security;
alter table public.purchase_orders enable row level security;

drop policy if exists kedai_authenticated_all on public.menu_items;
drop policy if exists kedai_authenticated_all on public.ingredients;
drop policy if exists kedai_authenticated_all on public.client_orders;
drop policy if exists kedai_authenticated_all on public.purchase_orders;

create policy kedai_authenticated_all on public.menu_items
  for all to authenticated using (true) with check (true);

create policy kedai_authenticated_all on public.ingredients
  for all to authenticated using (true) with check (true);

create policy kedai_authenticated_all on public.client_orders
  for all to authenticated using (true) with check (true);

create policy kedai_authenticated_all on public.purchase_orders
  for all to authenticated using (true) with check (true);

grant select, insert, update, delete
  on public.menu_items, public.ingredients, public.client_orders, public.purchase_orders
  to authenticated;

-- ---------------------------------------------------------------------------
-- 6. Kontrola – powinno zwrócić 4 wiersze
-- ---------------------------------------------------------------------------
select tablename, rowsecurity
from pg_tables
where schemaname = 'public'
  and tablename in ('menu_items', 'ingredients', 'client_orders', 'purchase_orders')
order by tablename;
