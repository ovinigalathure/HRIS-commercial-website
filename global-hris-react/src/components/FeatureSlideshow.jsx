import { ChevronRight, Sparkles, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useModal } from '../context/ModalContext';
import features from '../data/features';
import Icon from './Icon';

export default function FeatureSlideshow() {
  const { featureSlideshowOpen, closeFeatureSlideshow } = useModal();
  const dialogRef = useRef(null);

  const feature = features.find((f) => f.key === featureSlideshowOpen);
  const highlights = feature?.highlights ?? [];
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!featureSlideshowOpen) return undefined;
    setStepIndex(0);
  }, [featureSlideshowOpen]);

  useEffect(() => {
    if (!featureSlideshowOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') closeFeatureSlideshow();
      if (e.key === 'ArrowRight') goNext();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [featureSlideshowOpen, stepIndex]);

  if (!featureSlideshowOpen || !feature) return null;

  const isLast = stepIndex === highlights.length - 1;
  const currentHighlight = highlights[stepIndex];
  const currentIcon = feature.icons?.[stepIndex] ?? feature.icon;
  const progress = ((stepIndex + 1) / highlights.length) * 100;

  function goNext() {
    if (isLast) {
      closeFeatureSlideshow();
      return;
    }
    setStepIndex((i) => i + 1);
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${feature.label} features`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={closeFeatureSlideshow}
        className="absolute inset-0 bg-navy-950/85 backdrop-blur-sm animate-[fadeIn_.3s_ease]"
      />

      <div
        ref={dialogRef}
        tabIndex={-1}
        className="relative w-full max-w-2xl rounded-[2rem] overflow-hidden outline-none animate-[popupSlideUp_.5s_cubic-bezier(.22,.9,.32,1)]
                   bg-white dark:bg-navy-900 border border-slate-200 dark:border-white/10
                   shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] dark:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)]"
      >
        {/* Header */}
        <div className="relative px-7 pt-6 pb-5 border-b border-slate-100 dark:border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 text-white shadow-md shadow-electric-500/25">
                <Icon name={feature.icon} className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-navy-900 dark:text-white">
                  {feature.label}
                </h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">
                  {feature.tagline}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={closeFeatureSlideshow}
              aria-label="Close"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10 hover:text-slate-600 dark:hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-royal-600 via-electric-500 to-cyan-400 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Slide content */}
        <div className="px-7 sm:px-8 py-8 min-h-[260px] flex flex-col">
          {/* "What's New" label */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-royal-600/10 to-cyan-400/10 dark:from-royal-600/20 dark:to-cyan-400/20 text-royal-600 dark:text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              <span className="text-[11px] font-bold uppercase tracking-wider">What&apos;s New</span>
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
              {stepIndex + 1} of {highlights.length}
            </span>
          </div>

          {/* Feature highlight card */}
          <div
            key={`${feature.key}-${stepIndex}`}
            className="flex-1 flex flex-col items-center text-center animate-[slideInRight_.4s_cubic-bezier(.22,.9,.32,1)]"
          >
            {/* Icon */}
            <div className="mb-5">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 text-white shadow-lg shadow-electric-500/25">
                <Icon name={currentIcon} className="h-7 w-7" strokeWidth={1.5} />
              </span>
            </div>

            {/* Highlight text */}
            <p className="text-lg sm:text-xl font-semibold text-navy-900 dark:text-white leading-relaxed max-w-lg">
              {currentHighlight}
            </p>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="px-7 sm:px-8 pb-6 pt-2">
          <div className="flex items-center justify-between border-t border-slate-100 dark:border-white/5 pt-5">
            {/* Step dots */}
            <div className="flex items-center gap-2">
              {highlights.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setStepIndex(i)}
                  aria-label={`Go to step ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === stepIndex
                      ? 'h-2.5 w-7 bg-gradient-to-r from-royal-600 via-electric-500 to-cyan-400 shadow-md shadow-electric-500/30'
                      : i < stepIndex
                        ? 'h-2.5 w-2.5 bg-electric-500/40 dark:bg-cyan-400/40'
                        : 'h-2.5 w-2.5 bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20'
                  }`}
                />
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={closeFeatureSlideshow}
                className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold
                           text-slate-500 dark:text-slate-400
                           hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
              >
                Skip
              </button>
              <button
                type="button"
                onClick={goNext}
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white
                           bg-gradient-to-r from-royal-600 via-electric-500 to-cyan-400
                           shadow-[0_8px_24px_-6px_rgba(59,130,246,0.5)]
                           transition-all duration-300 hover:shadow-[0_12px_32px_-6px_rgba(59,130,246,0.6)] hover:-translate-y-0.5"
              >
                {isLast ? 'Done' : 'Next'}
                {!isLast && <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}