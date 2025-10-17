import { Car, Map, Briefcase, Crown } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';

export function Services() {
  const { t } = useI18n();
  const items = [
    {
      title: t.services.airport,
      description: t.services.airportDesc,
      Icon: Car
    },
    {
      title: t.services.intercity,
      description: t.services.intercityDesc,
      Icon: Map
    },
    {
      title: t.services.vip,
      description: t.services.vipDesc,
      Icon: Crown
    },
    {
      title: t.services.corporate,
      description: t.services.corporateDesc,
      Icon: Briefcase
    }
  ];

  return (
    <section id="services" className="py-16 bg-gradient-to-br from-white to-indigo-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            {t.services.title}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="p-6 md:p-8 rounded-2xl bg-white/90 backdrop-blur border border-indigo-100 shadow-xl shadow-indigo-100/60 space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-amber-500 flex items-center justify-center text-white">
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
