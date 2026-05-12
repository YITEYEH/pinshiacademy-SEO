import { FileText, Calendar, Edit2, Trash2, Plus, Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Toast } from './Toast';
import type { ArticleRow } from '@/lib/database.types';
import { createArticle, deleteArticle, listArticles, updateArticle } from '@/lib/articlesRepo';

export function Articles(_props?: { onNavigate?: (page: string) => void }) {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<ArticleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameDraft, setRenameDraft] = useState('');

  const load = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const rows = await listArticles();
      setArticles(rows);
    } catch (e) {
      setError(e instanceof Error ? e.message : '載入失敗');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function handleCreate() {
    try {
      const row = await createArticle({ title: '未命名草稿' });
      setToast({ type: 'success', message: '已建立草稿' });
      navigate(`/new-article?draft=${encodeURIComponent(row.id)}`);
    } catch (e) {
      setToast({ type: 'error', message: e instanceof Error ? e.message : '建立失敗' });
    }
  }

  function startRename(article: ArticleRow) {
    setRenamingId(article.id);
    setRenameDraft(article.title);
  }

  async function commitRename(id: string) {
    const next = renameDraft.trim();
    if (!next) {
      setToast({ type: 'error', message: '標題不可為空' });
      return;
    }
    try {
      await updateArticle(id, { title: next });
      setRenamingId(null);
      setToast({ type: 'success', message: '標題已更新' });
      await load();
    } catch (e) {
      setToast({ type: 'error', message: e instanceof Error ? e.message : '更新失敗' });
    }
  }

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`確定刪除「${title}」？此動作無法復原。`)) return;
    try {
      await deleteArticle(id);
      setToast({ type: 'success', message: '已刪除' });
      await load();
    } catch (e) {
      setToast({ type: 'error', message: e instanceof Error ? e.message : '刪除失敗' });
    }
  }

  const seoScore = (row: ArticleRow) => {
    const snap = row.seo_score_snapshot as { score?: number } | null;
    if (snap && typeof snap.score === 'number') return snap.score;
    return Math.min(100, Math.round(50 + row.word_count / 200));
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="mb-2">文章管理</h1>
          <p className="text-muted-foreground">文章儲存於 Supabase（RLS：僅本人可讀寫）</p>
        </div>
        <button
          type="button"
          onClick={() => void handleCreate()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl text-sm font-medium hover:from-brand-deep hover:to-brand-strong transition-all"
        >
          <Plus className="w-4 h-4" />
          新增文章
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</div>
      )}

      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
            載入文章…
          </div>
        ) : articles.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground text-sm">
            <p className="mb-4">尚無文章，點「新增文章」建立第一篇草稿。</p>
            <button
              type="button"
              onClick={() => void handleCreate()}
              className="text-brand-link font-medium hover:underline"
            >
              建立草稿
            </button>
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 font-medium">文章標題</th>
                <th className="text-left p-4 font-medium">更新時間</th>
                <th className="text-left p-4 font-medium">字數</th>
                <th className="text-left p-4 font-medium">SEO 分數</th>
                <th className="text-left p-4 font-medium">狀態</th>
                <th className="text-left p-4 font-medium">瀏覽</th>
                <th className="text-left p-4 font-medium">操作</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => {
                const score = seoScore(article);
                const updated = new Date(article.updated_at).toLocaleDateString('zh-TW');
                return (
                  <tr key={article.id} className="border-t border-border hover:bg-accent/50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                          <FileText className="w-5 h-5 text-brand-link" />
                        </div>
                        <div className="min-w-0 flex-1">
                          {renamingId === article.id ? (
                            <div className="flex flex-wrap items-center gap-2">
                              <input
                                type="text"
                                value={renameDraft}
                                onChange={(e) => setRenameDraft(e.target.value)}
                                className="min-w-[12rem] flex-1 px-2 py-1 text-sm rounded border border-border bg-input-background"
                                autoFocus
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') void commitRename(article.id);
                                  if (e.key === 'Escape') setRenamingId(null);
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => void commitRename(article.id)}
                                className="text-xs px-2 py-1 rounded bg-brand-deep text-white hover:bg-brand-strong"
                              >
                                儲存
                              </button>
                              <button type="button" onClick={() => setRenamingId(null)} className="text-xs text-muted-foreground hover:underline">
                                取消
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => startRename(article)}
                              className="text-left group/title"
                              title="點擊重新命名"
                            >
                              <h4 className="mb-0.5 group-hover/title:text-brand-link transition-colors">{article.title}</h4>
                            </button>
                          )}
                          <p className="text-xs text-muted-foreground font-mono">ID: {article.id.slice(0, 8)}…</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{updated}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium">{article.word_count.toLocaleString()} 字</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              score >= 85
                                ? 'bg-gradient-to-r from-green-500 to-green-600'
                                : score >= 70
                                  ? 'bg-gradient-to-r from-slate-600 to-slate-700'
                                  : 'bg-gradient-to-r from-orange-500 to-orange-600'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{score}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {article.status === 'published' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">已發布</span>
                      ) : (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">草稿</span>
                      )}
                    </td>
                    <td className="p-4 font-medium">{article.views.toLocaleString()}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/new-article?draft=${encodeURIComponent(article.id)}`)}
                          className="p-2 hover:bg-accent rounded-lg transition-colors"
                          title="編輯"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          type="button"
                          onClick={() => void handleDelete(article.id, article.title)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="刪除"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {!loading && articles.length > 0 && (
        <p className="mt-4 text-sm text-muted-foreground">共 {articles.length} 筆</p>
      )}

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
