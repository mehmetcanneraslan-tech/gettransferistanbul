import { FormEvent, useMemo, useState } from 'react';
import { Calendar, Clock, Users, Luggage, Car, Loader2 } from 'lucide-react';
import { useI18n } from '../context/LanguageProvider';
import { getEstimate } from '../lib/pricing';
import {
  submitReservation,
  generateWhatsAppLink,
  type BookingData
} from '../lib/submit';
import { Toast } from '../components/Toast';
import { Modal } from '../components/Modal';

type TripType = 'oneWay' | 'round';
type VehicleType = 'sedan' | 'minivan' | 'minibus';

const initialForm = {
  tripType: 'oneWay' as TripType,
  pickup: '',
  dropoff: '',
  date: '',
  time: '',
  returnDate: '',
  returnTime: '',
  passengers: '1',
  luggage: '1',
  flightNo: '',
  vehicle: 'sedan' as VehicleType,
  name: '',
  phone: '',
  email: '',
  notes: '',
  gdprAccepted: false
};

type FormData = typeof initialForm;

export function ReservationForm() {
  const { t, language } = useI18n();
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string; variant: 'success' | 'error' }>({
    open: false,
    message: '',
    variant: 'success'
  });
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingData | null>(null);

  const estimate = useMemo(() => {
    if (!formData.pickup || !formData.dropoff || !formData.date || !formData.time) {
      return 0;
    }
    return getEstimate({
      pickup: formData.pickup,
      dropoff: formData.dropoff,
      vehicle: formData.vehicle,
      date: formData.date,
      time: formData.time,
      isRoundTrip: formData.tripType === 'round'
    });
  }, [
    formData.pickup,
    formData.dropoff,
    formData.vehicle,
    formData.date,
    formData.time,
    formData.tripType
  ]);

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
    setErrors((prev) => ({
      ...prev,
      [field]: ''
    }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    const requiredFields: Array<keyof FormData> = [
      'pickup',
      'dropoff',
      'date',
      'time',
      'name',
      'phone'
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = t.form.required;
      }
    });

    if (formData.tripType === 'round') {
      if (!formData.returnDate) newErrors.returnDate = t.form.required;
      if (!formData.returnTime) newErrors.returnTime = t.form.required;
    }

    if (!formData.gdprAccepted) {
      newErrors.gdprAccepted = t.form.acceptGdpr;
    }

    if (formData.phone && !/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
      newErrors.phone = t.form.invalidPhone;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const payload: BookingData = {
      tripType: formData.tripType,
      pickup: formData.pickup,
      dropoff: formData.dropoff,
      date: formData.date,
      time: formData.time,
      returnDate: formData.tripType === 'round' ? formData.returnDate : undefined,
      returnTime: formData.tripType === 'round' ? formData.returnTime : undefined,
      passengers: parseInt(formData.passengers, 10),
      luggage: parseInt(formData.luggage, 10),
      flightNo: formData.flightNo || undefined,
      vehicle: formData.vehicle,
      name: formData.name,
      phone: formData.phone,
      email: formData.email || undefined,
      notes: formData.notes || undefined,
      estimatedPrice: estimate
    };

    try {
      const result = await submitReservation(payload);
      if (result.success) {
        setSubmittedData(payload);
        setIsConfirmOpen(true);
        setToast({ open: true, message: t.toast.success, variant: 'success' });
        setFormData(initialForm);
      } else {
        setToast({ open: true, message: result.message ?? t.toast.error, variant: 'error' });
      }
    } catch (error) {
      console.error(error);
      setToast({ open: true, message: t.toast.error, variant: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="booking" className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
            {t.form.title}
          </h2>
          <p className="text-slate-600">{t.form.paymentNotice}</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white/80 border border-indigo-100 rounded-3xl shadow-2xl shadow-indigo-100/70 p-6 sm:p-10 space-y-8 backdrop-blur"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-600">{t.form.tripType}</label>
              <div className="grid grid-cols-2 gap-3">
                {(['oneWay', 'round'] as TripType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleChange('tripType', type)}
                    className={[
                      'p-4 rounded-2xl border-2 font-semibold transition-all shadow-sm',
                      formData.tripType === type
                        ? 'border-indigo-400 bg-indigo-50 text-indigo-700 shadow-indigo-100/70'
                        : 'border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-indigo-50'
                    ].join(' ')}
                  >
                    {t.form[type]}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">{t.form.vehicle}</label>
                <select
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={formData.vehicle}
                  onChange={(event) => handleChange('vehicle', event.target.value)}
                >
                  <option value="sedan">{t.form.sedan}</option>
                  <option value="minivan">{t.form.minivan}</option>
                  <option value="minibus">{t.form.minibus}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">{t.form.estimate}</label>
                <div className="h-full flex items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-700 font-semibold text-xl">
                  {estimate > 0 ? `${estimate} €` : '—'}
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600" htmlFor="pickup">
                {t.form.pickup}
              </label>
              <input
                id="pickup"
                type="text"
                value={formData.pickup}
                onChange={(event) => handleChange('pickup', event.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.pickup ? 'border-rose-400' : 'border-slate-200'
                } bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                placeholder="İstanbul Havalimanı"
              />
              {errors.pickup && <p className="text-sm text-rose-500">{errors.pickup}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600" htmlFor="dropoff">
                {t.form.dropoff}
              </label>
              <input
                id="dropoff"
                type="text"
                value={formData.dropoff}
                onChange={(event) => handleChange('dropoff', event.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.dropoff ? 'border-rose-400' : 'border-slate-200'
                } bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                placeholder="Taksim"
              />
              {errors.dropoff && <p className="text-sm text-rose-500">{errors.dropoff}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600" htmlFor="date">
                {t.form.date}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(event) => handleChange('date', event.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    errors.date ? 'border-rose-400' : 'border-slate-200'
                  } bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                />
              </div>
              {errors.date && <p className="text-sm text-rose-500">{errors.date}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600" htmlFor="time">
                {t.form.time}
              </label>
              <div className="relative">
                <Clock className="w-4 h-4 text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(event) => handleChange('time', event.target.value)}
                  className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                    errors.time ? 'border-rose-400' : 'border-slate-200'
                  } bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                />
              </div>
              {errors.time && <p className="text-sm text-rose-500">{errors.time}</p>}
            </div>

            {formData.tripType === 'round' && (
              <>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-600" htmlFor="returnDate">
                    {t.form.returnDate}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="returnDate"
                      type="date"
                      value={formData.returnDate}
                      onChange={(event) => handleChange('returnDate', event.target.value)}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                        errors.returnDate ? 'border-rose-400' : 'border-slate-200'
                      } bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                    />
                  </div>
                  {errors.returnDate && <p className="text-sm text-rose-500">{errors.returnDate}</p>}
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-600" htmlFor="returnTime">
                    {t.form.returnTime}
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      id="returnTime"
                      type="time"
                      value={formData.returnTime}
                      onChange={(event) => handleChange('returnTime', event.target.value)}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                        errors.returnTime ? 'border-rose-400' : 'border-slate-200'
                      } bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
                    />
                  </div>
                  {errors.returnTime && <p className="text-sm text-rose-500">{errors.returnTime}</p>}
                </div>
              </>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-600" htmlFor="passengers">
                  {t.form.pax}
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="passengers"
                    type="number"
                    min={1}
                    value={formData.passengers}
                    onChange={(event) => handleChange('passengers', event.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-600" htmlFor="luggage">
                  {t.form.luggage}
                </label>
                <div className="relative">
                  <Luggage className="w-4 h-4 text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    id="luggage"
                    type="number"
                    min={0}
                    value={formData.luggage}
                    onChange={(event) => handleChange('luggage', event.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600" htmlFor="flightNo">
                {t.form.flightNo}
              </label>
              <div className="relative">
                <Car className="w-4 h-4 text-indigo-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  id="flightNo"
                  type="text"
                  value={formData.flightNo}
                  onChange={(event) => handleChange('flightNo', event.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600" htmlFor="name">
                {t.form.name}
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(event) => handleChange('name', event.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.name ? 'border-rose-400' : 'border-slate-200'
                } bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              />
              {errors.name && <p className="text-sm text-rose-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600" htmlFor="phone">
                {t.form.phone}
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(event) => handleChange('phone', event.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  errors.phone ? 'border-rose-400' : 'border-slate-200'
                } bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              />
              {errors.phone && <p className="text-sm text-rose-500">{errors.phone}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-600" htmlFor="email">
                {t.form.email}
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(event) => handleChange('email', event.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="block text-sm font-semibold text-slate-600" htmlFor="notes">
                {t.form.notes}
              </label>
              <textarea
                id="notes"
                value={formData.notes}
                onChange={(event) => handleChange('notes', event.target.value)}
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/90 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <label className="flex items-start gap-3 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={formData.gdprAccepted}
                onChange={(event) => handleChange('gdprAccepted', event.target.checked)}
                className="mt-1 h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>
                {t.form.gdpr}
                {errors.gdprAccepted && (
                  <span className="block text-rose-500">{errors.gdprAccepted}</span>
                )}
              </span>
            </label>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 text-white px-8 py-3 font-semibold shadow-lg shadow-indigo-300/60 hover:bg-indigo-700 transition-all"
              disabled={submitting}
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {t.form.submit}
            </button>
          </div>
        </form>
      </div>

      <Toast
        open={toast.open}
        variant={toast.variant}
        message={toast.message}
        onClose={() => setToast((prev) => ({ ...prev, open: false }))}
      />

      <Modal
        open={isConfirmOpen && !!submittedData}
        onClose={() => setIsConfirmOpen(false)}
        title={t.confirm.title}
        description={t.confirm.text}
        actions={
          submittedData && (
            <>
              <a
                href={generateWhatsAppLink(submittedData, language)}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-500 text-white px-5 py-2 font-semibold shadow-lg shadow-emerald-300/60 hover:bg-emerald-600 transition-colors"
              >
                {t.confirm.whatsappButton}
              </a>
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-100 text-indigo-700 px-5 py-2 font-semibold hover:bg-indigo-200 transition-colors"
              >
                {t.confirm.close}
              </button>
            </>
          )
        }
      >
        {submittedData && (
          <div className="space-y-2 text-sm">
            <h4 className="text-base font-semibold text-slate-800">{t.confirm.summary}</h4>
            <ul className="space-y-1 text-slate-600">
              <li>
                {submittedData.tripType === 'oneWay' ? t.form.oneWay : t.form.round} •{' '}
                {submittedData.vehicle}
              </li>
              <li>
                {submittedData.pickup} → {submittedData.dropoff}
              </li>
              <li>
                {submittedData.date} {submittedData.time}
                {submittedData.returnDate && submittedData.returnTime
                  ? ` • ${submittedData.returnDate} ${submittedData.returnTime}`
                  : ''}
              </li>
              <li>
                {t.form.pax}: {submittedData.passengers} • {t.form.luggage}: {submittedData.luggage}
              </li>
              <li>
                {t.form.estimate}: {submittedData.estimatedPrice} €
              </li>
            </ul>
          </div>
        )}
      </Modal>
    </section>
  );
}
