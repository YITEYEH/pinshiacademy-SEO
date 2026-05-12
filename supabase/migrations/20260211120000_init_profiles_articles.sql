-- 於 Supabase Dashboard → SQL Editor 執行，或使用 CLI：supabase db push
-- 啟用 RLS：僅 service_role 可繞過；前端永遠只用 anon + 使用者 JWT。

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- profiles：與 auth.users 一對一（新使用者由 trigger 建立）
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- articles：使用者文章（RLS 強制僅本人）
-- ---------------------------------------------------------------------------
create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null default '未命名草稿',
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  primary_keyword text,
  seo_title text,
  meta_description text,
  body text not null default '',
  paragraphs jsonb,
  keyword_analysis jsonb,
  outline_h2s jsonb,
  generation_settings jsonb,
  seo_score_snapshot jsonb,
  word_count integer not null default 0,
  views integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_user_updated_idx on public.articles (user_id, updated_at desc);
create index if not exists articles_user_status_idx on public.articles (user_id, status);

alter table public.articles enable row level security;

create policy "articles_select_own" on public.articles for select using (auth.uid() = user_id);

create policy "articles_insert_own" on public.articles for insert with check (auth.uid() = user_id);

create policy "articles_update_own" on public.articles for update using (auth.uid() = user_id);

create policy "articles_delete_own" on public.articles for delete using (auth.uid() = user_id);

create or replace function public.set_articles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;

create trigger articles_set_updated_at
  before update on public.articles
  for each row execute procedure public.set_articles_updated_at();
