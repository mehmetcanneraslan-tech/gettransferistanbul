import { Plane, Mail, Phone, MapPin } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';

export function Footer() {
  const { t } = useI18n();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-slate-200 bg-white/90 text-slate-500 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 opacity-70 blur-lg" />
                <Plane className="relative w-6 h-6 text-white drop-shadow" />
              </span>
              <span className="text-xl font-semibold text-slate-800">{t.footer.company}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h3 className="text-slate-800 font-semibold mb-4 tracking-wide">{t.footer.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('pricing')}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {t.nav.pricing}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('faq')}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {t.nav.faq}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 font-semibold mb-4 tracking-wide">{t.footer.legal}</h3>
            <ul className="space-y-2">
              <li>
                <button className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  {t.footer.terms}
                </button>
              </li>
              <li>
                <button className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                  {t.footer.kvkk}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 font-semibold mb-4 tracking-wide">{t.contact.title}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-sky-300" />
                <a href="tel:+905364291221" className="text-slate-600 hover:text-slate-900 transition-colors">
                  +90 536 429 12 21
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-sky-300" />
                <a href="mailto:info@airporttransfer.com" className="text-slate-600 hover:text-slate-900 transition-colors">
                  info@airporttransfer.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-sky-300" />
                <span>{t.contact.addressValue}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-10 pt-8 text-center text-xs uppercase tracking-[0.4em] text-slate-400">
          <p>&copy; {new Date().getFullYear()} {t.footer.company}. {t.footer.allRights}</p>
        </div>
      </div>
    </footer>
  );
}
