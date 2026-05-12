import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { MarketingLayout } from '@/app/marketing/components/MarketingLayout';
import { ProductDashboardMock } from '@/app/marketing/components/ProductDashboardMock';
import { SeoHead } from '@/app/seo/SeoHead';
import { absoluteUrl, siteConfig } from '@/app/seo/siteConfig';
import { faqJsonLd, organizationJsonLd, softwareApplicationJsonLd } from '@/app/seo/jsonLd';
import { FaqAccordion } from '@/app/marketing/components/FaqAccordion';
import {
  landingDifferentiators,
  landingFaq,
  landingHeroMicroTrust,
  landingLogoStripEyebrow,
  landingPricingTeaser,
  outcomeFeatures,
  painPoints,
  socialProof,
  workflowSteps,
} from '@/app/marketing/marketingCopy';

/** 全頁一致的內容寬度與水平留白 */
const shell = 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8';
/** 區塊垂直節奏（Hero 除外） */
const sectionY = 'py-16 sm:py-20 lg:py-28';

function Eyebrow(props: { children: ReactNode; className?: string; accentClassName?: string }) {
  return (
    <p
      className={cn(
        'mb-3 flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-900/90',
        props.className,
      )}
    >
      <span
        className={cn('h-px w-8 bg-gradient-to-r from-emerald-600/75 to-transparent', props.accentClassName)}
        aria-hidden
      />
      {props.children}
    </p>
  );
}

function SectionBackdrop(props: { variant?: 'light' | 'muted' }) {
  void props;
  return null;
}

type FeatureIcon = 'layout' | 'sparkles' | 'badge' | 'target';

function FeatureIconMark(props: { name: FeatureIcon }) {
  const shell =
    'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-zinc-100 p-[1px] shadow-[0_10px_30px_-18px_rgba(24,24,27,0.55)] ring-1 ring-black/[0.04]';
  const inner =
    'flex size-full items-center justify-center rounded-[15px] border border-zinc-200/80 bg-white/90';
  const mark = 'h-4 w-4 rounded-sm bg-gradient-to-br from-zinc-900 to-zinc-700';
  if (props.name === 'sparkles')
    return (
      <span className={shell} aria-hidden>
        <span className={inner}>
          <span className={`${mark} rotate-12`} />
        </span>
      </span>
    );
  if (props.name === 'badge')
    return (
      <span className={shell} aria-hidden>
        <span className={inner}>
          <span className={`${mark} rounded-full`} />
        </span>
      </span>
    );
  if (props.name === 'target')
    return (
      <span className={shell} aria-hidden>
        <span className={inner}>
          <span className={`${mark} bg-gradient-to-br from-emerald-600 to-emerald-800 ring-4 ring-emerald-600/15`} />
        </span>
      </span>
    );
  return (
    <span className={shell} aria-hidden>
      <span className={inner}>
        <span className={mark} />
      </span>
    </span>
  );
}

