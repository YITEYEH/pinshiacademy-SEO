import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, Plus, Filter, Grid3x3, List } from 'lucide-react';
import { Toast } from './Toast';

interface ContentCalendarProps {
  onNavigate: (page: string) => void;
}

export function ContentCalendar({ onNavigate }: ContentCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // May 2026
  const [view, setView] = useState<'month' | 'week'>('month');
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [filter, setFilter] = useState<'all' | 'scheduled' | 'published' | 'draft'>('all');

  const scheduledArticles = [
    { id: 1, title: 'AI 行銷工具完整指南', date: new Date(2026, 4, 8), time: '09:00', status: 'scheduled', color: 'blue' },
    { id: 2, title: 'SEO 優化最佳實踐', date: new Date(2026, 4, 12), time: '14:00', status: 'scheduled', color: 'purple' },
    { id: 3, title: '內容行銷策略大全', date: new Date(2026, 4, 15), time: '10:00', status: 'scheduled', color: 'green' },
    { id: 4, title: '社群媒體經營技巧', date: new Date(2026, 4, 20), time: '11:00', status: 'published', color: 'orange' },
    { id: 5, title: 'Email 行銷完整教學', date: new Date(2026, 4, 25), time: '15:00', status: 'scheduled', color: 'blue' },
    { id: 6, title: '數位廣告投放指南', date: new Date(2026, 4, 28), time: '09:30', status: 'draft', color: 'gray' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Previous month's days
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Current month's days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getArticlesForDate = (date: Date | null) => {
    if (!date) return [];
    return scheduledArticles.filter(article => {
      if (filter !== 'all' && article.status !== filter) return false;
      return (
        article.date.getDate() === date.getDate() &&
        article.date.getMonth() === date.getMonth() &&
        article.date.getFullYear() === date.getFullYear()
      );
    });
  };

  const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const today = new Date();
  const isToday = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const colorClasses = {
    blue: 'bg-slate-100 border-slate-300 text-brand-deep',
    purple: 'bg-slate-100 border-slate-300 text-slate-700',
    green: 'bg-green-100 border-green-300 text-green-700',
    orange: 'bg-orange-100 border-orange-300 text-orange-700',
    gray: 'bg-gray-100 border-gray-300 text-gray-700',
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="mb-2">內容日曆</h1>
          <p className="text-muted-foreground">視覺化管理文章排程與發布時間</p>
        </div>
        <button
          onClick={() => onNavigate('new-article')}
          className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand to-brand-deep px-6 py-3 text-white transition-all hover:from-brand-deep hover:to-brand-strong"
        >
          <Plus className="w-5 h-5" />
          <span>新增排程文章</span>
        </button>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-white p-4 sm:p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center justify-center gap-4 sm:justify-start">
            <button
              onClick={previousMonth}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h2 className="min-w-0 flex-1 text-center text-base font-semibold sm:text-lg">
              {currentDate.getFullYear()} 年 {monthNames[currentDate.getMonth()]}
            </h2>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-end sm:gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-4 py-2 bg-input-background rounded-lg text-sm"
            >
              <option value="all">全部狀態</option>
              <option value="scheduled">已排程</option>
              <option value="published">已發布</option>
              <option value="draft">草稿</option>
            </select>

            <div className="flex gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setView('month')}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  view === 'month' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setView('week')}
                className={`px-3 py-1.5 rounded text-sm transition-colors ${
                  view === 'week' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {view === 'month' ? (
          <div className="-mx-1 overflow-x-auto px-1 sm:mx-0 sm:overflow-visible sm:px-0">
            <div className="grid min-w-[720px] grid-cols-7 gap-2 sm:min-w-0">
            {weekDays.map((day) => (
              <div key={day} className="text-center py-2 text-sm font-medium text-muted-foreground">
                {day}
              </div>
            ))}

            {getDaysInMonth(currentDate).map((date, index) => {
              const articles = getArticlesForDate(date);
              const isCurrentDay = isToday(date);

              return (
                <div
                  key={index}
                  className={`min-h-[120px] border rounded-xl p-2 transition-colors ${
                    date
                      ? isCurrentDay
                        ? 'bg-slate-50 border-slate-300'
                        : 'bg-white border-border hover:border-slate-300'
                      : 'bg-muted/30 border-transparent'
                  }`}
                >
                  {date && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${isCurrentDay ? 'text-brand-link' : 'text-muted-foreground'}`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {articles.slice(0, 2).map((article) => (
                          <div
                            key={article.id}
                            className={`text-xs p-1.5 rounded border ${
                              colorClasses[article.color as keyof typeof colorClasses]
                            } cursor-pointer hover:shadow-sm transition-all`}
                            onClick={() => setToast({ type: 'info', message: `查看：${article.title}` })}
                          >
                            <div className="font-medium truncate">{article.title}</div>
                            <div className="flex items-center gap-1 mt-0.5 opacity-70">
                              <Clock className="w-3 h-3" />
                              <span>{article.time}</span>
                            </div>
                          </div>
                        ))}
                        {articles.length > 2 && (
                          <div className="text-xs text-muted-foreground text-center py-1">
                            +{articles.length - 2} 更多
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          </div>
        ) : (
          <div className="space-y-2">
            {scheduledArticles
              .filter(article => filter === 'all' || article.status === filter)
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((article) => (
                <div
                  key={article.id}
                  className="flex flex-col gap-3 rounded-xl border border-border p-4 transition-colors hover:border-slate-300 cursor-pointer sm:flex-row sm:items-center sm:gap-4"
                  onClick={() => setToast({ type: 'info', message: `查看：${article.title}` })}
                >
                  <div className={`w-12 h-12 rounded-lg ${colorClasses[article.color as keyof typeof colorClasses]} flex items-center justify-center flex-shrink-0`}>
                    <CalendarIcon className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1">{article.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>
                        {article.date.getFullYear()}/{article.date.getMonth() + 1}/{article.date.getDate()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.time}
                      </span>
                    </div>
                  </div>
                  <div>
                    {article.status === 'scheduled' && (
                      <span className="px-3 py-1 bg-slate-100 text-brand-deep rounded-full text-sm font-medium">
                        已排程
                      </span>
                    )}
                    {article.status === 'published' && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        已發布
                      </span>
                    )}
                    {article.status === 'draft' && (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        草稿
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
        <div className="rounded-2xl border border-border bg-white p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-brand-link" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">本月已排程</p>
              <p className="text-2xl font-semibold">12</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">本月已發布</p>
              <p className="text-2xl font-semibold">8</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-white p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">待發布</p>
              <p className="text-2xl font-semibold">4</p>
            </div>
          </div>
        </div>
      </div>

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
}
