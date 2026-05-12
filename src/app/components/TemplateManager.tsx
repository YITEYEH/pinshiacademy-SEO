import { FileText, ShoppingBag, Scale, Newspaper, Plus, Edit2, Trash2, Copy, Star, Loader2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Toast } from './Toast';
import { getSupabase } from '@/lib/supabase';
import {
  createTemplate,
  deleteTemplate,
  listTemplates,
  setDefaultTemplate,
  updateTemplate,
  type WritingTemplateRow,
} from '@/lib/templatesRepo';

function templateIcon(name: string) {
  if (name.includes('電商')) return ShoppingBag;
  if (name.includes('法律')) return Scale;
  if (name.includes('新聞')) return Newspaper;
  return FileText;
}

function readSettings(row: WritingTemplateRow) {
  const s = (row.settings ?? {}) as Record<string, unknown>;
  const wordCount = typeof s.wordCount === 'string' ? s.wordCount : '—';
  const h2Count = typeof s.h2Count === 'number' ? String(s.h2Count) : '—';
  const includeFAQ = s.includeFAQ === true ? '包含' : s.includeFAQ === false ? '不包含' : '—';
  const tone =
    s.tone === 'sales' ? '銷售' : s.tone === 'professional' ? '專業' : s.tone === 'friendly' ? '友善' : typeof s.tone === 'string' ? s.tone : '自訂';
  return { wordCount, h2Count, includeFAQ, tone };
}

