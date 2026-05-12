import { Link, NavLink } from 'react-router';

const navItemClass =
  'text-sm text-zinc-600 hover:text-zinc-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/28 rounded-md px-2 py-1';

const navItemActiveClass = 'text-zinc-900';

export function MarketingNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="flex items-center gap-3 min-w-0 group">
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

        <div className="flex items-center gap-3">
          <Link to="/login" className="hidden text-sm text-zinc-600 hover:text-zinc-900 sm:inline">
            登入
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35"
          >
            免費開始
          </Link>
        </div>
      </div>
    </header>
  );
}

