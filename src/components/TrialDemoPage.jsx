import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarClock,
  CheckCircle2,
  FileText,
  Fingerprint,
  LayoutDashboard,
  Loader2,
  Mail,
  Phone,
  ScrollText,
  Sparkles,
  User,
  UserPlus,
  UsersRound,
  Wallet,
} from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useModal } from '../context/ModalContext';
import Logo from './Logo';
import Reveal from './Reveal';

const TRIAL_DAYS = 14;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const TRIAL_API_URL = import.meta.env.VITE_TRIAL_API_URL; // e.g. https://trial.globalhris.com

const initialSignup = {
  companyName: '',
  fullName: '',
  workEmail: '',
  phone: '',
};

const onboardingSteps = [
  { icon: UserPlus, title: 'Create an employee', body: 'Add a staff member and assign org, supervisor, shift and pay scheme.' },
  { icon: Fingerprint, title: 'Simulate a biometric punch', body: 'Punch in/out with a simulated device — just like the real connector.' },
  { icon: LayoutDashboard, title: 'View live attendance', body: 'Watch the attendance calendar update instantly for that employee.' },
  { icon: UsersRound, title: 'Submit a leave request', body: 'Apply for leave through employee self-service.' },
  { icon: CheckCircle2, title: 'Walk the approval chain', body: 'Approve the request through Supervisor → HOD → HR.' },
  { icon: Wallet, title: 'Run payroll (sandbox)', body: 'Process earnings, deductions, attendance and leave in a sandbox run.' },
  { icon: ArrowRight, title: 'Review the payroll run', body: 'Review the run — finalize is sandbox-only during your trial.' },
  { icon: FileText, title: 'Open a branded payslip', body: 'View your company-branded, trilingual employee payslip.' },
  { icon: ScrollText, title: 'View the audit trail', body: 'See every change logged with before/after values and timestamps.' },
];

const trialFeatures = [
  { icon: Building2, title: 'Your own tenant', body: 'An isolated company and site with the full employee, attendance, leave and payroll modules.' },
  { icon: UsersRound, title: 'Demo employees', body: 'Realistic sample staff with varied designations, shifts and pay schemes.' },
  { icon: Fingerprint, title: 'Simulated biometrics', body: 'No hardware needed — simulate punches to see live attendance flow.' },
  { icon: Wallet, title: 'Sandbox payroll', body: 'Run payroll end-to-end. Locking/finalizing is disabled in trial.' },
];

