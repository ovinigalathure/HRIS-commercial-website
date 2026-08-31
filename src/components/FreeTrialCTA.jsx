import { ArrowRight, CalendarCheck } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import { contact } from '../data/content';
import Reveal from './Reveal';

export default function FreeTrialCTA() {
  const { openTrial } = useModal();

  return (
    <section className="relative px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy-950 via-royal-600 to-navy-900 px-8 py-16 sm:px-16 sm:py-20 text-center">
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-400/30 blur-[100px]" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-accent-500/25 blur-[100px]" />
            <div className="glass-cta absolute inset-0 -z-0" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-cyan-300">
                Free Trial
              </span>
              <h2 className="mt-6 font-display text-3xl sm:text-4xl font-bold text-white max-w-2xl mx-auto">
                Try Global HRIS free — no commitment required
              </h2>
              <p className="mt-4 text-base text-slate-300 max-w-xl mx-auto">
                Experience the full platform with your own workspace. Our team will have you set up in minutes.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <button type="button" onClick={openTrial} className="btn-orange">
                  Start Free Trial <ArrowRight className="h-4 w-4" />
                </button>
                <a href={`mailto:${contact.salesEmail}`} className="btn-secondary !bg-white/10 !border-white/20 !text-white">
                  <CalendarCheck className="h-4 w-4" /> Book a Demo
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
