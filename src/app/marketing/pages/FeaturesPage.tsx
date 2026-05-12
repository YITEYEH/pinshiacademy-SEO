import type { ComponentType, KeyboardEvent } from 'react';
import type { ReactNode } from 'react';
import { Fragment, useId, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  Check,
  FileSpreadsheet,
  LayoutGrid,
  LayoutTemplate,
  ListOrdered,
  Sparkles,
  Target,
} from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { FaqAccordion } from '@/app/marketing/components/FaqAccordion';
import { MarketingLayout } from '@/app/marketing/components/MarketingLayout';
import { SeoHead } from '@/app/seo/SeoHead';
import { absoluteUrl } from '@/app/seo/siteConfig';
import {
  featuresPageAudiences,
  featuresPageCapabilityIntro,
  featuresPageComparison,
  featuresPageDeliverables,
  featuresPageHeroTrust,
  featuresPageModules,
  featuresPageModulesIntro,
  featuresPageSectionNav,
  featuresPageSpotlightIntro,
  featuresPageWorkflowIntro,
  landingFaq,
  outcomeFeatures,
  workflowSteps,
} from '@/app/marketing/marketingCopy';

const shell = 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8';
const sectionY = 'py-16 sm:py-20 lg:py-28';
const scrollOffset = 'scroll-mt-[5.5rem]';

const capabilityIcons = {
  layout: LayoutGrid,
  sparkles: Sparkles,
  badge: BadgeCheck,
  target: Target,
} as const satisfies Record<(typeof outcomeFeatures)[number]['icon'], ComponentType<{ className?: string }>>;

const spotlightVisualIcons = [LayoutTemplate, ListOrdered, FileSpreadsheet] as const;

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

const heroMockTabs = [
  { id: 'body', label: '正文草稿' },
  { id: 'meta', label: 'Meta' },
  { id: 'faq', label: 'FAQ' },
  { id: 'cta', label: 'CTA 提示' },
] as const;

type HeroMockTabId = (typeof heroMockTabs)[number]['id'];

