import { AlertTriangle, ArrowDown, CheckCircle2, X } from 'lucide-react';
import { painPoints } from '../data/content';
import Icon from './Icon';
import Reveal from './Reveal';
import useTilt from '../hooks/useTilt';

function PainCard({ item, index }) {
  const tilt = useTilt();
  return (
    <Reveal delay={index * 90} variant="scale" className="h-full">
      <article
        ref={tilt.ref}
        style={tilt.style}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="spotlight-card glass-card group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 sm:p-7"
      >
        <span className="pointer-events-none absolute -top-6 -right-3 select-none font-display text-8xl font-bold leading-none text-slate-100/70 dark:text-white/[0.04]">
          0{index + 1}
        </span>

        <div className="relative z-10 flex items-start gap-4">
          <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500/25 to-cyan-400/10 text-electric-600 ring-1 ring-electric-500/20 transition-transform duration-350 group-hover:rotate-3 group-hover:scale-110 dark:text-cyan-300">
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold leading-snug text-navy-900 dark:text-white">
              {item.challenge}
            </h3>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-2">
          <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500">
            The strain on your operations
          </span>
        </div>

        <div className="mt-3 space-y-2.5">
          <div className="flex items-start gap-3 rounded-xl border border-slate-900/5 bg-slate-900/[0.03] p-3 transition-colors duration-300 group-hover:border-rose-500/20 dark:border-white/10 dark:bg-white/[0.02]">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-500">
              <X className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="min-w-0 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
              <span className="mr-1.5 font-bold uppercase tracking-wide text-[10px] text-rose-500/80">Legacy</span>
              {item.legacy}
            </span>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-slate-900/5 bg-slate-900/[0.03] p-3 transition-colors duration-300 group-hover:border-amber-500/20 dark:border-white/10 dark:bg-white/[0.02]">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
              <X className="h-3 w-3" strokeWidth={3} />
            </span>
            <span className="min-w-0 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">
              <span className="mr-1.5 font-bold uppercase tracking-wide text-[10px] text-amber-500/80">SaaS</span>
              {item.saas}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-2.5">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300/60 to-electric-500/50 dark:via-white/10" />
          <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 text-white shadow-[0_4px_14px_-4px_rgba(59,130,246,0.7)]">
            <ArrowDown className="h-3 w-3" strokeWidth={3} />
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-electric-500/50 via-slate-300/60 to-transparent dark:via-white/10" />
        </div>

        <div className="relative z-10 mt-5 flex items-start gap-3 rounded-2xl border border-electric-500/20 bg-gradient-to-br from-white/70 to-electric-500/[0.06] p-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 dark:from-white/[0.05] dark:to-electric-500/[0.05]">
          <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-royal-600 to-cyan-400 text-white shadow-[0_4px_14px_-4px_rgba(34,211,238,0.8)]">
            <CheckCircle2 className="h-3 w-3" strokeWidth={2.5} />
          </span>
          <span className="min-w-0 text-[13px] leading-relaxed">
            <span className="mr-1.5 font-bold uppercase tracking-wide text-[10px] text-electric-600 dark:text-cyan-300">
              Global HRIS fix
            </span>
            <span className="font-semibold text-navy-900 dark:text-white">{item.solutionTitle} — </span>
            <span className="text-slate-600 dark:text-slate-400">{item.solution}</span>
          </span>
        </div>
      </article>
    </Reveal>
  );
}

export default function PainPoints() {
  return (
    <section className="section-pad relative overflow-hidden section-tint dark:bg-navy-900/40">
      {/* Background glows */}
      <div className="absolute -z-10 -top-32 -left-32 h-[30rem] w-[30rem] rounded-full bg-electric-500/10 blur-[120px]" />
      <div className="absolute -z-10 bottom-0 -right-32 h-[28rem] w-[28rem] rounded-full bg-accent-500/[0.07] blur-[110px]" />
      <div className="absolute -z-10 inset-0 grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">The Problem</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
            <span className="text-gradient-topic">The real-world pain points we eliminate</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Legacy local software and rigid global platforms both fail at the same thing — your reality.
            See the friction, then the fix.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {painPoints.map((p, i) => (
            <PainCard key={p.challenge} item={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
