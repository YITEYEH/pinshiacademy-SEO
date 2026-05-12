import { getSupabase } from '@/lib/supabase';
import type { ArticleInsert, ArticleRow, ArticleUpdate } from '@/lib/database.types';

function requireClient() {
  const sb = getSupabase();
  if (!sb) {
    throw new Error('Supabase 未設定：請複製 .env.example 為 .env 並填入 VITE_SUPABASE_URL、VITE_SUPABASE_ANON_KEY');
  }
  return sb;
}

export async function listArticles(): Promise<ArticleRow[]> {
  const sb = requireClient();
  const { data, error } = await sb.from('articles').select('*').order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as ArticleRow[];
}

export async function getArticle(id: string): Promise<ArticleRow | null> {
  const sb = requireClient();
  const { data, error } = await sb.from('articles').select('*').eq('id', id).maybeSingle();
  if (error) throw error;
  return data as ArticleRow | null;
}

export async function createArticle(row: ArticleInsert): Promise<ArticleRow> {
  const sb = requireClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) throw new Error('未登入');

  const { data, error } = await sb
    .from('articles')
    .insert({
      user_id: user.id,
      title: row.title ?? '未命名草稿',
      status: row.status ?? 'draft',
      primary_keyword: row.primary_keyword ?? null,
      seo_title: row.seo_title ?? null,
      meta_description: row.meta_description ?? null,
      body: row.body ?? '',
      paragraphs: row.paragraphs ?? null,
      keyword_analysis: row.keyword_analysis ?? null,
      outline_h2s: row.outline_h2s ?? null,
      generation_settings: row.generation_settings ?? null,
      seo_score_snapshot: row.seo_score_snapshot ?? null,
      word_count: row.word_count ?? 0,
      views: row.views ?? 0,
    })
    .select()
    .single();
  if (error) throw error;
  return data as ArticleRow;
}

export async function updateArticle(id: string, patch: ArticleUpdate): Promise<ArticleRow> {
  const sb = requireClient();
  const { data, error } = await sb.from('articles').update(patch).eq('id', id).select().single();
  if (error) throw error;
  return data as ArticleRow;
}

export async function deleteArticle(id: string): Promise<void> {
  const sb = requireClient();
  const { error } = await sb.from('articles').delete().eq('id', id);
  if (error) throw error;
}
