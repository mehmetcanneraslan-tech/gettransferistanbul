import { Shield, Clock, ThumbsUp, BadgeCheck } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';

const icons = [Shield, Clock, BadgeCheck, ThumbsUp];

export function WhyUs() {
  const { t } = useI18n();
  const items = [
    {
      title: t.whyUs.fixedPrice,
      description: t.whyUs.fixedPriceDesc,
      Icon: icons[0]
    },
    {
      title: t.whyUs.support,
      description: t.whyUs.supportDesc,
      Icon: icons[1]
    },
    {
      title: t.whyUs.drivers,
      description: t.whyUs.driversDesc,
      Icon: icons[2]
    },
    {
      title: t.whyUs.onTime,
      description: t.whyUs.onTimeDesc,
      Icon: icons[3]
    }
  ];

  return (
    <section className="py-16" id="why-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            {t.whyUs.title}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="p-6 bg-white border border-indigo-50 rounded-2xl shadow-xl shadow-indigo-100/60 space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-amber-400 flex items-center justify-center text-white shadow-lg shadow-indigo-200/60">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
