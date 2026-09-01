import { productOverview } from '../data/content';
import { useModal } from '../context/ModalContext';
import Icon from './Icon';
import Reveal from './Reveal';

export default function ProductOverview() {
  const { openFeatureDetail } = useModal();

  return (
    <section id="platform" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">{productOverview.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold"><span className="text-gradient-topic">{productOverview.title}</span></h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{productOverview.body}</p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-5">
          {productOverview.pillars.map((p, i) => (
            <Reveal key={p.label} delay={i * 60}>
              <button
                type="button"
                onClick={() => openFeatureDetail(p.featureKey)}
                className="group relative flex h-56 sm:h-64 w-full flex-col justify-end overflow-hidden rounded-2xl text-center cursor-pointer ring-1 ring-white/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-15px_rgba(15,42,90,0.55)] dark:hover:shadow-[0_24px_50px_-15px_rgba(0,0,0,0.85)]"
              >
                {p.image && (
                  <>
                    <img
                      src={p.image}
                      alt={p.label}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.12]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/20 to-transparent transition-opacity duration-500 group-hover:from-navy-950/80" />
                    <span className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[shine-sweep_.9s_ease-out] transition-opacity duration-300" />
                    <span className="absolute top-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-gradient-to-r from-cyan-300 via-white to-cyan-300 transition-all duration-500 group-hover:w-2/3" />
                  </>
                )}

                <div className="relative z-10 m-1.5 mt-auto flex items-center justify-center gap-2 self-center rounded-full bg-white/10 py-1.5 pl-1.5 pr-4 text-center backdrop-blur-md ring-1 ring-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] transition-all duration-500 group-hover:bg-white/20 group-hover:ring-white/30 group-hover:-translate-y-0.5">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-white ring-1 ring-white/25 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 group-hover:bg-white/30">
                    <Icon name={p.icon} className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-semibold leading-none text-white drop-shadow-sm">{p.label}</span>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}