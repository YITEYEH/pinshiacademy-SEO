import type { ReactNode } from 'react';
import { Link } from 'react-router';

export function AuthMarketingLayout(props: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 antialiased">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(24_24_27_/_0.038)_1px,transparent_1px),linear-gradient(to_bottom,rgb(24_24_27_/_0.038)_1px,transparent_1px)] bg-[length:76px_76px] [mask-image:radial-gradient(ellipse_85%_65%_at_50%_-8%,black,transparent)]" />
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link to="/" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
          ← 回到官網
        </Link>
        <div className="text-xs text-zinc-500">AI SEO 內容生成平台</div>
      </div>

      <main className="mx-auto w-full max-w-md px-4 pb-14 sm:px-6">
        {props.children}
      </main>
    </div>
  );
}

