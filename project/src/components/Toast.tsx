import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

type ToastVariant = 'success' | 'error' | 'warning';

type ToastProps = {
  open: boolean;
  variant: ToastVariant;
  message: string;
  onClose: () => void;
  icon?: ReactNode;
  duration?: number;
};

const variantStyles: Record<ToastVariant, string> = {
  success: 'bg-emerald-500 text-white',
  error: 'bg-rose-500 text-white',
  warning: 'bg-amber-500 text-white'
};

export function Toast({
  open,
  variant,
  message,
  onClose,
  icon,
  duration = 4000
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, duration);
    return () => window.clearTimeout(timer);
  }, [open, onClose, duration]);

  if (!open) return null;

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={[
          'flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl shadow-slate-900/20',
          variantStyles[variant]
        ].join(' ')}
      >
        {icon}
        <span className="font-semibold">{message}</span>
        <button
          type="button"
          className="ml-2 rounded-full bg-white/20 p-1 hover:bg-white/30 transition-colors"
          onClick={onClose}
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
