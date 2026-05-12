/** 與 Supabase `public.articles` 對齊；遷移檔見 supabase/migrations/ */
export type ArticleStatus = 'draft' | 'published' | 'archived';

export type ArticleRow = {
  id: string;
  user_id: string;
  title: string;
  /** 可選欄位：見 migration `20260213130000_article_optional_slug` */
  slug?: string | null;
  status: ArticleStatus;
  primary_keyword: string | null;
  seo_title: string | null;
  meta_description: string | null;
  body: string;
  paragraphs: unknown[] | null;
  keyword_analysis: unknown | null;
  outline_h2s: unknown | null;
  generation_settings: unknown | null;
  seo_score_snapshot: unknown | null;
  word_count: number;
  views: number;
  created_at: string;
  updated_at: string;
};

export type ArticleInsert = {
  title?: string;
  slug?: string | null;
  status?: ArticleStatus;
  primary_keyword?: string | null;
  seo_title?: string | null;
  meta_description?: string | null;
  body?: string;
  paragraphs?: unknown[] | null;
  keyword_analysis?: unknown | null;
  outline_h2s?: unknown | null;
  generation_settings?: unknown | null;
  seo_score_snapshot?: unknown | null;
  word_count?: number;
  views?: number;
};

export type ArticleUpdate = Partial<ArticleInsert>;
