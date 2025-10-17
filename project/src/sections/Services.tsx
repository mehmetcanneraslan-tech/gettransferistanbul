import { Plane, Route, Star, Briefcase } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';

export function Services() {
  const { t } = useI18n();

  const services = [
    {
      icon: Plane,
      title: t.services.airport,
      description: t.services.airportDesc,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Route,
      title: t.services.intercity,
      description: t.services.intercityDesc,
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Star,
      title: t.services.vip,
      description: t.services.vipDesc,
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Briefcase,
      title: t.services.corporate,
      description: t.services.corporateDesc,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  return (
    <section id="services" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-md shadow-sky-200/60">
            {t.nav.services}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-slate-800">
            {t.services.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-slate-200 rounded-2xl shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className={`h-1.5 bg-gradient-to-r ${service.color}`} />
                <div className="p-6 space-y-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 text-white drop-shadow" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
