import { ArrowLeft, ArrowRight, Building2, ChevronLeft, ChevronRight, Hospital, Home, Quote, Shirt, Coffee, Truck } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

import apparelImg from '../assets/images/apparel and garment.jpg';
import teaImg from '../assets/images/Tea Plantations & Agriculture.jpg';
import hospitalImg from '../assets/images/Hospitals & Healthcare.jpg';
import constructionImg from '../assets/images/Construction & Engineering.jpg';
import officeImg from '../assets/images/Corporate Offices.jpg';
import logisticsImg from '../assets/images/Logistics & Manufacturing.jpg';

const industries = [
  {
    name: 'Apparel & Garment',
    headline: 'Factory workforces, reimagined',
    tagline: 'Manage multi-site factory staff, attendance and payroll at scale.',
    image: apparelImg,
    icon: Shirt,
  },
  {
    name: 'Tea Plantations & Agriculture',
    headline: 'Estate staff, effortlessly organised',
    tagline: 'Track field and estate workers with flexible shift and seasonal rosters.',
    image: teaImg,
    icon: Coffee,
  },
  {
    name: 'Hospitals & Healthcare',
    headline: 'Care teams, always covered',
    tagline: 'Keep nurses, doctors and support teams scheduled around the clock.',
    image: hospitalImg,
    icon: Hospital,
  },
  {
    name: 'Construction & Engineering',
    headline: 'Project crews, on every site',
    tagline: 'Manage project-based crews across multiple locations with ease.',
    image: constructionImg,
    icon: Building2,
  },
  {
    name: 'Corporate Offices',
    headline: 'People operations, simplified',
    tagline: 'Simplify leave, reports and people operations for your head office.',
    image: officeImg,
    icon: Home,
  },
  {
    name: 'Logistics & Manufacturing',
    headline: 'Shift operations, powered up',
    tagline: 'Power shift-based operations with accurate time and attendance.',
    image: logisticsImg,
    icon: Truck,
  },
];

const AUTOPLAY_MS = 6000;

