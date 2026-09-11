-- ============================================================================
-- Kedai POS – schemat tabel w Supabase
--
-- Uruchom CAŁY ten plik w panelu Supabase:
--   Project → SQL Editor → New query → wklej → Run
--
-- Plik można uruchamiać wielokrotnie. Nie usuwa żadnych danych.
-- ============================================================================

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
  primary key (device_id, local_id)
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
  primary key (device_id, local_id)
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
  primary key (device_id, local_id)
);

create index if not exists client_orders_created_at_idx on public.client_orders (created_at desc);

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
  primary key (device_id, local_id)
);

create index if not exists purchase_orders_created_at_idx on public.purchase_orders (created_at desc);

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
