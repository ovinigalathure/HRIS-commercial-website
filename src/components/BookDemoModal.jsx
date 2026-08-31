import { Building2, Briefcase, CalendarCheck, CheckCircle2, Clock, Factory, Loader2, Mail, MapPin, Monitor, Phone, User, X, MapPinned } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useModal } from '../context/ModalContext';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  industry: '',
  position: '',
  demoDate: '',
  demoTime: '',
  demoMode: 'online',
  venue: '',
};

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_DEMO_TEMPLATE_ID || import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function formatTime(time) {
  if (!time) return '';
  const [hour, minute] = time.split(':').map(Number);
  if (Number.isNaN(hour)) return time;
  const period = hour >= 12 ? 'PM' : 'AM';
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const mins = minute === 0 ? '' : `:${String(minute).padStart(2, '0')}`;
  return `${h12}${mins} ${period}`;
}

async function submitDemoRequest(formData) {
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error('Demo booking is not configured yet.');
  }
  const demoTimeFormatted = formatTime(formData.demoTime);
  const templateParams = {
    from_name: formData.fullName,
    name: formData.fullName,
    full_name: formData.fullName,
    user_name: formData.fullName,

    reply_to: formData.email,
    from_email: formData.email,
    email: formData.email,
    user_email: formData.email,

    phone: formData.phone,
    phone_number: formData.phone,
    user_phone: formData.phone,

    company_name: formData.companyName,
    company: formData.companyName,
    user_company: formData.companyName,

    industry: formData.industry,
    user_industry: formData.industry,

    position: formData.position,
    job_role: formData.position,
    job_title: formData.position,

    demo_date: formData.demoDate,
    demo_date_formatted: formData.demoDate,
    requested_date: formData.demoDate,

    demo_time: demoTimeFormatted,
    preferred_time: demoTimeFormatted,
    requested_time: demoTimeFormatted,

    demo_mode: formData.demoMode,
    session_mode: formData.demoMode,
    demo_type: formData.demoMode,

    venue: formData.venue,
    venue_name: formData.venue,
    venue_address: formData.venue,
    demo_venue: formData.venue,

    message: [
      `Name: ${formData.fullName}`,
      `Email: ${formData.email}`,
      `Phone: ${formData.phone}`,
      `Company: ${formData.companyName}`,
      `Industry: ${formData.industry}`,
      `Position: ${formData.position}`,
      `Requested Demo Date: ${formData.demoDate}`,
      `Preferred Demo Time: ${demoTimeFormatted}`,
      `Demo Mode: ${formData.demoMode}`,
      ...(formData.venue ? [`Venue: ${formData.venue}`] : []),
    ].join('\n'),
  };
  const response = await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    { publicKey: EMAILJS_PUBLIC_KEY }
  );
  if (response.status !== 200) {
    throw new Error(`EmailJS returned status ${response.status}: ${response.text}`);
  }
  return { ok: true, data: formData };
}

function Field({ icon: IconCmp, label, ...props }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</span>
      <div className="mt-1.5 relative">
        <IconCmp className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          {...props}
          className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03]
                     pl-10 pr-4 py-3 text-sm text-navy-900 dark:text-white placeholder:text-slate-400
                     focus:outline-none focus:ring-2 focus:ring-electric-500/50 focus:border-electric-500/50 transition-all"
        />
      </div>
    </label>
  );
}

