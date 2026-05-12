import type { ReactNode } from 'react';
import { Fragment } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Layers,
  MousePointerClick,
  Sparkles,
} from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { FaqAccordion } from '@/app/marketing/components/FaqAccordion';
import { MarketingLayout } from '@/app/marketing/components/MarketingLayout';
import { ProductDashboardMock } from '@/app/marketing/components/ProductDashboardMock';
import {
  landingLogoStripEyebrow,
  productPreviewCallouts,
  productPreviewFaq,
  productPreviewHero,
  productPreviewSections,
  productPreviewTourSteps,
  productPreviewTrustBadges,
  productPreviewVsLive,
  socialProof,
} from '@/app/marketing/marketingCopy';
import { SeoHead } from '@/app/seo/SeoHead';
import { absoluteUrl, siteConfig } from '@/app/seo/siteConfig';

const shell = 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8';
const sectionY = 'py-16 sm:py-20 lg:py-28';

function workspacePreviewChromeLabel() {
  try {
    const { hostname } = new URL(siteConfig.baseUrl);
    return `${hostname}／工作台`;
  } catch {
    return '工作台預覽';
  }
}

function Eyebrow(props: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        'mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-900/90',
        props.className,
      )}
    >
      <span className="h-px w-8 bg-gradient-to-r from-emerald-600/75 to-transparent" aria-hidden />
      {props.children}
    </p>
  );
}

function BrowserChrome(props: { children: ReactNode; url?: string }) {
  const urlLine = props.url ?? workspacePreviewChromeLabel();
  return (
    <div className="rounded-xl border border-zinc-200/90 bg-zinc-100/90 p-2 shadow-[0_28px_90px_-40px_rgba(24,24,27,0.35)] ring-1 ring-black/[0.04]">
      <div className="flex items-center gap-3 border-b border-zinc-200/80 px-3 py-2.5">
        <span className="flex gap-1.5 pl-1" aria-hidden>
          <span className="size-2.5 rounded-full bg-red-400/90" />
          <span className="size-2.5 rounded-full bg-amber-400/90" />
          <span className="size-2.5 rounded-full bg-emerald-400/90" />
        </span>
        <div className="min-w-0 flex-1 rounded-lg border border-zinc-200/80 bg-white px-3 py-1.5 text-center text-[11px] font-medium text-zinc-500">
          {urlLine}
        </div>
      </div>
      <div className="pt-2">{props.children}</div>
    </div>
  );
}

