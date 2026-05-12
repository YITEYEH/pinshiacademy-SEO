import { Bell, Palette, Shield, User, Zap, Moon, Sun, Monitor, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import { Toast } from './Toast';
import { useAuth } from '@/app/auth/AuthProvider';
import { getSupabase } from '@/lib/supabase';
import { invokeGenerateDraft } from '@/lib/edgeLlm';
import { getMyProfile } from '@/lib/profilesRepo';
import { countLlmCompletesThisMonth } from '@/lib/usageRepo';

export function Settings(_props?: { onNavigate?: (page: string) => void }) {
  const { user } = useAuth();
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('zh-TW');
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [edgeTesting, setEdgeTesting] = useState(false);
  const [edgeOutput, setEdgeOutput] = useState<string | null>(null);
  const [planLabel, setPlanLabel] = useState<string | null>(null);
  const [llmMonth, setLlmMonth] = useState<number | null>(null);

  const email = user?.email ?? '';
  const displayName =
    (user?.user_metadata as { full_name?: string; name?: string } | undefined)?.full_name ??
    (user?.user_metadata as { name?: string } | undefined)?.name ??
    '';

  useEffect(() => {
    if (!getSupabase()) return;
    void (async () => {
      try {
        const [p, n] = await Promise.all([getMyProfile(), countLlmCompletesThisMonth()]);
        setPlanLabel(p?.plan ?? 'free');
        setLlmMonth(n);
      } catch {
        setPlanLabel(null);
        setLlmMonth(null);
      }
    })();
  }, []);

  const handleSave = () => {
    setToast({
      type: 'info',
      message: '尚未連動後端設定儲存；主題／語言僅暫存在此瀏覽器工作階段，重新整理後可能還原。',
    });
  };

  const handleReset = () => {
    setToast({ type: 'info', message: '尚無伺服端預設值可重設。' });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="mb-2">設定</h1>
          <p className="text-muted-foreground">可調整的項目已標示；未串接後端者不會寫入資料庫。</p>
        </div>

        <div className="space-y-6">
          {import.meta.env.DEV ? (
            <div className="rounded-2xl border border-dashed border-amber-300/80 bg-amber-50/40 p-8">
              <div className="mb-4 flex items-center gap-3">
                <Shield className="size-6 text-amber-800" />
                <h2 className="text-amber-950">開發者：後端整合狀態</h2>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                僅在開發模式顯示。OpenAI 等金鑰僅能放在 Supabase Edge Function Secrets；前端只呼叫{' '}
                <code className="rounded bg-muted px-1 text-xs">invoke</code>。
              </p>
              <ul className="mb-4 space-y-1 font-mono text-xs text-muted-foreground">
                <li>Supabase：{getSupabase() ? '已設定（anon）' : '未設定 .env'}</li>
                <li>
                  Function：<code>generate-draft</code>（需 deploy 後測試）
                </li>
                {planLabel !== null && <li>方案（profiles.plan）：{planLabel}</li>}
                {llmMonth !== null && <li>本月 AI 完成次數（usage_logs）：{llmMonth}</li>}
              </ul>
              <div className="mb-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  disabled={edgeTesting || !getSupabase()}
                  onClick={() => {
                    void (async () => {
                      setEdgeTesting(true);
                      setEdgeOutput(null);
                      const { data, error } = await invokeGenerateDraft({ action: 'ping' });
                      setEdgeTesting(false);
                      if (error) {
                        setEdgeOutput(`錯誤：${error}`);
                        return;
                      }
                      setEdgeOutput(JSON.stringify(data, null, 2));
                    })();
                  }}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-brand to-brand-deep px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                >
                  {edgeTesting ? <Loader2 className="size-4 animate-spin" /> : null}
                  測試 Edge Function（ping）
                </button>
              </div>
              {edgeOutput ? (
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-lg border border-border bg-muted p-4 text-xs">{edgeOutput}</pre>
              ) : null}
            </div>
          ) : null}

          {/* 個人資料（唯讀，來自登入工作階段） */}
          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="mb-6 flex items-center gap-3">
              <User className="size-6 text-brand-link" />
              <h2>個人資料</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">以下取自 Supabase Auth；寫入 profiles 等尚未在此頁開放。</p>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block">顯示名稱（user_metadata）</label>
                  <input
                    type="text"
                    readOnly
                    value={displayName}
                    placeholder="未設定"
                    className="w-full cursor-not-allowed rounded-lg border border-transparent bg-muted/60 px-4 py-3 text-muted-foreground"
                  />
                </div>
                <div>
                  <label className="mb-2 block">Email</label>
                  <input
                    type="email"
                    readOnly
                    value={email}
                    className="w-full cursor-not-allowed rounded-lg border border-transparent bg-muted/60 px-4 py-3 text-muted-foreground"
                  />
                </div>
              </div>
              <div>
                <label className="mb-2 block">公司名稱（選填）</label>
                <input
                  type="text"
                  disabled
                  placeholder="尚未開放編輯"
                  className="w-full cursor-not-allowed rounded-lg bg-input-background px-4 py-3 opacity-60"
                />
              </div>
            </div>
          </div>

          {/* 外觀設定（僅前端狀態） */}
          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="mb-6 flex items-center gap-3">
              <Palette className="size-6 text-slate-600" />
              <h2>外觀設定</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">可切換預覽；若要持久化需之後接上設定 API。</p>
            <div className="space-y-6">
              <div>
                <label className="mb-3 block">主題模式</label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[
                    { id: 'light', label: '淺色', icon: Sun },
                    { id: 'dark', label: '深色', icon: Moon },
                    { id: 'auto', label: '自動', icon: Monitor },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setTheme(option.id)}
                      className={`rounded-xl border-2 p-4 transition-all ${
                        theme === option.id ? 'border-brand-deep bg-slate-50' : 'border-border hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <option.icon className={`size-6 ${theme === option.id ? 'text-brand-link' : 'text-muted-foreground'}`} />
                        <span className={theme === option.id ? 'font-medium text-brand-link' : 'text-muted-foreground'}>{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block">語言</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-lg bg-input-background px-4 py-3"
                >
                  <option value="zh-TW">繁體中文</option>
                  <option value="zh-CN">簡體中文</option>
                  <option value="en">English</option>
                  <option value="ja">日本語</option>
                </select>
              </div>
            </div>
          </div>

          {/* 通知設定 */}
          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="mb-6 flex items-center gap-3">
              <Bell className="size-6 text-orange-600" />
              <h2>通知設定</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">尚未啟用；選項僅供之後版本參考。</p>
            <div className="space-y-4 opacity-60">
              {[
                { label: '文章生成完成通知', description: '當 AI 完成文章生成時發送通知', checked: true },
                { label: 'WordPress 發布通知', description: '文章成功發布到 WordPress 時通知', checked: false },
                { label: '每週使用報告', description: '每週一發送使用統計與建議', checked: false },
                { label: '額度即將用盡提醒', description: '當剩餘額度低於 20% 時提醒', checked: false },
                { label: '系統更新通知', description: '新功能上線或重要更新時通知', checked: false },
              ].map((option, index) => (
                <label key={index} className="flex cursor-not-allowed items-center justify-between rounded-xl p-4">
                  <div>
                    <h4 className="mb-1">{option.label}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <input type="checkbox" defaultChecked={option.checked} disabled className="size-5 rounded" />
                </label>
              ))}
            </div>
          </div>

          {/* SEO 偏好設定 */}
          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="mb-6 flex items-center gap-3">
              <Zap className="size-6 text-green-600" />
              <h2>SEO 偏好設定</h2>
            </div>
            <p className="mb-4 text-sm text-muted-foreground">預設生成偏好將與「新增文章」連動後才會生效；目前僅為占位。</p>
            <div className="pointer-events-none space-y-6 opacity-60">
              <div>
                <label className="mb-2 block">預設文章長度</label>
                <select disabled className="w-full cursor-not-allowed rounded-lg bg-input-background px-4 py-3">
                  <option>短文（1500-2000 字）</option>
                  <option>中等（2500-3000 字）</option>
                  <option>長文（3500-4000 字）</option>
                  <option>超長文（4000+ 字）</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block">預設語氣</label>
                <select disabled className="w-full cursor-not-allowed rounded-lg bg-input-background px-4 py-3">
                  <option>專業正式</option>
                  <option>輕鬆友善</option>
                  <option>技術詳細</option>
                  <option>簡潔明瞭</option>
                </select>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-900">
                  預設模板設定請至 <strong>模板管理</strong>。
                </p>
              </div>
              <div className="space-y-3">
                <span className="block">預設啟用選項</span>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {['包含前言', '包含 FAQ', '包含結論', '生成 Meta Description'].map((option, index) => (
                    <label key={index} className="flex items-center gap-3 rounded-lg p-3">
                      <input type="checkbox" defaultChecked disabled className="rounded" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 安全性 */}
          <div className="rounded-2xl border border-border bg-white p-8">
            <div className="mb-6 flex items-center gap-3">
              <Shield className="size-6 text-red-600" />
              <h2>安全性</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block">變更密碼</label>
                <p className="mb-3 text-sm text-muted-foreground">
                  請使用登入頁的「忘記密碼」流程重設 Supabase 密碼：{' '}
                  <Link to="/forgot-password" className="font-medium text-brand-link hover:underline">
                    前往忘記密碼
                  </Link>
                </p>
                <div className="pointer-events-none space-y-4 opacity-50">
                  <input type="password" placeholder="目前密碼" className="w-full rounded-lg bg-input-background px-4 py-3" disabled />
                  <input type="password" placeholder="新密碼" className="w-full rounded-lg bg-input-background px-4 py-3" disabled />
                  <input type="password" placeholder="確認新密碼" className="w-full rounded-lg bg-input-background px-4 py-3" disabled />
                </div>
              </div>
              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <h4 className="mb-2 text-red-900">危險區域</h4>
                <p className="mb-4 text-sm text-red-700">刪除帳號尚未在此 App 實作。</p>
                <button type="button" disabled className="cursor-not-allowed rounded-lg bg-red-600/40 px-4 py-2 text-white">
                  刪除帳號（未開放）
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 rounded-xl bg-gradient-to-r from-brand to-brand-deep py-4 px-6 text-white transition-all hover:from-brand-deep hover:to-brand-strong"
            >
              儲存設定
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-xl border-2 border-border bg-white px-8 py-4 transition-colors hover:border-brand-deep"
            >
              重設為預設值
            </button>
          </div>
        </div>
      </div>

      {toast ? <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} /> : null}
    </div>
  );
}
