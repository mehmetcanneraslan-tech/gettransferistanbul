import { useState } from 'react';
import { Menu, X, Plane, ChevronDown } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';
import { Language, languages } from '../i18n';

export function Navbar() {
  const { t, language, setLanguage } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { key: 'home', id: 'hero' },
    { key: 'services', id: 'services' },
    { key: 'pricing', id: 'pricing' },
    { key: 'faq', id: 'faq' },
    { key: 'contact', id: 'contact' }
  ];

  return (
    <nav className="fixed top-0 w-full border-b border-slate-200 bg-white/90 backdrop-blur-xl z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 text-xl font-bold text-slate-800 hover:text-slate-900 transition-colors"
            aria-label="Go to home"
          >
            <span className="relative flex h-9 w-9 items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 opacity-60 blur-md" />
              <Plane className="relative w-5 h-5 text-white drop-shadow" />
            </span>
            <span className="hidden sm:inline tracking-tight">GetTransfer Istanbul</span>
            <span className="sm:hidden">GTI</span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-600 hover:text-slate-900 font-medium transition-colors"
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </button>
            ))}

            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                aria-label="Select language"
                aria-expanded={isLangOpen}
              >
                <span className="text-2xl">{languages[language].flag}</span>
                <span className="text-sm font-semibold text-slate-700">{language.toUpperCase()}</span>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 py-2">
                  {Object.entries(languages).map(([code, { name, flag }]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code as Language);
                        setIsLangOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left flex items-center gap-3 rounded-lg transition-colors ${
                        language === code
                          ? 'bg-sky-50 text-sky-700'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span className="text-2xl">{flag}</span>
                      <span className="font-medium">{name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('booking')}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white font-semibold shadow-lg shadow-sky-200/60 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {t.nav.book}
            </button>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6 text-slate-700" /> : <Menu className="w-6 h-6 text-slate-700" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-xl">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
              >
                {t.nav[item.key as keyof typeof t.nav]}
              </button>
            ))}

            <div className="border-t border-slate-200 pt-3 space-y-2">
              <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-[0.3em]">
                Language
              </p>
              {Object.entries(languages).map(([code, { name, flag }]) => (
                <button
                  key={code}
                  onClick={() => {
                    setLanguage(code as Language);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full px-4 py-2 text-left flex items-center gap-3 rounded-lg transition-colors ${
                    language === code
                      ? 'bg-sky-50 text-sky-700'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-2xl">{flag}</span>
                  <span className="font-medium">{name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('booking')}
              className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white font-semibold shadow-lg shadow-sky-200/60 hover:shadow-xl transition-all"
            >
              {t.nav.book}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
