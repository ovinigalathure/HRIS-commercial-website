import { Briefcase, Building2, CheckCircle2, Loader2, Mail, Phone, User, Users, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useModal } from '../context/ModalContext';

const initialForm = {
  fullName: '',
  workEmail: '',
  companyName: '',
  phone: '',
  employeeCount: '',
  jobRole: '',
};

/**
 * Mock submit handler. Replace the body of this function with a real
 * API call (e.g. `fetch('/api/trial-requests', { method: 'POST', ... })`)
 * when a backend is connected — the form and UI states around it do not
 * need to change.
 */
async function submitTrialRequest(formData) {
  await new Promise((resolve) => setTimeout(resolve, 900));
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
  const [status, setStatus] = useState('idle'); // idle | submitting | success
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
    try {
      await submitTrialRequest(form);
      setStatus('success');
    } catch {
      setStatus('idle');
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
            <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">You're on the list!</h3>
            <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">
              Thanks{form.fullName ? `, ${form.fullName.split(' ')[0]}` : ''} — our team will reach out to{' '}
              <span className="font-medium text-navy-800 dark:text-slate-200">{form.workEmail || 'your inbox'}</span> shortly to get your
              free trial workspace ready.
            </p>
            <button type="button" onClick={closeTrial} className="btn-primary mt-7 w-full">
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
              <Field icon={Phone} label="Phone Number" type="tel" required value={form.phone} onChange={handleChange('phone')} placeholder="+94 7X XXX XXXX" />
              <Field icon={Users} label="Number of Employees" type="text" required value={form.employeeCount} onChange={handleChange('employeeCount')} placeholder="e.g. 250" />
              <Field icon={Briefcase} label="Job Role" type="text" required value={form.jobRole} onChange={handleChange('jobRole')} placeholder="HR Manager" />

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
