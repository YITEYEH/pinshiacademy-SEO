import { Search, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/auth/AuthProvider';

interface TopbarProps {
  pageTitle: string;
  plan?: string;
  /** 本月 Edge / OpenAI complete 次數（來自 usage_logs） */
  llmUsageThisMonth?: number | null;
}

export function Topbar({ pageTitle, plan = 'Free', llmUsageThisMonth = null }: TopbarProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/login', { replace: true });
  }

  const email = user?.email ?? '';

  return (
    <div className="h-16 bg-white border-b border-border px-8 flex items-center justify-between">
      <h1 className="font-semibold text-foreground truncate">{pageTitle}</h1>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="搜尋..."
            autoComplete="off"
            className="pl-10 pr-4 py-2 bg-muted rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-slate-400/25"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="text-sm hidden sm:block text-right max-w-[200px]">
            <span className="text-muted-foreground block text-xs">帳號</span>
            <span className="font-medium text-foreground truncate block" title={email}>
              {email || '—'}
            </span>
          </div>

          <div className="text-sm hidden lg:block">
            <span className="text-muted-foreground">本月 AI 次數：</span>
            <span className="font-semibold text-brand-link">{llmUsageThisMonth === null ? '—' : `${llmUsageThisMonth} 次`}</span>
          </div>

          <div className="px-3 py-1 bg-gradient-to-r from-brand to-brand-deep text-white rounded-full text-xs font-medium">
            {plan}
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            title="登出"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">登出</span>
          </button>

          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center shrink-0" aria-hidden>
            <User className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
}