export function ProductPreviewPage() {
  const faqItems = productPreviewFaq.map((x) => ({ question: x.question, answer: x.answer }));
  const sec = productPreviewSections;

  return (
    <MarketingLayout>
      <SeoHead
        meta={{
          title: '產品預覽｜SEO 內容工作流程預覽',
          description:
            '免登入即可瀏覽工作台預覽：從搜尋意圖、文章架構、摘要文案到成效參考，一次看懂完整流程。準備好後可免費註冊體驗真實工作區。',
          canonicalPath: '/demo',
          og: { type: 'website', url: absoluteUrl('/demo') },
          twitter: { card: 'summary' },
        }}
      />

      <section className={`${shell} pb-10 pt-14 text-center sm:pb-12 sm:pt-20 lg:pb-14 lg:pt-24`}>
        <Eyebrow className="w-full justify-center">{productPreviewHero.eyebrow}</Eyebrow>
        <h1 className="mx-auto max-w-4xl text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          {productPreviewHero.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
          {productPreviewHero.subtitle}
        </p>

        <div className="mx-auto mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
          {productPreviewTrustBadges.map((b) => (
            <span
              key={b.title}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-3 py-1.5 text-left text-[11px] font-semibold text-zinc-700 shadow-sm sm:text-xs"
            >
              <Check className="size-3.5 shrink-0 text-emerald-600" strokeWidth={2.5} aria-hidden />
              {b.title}
            </span>
          ))}
        </div>

        <div className="mx-auto mt-10 flex flex-wrap justify-center gap-3">
          <Link
            to="/register"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm ring-1 ring-emerald-600/25 transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35"
          >
            免費開始
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link
            to="/pricing"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/25"
          >
            查看方案
          </Link>
          <Link
            to="/features"
            className="inline-flex h-11 items-center justify-center gap-1 rounded-xl px-4 text-sm font-semibold text-emerald-800 hover:text-emerald-900"
          >
            完整功能
            <ChevronRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-zinc-50/80">
        <div className={`${shell} pb-16 pt-10 sm:pb-20 sm:pt-12 lg:pb-24`}>
          <p className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">{sec.mainVisual.label}</p>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm leading-relaxed text-zinc-600">{sec.mainVisual.sub}</p>
          <div className="mx-auto mt-10 max-w-5xl">
            <BrowserChrome url={workspacePreviewChromeLabel()}>
              <ProductDashboardMock chartGradientId="demo-page-main-trend-fill" />
            </BrowserChrome>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-white">
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">{sec.trustExplainer.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">{sec.trustExplainer.title}</h2>
          </header>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {productPreviewTrustBadges.map((b) => (
              <article
                key={b.title}
                className="rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/40 p-5 shadow-sm ring-1 ring-black/[0.03] sm:p-6"
              >
                <p className="text-sm font-semibold text-zinc-950">{b.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{b.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-zinc-50">
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">{sec.tour.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">{sec.tour.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              {sec.tour.subtitle}{' '}
              <Link
                to="/features"
                className="font-semibold text-emerald-800 underline decoration-emerald-500/35 underline-offset-4 hover:text-emerald-900"
              >
                前往功能總覽
              </Link>
            </p>
          </header>

          <div className="mt-12 rounded-[28px] border border-zinc-200/75 bg-white p-6 shadow-sm ring-1 ring-black/[0.03] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
              {productPreviewTourSteps.map((s, i) => (
                <Fragment key={s.n}>
                  <div className="flex flex-1 flex-col rounded-2xl border border-zinc-200/75 bg-zinc-50/50 p-5 sm:p-6">
                    <p className="font-mono text-[11px] font-semibold tabular-nums text-emerald-800">{s.n}</p>
                    <h3 className="mt-3 text-sm font-semibold text-zinc-950">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{s.body}</p>
                  </div>
                  {i < productPreviewTourSteps.length - 1 ? (
                    <div className="hidden shrink-0 items-center justify-center self-center lg:flex lg:w-10" aria-hidden>
                      <ArrowRight className="size-5 text-zinc-300" strokeWidth={2} />
                    </div>
                  ) : null}
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-white">
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">{sec.callouts.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">{sec.callouts.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600">{sec.callouts.subtitle}</p>
          </header>

          <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
            {productPreviewCallouts.map((c, idx) => {
              const Icon = idx === 0 ? Layers : idx === 1 ? MousePointerClick : Sparkles;
              return (
                <article
                  key={c.title}
                  className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/50 p-6 shadow-sm ring-1 ring-black/[0.03] sm:p-7"
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-emerald-900">
                    <Icon className="size-3.5" aria-hidden strokeWidth={2} />
                    {c.tag}
                  </span>
                  <h3 className="mt-4 text-base font-semibold text-zinc-950">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600">{c.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-zinc-50">
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">{sec.compare.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">{sec.compare.title}</h2>
          </header>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-zinc-200/90 bg-white shadow-sm ring-1 ring-black/[0.03]">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/90">
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">項目</th>
                  <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500">公開預覽</th>
                  <th className="bg-emerald-50/90 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-emerald-950">
                    正式工作區
                  </th>
                </tr>
              </thead>
              <tbody>
                {productPreviewVsLive.map((row) => (
                  <tr key={row.aspect} className="border-b border-zinc-100 last:border-b-0">
                    <th scope="row" className="px-5 py-4 text-sm font-semibold text-zinc-900">
                      {row.aspect}
                    </th>
                    <td className="px-5 py-4 text-sm leading-relaxed text-zinc-600">{row.preview}</td>
                    <td className="bg-emerald-50/35 px-5 py-4 text-sm leading-relaxed text-zinc-800">{row.live}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-white py-14 sm:py-16">
        <div className={`${shell} text-center`}>
          <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{landingLogoStripEyebrow}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {socialProof.logos.map((name) => (
              <div
                key={name}
                className="rounded-full border border-zinc-200/80 bg-zinc-50/80 px-5 py-2.5 text-xs font-semibold text-zinc-500"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-zinc-50" aria-labelledby="demo-faq-title">
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">{sec.faq.eyebrow}</Eyebrow>
            <h2 id="demo-faq-title" className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              {sec.faq.title}
            </h2>
          </header>
          <div className="mx-auto mt-12 max-w-3xl">
            <FaqAccordion items={faqItems} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-200/80 bg-gradient-to-b from-zinc-50/80 via-white to-white">
        <div className={`relative z-[1] ${shell} ${sectionY}`}>
          <div className="rounded-[28px] bg-gradient-to-br from-emerald-400/25 via-emerald-500/15 to-zinc-300/40 p-px shadow-[0_20px_70px_-40px_rgba(16,185,129,0.35)] ring-1 ring-emerald-600/10">
            <div className="rounded-[27px] border border-white/80 bg-gradient-to-br from-white via-emerald-50/35 to-zinc-50/90 px-8 py-12 text-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-12 sm:py-14">
              <div aria-hidden className="pointer-events-none absolute -right-16 -top-20 size-[240px] rounded-full bg-emerald-400/[0.07]" />
              <div className="relative z-[1] max-w-3xl">
                <Eyebrow className="text-emerald-900/90">{sec.cta.eyebrow}</Eyebrow>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">{sec.cta.title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">{sec.cta.body}</p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to="/register"
                    className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
                  >
                    立即註冊
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-zinc-50"
                  >
                    查看價格
                  </Link>
                  <Link
                    to="/"
                    className="inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-emerald-800 underline decoration-emerald-500/35 underline-offset-4 hover:text-emerald-900"
                  >
                    返回首頁
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}
