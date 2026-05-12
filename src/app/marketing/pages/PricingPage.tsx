import { Fragment } from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router';
import { cn } from '@/app/components/ui/utils';
import { FaqAccordion } from '@/app/marketing/components/FaqAccordion';
import { MarketingLayout } from '@/app/marketing/components/MarketingLayout';
import {
  pricingComparisonSections,
  pricingPageFaq,
  pricingPageFootnote,
  pricingPageIntro,
  pricingPlans,
} from '@/app/marketing/marketingCopy';
import { SeoHead } from '@/app/seo/SeoHead';
import { absoluteUrl } from '@/app/seo/siteConfig';

const shell = 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8';

function CompareCell(props: { value: string | boolean }) {
  if (typeof props.value === 'boolean') {
    return props.value ? (
      <Check className="mx-auto size-5 text-emerald-600" strokeWidth={2.25} aria-label="包含" />
    ) : (
      <X className="mx-auto size-5 text-zinc-200" strokeWidth={2} aria-label="不包含" />
    );
  }
  return <span className="text-sm leading-snug text-zinc-700">{props.value}</span>;
}

export function PricingPage() {
  const faqItems = pricingPageFaq.map((x) => ({ question: x.q, answer: x.a }));

  return (
    <MarketingLayout>
      <SeoHead
        meta={{
          title: '價格｜Free NT$0、Pro NT$399、Team NT$1,990｜AI SEO 方案',
          description:
            '月繳方案與完整功能比較：Free 試用配額、Pro 全文生成與 SEO 工作流、Team 五人協作與發布整合。',
          canonicalPath: '/pricing',
          og: { type: 'website', url: absoluteUrl('/pricing') },
          twitter: { card: 'summary' },
        }}
      />

      {/* Hero — 典型 SaaS 置中標題 */}
      <section className={`${shell} pt-14 pb-10 text-center sm:pt-20 sm:pb-14`}>
        <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-emerald-900/85">
          <span className="h-px w-8 bg-gradient-to-r from-emerald-600/75 to-transparent" aria-hidden />
          方案與定價
        </p>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
          {pricingPageIntro.title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-relaxed text-zinc-600 sm:text-lg">
          {pricingPageIntro.subtitle}
        </p>

        {/* 計費周期 — 常見分段開關（目前僅月繳） */}
        <div className="mx-auto mt-10 inline-flex rounded-full border border-zinc-200/90 bg-white p-1 shadow-sm ring-1 ring-black/[0.03]">
          <span className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white shadow-sm">月繳</span>
          <button
            type="button"
            disabled
            className="rounded-full px-5 py-2 text-sm font-medium text-zinc-400 cursor-not-allowed"
            title="尚未開放"
          >
            年繳（即將開放）
          </button>
        </div>
      </section>

      {/* 方案卡 */}
      <section className={`${shell} pb-16 sm:pb-20`}>
        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch lg:gap-5">
          {pricingPlans.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                'relative flex h-full flex-col rounded-3xl border bg-white/90 p-8 shadow-sm ring-1 ring-black/[0.03]',
                plan.featured
                  ? 'border-emerald-200/80 lg:z-10 lg:shadow-[0_24px_80px_-40px_rgba(16,185,129,0.35)]'
                  : 'border-zinc-200/90',
              )}
            >
              {plan.featured ? (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-semibold text-white shadow-sm">
                  最多人選擇
                </div>
              ) : null}

              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold tracking-tight text-zinc-950">{plan.name}</h2>
                  <p className="mt-1 text-xs font-medium text-emerald-800/90">{plan.tagline}</p>
                </div>
                {'seatNote' in plan && plan.seatNote ? (
                  <span className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-semibold text-zinc-700">
                    {plan.seatNote}
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-zinc-600">{plan.cardDescription}</p>

              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-[2.75rem]">
                  {plan.priceDisplay}
                </span>
                <span className="text-sm font-medium text-zinc-500">{plan.period}</span>
              </div>
              <p className="mt-3 shrink-0 text-xs leading-relaxed text-zinc-500">{plan.quotaTeaser}</p>

              {/* flex-1 頂開摘要與 CTA，三張卡等高時按鈕會落在同一水平線 */}
              <div className="mt-8 flex min-h-0 flex-1 flex-col">
                <div className="min-h-4 flex-1" aria-hidden />
                <div className="shrink-0 border-t border-zinc-100 pt-6">
                  {'includedSubtitle' in plan && plan.includedSubtitle ? (
                    <p className="mb-3 text-xs font-medium text-zinc-500">{plan.includedSubtitle}</p>
                  ) : null}
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-400">重點摘要</p>
                  <ul className="mt-3 space-y-2.5">
                    {plan.cardBullets.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-zinc-700">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" strokeWidth={2.25} aria-hidden />
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                  {plan.id === 'free' ? (
                    <p className="mt-5 text-xs leading-relaxed text-zinc-500">
                      高轉換模式、品牌語氣、改寫與匯出等請見{' '}
                      <a
                        href="#compare"
                        className="font-medium text-emerald-700 underline decoration-emerald-600/30 underline-offset-4 hover:text-emerald-800"
                      >
                        下方完整比較
                      </a>
                      。
                    </p>
                  ) : (
                    <p className="mt-5 text-xs text-zinc-500">
                      <a
                        href="#compare"
                        className="font-medium text-emerald-700 underline decoration-emerald-600/30 underline-offset-4 hover:text-emerald-800"
                      >
                        查看完整功能列表
                      </a>
                    </p>
                  )}
                </div>
                <div className="mt-6 shrink-0">
                  <Link
                    to={plan.ctaTo}
                    className={cn(
                      'inline-flex h-11 w-full box-border items-center justify-center rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/35 focus-visible:ring-offset-2',
                      plan.featured
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                        : 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50',
                    )}
                  >
                    {plan.ctaLabel}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 方案比較表 */}
      <section id="compare" className="scroll-mt-24 border-t border-zinc-200/80 bg-zinc-50/40 py-16 sm:py-20">
        <div className={shell}>
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">完整方案比較</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 sm:text-base">
              以表格一次對照用量與功能；若你正在評估導入範圍，建議從 Pro 開始試算產能。
            </p>
          </div>

          <div className="mt-10 overflow-x-auto rounded-2xl border border-zinc-200/90 bg-white shadow-sm ring-1 ring-black/[0.03]">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <thead>
                <tr className="border-b border-zinc-200 bg-zinc-50/80">
                  <th scope="col" className="sticky left-0 z-20 min-w-[180px] bg-zinc-50/95 px-5 py-4 text-xs font-semibold uppercase tracking-wide text-zinc-500 backdrop-blur-sm">
                    功能
                  </th>
                  {pricingPlans.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={cn(
                        'px-5 py-4 text-center',
                        p.featured && 'bg-emerald-50/90 text-emerald-950',
                      )}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-sm font-semibold text-zinc-950">{p.name}</span>
                        <span className="text-xs font-medium text-zinc-500">
                          {p.priceDisplay}
                          {p.period}
                        </span>
                        {p.featured ? (
                          <span className="mt-1 rounded-full bg-emerald-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                            最受歡迎
                          </span>
                        ) : null}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pricingComparisonSections.map((section) => (
                  <Fragment key={section.title}>
                    <tr className="border-b border-zinc-100 bg-white">
                      <td
                        colSpan={4}
                        className="sticky left-0 bg-white px-5 py-3 text-xs font-bold uppercase tracking-wide text-zinc-400"
                      >
                        {section.title}
                      </td>
                    </tr>
                    {section.rows.map((row) => (
                      <tr key={row.label} className="border-b border-zinc-100 last:border-b-0">
                        <th
                          scope="row"
                          className="sticky left-0 z-10 bg-white/95 px-5 py-3.5 text-sm font-medium text-zinc-900 backdrop-blur-sm"
                        >
                          {row.label}
                        </th>
                        <td className="px-5 py-3.5 text-center align-middle">
                          <CompareCell value={row.free} />
                        </td>
                        <td className="bg-emerald-50/35 px-5 py-3.5 text-center align-middle">
                          <CompareCell value={row.pro} />
                        </td>
                        <td className="px-5 py-3.5 text-center align-middle">
                          <CompareCell value={row.team} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-8 text-sm leading-relaxed text-zinc-600">{pricingPageFootnote}</p>
        </div>
      </section>

      {/* 價格頁常見問題 */}
      <section className={`${shell} py-16 sm:py-20`}>
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">定價常見問題</h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-600">
          仍不確定選哪個方案？可先從 Free 建立流程，需要更高產能再升級 Pro。
        </p>
        <div className="mt-10 max-w-3xl">
          <FaqAccordion items={faqItems} />
        </div>
      </section>
    </MarketingLayout>
  );
}
