import { integrationDetails, integrationFlow } from '../data/content';
import Icon from './Icon';
import Reveal from './Reveal';
import useTilt from '../hooks/useTilt';

function DetailCard({ item, index }) {
  const tilt = useTilt();
  return (
    <Reveal delay={index * 80} variant={index % 2 ? 'right' : 'left'}>
      <article
        ref={tilt.ref}
        style={tilt.style}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        className="group spotlight-card relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-6 ring-1 ring-slate-900/5 dark:ring-white/10"
      >
        {item.image && (
          <>
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/85 to-white/55 dark:from-navy-900/95 dark:via-navy-900/85 dark:to-navy-900/55" />
          </>
        )}

        <span className="relative z-10 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-royal-600 via-electric-500 to-cyan-400 text-white shadow-lg shadow-electric-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
          <Icon name={item.icon} className="h-5 w-5" />
        </span>
        <div className="relative z-10">
          <h3 className="font-display text-sm font-bold text-navy-900 dark:text-white">{item.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.body}</p>
        </div>
      </article>
    </Reveal>
  );
}

export default function IntegrationSection() {
  return (
    <section className="section-pad relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Hardware & Integration</span>
          <h2 className="mt-4 font-display text-3xl font-bold text-navy-900 dark:text-white sm:text-4xl">Connect your existing workforce infrastructure</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">From biometric terminals to ERP systems — Global HRIS is hardware-agnostic and API-first.</p>
        </Reveal>

        {/* Connection flow */}
        <Reveal delay={60} variant="scale" className="mt-14">
          <div className="glass-panel overflow-hidden p-6 sm:p-10">
            <div className="relative flex flex-col items-center justify-between gap-8 sm:flex-row sm:gap-0">
              {integrationFlow.map((node, i) => (
                <div key={node.label} className="relative z-10 flex flex-col items-center gap-3 sm:w-[18%]">
                  {/* Step number chip */}
                  <span className="absolute -top-1.5 -left-1.5 z-20 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-accent-500 to-amber-400 text-[11px] font-bold text-white shadow-md">
                    {i + 1}
                  </span>

                  <span
                    className={`relative grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 text-white shadow-lg shadow-electric-500/30 ${
                      i === 0 ? 'pulse-glow' : ''
                    }`}
                  >
                    <Icon name={node.icon} className="h-7 w-7" />
                    {/* pulsing ring on first node */}
                    {i === 0 && <span className="absolute inset-0 -z-10 rounded-2xl bg-electric-500/40 animate-ping" />}
                  </span>

                  <span className="text-center text-xs font-semibold text-navy-900 dark:text-white">{node.label}</span>

                  {i < integrationFlow.length - 1 && (
                    <span className="hidden sm:block absolute left-[104%] top-1/2 h-0.5 w-[52%] -translate-y-1/2 overflow-visible">
                      <span className="flow-line" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Detail cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {integrationDetails.map((item, i) => (
            <DetailCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
