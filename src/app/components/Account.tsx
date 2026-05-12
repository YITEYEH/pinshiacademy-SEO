import { CreditCard, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/auth/AuthProvider';
import { getSupabase } from '@/lib/supabase';
import { getMyProfile } from '@/lib/profilesRepo';
import { countLlmCompletesThisMonth } from '@/lib/usageRepo';

export function Account(_props?: { onNavigate?: (page: string) => void }) {
  const { user } = useAuth();
  const [planLabel, setPlanLabel] = useState<string | null>(null);
  const [llmMonth, setLlmMonth] = useState<number | null>(null);

  useEffect(() => {
    if (!getSupabase()) return;
    let cancelled = false;
    void (async () => {
      try {
        const [p, n] = await Promise.all([getMyProfile(), countLlmCompletesThisMonth()]);
        if (cancelled) return;
        setPlanLabel(p?.plan ?? 'free');
        setLlmMonth(n);
      } catch {
        if (!cancelled) {
          setPlanLabel(null);
          setLlmMonth(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const planDisplay = planLabel ? planLabel.replace(/^\w/, (c) => c.toUpperCase()) : '—';
  const email = user?.email ?? '—';

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-2">帳號與整合</h1>
          <p className="text-muted-foreground">目前登入狀態與後端可讀取之方案／用量（不顯示未串接之假數據）</p>
        </div>

        <div className="mb-6 rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <CreditCard className="size-6 text-brand-link" />
            <h2>方案與用量</h2>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-brand-soft-from to-brand-soft-to p-6">
              <p className="mb-1 text-sm text-muted-foreground">目前方案（profiles.plan）</p>
              <h3 className="text-lg font-semibold">{planDisplay}</h3>
            </div>
            <div className="rounded-xl border border-slate-200 bg-muted/40 p-6">
              <p className="mb-1 text-sm text-muted-foreground">本月 AI 完成（usage_logs）</p>
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">{llmMonth === null ? '—' : `${llmMonth} 次`}</h3>
                <Zap className="size-6 shrink-0 text-muted-foreground" aria-hidden />
              </div>
            </div>
          </div>

          <p className="mb-4 text-sm text-muted-foreground">
            訂閱升級與金流尚未在此 App 串接；若需了解方案請至官網價格頁。
          </p>
          <Link
            to="/pricing"
            className="inline-flex rounded-lg border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand-deep hover:bg-accent/50"
          >
            查看方案與價格
          </Link>
        </div>

        <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
          <div className="mb-6 flex items-center gap-3">
            <Globe className="size-6 text-brand-link" />
            <h2>WordPress 整合</h2>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-orange-200 bg-orange-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-orange-100">
                <Globe className="size-5 text-orange-600" />
              </div>
              <div>
                <h4 className="mb-0.5 font-medium">尚未開放串接</h4>
                <p className="text-sm text-muted-foreground">後端代理與憑證管理完成後，會改為可設定之整合頁。</p>
              </div>
            </div>
            <Link
              to="/coming-soon/wordpress"
              className="shrink-0 rounded-lg border border-orange-300 bg-white px-4 py-2 text-center text-sm font-medium text-orange-800 transition-colors hover:bg-orange-50"
            >
              查看規劃說明
            </Link>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">登入帳號</p>
          <p className="mt-1 break-all">{email}</p>
        </div>
      </div>
    </div>
  );
}
