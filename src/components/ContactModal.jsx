import { Building2, CheckCircle2, Loader2, Mail, MessageSquare, Phone, User, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useModal } from '../context/ModalContext';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  message: '',
};

const EMAILJS_CONTACT_SERVICE_ID = import.meta.env.VITE_EMAILJS_CONTACT_SERVICE_ID;
const EMAILJS_CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
const EMAILJS_CONTACT_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_CONTACT_PUBLIC_KEY;

async function submitContactRequest(formData) {
  if (!EMAILJS_CONTACT_SERVICE_ID || !EMAILJS_CONTACT_TEMPLATE_ID || !EMAILJS_CONTACT_PUBLIC_KEY) {
    throw new Error('Contact form is not configured yet.');
  }
  const templateParams = {
    from_name: formData.fullName,
    name: formData.fullName,
    full_name: formData.fullName,
    user_name: formData.fullName,

    from_email: formData.email,
    reply_to: formData.email,
    email: formData.email,
    user_email: formData.email,

    phone: formData.phone,
    phone_number: formData.phone,
    user_phone: formData.phone,

    company: formData.companyName,
    company_name: formData.companyName,
    user_company: formData.companyName,

    message: formData.message,
  };
  const response = await emailjs.send(
    EMAILJS_CONTACT_SERVICE_ID,
    EMAILJS_CONTACT_TEMPLATE_ID,
    templateParams,
    { publicKey: EMAILJS_CONTACT_PUBLIC_KEY }
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
        <IconCmp className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
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

export default function ContactModal() {
  const { contactOpen, closeContact } = useModal();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!contactOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeContact();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [contactOpen, closeContact]);

  useEffect(() => {
    if (!contactOpen) {
      const t = setTimeout(() => {
        setForm(initialForm);
        setStatus('idle');
        setError('');
      }, 300);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [contactOpen]);

  if (!contactOpen) return null;

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await submitContactRequest(form);
      setStatus('success');
    } catch (err) {
      const status = err?.status || err?.httpStatus;
      const text = err?.text || err?.message;
      console.error('Contact inquiry failed:', err);
      setStatus('error');
      let friendly = 'Something went wrong. Please try again or email us directly at support@globalhris.com.';
      if (status === 400 || String(text).toLowerCase().includes('invalid')) {
        friendly = 'There was a problem sending your details. Please check your EmailJS service/template settings or contact support@globalhris.com.';
      }
      if (status === 401 || status === 403) {
        friendly = 'Email service authentication failed. Please contact our team at support@globalhris.com.';
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Contact us">
      <button type="button" aria-label="Close" onClick={closeContact} className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-md glass-strong rounded-3xl p-7 sm:p-8 outline-none max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={closeContact}
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
            <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">Message Sent!</h3>
            <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">
              {form.fullName ? `Thanks, ${form.fullName.split(' ')[0]}!` : 'Thanks!'} Your inquiry has been received successfully.
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Our team will review your message and get back to you shortly at{' '}
              <span className="font-medium text-navy-800 dark:text-slate-200">{form.email || 'your email'}</span>.
            </p>
            <button
              type="button"
              onClick={closeContact}
              className="btn-primary mt-7 w-full"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Contact Us</span>
            <h3 className="mt-2 font-display text-xl font-bold text-navy-900 dark:text-white">Get in touch</h3>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">Send us a message and our team will respond shortly.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field icon={User} label="Full Name" type="text" required value={form.fullName} onChange={handleChange('fullName')} placeholder="Jane Perera" />
              <Field icon={Mail} label="Email" type="email" required value={form.email} onChange={handleChange('email')} placeholder="jane@company.com" />
              <Field icon={Phone} label="Phone" type="tel" required value={form.phone} onChange={handleChange('phone')} placeholder="+94 7X XXX XXX" />
              <Field icon={Building2} label="Company" type="text" required value={form.companyName} onChange={handleChange('companyName')} placeholder="Your Company Pvt Ltd" />

              <label className="block">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Message</span>
                <div className="mt-1.5 relative">
                  <MessageSquare className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={handleChange('message')}
                    placeholder="How can we help you?"
                    className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-white/[0.03]
                               pl-10 pr-4 py-3 text-sm text-navy-900 dark:text-white placeholder:text-slate-400
                               focus:outline-none focus:ring-2 focus:ring-electric-500/50 focus:border-electric-500/50 transition-all"
                  />
                </div>
              </label>

              {status === 'error' ? (
                <p className="text-sm text-red-500 dark:text-red-400" role="alert">{error}</p>
              ) : null}

              <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full mt-2 disabled:opacity-70">
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending your message…
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
