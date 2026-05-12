import { Menu, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '@/app/auth/AuthProvider';

interface TopbarProps {
  pageTitle: string;
  plan?: string;
  /** 本月 Edge / OpenAI complete 次數（來自 usage_logs） */
  llmUsageThisMonth?: number | null;
  /** 小螢幕開啟側欄抽屜 */
  onOpenMobileNav?: () => void;
}

export function Topbar({ pageTitle, plan = 'Free', llmUsageThisMonth = null, onOpenMobileNav }: TopbarProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  async function handleSignOut() {
    await signOut();
    navigate('/login', { replace: true });
  }

  const email = user?.email ?? '';

  return (
    <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex min-w-0 items-center gap-2 sm:gap-3">
        {onOpenMobileNav ? (
          <button
            type="button"
            className="inline-flex shrink-0 rounded-lg p-2 text-foreground hover:bg-accent lg:hidden"
            aria-label="開啟選單"
            onClick={onOpenMobileNav}
          >
            <Menu className="size-5" aria-hidden />
          </button>
        ) : null}
        <h1 className="truncate font-semibold text-foreground">{pageTitle}</h1>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-6">
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

          <Link
            to="/account"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-deep text-white ring-offset-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/40 focus-visible:ring-offset-2"
            title="帳號與整合"
            aria-label="前往帳號與整合"
          >
            <User className="size-5" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
