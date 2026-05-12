import { Link, useParams } from 'react-router';
import { Construction, ArrowLeft } from 'lucide-react';
import { COMING_SOON_FEATURES, PAGE_TITLES, isComingSoonFeature } from '@/app/navigation';

const HINTS: Partial<Record<string, string>> = {
  calendar: '之後可串接排程 API 或 Google Calendar。',
  analytics: '之後可串接 GA4 / GSC OAuth。',
  templates: '之後可將模板存於 Supabase 並與 NewArticle 連動。',
  'data-sources': '之後可設定關鍵字 API（Ahrefs、DataForSEO 等）—金鑰僅放後端。',
  tracking: '之後可管理 GTM / Pixel 片段（敏感設定勿放前端）。',
  wordpress: '之後以 Application Password 或 OAuth 走後端代理呼叫 WP REST。',
};

export function ComingSoonPage() {
  const { featureId } = useParams<{ featureId: string }>();
  const id = featureId ?? '';
  const valid = isComingSoonFeature(id);
  const title = valid ? PAGE_TITLES[id] : '功能預覽';
  const hint = valid ? HINTS[id] : '此路徑尚未開放。';

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl border border-border p-8 shadow-sm">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center shrink-0">
            <Construction className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <p className="text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5 inline-block mb-2">
              即將推出
            </p>
            <h1 className="text-xl font-semibold mb-1">{title}</h1>
            <p className="text-sm text-muted-foreground">{hint}</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          您提到會之後一次串接：屆時在 Supabase／Edge Functions 設定 Secrets，並把此頁對應之{' '}
          <code className="text-xs bg-muted px-1 rounded">{valid ? id : 'feature'}</code> 路由改回真實頁面即可。
        </p>

        <div className="rounded-xl bg-muted/50 border border-border p-4 mb-6">
          <p className="text-xs font-medium text-muted-foreground mb-2">占位功能 ID（供串接對照）</p>
          <ul className="text-xs font-mono text-foreground space-y-1">
            {COMING_SOON_FEATURES.map((f) => (
              <li key={f}>
                <Link to={`/coming-soon/${f}`} className={f === id ? 'text-brand-link font-semibold' : 'text-muted-foreground hover:text-foreground'}>
                  {f}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-link hover:text-brand-deep"
        >
          <ArrowLeft className="w-4 h-4" />
          回到 Dashboard
        </Link>
      </div>
    </div>
  );
}
