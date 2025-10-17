import { DollarSign, Clock, Shield, CheckCircle } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';

export function WhyUs() {
  const { t } = useI18n();

  const features = [
    {
      icon: DollarSign,
      title: t.whyUs.fixedPrice,
      description: t.whyUs.fixedPriceDesc
    },
    {
      icon: Clock,
      title: t.whyUs.support,
      description: t.whyUs.supportDesc
    },
    {
      icon: Shield,
      title: t.whyUs.drivers,
      description: t.whyUs.driversDesc
    },
    {
      icon: CheckCircle,
      title: t.whyUs.onTime,
      description: t.whyUs.onTimeDesc
    }
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-500 font-semibold mb-4">
            {t.footer.company}
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
            {t.whyUs.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-lg shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white drop-shadow" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