export default function TrialDemoPage() {
  const { goHome } = useModal();
  const [form, setForm] = useState(initialSignup);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [error, setError] = useState('');

  const handleChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      // Preferred: POST to the trial deployment's public signup endpoint.
      if (TRIAL_API_URL) {
        const res = await fetch(`${TRIAL_API_URL.replace(/\/$/, '')}/api/trial/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            companyName: form.companyName,
            fullName: form.fullName,
            workEmail: form.workEmail,
            phone: form.phone,
          }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `Signup failed with status ${res.status}`);
        }
      } else if (EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY) {
        // Fallback: notify the sales inbox via EmailJS until the trial backend exists.
        const json = {
          from_name: form.fullName,
          name: form.fullName,
          full_name: form.fullName,
          user_name: form.fullName,
          reply_to: form.workEmail,
          from_email: form.workEmail,
          work_email: form.workEmail,
          email: form.workEmail,
          user_email: form.workEmail,
          company_name: form.companyName,
          company: form.companyName,
          user_company: form.companyName,
          phone: form.phone,
          phone_number: form.phone,
          user_phone: form.phone,
          message: [
            `Company: ${form.companyName}`,
            `Name: ${form.fullName}`,
            `Work Email: ${form.workEmail}`,
            `Phone: ${form.phone}`,
          ].join('\n'),
        };
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, json, { publicKey: EMAILJS_PUBLIC_KEY });
      } else {
        throw new Error('Trial signup is not configured yet.');
      }

      setStatus('success');
    } catch (err) {
      console.error('Trial signup failed:', err);
      setStatus('error');
      setError(err?.message || 'Something went wrong. Please try again or email sales@globalhris.com.');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy-950 transition-colors duration-500">
      <TrialBanner daysLeft={TRIAL_DAYS} />

      <header className="sticky top-0 z-40 glass-nav">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-18 items-center gap-6 py-3">
            <Logo />
            <nav className="hidden lg:flex items-center gap-1 ml-4">
              <a href="#trial" className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white transition-colors">Trial Overview</a>
              <a href="#signup" className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white transition-colors">Start Free Trial</a>
              <a href="#checklist" className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white transition-colors">Onboarding</a>
              <a href="#features" className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-navy-900 dark:hover:text-white transition-colors">What's Included</a>
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <button type="button" onClick={goHome} className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-electric-500 transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to site
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section id="trial" className="relative overflow-hidden py-16 md:py-20">
          <div className="absolute inset-0 -z-10 grid-pattern [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
          <div className="absolute -z-10 -top-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-electric-500/20 blur-[120px]" />

          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Reveal>
                <div className="max-w-xl">
                  <span className="eyebrow mb-5">
                    <Sparkles className="h-4 w-4" /> Trial Version
                  </span>
                  <h1 className="font-display text-4xl sm:text-5xl font-bold leading-[1.08] tracking-tight text-navy-900 dark:text-white">
                    Try Global HRIS free for {TRIAL_DAYS} days
                  </h1>
                  <p className="mt-5 text-lg text-slate-600 dark:text-slate-400">
                    Get your own isolated demo workspace pre-loaded with realistic data — walk the complete workforce journey, from
                    employee creation to an audited payroll run — with no hardware and no commitment.
                  </p>
                  <ul className="mt-7 space-y-2.5">
                    {trialFeatures.map((f) => (
                      <li key={f.title} className="flex items-start gap-3">
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/15 text-electric-500 dark:text-cyan-300">
                          <f.icon className="h-4 w-4" />
                        </span>
                        <span>
                          <span className="font-semibold text-navy-900 dark:text-white">{f.title}</span>
                          <span className="text-sm text-slate-500 dark:text-slate-400"> — {f.body}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={120} variant="scale">
                <div id="signup" className="glass-strong rounded-3xl p-7 sm:p-8">
                  {status === 'success' ? (
                    <div className="py-6 text-center">
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-electric-500/20 text-cyan-500 dark:text-cyan-300 mb-5">
                        <CheckCircle2 className="h-8 w-8" />
                      </span>
                      <h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">Check your email</h3>
                      <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">
                        {form.fullName ? `Thanks, ${form.fullName.split(' ')[0]}!` : 'Thanks!'} Your free trial is being set up. We've sent
                        your login details to <span className="font-medium text-navy-800 dark:text-slate-200">{form.workEmail}</span> — check
                        your inbox to get started.
                      </p>
                      <button type="button" onClick={goHome} className="btn-primary mt-7 w-full">
                        Back to home
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="eyebrow">Start Free Trial</span>
                      <h3 className="mt-2 font-display text-xl font-bold text-navy-900 dark:text-white">
                        Create your trial workspace
                      </h3>
                      <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">No credit card required. We'll email you login details.</p>

                      <form onSubmit={handleSignup} className="mt-6 space-y-4">
                        <Field icon={Building2} label="Company Name" type="text" required value={form.companyName} onChange={handleChange('companyName')} placeholder="Your Company Pvt Ltd" />
                        <Field icon={User} label="Full Name" type="text" required value={form.fullName} onChange={handleChange('fullName')} placeholder="Jane Perera" />
                        <Field icon={Mail} label="Work Email" type="email" required value={form.workEmail} onChange={handleChange('workEmail')} placeholder="jane@company.com" />
                        <Field icon={Phone} label="Phone Number" type="tel" value={form.phone} onChange={handleChange('phone')} placeholder="+94 7X XXX XXX" />

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
              </Reveal>
            </div>
          </div>
        </section>

        <section id="checklist" className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <span className="eyebrow">Guided Onboarding</span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy-900 dark:text-white">
                Complete the demo journey, step by step
              </h2>
              <p className="mt-2.5 text-slate-500 dark:text-slate-400 max-w-2xl">
                Each step mirrors a real Global HRIS business process. Follow them in order to see one workforce event flow through
                the whole system — no empty screens, no dead ends.
              </p>
            </Reveal>

            <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {onboardingSteps.map((step, i) => (
                <Reveal key={step.title} delay={i * 70} variant="up">
                  <div className="glass-card rounded-2xl p-6 h-full">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-electric-500/20 text-electric-500 dark:text-cyan-300">
                        <step.icon className="h-5 w-5" />
                      </span>
                      <span className="text-xs font-bold text-slate-400">Step {String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-navy-900 dark:text-white">{step.title}</h3>
                    <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{step.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-white/[0.02] py-20">
          <div className="mx-auto max-w-7xl">
            <Reveal>
              <span className="eyebrow">Trial Package</span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-navy-900 dark:text-white">
                Everything you need to evaluate Global HRIS
              </h2>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {trialFeatures.map((f, i) => (
                <Reveal key={f.title} delay={i * 70} variant="up">
                  <div className="glass-card rounded-2xl p-6 h-full text-center">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-electric-500/20 text-electric-500 dark:text-cyan-300 mx-auto">
                      <f.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-display text-base font-bold text-navy-900 dark:text-white">{f.title}</h3>
                    <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-12 text-center">
              <a href="#signup" className="btn-primary">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </a>
              <a href="mailto:sales@globalhris.com" className="btn-secondary ml-3">
                Talk to our team
              </a>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 dark:border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Powered by <span className="font-medium text-navy-900 dark:text-white">Global HRIS</span> — a product of Global Exceed Pvt Ltd
          </p>
          <button type="button" onClick={goHome} className="text-sm font-medium text-electric-500 hover:underline">
            Back to marketing site
          </button>
        </div>
      </footer>
    </div>
  );
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

function TrialBanner({ daysLeft }) {
  return (
    <div className="bg-gradient-to-r from-royal-600 to-electric-600 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-2 text-sm font-medium text-center flex-wrap">
        <CalendarClock className="h-4 w-4 shrink-0" />
        <span>
          Trial Version — <strong>{daysLeft}</strong> {daysLeft === 1 ? 'day' : 'days'} remaining — Upgrade to Professional
        </span>
        <a href="#signup" className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/20 hover:bg-white/30 px-3 py-1 text-xs font-semibold transition-colors">
          Upgrade <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
