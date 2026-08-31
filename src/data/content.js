// ============================================================
// Global site content — edit here to update copy across the site.
// Sourced from the approved Global HRIS marketing content and the
// Global HRIS & Payroll Management System feature specification.
// ============================================================

import officeImg from '../assets/images/office.jpg';
import logisticsImg from '../assets/images/logistics.jpg';
import teaImg from '../assets/images/tea.jpg';
import constructionImg from '../assets/images/construction.jpg';
import apparelImg from '../assets/images/apparel.jpg';
import hospitalImg from '../assets/images/hospital.jpg';

export const brand = {
  name: 'Global HRIS',
  company: 'Global Exceed Pvt Ltd',
  tagline: 'One Workforce Engine. Unlimited Global Scale.',
};

export const contact = {
  salesEmail: 'sales@globalhris.com',
  companyEmail: 'charith@globalexceed.com',
  phoneHref: 'tel:+94768572112',
  phoneDisplay: '+94 (76) 857 2112',
  whatsappHref: 'https://wa.me/94768572112',
  siteUrl: 'global-hris.com',
  companyUrl: 'globalexceed.com',
};

export const nav = [
  { label: 'Product', href: '#product' },
  { label: 'Features', href: '#features' },
  { label: 'Security', href: '#security' },
  { label: 'Videos', href: '#videos' },
  { label: 'FAQ', href: '#faq' },
];

export const hero = {
  eyebrow: 'Global Workforce Platform',
  headline: 'One Workforce Engine. Unlimited Global Scale.',
  subline: 'Configure Any Industry. Automate Any Shift. Master Any Jurisdiction.',
  body: 'Break free from rigid legacy HR systems and complex global software. Global HRIS is the self-configurable, cloud-native workforce platform engineered to automate complex shifts, deep statutory compliance, biometric time tracking, and floor operations across any market—all from a single, unified interface.',
  trustLine: ['Complete HR Management', 'Payroll & Attendance', 'Real-Time Workforce Visibility',],
};

export const trustStrip = [
  {
    icon: 'Zap',
    title: '100% Configurable',
    body: 'Tailor shifts, pay rules, and approval workflows without writing a single line of code.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Enterprise-Grade Security',
    body: 'JWT authentication with refresh-token rotation, BCrypt password hashing, and role-based data masking.',
  },
  {
    icon: 'Globe2',
    title: 'Multi-Tenant & Multi-Site',
    body: 'Effortlessly manage regional branches, subsidiaries, companies and sites from one account.',
  },
  {
    icon: 'Factory',
    title: 'Proven at Scale',
    body: 'Built for complex manufacturing and enterprise environments — from head office to the factory floor.',
  },
];

export const productOverview = {
  eyebrow: 'The Platform',
  title: 'Every HR operation, one connected ecosystem',
  body: "Global HRIS centralizes the workforce operations that usually live across five different tools — employee records, attendance, leave, payroll and reporting — into one secure, role-aware platform. Configure it once for your organization's structure, pay rules and compliance needs, then let it run.",
  pillars: [
    { icon: 'Users', label: 'Employee Management', featureKey: 'workforce', image: officeImg },
    { icon: 'Fingerprint', label: 'Attendance', featureKey: 'attendance', image: hospitalImg },
    { icon: 'CalendarClock', label: 'Leave', featureKey: 'leave', image: teaImg },
    { icon: 'Wallet', label: 'Payroll', featureKey: 'payroll', image: officeImg },
    { icon: 'FileText', label: 'Payslips', featureKey: 'payslip', image: apparelImg },
    { icon: 'BarChart3', label: 'Reporting', featureKey: 'reports', image: logisticsImg },
    { icon: 'Eye', label: 'Workforce Visibility', featureKey: 'visibility', image: constructionImg },
    { icon: 'Lock', label: 'Security', featureKey: 'security', image: hospitalImg },
  ],
};

export const painPoints = [
  {
    icon: 'Clock',
    challenge: 'Complex Shift Rotations & Night Shifts',
    legacy: 'Crashes on cross-midnight punches; needs manual correction.',
    saas: 'Expects fixed 9-to-5 schedules; no granular floor shift rules.',
    solutionTitle: '24/7 Automated Shift Engine',
    solution: 'Handles pre-shift OT, grace periods, and cross-midnight crossovers automatically, with configurable day-type rules for every shift pattern.',
  },
  {
    icon: 'Scale',
    challenge: 'Localized Legal & Statutory Rules',
    legacy: 'Expensive custom coding for every regional rule change.',
    saas: 'Ignores local statutory frameworks and regional tax slabs.',
    solutionTitle: 'Native Compliance Engine',
    solution: 'Pre-configured legal profiles with automatic EPF, ETF and APIT calculation, and fully configurable statutory tax slabs.',
  },
  {
    icon: 'Utensils',
    challenge: 'Floor & Operational Leakages',
    legacy: 'No connection to canteen meals, floor output, or worker kiosks.',
    saas: 'Requires buying separate third-party apps for basic floor tasks.',
    solutionTitle: 'Unified Operational Tools',
    solution: 'Built-in barcode meal management with daily cut-offs, production-line workforce tracking, and biometric worker terminals.',
  },
  {
    icon: 'Languages',
    challenge: 'Language & Accessibility Barriers',
    legacy: 'Single-language UI causing errors for non-desk workforce.',
    saas: 'English-only interfaces that alienate factory floor managers.',
    solutionTitle: 'Trilingual by Design',
    solution: 'Password-protected payslips generated natively in English, Sinhala, and Tamil — delivered by email or printed at kiosks.',
  },
];

