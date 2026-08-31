import { ArrowRight, CheckCircle2, PlayCircle } from 'lucide-react';
import { hero } from '../data/content';
import { useModal } from '../context/ModalContext';
import DashboardMock from './DashboardMock';
import Reveal from './Reveal';

export default function Hero() {
  const { openTrial, openVideo } = useModal();

  return (
    <section id="product" className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Background: mesh gradient + grid */}
      <div className="absolute inset-0 -z-10 grid-pattern [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -z-10 -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-electric-500/20 blur-[120px]" />
      <div className="absolute -z-10 top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-cyan-400/15 blur-[120px]" />
      <div className="absolute -z-10 bottom-0 right-1/4 h-[26rem] w-[26rem] rounded-full bg-accent-500/10 blur-[110px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="eyebrow mb-5">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 pulse-dot" />
              {hero.eyebrow}
            </span>
            <h1 className="font-display text-4xl sm:text-5xl xl:text-[3.4rem] font-bold leading-[1.08] tracking-tight text-navy-900 dark:text-white">
              {hero.headline}
            </h1>
            <p className="mt-5 text-lg font-semibold text-navy-800 dark:text-slate-200">{hero.subline}</p>
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl">{hero.body}</p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button type="button" onClick={openTrial} className="btn-primary">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" onClick={() => openVideo({ title: 'Global HRIS — Platform Walkthrough' })} className="btn-secondary">
                <PlayCircle className="h-4 w-4" /> Book a Demo
              </button>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5">
              {hero.trustLine.map((line) => (
                <span key={line} className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
                  {line}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal variant="scale" delay={150} className="relative lg:pl-6">
            <DashboardMock />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
