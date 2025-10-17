import { useState } from 'react';
import { Menu, X, Phone, MessageCircle, Mail, Globe } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';
import { LangSwitch } from './LangSwitch';

const phoneEnv = import.meta.env.VITE_CONTACT_PHONE ?? '+90 536 429 12 21';
const whatsappEnv = import.meta.env.VITE_CONTACT_WHATSAPP ?? '+90 536 429 12 21';
const emailEnv = import.meta.env.VITE_CONTACT_EMAIL ?? 'info@airporttransfer.com';

const sanitizeNumber = (value: string) => value.replace(/[^\d+]/g, '');
const whatsappLink = `https://wa.me/${sanitizeNumber(whatsappEnv)}`;

function ContactActions({ variant }: { variant: 'desktop' | 'mobile' }) {
  const baseClasses =
    'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-indigo-200/60';

  const actions = [
    {
      href: `tel:${sanitizeNumber(phoneEnv)}`,
      label: phoneEnv,
      icon: <Phone className="w-4 h-4" />,
      className: `${baseClasses} bg-white/80 text-indigo-700 border border-indigo-100 hover:bg-white`,
      ariaLabel: 'Call us'
    },
    {
      href: whatsappLink,
      label: 'WhatsApp',
      icon: <MessageCircle className="w-4 h-4" />,
      className: `${baseClasses} bg-emerald-500 text-white hover:bg-emerald-600`,
      ariaLabel: 'Chat on WhatsApp'
    },
    {
      href: `mailto:${emailEnv}`,
      label: emailEnv,
      icon: <Mail className="w-4 h-4" />,
      className: `${baseClasses} bg-white/80 text-indigo-700 border border-indigo-100 hover:bg-white`,
      ariaLabel: 'Send email'
    }
  ];

  if (variant === 'desktop') {
    return null;
  }

  return (
    <div className="fixed bottom-0 inset-x-0 md:hidden bg-white/95 backdrop-blur border-t border-indigo-100 px-4 py-3 flex items-center justify-between gap-3 z-50">
      {actions.map((action) => (
        <a
          key={action.label}
          href={action.href}
          aria-label={action.ariaLabel}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white font-semibold py-2 shadow-lg shadow-indigo-300/50 hover:bg-indigo-700 transition-colors"
        >
          {action.icon}
          <span>{action.label}</span>
        </a>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t, language } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const navItems = [
    { key: 'home', id: 'hero' },
    { key: 'services', id: 'services' },
    { key: 'pricing', id: 'pricing' },
    { key: 'faq', id: 'faq' },
    { key: 'contact', id: 'contact' }
  ];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setIsLangOpen(false);
    }
  };

  return (
    <>
      <nav className="fixed top-0 inset-x-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              onClick={() => scrollTo('hero')}
              className="flex items-center gap-3 text-xl font-semibold text-indigo-700 hover:text-indigo-800 transition-colors"
            >
              <span className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-lg shadow-indigo-100/60 border border-indigo-100 overflow-hidden">
                <img
                  src="/images/viplogo.png"
                  alt={t.footer.company}
                  className="h-full w-full object-cover scale-110"
                />
              </span>
              <span className="tracking-tight leading-tight text-left">
                {t.footer.company}
              </span>
            </button>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                type="button"
                onClick={() => scrollTo('booking')}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-blue-500 to-amber-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-300/40 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                {t.nav.book}
              </button>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsLangOpen((prev) => !prev)}
                  className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-100/50 hover:bg-white transition-all"
                  aria-haspopup="true"
                  aria-expanded={isLangOpen}
                >
                  <Globe className="w-4 h-4" />
                  <span>{language.toUpperCase()}</span>
                </button>
                {isLangOpen && (
                  <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-indigo-100 bg-white shadow-xl shadow-indigo-100/60 p-4">
                    <LangSwitch
                      className="flex flex-col gap-2"
                      onSelect={() => setIsLangOpen(false)}
                    />
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center rounded-full border border-indigo-100 bg-white p-2 text-indigo-700 shadow-lg shadow-indigo-100/60"
              onClick={() => {
                setIsMenuOpen((prev) => !prev);
                setIsLangOpen(false);
              }}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-indigo-100 bg-white/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-slate-600 hover:bg-indigo-50 font-medium transition-colors"
                >
                  {t.nav[item.key as keyof typeof t.nav]}
                </button>
              ))}
              <div className="border-t border-indigo-100 pt-3">
                <LangSwitch />
              </div>
            </div>
          </div>
        )}
      </nav>
      <ContactActions variant="mobile" />
    </>
  );
}
