import { Check, Minus, X } from 'lucide-react';
import comparison from '../data/comparison';
import Icon from './Icon';
import Reveal from './Reveal';

const columns = comparison.columns;
const cols = columns.map((name, i) =>
  i === 0 ? { name, featured: true } : { name, featured: false }
);

const stateConfig = {
  good: {
    icon: Check,
    chip: 'bg-emerald-400/15 text-emerald-600 dark:text-emerald-400',
    ring: 'ring-emerald-400/30',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  neutral: {
    icon: Minus,
    chip: 'bg-amber-400/15 text-amber-600 dark:text-amber-400',
    ring: 'ring-amber-400/30',
    text: 'text-amber-700 dark:text-amber-300',
  },
  bad: {
    icon: X,
    chip: 'bg-rose-400/15 text-rose-500 dark:text-rose-400',
    ring: 'ring-rose-400/30',
    text: 'text-rose-600/90 dark:text-rose-400/80',
  },
};

const planMeta = [
  { icon: 'Zap', tagline: 'The modern choice' },
  { icon: 'Server', tagline: 'Local & established' },
  { icon: 'Globe2', tagline: 'Global & rigid' },
];

function ColumnHeaderCard({ col, meta, index }) {
  return (
    <div className="relative">
      <Reveal delay={index * 90} className="h-full">
        <div
          className={`relative flex h-full flex-col items-center justify-center rounded-3xl p-5 text-center ${
            col.featured
              ? 'bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 text-white shadow-[0_24px_60px_-20px_rgba(59,130,246,0.6)]'
              : 'glass-card'
          }`}
        >
          {col.featured && (
            <span className="absolute -top-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-electric-600 shadow-sm">
              Recommended
            </span>
          )}
          <span
            className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${
              col.featured ? 'bg-white/20 text-white' : 'bg-slate-900/5 text-slate-500 dark:bg-white/5 dark:text-slate-400'
            }`}
          >
            <Icon name={meta.icon} className="h-5 w-5" />
          </span>
          <h3
            className={`mt-3 font-display text-base font-bold leading-tight ${
              col.featured ? 'text-white' : 'text-navy-900 dark:text-white'
            }`}
          >
            {col.name}
          </h3>
          <p
            className={`mt-1 text-xs ${
              col.featured ? 'text-white/85' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            {meta.tagline}
          </p>
        </div>
      </Reveal>
    </div>
  );
}

function Matrix() {
  return (
    <div className="overflow-hidden rounded-3xl glass-strong">
      {/* Matrix header row (desktop column labels) */}
      <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr] items-stretch">
        <div className="flex items-center px-7 py-4 text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Capability
        </div>
        {cols.map((col, i) => (
          <div
            key={col.name}
            className={`relative flex items-center justify-center px-4 py-4 text-xs font-bold uppercase tracking-wider ${
              col.featured
                ? 'bg-electric-500/10 text-electric-600 dark:bg-electric-500/15 dark:text-cyan-300'
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {col.featured && (
              <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-royal-600 via-electric-500 to-cyan-400" />
            )}
            {col.name}
          </div>
        ))}
      </div>

      {comparison.rows.map((row, i) => (
        <Reveal key={row.feature} delay={i * 60}>
          <div
            className={`grid grid-cols-[1fr] md:grid-cols-[1.5fr_1fr_1fr_1fr] items-center border-t border-slate-900/5 transition-colors duration-300 hover:bg-slate-500/[0.03] dark:border-white/10 dark:hover:bg-white/[0.02] ${
              i % 2 === 0 ? '' : ''
            }`}
          >
            <div className="flex items-center gap-3 px-6 py-5 md:py-4">
              <span className="text-sm font-semibold text-navy-900 dark:text-white">{row.feature}</span>
            </div>
            {row.values.map((val, idx) => {
              const s = row.states[idx];
              const cfg = stateConfig[s];
              const StateIcon = cfg.icon;
              const featured = idx === 0;
              return (
                <div
                  key={val}
                  className={`relative flex flex-col items-start gap-2 px-6 py-4 md:items-center md:px-4 md:py-4 md:text-center ${
                    featured
                      ? 'border-l-2 border-l-electric-500/30 bg-electric-500/[0.08] dark:bg-electric-500/[0.10]'
                      : ''
                  } ${i % 2 === 1 && !featured ? 'bg-slate-900/[0.015] dark:bg-white/[0.015]' : ''}`}
                >
                  {featured && (
                    <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 bg-gradient-to-b from-royal-600 via-electric-500 to-cyan-400" />
                  )}
                  <span className="md:hidden text-[10px] font-bold uppercase tracking-wide text-slate-400">
                    {columns[idx]}
                  </span>
                  <div className="flex items-center gap-2 md:flex-col md:gap-1.5">
                    <span className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full ring-1 ${cfg.chip} ${cfg.ring} ${featured ? 'ring-electric-500/40' : ''}`}>
                      <StateIcon className="h-3.5 w-3.5" strokeWidth={2.75} />
                    </span>
                    <span className={`text-xs leading-snug md:text-[13px] ${cfg.text} ${featured ? 'font-semibold text-navy-900 dark:text-white' : ''}`}>{val}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function ComparisonSection() {
  return (
    <section className="section-pad relative overflow-hidden section-tint dark:bg-navy-900/40">
      <div className="absolute -z-10 -left-32 top-10 h-[26rem] w-[26rem] rounded-full bg-electric-500/10 blur-[120px]" />
      <div className="absolute -z-10 -right-32 bottom-0 h-[24rem] w-[24rem] rounded-full bg-cyan-400/10 blur-[110px]" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Competitive Edge</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold">
            <span className="text-gradient-topic">How Global HRIS compares</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Against legacy local systems (hSenid / Microimage) and rigid global SaaS platforms
            (Zoho / BambooHR / Workday) — side by side, capability by capability.
          </p>
        </Reveal>

        {/* Column header cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {cols.map((col, i) => (
            <ColumnHeaderCard key={col.name} col={col} meta={planMeta[i]} index={i} />
          ))}
        </div>

        {/* Feature matrix */}
        <Reveal delay={120} className="mt-6">
          <Matrix />
        </Reveal>
      </div>
    </section>
  );
}
