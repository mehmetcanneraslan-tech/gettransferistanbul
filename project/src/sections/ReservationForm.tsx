import { useState, FormEvent, ChangeEvent } from 'react';
import { Calendar, Clock, Users, Luggage, Car, User, Phone, Mail, FileText } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';
import { Badge } from '../components/Badge';
import { Modal } from '../components/Modal';
import { Toast } from '../components/Toast';
import { getEstimate, formatPrice } from '../lib/pricing';
import { submitReservation, generateWhatsAppLink, BookingData } from '../lib/submit';

interface FormData {
  tripType: 'oneWay' | 'round';
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  returnDate: string;
  returnTime: string;
  passengers: string;
  luggage: string;
  flightNo: string;
  vehicle: 'sedan' | 'minivan' | 'minibus';
  name: string;
  phone: string;
  email: string;
  notes: string;
  gdprAccepted: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export function ReservationForm() {
  const { t, language } = useI18n();
  const [formData, setFormData] = useState<FormData>({
    tripType: 'oneWay',
    pickup: '',
    dropoff: '',
    date: '',
    time: '',
    returnDate: '',
    returnTime: '',
    passengers: '1',
    luggage: '1',
    flightNo: '',
    vehicle: 'sedan',
    name: '',
    phone: '',
    email: '',
    notes: '',
    gdprAccepted: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'warning'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputBase =
    'w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/90 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition-colors hover:border-slate-300';

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setFormData(prev => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (['pickup', 'dropoff', 'date', 'time', 'vehicle', 'tripType'].includes(name)) {
      setTimeout(() => calculateEstimate({ ...formData, [name]: newValue }), 100);
    }
  };

  const calculateEstimate = (data: FormData) => {
    if (data.pickup && data.dropoff && data.date && data.time) {
      const price = getEstimate({
        pickup: data.pickup,
        dropoff: data.dropoff,
        vehicle: data.vehicle,
        date: data.date,
        time: data.time,
        isRoundTrip: data.tripType === 'round'
      });
      setEstimatedPrice(price);
    }
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{6,14}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.pickup.trim()) newErrors.pickup = t.form.required;
    if (!formData.dropoff.trim()) newErrors.dropoff = t.form.required;
    if (!formData.date) newErrors.date = t.form.required;
    if (!formData.time) newErrors.time = t.form.required;
    if (formData.tripType === 'round' && !formData.returnDate) newErrors.returnDate = t.form.required;
    if (formData.tripType === 'round' && !formData.returnTime) newErrors.returnTime = t.form.required;
    if (!formData.name.trim()) newErrors.name = t.form.required;
    if (!formData.phone.trim()) {
      newErrors.phone = t.form.required;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = t.form.invalidPhone;
    }
    if (!formData.gdprAccepted) newErrors.gdprAccepted = t.form.acceptGdpr;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setToast({ type: 'error', message: t.toast.error });
      return;
    }

    setIsSubmitting(true);

    const bookingData: BookingData = {
      tripType: formData.tripType,
      pickup: formData.pickup,
      dropoff: formData.dropoff,
      date: formData.date,
      time: formData.time,
      returnDate: formData.tripType === 'round' ? formData.returnDate : undefined,
      returnTime: formData.tripType === 'round' ? formData.returnTime : undefined,
      passengers: parseInt(formData.passengers),
      luggage: parseInt(formData.luggage),
      flightNo: formData.flightNo || undefined,
      vehicle: formData.vehicle,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      notes: formData.notes || undefined,
      estimatedPrice: estimatedPrice || 0
    };

    try {
      const result = await submitReservation(bookingData);
      if (result.success) {
        setIsModalOpen(true);
        setToast({ type: 'success', message: t.toast.success });
      }
    } catch {
      setToast({ type: 'error', message: t.toast.error });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const bookingData: BookingData = {
    tripType: formData.tripType,
    pickup: formData.pickup,
    dropoff: formData.dropoff,
    date: formData.date,
    time: formData.time,
    returnDate: formData.tripType === 'round' ? formData.returnDate : undefined,
    returnTime: formData.tripType === 'round' ? formData.returnTime : undefined,
    passengers: parseInt(formData.passengers),
    luggage: parseInt(formData.luggage),
    flightNo: formData.flightNo || undefined,
    vehicle: formData.vehicle,
    name: formData.name,
    phone: formData.phone,
    email: formData.email || undefined,
    notes: formData.notes || undefined,
    estimatedPrice: estimatedPrice || 0
  };

  return (
    <section id="booking" className="relative py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_20%_10%,rgba(129,140,248,0.18),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(640px_circle_at_80%_0%,rgba(45,212,191,0.14),transparent)]" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            {t.form.title}
          </h2>
          <Badge />
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 border border-slate-200 rounded-2xl shadow-2xl shadow-slate-200/60 p-6 sm:p-8 space-y-6 backdrop-blur">
          <div>
            <label className="block text-sm font-semibold text-slate-600 mb-3">
              {t.form.tripType}
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, tripType: 'oneWay' }))}
                className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                  formData.tripType === 'oneWay'
                    ? 'border-sky-400 bg-sky-50 text-sky-700 shadow-md shadow-sky-200/60'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {t.form.oneWay}
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, tripType: 'round' }))}
                className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                  formData.tripType === 'round'
                    ? 'border-sky-400 bg-sky-50 text-sky-700 shadow-md shadow-sky-200/60'
                    : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {t.form.round}
              </button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pickup" className="block text-sm font-semibold text-slate-600 mb-2">
                {t.form.pickup} *
              </label>
              <input
                type="text"
                id="pickup"
                name="pickup"
                value={formData.pickup}
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.pickup ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400' : ''
                }`}
                placeholder="Istanbul Airport"
              />
              {errors.pickup && <p className="mt-1 text-sm text-rose-500">{errors.pickup}</p>}
            </div>

            <div>
              <label htmlFor="dropoff" className="block text-sm font-semibold text-slate-600 mb-2">
                {t.form.dropoff} *
              </label>
              <input
                type="text"
                id="dropoff"
                name="dropoff"
                value={formData.dropoff}
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.dropoff ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400' : ''
                }`}
                placeholder="Taksim"
              />
              {errors.dropoff && <p className="mt-1 text-sm text-rose-500">{errors.dropoff}</p>}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                <Calendar className="w-4 h-4" />
                {t.form.date} *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={getTodayDate()}
                className={`${inputBase} ${
                  errors.date ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400' : ''
                }`}
              />
              {errors.date && <p className="mt-1 text-sm text-rose-500">{errors.date}</p>}
            </div>

            <div>
              <label htmlFor="time" className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                <Clock className="w-4 h-4" />
                {t.form.time} *
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.time ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400' : ''
                }`}
              />
              {errors.time && <p className="mt-1 text-sm text-rose-500">{errors.time}</p>}
            </div>
          </div>

          {formData.tripType === 'round' && (
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="returnDate" className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                  <Calendar className="w-4 h-4" />
                  {t.form.returnDate} *
                </label>
                <input
                  type="date"
                  id="returnDate"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  min={formData.date || getTodayDate()}
                  className={`${inputBase} ${
                    errors.returnDate ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400' : ''
                  }`}
                />
                {errors.returnDate && <p className="mt-1 text-sm text-rose-500">{errors.returnDate}</p>}
              </div>

              <div>
                <label htmlFor="returnTime" className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                  <Clock className="w-4 h-4" />
                  {t.form.returnTime} *
                </label>
                <input
                  type="time"
                  id="returnTime"
                  name="returnTime"
                  value={formData.returnTime}
                  onChange={handleChange}
                  className={`${inputBase} ${
                    errors.returnTime ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400' : ''
                  }`}
                />
                {errors.returnTime && <p className="mt-1 text-sm text-rose-500">{errors.returnTime}</p>}
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="passengers" className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                <Users className="w-4 h-4" />
                {t.form.pax}
              </label>
              <input
                type="number"
                id="passengers"
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                min="1"
                max="14"
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="luggage" className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                <Luggage className="w-4 h-4" />
                {t.form.luggage}
              </label>
              <input
                type="number"
                id="luggage"
                name="luggage"
                value={formData.luggage}
                onChange={handleChange}
                min="0"
                max="20"
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="flightNo" className="block text-sm font-semibold text-slate-600 mb-2">
                {t.form.flightNo}
              </label>
              <input
                type="text"
                id="flightNo"
                name="flightNo"
                value={formData.flightNo}
                onChange={handleChange}
                className={inputBase}
               placeholder="TK1234"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-3">
              <Car className="w-4 h-4" />
              {t.form.vehicle}
            </label>
            <div className="grid sm:grid-cols-3 gap-4">
              {(['sedan', 'minivan', 'minibus'] as const).map((vehicleType) => (
                <button
                  key={vehicleType}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, vehicle: vehicleType }))}
                  className={`p-4 rounded-xl border-2 font-semibold transition-all ${
                    formData.vehicle === vehicleType
                      ? 'border-sky-400 bg-sky-50 text-sky-700 shadow-md shadow-sky-200/60'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {t.form[vehicleType]}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                <User className="w-4 h-4" />
                {t.form.name} *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.name ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400' : ''
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-rose-500">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
                <Phone className="w-4 h-4" />
                {t.form.phone} *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`${inputBase} ${
                  errors.phone ? 'border-rose-400 focus:ring-rose-400 focus:border-rose-400' : ''
                }`}
                placeholder="+90 555 123 4567"
              />
              {errors.phone && <p className="mt-1 text-sm text-rose-500">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
              <Mail className="w-4 h-4" />
              {t.form.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={inputBase}
            />
          </div>

          <div>
            <label htmlFor="notes" className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-2">
              <FileText className="w-4 h-4" />
              {t.form.notes}
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className={`${inputBase} resize-none`}
            />
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="gdprAccepted"
                checked={formData.gdprAccepted}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded border-slate-300 bg-white text-sky-500 focus:ring-2 focus:ring-sky-400 focus:ring-offset-0 focus:outline-none"
              />
              <span className="text-sm text-slate-600 leading-relaxed">
                {t.form.gdpr} *
              </span>
            </label>
            {errors.gdprAccepted && <p className="mt-1 text-sm text-rose-500">{errors.gdprAccepted}</p>}
          </div>

          {estimatedPrice && (
            <div className="rounded-xl border border-sky-200 bg-sky-50 p-6 shadow-inner shadow-sky-100">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-700">{t.form.estimate}</span>
                <span className="text-3xl font-bold text-sky-600">{formatPrice(estimatedPrice)}</span>
              </div>
              <p className="mt-2 text-sm text-slate-600">{t.form.paymentNotice}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600 text-white font-semibold shadow-lg shadow-sky-300/40 transition-all hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? '...' : t.form.submit}
          </button>
        </form>

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={t.confirm.title}
        >
          <div className="space-y-6">
            <p className="text-slate-600">{t.confirm.text}</p>

            <div className="rounded-xl border border-slate-200 bg-white/90 p-6 space-y-3 shadow-lg shadow-slate-200/60">
              <h3 className="font-semibold text-slate-800 mb-4">{t.confirm.summary}</h3>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div className="text-slate-500">{t.form.tripType}:</div>
                <div className="font-semibold text-slate-800">
                  {formData.tripType === 'oneWay' ? t.form.oneWay : t.form.round}
                </div>

                <div className="text-slate-500">{t.form.pickup}:</div>
                <div className="font-semibold text-slate-800">{formData.pickup}</div>

                <div className="text-slate-500">{t.form.dropoff}:</div>
                <div className="font-semibold text-slate-800">{formData.dropoff}</div>

                <div className="text-slate-500">{t.form.date}:</div>
                <div className="font-semibold text-slate-800">{formData.date} {formData.time}</div>

                {formData.tripType === 'round' && (
                  <>
                    <div className="text-slate-500">{t.form.returnDate}:</div>
                    <div className="font-semibold text-slate-800">{formData.returnDate} {formData.returnTime}</div>
                  </>
                )}

                <div className="text-slate-500">{t.form.vehicle}:</div>
                <div className="font-semibold text-slate-800">{t.form[formData.vehicle]}</div>

                <div className="text-slate-500">{t.form.estimate}:</div>
                <div className="text-lg font-bold text-sky-600">{formatPrice(estimatedPrice || 0)}</div>
              </div>
            </div>

            <a
              href={generateWhatsAppLink(bookingData, language)}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 text-white font-semibold shadow-lg shadow-emerald-300/40 transition-all hover:shadow-xl hover:-translate-y-0.5 text-center"
            >
              {t.confirm.whatsappButton}
            </a>

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full px-6 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-700 font-semibold transition-all hover:bg-white"
            >
              {t.confirm.close}
            </button>
          </div>
        </Modal>

        {toast && (
          <Toast
            type={toast.type}
            message={toast.message}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </section>
  );
}