export default function IndustrySlideshow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((current) => (current + 1) % industries.length);
    }, AUTOPLAY_MS);
  }, []);

  useEffect(() => {
    if (!paused) startTimer();
    return () => clearInterval(timerRef.current);
  }, [paused, startTimer]);

  const go = (index) => {
    setActive((index + industries.length) % industries.length);
    startTimer();
  };

  const getPrevIndex = () => (active - 1 + industries.length) % industries.length;
  const getNextIndex = () => (active + 1) % industries.length;

  const currentIndustry = industries[active];

  return (
    <section className="section-pad relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-electric-500/15 blur-[130px]" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-400/15 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow justify-center">Industries We Serve</span>
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
            <span className="text-gradient-topic">One platform.<br className="sm:hidden" /> Every industry</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
            Global HRIS adapts to how your organisation really works — from factory floors to hospital wards.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-16">
          <div
            className="relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Main Carousel with Side Previews */}
            <div className="relative flex items-center justify-center gap-3 md:gap-6 lg:gap-8">
              {/* Left Navigation & Preview */}
              <div className="hidden flex-col items-center gap-4 lg:flex">
                <button
                  type="button"
                  onClick={() => go(getPrevIndex())}
                  aria-label="Previous industry"
                  className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-all hover:border-electric-400 hover:bg-gradient-to-br hover:from-electric-500/10 hover:to-cyan-400/10 hover:text-electric-500 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
                </button>
                
                {/* Left Preview Thumbnail */}
                <div className="relative h-40 w-32 overflow-hidden rounded-xl border-2 border-slate-200 dark:border-white/10 shadow-lg opacity-50 hover:opacity-75 transition-opacity cursor-pointer" 
                  onClick={() => go(getPrevIndex())}>
                  <img
                    src={industries[getPrevIndex()].image}
                    alt={industries[getPrevIndex()].name}
                    className="h-full w-full object-cover scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
              </div>

              {/* Center Main Carousel */}
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_40px_100px_-30px_rgba(15,42,90,0.6)] dark:shadow-[0_40px_100px_-30px_rgba(0,0,0,0.8)]">
                  {/* Decorative Frame Borders */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Top border accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-electric-500/0 via-electric-500/50 to-electric-500/0" />
                    {/* Bottom border accent */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-cyan-400/0" />
                    {/* Corner accents */}
                    <div className="absolute top-4 left-4 h-6 w-6 border-t-2 border-l-2 border-electric-500/30" />
                    <div className="absolute top-4 right-4 h-6 w-6 border-t-2 border-r-2 border-cyan-400/30" />
                    <div className="absolute bottom-4 left-4 h-6 w-6 border-b-2 border-l-2 border-cyan-400/30" />
                    <div className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-electric-500/30" />
                  </div>

                  {/* Carousel Images */}
                  <div className="relative h-56 sm:h-64 md:h-72 lg:h-80 overflow-hidden">
                    {industries.map((industry, index) => (
                      <div
                        key={industry.name}
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{ opacity: active === index ? 1 : 0 }}
                      >
                        <img
                          src={industry.image}
                          alt={industry.name}
                          className="h-full w-full object-cover"
                          loading={index === 0 ? 'eager' : 'lazy'}
                        />
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/60 via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12">
                    <div className="max-w-2xl">
                      <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md mb-4">
                        <currentIndustry.icon className="h-4 w-4 text-cyan-300" />
                        {currentIndustry.name}
                      </div>

                      <h3
                        className="font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white"
                        style={{
                          opacity: 1,
                          transform: 'translateY(0)',
                          transition: 'opacity .6s ease .15s, transform .6s ease .15s'
                        }}
                      >
                        {currentIndustry.headline}
                      </h3>

                      <p
                        className="mt-3 max-w-xl text-sm md:text-base leading-relaxed text-slate-200"
                        style={{
                          opacity: 1,
                          transform: 'translateY(0)',
                          transition: 'opacity .6s ease .25s, transform .6s ease .25s'
                        }}
                      >
                        {currentIndustry.tagline}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Navigation & Preview */}
              <div className="hidden flex-col items-center gap-4 lg:flex">
                {/* Right Preview Thumbnail */}
                <div className="relative h-40 w-32 overflow-hidden rounded-xl border-2 border-slate-200 dark:border-white/10 shadow-lg opacity-50 hover:opacity-75 transition-opacity cursor-pointer"
                  onClick={() => go(getNextIndex())}>
                  <img
                    src={industries[getNextIndex()].image}
                    alt={industries[getNextIndex()].name}
                    className="h-full w-full object-cover scale-110"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>

                <button
                  type="button"
                  onClick={() => go(getNextIndex())}
                  aria-label="Next industry"
                  className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-all hover:border-electric-400 hover:bg-gradient-to-br hover:from-electric-500/10 hover:to-cyan-400/10 hover:text-electric-500 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* Mobile Navigation & Indicators */}
            <div className="mt-8 flex flex-col items-center gap-6">
              {/* Progress Bar */}
              <div className="w-full max-w-md">
                <div className="h-1.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-electric-500 to-cyan-400 transition-all duration-500"
                    style={{ width: `${((active + 1) / industries.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Industry Selector Grid */}
              <div className="w-full">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
                  {industries.map((industry, index) => (
                    <button
                      key={industry.name}
                      type="button"
                      onClick={() => go(index)}
                      className={`group relative flex flex-col items-center gap-2 overflow-hidden rounded-lg border transition-all duration-300 ${
                        active === index
                          ? 'border-electric-500/60 bg-electric-500/10 shadow-[0_8px_24px_-8px_rgba(59,130,246,0.4)]'
                          : 'border-slate-200 bg-white/40 hover:border-electric-400 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10'
                      }`}
                    >
                      <span
                        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold transition-colors ${
                          active === index ? 'bg-electric-500 text-white' : 'bg-slate-200/50 text-slate-600 dark:bg-white/10 dark:text-slate-400'
                        }`}
                      >
                        <industry.icon className="h-3.5 w-3.5" />
                      </span>
                      <span className={`hidden text-[0.65rem] font-semibold leading-tight text-center line-clamp-2 transition-colors lg:inline ${
                        active === index ? 'text-electric-600 dark:text-cyan-300' : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {industry.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Navigation Controls */}
              <div className="flex items-center gap-3 lg:hidden">
                <button
                  type="button"
                  onClick={() => go(getPrevIndex())}
                  aria-label="Previous industry"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:border-electric-400 hover:text-electric-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex flex-col items-center">
                  <span className="font-display text-sm font-bold text-navy-900 dark:text-white">
                    {String(active + 1).padStart(2, '0')}
                  </span>
                  <span className="text-xs text-slate-400">/{String(industries.length).padStart(2, '0')}</span>
                </div>
                <button
                  type="button"
                  onClick={() => go(getNextIndex())}
                  aria-label="Next industry"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-all hover:border-electric-400 hover:text-electric-500 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
