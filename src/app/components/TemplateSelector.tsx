import { FileText, ShoppingBag, Scale, Newspaper, Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { listTemplates, type WritingTemplateRow } from '@/lib/templatesRepo';

export type TemplateSelection = {
  id: string;
  name: string;
  /** 來自寫作模板的提示詞摘要，供生成時帶入語境 */
  promptBodyExcerpt?: string;
};

type ColorKey = 'blue' | 'green' | 'purple' | 'orange';

type StaticCard = {
  selection: TemplateSelection;
  description: string;
  features: string[];
  icon: typeof FileText;
  color: ColorKey;
};

const STATIC_CARDS: StaticCard[] = [
  {
    selection: { id: 'blog', name: 'SEO 部落格模板' },
    description: '適合一般部落格文章，包含前言、多個 H2 段落與結論',
    features: ['完整 SEO 結構', '包含 FAQ', '內部連結建議'],
    icon: FileText,
    color: 'blue',
  },
  {
    selection: { id: 'ecommerce', name: '電商導購模板' },
    description: '適合產品介紹與導購文章，強調轉換率與 CTA',
    features: ['產品比較表格', '多個 CTA', '優惠資訊區塊'],
    icon: ShoppingBag,
    color: 'green',
  },
  {
    selection: { id: 'legal', name: '法律專業模板' },
    description: '適合法律、財務等專業內容，語氣正式嚴謹',
    features: ['專業術語', '法規引用', '案例分析'],
    icon: Scale,
    color: 'purple',
  },
  {
    selection: { id: 'news', name: '新聞資訊模板' },
    description: '適合新聞、快訊類文章，簡潔明瞭',
    features: ['精簡段落', '時事相關', '資料來源'],
    icon: Newspaper,
    color: 'orange',
  },
];

function iconForDbName(name: string) {
  if (name.includes('電商')) return ShoppingBag;
  if (name.includes('法律')) return Scale;
  if (name.includes('新聞')) return Newspaper;
  return FileText;
}

const colorClasses: Record<ColorKey, { bg: string; light: string; border: string }> = {
  blue: { bg: 'from-slate-600 to-slate-700', light: 'from-slate-50 to-slate-100', border: 'border-brand-deep' },
  green: { bg: 'from-slate-600 to-slate-700', light: 'from-slate-50 to-slate-100', border: 'border-brand-deep' },
  purple: { bg: 'from-slate-600 to-slate-700', light: 'from-slate-50 to-slate-100', border: 'border-brand-deep' },
  orange: { bg: 'from-slate-600 to-slate-700', light: 'from-slate-50 to-slate-100', border: 'border-brand-deep' },
};

const DB_COLORS: ColorKey[] = ['blue', 'green', 'purple', 'orange'];

export const DEFAULT_TEMPLATE_PICK: TemplateSelection = STATIC_CARDS[0].selection;

type TemplateSelectorProps = {
  value: TemplateSelection;
  onChange: (s: TemplateSelection) => void;
};

export function TemplateSelector({ value, onChange }: TemplateSelectorProps) {
  const [source, setSource] = useState<'loading' | 'static' | 'db'>('loading');
  const [dbRows, setDbRows] = useState<WritingTemplateRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      if (!getSupabase()) {
        if (!cancelled) setSource('static');
        return;
      }
      try {
        const rows = await listTemplates();
        if (cancelled) return;
        if (rows.length > 0) {
          setDbRows(rows);
          setSource('db');
        } else {
          setSource('static');
        }
      } catch {
        if (!cancelled) setSource('static');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (source !== 'db' || dbRows.length === 0) return;
    if (dbRows.some((r) => r.id === value.id)) return;
    const def = dbRows.find((r) => r.is_default) ?? dbRows[0];
    onChange({
      id: def.id,
      name: def.name,
      promptBodyExcerpt: def.prompt_body.slice(0, 800),
    });
  }, [source, dbRows, value.id, onChange]);

  const handleSelectStatic = (s: TemplateSelection) => {
    onChange({ id: s.id, name: s.name });
  };

  const handleSelectDb = (row: WritingTemplateRow) => {
    onChange({
      id: row.id,
      name: row.name,
      promptBodyExcerpt: row.prompt_body.slice(0, 800),
    });
  };

  if (source === 'loading') {
    return (
      <div className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        載入模板…
      </div>
    );
  }

  return (
    <div className="mb-6">
      <h4 className="mb-4">選擇文章模板（選填）</h4>
      <p className="text-xs text-muted-foreground mb-3">
        {source === 'db' ? '以下為你在「模板管理」中的寫作模板；若無法連線則顯示內建選項。' : '目前使用內建版型代碼（未連線或尚無雲端模板時）。'}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {source === 'static'
          ? STATIC_CARDS.map((template) => {
              const colors = colorClasses[template.color];
              const isSelected = value.id === template.selection.id;
              return (
                <button
                  key={template.selection.id}
                  type="button"
                  onClick={() => handleSelectStatic(template.selection)}
                  className={`relative text-left p-5 rounded-xl border-2 transition-all ${
                    isSelected ? `${colors.border} bg-gradient-to-br ${colors.light}` : 'border-border bg-white hover:border-slate-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-br from-brand to-brand-deep rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-3`}>
                    <template.icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2">{template.selection.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                  <div className="space-y-1">
                    {template.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })
          : dbRows.map((row, index) => {
              const color = DB_COLORS[index % DB_COLORS.length];
              const colors = colorClasses[color];
              const Icon = iconForDbName(row.name);
              const isSelected = value.id === row.id;
              return (
                <button
                  key={row.id}
                  type="button"
                  onClick={() => handleSelectDb(row)}
                  className={`relative text-left p-5 rounded-xl border-2 transition-all ${
                    isSelected ? `${colors.border} bg-gradient-to-br ${colors.light}` : 'border-border bg-white hover:border-slate-300'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-br from-brand to-brand-deep rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center mb-3`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="mb-2">{row.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{row.description ?? '使用者自訂模板，詳見「模板管理」提示詞。'}</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                      <span>{row.is_default ? '目前為預設模板' : '雲端寫作模板'}</span>
                    </div>
                  </div>
                </button>
              );
            })}
      </div>
    </div>
  );
}
