import { Search, TrendingUp, DollarSign, Target } from 'lucide-react';
import { useState } from 'react';
import { Toast } from './Toast';

interface KeywordsProps {
  onNavigate: (page: string) => void;
}

export function Keywords({ onNavigate }: KeywordsProps) {
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);

  const handleAnalyze = () => {
    setToast({
      type: 'info',
      message: '尚未串接關鍵字資料源；串接後搜尋結果會顯示在下方表格。',
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="mb-2">關鍵字研究</h1>
        <p className="text-muted-foreground">
          分析關鍵字搜尋量、競爭度與潛力（資料將於接上第三方 API 後顯示；目前可為空）
        </p>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border mb-6">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="輸入主題關鍵字（例如：AI 行銷）"
            className="flex-1 min-w-[200px] px-4 py-3 bg-input-background rounded-lg"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="button"
            onClick={handleAnalyze}
            className="bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl px-8 py-3 flex items-center gap-2 hover:from-brand-deep hover:to-brand-strong transition-all shrink-0"
          >
            <Search className="w-5 h-5" />
            <span>分析關鍵字</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-5 h-5 text-brand-link" />
            <p className="text-sm text-muted-foreground">總搜尋量</p>
          </div>
          <p className="text-2xl font-semibold text-muted-foreground">—</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <Target className="w-5 h-5 text-slate-600" />
            <p className="text-sm text-muted-foreground">平均 KD</p>
          </div>
          <p className="text-2xl font-semibold text-muted-foreground">—</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign className="w-5 h-5 text-green-600" />
            <p className="text-sm text-muted-foreground">平均 CPC</p>
          </div>
          <p className="text-2xl font-semibold text-muted-foreground">—</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            <p className="text-sm text-muted-foreground">高潛力關鍵字</p>
          </div>
          <p className="text-2xl font-semibold text-muted-foreground">—</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium">關鍵字</th>
              <th className="text-left p-4 font-medium">搜尋量</th>
              <th className="text-left p-4 font-medium">趨勢</th>
              <th className="text-left p-4 font-medium">KD</th>
              <th className="text-left p-4 font-medium">CPC</th>
              <th className="text-left p-4 font-medium">潛力</th>
              <th className="text-left p-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border">
              <td colSpan={7} className="p-16 text-center text-muted-foreground text-sm">
                尚無關鍵字資料。接上資料源後，結果會列出於此；您也可直接前往
                <button
                  type="button"
                  onClick={() => onNavigate('new-article')}
                  className="mx-1 text-brand-link font-medium hover:underline"
                >
                  新增文章
                </button>
                手動輸入主題。
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
