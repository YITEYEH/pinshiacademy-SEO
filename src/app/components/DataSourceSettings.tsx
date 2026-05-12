import { useState } from 'react';
import { BarChart3, Search, Key, CheckCircle, XCircle, ExternalLink, AlertCircle } from 'lucide-react';
import { Toast } from './Toast';

export function DataSourceSettings(_props?: { onNavigate?: (page: string) => void }) {
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [connections, setConnections] = useState({
    googleAnalytics: { connected: false, propertyId: '', apiKey: '' },
    searchConsole: { connected: false, siteUrl: '', apiKey: '' },
    ahrefs: { connected: false, apiToken: '' },
  });

  const handleConnect = (service: string) => {
    setToast({ type: 'success', message: `${service} 連接成功` });
    setConnections({
      ...connections,
      [service === 'Google Analytics' ? 'googleAnalytics' :
       service === 'Google Search Console' ? 'searchConsole' : 'ahrefs']: {
        ...connections[service === 'Google Analytics' ? 'googleAnalytics' :
                       service === 'Google Search Console' ? 'searchConsole' : 'ahrefs'],
        connected: true,
      },
    });
  };

  const handleDisconnect = (service: string) => {
    setToast({ type: 'info', message: `${service} 已中斷連接` });
    setConnections({
      ...connections,
      [service === 'Google Analytics' ? 'googleAnalytics' :
       service === 'Google Search Console' ? 'searchConsole' : 'ahrefs']: {
        ...connections[service === 'Google Analytics' ? 'googleAnalytics' :
                       service === 'Google Search Console' ? 'searchConsole' : 'ahrefs'],
        connected: false,
      },
    });
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">數據源設定</h1>
          <p className="text-muted-foreground">連接您的分析工具以取得真實數據</p>
        </div>

        <div className="space-y-6">
          {/* Google Analytics 4 */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-brand-link" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2>Google Analytics 4</h2>
                    {connections.googleAnalytics.connected ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        已連接
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        未連接
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    追蹤文章流量、瀏覽量、跳出率與轉換數據
                  </p>
                </div>
              </div>
            </div>

            {!connections.googleAnalytics.connected ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="mb-2">📖 設定步驟</h4>
                  <ol className="text-sm text-slate-800 space-y-1 list-decimal list-inside">
                    <li>前往 <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                    <li>建立專案並啟用 Google Analytics Data API</li>
                    <li>建立服務帳戶並下載 JSON 金鑰檔案</li>
                    <li>在 GA4 中將服務帳戶加入為檢視者</li>
                    <li>複製 GA4 Property ID 並填入下方</li>
                  </ol>
                </div>

                <div>
                  <label className="block mb-2">GA4 Property ID</label>
                  <input
                    type="text"
                    placeholder="例如：123456789"
                    value={connections.googleAnalytics.propertyId}
                    onChange={(e) =>
                      setConnections({
                        ...connections,
                        googleAnalytics: { ...connections.googleAnalytics, propertyId: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-input-background rounded-lg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    可在 GA4 設定 → 資源設定中找到
                  </p>
                </div>

                <div>
                  <label className="block mb-2">服務帳戶 JSON 金鑰</label>
                  <textarea
                    placeholder='貼上 JSON 金鑰內容，例如：
{
  "type": "service_account",
  "project_id": "your-project",
  "private_key_id": "...",
  ...
}'
                    value={connections.googleAnalytics.apiKey}
                    onChange={(e) =>
                      setConnections({
                        ...connections,
                        googleAnalytics: { ...connections.googleAnalytics, apiKey: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-input-background rounded-lg h-32 resize-none font-mono text-sm"
                  />
                </div>

                <button
                  onClick={() => handleConnect('Google Analytics')}
                  disabled={!connections.googleAnalytics.propertyId || !connections.googleAnalytics.apiKey}
                  className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-3 px-6 hover:from-brand-deep hover:to-brand-strong transition-all disabled:opacity-50"
                >
                  連接 Google Analytics
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-green-900 mb-1">連接成功</h4>
                      <p className="text-sm text-green-700">
                        Property ID: {connections.googleAnalytics.propertyId}
                      </p>
                      <p className="text-sm text-green-700">
                        系統將每小時自動同步數據
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setToast({ type: 'success', message: '數據同步中...' })}
                    className="flex-1 px-4 py-2 bg-brand-deep text-white rounded-lg hover:bg-brand-strong transition-colors"
                  >
                    立即同步數據
                  </button>
                  <button
                    onClick={() => handleDisconnect('Google Analytics')}
                    className="px-4 py-2 bg-white border border-border rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                  >
                    中斷連接
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Google Search Console */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2>Google Search Console</h2>
                    {connections.searchConsole.connected ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        已連接
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        未連接
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    追蹤關鍵字排名、點擊率、曝光數與搜尋表現
                  </p>
                </div>
              </div>
            </div>

            {!connections.searchConsole.connected ? (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <h4 className="mb-2">📖 設定步驟</h4>
                  <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
                    <li>前往 <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="underline">Google Cloud Console</a></li>
                    <li>啟用 Search Console API</li>
                    <li>建立 OAuth 2.0 用戶端 ID</li>
                    <li>下載 JSON 憑證檔案</li>
                    <li>輸入您的網站 URL</li>
                  </ol>
                </div>

                <div>
                  <label className="block mb-2">網站 URL</label>
                  <input
                    type="text"
                    placeholder="https://your-website.com"
                    value={connections.searchConsole.siteUrl}
                    onChange={(e) =>
                      setConnections({
                        ...connections,
                        searchConsole: { ...connections.searchConsole, siteUrl: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-input-background rounded-lg"
                  />
                </div>

                <div>
                  <label className="block mb-2">OAuth 2.0 JSON 憑證</label>
                  <textarea
                    placeholder="貼上 OAuth 2.0 憑證內容"
                    value={connections.searchConsole.apiKey}
                    onChange={(e) =>
                      setConnections({
                        ...connections,
                        searchConsole: { ...connections.searchConsole, apiKey: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-input-background rounded-lg h-32 resize-none font-mono text-sm"
                  />
                </div>

                <button
                  onClick={() => handleConnect('Google Search Console')}
                  disabled={!connections.searchConsole.siteUrl || !connections.searchConsole.apiKey}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl py-3 px-6 hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-50"
                >
                  連接 Search Console
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-green-900 mb-1">連接成功</h4>
                      <p className="text-sm text-green-700">
                        網站: {connections.searchConsole.siteUrl}
                      </p>
                      <p className="text-sm text-green-700">
                        系統將每日同步關鍵字排名數據
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setToast({ type: 'success', message: '關鍵字數據同步中...' })}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    立即同步數據
                  </button>
                  <button
                    onClick={() => handleDisconnect('Google Search Console')}
                    className="px-4 py-2 bg-white border border-border rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                  >
                    中斷連接
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Ahrefs API (選用) */}
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Key className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2>Ahrefs API</h2>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                      選用
                    </span>
                    {connections.ahrefs.connected ? (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        已連接
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-medium flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        未連接
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    進階關鍵字分析、競爭對手研究、反向連結追蹤
                  </p>
                </div>
              </div>
            </div>

            {!connections.ahrefs.connected ? (
              <div className="space-y-4">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <h4 className="mb-2">📖 如何取得 API Token</h4>
                  <ol className="text-sm text-slate-800 space-y-1 list-decimal list-inside">
                    <li>登入 <a href="https://ahrefs.com" target="_blank" rel="noopener noreferrer" className="underline">Ahrefs</a> 帳戶</li>
                    <li>前往 Settings → API Access</li>
                    <li>產生新的 API Token</li>
                    <li>複製 Token 並貼上下方</li>
                  </ol>
                  <p className="text-xs text-slate-700 mt-2">
                    ⚠️ 注意：Ahrefs API 需要付費訂閱方案
                  </p>
                </div>

                <div>
                  <label className="block mb-2">Ahrefs API Token</label>
                  <input
                    type="password"
                    placeholder="輸入您的 Ahrefs API Token"
                    value={connections.ahrefs.apiToken}
                    onChange={(e) =>
                      setConnections({
                        ...connections,
                        ahrefs: { ...connections.ahrefs, apiToken: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 bg-input-background rounded-lg"
                  />
                </div>

                <button
                  onClick={() => handleConnect('Ahrefs')}
                  disabled={!connections.ahrefs.apiToken}
                  className="w-full bg-gradient-to-r from-brand-deep to-brand-strong text-white rounded-xl py-3 px-6 hover:opacity-95 transition-all disabled:opacity-50"
                >
                  連接 Ahrefs
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="text-green-900 mb-1">連接成功</h4>
                      <p className="text-sm text-green-700">
                        進階 SEO 分析功能已啟用
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setToast({ type: 'success', message: 'Ahrefs 數據同步中...' })}
                    className="flex-1 px-4 py-2 bg-brand-deep text-white rounded-lg hover:bg-brand-strong transition-colors"
                  >
                    立即同步數據
                  </button>
                  <button
                    onClick={() => handleDisconnect('Ahrefs')}
                    className="px-4 py-2 bg-white border border-border rounded-lg hover:bg-red-50 hover:border-red-300 transition-colors"
                  >
                    中斷連接
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 使用說明 */}
          <div className="bg-gradient-to-br from-brand-soft-from to-brand-soft-to border border-slate-200 rounded-2xl p-6">
            <div className="flex items-start gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-brand-link flex-shrink-0" />
              <div>
                <h3 className="mb-2">重要提醒</h3>
                <ul className="text-sm text-slate-800 space-y-2">
                  <li>• <strong>必要連接：</strong>Google Analytics 4 和 Search Console 是取得真實數據的基礎</li>
                  <li>• <strong>數據隱私：</strong>您的 API 金鑰採用加密儲存，僅用於數據讀取</li>
                  <li>• <strong>同步頻率：</strong>GA4 每小時同步、Search Console 每日同步</li>
                  <li>• <strong>歷史數據：</strong>首次連接後需要 24-48 小時建立完整數據</li>
                  <li>• <strong>API 配額：</strong>請注意 Google API 的每日請求限制</li>
                </ul>
              </div>
            </div>

            <a
              href="https://docs.example.com/api-setup"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-brand-link hover:text-brand-deep font-medium"
            >
              查看完整設定教學
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
