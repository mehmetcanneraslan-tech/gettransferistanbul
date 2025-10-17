import { useI18n } from '../context/LanguageProvider';

type LangSwitchProps = {
  className?: string;
  onSelect?: () => void;
};

export function LangSwitch({ className = 'flex items-center gap-2', onSelect }: LangSwitchProps) {
  const { language, setLanguage, languages } = useI18n();

  return (
    <nav className={className}>
      {(Object.keys(languages) as Array<keyof typeof languages>).map((lng) => {
        const isActive = lng === language;
        return (
          <button
            key={lng}
            type="button"
            onClick={() => {
              setLanguage(lng);
              onSelect?.();
            }}
            aria-pressed={isActive}
            className={[
              'px-3 py-1 rounded-full text-sm uppercase tracking-wide transition-all shadow-sm',
              isActive
                ? 'font-semibold bg-indigo-600 text-white'
                : 'bg-white/80 text-slate-500 hover:text-indigo-600 border border-indigo-100'
            ].join(' ')}
          >
            <span className="mr-1" aria-hidden="true">
              {languages[lng].flag}
            </span>
            {lng}
          </button>
        );
      })}
    </nav>
  );
}
