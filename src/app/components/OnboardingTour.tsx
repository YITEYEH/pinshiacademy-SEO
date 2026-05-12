import { X, ArrowRight } from 'lucide-react';
import { useState } from 'react';

interface OnboardingTourProps {
  onClose: () => void;
}

export function OnboardingTour({ onClose }: OnboardingTourProps) {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: '歡迎使用 SEO產生器！',
      description: '透過 AI 技術，快速生成高品質 SEO 文章。讓我們花 30 秒了解核心功能。',
      highlight: '🎉',
    },
    {
      title: '5 步驟生成文章',
      description: '從關鍵字研究、H2 選擇到文章生成，全程 AI 自動化，您只需要提供主題。',
      highlight: '📝',
    },
    {
      title: '段落 AI 編輯',
      description: '每個段落都可以重新生成、擴寫、縮短或改寫語氣，完全掌控文章品質。',
      highlight: '✨',
    },
    {
      title: 'SEO 分析與優化',
      description: '即時查看 SEO 分數、關鍵字覆蓋率，並獲得改善建議，讓您的文章更具競爭力。',
      highlight: '🎯',
    },
    {
      title: '匯出與交付',
      description: '完成後可複製 Markdown 或下載 HTML，再貼到 CMS 或交給客戶；後續將再補 WordPress 等一鍵發布。',
      highlight: '📤',
    },
  ];

  const currentStep = steps[step];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-4 shadow-2xl sm:p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-accent rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{currentStep.highlight}</div>
          <h2 className="mb-3">{currentStep.title}</h2>
          <p className="text-muted-foreground">{currentStep.description}</p>
        </div>

        <div className="flex items-center justify-center gap-2 mb-6">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === step ? 'w-8 bg-gradient-to-r from-brand to-brand-deep' : 'w-2 bg-muted'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-3">
          {step > 0 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-6 py-3 bg-accent rounded-xl hover:bg-accent/80 transition-colors"
            >
              上一步
            </button>
          )}
          <button
            onClick={() => {
              if (step < steps.length - 1) {
                setStep(step + 1);
              } else {
                onClose();
              }
            }}
            className="flex-1 bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-3 px-6 flex items-center justify-center gap-2 hover:from-brand-deep hover:to-brand-strong transition-all"
          >
            <span>{step < steps.length - 1 ? '下一步' : '開始使用'}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
