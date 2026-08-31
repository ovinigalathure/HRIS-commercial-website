import logoImg from '../assets/images/logo.jpg';

/**
 * Site logomark. Uses the supplied Global Exceed brand logo image
 * alongside the "Global HRIS" product wordmark.
 */
export default function Logo({ className = '', showWordmark = true, size = 36 }) {
  return (
    <a href="#top" className={`flex items-center gap-2.5 shrink-0 group ${className}`} aria-label="Global HRIS — home">
      <span
        className="overflow-hidden rounded-xl ring-1 ring-white/40 dark:ring-white/10 shadow-md shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <img src={logoImg} alt="Global Exceed logo" className="h-full w-full object-cover" />
      </span>
      {showWordmark && (
        <span className="font-display font-bold text-lg tracking-tight text-navy-900 dark:text-white">
          Global<span className="text-gradient">HRIS</span>
        </span>
      )}
    </a>
  );
}
