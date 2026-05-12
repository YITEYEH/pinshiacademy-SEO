import { FileText, Search, Upload, Zap, AlertCircle, TrendingUp, Clock, CheckCircle, HelpCircle } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { OnboardingTour } from './OnboardingTour';
import { listArticles } from '@/lib/articlesRepo';
import { countLlmCompletesThisMonth } from '@/lib/usageRepo';
import { getSupabase } from '@/lib/supabase';
import type { ArticleRow } from '@/lib/database.types';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const navigate = useNavigate();
  const [showTour, setShowTour] = useState(false);
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [llmMonth, setLlmMonth] = useState<number | null>(null);

  const refreshArticles = useCallback(async () => {
    try {
      const rows = await listArticles();
      setArticles(rows);
    } catch {
      setArticles([]);
    }
  }, []);

  useEffect(() => {
    void refreshArticles();
  }, [refreshArticles]);

  useEffect(() => {
    if (!getSupabase()) return;
    void countLlmCompletesThisMonth()
      .then((n) => setLlmMonth(n))
      .catch(() => setLlmMonth(null));
  }, []);

  const articleCount = articles.length;

  const stats = [
    { label: '文章總數（草稿+已發）', value: String(articleCount), icon: FileText },
    {
      label: '本月 AI 完成',
      value: llmMonth === null ? '—' : `${llmMonth} 次`,
      icon: Zap,
    },
  ];

  const recentArticles = articles.slice(0, 3).map((a) => ({
    id: a.id,
    title: a.title,
    date: new Date(a.updated_at).toLocaleDateString('zh-TW'),
    words: a.word_count,
    status: a.status,
  }));

  const statIconShell =
    'w-12 h-12 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center';

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="mb-2">歡迎使用 SEO產生器</h1>
          <p className="text-muted-foreground">透過 AI 快速生成高品質 SEO 內容</p>
        </div>
        <button
          onClick={() => setShowTour(true)}
          className="flex shrink-0 items-center gap-2 self-start rounded-lg border border-border bg-white px-4 py-2 transition-all hover:border-brand-deep"
        >
          <HelpCircle className="w-5 h-5 text-brand-link" />
          <span>新手教學</span>
        </button>
      </div>

      <button
        onClick={() => onNavigate('new-article')}
        className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 hover:from-brand-deep hover:to-brand-strong transition-all shadow-lg shadow-slate-900/10"
      >
        <FileText className="w-6 h-6" />
        <span className="font-semibold">新增 SEO 文章</span>
      </button>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-border shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={statIconShell}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="text-3xl font-semibold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="bg-white rounded-2xl p-4 border border-border sm:p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2>最近文章</h2>
            <button
              onClick={() => onNavigate('articles')}
              className="text-sm text-brand-link hover:text-brand-deep"
            >
              查看全部
            </button>
          </div>

          <div className="space-y-4">
            {recentArticles.length === 0 && (
              <p className="text-sm text-muted-foreground px-2 py-6 text-center">尚無文章，請至「新增文章」或「文章管理」建立草稿。</p>
            )}
            {recentArticles.map((article) => (
              <div
                key={article.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/new-article?draft=${encodeURIComponent(article.id)}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(`/new-article?draft=${encodeURIComponent(article.id)}`);
                  }
                }}
                className="flex flex-col gap-3 rounded-xl p-4 transition-colors hover:bg-accent cursor-pointer sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-brand-link" />
                  </div>
                  <div className="min-w-0">
                    <h4>{article.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.date}
                      </span>
                      <span className="text-sm text-muted-foreground">{article.words} 字</span>
                    </div>
                  </div>
                </div>
                <div>
                  {article.status === 'published' ? (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      已發布
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
                      草稿
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-border">
            <h3 className="mb-4">快速操作</h3>
            <div className="space-y-3">
              <button
                onClick={() => onNavigate('new-article')}
                className="w-full bg-gradient-to-r from-brand-soft-from to-brand-soft-to text-brand-deep rounded-lg py-3 px-4 text-left hover:from-slate-100 hover:to-slate-200 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">生成新文章</span>
                </div>
              </button>
              <button
                onClick={() => onNavigate('keywords')}
                className="w-full bg-accent text-accent-foreground rounded-lg py-3 px-4 text-left hover:bg-accent/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5" />
                  <span className="font-medium">關鍵字研究</span>
                </div>
              </button>
              <button
                onClick={() => onNavigate('wordpress')}
                className="w-full bg-accent text-accent-foreground rounded-lg py-3 px-4 text-left hover:bg-accent/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Upload className="w-5 h-5" />
                  <span className="font-medium">發布到 WordPress</span>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <h4 className="mb-1 text-orange-900">WordPress 串接</h4>
                <p className="mb-3 text-sm text-orange-700">
                  一鍵發布尚在開發中；目前請使用文章頁的「複製 Markdown」或「匯出 HTML」。
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('wordpress')}
                  className="text-sm font-medium text-orange-600 hover:text-orange-700"
                >
                  查看規劃說明 →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showTour && <OnboardingTour onClose={() => setShowTour(false)} />}
    </div>
  );
}
