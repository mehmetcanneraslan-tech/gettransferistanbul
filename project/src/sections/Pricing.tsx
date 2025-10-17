import { useMemo } from 'react';
import { useI18n } from '../context/LanguageProvider';
import { formatPrice } from '../lib/pricing';

const pricingData = [
  { route: 'Istanbul Airport → Taksim', vehicle: 'Sedan', price: 45 },
  { route: 'Istanbul Airport → Sultanahmet', vehicle: 'Minivan', price: 60 },
  { route: 'Sabiha Airport → Kadıköy', vehicle: 'Sedan', price: 40 },
  { route: 'Antalya Airport → Lara', vehicle: 'Minivan', price: 35 }
];

export function Pricing() {
  const { t, language } = useI18n();

  const formattedData = useMemo(
    () =>
      pricingData.map((item) => ({
        ...item,
        priceLabel: formatPrice(item.price, language === 'tr' ? '₺' : '€')
      })),
    [language]
  );

  return (
    <section id="pricing" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            {t.pricing.title}
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">{t.pricing.note}</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-indigo-100 shadow-xl shadow-indigo-100/60 bg-white">
          <table className="min-w-full divide-y divide-indigo-50">
            <thead className="bg-indigo-50/60">
              <tr className="text-left text-sm font-semibold text-indigo-700 uppercase tracking-[0.2em]">
                <th className="px-6 py-4">{t.pricing.route}</th>
                <th className="px-6 py-4">{t.pricing.vehicle}</th>
                <th className="px-6 py-4">{t.pricing.price}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-indigo-50 text-sm md:text-base">
              {formattedData.map((item) => (
                <tr key={`${item.route}-${item.vehicle}`} className="hover:bg-indigo-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{item.route}</td>
                  <td className="px-6 py-4 text-slate-500">{item.vehicle}</td>
                  <td className="px-6 py-4 text-indigo-600 font-semibold">{item.priceLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
