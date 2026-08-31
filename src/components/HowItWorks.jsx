import { Mail } from 'lucide-react';
import { howItWorks } from '../data/content';
import { useModal } from '../context/ModalContext';
import Icon from './Icon';
import Reveal from './Reveal';

export default function HowItWorks() {
  const { openContact } = useModal();

  return (
    <section className="section-pad relative overflow-hidden section-tint dark:bg-navy-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl mx-auto text-center">
          <span className="eyebrow justify-center">Getting Started</span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">How Global HRIS works</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Four steps from a blank workspace to a fully automated HR operation.
          </p>
        </Reveal>

        <div className="mt-16 relative">
          {/* connecting line */}
          <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-electric-400/50 to-transparent" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {howItWorks.map((step, i) => (
              <Reveal key={step.step} delay={i * 120} className="relative text-center">
                <div className="mx-auto relative z-10 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 text-white shadow-lg shadow-electric-500/25">
                  <Icon name={step.icon} className="h-6 w-6" />
                </div>
                <span className="block mt-4 font-display text-xs font-bold tracking-[0.2em] text-electric-500 dark:text-cyan-300">
                  STEP {step.step}
                </span>
                <h3 className="mt-1.5 font-display text-lg font-bold text-navy-900 dark:text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{step.body}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <button type="button" onClick={openContact} className="btn-primary">
              <Mail className="h-4 w-4" /> Connect With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
