import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FileText, Loader2, ArrowLeft } from 'lucide-react';
import { getSupabase } from '@/lib/supabase';
import { useAuth } from '@/app/auth/AuthProvider';
import { AuthLegalFooter } from '@/app/auth/AuthLegalFooter';

export function ResetPasswordPage() {
  const { supabaseConfigured } = useAuth();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [waitHint, setWaitHint] = useState(false);
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const sb = getSupabase();
    if (!sb) return;

    const {
      data: { subscription },
    } = sb.auth.onAuthStateChange((_event, session) => {
      if (session?.user) setReady(true);
    });

    void sb.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) setReady(true);
    });

    const t = window.setTimeout(() => setWaitHint(true), 10_000);

    return () => {
      window.clearTimeout(t);
      subscription.unsubscribe();
    };
  }, [supabaseConfigured]);

  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
        <p className="text-sm text-muted-foreground">請先設定 Supabase。</p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError('密碼至少 8 字元');
      return;
    }
    if (password !== password2) {
      setError('兩次密碼不一致');
      return;
    }
    const sb = getSupabase();
    if (!sb) return;
    setSubmitting(true);
    const { error: err } = await sb.auth.updateUser({ password });
    setSubmitting(false);
    if (err) {
      setError(err.message);
      return;
    }
    setDone(true);
    window.setTimeout(() => navigate('/login', { replace: true }), 2000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-border p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">設定新密碼</h1>
            <p className="text-xs text-muted-foreground">請透過信箱內連結開啟本頁</p>
          </div>
        </div>

        {!ready && !done ? (
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>正在驗證重設連結…請確認已從信箱內最新連結開啟本頁（網址含驗證參數）。</p>
            <Loader2 className="w-6 h-6 animate-spin text-brand-link" />
            {waitHint && (
              <p className="text-destructive text-xs">
                仍無法驗證？請至 <Link to="/forgot-password" className="underline font-medium">忘記密碼</Link> 再寄一次，並在
                Supabase 將 <code className="bg-muted px-1 rounded">/reset-password</code> 加入 Redirect URLs。
              </p>
            )}
          </div>
        ) : done ? (
          <p className="text-sm text-green-700">密碼已更新，即將導向登入頁…</p>
        ) : (
          <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">新密碼</label>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">確認新密碼</label>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-3 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : '更新密碼'}
            </button>
            <Link to="/login" className="inline-flex items-center gap-2 text-sm text-brand-link hover:underline">
              <ArrowLeft className="w-4 h-4" />
              返回登入
            </Link>
          </form>
        )}

        <AuthLegalFooter />
      </div>
    </div>
  );
}
