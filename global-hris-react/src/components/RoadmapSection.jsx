import { CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import roadmap from '../data/roadmap';
import Icon from './Icon';
import Reveal from './Reveal';
import useScrollProgress from '../hooks/useScrollProgress';

export default function RoadmapSection() {
  const { ref: roadmapRef, progress } = useScrollProgress();
  const phaseRefs = useRef([]);
  const [activePhase, setActivePhase] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) setActivePhase(Number(entry.target.dataset.phase));
    }), { threshold: 0.5, rootMargin: '-35% 0px -35% 0px' });
    phaseRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToPhase = (index) => phaseRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return <section className="section-pad relative overflow-hidden"><div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><Reveal className="mx-auto max-w-2xl text-center"><span className="eyebrow justify-center">What's Next</span><h2 className="mt-4 font-display text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">Upcoming modules roadmap</h2><p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">Five phases extending Global HRIS from hire to retire.</p></Reveal><Reveal delay={80} className="mt-10 flex flex-wrap justify-center gap-2">{roadmap.map((phase, i) => <button key={phase.phase} type="button" onClick={() => scrollToPhase(i)} className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${activePhase === i ? 'border-electric-500 bg-electric-500 text-white shadow-lg shadow-electric-500/25' : 'border-slate-200 bg-white/60 text-slate-500 hover:border-electric-400 dark:border-white/10 dark:bg-white/3 dark:text-slate-400'}`}>{phase.phase}</button>)}</Reveal><div ref={roadmapRef} className="relative mt-12"><svg className="pointer-events-none absolute left-5 top-8 hidden h-[calc(100%-4rem)] w-2 lg:block" viewBox="0 0 2 1000" preserveAspectRatio="none" aria-hidden="true"><line x1="1" y1="0" x2="1" y2="1000" stroke="currentColor" className="text-slate-200 dark:text-white/10" strokeWidth="1" /><line x1="1" y1="0" x2="1" y2="1000" stroke="currentColor" className="text-electric-500" strokeWidth="2" pathLength="1000" strokeDasharray="1000" strokeDashoffset={1000 * (1 - progress)} /></svg><div className="space-y-6 lg:space-y-10">{roadmap.map((phase, i) => <Reveal key={phase.phase} delay={i * 90} variant={i % 2 ? 'right' : 'left'}><div ref={(element) => { phaseRefs.current[i] = element; }} data-phase={i} className="relative lg:grid lg:grid-cols-[1fr_5rem_1fr] lg:items-start"><span className={`z-10 hidden h-16 w-16 items-center justify-center rounded-2xl text-white transition-all duration-500 lg:col-start-2 lg:row-start-1 lg:flex ${activePhase === i ? 'scale-110 bg-linear-to-br from-royal-600 via-electric-500 to-cyan-400 shadow-[0_0_30px_-6px_rgba(59,130,246,0.5)]' : 'bg-slate-300 dark:bg-navy-700'}`}><Icon name={phase.icon} className="h-6 w-6" /></span><div className={`glass-card rounded-3xl p-7 sm:p-8 lg:row-start-1 ${i % 2 ? 'lg:col-start-3' : 'lg:col-start-1 lg:text-right'}`}><div className={`mb-1 flex flex-wrap items-center gap-3 ${i % 2 === 0 ? 'lg:justify-end' : ''}`}><span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-royal-600 via-electric-500 to-cyan-400 text-white lg:hidden"><Icon name={phase.icon} className="h-4.5 w-4.5" /></span><span className={`text-xs font-bold uppercase tracking-[0.15em] ${activePhase === i ? 'text-electric-600 dark:text-cyan-300' : 'text-slate-400'}`}>{phase.phase}</span><span className="ml-auto rounded-full bg-accent-500/10 px-3 py-1 text-xs font-semibold text-accent-500">{phase.impact}</span></div><h3 className="font-display text-xl font-bold text-navy-900 dark:text-white">{phase.title}</h3><p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">{phase.body}</p><ul className={`mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 ${i % 2 === 0 ? 'lg:text-left' : ''}`}>{phase.points.map((point) => <li key={point} className="flex items-start gap-2.5 text-left text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-cyan-500" /><span className="text-slate-600 dark:text-slate-300">{point}</span></li>)}</ul></div></div></Reveal>)}</div></div></div></section>;
}
