import { Link, useParams } from 'react-router';
import { Construction, ArrowLeft } from 'lucide-react';
import { PAGE_TITLES, isComingSoonFeature } from '@/app/navigation';

const HINTS: Partial<Record<string, string>> = {
  calendar: '之後可串接排程 API 或 Google Calendar。',
  analytics: '之後可串接 GA4 / GSC OAuth。',
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
    <div className="mx-auto max-w-2xl p-4 sm:p-6 lg:p-8">
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

        <p className="mb-6 text-sm text-muted-foreground">
          此功能尚在規劃；串接時請在 Supabase／Edge Functions 設定 Secrets，並將對應路由改為實際頁面。
        </p>

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
