import { AlertCircle } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';

export function Badge() {
  const { t } = useI18n();

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4 shadow-lg shadow-amber-200/40">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-sm font-semibold text-amber-700 leading-relaxed">{t.cashOnly}</p>
      </div>
    </div>
  );
}
