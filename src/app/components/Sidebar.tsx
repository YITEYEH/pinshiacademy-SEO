import { Home, FileText, Search, Upload, Settings, Folder, User, PlusCircle, Calendar, BarChart3, Database, Code } from 'lucide-react';
import { isComingSoonFeature } from '@/app/navigation';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'new-article', icon: PlusCircle, label: '新增文章', highlight: true },
    { id: 'articles', icon: Folder, label: '文章管理' },
    { id: 'calendar', icon: Calendar, label: '內容日曆' },
    { id: 'analytics', icon: BarChart3, label: '分析報表' },
    { id: 'keywords', icon: Search, label: '關鍵字研究' },
    { id: 'templates', icon: FileText, label: '模板管理' },
    { id: 'data-sources', icon: Database, label: '數據源設定' },
    { id: 'tracking', icon: Code, label: '追蹤代碼' },
    { id: 'wordpress', icon: Upload, label: 'WordPress 串接' },
    { id: 'account', icon: User, label: '帳號與整合' },
    { id: 'settings', icon: Settings, label: '設定' },
  ];

  return (
    <div className="w-64 bg-white border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand to-brand-deep flex items-center justify-center">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">SEO產生器</h1>
            <p className="text-xs text-muted-foreground">AI 內容生成平台</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              currentPage === item.id
                ? 'bg-gradient-to-r from-brand-soft-from to-brand-soft-to text-brand-deep'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            } ${item.highlight ? 'ring-2 ring-slate-400/20' : ''}`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            <span className="font-medium flex-1 text-left">{item.label}</span>
            {isComingSoonFeature(item.id) && (
              <span className="text-[10px] font-medium uppercase tracking-wide text-amber-700 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5 shrink-0">
                預告
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <div className="bg-gradient-to-br from-brand to-brand-deep rounded-xl p-4 text-white">
          <p className="text-sm font-medium mb-1">升級至 Pro</p>
          <p className="text-xs opacity-90 mb-3">解鎖無限文章生成</p>
          <button className="w-full bg-white text-brand-link rounded-lg py-2 text-sm font-medium hover:bg-slate-50 transition-colors">
            立即升級
          </button>
        </div>
      </div>
    </div>
  );
}
