import { useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { FileText, Loader2 } from 'lucide-react';
import { useAuth } from '@/app/auth/AuthProvider';
import { AuthLegalFooter } from '@/app/auth/AuthLegalFooter';
import { AuthMarketingLayout } from '@/app/auth/AuthMarketingLayout';

export function LoginPage() {
  const { user, loading, supabaseConfigured, signIn, signInWithOtp } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [authMode, setAuthMode] = useState<'password' | 'magic'>('password');
  const [magicSent, setMagicSent] = useState(false);

  if (!supabaseConfigured) {
    return (
      <AuthMarketingLayout>
        <div className="rounded-[28px] bg-gradient-to-br from-emerald-500/28 via-zinc-800/15 to-zinc-300/70 p-px shadow-[0_28px_90px_-50px_rgba(24,24,27,0.28)]">
          <div className="rounded-[27px] bg-white/85 backdrop-blur-sm border border-zinc-200/80 p-8 shadow-[0_22px_70px_-56px_rgba(24,24,27,0.6)]">
          <h1 className="text-lg font-semibold mb-2">尚未設定 Supabase</h1>
          <p className="text-sm text-muted-foreground mb-4">
            請在專案根目錄建立 <code className="text-xs bg-muted px-1 rounded">.env</code>，並依{' '}
            <code className="text-xs bg-muted px-1 rounded">.env.example</code> 填入 URL 與 anon key（可公開，靠 RLS
            保護資料）。
          </p>
          </div>
        </div>
      </AuthMarketingLayout>
    );
  }

  if (!loading && user) {
    return <Navigate to={from} replace />;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMagicSent(false);
    setSubmitting(true);
    if (authMode === 'magic') {
      const { error: err } = await signInWithOtp(email);
      setSubmitting(false);
      if (err) setError(err.message);
      else setMagicSent(true);
      return;
    }
    const { error: err } = await signIn(email, password);
    setSubmitting(false);
    if (err) setError(err.message);
  }

  return (
    <AuthMarketingLayout>
      <div className="rounded-[28px] bg-gradient-to-br from-emerald-500/28 via-zinc-800/15 to-zinc-300/70 p-px shadow-[0_28px_90px_-50px_rgba(24,24,27,0.28)]">
        <div className="relative overflow-hidden rounded-[27px] bg-white/85 backdrop-blur-sm border border-zinc-200/80 p-8 shadow-[0_22px_70px_-56px_rgba(24,24,27,0.6)]">
          <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.34] [background:radial-gradient(ellipse_70%_55%_at_18%_16%,rgba(16,185,129,0.14),transparent_58%)]" />
          <div className="relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-900 flex items-center justify-center shadow-sm ring-1 ring-emerald-600/25">
                <FileText className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">登入</h1>
                <p className="text-xs text-zinc-500">AI SEO 內容生成平台</p>
              </div>
            </div>

        <div className="flex rounded-lg border border-border p-0.5 mb-4 text-sm">
          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              setError(null);
              setMagicSent(false);
            }}
            className={`flex-1 py-2 rounded-md transition-colors ${authMode === 'password' ? 'bg-gradient-to-r from-brand to-brand-deep text-white' : 'text-muted-foreground'}`}
          >
            密碼登入
          </button>
          <button
            type="button"
            onClick={() => {
              setAuthMode('magic');
              setError(null);
              setMagicSent(false);
            }}
            className={`flex-1 py-2 rounded-md transition-colors ${authMode === 'magic' ? 'bg-gradient-to-r from-brand to-brand-deep text-white' : 'text-muted-foreground'}`}
          >
            信箱連結
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-slate-400/25"
            />
          </div>
          {authMode === 'password' ? (
            <div>
              <label className="block text-sm font-medium mb-1.5">密碼</label>
              <input
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-slate-400/25"
              />
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">我們會寄出登入連結到信箱（需在 Supabase Auth 啟用 Email）。</p>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}
          {magicSent && <p className="text-sm text-green-700">已寄出，請至信箱開啟連結完成登入。</p>}

          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-3 font-medium hover:from-brand-deep hover:to-brand-strong transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {authMode === 'magic' ? '寄送中…' : '登入中…'}
              </>
            ) : authMode === 'magic' ? (
              '寄送登入連結'
            ) : (
              '登入'
            )}
          </button>
        </form>

        <div className="mt-6 space-y-2 text-center text-sm">
          <Link to="/forgot-password" className="block text-brand-link font-medium hover:underline">
            忘記密碼？
          </Link>
          <p className="text-muted-foreground">
            還沒有帳號？{' '}
            <Link to="/register" className="text-brand-link font-medium hover:underline">
              註冊
            </Link>
          </p>
        </div>

        <AuthLegalFooter />
          </div>
        </div>
      </div>
    </AuthMarketingLayout>
  );
}
