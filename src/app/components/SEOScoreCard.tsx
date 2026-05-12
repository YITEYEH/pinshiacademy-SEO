import { useMemo } from 'react';
import { TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { computeSeoSnapshot, type SeoSnapshot } from '@/lib/seoScore';

type ParagraphInput = { title: string; content: string };

type SEOScoreCardProps = {
  primaryKeyword?: string;
  seoTitle?: string;
  metaDescription?: string;
  paragraphs?: ParagraphInput[];
};

const STATIC_SNAPSHOT: SeoSnapshot = {
  score: 72,
  ratingLabel: '良好',
  metrics: [
    { label: '關鍵字覆蓋', score: 70, status: 'warning', value: '—' },
    { label: 'H2 結構', score: 75, status: 'good', value: '—' },
    { label: '內容長度', score: 68, status: 'warning', value: '—' },
  ],
  suggestions: [{ type: 'info', text: '在「新增文章」完成內容後，此處會顯示即時規則評分。' }],
};

export function SEOScoreCard(props: SEOScoreCardProps) {
  const snapshot = useMemo(() => {
    if (props.paragraphs && props.paragraphs.length > 0 && props.primaryKeyword !== undefined) {
      return computeSeoSnapshot({
        primaryKeyword: props.primaryKeyword,
        seoTitle: props.seoTitle ?? '',
        metaDescription: props.metaDescription ?? '',
        paragraphs: props.paragraphs,
      });
    }
    return STATIC_SNAPSHOT;
  }, [props.paragraphs, props.primaryKeyword, props.seoTitle, props.metaDescription]);

  const { score, ratingLabel, metrics, suggestions } = snapshot;

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-brand to-brand-deep rounded-2xl p-6 text-white">
        <div className="text-center mb-4">
          <div className="relative inline-flex items-center justify-center mb-3">
            <svg className="w-32 h-32 transform -rotate-90" aria-hidden>
              <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="none" />
              <circle
                cx="64"
                cy="64"
                r="56"
                stroke="white"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 56}`}
                strokeDashoffset={`${2 * Math.PI * 56 * (1 - score / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold">{score}</span>
            </div>
          </div>
          <p className="text-sm opacity-90">SEO 總分（規則式）</p>
        </div>
        <div className="bg-white/10 rounded-lg p-3 backdrop-blur">
          <p className="text-xs opacity-90 mb-1">評級</p>
          <p className="font-semibold">{ratingLabel}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border">
        <h4 className="mb-4">分項評分</h4>
        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{metric.value}</span>
                  {metric.status === 'good' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                  )}
                </div>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    metric.status === 'good'
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : 'bg-gradient-to-r from-orange-500 to-orange-600'
                  }`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-border">
        <h4 className="mb-4">改善建議</h4>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg flex items-start gap-3 ${
                suggestion.type === 'success'
                  ? 'bg-green-50 border border-green-200'
                  : suggestion.type === 'warning'
                    ? 'bg-orange-50 border border-orange-200'
                    : 'bg-slate-50 border border-slate-200'
              }`}
            >
              {suggestion.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
              ) : suggestion.type === 'warning' ? (
                <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 shrink-0" />
              ) : (
                <TrendingUp className="w-4 h-4 text-brand-link mt-0.5 shrink-0" />
              )}
              <p
                className={`text-sm ${
                  suggestion.type === 'success'
                    ? 'text-green-700'
                    : suggestion.type === 'warning'
                      ? 'text-orange-700'
                      : 'text-brand-deep'
                }`}
              >
                {suggestion.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-6">
        <h4 className="mb-3">內部連結建議</h4>
        <p className="text-sm text-muted-foreground mb-4">發布後於 CMS 加入站內連結，可提升主題權威度。</p>
        <div className="space-y-2">
          {['相關主題文章 A', '相關主題文章 B', '服務／產品頁'].map((link, index) => (
            <div
              key={index}
              className="w-full text-left px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-muted-foreground"
            >
              {link}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
