-- ARIAN Health — Schema inicial
-- Aplicar uma única vez no SQL Editor do Supabase (projeto novo).
-- Idempotente: pode ser re-executado em ambiente limpo.

-- =============================================================
-- Extensões necessárias
-- =============================================================
create extension if not exists "pgcrypto";

-- =============================================================
-- Tabela: profiles (1:1 com auth.users)
-- =============================================================
create table if not exists public.profiles (
  id            uuid primary key references auth.users on delete cascade,
  display_name  text,
  conditions    text[] not null default '{}',
  avatar_url    text,
  accessibility jsonb not null default '{"highContrast":false,"largerText":false,"simplifiedUI":false}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

-- =============================================================
-- Tabela: check_ins (um por dia por usuário)
-- =============================================================
create table if not exists public.check_ins (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users on delete cascade,
  date        date not null,
  joints      int,
  energy      int,
  heart_rate  int,
  sensitivity int,
  symptoms    text[] not null default '{}',
  mood        text,
  notes       text,
  created_at  timestamptz not null default now(),
  unique (user_id, date)
);

create index if not exists check_ins_user_date_idx
  on public.check_ins (user_id, date desc);

alter table public.check_ins enable row level security;

drop policy if exists "check_ins_select_own" on public.check_ins;
create policy "check_ins_select_own" on public.check_ins
  for select using (auth.uid() = user_id);

drop policy if exists "check_ins_insert_own" on public.check_ins;
create policy "check_ins_insert_own" on public.check_ins
  for insert with check (auth.uid() = user_id);

drop policy if exists "check_ins_update_own" on public.check_ins;
create policy "check_ins_update_own" on public.check_ins
  for update using (auth.uid() = user_id);

drop policy if exists "check_ins_delete_own" on public.check_ins;
create policy "check_ins_delete_own" on public.check_ins
  for delete using (auth.uid() = user_id);

-- =============================================================
-- Tabela: medications (lista por usuário)
-- =============================================================
create table if not exists public.medications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users on delete cascade,
  name       text not null,
  dosage     text,
  schedule   text,
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists medications_user_idx
  on public.medications (user_id, created_at desc);

alter table public.medications enable row level security;

drop policy if exists "medications_select_own" on public.medications;
create policy "medications_select_own" on public.medications
  for select using (auth.uid() = user_id);

drop policy if exists "medications_insert_own" on public.medications;
create policy "medications_insert_own" on public.medications
  for insert with check (auth.uid() = user_id);

drop policy if exists "medications_update_own" on public.medications;
create policy "medications_update_own" on public.medications
  for update using (auth.uid() = user_id);

drop policy if exists "medications_delete_own" on public.medications;
create policy "medications_delete_own" on public.medications
  for delete using (auth.uid() = user_id);

-- =============================================================
-- Tabela: medication_logs (tomadas)
-- =============================================================
create table if not exists public.medication_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users on delete cascade,
  medication_id uuid not null references public.medications on delete cascade,
  taken_at      timestamptz not null default now()
);

create index if not exists medication_logs_user_taken_idx
  on public.medication_logs (user_id, taken_at desc);

alter table public.medication_logs enable row level security;

drop policy if exists "medication_logs_select_own" on public.medication_logs;
create policy "medication_logs_select_own" on public.medication_logs
  for select using (auth.uid() = user_id);

drop policy if exists "medication_logs_insert_own" on public.medication_logs;
create policy "medication_logs_insert_own" on public.medication_logs
  for insert with check (auth.uid() = user_id);

drop policy if exists "medication_logs_delete_own" on public.medication_logs;
create policy "medication_logs_delete_own" on public.medication_logs
  for delete using (auth.uid() = user_id);

-- =============================================================
-- Trigger: cria profile automaticamente após signup
-- =============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'display_name', ''));
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
