import { useState } from 'react';
import { Link } from 'react-router';
import { FileText, Loader2, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/app/auth/AuthProvider';
import { AuthLegalFooter } from '@/app/auth/AuthLegalFooter';

export function ForgotPasswordPage() {
  const { supabaseConfigured, resetPasswordForEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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
    setSubmitting(true);
    const { error: err } = await resetPasswordForEmail(email);
    setSubmitting(false);
    if (err) {
      setError(err.message);
      return;
    }
    setDone(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-border p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center">
            <FileText className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-lg">重設密碼</h1>
            <p className="text-xs text-muted-foreground">寄送重設連結到您的信箱</p>
          </div>
        </div>

        {done ? (
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>若此 Email 已註冊，您將收到一封重設密碼信。請檢查收件匣與垃圾信匣。</p>
            <p className="text-xs">
              請在 Supabase → Authentication → URL configuration 將{' '}
              <code className="bg-muted px-1 rounded">{typeof window !== 'undefined' ? window.location.origin : ''}/reset-password</code>{' '}
              加入 Redirect URLs。
            </p>
            <Link to="/login" className="inline-flex items-center gap-2 text-brand-link font-medium hover:underline">
              <ArrowLeft className="w-4 h-4" />
              返回登入
            </Link>
          </div>
        ) : (
          <form onSubmit={(e) => void onSubmit(e)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-3 font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  寄送中…
                </>
              ) : (
                '寄送重設連結'
              )}
            </button>
            <Link to="/login" className="block text-center text-sm text-brand-link hover:underline">
              返回登入
            </Link>
          </form>
        )}

        <AuthLegalFooter />
      </div>
    </div>
  );
}
