import { FileText, PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-2xl border-2 border-dashed border-border p-16 text-center">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center mx-auto mb-6">
        <FileText className="w-10 h-10 text-brand-link" />
      </div>
      <h3 className="mb-3">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      <button
        onClick={onAction}
        className="bg-gradient-to-r from-brand to-brand-deep text-white rounded-xl py-3 px-6 flex items-center justify-center gap-2 hover:from-brand-deep hover:to-brand-strong transition-all mx-auto"
      >
        <PlusCircle className="w-5 h-5" />
        <span>{actionLabel}</span>
      </button>
    </div>
  );
}
