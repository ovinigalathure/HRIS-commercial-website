import { useEffect, useRef, useState } from 'react';

/**
 * Animates from 0 to `value` once it scrolls into view. Non-numeric
 * values (e.g. "Sub-Second") are rendered as-is, unanimated.
 */
export default function Counter({ value, suffix = '', duration = 1400, className = '' }) {
  const [display, setDisplay] = useState(typeof value === 'number' ? 0 : value);
  const ref = useRef(null);
  const done = useRef(false);

  useEffect(() => {
    if (typeof value !== 'number') return undefined;
    const el = ref.current;
    if (!el) return undefined;

    if (!('IntersectionObserver' in window)) {
      setDisplay(value);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true;
            const start = performance.now();
            const step = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - (1 - progress) ** 3;
              setDisplay(Math.round(eased * value));
              if (progress < 1) requestAnimationFrame(step);
              else setDisplay(value);
            };
            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
