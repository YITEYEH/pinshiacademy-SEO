import { TrendingUp, FileText, List, AlertCircle } from 'lucide-react';

export function CompetitorAnalysis() {
  const analysis = {
    avgWords: 3200,
    avgH2: 7,
    topTitles: [
      '2024 最佳 AI 行銷工具推薦與比較',
      'AI 行銷自動化完整指南',
      '10 個必備的 AI 行銷工具',
    ],
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-6 h-6 text-slate-600" />
        <h3 className="mb-0">競爭對手分析</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-slate-600" />
            <p className="text-sm text-muted-foreground">平均文章字數</p>
          </div>
          <p className="text-2xl font-semibold text-slate-700">{analysis.avgWords.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <List className="w-4 h-4 text-slate-600" />
            <p className="text-sm text-muted-foreground">平均 H2 數量</p>
          </div>
          <p className="text-2xl font-semibold text-slate-700">{analysis.avgH2} 個</p>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-slate-200 mb-4">
        <p className="text-sm font-medium mb-3">前 3 名競爭標題</p>
        <div className="space-y-2">
          {analysis.topTitles.map((title, index) => (
            <div key={index} className="flex items-start gap-2 text-sm">
              <span className="text-slate-600 font-medium">{index + 1}.</span>
              <span className="text-muted-foreground">{title}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-orange-100 border border-orange-300 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm">
          <p className="text-orange-900 font-medium mb-1">建議</p>
          <p className="text-orange-700">您的文章字數建議提升至 3000 字以上，並增加至少 2 個 H2 段落以提升競爭力。</p>
        </div>
      </div>
    </div>
  );
}
