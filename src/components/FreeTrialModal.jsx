import { Briefcase, Building2, CheckCircle2, Loader2, Mail, Phone, User, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useModal } from '../context/ModalContext';

const initialForm = {
  fullName: '',
  workEmail: '',
  companyName: '',
  phone: '',
  employeeCount: '',
  jobRole: '',
};

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TRIAL_API_URL = import.meta.env.VITE_TRIAL_API_URL;

/**
 * Submit a trial signup.
 *
 * When the trial deployment backend is configured (VITE_TRIAL_API_URL), POST to
 * its public endpoint POST /api/trial/signup (Step 8 of the trial guide).
 * Otherwise fall back to EmailJS to notify the sales inbox with the lead details.
 */
async function submitTrialRequest(formData) {
  if (TRIAL_API_URL) {
    const res = await fetch(`${TRIAL_API_URL.replace(/\/$/, '')}/api/trial/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: formData.companyName,
        fullName: formData.fullName,
        workEmail: formData.workEmail,
        phone: formData.phone,
      }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || `Signup failed with status ${res.status}`);
    }
    return { ok: true, data: formData };
  }

  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error('Trial signup is not configured yet.');
  }
  const templateParams = {
    from_name: formData.fullName,
    name: formData.fullName,
    full_name: formData.fullName,
    user_name: formData.fullName,

    reply_to: formData.workEmail,
    from_email: formData.workEmail,
    work_email: formData.workEmail,
    email: formData.workEmail,
    user_email: formData.workEmail,

    company_name: formData.companyName,
    company: formData.companyName,
    user_company: formData.companyName,

    phone: formData.phone,
    phone_number: formData.phone,
    user_phone: formData.phone,

    employee_count: formData.employeeCount,
    employees: formData.employeeCount,
    no_of_employees: formData.employeeCount,

    job_role: formData.jobRole,
    role: formData.jobRole,
    job_title: formData.jobRole,
    message: [
      `Name: ${formData.fullName}`,
      `Work Email: ${formData.workEmail}`,
      `Company: ${formData.companyName}`,
      `Phone: ${formData.phone}`,
      `Employees: ${formData.employeeCount}`,
      `Job Role: ${formData.jobRole}`,
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

export default function FreeTrialModal() {
  const { trialOpen, closeTrial } = useModal();
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!trialOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && closeTrial();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [trialOpen, closeTrial]);

  useEffect(() => {
    if (!trialOpen) {
      const t = setTimeout(() => {
        setForm(initialForm);
        setStatus('idle');
        setError('');
      }, 300);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [trialOpen]);

  if (!trialOpen) return null;

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      await submitTrialRequest(form);
      setStatus('success');
    } catch (err) {
      const status = err?.status || err?.httpStatus;
      const text = err?.text || err?.message;
      console.error('Trial signup failed:', err);
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label="Start free trial">
      <button type="button" aria-label="Close" onClick={closeTrial} className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-md glass-strong rounded-3xl p-7 sm:p-8 outline-none max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={closeTrial}
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
            <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">Thank You!</h3>
            <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">
              {form.fullName ? `Thanks, ${form.fullName.split(' ')[0]}!` : 'Thanks!'} Your trial request has been received successfully.
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              We will review your request and get back to you shortly with your free trial details at{' '}
              <span className="font-medium text-navy-800 dark:text-slate-200">{form.workEmail || 'your email'}</span>.
            </p>
            <button
              type="button"
              onClick={closeTrial}
              className="btn-primary mt-7 w-full"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Free Trial</span>
            <h3 className="mt-2 font-display text-xl font-bold text-navy-900 dark:text-white">Start your free trial</h3>
            <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">No credit card required. Takes less than a minute.</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field icon={User} label="Full Name" type="text" required value={form.fullName} onChange={handleChange('fullName')} placeholder="Jane Perera" />
              <Field icon={Mail} label="Work Email" type="email" required value={form.workEmail} onChange={handleChange('workEmail')} placeholder="jane@company.com" />
              <Field icon={Building2} label="Company Name" type="text" required value={form.companyName} onChange={handleChange('companyName')} placeholder="Your Company Pvt Ltd" />
              <Field icon={Phone} label="Phone Number" type="tel" required value={form.phone} onChange={handleChange('phone')} placeholder="+94 7X XXX XXX" />
              <Field icon={Users} label="Number of Employees" type="text" required value={form.employeeCount} onChange={handleChange('employeeCount')} placeholder="e.g. 250" />
              <Field icon={Briefcase} label="Job Role" type="text" required value={form.jobRole} onChange={handleChange('jobRole')} placeholder="HR Manager" />

              {status === 'error' ? (
                <p className="text-sm text-red-500 dark:text-red-400" role="alert">{error}</p>
              ) : null}

              <button type="submit" disabled={status === 'submitting'} className="btn-primary w-full mt-2 disabled:opacity-70">
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Setting up your trial…
                  </>
                ) : (
                  'Start My Free Trial'
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
