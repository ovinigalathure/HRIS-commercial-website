import { trustStrip } from '../data/content';
import Icon from './Icon';
import Reveal from './Reveal';

export default function TrustBar() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="glass-panel grid sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/40 dark:divide-white/10 mt-8 relative z-10">
            {trustStrip.map((item) => (
              <div key={item.title} className="p-6 sm:p-7 flex gap-4">
                <span className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-electric-500/15 to-cyan-400/10 text-electric-600 dark:text-cyan-300">
                  <Icon name={item.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-navy-900 dark:text-white">{item.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
