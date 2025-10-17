import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';

const faqKeys = [
  { q: 'q1', a: 'a1' },
  { q: 'q2', a: 'a2' },
  { q: 'q3', a: 'a3' },
  { q: 'q4', a: 'a4' },
  { q: 'q5', a: 'a5' },
  { q: 'q6', a: 'a6' }
] as const;

export function FAQ() {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActive((current) => (current === index ? null : index));
  };

  return (
    <section id="faq" className="py-16 bg-gradient-to-br from-white via-indigo-50/40 to-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            {t.faq.title}
          </h2>
        </div>
        <div className="space-y-4">
          {faqKeys.map((item, index) => {
            const isActive = active === index;
            return (
              <article
                key={item.q}
                className="rounded-2xl border border-indigo-100 bg-white shadow-lg shadow-indigo-100/60"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-expanded={isActive}
                  className="w-full px-6 md:px-8 py-4 md:py-5 flex items-center justify-between gap-4 text-left text-lg font-semibold text-slate-800"
                >
                  <span>{t.faq[item.q]}</span>
                  <span
                    className={[
                      'inline-flex items-center justify-center rounded-full border border-indigo-200 p-2 text-indigo-600 transition-transform',
                      isActive ? 'bg-indigo-600 text-white rotate-180 border-indigo-600' : ''
                    ].join(' ')}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </span>
                </button>
                {isActive && (
                  <div className="px-6 md:px-8 pb-6 text-slate-600 leading-relaxed">
                    {t.faq[item.a]}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
