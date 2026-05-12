import { FileText, Search } from 'lucide-react';

interface KeywordsProps {
  onNavigate: (page: string) => void;
}

/** 關鍵字資料 API 尚未串接：不顯示假表格與假統計，避免誤導。 */
export function Keywords({ onNavigate }: KeywordsProps) {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="mb-2">關鍵字研究</h1>
          <p className="text-muted-foreground">
            搜尋量、KD、CPC 等需串接第三方關鍵字 API（僅能放在後端／Edge Function）。上線前不在此提供假數據。
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-white p-8 shadow-sm">
          <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-muted">
            <Search className="size-7 text-muted-foreground" aria-hidden />
          </div>
          <h2 className="mb-2 text-lg font-semibold">尚未串接資料源</h2>
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            您仍可在「新增文章」手動輸入主關鍵字與主題；系統會依您輸入的內容生成架構與草稿。關鍵字研究儀表板將在 API 就緒後啟用。
          </p>
          <button
            type="button"
            onClick={() => onNavigate('new-article')}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-deep py-3.5 px-6 text-sm font-medium text-white transition-all hover:from-brand-deep hover:to-brand-strong sm:w-auto"
          >
            <FileText className="size-5" aria-hidden />
            前往新增文章
          </button>
        </div>
      </div>
    </div>
  );
}