export default function BookDemoModal() {
  const { demoOpen, closeDemo } = useModal();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!demoOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeDemo();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [demoOpen, closeDemo]);

  useEffect(() => {
    if (!demoOpen) {
      const t = setTimeout(() => {
        setForm(initialForm);
        setStatus('idle');
        setError('');
      }, 300);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [demoOpen]);

  if (!demoOpen) return null;

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await submitDemoRequest(form);
      setStatus('success');
    } catch (err) {
      const status = err?.status || err?.httpStatus;
      const text = err?.text || err?.message;
      console.error('Demo booking failed:', err);
      setStatus('error');
      let friendly = 'Something went wrong. Please try again or email us directly at sales@globalhris.com.';
      if (status === 400 || String(text).toLowerCase().includes('invalid')) {
        friendly = 'There was a problem sending your details. Please check your EmailJS service/template settings or contact sales@globalhris.com.';
      }
      if (status === 401 || status === 403) {
        friendly = 'Email service authentication failed. Please contact our team at sales@globalhris.com.';
      }
      if (status === 429) {
        friendly = 'Too many requests. Please wait a moment and try again.';
      }
      if (String(text).toLowerCase().includes('to email')) {
        friendly = 'The recipient could not be set by code. Please ensure the To Email is configured inside the EmailJS template, then try again.';
      }
      setError(friendly);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Book a demo">
      <button type="button" aria-label="Close" onClick={closeDemo} className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-md glass-strong rounded-3xl p-7 sm:p-8 outline-none max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={closeDemo}
          aria-label="Close"
          className="absolute right-5 top-5 inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-900/5 dark:hover:bg-white/10 transition-colors text-slate-400"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        {status === 'success' ? (
          <div className="py-6 text-center">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-electric-500/20 text-cyan-500 dark:text-cyan-300 mb-5">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">Demo Request Sent!</h3>
            <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">
              {form.fullName ? `Thanks, ${form.fullName.split(' ')[0]}!` : 'Thanks!'} Your demo request has been received successfully.
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Our team will review your request and get back to you shortly with your demo confirmation at{' '}
              <span className="font-medium text-navy-800 dark:text-slate-200">{form.email || 'your email'}</span>.
            </p>
            <button
              type="button"
              onClick={closeDemo}
              className="btn-primary mt-7 w-full"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Book a Demo</span>
            <h3 className="mt-2 font-display text-xl font-bold text-navy-900 dark:text-white">Book a live demo</h3>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">Share a few details and we'll set up a time that suits you.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field icon={User} label="Full Name" type="text" required value={form.fullName} onChange={handleChange('fullName')} placeholder="Jane Perera" />
              <Field icon={Mail} label="Email" type="email" required value={form.email} onChange={handleChange('email')} placeholder="jane@company.com" />
              <Field icon={Phone} label="Phone Number" type="tel" required value={form.phone} onChange={handleChange('phone')} placeholder="+94 7X XXX XXX" />
              <Field icon={Building2} label="Company Name" type="text" required value={form.companyName} onChange={handleChange('companyName')} placeholder="Your Company Pvt Ltd" />
              <Field icon={Factory} label="Industry" type="text" required value={form.industry} onChange={handleChange('industry')} placeholder="e.g. Manufacturing" />
              <Field icon={Briefcase} label="Position" type="text" required value={form.position} onChange={handleChange('position')} placeholder="HR Manager" />
              <Field icon={CalendarCheck} label="Preferred Demo Date" type="date" required value={form.demoDate} onChange={handleChange('demoDate')} />
              <Field icon={Clock} label="Preferred Demo Time" type="time" required value={form.demoTime} onChange={handleChange('demoTime')} />

              <label className="block">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Demo Session</span>
                <div className="mt-1.5 relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <select
                    value={form.demoMode}
                    onChange={handleChange('demoMode')}
                    className="w-full appearance-none rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03]
                               pl-10 pr-4 py-3 text-sm text-navy-900 dark:text-white
                               focus:outline-none focus:ring-2 focus:ring-electric-500/50 focus:border-electric-500/50 transition-all"
                  >
                    <option value="online" className="bg-white dark:bg-navy-900">Online (Virtual)</option>
                    <option value="physical" className="bg-white dark:bg-navy-900">Physical (In-Person)</option>
                  </select>
                  <Monitor className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                </div>
              </label>

              {form.demoMode === 'physical' ? (
                <Field
                  icon={MapPinned}
                  label="Demo Venue"
                  type="text"
                  required
                  value={form.venue}
                  onChange={handleChange('venue')}
                  placeholder="Venue name and address"
                />
              ) : null}

              {status === 'error' ? (
                <p className="text-sm text-red-500 dark:text-red-400" role="alert">{error}</p>
              ) : null}

              <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full mt-2 disabled:opacity-70">
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Booking your demo…
                  </>
                ) : (
                  'Book My Demo'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
