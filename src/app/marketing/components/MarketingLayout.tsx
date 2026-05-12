import type { ReactNode } from 'react';
import { MarketingNavbar } from '@/app/marketing/components/MarketingNavbar';
import { MarketingFooter } from '@/app/marketing/components/MarketingFooter';

export function MarketingLayout(props: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen bg-zinc-50 text-zinc-900 antialiased">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(24_24_27_/_0.038)_1px,transparent_1px),linear-gradient(to_bottom,rgb(24_24_27_/_0.038)_1px,transparent_1px)] bg-[length:76px_76px] [mask-image:radial-gradient(ellipse_85%_65%_at_50%_-8%,black,transparent)]" />
      </div>

      <MarketingNavbar />
      <main>{props.children}</main>
      <MarketingFooter />
    </div>
  );
}

