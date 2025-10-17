import { useI18n } from '../context/LanguageProvider';
import { formatPrice } from '../lib/pricing';

export function Pricing() {
  const { t } = useI18n();

  const routes = [
    { route: 'Istanbul Airport → Taksim', vehicle: t.form.sedan, price: 70 },
    { route: 'Istanbul Airport → Sultanahmet', vehicle: t.form.sedan, price: 75 },
    { route: 'Istanbul Airport → Besiktas', vehicle: t.form.minivan, price: 95 },
    { route: 'Sabiha Airport → Kadikoy', vehicle: t.form.sedan, price: 65 },
    { route: 'Sabiha Airport → Taksim', vehicle: t.form.minivan, price: 110 },
    { route: 'Antalya Airport → Lara', vehicle: t.form.sedan, price: 45 }
  ];

  return (
    <section id="pricing" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-md shadow-sky-200/60">
            {t.nav.pricing}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-slate-800">
            {t.pricing.title}
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            {t.pricing.note}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {routes.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/60 transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-1">
                    {t.pricing.route}
                  </div>
                  <div className="font-semibold text-slate-800">{item.route}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-1">
                    {t.pricing.vehicle}
                  </div>
                  <div className="text-sm text-slate-600">{item.vehicle}</div>
                </div>
                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm text-slate-500">{t.pricing.from}</span>
                    <span className="text-2xl font-bold text-sky-600">{formatPrice(item.price)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
