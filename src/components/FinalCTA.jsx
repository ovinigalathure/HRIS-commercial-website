import { ArrowRight, CalendarCheck } from 'lucide-react';
import { finalCta } from '../data/content';
import { useModal } from '../context/ModalContext';
import Reveal from './Reveal';

export default function FinalCTA() {
  const { openTrial, openDemo } = useModal();

  return (
    <section id="contact" className="section-pad relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 dark:text-white">{finalCta.title}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-xl mx-auto">{finalCta.body}</p>

          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <button type="button" onClick={openTrial} className="btn-primary">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" onClick={openDemo} className="btn-secondary">
              <CalendarCheck className="h-4 w-4" /> Book a Demo
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
