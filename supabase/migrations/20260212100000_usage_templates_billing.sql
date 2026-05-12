-- 用量、寫作模板、計費預留（profiles 擴充）
-- 於 Supabase SQL Editor 執行或 supabase db push

-- ---------------------------------------------------------------------------
-- profiles：方案與 Stripe 預留（無 Stripe 時欄位可為 null）
-- ---------------------------------------------------------------------------
alter table public.profiles add column if not exists plan text not null default 'free';
alter table public.profiles add column if not exists stripe_customer_id text;
alter table public.profiles add column if not exists subscription_status text;

-- ---------------------------------------------------------------------------
-- usage_logs：Edge / 前端可查詢自身用量（RLS）
-- ---------------------------------------------------------------------------
create table if not exists public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  action text not null,
  meta jsonb,
  prompt_tokens integer,
  completion_tokens integer,
  created_at timestamptz not null default now()
);

create index if not exists usage_logs_user_created_idx on public.usage_logs (user_id, created_at desc);

alter table public.usage_logs enable row level security;

create policy "usage_logs_select_own" on public.usage_logs for select using (auth.uid() = user_id);

create policy "usage_logs_insert_own" on public.usage_logs for insert with check (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- writing_templates：使用者模板（TemplateManager 持久化）
-- ---------------------------------------------------------------------------
create table if not exists public.writing_templates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  description text,
  prompt_body text not null default '',
  settings jsonb,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists writing_templates_user_idx on public.writing_templates (user_id, created_at desc);

alter table public.writing_templates enable row level security;

create policy "writing_templates_select_own" on public.writing_templates for select using (auth.uid() = user_id);

create policy "writing_templates_insert_own" on public.writing_templates for insert with check (auth.uid() = user_id);

create policy "writing_templates_update_own" on public.writing_templates for update using (auth.uid() = user_id);

create policy "writing_templates_delete_own" on public.writing_templates for delete using (auth.uid() = user_id);

create or replace function public.set_writing_templates_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists writing_templates_set_updated_at on public.writing_templates;

create trigger writing_templates_set_updated_at
  before update on public.writing_templates
  for each row execute procedure public.set_writing_templates_updated_at();
