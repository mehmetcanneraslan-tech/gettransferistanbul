import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';

export function Contact() {
  const { t } = useI18n();

  const contactItems = [
    {
      icon: Phone,
      label: t.contact.phone,
      value: '+90 536 429 12 21',
      href: 'tel:+905364291221',
      action: t.contact.call
    },
    {
      icon: Mail,
      label: t.contact.email,
      value: 'info@airporttransfer.com',
      href: 'mailto:info@airporttransfer.com',
      action: t.contact.sendEmail
    },
    {
      icon: Clock,
      label: t.contact.hours,
      value: t.contact.hoursValue,
      href: null,
      action: null
    },
    {
      icon: MapPin,
      label: t.contact.address,
      value: t.contact.addressValue,
      href: null,
      action: null
    }
  ];

  const handleWhatsApp = () => {
    window.open('https://wa.me/905364291221', '_blank');
  };

  return (
    <section id="contact" className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(420px_circle_at_10%_90%,rgba(14,165,233,0.16),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_90%_60%,rgba(34,197,94,0.12),transparent)]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-500 shadow-md shadow-sky-200/60">
            {t.nav.contact}
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-slate-800">
            {t.contact.title}
          </h2>
          <p className="mt-3 text-slate-600">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-6 rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60 hover:-translate-y-1 transition-transform"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 shadow-lg shadow-sky-500/20">
                    <Icon className="w-6 h-6 text-white drop-shadow" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-[0.2em] mb-2">
                      {item.label}
                    </div>
                    <div className="text-slate-800 font-semibold mb-1">
                      {item.value}
                    </div>
                    {item.href && item.action && (
                      <a
                        href={item.href}
                        className="text-sm font-semibold text-sky-200 hover:text-sky-100 transition-colors"
                      >
                        {item.action} →
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xl shadow-slate-200/60 h-full min-h-[400px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="w-16 h-16 text-sky-500 mx-auto mb-4" />
                <p className="text-slate-700 font-semibold">{t.contact.location}</p>
                <p className="text-sm text-slate-500 mt-2">{t.contact.addressValue}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 text-white font-semibold shadow-lg shadow-emerald-300/40 transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            <MessageCircle className="w-6 h-6" />
            {t.contact.whatsapp}
          </button>
        </div>
      </div>

      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 via-green-500 to-lime-500 text-white shadow-2xl shadow-emerald-300/40 hover:scale-110 transition-transform flex items-center justify-center z-40"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    </section>
  );
}
