import { useState } from 'react';
import { RefreshCw, Maximize2, Minimize2, Wand2, PlusCircle, Check, X, Loader2 } from 'lucide-react';

interface EditableParagraphProps {
  title: string;
  content: string;
  onUpdate: (newContent: string) => void;
  /** 若提供，將改由後端 Edge Function 產生（不帶任何 API key） */
  onRequestAi?: (instruction: string, currentContent: string) => Promise<string | null>;
}

const ACTION_INSTRUCTION: Record<string, string> = {
  regenerate: '請改寫以下段落，保留原意但換句構與用詞，繁體中文，約相同長度：\n\n',
  expand: '請在以下段落基礎上擴寫，增加具體說明與例子，繁體中文，長度約為原本的 1.3 倍：\n\n',
  shorten: '請精簡以下段落，保留重點，繁體中文，長度約為原本的一半：\n\n',
  professional: '請改寫為專業正式語氣，繁體中文：\n\n',
  friendly: '請改寫為輕鬆友善語氣，繁體中文：\n\n',
  sales: '請改寫為具說服力、帶行動呼籲的語氣，繁體中文（勿過度誇大）：\n\n',
  cta: '請在以下段落結尾自然加上一句 CTA（聯絡／試用／下載擇一），繁體中文：\n\n',
};

export function EditableParagraph({ title, content, onUpdate, onRequestAi }: EditableParagraphProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempContent, setTempContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleAction = async (action: string) => {
    setIsLoading(true);
    setShowActions(false);

    try {
      if (onRequestAi) {
        const prefix = ACTION_INSTRUCTION[action] ?? ACTION_INSTRUCTION.regenerate;
        const text = await onRequestAi(prefix, content);
        if (text) {
          setTempContent(text);
          setShowPreview(true);
        } else {
          setTempContent(content);
          setShowPreview(true);
        }
      } else {
        await new Promise((r) => setTimeout(r, 800));
        const mockResults: Record<string, string> = {
          regenerate:
            '透過 AI 技術，企業能夠自動化複雜的行銷任務，包括內容生成、受眾分析與廣告優化。這些工具利用機器學習演算法，持續從數據中學習並優化策略，為企業帶來更高的投資回報率。',
          expand:
            content +
            ' 此外，AI 工具還能提供深度的數據洞察，幫助行銷人員做出更精準的決策。透過預測分析，企業可以提前識別市場趨勢，調整策略以保持競爭優勢。',
          shorten: '透過 AI 技術，企業能夠自動化行銷任務並優化策略，提升投資回報率。',
          professional:
            'AI 行銷工具透過機器學習與數據分析技術，為企業提供自動化行銷解決方案。系統能夠精準分析受眾行為，優化廣告投放策略，並持續改進行銷效果，協助企業提升市場競爭力。',
          friendly:
            '想像一下，有個超聰明的助手 24 小時幫你處理行銷工作！AI 工具就是這樣的存在。它會自動分析數據、優化廣告，讓你的行銷變得更輕鬆又有效。是不是很棒呢？',
          sales:
            '立即體驗 AI 行銷工具的強大威力！這些創新技術能為您的企業帶來革命性的改變，大幅提升行銷效率與轉換率。不要錯過這個讓業績翻倍的機會，現在就開始使用 AI 優化您的行銷策略！',
          cta: content + '\n\n若您想進一步了解，歡迎立即預約免費諮詢。',
        };
        setTempContent(mockResults[action] || content);
        setShowPreview(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    onUpdate(tempContent);
    setShowPreview(false);
    setTempContent('');
  };

  const handleReject = () => {
    setShowPreview(false);
    setTempContent('');
  };

  return (
    <div className="relative mb-6 group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <h3 className="mb-3">{title}</h3>

      {isHovered && !showPreview && (
        <div className="absolute top-0 right-0 flex gap-2 bg-white shadow-lg rounded-lg p-2 border border-border z-10">
          <button
            type="button"
            onClick={() => void handleAction('regenerate')}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="重新生成"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            type="button"
            onClick={() => void handleAction('expand')}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="擴寫內容"
          >
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <button
            type="button"
            onClick={() => void handleAction('shorten')}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="縮短內容"
          >
            <Minimize2 className="w-4 h-4 text-muted-foreground" />
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowActions(!showActions)}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              title="改寫語氣"
            >
              <Wand2 className="w-4 h-4 text-muted-foreground" />
            </button>
            {showActions && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-lg border border-border p-2 w-40 z-20">
                <button
                  type="button"
                  onClick={() => void handleAction('professional')}
                  className="w-full text-left px-3 py-2 hover:bg-accent rounded text-sm"
                >
                  專業正式
                </button>
                <button
                  type="button"
                  onClick={() => void handleAction('friendly')}
                  className="w-full text-left px-3 py-2 hover:bg-accent rounded text-sm"
                >
                  輕鬆親切
                </button>
                <button
                  type="button"
                  onClick={() => void handleAction('sales')}
                  className="w-full text-left px-3 py-2 hover:bg-accent rounded text-sm"
                >
                  銷售導向
                </button>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => void handleAction('cta')}
            className="p-2 hover:bg-accent rounded-lg transition-colors"
            title="插入 CTA"
          >
            <PlusCircle className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      )}

      {isLoading ? (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex items-center justify-center gap-3">
          <Loader2 className="w-5 h-5 animate-spin text-brand-link" />
          <span className="text-brand-deep">AI 處理中…</span>
        </div>
      ) : showPreview ? (
        <div className="space-y-3">
          <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 relative">
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                type="button"
                onClick={handleAccept}
                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                title="接受"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                title="還原"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-muted-foreground leading-relaxed pr-20 whitespace-pre-wrap">{tempContent}</p>
          </div>
          <div className="bg-muted/50 border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">原始內容：</p>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{content}</p>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{content}</p>
      )}
    </div>
  );
}
