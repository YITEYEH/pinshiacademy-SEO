import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

interface ToastProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

export function Toast({ type, message, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const config = {
    success: { icon: CheckCircle, bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800' },
    error: { icon: XCircle, bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800' },
    info: { icon: Info, bg: 'bg-slate-50', border: 'border-slate-200', text: 'text-slate-800' },
  };

  const { icon: Icon, bg, border, text } = config[type];

  return (
    <div className={`fixed bottom-6 right-6 ${bg} border ${border} rounded-xl p-4 shadow-lg flex items-center gap-3 animate-slide-up max-w-md z-50`}>
      <Icon className={`w-5 h-5 ${text}`} />
      <p className={`${text} flex-1`}>{message}</p>
      <button onClick={onClose} className={`${text} hover:opacity-70`}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