export function TemplateManager(_props?: { onNavigate?: (page: string) => void }) {
  const [templates, setTemplates] = useState<WritingTemplateRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [showPromptEditor, setShowPromptEditor] = useState<string | null>(null);
  const [draftPrompt, setDraftPrompt] = useState<Record<string, string>>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newBody, setNewBody] = useState(
    '你是一位專業 SEO 寫手。主題：{topic}。目標讀者：{audience}。關鍵字：{keywords}。語氣：{tone}。請用繁體中文撰寫。',
  );

  const load = useCallback(async () => {
    if (!getSupabase()) {
      setTemplates([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const rows = await listTemplates();
      setTemplates(rows);
    } catch (e) {
      setToast({ type: 'error', message: e instanceof Error ? e.message : '載入模板失敗' });
      setTemplates([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const openPromptEditor = (row: WritingTemplateRow) => {
    setShowPromptEditor(row.id);
    setDraftPrompt((d) => ({ ...d, [row.id]: d[row.id] ?? row.prompt_body }));
  };

  const handleSetDefault = (id: string) => {
    void (async () => {
      try {
        await setDefaultTemplate(id);
        setToast({ type: 'success', message: '預設模板已更新' });
        await load();
      } catch (e) {
        setToast({ type: 'error', message: e instanceof Error ? e.message : '更新失敗' });
      }
    })();
  };

  const handleDuplicate = (row: WritingTemplateRow) => {
    void (async () => {
      try {
        await createTemplate({
          name: `${row.name} (副本)`,
          description: row.description ?? undefined,
          prompt_body: row.prompt_body,
        });
        setToast({ type: 'success', message: '模板已複製' });
        await load();
      } catch (e) {
        setToast({ type: 'error', message: e instanceof Error ? e.message : '複製失敗' });
      }
    })();
  };

  const handleDelete = (row: WritingTemplateRow) => {
    if (row.is_default) {
      setToast({ type: 'error', message: '無法刪除預設模板，請先指定其他模板為預設' });
      return;
    }
    if (!window.confirm(`確定刪除「${row.name}」？`)) return;
    void (async () => {
      try {
        await deleteTemplate(row.id);
        setToast({ type: 'success', message: '模板已刪除' });
        if (showPromptEditor === row.id) setShowPromptEditor(null);
        await load();
      } catch (e) {
        setToast({ type: 'error', message: e instanceof Error ? e.message : '刪除失敗' });
      }
    })();
  };

  const handleSavePrompt = (id: string) => {
    void (async () => {
      try {
        const body = draftPrompt[id]?.trim() ?? '';
        if (!body) {
          setToast({ type: 'error', message: '提示詞不可為空' });
          return;
        }
        await updateTemplate(id, { prompt_body: body });
        setToast({ type: 'success', message: '提示詞已儲存' });
        await load();
      } catch (e) {
        setToast({ type: 'error', message: e instanceof Error ? e.message : '儲存失敗' });
      }
    })();
  };

  const handleCreate = () => {
    void (async () => {
      const name = newName.trim();
      if (!name) {
        setToast({ type: 'error', message: '請輸入模板名稱' });
        return;
      }
      try {
        await createTemplate({ name, prompt_body: newBody.trim() || '（請編輯提示詞）' });
        setToast({ type: 'success', message: '已新增模板' });
        setNewName('');
        setShowAddForm(false);
        await load();
      } catch (e) {
        setToast({ type: 'error', message: e instanceof Error ? e.message : '新增失敗' });
      }
    })();
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="mb-2">模板管理</h1>
            <p className="text-muted-foreground">模板儲存於 Supabase（RLS：僅本人可讀寫）</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAddForm((v) => !v)}
            className="bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-3 px-6 flex items-center gap-2 hover:from-brand-deep hover:to-brand-strong transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>新增模板</span>
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6 rounded-2xl border border-border bg-white p-6 space-y-4">
            <h3 className="text-sm font-medium">新增寫作模板</h3>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="模板名稱"
              className="w-full px-4 py-2 rounded-lg border border-border bg-input-background"
            />
            <textarea
              value={newBody}
              onChange={(e) => setNewBody(e.target.value)}
              rows={5}
              className="w-full px-4 py-2 rounded-lg border border-border font-mono text-sm"
            />
            <div className="flex gap-2">
              <button type="button" onClick={() => void handleCreate()} className="px-4 py-2 rounded-lg bg-brand-deep text-white text-sm hover:bg-brand-strong">
                建立
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 rounded-lg border border-border text-sm hover:bg-accent">
                取消
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-20 text-muted-foreground">
            <Loader2 className="w-6 h-6 animate-spin" />
            載入模板…
          </div>
        ) : !getSupabase() ? (
          <p className="text-sm text-muted-foreground py-8">請設定 Supabase 並登入後管理模板。</p>
        ) : templates.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8">尚無模板，請稍候或點「新增模板」。</p>
        ) : (
          <div className="space-y-6">
            {templates.map((template) => {
              const Icon = templateIcon(template.name);
              const isExpanded = showPromptEditor === template.id;
              const { wordCount, h2Count, includeFAQ, tone } = readSettings(template);

              return (
                <div key={template.id} className="bg-white rounded-2xl border border-border overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3>{template.name}</h3>
                            {template.is_default && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                預設
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{template.description ?? '—'}</p>

                          <div className="grid grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">字數：</span>
                              <span className="font-medium">{wordCount}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">H2 數量：</span>
                              <span className="font-medium">{h2Count}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">FAQ：</span>
                              <span className="font-medium">{includeFAQ}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">語氣：</span>
                              <span className="font-medium">{tone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {!template.is_default && (
                          <button
                            type="button"
                            onClick={() => handleSetDefault(template.id)}
                            className="p-2 hover:bg-accent rounded-lg transition-colors"
                            title="設為預設"
                          >
                            <Star className="w-4 h-4 text-muted-foreground" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => openPromptEditor(template)}
                          className="p-2 hover:bg-accent rounded-lg transition-colors"
                          title="編輯提示詞"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicate(template)}
                          className="p-2 hover:bg-accent rounded-lg transition-colors"
                          title="複製模板"
                        >
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        </button>
                        {!template.is_default && (
                          <button
                            type="button"
                            onClick={() => handleDelete(template)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="刪除"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="border-t border-border bg-muted/30 p-6">
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4>AI 提示詞編輯器</h4>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => handleSavePrompt(template.id)}
                              className="px-3 py-1 bg-brand-deep text-white rounded-lg text-sm hover:bg-brand-strong transition-colors"
                            >
                              儲存變更
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowPromptEditor(null)}
                              className="px-3 py-1 bg-white border border-border rounded-lg text-sm hover:bg-accent transition-colors"
                            >
                              收合
                            </button>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          提示詞中可使用變數：<code className="px-2 py-1 bg-white rounded text-xs">{'{topic}'}</code>、
                          <code className="px-2 py-1 bg-white rounded text-xs">{'{audience}'}</code>、
                          <code className="px-2 py-1 bg-white rounded text-xs">{'{keywords}'}</code>、
                          <code className="px-2 py-1 bg-white rounded text-xs">{'{tone}'}</code>、
                          <code className="px-2 py-1 bg-white rounded text-xs">{'{h2_count}'}</code>
                        </p>
                      </div>

                      <textarea
                        value={draftPrompt[template.id] ?? template.prompt_body}
                        onChange={(e) => setDraftPrompt((d) => ({ ...d, [template.id]: e.target.value }))}
                        className="w-full h-96 px-4 py-3 bg-white border border-border rounded-lg font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-400/25"
                        placeholder="在此輸入 AI 提示詞..."
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-8 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-6">
          <h3 className="mb-3">模板最佳實踐</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="text-foreground mb-2">模板設定建議</h4>
              <ul className="space-y-1">
                <li>• 根據目標受眾調整字數與深度</li>
                <li>• 電商類文章著重轉換與 CTA</li>
                <li>• 專業內容需要更多案例與數據支持</li>
                <li>• 設定適當的 H2 數量（通常 4-6 個）</li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground mb-2">提示詞優化建議</h4>
              <ul className="space-y-1">
                <li>• 提供具體的輸出範例</li>
                <li>• 說明避免的寫作方式</li>
                <li>• 加入 SEO 優化要求</li>
                <li>• 定期測試並微調提示詞效果</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
