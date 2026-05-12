import { Link } from 'react-router';
import { siteConfig } from '@/app/seo/siteConfig';

export function MarketingFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <p className="text-sm font-semibold tracking-tight">{siteConfig.brandName}</p>
            <p className="text-sm leading-relaxed text-zinc-600">
              AI SEO 工具，專注於 SEO 內容生成與轉換率。把 SEO文章生成、SEO 文案與架構化流程整合成可商業化的內容系統。
            </p>
            <p className="text-sm text-zinc-600">
              聯絡信箱：<a className="hover:text-zinc-900" href={`mailto:${siteConfig.emails.support}`}>{siteConfig.emails.support}</a>
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-500">Sitemap</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="text-zinc-600 hover:text-zinc-900" to="/">
                  首頁
                </Link>
              </li>
              <li>
                <Link className="text-zinc-600 hover:text-zinc-900" to="/features">
                  功能
                </Link>
              </li>
              <li>
                <Link className="text-zinc-600 hover:text-zinc-900" to="/demo">
                  產品預覽
                </Link>
              </li>
              <li>
                <Link className="text-zinc-600 hover:text-zinc-900" to="/pricing">
                  價格
                </Link>
              </li>
              <li>
                <Link className="text-zinc-600 hover:text-zinc-900" to="/blog">
                  部落格
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-500">社群</p>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li>
                <a className="hover:text-zinc-900" href="#" onClick={(e) => e.preventDefault()}>
                  LinkedIn（預留）
                </a>
              </li>
              <li>
                <a className="hover:text-zinc-900" href="#" onClick={(e) => e.preventDefault()}>
                  X（預留）
                </a>
              </li>
              <li>
                <a className="hover:text-zinc-900" href="#" onClick={(e) => e.preventDefault()}>
                  YouTube（預留）
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-zinc-500">法律條款</p>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a className="text-zinc-600 hover:text-zinc-900" href="#" onClick={(e) => e.preventDefault()}>
                  隱私權政策（預留）
                </a>
              </li>
              <li>
                <a className="text-zinc-600 hover:text-zinc-900" href="#" onClick={(e) => e.preventDefault()}>
                  服務條款（預留）
                </a>
              </li>
              <li>
                <a className="text-zinc-600 hover:text-zinc-900" href="#" onClick={(e) => e.preventDefault()}>
                  Cookie 政策（預留）
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-zinc-200 pt-6 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-zinc-900" href="/sitemap.xml">
              sitemap
            </a>
            <a className="hover:text-zinc-900" href="/robots.txt">
              robots
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

