import { ShieldCheck } from 'lucide-react';
import { securityFeatures } from '../data/content';
import Icon from './Icon';
import Reveal from './Reveal';

export default function SecuritySection() {
  return (
    <section
      id="security"
      className="section-pad relative overflow-hidden bg-white dark:bg-navy-950"
    >
      {/* Light-mode blue-tinted background */}
      <div className="absolute inset-0 section-tint dark:hidden" />

      {/* Grid pattern and ambient glow */}
      <div className="absolute inset-0 grid-pattern opacity-15 dark:opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[30rem] w-[30rem] rounded-full bg-electric-500/15 dark:bg-electric-500/20 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-cyan-600 dark:text-cyan-300 border-white/70 dark:border-white/10">
            <ShieldCheck className="h-3.5 w-3.5" /> Security & Compliance
          </span>
          <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">Enterprise-grade control and confidence</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Every layer of Global HRIS is built to protect sensitive workforce data — from authentication to the audit trail.
          </p>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {securityFeatures.map((item, i) => (
            <Reveal key={item.title} delay={i * 70}>
              <div className="rounded-3xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-white/70 dark:border-white/10 p-7 h-full shadow-[0_16px_40px_-16px_rgba(36,81,227,0.18)] dark:shadow-none transition-all duration-500 hover:border-electric-400/40 dark:hover:border-electric-400/30 hover:-translate-y-1.5 hover:shadow-[0_0_50px_-14px_rgba(59,130,246,0.35)] dark:hover:shadow-[0_0_50px_-14px_rgba(59,130,246,0.4)]">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500/20 to-cyan-400/10 text-electric-600 dark:text-cyan-300">
                  <Icon name={item.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-5 font-display text-base font-bold text-navy-900 dark:text-white">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
