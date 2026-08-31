import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { nav, contact } from '../data/content';
import { useModal } from '../context/ModalContext';
import Logo from './Logo';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openTrial } = useModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMobileOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <header id="top" className={`sticky top-0 z-40 glass-nav transition-shadow duration-300 ${scrolled ? 'glass-nav-scrolled' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center gap-6 py-3">
          <Logo />

          <nav className="hidden lg:flex items-center gap-1 ml-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-slate-300
                           hover:text-navy-900 dark:hover:text-white hover:bg-slate-900/5 dark:hover:bg-white/5
                           transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto hidden lg:flex items-center gap-3">
            <a
              href={contact.phoneHref}
              className="hidden xl:flex items-center text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-electric-500 transition-colors"
            >
              {contact.phoneDisplay}
            </a>
            <button type="button" onClick={openTrial} className="btn-primary">
              Start Free Trial
            </button>
            <ThemeToggle />
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full glass"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-400 ease-out ${
          mobileOpen ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-strong mx-4 mb-4 rounded-2xl px-2 py-3">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-900/5 dark:hover:bg-white/5 transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={contact.phoneHref}
            className="flex items-center px-4 py-3 text-sm font-medium text-slate-600 dark:text-slate-300"
          >
            {contact.phoneDisplay}
          </a>
          <div className="px-2 pt-2">
            <button
              type="button"
              onClick={() => {
                handleNavClick();
                openTrial();
              }}
              className="btn-primary w-full"
            >
              Start Free Trial
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
