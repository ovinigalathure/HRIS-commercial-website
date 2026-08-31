import { Building2, CheckCircle2, Loader2, MessageSquare, User } from 'lucide-react';
import { useState } from 'react';
import StarRating from './StarRating';

const initialForm = { name: '', role: '', org: '', quote: '' };

function Field({ icon: Icon, label, ...props }) {
  return <label className="block"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{label}</span><div className="relative mt-1.5"><Icon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input {...props} className="w-full rounded-xl border border-slate-200 bg-white/80 py-3 pl-10 pr-4 text-sm text-navy-900 placeholder:text-slate-400 transition-all focus:border-electric-500/50 focus:outline-none focus:ring-2 focus:ring-electric-500/50 dark:border-white/10 dark:bg-white/3 dark:text-white" /></div></label>;
}

export default function TestimonialForm({ addTestimonial }) {
  const [form, setForm] = useState(initialForm);
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState('idle');
  const update = (key) => (event) => setForm((previous) => ({ ...previous, [key]: event.target.value }));
  const submit = (event) => { event.preventDefault(); addTestimonial({ ...form, rating }); setStatus('success'); setForm(initialForm); setRating(5); window.setTimeout(() => setStatus('idle'), 2500); };
  if (status === 'success') return <div className="flex min-h-80 flex-col items-center justify-center text-center"><span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-500"><CheckCircle2 className="h-7 w-7" /></span><h3 className="mt-5 font-display text-xl font-bold text-navy-900 dark:text-white">Thanks for sharing.</h3><p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Your feedback has been added below.</p></div>;
  return <form onSubmit={submit} className="mt-6 space-y-4"><div className="grid gap-4 sm:grid-cols-2"><Field icon={User} label="Name" required value={form.name} onChange={update('name')} placeholder="Your name" /><Field icon={Building2} label="Company" value={form.org} onChange={update('org')} placeholder="Company name" /></div><Field icon={User} label="Role" value={form.role} onChange={update('role')} placeholder="Your role" /><label className="block"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Rating</span><div className="mt-2"><StarRating value={rating} onChange={setRating} /></div></label><label className="block"><span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Your Experience</span><div className="relative mt-1.5"><MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" /><textarea required maxLength={400} value={form.quote} onChange={update('quote')} placeholder="Tell us about your experience" rows={5} className="w-full resize-none rounded-xl border border-slate-200 bg-white/80 py-3 pl-10 pr-4 text-sm text-navy-900 placeholder:text-slate-400 focus:border-electric-500/50 focus:outline-none focus:ring-2 focus:ring-electric-500/50 dark:border-white/10 dark:bg-white/3 dark:text-white" /></div><span className="mt-1 block text-right text-xs text-slate-400">{form.quote.length}/400</span></label><button type="submit" disabled={status === 'submitting'} className="btn-primary w-full">{status === 'submitting' ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</> : 'Share Your Experience'}</button></form>;
}
