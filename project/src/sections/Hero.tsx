import { ArrowRight, MessageCircle } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';
import { Badge } from '../components/Badge';

export function Hero() {
  const { t } = useI18n();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/905364291221', '_blank');
  };

  return (
    <section id="hero" className="relative pt-32 pb-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/vip-hero.jpg')] bg-cover bg-center brightness-105 saturate-110 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/10" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(680px_circle_at_50%_-10%,rgba(56,189,248,0.18),transparent)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <p className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/70 px-6 py-2 text-sm font-semibold text-slate-600 shadow-lg shadow-sky-200/40 backdrop-blur">
            ✨ {t.footer.company}
          </p>
          <h1 className="mt-8 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 drop-shadow">
            {t.hero.title}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            {t.hero.subtitle}
          </p>

          <div className="max-w-2xl mx-auto mt-10">
            <Badge />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
            <button
              onClick={() => scrollToSection('booking')}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white font-semibold shadow-lg shadow-sky-300/40 transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              {t.hero.bookNow}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleWhatsApp}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-300/40 transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              {t.hero.whatsapp}
            </button>

            <button
              onClick={() => scrollToSection('pricing')}
              className="px-8 py-4 rounded-xl border border-slate-200 bg-white/80 text-slate-600 font-semibold transition-all hover:bg-white hover:-translate-y-0.5 shadow-lg shadow-slate-200/60"
            >
              {t.hero.seePricing}
            </button>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60">
            <div className="text-3xl font-semibold text-sky-600 mb-2">24/7</div>
            <div className="text-sm text-slate-600">{t.whyUs.support}</div>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60">
            <div className="text-3xl font-semibold text-sky-600 mb-2">100%</div>
            <div className="text-sm text-slate-600">{t.whyUs.onTime}</div>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60">
            <div className="text-3xl font-semibold text-sky-600 mb-2">5★</div>
            <div className="text-sm text-slate-600">{t.whyUs.drivers}</div>
          </div>
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/60">
            <div className="text-3xl font-semibold text-sky-600 mb-2">
              {t.pricing.from}
            </div>
            <div className="text-sm text-slate-600">{t.whyUs.fixedPrice}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
