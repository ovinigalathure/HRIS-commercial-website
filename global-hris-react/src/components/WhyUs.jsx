import { whyUs, productOverview } from '../data/content';
import Icon from './Icon';
import Reveal from './Reveal';
import useTilt from '../hooks/useTilt';

function WhyCard({ item, index }) {
  const tilt = useTilt();
  const variant = index === 0 ? 'scale' : index % 2 === 0 ? 'left' : 'right';
  return (
    <Reveal delay={index * 90} variant={variant}>
      <article ref={tilt.ref} style={tilt.style} onMouseMove={tilt.onMouseMove} onMouseLeave={tilt.onMouseLeave} className={`group spotlight-card glass-card relative h-full overflow-hidden rounded-3xl p-7 ${index === 0 ? 'lg:col-span-2 lg:p-9' : ''}`}>
        <span className="pointer-events-none absolute -right-2 -top-5 font-display text-8xl font-bold leading-none text-slate-100/80 dark:text-white/5">0{index + 1}</span>
        <div className="relative z-10 flex items-start justify-between gap-4">
          <span className={`inline-flex items-center justify-center rounded-2xl bg-linear-to-br from-electric-500/20 to-cyan-400/10 text-electric-600 transition-transform duration-350 group-hover:rotate-3 group-hover:scale-105 dark:text-cyan-300 ${index === 0 ? 'h-14 w-14' : 'h-12 w-12'}`}><Icon name={item.icon} className={index === 0 ? 'h-6 w-6' : 'h-5 w-5'} /></span>
          {index === 0 && <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cyan-600 dark:text-cyan-300">Core advantage</span>}
        </div>
        <h3 className="relative z-10 mt-6 font-display text-lg font-bold text-navy-900 dark:text-white">{item.title}</h3>
        <p className="relative z-10 mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
        {index === 0 && <div className="relative z-10 mt-7 flex flex-wrap items-center gap-2 border-t border-slate-900/10 pt-5 dark:border-white/10">{productOverview.pillars.slice(0, 5).map((pillar) => <span key={pillar.label} className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-500 dark:text-slate-400"><Icon name={pillar.icon} className="h-3.5 w-3.5 text-cyan-500" />{pillar.label}</span>)}</div>}
      </article>
    </Reveal>
  );
}

export default function WhyUs() {
  return <section className="section-pad relative"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Reveal className="mx-auto max-w-2xl text-center"><span className="eyebrow justify-center">Why Global HRIS</span><h2 className="mt-4 font-display text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">Built different, on purpose</h2></Reveal><div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{whyUs.map((item, i) => <WhyCard key={item.title} item={item} index={i} />)}</div></div></section>;
}
