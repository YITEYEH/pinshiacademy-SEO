-- 選填：文章 slug（之後發布／前台 URL 用）；可為 null
alter table public.articles add column if not exists slug text;

create unique index if not exists articles_user_slug_unique
  on public.articles (user_id, lower(slug))
  where slug is not null and length(trim(slug)) > 0;
