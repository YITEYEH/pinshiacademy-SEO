import type { ReactNode } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { cn } from '@/app/components/ui/utils';

function GradientFrame(props: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[28px] bg-gradient-to-br from-emerald-500/28 via-zinc-900/[0.10] to-zinc-300/90 p-px shadow-[0_20px_70px_-36px_rgba(24,24,27,0.22)]',
        props.className,
      )}
    >
      <div className="overflow-hidden rounded-[27px]">{props.children}</div>
    </div>
  );
}

/** 首頁 Hero／產品預覽頁共用的介面預覽（範例資料） */
export function ProductDashboardMock(props: { chartGradientId?: string }) {
  const gid = props.chartGradientId ?? 'product-dashboard-trend-fill';

  const trend = [
    { t: 'Mon', v: 18 },
    { t: 'Tue', v: 24 },
    { t: 'Wed', v: 22 },
    { t: 'Thu', v: 31 },
    { t: 'Fri', v: 46 },
    { t: 'Sat', v: 52 },
    { t: 'Sun', v: 61 },
  ];

  return (
    <GradientFrame>
      <div className="border-b border-zinc-200/80 bg-gradient-to-r from-white via-zinc-50/70 to-emerald-50/30 px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-zinc-600">內容工作台</p>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-zinc-500">SEO 評分</span>
            <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold tabular-nums text-emerald-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
              86
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-3 bg-gradient-to-b from-white/95 to-zinc-50/65 p-5 backdrop-blur-sm">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200/80 bg-white/85 p-4 shadow-[0_14px_40px_-32px_rgba(24,24,27,0.55)] ring-1 ring-black/[0.02]">
            <p className="text-[11px] text-zinc-500">關鍵字輸入</p>
            <p className="mt-1 text-sm font-semibold">SEO文章生成</p>
            <p className="mt-2 text-xs leading-relaxed text-zinc-600">
              先判讀讀者真正想解決的問題，再決定段落該寫什麼。
            </p>
          </div>
          <div className="rounded-2xl border border-zinc-200/80 bg-white/85 p-4 shadow-[0_14px_40px_-32px_rgba(24,24,27,0.55)] ring-1 ring-black/[0.02]">
            <p className="text-[11px] text-zinc-500">AI 生成流程</p>
            <div className="mt-2 space-y-2">
              {['意圖分析', 'SEO 架構', 'Meta Description', 'SEO 文案 CTA'].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-600/85" aria-hidden />
                  <p className="text-xs text-zinc-800">{t}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-white/85 p-4 shadow-[0_14px_40px_-32px_rgba(24,24,27,0.45)] ring-1 ring-black/[0.02]">
          <p className="text-[11px] text-zinc-500">Meta Description（範例）</p>
          <p className="mt-1 text-xs leading-relaxed text-zinc-800">
            將關鍵字、搜尋意圖與章節結構串成同一套流程，協助您更快完成可被搜尋、也利於轉換的內容草稿。
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-zinc-200/80 bg-white/85 p-4 shadow-[0_14px_40px_-32px_rgba(24,24,27,0.45)] ring-1 ring-black/[0.02]">
            <p className="text-[11px] text-zinc-500">H2 結構（片段）</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-xs text-zinc-800">
              <li>為什麼需要 AI SEO？</li>
              <li>如何做 SEO優化：架構與意圖</li>
              <li>SEO工具挑選：避免垃圾文</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-zinc-200/80 bg-white/85 p-4 shadow-[0_14px_40px_-32px_rgba(24,24,27,0.45)] ring-1 ring-black/[0.02]">
            <p className="text-[11px] text-zinc-500">流量走勢（參考）</p>
            <div className="mt-2 h-[92px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trend} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="t" hide />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid rgba(228,228,231,1)',
                      background: 'rgba(255,255,255,0.95)',
                      fontSize: 12,
                    }}
                    labelStyle={{ display: 'none' }}
                    formatter={(value) => [`${value}`, '自然流量']}
                  />
                  <Area type="monotone" dataKey="v" stroke="#059669" strokeWidth={2} fill={`url(#${gid})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </GradientFrame>
  );
}
