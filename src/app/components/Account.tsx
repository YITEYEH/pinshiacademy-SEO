import { CreditCard, Zap, Globe, Key, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function Account(_props?: { onNavigate?: (page: string) => void }) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">帳號與整合</h1>
          <p className="text-muted-foreground">管理您的方案、使用量與 API 整合</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-border mb-6">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-6 h-6 text-brand-link" />
            <h2>方案與使用量</h2>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="p-6 bg-gradient-to-br from-brand-soft-from to-brand-soft-to border border-slate-200 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">目前方案</p>
              <div className="flex items-center justify-between">
                <h3>Free Plan</h3>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium">免費</span>
              </div>
            </div>

            <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl">
              <p className="text-sm text-muted-foreground mb-1">本月剩餘額度</p>
              <div className="flex items-center justify-between">
                <h3>20 / 30 篇</h3>
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">使用進度</span>
              <span className="text-sm font-medium">33%</span>
            </div>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand to-brand-deep" style={{ width: '33%' }} />
            </div>
            <p className="text-xs text-muted-foreground mt-2">5 月 1 日重置</p>
          </div>

          <div className="bg-gradient-to-br from-brand to-brand-deep rounded-xl p-6 text-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-white mb-2">升級至 Pro 方案</h3>
                <ul className="space-y-2 text-sm opacity-90">
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    無限文章生成
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    優先處理速度
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    進階 SEO 分析
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                    自訂 API Key
                  </li>
                </ul>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">每月</p>
                <p className="text-3xl font-bold">$49</p>
              </div>
            </div>
            <button className="w-full bg-white text-brand-link rounded-lg py-3 font-medium hover:bg-slate-50 transition-colors">
              立即升級
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-border mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-brand-link" />
            <h2>WordPress 整合</h2>
          </div>

          <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <Globe className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h4 className="mb-0.5">WordPress 連接</h4>
                <p className="text-sm text-muted-foreground">尚未連接</p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors">
              前往設定
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-border">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full flex items-center justify-between mb-6"
          >
            <div className="flex items-center gap-3">
              <Key className="w-6 h-6 text-brand-link" />
              <h2>進階 API 設定</h2>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                Pro
              </span>
            </div>
            <ChevronDown className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          </button>

          {showAdvanced && (
            <div className="space-y-6 pt-4 border-t border-border">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                <p className="text-sm text-slate-900">
                  <strong>Pro 用戶專屬：</strong>使用您自己的 API Key 可以完全掌控成本與使用量，並享有更高的請求限制。
                </p>
              </div>

              <div>
                <label className="block mb-2">OpenAI API Key（選填）</label>
                <input
                  type="password"
                  placeholder="sk-..."
                  className="w-full px-4 py-3 bg-input-background rounded-lg"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">
                  使用您自己的 OpenAI API Key 進行文章生成
                </p>
              </div>

              <div>
                <label className="block mb-2">SEO API Key（選填）</label>
                <input
                  type="password"
                  placeholder="輸入 SEO API Key"
                  className="w-full px-4 py-3 bg-input-background rounded-lg"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">
                  用於關鍵字分析的第三方 API（如 Ahrefs、SEMrush）
                </p>
              </div>

              <button
                disabled
                className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-4 px-6 opacity-50 cursor-not-allowed"
              >
                儲存 API 設定（需要 Pro 方案）
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
