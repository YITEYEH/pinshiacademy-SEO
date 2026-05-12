import { useState } from 'react';
import { Link, Navigate } from 'react-router';
import { FileText, Loader2 } from 'lucide-react';
import { useAuth } from '@/app/auth/AuthProvider';
import { AuthLegalFooter } from '@/app/auth/AuthLegalFooter';
import { AuthMarketingLayout } from '@/app/auth/AuthMarketingLayout';

export function RegisterPage() {
  const { user, loading, supabaseConfigured, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!supabaseConfigured) {
    return (
      <AuthMarketingLayout>
        <div className="rounded-[28px] bg-gradient-to-br from-emerald-500/28 via-zinc-800/15 to-zinc-300/70 p-px shadow-[0_28px_90px_-50px_rgba(24,24,27,0.28)]">
          <div className="rounded-[27px] bg-white/85 backdrop-blur-sm border border-zinc-200/80 p-8 shadow-[0_22px_70px_-56px_rgba(24,24,27,0.6)]">
          <h1 className="text-lg font-semibold mb-2">尚未設定 Supabase</h1>
          <p className="text-sm text-muted-foreground">請先設定 .env 後再註冊。</p>
          </div>
        </div>
      </AuthMarketingLayout>
    );
  }

  if (!loading && user) {
    return <Navigate to="/dashboard" replace />;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (password.length < 8) {
      setError('密碼至少 8 字元');
      return;
    }
    setSubmitting(true);
    const { error: err } = await signUp(email, password);
    setSubmitting(false);
    if (err) {
      setError(err.message);
      return;
    }
    setInfo('註冊成功。若專案啟用信箱驗證，請至信箱點擊連結後再登入。');
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
                <h1 className="font-semibold text-lg">註冊</h1>
                <p className="text-xs text-zinc-500">建立帳號以開始建立 SEO 內容</p>
              </div>
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
          <div>
            <label className="block text-sm font-medium mb-1.5">密碼（至少 8 字元）</label>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-input-background rounded-lg border border-transparent focus:outline-none focus:ring-2 focus:ring-slate-400/25"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {info && <p className="text-sm text-green-700 bg-green-50 border border-green-200 rounded-lg p-3">{info}</p>}

          <button
            type="submit"
            disabled={submitting || loading}
            className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-3 font-medium hover:from-brand-deep hover:to-brand-strong transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                建立中…
              </>
            ) : (
              '建立帳號'
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          已有帳號？{' '}
          <Link to="/login" className="text-brand-link font-medium hover:underline">
            登入
          </Link>
        </p>

        <AuthLegalFooter />
          </div>
        </div>
      </div>
    </AuthMarketingLayout>
  );
}