function FeaturesHeroMock() {
  const baseId = useId();
  const [active, setActive] = useState<HeroMockTabId>('body');
  const tabIds = heroMockTabs.map((t) => t.id);

  function focusTabButton(id: HeroMockTabId) {
    document.getElementById(`${baseId}-tab-${id}`)?.focus();
  }

  function goTab(delta: number) {
    const i = tabIds.indexOf(active);
    const next = tabIds[(i + delta + tabIds.length) % tabIds.length]!;
    setActive(next);
    queueMicrotask(() => focusTabButton(next));
  }

  function onTablistKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTab(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTab(-1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setActive(tabIds[0]!);
      queueMicrotask(() => focusTabButton(tabIds[0]!));
    } else if (e.key === 'End') {
      e.preventDefault();
      const last = tabIds[tabIds.length - 1]!;
      setActive(last);
      queueMicrotask(() => focusTabButton(last));
    }
  }

  return (
    <div className="rounded-[24px] bg-gradient-to-br from-emerald-400/22 via-emerald-500/12 to-zinc-300/45 p-px shadow-[0_24px_70px_-40px_rgba(16,185,129,0.28)] ring-1 ring-emerald-600/10">
      <div className="overflow-hidden rounded-[23px] border border-white/80 bg-gradient-to-b from-white to-zinc-50/95">
        <div className="flex items-center justify-between gap-3 border-b border-zinc-100 bg-white/90 px-5 py-3">
          <p className="text-xs font-medium text-zinc-800">專案草稿 · SEO 工作流程</p>
          <span className="rounded-full bg-emerald-500/12 px-2 py-0.5 text-[11px] font-semibold text-emerald-900">
            即時預覽
          </span>
        </div>
        <div className="space-y-3 p-5">
          <div className="rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">搜尋意圖</p>
            <p className="mt-2 text-sm font-semibold text-zinc-900">教學 · 比較 · 選購</p>
          </div>
          <div className="rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">H2 架構（片段）</p>
            <ul className="mt-2 space-y-1.5 text-xs leading-snug text-zinc-700">
              <li>為什麼現在就需要解法？</li>
              <li>如何做對 SEO 架構與段落節奏？</li>
              <li>下一步該如何行動？</li>
            </ul>
          </div>
          <div
            role="tablist"
            aria-label="預覽素材類型"
            className="flex min-w-0 gap-2"
            onKeyDown={onTablistKeyDown}
          >
            {heroMockTabs.map((t) => {
              const selected = active === t.id;
              const isCta = t.id === 'cta';
              return (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${t.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel-${t.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(t.id)}
                  className={cn(
                    'box-border flex h-9 min-h-9 min-w-0 flex-1 basis-0 items-center justify-center truncate rounded-lg border px-1.5 text-[11px] font-semibold leading-none shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/40 focus-visible:ring-offset-2',
                    selected &&
                      (isCta
                        ? 'border-emerald-700 bg-emerald-700 text-white'
                        : 'border-zinc-900 bg-zinc-900 text-white'),
                    !selected &&
                      (isCta
                        ? 'border-emerald-200 bg-emerald-50/80 text-emerald-900 hover:bg-emerald-100/90'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50'),
                  )}
                >
                  <span className="block min-w-0 max-w-full truncate text-center">{t.label}</span>
                </button>
              );
            })}
          </div>

          <div className="grid min-w-0 [&>*]:col-start-1 [&>*]:row-start-1">
            <div
              role="tabpanel"
              id={`${baseId}-panel-body`}
              aria-labelledby={`${baseId}-tab-body`}
              aria-hidden={active !== 'body'}
              className={cn(
                'rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm',
                active === 'body' ? 'relative z-10' : 'invisible pointer-events-none',
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">正文（示範片段）</p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-700">
                當讀者已理解問題背景，下一段應以可執行步驟收斂：先界定適用情境，再提供檢核清單與常見誤區，最後以可驗證的結果描述收尾，便於主管或客戶快速審稿。
              </p>
            </div>

            <div
              role="tabpanel"
              id={`${baseId}-panel-meta`}
              aria-labelledby={`${baseId}-tab-meta`}
              aria-hidden={active !== 'meta'}
              className={cn(
                'rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm',
                active === 'meta' ? 'relative z-10' : 'invisible pointer-events-none',
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">SERP 素材（示範）</p>
              <p className="mt-2 text-sm font-semibold leading-snug text-zinc-900">
                SEO 架構教學：用 H2／H3 拉出可讀漏斗（含範本）
              </p>
              <p className="mt-2 text-xs leading-relaxed text-zinc-600">
                以實例拆解搜尋意圖、段落任務與 Meta 寫法；附多組標題候選，方便行銷與 SEO 對稿後上架。
              </p>
            </div>

            <div
              role="tabpanel"
              id={`${baseId}-panel-faq`}
              aria-labelledby={`${baseId}-tab-faq`}
              aria-hidden={active !== 'faq'}
              className={cn(
                'rounded-xl border border-zinc-200/80 bg-white p-4 shadow-sm',
                active === 'faq' ? 'relative z-10' : 'invisible pointer-events-none',
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">FAQ（示範）</p>
              <ul className="mt-2 space-y-2 text-xs leading-relaxed text-zinc-700">
                <li>
                  <span className="font-semibold text-zinc-900">和一般長文有什麼不同？</span>
                  <span className="mt-0.5 block text-zinc-600">先定架構與段落任務，降低離題與整篇返工。</span>
                </li>
                <li>
                  <span className="font-semibold text-zinc-900">多久能上到可審稿狀態？</span>
                  <span className="mt-0.5 block text-zinc-600">視主題複雜度；流程固定後通常可明顯縮短初稿時間。</span>
                </li>
              </ul>
            </div>

            <div
              role="tabpanel"
              id={`${baseId}-panel-cta`}
              aria-labelledby={`${baseId}-tab-cta`}
              aria-hidden={active !== 'cta'}
              className={cn(
                'rounded-xl border border-emerald-200/80 bg-emerald-50/50 p-4 shadow-sm',
                active === 'cta' ? 'relative z-10' : 'invisible pointer-events-none',
              )}
            >
              <p className="text-[11px] font-medium uppercase tracking-wide text-emerald-900/80">行動提示（示範）</p>
              <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-emerald-950/90">
                <li>段落中段：引導下載檢核表或預約顧問諮詢。</li>
                <li>結尾前：重申可得結果與下一步時程，降低跳出。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionStickyNav() {
  return (
    <nav
      aria-label="功能頁章節導覽"
      className="sticky top-[4.75rem] z-20 border-b border-zinc-200/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/75"
    >
      <div
        className={`${shell} flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {featuresPageSectionNav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="shrink-0 rounded-full border border-zinc-200/90 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/50 hover:text-emerald-950"
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

const FEATURE_SPOTLIGHT = featuresPageModules.slice(0, 3);
const FEATURE_REST = featuresPageModules.slice(3);

export function FeaturesPage() {
  const faqPreview = landingFaq.slice(0, 4).map((x) => ({ question: x.question, answer: x.answer }));

  return (
    <MarketingLayout>
      <SeoHead
        meta={{
          title: '功能｜AI SEO：架構、文章、Meta 與轉換文案',
          description:
            '從搜尋意圖、標題層級架構、正文草稿到 Meta、FAQ 與行動提示，協助團隊穩定產出結構清楚、利於搜尋與商務追蹤的 SEO 內容。',
          canonicalPath: '/features',
          og: { type: 'website', url: absoluteUrl('/features') },
          twitter: { card: 'summary' },
        }}
      />

      {/* Hero：雙欄 + 產品預覽（類 Linear / Notion 產品頁） */}
      <section className={`${shell} pb-12 pt-14 sm:pb-14 sm:pt-20 lg:pb-16 lg:pt-24`}>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-14">
          <div className="min-w-0 text-center lg:text-left">
            <Eyebrow className="lg:justify-start">產品功能</Eyebrow>
            <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              產品功能總覽
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-lg lg:mx-0">
              將研究、資訊架構、正文與上架所需文案整理為同一套步驟，讓內容團隊與顧問能以一致規格產出：涵蓋{' '}
              <strong className="font-semibold text-zinc-800">SEO 架構</strong>、
              <strong className="font-semibold text-zinc-800">文章草稿</strong>、
              <strong className="font-semibold text-zinc-800">Meta 與標題</strong>
              ，以及<strong className="font-semibold text-zinc-800">轉換節奏與關鍵字布局</strong>
              ，便於審稿、交付與後續改版。
            </p>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-zinc-600 sm:text-[17px] lg:mx-0">
              適用於官網文章、產品說明、教育內容與接案交付等情境，協助在固定節奏下維持品質與產能。
            </p>

            <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-3 lg:mx-0 lg:justify-start">
              <Link
                to="/pricing"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm ring-1 ring-emerald-600/25 transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35"
              >
                查看方案
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                to="/register"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/25"
              >
                免費開始
              </Link>
              <Link
                to="/"
                className="inline-flex h-11 items-center justify-center rounded-xl px-4 text-sm font-semibold text-emerald-800 underline decoration-emerald-500/35 underline-offset-4 hover:text-emerald-900"
              >
                回到首頁
              </Link>
            </div>
            <ul
              className="mx-auto mt-8 flex max-w-xl flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-zinc-500 lg:mx-0 lg:justify-start"
              aria-label="產品信任摘要"
            >
              {featuresPageHeroTrust.map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="size-1 rounded-full bg-emerald-500/80" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="min-w-0 lg:justify-self-end">
            <FeaturesHeroMock />
          </div>
        </div>
      </section>

      <SectionStickyNav />

      {/* 能力速覽 */}
      <section id="capabilities" className={cn('border-t border-zinc-200/80 bg-white', scrollOffset)}>
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">{featuresPageCapabilityIntro.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              {featuresPageCapabilityIntro.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              {featuresPageCapabilityIntro.subtitle}
            </p>
          </header>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {outcomeFeatures.map((f) => {
              const Icon = capabilityIcons[f.icon];
              return (
                <article
                  key={f.title}
                  className="flex flex-col rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm ring-1 ring-black/[0.03] transition hover:border-emerald-200/70 hover:shadow-[0_20px_50px_-38px_rgba(16,185,129,0.14)]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-200/80 bg-gradient-to-br from-white to-zinc-50 text-emerald-800 shadow-sm">
                    <Icon className="size-5" aria-hidden strokeWidth={2} />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold leading-snug text-zinc-950">{f.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600">{f.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 主打亮點：交錯排版 */}
      <section id="spotlight" className={cn('border-t border-zinc-200/80 bg-zinc-50', scrollOffset)}>
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">{featuresPageSpotlightIntro.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              {featuresPageSpotlightIntro.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              {featuresPageSpotlightIntro.subtitle}
            </p>
          </header>

          <div className="mt-16 flex flex-col gap-16 lg:gap-20">
            {FEATURE_SPOTLIGHT.map((m, i) => {
              const DecorIcon = spotlightVisualIcons[i] ?? LayoutTemplate;
              return (
                <div
                  key={m.title}
                  className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14"
                >
                  <div className={cn(i % 2 === 1 && 'lg:order-2')}>
                    <div
                      className={cn(
                        'rounded-[28px] border border-zinc-200/80 bg-gradient-to-br p-8 shadow-sm ring-1 ring-black/[0.03] sm:p-10',
                        i === 0 && 'from-emerald-50/90 via-white to-white',
                        i === 1 && 'from-white via-zinc-50/80 to-white',
                        i === 2 && 'from-white via-emerald-50/40 to-zinc-50/90',
                      )}
                    >
                      <DecorIcon className="size-10 text-emerald-700" strokeWidth={1.75} aria-hidden />
                      <p className="mt-6 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
                        重點模組 · {String(i + 1).padStart(2, '0')}
                      </p>
                      <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-700">
                        {m.bullets.slice(0, 2).map((b) => (
                          <li key={b} className="flex gap-2">
                            <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" strokeWidth={2.25} aria-hidden />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className={cn(i % 2 === 1 && 'lg:order-1')}>
                    <h3 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">{m.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-600 sm:text-base">{m.summary}</p>
                    <ul className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-700">
                      {m.bullets.map((b) => (
                        <li key={b} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" strokeWidth={2.25} aria-hidden />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 其餘模組 */}
      <section id="modules" className={cn('border-t border-zinc-200/80 bg-white', scrollOffset)}>
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">{featuresPageModulesIntro.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              {featuresPageModulesIntro.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              {featuresPageModulesIntro.subtitle}
            </p>
          </header>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:gap-6">
            {FEATURE_REST.map((m) => (
              <article
                key={m.title}
                className="flex flex-col rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm ring-1 ring-black/[0.03] transition hover:border-emerald-200/70 hover:shadow-[0_20px_50px_-38px_rgba(16,185,129,0.14)] sm:p-7"
              >
                <h3 className="text-base font-semibold tracking-tight text-zinc-950">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">{m.summary}</p>
                <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-zinc-700">
                  {m.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" strokeWidth={2.25} aria-hidden />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 交付項目 */}
      <section id="deliverables" className={cn('border-t border-zinc-200/80 bg-zinc-50', scrollOffset)}>
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">輸出物</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              單次流程可產出的項目
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              每個階段皆有清楚產出，便於內部審核、對外說明範圍，以及與設計、上架流程銜接。
            </p>
          </header>

          <div className="mt-12 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm ring-1 ring-black/[0.03]">
            <ul className="grid gap-0 sm:grid-cols-2">
              {featuresPageDeliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 border-b border-zinc-100 p-5 text-sm text-zinc-800 sm:border-r sm:border-zinc-100 [&:nth-child(even)]:sm:border-r-0"
                >
                  <Check className="mt-0.5 size-5 shrink-0 text-emerald-600" strokeWidth={2.25} aria-hidden />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 工作流程 */}
      <section id="workflow" className={cn('border-t border-zinc-200/80 bg-white', scrollOffset)}>
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">{featuresPageWorkflowIntro.eyebrow}</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              {featuresPageWorkflowIntro.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              {featuresPageWorkflowIntro.subtitle}
            </p>
          </header>

          <div className="mt-12 rounded-[28px] border border-zinc-200/75 bg-zinc-50/50 p-6 shadow-sm ring-1 ring-black/[0.03] sm:p-8 lg:p-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0" aria-label="SEO 工作流程">
              {workflowSteps.map((s, i) => (
                <Fragment key={s.title}>
                  <div
                    className="flex flex-1 flex-col rounded-2xl border border-zinc-200/75 bg-white p-5 sm:p-6"
                    role="group"
                    aria-label={`步驟 ${i + 1}：${s.title}`}
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-800/85">
                      步驟 {i + 1}
                    </p>
                    <h3 className="mt-3 text-sm font-semibold text-zinc-950">{s.title}</h3>
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
            <p className="mt-8 text-center text-xs text-zinc-500">
              若需搭配畫面說明，歡迎至{' '}
              <Link to="/" className="font-semibold text-emerald-800 underline decoration-emerald-500/35 underline-offset-4 hover:text-emerald-900">
                首頁產品介紹
              </Link>
              瀏覽。
            </p>
          </div>
        </div>
      </section>

      {/* 對照表 */}
      <section id="compare" className={cn('border-t border-zinc-200/80 bg-zinc-50', scrollOffset)}>
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">產品定位</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              與一般對話式 AI 的差異
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-zinc-600 sm:text-base">
              對話式工具擅長單次生成長文；本平台將「搜尋引擎如何理解主題」與「讀者下一步行動」納入固定流程，產出更利於上架與成效追蹤。
            </p>
          </header>

          <div className="mt-12 overflow-x-auto rounded-2xl border border-zinc-200/90 bg-white shadow-sm ring-1 ring-black/[0.03]">
            <table className="w-full min-w-[560px] border-collapse text-left">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/80">
                  <th
                    scope="col"
                    className="sticky left-0 z-10 min-w-[120px] bg-zinc-50/95 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500 backdrop-blur-sm"
                  >
                    面向
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-zinc-500"
                  >
                    一般 AI
                  </th>
                  <th
                    scope="col"
                    className="bg-emerald-50/90 px-5 py-4 text-center text-xs font-semibold uppercase tracking-wide text-emerald-950"
                  >
                    本平台
                  </th>
                </tr>
              </thead>
              <tbody>
                {featuresPageComparison.map((row) => (
                  <tr key={row.aspect} className="border-b border-zinc-100 last:border-b-0">
                    <th
                      scope="row"
                      className="sticky left-0 bg-white/95 px-5 py-4 text-sm font-semibold text-zinc-900 backdrop-blur-sm"
                    >
                      {row.aspect}
                    </th>
                    <td className="px-5 py-4 text-center text-sm leading-relaxed text-zinc-600">{row.genericAi}</td>
                    <td className="bg-emerald-50/35 px-5 py-4 text-center text-sm leading-relaxed text-zinc-800">
                      {row.ours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 divide-y divide-zinc-100 rounded-2xl border border-zinc-200/90 bg-white shadow-sm ring-1 ring-black/[0.03] md:hidden">
            {featuresPageComparison.map((row) => (
              <div key={row.aspect} className="space-y-3 p-5">
                <h3 className="text-sm font-semibold text-zinc-900">{row.aspect}</h3>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">一般 AI</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{row.genericAi}</p>
                </div>
                <div className="rounded-xl bg-emerald-50/50 px-3 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-900">本平台</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-800">{row.ours}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 適用對象 */}
      <section id="audiences" className={cn('border-t border-zinc-200/80 bg-white', scrollOffset)}>
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">適用對象</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              典型角色與使用情境
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              從企業內容團隊、顧問服務到品牌與創作者，皆能以相同流程對齊產出規格與交付節奏。
            </p>
          </header>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {featuresPageAudiences.map((a) => (
              <article
                key={a.role}
                className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm ring-1 ring-black/[0.03] transition hover:border-emerald-200/65 sm:p-7"
              >
                <h3 className="text-sm font-semibold text-zinc-950">{a.role}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{a.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ 節選 */}
      <section id="faq" className={cn('border-t border-zinc-200/80 bg-zinc-50', scrollOffset)}>
        <div className={`${shell} ${sectionY}`}>
          <header className="mx-auto max-w-3xl text-center">
            <Eyebrow className="w-full justify-center">問答</Eyebrow>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              功能相關常見問題
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
              以下為導入前常見問題；更多說明請見首頁問答區。
            </p>
          </header>
          <div className="mx-auto mt-12 max-w-3xl">
            <FaqAccordion items={faqPreview} />
          </div>
          <p className="mt-10 text-center text-sm text-zinc-600">
            <Link
              to="/#faq-title"
              className="font-semibold text-emerald-800 underline decoration-emerald-500/35 underline-offset-4 hover:text-emerald-900"
            >
              前往首頁查看完整 FAQ
            </Link>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-zinc-200/80 bg-gradient-to-b from-zinc-50/80 via-white to-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-emerald-500/[0.06] to-transparent"
        />
        <div className={`relative z-[1] ${shell} ${sectionY}`}>
          <div className="rounded-[28px] bg-gradient-to-br from-emerald-400/25 via-emerald-500/15 to-zinc-300/40 p-px shadow-[0_20px_70px_-40px_rgba(16,185,129,0.35)] ring-1 ring-emerald-600/10">
            <div className="relative overflow-hidden rounded-[27px] border border-white/80 bg-gradient-to-br from-white via-emerald-50/35 to-zinc-50/90 px-8 py-12 text-zinc-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:px-12 sm:py-14">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 size-[240px] rounded-full bg-emerald-400/[0.07]"
              />
              <div className="relative z-[1] max-w-3xl">
                <Eyebrow className="text-emerald-900/90" accentClassName="from-emerald-600/75 to-transparent">
                  下一步
                </Eyebrow>
                <h2 className="text-xl font-semibold tracking-tight text-zinc-950 sm:text-2xl">
                  準備導入固定節奏的 SEO 內容產線？
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 sm:text-base">
                  以一致結構與交付規格支援團隊產能，並在段落設計中納入轉換與追蹤所需元素。
                </p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <Link
                    to="/register"
                    className="inline-flex h-11 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-semibold text-white shadow-sm ring-1 ring-emerald-600/25 transition hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35"
                  >
                    免費開始
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200/90 bg-white px-6 text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/25"
                  >
                    查看方案與配額
                    <ArrowRight className="size-4" aria-hidden />
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
