import { CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import features from '../data/features';
import Icon from './Icon';
import Reveal from './Reveal';

export default function FeatureShowcase() {
  const [activeKey, setActiveKey] = useState(features[0].key);
  const active = features.find((f) => f.key === activeKey) ?? features[0];

  return (
    <section id="features" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">Complete Feature Set</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">
            Every module your workforce needs
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            From employee onboarding to statutory payroll — explore what's inside each part of the platform.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-14 grid lg:grid-cols-[19rem_1fr] gap-5">
          {/* Category nav */}
          <div className="glass-panel p-3 lg:sticky lg:top-24 lg:self-start">
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-1 px-1 lg:mx-0 lg:px-0">
              {features.map((f) => {
                const isActive = f.key === activeKey;
                return (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setActiveKey(f.key)}
                    className={`shrink-0 lg:w-full flex items-center gap-3 rounded-2xl px-4 py-3.5 text-left transition-all duration-300
                      ${isActive
                        ? 'bg-gradient-to-r from-royal-600 via-electric-500 to-cyan-400 text-white shadow-lg shadow-electric-500/25'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-900/5 dark:hover:bg-white/5'
                      }`}
                  >
                    <span className={`shrink-0 inline-flex h-9 w-9 items-center justify-center rounded-xl ${isActive ? 'bg-white/20' : 'bg-slate-900/5 dark:bg-white/5'}`}>
                      <Icon name={f.icon} className="h-4.5 w-4.5" />
                    </span>
                    <span className="text-sm font-semibold whitespace-nowrap lg:whitespace-normal">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active panel */}
          <div key={active.key} className="glass-strong rounded-3xl p-7 sm:p-10 reveal in-view">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8">
              <div className="flex-1">
                <span className="eyebrow">{active.tagline}</span>
                <h3 className="mt-3 font-display text-2xl font-bold text-navy-900 dark:text-white">{active.label}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">{active.description}</p>
              </div>
              <div className="shrink-0 rounded-2xl bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 text-white px-6 py-5 text-center shadow-lg shadow-electric-500/25 min-w-[10rem]">
                <p className="font-display text-2xl font-bold leading-none">{active.metric.value}</p>
                <p className="mt-2 text-[11px] font-medium text-white/85 leading-snug">{active.metric.label}</p>
              </div>
            </div>

            <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-3.5">
              {active.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-cyan-500 dark:text-cyan-400" />
                  <span className="text-slate-600 dark:text-slate-300">{h}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
