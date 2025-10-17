import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';

interface ToastProps {
  type: 'success' | 'error' | 'warning';
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ type, message, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <XCircle className="w-5 h-5 text-rose-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />
  };

  const styles = {
    success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    error: 'border-rose-200 bg-rose-50 text-rose-700',
    warning: 'border-amber-200 bg-amber-50 text-amber-700'
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 max-w-md w-full mx-4 sm:mx-0 border border-l-4 rounded-xl shadow-xl shadow-slate-200/60 p-4 bg-white/90 backdrop-blur ${styles[type]} animate-slide-in`}
      role="alert"
    >
      <div className="flex items-start gap-3">
        {icons[type]}
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="rounded p-1 text-slate-400 transition-colors hover:bg-slate-100"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
