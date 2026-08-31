import { Globe2, Mail, Phone } from 'lucide-react';
import { brand, contact, nav } from '../data/content';
import Logo from './Logo';
import logoImg from '../assets/images/logo.jpg';

const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Product Videos', href: '#videos' },
  { label: 'Security', href: '#security' },
  { label: 'FAQ', href: '#faq' },
];

const solutionLinks = [
  { label: 'HR Management', href: '#product' },
  { label: 'Payroll', href: '#features' },
  { label: 'Attendance', href: '#features' },
  { label: 'Workforce Management', href: '#product' },
];

export default function Footer() {
  const year = 2026;

  return (
    <footer className="relative bg-white dark:bg-navy-950 text-slate-500 dark:text-slate-400 overflow-hidden">
      <div className="absolute inset-0 section-tint dark:hidden" />
      <div className="absolute inset-0 grid-pattern opacity-15 dark:opacity-30 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12">
          <div>
            <Logo showWordmark={false} className="mb-1" />
            <p className="font-display text-lg font-bold text-navy-900 dark:text-white mt-3">
              Global<span className="text-gradient">HRIS</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed max-w-xs">
              A self-configurable, cloud-native workforce platform bringing employee management, attendance, leave,
              payroll and reporting into one secure system.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <img src={logoImg} alt="Global Exceed" className="h-9 w-9 rounded-lg object-cover ring-1 ring-black/10 dark:ring-white/10" />
              <p className="text-xs text-slate-500 dark:text-slate-500">
                A product of<br /><span className="text-navy-900 dark:text-slate-300 font-medium">{brand.company}</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-navy-900 dark:text-white mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((l) => (
                <li key={l.label}><a href={l.href} className="text-sm hover:text-electric-600 dark:hover:text-cyan-300 transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-navy-900 dark:text-white mb-4">Solutions</h4>
            <ul className="space-y-3">
              {solutionLinks.map((l) => (
                <li key={l.label}><a href={l.href} className="text-sm hover:text-electric-600 dark:hover:text-cyan-300 transition-colors">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-navy-900 dark:text-white mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${contact.salesEmail}`} className="flex items-center gap-2.5 text-sm hover:text-electric-600 dark:hover:text-cyan-300 transition-colors">
                  <Mail className="h-4 w-4 shrink-0" /> {contact.salesEmail}
                </a>
              </li>
              <li>
                <a href={contact.phoneHref} className="flex items-center gap-2.5 text-sm hover:text-electric-600 dark:hover:text-cyan-300 transition-colors">
                  <Phone className="h-4 w-4 shrink-0" /> {contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`https://${contact.siteUrl}`} className="flex items-center gap-2.5 text-sm hover:text-electric-600 dark:hover:text-cyan-300 transition-colors">
                  <Globe2 className="h-4 w-4 shrink-0" /> {contact.siteUrl}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-900/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-500 text-center sm:text-left">
            &copy; {year} {brand.company}. All Rights Reserved. Powered by Angular 17 &amp; .NET 8.
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-slate-500 dark:text-slate-500">
            <a href="#top" className="hover:text-electric-600 dark:hover:text-cyan-300 transition-colors">Privacy Policy</a>
            <a href="#top" className="hover:text-electric-600 dark:hover:text-cyan-300 transition-colors">Terms</a>
            {nav.slice(0, 2).map((n) => (
              <a key={n.href} href={n.href} className="hover:text-electric-600 dark:hover:text-cyan-300 transition-colors">{n.label}</a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
