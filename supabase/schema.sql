create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  role text not null default 'member' check (role in ('admin', 'member')),
  points integer not null default 0 check (points >= 0),
  tier text not null default 'bronze' check (tier in ('bronze', 'silver', 'gold', 'platinum')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete set null,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  age integer,
  gender text check (gender in ('male', 'female')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  code text not null unique,
  category text,
  brand text,
  price numeric(12,2) not null default 0 check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  user_id uuid references public.profiles(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  status text not null default 'pending' check (status in ('pending', 'completed', 'cancelled')),
  subtotal numeric(12,2) not null default 0 check (subtotal >= 0),
  discount_percent integer not null default 0 check (discount_percent in (0, 5, 10, 15, 20)),
  discount_amount numeric(12,2) not null default 0 check (discount_amount >= 0),
  total_price numeric(12,2) not null default 0 check (total_price >= 0),
  points_earned integer not null default 0 check (points_earned >= 0),
  order_date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_title text not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price numeric(12,2) not null default 0 check (unit_price >= 0),
  line_total numeric(12,2) not null default 0 check (line_total >= 0),
  created_at timestamptz not null default now()
);

create table if not exists public.member_points_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  order_id uuid references public.orders(id) on delete set null,
  points integer not null,
  note text,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.get_member_tier(total_points integer)
returns text
language sql
stable
as $$
  select case
    when total_points >= 1000 then 'platinum'
    when total_points >= 500 then 'gold'
    when total_points >= 200 then 'silver'
    else 'bronze'
  end;
$$;

create or replace function public.get_tier_discount(member_tier text)
returns integer
language sql
stable
as $$
  select case member_tier
    when 'platinum' then 20
    when 'gold' then 15
    when 'silver' then 10
    else 5
  end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    'member'
  );

  insert into public.customers (user_id, first_name, last_name, email)
  values (
    new.id,
    coalesce(split_part(new.raw_user_meta_data->>'full_name', ' ', 1), 'Member'),
    coalesce(nullif(trim(replace(new.raw_user_meta_data->>'full_name', split_part(new.raw_user_meta_data->>'full_name', ' ', 1), '')), ''), 'User'),
    new.email
  );

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists profiles_updated_at on public.profiles;
create trigger profiles_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists customers_updated_at on public.customers;
create trigger customers_updated_at before update on public.customers
for each row execute function public.set_updated_at();

drop trigger if exists products_updated_at on public.products;
create trigger products_updated_at before update on public.products
for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.member_points_logs enable row level security;

drop policy if exists "profiles select own or admin" on public.profiles;
create policy "profiles select own or admin" on public.profiles
for select to authenticated
using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles update own basic or admin" on public.profiles;
create policy "profiles update own basic or admin" on public.profiles
for update to authenticated
using (id = auth.uid() or public.is_admin())
with check (
  public.is_admin()
  or (id = auth.uid() and role = (select role from public.profiles where id = auth.uid()))
);

drop policy if exists "customers select own or admin" on public.customers;
create policy "customers select own or admin" on public.customers
for select to authenticated
using (public.is_admin() or user_id = auth.uid());

drop policy if exists "customers insert admin" on public.customers;
create policy "customers insert admin" on public.customers
for insert to authenticated
with check (public.is_admin());

drop policy if exists "customers update own or admin" on public.customers;
create policy "customers update own or admin" on public.customers
for update to authenticated
using (public.is_admin() or user_id = auth.uid())
with check (public.is_admin() or user_id = auth.uid());

drop policy if exists "customers delete admin" on public.customers;
create policy "customers delete admin" on public.customers
for delete to authenticated
using (public.is_admin());

drop policy if exists "products select authenticated" on public.products;
create policy "products select authenticated" on public.products
for select to authenticated
using (is_active = true or public.is_admin());

drop policy if exists "products insert admin" on public.products;
create policy "products insert admin" on public.products
for insert to authenticated
with check (public.is_admin());

drop policy if exists "products update admin" on public.products;
create policy "products update admin" on public.products
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "products delete admin" on public.products;
create policy "products delete admin" on public.products
for delete to authenticated
using (public.is_admin());

drop policy if exists "orders select own or admin" on public.orders;
create policy "orders select own or admin" on public.orders
for select to authenticated
using (public.is_admin() or user_id = auth.uid());

drop policy if exists "orders insert own or admin" on public.orders;
create policy "orders insert own or admin" on public.orders
for insert to authenticated
with check (public.is_admin() or user_id = auth.uid());

drop policy if exists "orders update own pending or admin" on public.orders;
create policy "orders update own pending or admin" on public.orders
for update to authenticated
using (public.is_admin() or (user_id = auth.uid() and status = 'pending'))
with check (public.is_admin() or user_id = auth.uid());

drop policy if exists "orders delete admin" on public.orders;
create policy "orders delete admin" on public.orders
for delete to authenticated
using (public.is_admin());

drop policy if exists "order_items select own order or admin" on public.order_items;
create policy "order_items select own order or admin" on public.order_items
for select to authenticated
using (
  public.is_admin()
  or exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "order_items insert own order or admin" on public.order_items;
create policy "order_items insert own order or admin" on public.order_items
for insert to authenticated
with check (
  public.is_admin()
  or exists (
    select 1 from public.orders
    where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
  )
);

drop policy if exists "order_items update admin" on public.order_items;
create policy "order_items update admin" on public.order_items
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "order_items delete admin" on public.order_items;
create policy "order_items delete admin" on public.order_items
for delete to authenticated
using (public.is_admin());

drop policy if exists "points logs select own or admin" on public.member_points_logs;
create policy "points logs select own or admin" on public.member_points_logs
for select to authenticated
using (public.is_admin() or user_id = auth.uid());

drop policy if exists "points logs insert admin" on public.member_points_logs;
create policy "points logs insert admin" on public.member_points_logs
for insert to authenticated
with check (public.is_admin());

drop policy if exists "points logs update admin" on public.member_points_logs;
create policy "points logs update admin" on public.member_points_logs
for update to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "points logs delete admin" on public.member_points_logs;
create policy "points logs delete admin" on public.member_points_logs
for delete to authenticated
using (public.is_admin());
