import { ArrowRight, CalendarCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useModal } from '../context/ModalContext';
import Reveal from './Reveal';
import officeImg from '../assets/images/office.jpg';

const perks = ['No credit card required', 'Personalized workspace', 'Setup in minutes'];

export default function FreeTrialCTA() {
  const { openTrial, openDemo } = useModal();

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal variant="scale">
          <div className="relative overflow-hidden rounded-[2.5rem]">
            {/* Full-bleed background image */}
            <img
              src={officeImg}
              alt="Begin your free trial with Global HRIS"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark gradient overlays for legibility */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-950/80 via-navy-900/45 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-navy-950/20" />

            {/* Ambient accent glows */}
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/25 blur-[100px]" />
            <div className="absolute -bottom-24 right-1/3 h-72 w-72 rounded-full bg-accent-500/20 blur-[100px]" />
            <div className="pointer-events-none absolute inset-0 grid-pattern opacity-15 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent)]" />

            <div className="relative grid items-end px-8 py-14 sm:px-12 sm:py-16 md:grid-cols-[1.3fr_0.7fr] md:py-20 lg:px-16">
              {/* Glass content card */}
              <div className="rounded-3xl bg-white/10 p-7 backdrop-blur-md ring-1 ring-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)] sm:p-9 md:max-w-xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase text-cyan-300 ring-1 ring-white/15">
                  <Sparkles className="h-3.5 w-3.5" /> Free Trial
                </span>

                <h2 className="mt-5 font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                  Try Global HRIS free — no commitment required
                </h2>

                <p className="mt-4 text-base text-slate-200 max-w-lg">
                  Experience the full platform with your own workspace. Our team will have you set up in minutes.
                </p>

                <ul className="mt-6 flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-2 text-sm text-slate-100">
                  {perks.map((perk) => (
                    <li key={perk} className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-cyan-300" /> {perk}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button type="button" onClick={openTrial} className="btn-orange">
                    Start Free Trial <ArrowRight className="h-4 w-4" />
                  </button>
                  <button type="button" onClick={openDemo} className="btn-secondary !bg-white/10 !border-white/20 !text-white">
                    <CalendarCheck className="h-4 w-4" /> Book a Demo
                  </button>
                </div>
              </div>

              {/* Floating accent stat (side) */}
              <div className="float-slow-delay hidden md:block justify-self-end" style={{ '--rot': '3deg' }}>
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur-md ring-1 ring-white/20 shadow-xl">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 to-electric-500 text-white">
                    <Sparkles className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-display text-xl font-bold leading-none text-white">14 days</p>
                    <p className="mt-1 text-xs text-slate-200">full access, on us</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
