import { useState } from 'react';
import { TrendingUp, Eye, MousePointer, DollarSign, Target, Calendar, ArrowUpRight, ArrowDownRight, BarChart3, PieChart, Settings, AlertCircle } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface AnalyticsProps {
  onNavigate: (page: string) => void;
}

export function Analytics({ onNavigate }: AnalyticsProps) {
  const [dateRange, setDateRange] = useState('7days');
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false); // 模擬未連接狀態

  // 流量數據
  const trafficData = [
    { date: '05/01', views: 1200, clicks: 340, conversions: 45 },
    { date: '05/02', views: 1450, clicks: 390, conversions: 52 },
    { date: '05/03', views: 1680, clicks: 420, conversions: 61 },
    { date: '05/04', views: 1920, clicks: 480, conversions: 68 },
    { date: '05/05', views: 2100, clicks: 520, conversions: 74 },
    { date: '05/06', views: 1850, clicks: 460, conversions: 65 },
    { date: '05/07', views: 2300, clicks: 580, conversions: 82 },
  ];

  // 關鍵字排名數據
  const keywordRankings = [
    { keyword: 'AI 行銷工具', currentRank: 3, previousRank: 5, change: 2, traffic: 1234 },
    { keyword: 'SEO 優化', currentRank: 7, previousRank: 12, change: 5, traffic: 892 },
    { keyword: '內容行銷策略', currentRank: 15, previousRank: 14, change: -1, traffic: 456 },
    { keyword: 'AI 寫作助手', currentRank: 4, previousRank: 8, change: 4, traffic: 1567 },
    { keyword: 'SEO 自動化', currentRank: 11, previousRank: 11, change: 0, traffic: 634 },
  ];

  // 文章表現數據
  const articlePerformance = [
    { title: 'AI 行銷工具完整指南', views: 5234, clicks: 892, ctr: 17.0, conversions: 124, roi: 4.2 },
    { title: 'SEO 優化最佳實踐', views: 3890, clicks: 567, ctr: 14.6, conversions: 89, roi: 3.8 },
    { title: '內容行銷策略大全', views: 4567, clicks: 734, ctr: 16.1, conversions: 102, roi: 4.0 },
    { title: '社群媒體經營技巧', views: 2890, clicks: 423, ctr: 14.6, conversions: 67, roi: 3.5 },
  ];

  // 轉換漏斗數據
  const conversionFunnel = [
    { name: '瀏覽', value: 12000, percentage: 100 },
    { name: '閱讀 30%', value: 8400, percentage: 70 },
    { name: '點擊 CTA', value: 2400, percentage: 20 },
    { name: '完成轉換', value: 840, percentage: 7 },
  ];

  // 流量來源數據
  const trafficSources = [
    { name: 'Google 搜尋', value: 4500, color: '#4285F4' },
    { name: '直接流量', value: 2800, color: '#34A853' },
    { name: '社群媒體', value: 1900, color: '#FBBC05' },
    { name: '其他來源', value: 800, color: '#EA4335' },
  ];

  const stats = [
    {
      label: '總瀏覽量',
      value: '12,540',
      change: '+12.5%',
      trend: 'up',
      icon: Eye,
      color: 'blue',
    },
    {
      label: '點擊率',
      value: '15.8%',
      change: '+2.3%',
      trend: 'up',
      icon: MousePointer,
      color: 'purple',
    },
    {
      label: '轉換數',
      value: '447',
      change: '+8.1%',
      trend: 'up',
      icon: Target,
      color: 'green',
    },
    {
      label: '平均 ROI',
      value: '3.9x',
      change: '-0.2x',
      trend: 'down',
      icon: DollarSign,
      color: 'orange',
    },
  ];

  // 未連接數據源時顯示
  if (!isConnected) {
    return (
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="mb-2">分析報表</h1>
          <p className="text-muted-foreground">追蹤文章表現、關鍵字排名與轉換數據</p>
        </div>

        <div className="max-w-3xl mx-auto mt-10 sm:mt-20">
          <div className="rounded-2xl border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-orange-100 p-6 text-center sm:p-10 lg:p-12">
            <div className="w-20 h-20 rounded-full bg-orange-200 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-10 h-10 text-orange-600" />
            </div>
            <h2 className="mb-4">尚未連接數據源</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              要查看真實的流量、排名與轉換數據，請先連接 Google Analytics 和 Search Console
            </p>

            <div className="mx-auto mb-8 grid max-w-lg grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="bg-white rounded-xl p-4 border border-orange-200">
                <BarChart3 className="w-8 h-8 text-brand-link mx-auto mb-2" />
                <h4 className="mb-1">Google Analytics 4</h4>
                <p className="text-sm text-muted-foreground">流量與轉換追蹤</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-orange-200">
                <Target className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h4 className="mb-1">Search Console</h4>
                <p className="text-sm text-muted-foreground">關鍵字排名監控</p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('data-sources')}
              className="bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-4 px-8 flex items-center justify-center gap-3 hover:from-brand-deep hover:to-brand-strong transition-all mx-auto"
            >
              <Settings className="w-5 h-5" />
              <span>前往設定數據源</span>
            </button>

            <p className="text-sm text-muted-foreground mt-6">
              或者，您可以
              <button
                onClick={() => setIsConnected(true)}
                className="text-brand-link hover:underline ml-1"
              >
                查看示範數據
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="mb-2">分析報表</h1>
          <p className="text-muted-foreground">追蹤文章表現、關鍵字排名與轉換數據</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate('data-sources')}
            className="px-4 py-2 bg-white border border-border rounded-lg hover:border-brand-deep transition-all flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            <span>數據源設定</span>
          </button>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-white border border-border rounded-lg"
          >
            <option value="7days">最近 7 天</option>
            <option value="30days">最近 30 天</option>
            <option value="90days">最近 90 天</option>
            <option value="custom">自訂範圍</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-brand to-brand-deep text-white rounded-lg hover:from-brand-deep hover:to-brand-strong transition-all">
            匯出報表
          </button>
        </div>
      </div>

      {/* 示範數據提示 */}
      <div className="mb-6 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3 sm:items-center">
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-brand-link sm:mt-0" />
          <p className="text-sm text-slate-800">
            目前顯示示範數據。連接真實數據源後將顯示實際分析結果。
          </p>
        </div>
        <button
          onClick={() => onNavigate('data-sources')}
          className="text-sm text-brand-link hover:underline font-medium"
        >
          立即設定 →
        </button>
      </div>

      {/* 統計卡片 */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span className="font-medium">{stat.change}</span>
              </div>
            </div>
            <div className="text-3xl font-semibold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 流量趨勢圖 */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-4 sm:p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2>流量趨勢</h2>
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                <span className="text-muted-foreground">瀏覽量</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-500"></div>
                <span className="text-muted-foreground">點擊數</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-muted-foreground">轉換數</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Area type="monotone" dataKey="views" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} />
              <Area type="monotone" dataKey="clicks" stroke="#a855f7" fill="#a855f7" fillOpacity={0.1} />
              <Area type="monotone" dataKey="conversions" stroke="#22c55e" fill="#22c55e" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 流量來源 */}
        <div className="rounded-2xl border border-border bg-white p-4 sm:p-6">
          <h2 className="mb-6">流量來源</h2>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPieChart>
              <Pie
                data={trafficSources}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-3">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                  <span>{source.name}</span>
                </div>
                <span className="font-medium">{source.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 關鍵字排名監控 */}
      <div className="mb-8 rounded-2xl border border-border bg-white p-4 sm:p-6">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2>關鍵字排名監控</h2>
          <button className="rounded-lg bg-accent px-4 py-2 text-sm hover:bg-accent/80 sm:self-auto">
            更新排名
          </button>
        </div>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[640px]">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4 text-sm font-medium">關鍵字</th>
                <th className="text-left p-4 text-sm font-medium">目前排名</th>
                <th className="text-left p-4 text-sm font-medium">變化</th>
                <th className="text-left p-4 text-sm font-medium">流量</th>
                <th className="text-left p-4 text-sm font-medium">趨勢</th>
              </tr>
            </thead>
            <tbody>
              {keywordRankings.map((kw, index) => (
                <tr key={index} className="border-t border-border hover:bg-accent/50">
                  <td className="p-4 font-medium">{kw.keyword}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      kw.currentRank <= 3 ? 'bg-green-100 text-green-700' :
                      kw.currentRank <= 10 ? 'bg-slate-100 text-brand-deep' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      #{kw.currentRank}
                    </span>
                  </td>
                  <td className="p-4">
                    {kw.change > 0 ? (
                      <div className="flex items-center gap-1 text-green-600">
                        <ArrowUpRight className="w-4 h-4" />
                        <span className="font-medium">+{kw.change}</span>
                      </div>
                    ) : kw.change < 0 ? (
                      <div className="flex items-center gap-1 text-red-600">
                        <ArrowDownRight className="w-4 h-4" />
                        <span className="font-medium">{kw.change}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="p-4 text-brand-link font-medium">{kw.traffic.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="w-24 h-8">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={[
                          { rank: kw.previousRank + 2 },
                          { rank: kw.previousRank },
                          { rank: kw.currentRank },
                        ]}>
                          <Line type="monotone" dataKey="rank" stroke={kw.change >= 0 ? "#22c55e" : "#ef4444"} strokeWidth={2} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 文章表現 & 轉換漏斗 */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-white p-4 sm:p-6 lg:col-span-2">
          <h2 className="mb-6">文章表現排行</h2>
          <div className="space-y-4">
            {articlePerformance.map((article, index) => (
              <div key={index} className="p-4 border border-border rounded-xl hover:border-slate-300 transition-colors">
                <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <h4 className="min-w-0">{article.title}</h4>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    ROI {article.roi}x
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4 sm:gap-4">
                  <div>
                    <p className="text-muted-foreground mb-1">瀏覽量</p>
                    <p className="text-xl font-semibold">{article.views.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">點擊數</p>
                    <p className="text-xl font-semibold">{article.clicks.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">點擊率</p>
                    <p className="text-xl font-semibold">{article.ctr}%</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">轉換數</p>
                    <p className="text-xl font-semibold">{article.conversions}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 轉換漏斗 */}
        <div className="rounded-2xl border border-border bg-white p-4 sm:p-6">
          <h2 className="mb-6">轉換漏斗</h2>
          <div className="space-y-4">
            {conversionFunnel.map((stage, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="font-medium">{stage.name}</span>
                  <span className="text-muted-foreground">{stage.percentage}%</span>
                </div>
                <div className="relative h-12 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand to-brand-deep flex items-center justify-center text-white font-semibold"
                    style={{ width: `${stage.percentage}%` }}
                  >
                    {stage.value.toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-sm text-slate-900">
              <strong>轉換率：7%</strong>
              <br />
              每 100 位訪客中有 7 位完成目標行動
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
