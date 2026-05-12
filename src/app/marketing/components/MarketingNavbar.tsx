import { useState } from 'react';
import { Link, NavLink } from 'react-router';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent } from '@/app/components/ui/sheet';

const navItemClass =
  'text-sm text-zinc-600 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/28 rounded-md px-2 py-1';

const navItemActiveClass = 'text-zinc-900';

export function MarketingNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3 group" onClick={closeMobile}>
          <div className="h-9 w-9 rounded-2xl bg-emerald-700 shadow-sm ring-1 ring-emerald-700/25 group-hover:bg-emerald-800 transition-colors" />
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold tracking-tight">AI SEO 內容生成平台</p>
            <p className="truncate text-[11px] text-zinc-500">SEO Content Operating System</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 text-sm lg:flex" aria-label="主要導覽">
          <NavLink to="/" className={({ isActive }) => `${navItemClass} ${isActive ? navItemActiveClass : ''}`} end>
            首頁
          </NavLink>
          <NavLink
            to="/features"
            className={({ isActive }) => `${navItemClass} ${isActive ? navItemActiveClass : ''}`}
          >
            功能
          </NavLink>
          <NavLink
            to="/pricing"
            className={({ isActive }) => `${navItemClass} ${isActive ? navItemActiveClass : ''}`}
          >
            價格
          </NavLink>
          <NavLink to="/blog" className={({ isActive }) => `${navItemClass} ${isActive ? navItemActiveClass : ''}`}>
            部落格
          </NavLink>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-zinc-700 hover:bg-zinc-100 lg:hidden"
            aria-label="開啟選單"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" />
          </button>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetContent side="right" className="w-[min(20rem,90vw)] gap-0 border-l p-0 sm:max-w-sm">
              <nav className="flex flex-col gap-1 p-4 pt-12" aria-label="主要導覽（行動版）">
                <NavLink
                  to="/"
                  end
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'bg-emerald-50 text-emerald-900' : 'text-zinc-700 hover:bg-zinc-100'}`
                  }
                >
                  首頁
                </NavLink>
                <NavLink
                  to="/features"
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'bg-emerald-50 text-emerald-900' : 'text-zinc-700 hover:bg-zinc-100'}`
                  }
                >
                  功能
                </NavLink>
                <NavLink
                  to="/pricing"
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'bg-emerald-50 text-emerald-900' : 'text-zinc-700 hover:bg-zinc-100'}`
                  }
                >
                  價格
                </NavLink>
                <NavLink
                  to="/blog"
                  onClick={closeMobile}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-base font-medium ${isActive ? 'bg-emerald-50 text-emerald-900' : 'text-zinc-700 hover:bg-zinc-100'}`
                  }
                >
                  部落格
                </NavLink>
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="mt-4 rounded-lg border border-zinc-200 px-3 py-3 text-center text-base font-medium text-zinc-800 hover:bg-zinc-50"
                >
                  登入
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/login" className="hidden text-sm text-zinc-600 hover:text-zinc-900 sm:inline">
            登入
          </Link>
          <Link
            to="/register"
            onClick={closeMobile}
            className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35"
          >
            免費開始
          </Link>
        </div>
      </div>
    </header>
  );
}

