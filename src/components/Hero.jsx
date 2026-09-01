import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarClock,
  CheckCircle2,
  Factory,
  FileText,
  PlayCircle,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { hero } from '../data/content';
import { useModal } from '../context/ModalContext';
import DashboardMock from './DashboardMock';
import Reveal from './Reveal';
import homePreviewImg from '../assets/images/Home Page Hero Image.png';
import manufacturingHero from '../assets/images/Manufacturing_Hero.jpg';
import constructionHero from '../assets/images/Construction_Hero.jpg';
import corporateHero from '../assets/images/Cooperate_Hero.jpg';
import healthcareHero from '../assets/images/Healthcare_Hero.jpg';
import hospitalityHero from '../assets/images/Hospitality_Hero.jpg';
import retailHero from '../assets/images/Retail_Hero.jpg';

const heroFeatures = [
  { icon: Users, label: 'Employee Management' },
  { icon: CalendarClock, label: 'Attendance & Leave' },
  { icon: BriefcaseBusiness, label: 'Payroll & Benefits' },
  { icon: FileText, label: 'Reports & Analytics' },
  { icon: ShieldCheck, label: 'Secure & Compliant' },
];

const industries = [
  { name: 'Corporate', image: corporateHero, icon: BriefcaseBusiness },
  { name: 'Manufacturing', image: manufacturingHero, icon: Factory },
  { name: 'Healthcare', image: healthcareHero, icon: CheckCircle2 },
  { name: 'Retail', image: retailHero, icon: Building2 },
  { name: 'Hospitality', image: hospitalityHero, icon: BadgeCheck },
  { name: 'Construction', image: constructionHero, icon: Factory },
];

export default function Hero() {
  const { openTrial, openDemo } = useModal();

  return (
    <section id="product" className="relative overflow-hidden pb-10 pt-6 md:pb-12 md:pt-8 lg:pb-14 lg:pt-10">
      <div className="absolute inset-0 -z-10 grid-pattern [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute -z-10 -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-electric-500/20 blur-[120px]" />
      <div className="absolute -z-10 top-1/3 -left-40 h-[30rem] w-[30rem] rounded-full bg-cyan-400/15 blur-[120px]" />
      <div className="absolute -z-10 bottom-0 right-1/4 h-[26rem] w-[26rem] rounded-full bg-accent-500/10 blur-[110px]" />

      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-6 lg:grid-cols-[0.92fr_1.12fr] xl:gap-8">
          <Reveal className="order-2 lg:order-1">
            <span className="eyebrow mb-4 px-3 py-1.5 text-[10px] tracking-[0.12em]">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 pulse-dot" />
              {hero.eyebrow}
            </span>

            <h1 className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-navy-900 dark:text-white sm:text-4xl xl:text-5xl">
              {hero.headline}
            </h1>

            <p className="mt-5 max-w-xl text-lg font-semibold text-navy-800 dark:text-slate-200">
              {hero.subline}
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
              {hero.body}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button type="button" onClick={openTrial} className="btn-primary">
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </button>
              <button type="button" onClick={openDemo} className="btn-secondary">
                <PlayCircle className="h-4 w-4" /> Book a Demo
              </button>
            </div>

            <div className="mt-7 grid max-w-[640px] grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {heroFeatures.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/80 p-3 text-center shadow-[0_12px_30px_-18px_rgba(37,99,235,0.35)] backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-white/[0.04]">
                  <div className="mb-2.5 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-royal-600 to-electric-500 text-white shadow-[0_10px_24px_-12px_rgba(37,99,235,0.85)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-semibold leading-tight text-navy-900 dark:text-white sm:text-[12px]">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal variant="scale" delay={150} className="relative order-1 lg:order-2 lg:pl-6">
            <DashboardMock image={homePreviewImg} className="mx-auto max-w-[760px]" />
          </Reveal>
        </div>

        <div className="mt-20 md:mt-28">
          <div className="mb-8 flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-navy-900 dark:text-white sm:text-4xl">
              One Solution. <span className="text-gradient">Every Industry.</span>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
            {industries.map(({ name, image, icon: Icon }) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_16px_30px_-20px_rgba(13,23,48,0.3)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-20px_rgba(36,81,227,0.28)] dark:border-white/10 dark:bg-white/[0.04]"
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 via-navy-950/30 to-transparent" />
                </div>
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-royal-600 shadow-md dark:bg-white/10 dark:text-cyan-300">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="text-lg font-semibold text-white">{name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
