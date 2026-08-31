import { Check, Minus, X } from 'lucide-react';
import comparison from '../data/comparison';
import Reveal from './Reveal';

const stateStyles = {
  good: 'bg-cyan-400/15 text-cyan-600 dark:text-cyan-300',
  neutral: 'bg-slate-400/15 text-slate-500 dark:text-slate-400',
  bad: 'bg-slate-300/40 dark:bg-white/5 text-slate-400 dark:text-slate-500',
};

const stateIcon = { good: Check, neutral: Minus, bad: X };

export default function ComparisonSection() {
  return (
    <section className="section-pad relative bg-slate-50/70 dark:bg-navy-900/40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">Competitive Edge</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">How Global HRIS compares</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Against legacy local systems (hSenid / Microimage) and rigid global SaaS platforms (Zoho / BambooHR / Workday).
          </p>
        </Reveal>

        {/* Column legend */}
        <Reveal delay={80} className="mt-12 hidden md:grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-4 px-7">
          <span />
          {comparison.columns.map((c, i) => (
            <span
              key={c}
              className={`text-center text-xs font-bold tracking-wide uppercase py-2 rounded-xl ${
                i === 0 ? 'bg-gradient-to-r from-royal-600 via-electric-500 to-cyan-400 text-white' : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {c}
            </span>
          ))}
        </Reveal>

        <div className="mt-4 space-y-3">
          {comparison.rows.map((row, i) => (
            <Reveal key={row.feature} delay={i * 60}>
              <div className="glass-card rounded-2xl p-5 md:p-6 grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 md:gap-4 items-center">
                <span className="font-semibold text-sm text-navy-900 dark:text-white">{row.feature}</span>
                {row.values.map((val, idx) => {
                  const state = row.states[idx];
                  const StateIcon = stateIcon[state];
                  return (
                    <div key={val} className="flex md:flex-col md:items-center items-center gap-2.5 md:gap-1.5 md:text-center">
                      <span className="md:hidden text-[10px] font-bold uppercase tracking-wide text-slate-400 w-16 shrink-0">
                        {comparison.columns[idx]}
                      </span>
                      <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${stateStyles[state]}`}>
                        <StateIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <span className="text-xs md:text-[13px] text-slate-500 dark:text-slate-400">{val}</span>
                    </div>
                  );
                })}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
