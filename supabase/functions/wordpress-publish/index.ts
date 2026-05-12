/**
 * WordPress 發布預留：站點 URL、Application Password 等僅能放在 Secrets。
 * 部署：supabase functions deploy wordpress-publish
 * 之後在此呼叫 WP REST API（例如 wp/v2/posts）。
 */
import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
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

  const supabase = createClient(Deno.env.get('SUPABASE_URL') ?? '', Deno.env.get('SUPABASE_ANON_KEY') ?? '', {
    global: { headers: { Authorization: authHeader } },
  });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) {
    return new Response(JSON.stringify({ error: '未授權' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const wpUrl = Deno.env.get('WORDPRESS_BASE_URL');
  const wpUser = Deno.env.get('WORDPRESS_USERNAME');
  const wpPass = Deno.env.get('WORDPRESS_APP_PASSWORD');
  if (!wpUrl || !wpUser || !wpPass) {
    return new Response(
      JSON.stringify({
        ok: false,
        stub: true,
        message:
          '尚未設定 WORDPRESS_BASE_URL、WORDPRESS_USERNAME、WORDPRESS_APP_PASSWORD。請在 Secrets 設定後再實作 REST 發文。',
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }

  return new Response(
    JSON.stringify({
      ok: false,
      stub: true,
      message: '已偵測到 WordPress 環境變數；請在此實作 wp/v2/posts 發布邏輯。',
    }),
    { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
  );
});