export const whyUs = [
  {
    icon: 'SlidersHorizontal',
    image: officeImg,
    title: 'Extreme Self-Customization',
    body: 'Stop adapting your business to your software. Global HRIS gives administrators total control over allowance rules, day-types (WRK, SAT, SUN, POY, STHL, CHL), late penalty thresholds, dynamic approval workflows, and master data configurations without hiring developers.',
  },
  {
    icon: 'Eye',
    image: logisticsImg,
    title: 'Complete Workforce Visibility\u200B (From Desk to Floor)',
    body: 'Whether you manage white-collar executives in corporate suites, factory operators on production lines, or remote global contractors, Global HRIS unifies your entire workforce under one dashboard with real-time presence monitoring and live punch sync.',
  },
  {
    icon: 'Calculator',
    image: teaImg,
    title: 'Zero-Variance Statutory & Payroll Automation',
    body: 'Run multi-currency or localized payrolls in minutes with absolute mathematical accuracy. Automate complex additions, deductions, coin brought-forward cash rounding, stamp duties, and direct bank/ERP journal exports.',
  },
  {
    icon: 'Network',
    image: constructionImg,
    title: 'Hardware-Agnostic Biometric & Kiosk Integration',
    body: 'Connect any hardware device seamlessly. Direct API/TCP-IP synchronization supports Hikvision, ZKTeco, and Dahua biometric terminals, ruggedized floor kiosks, mobile camera barcode scanners, and tablet access.',
  },
  {
    icon: 'ScrollText',
    image: apparelImg,
    title: 'Social Compliance & Audit Readiness',
    body: 'Built for enterprises facing strict international buyer standards (WRAP, Sedex, BSCI, ISO). Every attendance edit, approval override, and payroll modification is logged with an immutable audit trail showing "Before vs. After" values, user IDs, and timestamps.',
  },
];

export const howItWorks = [
  {
    step: '01',
    icon: 'Building2',
    title: 'Set Up Your Organization',
    body: 'Configure companies, sites, departments, designations, pay schemes and branding to match your structure.',
  },
  {
    step: '02',
    icon: 'UsersRound',
    title: 'Connect Your Workforce',
    body: 'Onboard employees through the 6-step wizard with NIC/OCR auto-fill, or bulk-import your existing records.',
  },
  {
    step: '03',
    icon: 'Cpu',
    title: 'Automate HR Operations',
    body: 'Attendance, leave approvals, payroll runs and payslip delivery flow through configurable, self-running rules.',
  },
  {
    step: '04',
    icon: 'LineChart',
    title: 'Make Better Decisions',
    body: 'Role-aware dashboards and exportable reports turn workforce data into decisions — instantly.',
  },
];

export const securityFeatures = [
  { icon: 'KeyRound', title: 'JWT Authentication', body: 'Secure bearer-token login with automatic refresh-token rotation and session expiry.' },
  { icon: 'Lock', title: 'BCrypt Password Hashing', body: 'Industry-standard password hashing — credentials are never stored in plain text.' },
  { icon: 'EyeOff', title: 'Sensitive Data Masking', body: 'Salaries, NIC numbers, bank details and emails are masked by default and revealed only to authorized roles.' },
  { icon: 'ShieldAlert', title: 'Login Protection', body: 'Failed-login tracking, temporary lockouts and rate limiting protect every sensitive endpoint.' },
  { icon: 'ScrollText', title: 'Immutable Audit Trail', body: 'Every attendance edit, approval override and payroll change is logged with before/after values, user ID and timestamp.' },
  { icon: 'Users2', title: 'Role-Based Access Control', body: 'Five built-in roles — SuperAdmin, Admin, HR Manager, Supervisor and Employee — each scoped to exactly what they need to see.' },
];

export const integrationFlow = [
  { icon: 'Fingerprint', label: 'Biometric Device' },
  { icon: 'Server', label: 'Global HRIS' },
  { icon: 'CalendarCheck2', label: 'Attendance' },
  { icon: 'Wallet', label: 'Payroll' },
  { icon: 'FileBarChart', label: 'Reports' },
];

export const integrationDetails = [
  { icon: 'Fingerprint', title: 'Biometric Attendance', body: 'Direct API/TCP-IP synchronization with Hikvision biometric terminals, with real-time punch sync back into the attendance engine.' },
  { icon: 'ScanLine', title: 'Barcode & Kiosk Scanning', body: 'Mobile-camera and hardware barcode scanning power worker kiosks and the canteen meal-management module.' },
  { icon: 'Network', title: 'ERP / MES Integration', body: 'Clean RESTful API endpoints synchronize workforce and production data with SAP, Oracle, Microsoft Dynamics or custom MES systems.' },
  { icon: 'ScanFace', title: 'NIC / OCR Scanning', body: 'Employee registration auto-fills from a scanned NIC using built-in OCR, with an optional AI-enhanced mode for legacy handwritten cards.' },
];

export const finalCta = {
  title: 'Ready to Transform Your Workforce Operations?',
  body: 'Join manufacturers, corporate enterprises and growing businesses running payroll and attendance with zero errors and total floor compliance.',
};