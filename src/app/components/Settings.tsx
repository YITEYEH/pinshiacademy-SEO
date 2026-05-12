import { Bell, Globe, Palette, Shield, User, Zap, Moon, Sun, Monitor, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Toast } from './Toast';
import { getSupabase } from '@/lib/supabase';
import { invokeGenerateDraft } from '@/lib/edgeLlm';
import { getMyProfile } from '@/lib/profilesRepo';
import { countLlmCompletesThisMonth } from '@/lib/usageRepo';

export function Settings(_props?: { onNavigate?: (page: string) => void }) {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('zh-TW');
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [edgeTesting, setEdgeTesting] = useState(false);
  const [edgeOutput, setEdgeOutput] = useState<string | null>(null);
  const [planLabel, setPlanLabel] = useState<string | null>(null);
  const [llmMonth, setLlmMonth] = useState<number | null>(null);

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
    setToast({ type: 'success', message: '設定已儲存' });
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">設定</h1>
          <p className="text-muted-foreground">管理您的應用程式偏好設定</p>
        </div>

        <div className="space-y-6">
          {/* 後端整合（之後一次串接時對照） */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-green-600" />
              <h2>後端整合狀態</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              OpenAI 等金鑰僅能放在 Supabase Edge Function Secrets；前端只呼叫 <code className="text-xs bg-muted px-1 rounded">invoke</code>。
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 mb-4 font-mono">
              <li>Supabase：{getSupabase() ? '已設定（anon）' : '未設定 .env'}</li>
              <li>Function：<code>generate-draft</code>（需 deploy 後測試）</li>
              {planLabel !== null && <li>方案（profiles.plan）：{planLabel}</li>}
              {llmMonth !== null && <li>本月 AI 完成次數（usage_logs）：{llmMonth}</li>}
            </ul>
            <div className="flex flex-wrap gap-3 mb-4">
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-brand to-brand-deep text-white text-sm font-medium disabled:opacity-50"
              >
                {edgeTesting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                測試 Edge Function（ping）
              </button>
            </div>
            {edgeOutput && (
              <pre className="text-xs bg-muted rounded-lg p-4 overflow-x-auto border border-border whitespace-pre-wrap">{edgeOutput}</pre>
            )}
            <p className="text-xs text-muted-foreground mt-4">
              正式上線前請在登入／註冊頁與此處替換為你的服務條款與隱私權政策連結；目前為占位說明。
            </p>
          </div>

          {/* 個人資料 */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-brand-link" />
              <h2>個人資料</h2>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2">姓名</label>
                  <input
                    type="text"
                    defaultValue="王小明"
                    className="w-full px-4 py-3 bg-input-background rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue="user@example.com"
                    className="w-full px-4 py-3 bg-input-background rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2">公司名稱（選填）</label>
                <input
                  type="text"
                  placeholder="您的公司名稱"
                  className="w-full px-4 py-3 bg-input-background rounded-lg"
                />
              </div>
            </div>
          </div>

          {/* 外觀設定 */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-6 h-6 text-slate-600" />
              <h2>外觀設定</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block mb-3">主題模式</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'light', label: '淺色', icon: Sun },
                    { id: 'dark', label: '深色', icon: Moon },
                    { id: 'auto', label: '自動', icon: Monitor },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setTheme(option.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        theme === option.id
                          ? 'border-brand-deep bg-slate-50'
                          : 'border-border hover:border-slate-300'
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <option.icon className={`w-6 h-6 ${theme === option.id ? 'text-brand-link' : 'text-muted-foreground'}`} />
                        <span className={theme === option.id ? 'text-brand-link font-medium' : 'text-muted-foreground'}>
                          {option.label}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-2">語言</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 bg-input-background rounded-lg"
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
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Bell className="w-6 h-6 text-orange-600" />
              <h2>通知設定</h2>
            </div>

            <div className="space-y-4">
              {[
                { label: '文章生成完成通知', description: '當 AI 完成文章生成時發送通知', checked: true },
                { label: 'WordPress 發布通知', description: '文章成功發布到 WordPress 時通知', checked: true },
                { label: '每週使用報告', description: '每週一發送使用統計與建議', checked: false },
                { label: '額度即將用盡提醒', description: '當剩餘額度低於 20% 時提醒', checked: true },
                { label: '系統更新通知', description: '新功能上線或重要更新時通知', checked: false },
              ].map((option, index) => (
                <label
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-accent cursor-pointer transition-colors"
                >
                  <div>
                    <h4 className="mb-1">{option.label}</h4>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked={option.checked}
                    className="w-5 h-5 rounded"
                  />
                </label>
              ))}
            </div>
          </div>

          {/* SEO 偏好設定 */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-green-600" />
              <h2>SEO 偏好設定</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block mb-2">預設文章長度</label>
                <select className="w-full px-4 py-3 bg-input-background rounded-lg">
                  <option>短文（1500-2000 字）</option>
                  <option selected>中等（2500-3000 字）</option>
                  <option>長文（3500-4000 字）</option>
                  <option>超長文（4000+ 字）</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">預設語氣</label>
                <select className="w-full px-4 py-3 bg-input-background rounded-lg">
                  <option selected>專業正式</option>
                  <option>輕鬆友善</option>
                  <option>技術詳細</option>
                  <option>簡潔明瞭</option>
                </select>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-sm text-slate-900">
                  💡 預設模板設定已移至 <strong>模板管理</strong> 頁面，您可以在那裡管理所有模板與 AI 提示詞
                </p>
              </div>

              <div className="space-y-3">
                <label className="block">預設啟用選項</label>
                <div className="grid grid-cols-2 gap-4">
                  {['包含前言', '包含 FAQ', '包含結論', '生成 Meta Description'].map((option, index) => (
                    <label key={index} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 安全性 */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-red-600" />
              <h2>安全性</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block mb-2">變更密碼</label>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder="目前密碼"
                    className="w-full px-4 py-3 bg-input-background rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="新密碼"
                    className="w-full px-4 py-3 bg-input-background rounded-lg"
                  />
                  <input
                    type="password"
                    placeholder="確認新密碼"
                    className="w-full px-4 py-3 bg-input-background rounded-lg"
                  />
                </div>
              </div>

              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <h4 className="text-red-900 mb-2">危險區域</h4>
                <p className="text-sm text-red-700 mb-4">
                  刪除帳號將永久移除所有資料，此動作無法復原
                </p>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  刪除帳號
                </button>
              </div>
            </div>
          </div>

          {/* 儲存按鈕 */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-4 px-6 hover:from-brand-deep hover:to-brand-strong transition-all"
            >
              儲存設定
            </button>
            <button className="px-8 py-4 bg-white border-2 border-border rounded-xl hover:border-brand-deep transition-all">
              重設為預設值
            </button>
          </div>
        </div>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
