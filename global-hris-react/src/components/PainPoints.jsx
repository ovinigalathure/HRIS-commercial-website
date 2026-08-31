import { ArrowRight } from 'lucide-react';
import { painPoints } from '../data/content';
import Icon from './Icon';
import Reveal from './Reveal';

export default function PainPoints() {
  return (
    <section className="section-pad relative bg-slate-50/70 dark:bg-navy-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">The Problem</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">
            The real-world pain points we eliminate
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            See how Global HRIS compares to legacy HR software and rigid global SaaS platforms.
          </p>
        </Reveal>

        <div className="mt-14 grid md:grid-cols-2 gap-6">
          {painPoints.map((p, i) => (
            <Reveal key={p.challenge} delay={i * 90}>
              <article className="glass-card rounded-3xl p-7 h-full flex flex-col">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/5 dark:bg-white/5 text-slate-500 dark:text-slate-400">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="font-display text-lg font-bold text-navy-900 dark:text-white pt-1.5">{p.challenge}</h3>
                </div>

                <div className="mt-5 space-y-2.5">
                  <div className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 shrink-0 rounded-full bg-slate-200 dark:bg-navy-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">Legacy</span>
                    <span className="text-slate-500 dark:text-slate-400">{p.legacy}</span>
                  </div>
                  <div className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 shrink-0 rounded-full bg-slate-200 dark:bg-navy-700 text-slate-500 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">SaaS</span>
                    <span className="text-slate-500 dark:text-slate-400">{p.saas}</span>
                  </div>
                </div>

                <div className="mt-5 pt-5 border-t border-slate-900/5 dark:border-white/10 flex items-start gap-2.5">
                  <ArrowRight className="h-4 w-4 mt-1 shrink-0 text-electric-500" />
                  <p className="text-sm">
                    <span className="font-semibold text-navy-900 dark:text-white">{p.solutionTitle}: </span>
                    <span className="text-slate-600 dark:text-slate-400">{p.solution}</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
