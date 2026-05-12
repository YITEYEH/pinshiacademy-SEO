import { CheckCircle, XCircle, Globe, Key, Settings, Upload } from 'lucide-react';

export function WordPress(_props?: { onNavigate?: (page: string) => void }) {
  const isConnected = false;

  const recentPosts = [
    { title: 'AI 行銷工具完整指南', date: '2026-05-04', status: 'success' },
    { title: '內容行銷策略大全', date: '2026-05-02', status: 'success' },
  ];

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2">WordPress 串接</h1>
          <p className="text-muted-foreground">連接您的 WordPress 網站以直接發布文章</p>
        </div>

        <div className={`mb-8 rounded-2xl p-6 border-2 ${isConnected ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
          <div className="flex items-center gap-4">
            {isConnected ? (
              <>
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-green-900 mb-1">WordPress 已連接</h3>
                  <p className="text-sm text-green-700">您的網站已成功連接，可以開始發布文章</p>
                </div>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-orange-900 mb-1">尚未連接 WordPress</h3>
                  <p className="text-sm text-orange-700">請填寫下方資訊以連接您的 WordPress 網站</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-border mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-brand-link" />
            <h2>網站連接設定</h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block mb-2">WordPress 網站 URL</label>
              <input
                type="text"
                placeholder="https://your-website.com"
                className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
              />
              <p className="text-xs text-muted-foreground mt-1">請輸入您的 WordPress 網站完整網址</p>
            </div>

            <div>
              <label className="block mb-2">使用者名稱</label>
              <input
                type="text"
                placeholder="您的 WordPress 使用者名稱"
                className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
              />
            </div>

            <div>
              <label className="block mb-2">Application Password</label>
              <input
                type="password"
                placeholder="WordPress Application Password"
                className="w-full px-4 py-3 bg-input-background rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400/25"
              />
              <p className="text-xs text-muted-foreground mt-1">
                請至 WordPress 後台「使用者 → 個人資料」建立 Application Password
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2">預設分類</label>
                <select className="w-full px-4 py-3 bg-input-background rounded-lg">
                  <option>未分類</option>
                  <option>部落格</option>
                  <option>SEO</option>
                  <option>行銷</option>
                </select>
              </div>

              <div>
                <label className="block mb-2">預設標籤</label>
                <input
                  type="text"
                  placeholder="輸入標籤，以逗號分隔"
                  className="w-full px-4 py-3 bg-input-background rounded-lg"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <Key className="w-5 h-5 text-brand-link" />
              <div className="text-sm text-slate-900">
                <p className="font-medium mb-1">如何建立 Application Password？</p>
                <p className="text-brand-deep">
                  登入 WordPress → 使用者 → 個人資料 → 下滑至「Application Passwords」→ 建立新的應用程式密碼
                </p>
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 hover:from-brand-deep hover:to-brand-strong transition-all">
              <Settings className="w-5 h-5" />
              <span>測試連接並儲存</span>
            </button>
          </div>
        </div>

        {recentPosts.length > 0 && (
          <div className="bg-white rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <Upload className="w-6 h-6 text-brand-link" />
              <h2>最近發布的文章</h2>
            </div>

            <div className="space-y-4">
              {recentPosts.map((post, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-xl border border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="mb-0.5">{post.title}</h4>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    發布成功
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
