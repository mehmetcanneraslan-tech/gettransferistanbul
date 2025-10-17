import { ReactNode } from 'react';
import { X } from 'lucide-react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  actions?: ReactNode;
  children?: ReactNode;
};

export function Modal({ open, onClose, title, description, actions, children }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative max-w-lg w-full rounded-3xl bg-white shadow-2xl shadow-indigo-200/60 border border-indigo-100 p-6 md:p-8 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
            {description && <p className="text-slate-600">{description}</p>}
          </div>
          <button
            type="button"
            className="rounded-full bg-indigo-50 text-indigo-600 p-2 hover:bg-indigo-100 transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children && <div className="space-y-3 text-slate-700">{children}</div>}
        {actions && <div className="flex flex-wrap gap-3 justify-end">{actions}</div>}
      </div>
    </div>
  );
}
