import { getSupabase } from '@/lib/supabase';

export type EdgeGenerateDraftResponse =
  | { ok: true; ping?: boolean; userId?: string; openaiConfigured?: boolean; message?: string }
  | { ok: true; text: string; model?: string; usage?: { prompt_tokens?: number; completion_tokens?: number } }
  | { ok?: false; error?: string; message?: string };

async function messageFromFunctionsError(error: Error): Promise<string> {
  const base = error.message;
  const ctx = (error as { context?: { json?: () => Promise<unknown> } }).context;
  if (!ctx || typeof ctx.json !== 'function') return base;
  try {
    const j = (await ctx.json()) as { error?: string; message?: string };
    if (typeof j.message === 'string' && j.message.trim()) return j.message.trim();
    if (j.error === 'rate_limited') return j.message ?? '請求過於頻繁，請稍後再試。';
    if (j.error === 'quota_exceeded') return j.message ?? '本月生成額度已用盡。';
    if (typeof j.error === 'string') return j.error;
  } catch {
    /* ignore */
  }
  return base;
}

/**
 * 呼叫 Supabase Edge Function `generate-draft`。
 * 不傳任何第三方 API key；僅帶入目前使用者的 JWT（由 supabase-js 自動附加）。
 */
export async function invokeGenerateDraft(body: {
  action: 'ping' | 'complete';
  prompt?: string;
  maxTokens?: number;
}): Promise<{ data: EdgeGenerateDraftResponse | null; error: string | null }> {
  const sb = getSupabase();
  if (!sb) {
    return { data: null, error: 'Supabase 未設定' };
  }
  const { data, error } = await sb.functions.invoke<EdgeGenerateDraftResponse>('generate-draft', { body });
  if (error) {
    const msg = await messageFromFunctionsError(error);
    return { data: data ?? null, error: msg };
  }
  if (data && typeof data === 'object' && 'error' in data && !(data as { ok?: boolean }).ok) {
    const d = data as { error?: string; message?: string };
    const msg = d.message ?? d.error ?? '請求失敗';
    return { data: null, error: msg };
  }
  return { data: data ?? null, error: null };
}
