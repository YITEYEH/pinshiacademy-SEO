import { getSupabase } from '@/lib/supabase';

function requireClient() {
  const sb = getSupabase();
  if (!sb) throw new Error('Supabase 未設定');
  return sb;
}

/** 本月（曆月）LLM 完成次數，供額度／用量摘要 */
export async function countLlmCompletesThisMonth(): Promise<number> {
  const sb = requireClient();
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  const { count, error } = await sb
    .from('usage_logs')
    .select('*', { count: 'exact', head: true })
    .eq('action', 'openai_complete')
    .gte('created_at', start.toISOString());
  if (error) throw error;
  return count ?? 0;
}
