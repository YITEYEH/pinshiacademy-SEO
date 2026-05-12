/**
 * Edge Function：OpenAI 金鑰僅能放在 Supabase Secrets。
 * 每分鐘請求上限：避免濫用（與 usage_logs 搭配）。
 */
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const MAX_PROMPT_CHARS = 12_000;
const MAX_COMPLETION_TOKENS = 900;
const RATE_LIMIT_PER_MINUTE = 30;

type ReqBody = {
  action?: 'ping' | 'complete';
  prompt?: string;
  maxTokens?: number;
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: '僅接受 POST' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const authHeader = req.headers.get('Authorization');
  if (!authHeader) {
    return new Response(JSON.stringify({ error: '缺少 Authorization' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
  const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
  const supabase = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authHeader } },
  });

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) {
    return new Response(JSON.stringify({ error: '未授權' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  let body: ReqBody = {};
  try {
    body = (await req.json()) as ReqBody;
  } catch {
    body = {};
  }

  const openaiKey = Deno.env.get('OPENAI_API_KEY');
  const openaiConfigured = Boolean(openaiKey);

  if (body.action === 'ping' || !body.action) {
    return new Response(
      JSON.stringify({
        ok: true,
        ping: true,
        userId: user.id,
        openaiConfigured,
        message: openaiConfigured
          ? 'Edge Function 正常，已偵測到 OPENAI_API_KEY。'
          : 'OPENAI_API_KEY 未設定；請於 Dashboard Secrets 設定後再呼叫 complete。',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  if (body.action === 'complete') {
    if (!openaiKey) {
      return new Response(
        JSON.stringify({
          error: 'OPENAI_API_KEY 未設定。請勿將金鑰寫入前端，僅能放在 Edge Function Secrets。',
        }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const since = new Date(Date.now() - 60_000).toISOString();
    const { count, error: rateErr } = await supabase
      .from('usage_logs')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', since);

    if (!rateErr && (count ?? 0) >= RATE_LIMIT_PER_MINUTE) {
      return new Response(
        JSON.stringify({
          error: 'rate_limited',
          message: `每分鐘最多 ${RATE_LIMIT_PER_MINUTE} 次生成，請稍後再試。`,
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const { data: profile } = await supabase.from('profiles').select('plan').eq('id', user.id).maybeSingle();
    const planRaw = String((profile as { plan?: string } | null)?.plan ?? 'free').toLowerCase();
    const isPro = planRaw === 'pro' || planRaw === 'paid' || planRaw === 'enterprise';

    const freeLimit = Math.max(1, Math.floor(Number(Deno.env.get('FREE_PLAN_MONTHLY_LLM') ?? '40')));
    const proLimit = Math.max(freeLimit, Math.floor(Number(Deno.env.get('PRO_PLAN_MONTHLY_LLM') ?? '500')));
    const monthlyLimit = isPro ? proLimit : freeLimit;

    const { count: monthCount, error: monthErr } = await supabase
      .from('usage_logs')
      .select('*', { count: 'exact', head: true })
      .eq('action', 'openai_complete')
      .gte('created_at', monthStart.toISOString());

    if (!monthErr && (monthCount ?? 0) >= monthlyLimit) {
      return new Response(
        JSON.stringify({
          error: 'quota_exceeded',
          message: `本月 AI 生成已達上限（${monthlyLimit} 次）${isPro ? '' : '；可升級方案以提高額度'}`,
        }),
        { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const raw = (body.prompt ?? '').trim();
    if (!raw) {
      return new Response(JSON.stringify({ error: 'prompt 不可為空' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    const prompt = raw.slice(0, MAX_PROMPT_CHARS);
    const maxTokens = Math.min(
      MAX_COMPLETION_TOKENS,
      Math.max(1, Math.floor(Number(body.maxTokens) || 400)),
    );

    const model = Deno.env.get('OPENAI_MODEL') ?? 'gpt-4o-mini';

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: '你是專業中文 SEO 寫作助理。請簡潔回答，勿冗長。',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: maxTokens,
        temperature: 0.5,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return new Response(
        JSON.stringify({
          error: `OpenAI 請求失敗 (${res.status})`,
          detail: errText.slice(0, 500),
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
      usage?: { prompt_tokens?: number; completion_tokens?: number };
    };
    const text = json.choices?.[0]?.message?.content?.trim() ?? '';

    try {
      await supabase.from('usage_logs').insert({
        user_id: user.id,
        action: 'openai_complete',
        meta: { model },
        prompt_tokens: json.usage?.prompt_tokens ?? null,
        completion_tokens: json.usage?.completion_tokens ?? null,
      });
    } catch {
      // 表尚未建立時不中斷回應
    }

    return new Response(
      JSON.stringify({
        ok: true,
        text,
        model,
        usage: json.usage,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  return new Response(JSON.stringify({ error: '不支援的 action' }), {
    status: 400,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});
