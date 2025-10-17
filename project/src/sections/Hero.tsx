import { ArrowRight, MessageCircle } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';
import { Badge } from '../components/Badge';

const whatsappEnv = import.meta.env.VITE_CONTACT_WHATSAPP ?? '+90 536 429 12 21';
const whatsappLink = `https://wa.me/${whatsappEnv.replace(/[^\d+]/g, '')}`;

export function Hero() {
  const { t } = useI18n();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/vip-hero.jpg')] bg-cover bg-center brightness-110 saturate-110" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/85 via-white/75 to-white/65 backdrop-blur-[1px]" />
      </div>
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(680px_circle_at_50%_-10%,rgba(56,189,248,0.2),transparent)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-6 py-2 text-sm font-semibold text-slate-600 shadow-lg shadow-indigo-200/40 backdrop-blur">
            ✨ {t.footer.company}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-600 to-amber-500 drop-shadow">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            {t.hero.subtitle}
          </p>
          <div className="max-w-2xl mx-auto">
            <Badge />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              onClick={() => scrollTo('booking')}
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-blue-500 to-amber-500 text-white font-semibold shadow-lg shadow-indigo-300/40 transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              {t.hero.bookNow}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="group px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold shadow-lg shadow-emerald-300/40 transition-all hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              {t.hero.whatsapp}
            </a>
            <button
              type="button"
              onClick={() => scrollTo('pricing')}
              className="px-8 py-4 rounded-xl border border-slate-200 bg-white/80 text-slate-600 font-semibold transition-all hover:bg-white hover:-translate-y-0.5 shadow-lg shadow-slate-200/60"
            >
              {t.hero.seePricing}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