export function LandingPage() {
  const meta = {
    title: 'AI SEO 內容生成平台｜SEO工具 × 轉換率導向的 SEO文章產生器',
    description:
      '把關鍵字研究、搜尋意圖、SEO 架構（H1/H2/H3）、SEO 標題與 Meta Description 串成工作流。這不是單純 AI寫文，而是兼顧 SEO 排名與轉換率的 AI SEO 工具。',
    canonicalPath: '/',
    og: {
      type: 'website' as const,
      title: 'AI SEO 內容生成平台｜讓 SEO 不只是排名，而是真正帶來流量與轉換',
      description:
        '用 AI SEO 工具快速產出 SEO內容生成、SEO文章生成與 SEO文案。從意圖到架構到轉換一次完成。',
      url: absoluteUrl('/'),
    },
    twitter: {
      card: 'summary' as const,
    },
  };

  const jsonLd = [
    organizationJsonLd({
      name: siteConfig.legalName,
      url: siteConfig.baseUrl,
      email: siteConfig.emails.support,
    }),
    softwareApplicationJsonLd({
      name: 'AI SEO 內容生成平台',
      description: meta.description,
      url: absoluteUrl('/'),
      brand: siteConfig.brandName,
      offers: { price: '0', priceCurrency: 'TWD' },
    }),
    faqJsonLd(landingFaq.map((x) => ({ question: x.question, answer: x.answer }))),
  ];

  return (
    <MarketingLayout>
      <SeoHead meta={meta} jsonLd={jsonLd} />

      <section className={`${shell} relative pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-24`}>
        <div className="relative z-[1] grid items-start gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-center lg:gap-14 xl:gap-16">
          <div className="min-w-0">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200/60 bg-gradient-to-r from-white via-white to-emerald-50/45 px-3.5 py-1.5 text-xs font-medium text-emerald-950/90 shadow-sm ring-1 ring-emerald-500/10">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 motion-safe:animate-ping rounded-full bg-emerald-400/55 opacity-60 [animation-duration:2.8s]" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600 shadow-[0_0_0_3px_rgba(16,185,129,0.18)]" />
              </span>
              AI SEO 工具 · 轉換率導向的 SEO 內容生成
            </p>
            <h1 className="mt-6 max-w-[20ch] text-3xl font-semibold tracking-tight leading-[1.08] sm:max-w-none sm:text-5xl sm:leading-[1.06]">
              讓 SEO 不只是排名，
              <span className="block mt-2">
                而是真正帶來{' '}
                <span className="relative inline-block">
                  <span className="relative z-[1] bg-gradient-to-r from-emerald-800 to-emerald-600 bg-clip-text text-transparent">
                    流量與轉換
                  </span>
                  <span
                    aria-hidden
                    className="absolute -inset-x-1 -bottom-1 z-0 h-3 rounded-md bg-emerald-500/15"
                  />
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.65] text-zinc-600 sm:max-w-2xl sm:text-lg sm:leading-relaxed">
              這不是單純 AI寫文。從關鍵字、搜尋意圖、SEO 架構到 SEO文案與 CTA，一次產出可被收錄、也更容易成交的內容資產。
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/register"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-medium text-white shadow-sm ring-1 ring-emerald-600/25 transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35"
              >
                免費開始生成
              </Link>
              <Link
                to="/demo"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200/90 bg-white/85 px-6 text-sm font-medium text-zinc-900 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/25"
              >
                查看產品預覽
              </Link>
              <Link
                to="/pricing"
                className="inline-flex h-11 items-center justify-center rounded-xl px-2 text-sm font-medium text-emerald-800 underline decoration-emerald-500/35 underline-offset-4 hover:text-emerald-900 sm:px-4"
              >
                查看價格
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500" aria-label="產品信任摘要">
              {landingHeroMicroTrust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-emerald-500/80" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-4 sm:grid-cols-3 sm:gap-5">
              {[
                { k: '意圖先對焦', v: '寫對答案，不寫百科' },
                { k: '架構先站穩', v: '內容不散、不重做' },
                { k: '轉換寫進去', v: '流量更像客戶' },
              ].map((x) => (
                <div
                  key={x.k}
                  className="rounded-2xl border border-zinc-200/85 bg-gradient-to-b from-white to-zinc-50/45 p-5 shadow-[0_18px_50px_-38px_rgba(24,24,27,0.55)] ring-1 ring-black/[0.03] transition hover:-translate-y-0.5 hover:border-emerald-200/70 hover:shadow-[0_22px_55px_-30px_rgba(24,24,27,0.22)] sm:p-6"
                >
                  <p className="text-xs font-medium text-zinc-500">{x.k}</p>
                  <p className="mt-2 text-sm font-semibold leading-snug text-zinc-900">{x.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="examples" className="scroll-mt-28 min-w-0 lg:justify-self-end lg:w-full">
            <ProductDashboardMock chartGradientId="landing-hero-trend-fill" />
          </div>
        </div>
      </section>

      {/* SaaS 常見：Hero 下方 Logo 雲 */}
      <section className="border-t border-zinc-200/80 bg-white py-12 sm:py-14" aria-label="適用情境與產業範例">
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

      <section className="relative overflow-hidden border-t border-zinc-200/80 bg-white">
        <SectionBackdrop />
        <div className={`relative z-[1] ${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">常見困境</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">你是不是也遇過這些 SEO 問題？</h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              明明做了很多內容，卻沒變成自然流量與詢問？多半不是你不努力，而是缺少「可複製的 SEO 工作流」。
            </p>
          </header>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {painPoints.map((t) => (
              <article
                key={t}
                className="group relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/75 bg-gradient-to-b from-white/90 to-zinc-50/55 p-6 shadow-[0_20px_55px_-42px_rgba(24,24,27,0.65)] ring-1 ring-black/[0.03] transition-all hover:-translate-y-1 hover:border-emerald-200/65 hover:shadow-[0_26px_70px_-34px_rgba(24,24,27,0.24)] sm:p-7"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/35 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
                />
                <p className="text-sm font-semibold leading-snug">{t}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">
                  用 AI SEO 與 SEO工具化流程，把不確定性變成可交付的產出。
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-200/80 bg-zinc-50">
        <SectionBackdrop variant="muted" />
        <div className={`relative z-[1] ${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">核心能力</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              排名是起點，轉換是終點
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              同一套流程服務所有功能：更快完成 SEO 內容生成，讓產出更接近可上架、可交付的商業稿件。
            </p>
            <div className="mt-8">
              <Link
                to="/features"
                className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-800 hover:text-emerald-900"
              >
                查看完整功能
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </header>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {outcomeFeatures.map((f) => (
              <article
                key={f.title}
                className="group flex gap-4 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm ring-1 ring-black/[0.03] transition hover:border-emerald-200/70 hover:shadow-[0_20px_50px_-38px_rgba(16,185,129,0.18)] sm:gap-5 sm:p-7"
              >
                <FeatureIconMark name={f.icon as FeatureIcon} />
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight leading-snug">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">{f.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 差異化：對照「聊天型 AI」 */}
      <section className="relative overflow-hidden border-t border-zinc-200/80 bg-white">
        <SectionBackdrop />
        <div className={`relative z-[1] ${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">{landingDifferentiators.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{landingDifferentiators.title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              {landingDifferentiators.subtitle}
            </p>
          </header>
          <div className="mt-12 grid gap-5 lg:grid-cols-3 lg:gap-6">
            {landingDifferentiators.bullets.map((b) => (
              <article
                key={b.title}
                className="rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/40 p-6 shadow-sm ring-1 ring-black/[0.03] sm:p-7"
              >
                <p className="text-sm font-semibold text-zinc-900">{b.title}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-200/80 bg-zinc-50" aria-labelledby="workflow-title">
        <SectionBackdrop variant="muted" />
        <div className={`relative z-[1] ${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">操作流程</Eyebrow>
            <h2 id="workflow-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              五步完成：從關鍵字到可上架內容
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              每一步都有清楚產出，方便你複製節奏、與團隊對齊交付。
            </p>
          </header>

          <div className="mt-12 rounded-[28px] border border-zinc-200/75 bg-white p-6 shadow-sm ring-1 ring-black/[0.03] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0" aria-label="SEO 工作流程">
              {workflowSteps.map((s, i) => (
                <Fragment key={s.title}>
                  <div
                    className="flex flex-1 flex-col rounded-2xl border border-zinc-200/75 bg-zinc-50/50 p-5 sm:p-6"
                    role="group"
                    aria-label={`步驟 ${i + 1}：${s.title}`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800/80">
                      步驟 {i + 1}
                    </p>
                    <h3 className="mt-3 text-sm font-semibold leading-snug text-zinc-900">{s.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{s.detail}</p>
                  </div>
                  {i < workflowSteps.length - 1 ? (
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

      <section className="relative overflow-hidden border-t border-zinc-200/80 bg-white">
        <SectionBackdrop />
        <div className={`relative z-[1] ${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">信任背書</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              被信任的內容系統，而不是一次性的 AI 寫文
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              下列為品牌情境範例。實際成效會依產業、競爭強度與內容策略而異；我們協助您先把流程做穩，再逐步放大產能。
            </p>
          </header>

          <div className="mt-12 grid gap-5 sm:gap-6 lg:grid-cols-4">
            {socialProof.metrics.map((m) => (
              <div
                key={m.k}
                className="flex flex-col rounded-2xl border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/40 p-6 shadow-[0_20px_55px_-44px_rgba(24,24,27,0.55)] ring-1 ring-black/[0.025] transition hover:-translate-y-0.5 hover:border-emerald-200/55 hover:shadow-[0_22px_58px_-34px_rgba(24,24,27,0.20)] sm:p-7"
              >
                <p className="text-xs font-medium text-zinc-500">{m.k}</p>
                <p className="mt-3 bg-gradient-to-br from-emerald-900 via-emerald-700 to-zinc-700 bg-clip-text text-2xl font-semibold tracking-tight tabular-nums text-transparent">
                  {m.v}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600">{m.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-[28px] border border-zinc-200/75 bg-gradient-to-br from-white via-zinc-50/35 to-emerald-50/20 p-6 shadow-[0_22px_70px_-46px_rgba(24,24,27,0.5)] ring-1 ring-black/[0.03] sm:p-8">
            <p className="text-center text-xs font-semibold uppercase tracking-wide text-zinc-500">
              品牌合作情境（範例）
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4 [&>*]:text-center">
              {socialProof.logos.map((x) => (
                <div
                  key={x}
                  className="flex items-center justify-center rounded-2xl border border-zinc-200/70 bg-white/70 px-4 py-3 text-xs font-semibold text-zinc-700 opacity-90 shadow-[0_10px_28px_-26px_rgba(24,24,27,0.45)] transition hover:border-emerald-200/60 hover:bg-white hover:opacity-100"
                >
                  {x}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {socialProof.testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex flex-col rounded-[28px] border border-zinc-200/80 bg-gradient-to-b from-white to-zinc-50/45 p-6 shadow-[0_24px_72px_-46px_rgba(24,24,27,0.55)] ring-1 ring-black/[0.03] transition hover:border-emerald-200/45 sm:p-8"
              >
                <blockquote className="flex-1 text-sm leading-relaxed text-zinc-700">「{t.quote}」</blockquote>
                <figcaption className="mt-6 flex flex-col gap-1 border-t border-zinc-200/80 pt-5 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold text-zinc-700">{t.name}</span>
                  <span>{t.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 價格導流 */}
      <section className="border-t border-zinc-200/80 bg-gradient-to-b from-emerald-50/40 to-white py-16 sm:py-20">
        <div className={`${shell} flex flex-col items-center text-center`}>
          <h2 className="max-w-xl text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
            {landingPricingTeaser.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
            {landingPricingTeaser.body}
          </p>
          <Link
            to="/pricing"
            className="mt-8 inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-900 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35"
          >
            {landingPricingTeaser.cta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-200/80 bg-zinc-50" aria-labelledby="faq-title">
        <SectionBackdrop variant="muted" />
        <div className={`relative z-[1] ${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">問答</Eyebrow>
            <h2 id="faq-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              常見問題（FAQ）
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              你可能在意的：AI SEO 是否影響排名、SEO工具是否適合新手、以及如何把 SEO文章產生器用在不同產業。
            </p>
          </header>

          <div className="mt-12 lg:mx-auto lg:max-w-3xl">
            <FaqAccordion items={[...landingFaq]} />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-zinc-200/80 bg-gradient-to-b from-zinc-50/80 via-white to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-emerald-500/[0.06] to-transparent"
        />
        <div className={`relative z-[1] ${shell} ${sectionY}`}>
          <div className="rounded-[28px] bg-gradient-to-br from-emerald-400/25 via-emerald-500/15 to-zinc-300/40 p-px shadow-[0_20px_70px_-40px_rgba(16,185,129,0.35)] ring-1 ring-emerald-600/10">
            <div className="relative overflow-hidden rounded-[27px] border border-white/80 bg-gradient-to-br from-white via-emerald-50/35 to-zinc-50/90 px-8 py-12 text-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-12 sm:py-14 lg:px-16 lg:py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 size-[240px] rounded-full bg-emerald-400/[0.07]"
              />
              <div className="relative z-[1]">
                <div className="max-w-3xl">
                  <Eyebrow className="text-emerald-900/90" accentClassName="from-emerald-600/75 to-transparent">
                    下一步
                  </Eyebrow>
                  <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
                    開始建立真正能帶來流量的 SEO 內容
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-zinc-600 sm:text-base">
                    把 SEO 內容生成變成可商業化流程：更快、品質更一致，且更重視轉換率。
                  </p>
                </div>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to="/register"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm ring-1 ring-emerald-600/25 transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35"
                  >
                    免費開始
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200/90 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/25"
                  >
                    立即體驗
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-emerald-800 underline decoration-emerald-500/35 underline-offset-4 hover:text-emerald-900"
                  >
                    先看方案與配額
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

