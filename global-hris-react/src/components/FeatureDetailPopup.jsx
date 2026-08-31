import { Sparkles, X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';
import features from '../data/features';
import Icon from './Icon';

export default function FeatureDetailPopup() {
  const { featureDetailOpen, closeFeatureDetail, openFeatureSlideshow } = useModal();
  const dialogRef = useRef(null);

  const feature = features.find((f) => f.key === featureDetailOpen);

  useEffect(() => {
    if (!featureDetailOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeFeatureDetail();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [featureDetailOpen, closeFeatureDetail]);

  if (!featureDetailOpen || !feature) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={feature.label}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={closeFeatureDetail}
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm animate-[fadeIn_.3s_ease]"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-lg rounded-[2rem] overflow-hidden outline-none animate-[popupSlideUp_.5s_cubic-bezier(.22,.9,.32,1)]
                   bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10
                   shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        {/* Hero gradient header */}
        <div className="relative h-48 bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 overflow-hidden">
          {/* Animated background orbs */}
          <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-white/10 blur-2xl animate-[float-slow_6s_ease-in-out_infinite]" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl animate-[float-slow_7s_ease-in-out_infinite_1s]" />

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 grid-pattern opacity-20" />

          <button
            type="button"
            onClick={closeFeatureDetail}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/30 backdrop-blur-sm transition-colors"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-6">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md shadow-lg animate-[iconPulse_3s_ease-in-out_infinite]">
              <Icon name={feature.icon} className="h-8 w-8" strokeWidth={1.5} />
            </span>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
              {feature.label}
            </h3>
            <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-semibold uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              {feature.tagline}
            </span>
          </div>
        </div>

        {/* Content body */}
        <div className="p-7 sm:p-8">
          <p className="text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            {feature.description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                closeFeatureDetail();
                setTimeout(() => openFeatureSlideshow(feature.key), 200);
              }}
              className="group relative flex-1 inline-flex items-center justify-center gap-2 rounded-2xl font-semibold
                         px-6 py-4 text-sm text-white overflow-hidden
                         bg-gradient-to-r from-royal-600 via-electric-500 to-cyan-400
                         shadow-[0_10px_30px_-8px_rgba(59,130,246,0.55)]
                         transition-all duration-300 hover:shadow-[0_20px_50px_-8px_rgba(59,130,246,0.65)] hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-electric-500 to-royal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Sparkles className="h-4 w-4 relative z-10" />
              <span className="relative z-10">Explore All Features</span>
            </button>
            <button
              type="button"
              onClick={closeFeatureDetail}
              className="inline-flex items-center justify-center rounded-2xl font-semibold
                         px-6 py-4 text-sm
                         text-slate-600 dark:text-slate-300
                         bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10
                         hover:bg-slate-200 dark:hover:bg-white/10 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}