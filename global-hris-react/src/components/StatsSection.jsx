import stats, { speedStat } from '../data/stats';
import Counter from './Counter';
import Icon from './Icon';
import Reveal from './Reveal';

export default function StatsSection() {
  return (
    <section className="section-pad relative bg-slate-50/70 dark:bg-navy-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">Impact</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">Facts, figures & ROI</h2>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 70} className="lg:col-span-1">
              <div className="glass-card rounded-3xl p-7 h-full text-center flex flex-col items-center">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500/15 to-cyan-400/10 text-electric-600 dark:text-cyan-300">
                  <Icon name={s.icon} className="h-5.5 w-5.5" />
                </span>
                <p className="mt-4 font-display text-4xl font-bold text-gradient">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{s.label}</p>
              </div>
            </Reveal>
          ))}

          <Reveal delay={stats.length * 70} className="sm:col-span-2 lg:col-span-1">
            <div className="rounded-3xl p-7 h-full text-center flex flex-col items-center justify-center bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 text-white shadow-xl shadow-electric-500/25">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
                <Icon name={speedStat.icon} className="h-5.5 w-5.5" />
              </span>
              <p className="mt-4 font-display text-2xl font-bold">{speedStat.value}</p>
              <p className="mt-3 text-xs leading-relaxed text-white/85">{speedStat.label}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
