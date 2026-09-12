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
