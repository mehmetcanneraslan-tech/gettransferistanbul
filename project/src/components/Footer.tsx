import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';

const phoneEnv = import.meta.env.VITE_CONTACT_PHONE ?? '+90 536 429 12 21';
const whatsappEnv = import.meta.env.VITE_CONTACT_WHATSAPP ?? '+90 536 429 12 21';
const emailEnv = import.meta.env.VITE_CONTACT_EMAIL ?? 'info@airporttransfer.com';

export function Footer() {
  const { t } = useI18n();

  const quickLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.pricing, href: '#pricing' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contact, href: '#contact' }
  ];

  return (
    <footer className="border-t border-slate-200 bg-white/90 text-slate-500 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="relative flex h-10 w-10 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-blue-500 to-amber-500 opacity-70 blur-md" />
                <span className="relative text-white font-semibold">GT</span>
              </span>
              <div>
                <p className="text-slate-800 font-semibold text-lg">{t.footer.company}</p>
                <p className="text-slate-500 text-sm">{t.footer.description}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-slate-800 font-semibold mb-4 tracking-wide">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-600 hover:text-indigo-600 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 font-semibold mb-4 tracking-wide">{t.footer.legal}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.footer.privacy}
                </button>
              </li>
              <li>
                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.footer.terms}
                </button>
              </li>
              <li>
                <button className="text-slate-600 hover:text-slate-900 transition-colors">
                  {t.footer.kvkk}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-slate-800 font-semibold mb-4 tracking-wide">{t.contact.title}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-300" />
                <a
                  href={`tel:${phoneEnv.replace(/[^\d+]/g, '')}`}
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {phoneEnv}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-300" />
                <a
                  href={`https://wa.me/${whatsappEnv.replace(/[^\d+]/g, '')}`}
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-300" />
                <a
                  href={`mailto:${emailEnv}`}
                  className="text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {emailEnv}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-slate-600">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-indigo-300" />
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
