import { productOverview } from '../data/content';
import { useModal } from '../context/ModalContext';
import Icon from './Icon';
import Reveal from './Reveal';

export default function ProductOverview() {
  const { openFeatureDetail } = useModal();

  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">{productOverview.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">{productOverview.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{productOverview.body}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
          {productOverview.pillars.map((p, i) => (
            <Reveal key={p.label} delay={i * 60}>
              <button
                type="button"
                onClick={() => openFeatureDetail(p.featureKey)}
                className="glass-card rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center gap-3 cursor-pointer group w-full"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 text-white shadow-lg shadow-electric-500/25 transition-transform duration-300 group-hover:scale-110">
                  <Icon name={p.icon} className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-navy-900 dark:text-white">{p.label}</span>
                <span className="text-[11px] text-slate-400 dark:text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Click to explore
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}