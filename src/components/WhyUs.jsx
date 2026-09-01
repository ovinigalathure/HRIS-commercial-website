import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { whyUs } from '../data/content';
import Icon from './Icon';
import Reveal from './Reveal';

function renderTitle(title) {
  if (!title.includes('\u200B')) return title;
  const [head, ...rest] = title.split('\u200B');
  return (
    <>
      {head.trim()}
      <br />
      <span className="whitespace-nowrap">{rest.join(' ').trim()}</span>
    </>
  );
}

function WhyCard({ item, index, open, onToggle, wrapperClass }) {
  const variant = index === 0 ? 'scale' : index % 2 === 0 ? 'left' : 'right';
  return (
    <Reveal delay={index * 90} variant={variant} className={wrapperClass}>
      <article
        className={`group glass-card relative flex w-full flex-col overflow-hidden rounded-3xl text-center transition-all duration-500 ${
          open ? 'border-electric-500/30 dark:border-electric-400/30 shadow-[0_20px_60px_-20px_rgba(59,130,246,0.4)]' : ''
        }`}
      >
        {item.image && (
          <div className="relative h-56 w-full shrink-0 overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/40 to-transparent" />
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center px-7 pb-3 pt-4">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-electric-500/20 to-cyan-400/10 text-electric-600 transition-transform duration-350 group-hover:rotate-3 group-hover:scale-105 dark:text-cyan-300">
            <Icon name={item.icon} className="h-5 w-5" />
          </span>
          <h3 className="mt-3 min-h-12 font-display text-base font-bold leading-snug text-navy-900 dark:text-white">
            {renderTitle(item.title)}
          </h3>
        </div>

        <div className="relative z-10 mt-auto flex justify-center px-7 pt-2 pb-1">
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-900/10 bg-white/60 text-slate-500 shadow-sm transition-all duration-300 hover:border-electric-500/40 hover:text-electric-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:text-cyan-300"
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
              strokeWidth={2.5}
            />
          </button>
        </div>

        <div
          className={`relative z-10 overflow-hidden transition-all duration-500 px-7 ${
            open ? 'mt-5 max-h-96 pb-7 opacity-100' : 'mt-0 max-h-0 pb-0 opacity-0'
          }`}
        >
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
        </div>
      </article>
    </Reveal>
  );
}

export default function WhyUs() {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Why Global HRIS</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            <span className="text-gradient-topic">Built different, on purpose</span>
          </h2>
        </Reveal>
        <div className="mt-14 flex flex-wrap justify-center gap-6">
          {whyUs.map((item, i) => (
            <WhyCard
              key={item.title}
              item={item}
              index={i}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              wrapperClass="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
