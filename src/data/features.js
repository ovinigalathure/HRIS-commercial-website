// ============================================================
// Feature categories for the Interactive Feature Showcase.
// Sourced from the Global HRIS & Payroll Management System
// feature specification (Functional Module Summary, sections 1-22).
// ============================================================

import employeeManagementImg from '../assets/images/employee-management.jpg';
import attendanceImg from '../assets/images/attendance.jpg';
import leaveImg from '../assets/images/leave.jpg';
import payrollImg from '../assets/images/payroll.jpg';
import payslipImg from '../assets/images/payslip.png';
import reportingImg from '../assets/images/reporting.jpg';
import workforceVisibilityImg from '../assets/images/workforce visibility.jpg';
import securityImg from '../assets/images/security.jpg';

const features = [
  {
    key: 'workforce',
    icon: 'Users',
    image: employeeManagementImg,
    label: 'Workforce Management',
    tagline: 'Employee Master & Onboarding',
    description:
      'A complete employee master with a guided 6-step registration wizard, OCR-assisted onboarding, skills matrix mapping and full lifecycle tracking — from hire to rejoin.',
    metric: { value: '6-Step', label: 'Guided onboarding wizard' },
    icons: ['ScanFace', 'Target', 'UsersRound', 'Users2', 'Workflow', 'FileText', 'Lock', 'UserPlus'],
    highlights: [
      'NIC/OCR scanning auto-fills personal details on registration',
      'Skill matrix mapping (e.g. Sewing, Cutting, Quality Control, Packing)',
      'Search employees by name, code, NIC or passport number',
      'Department, site and role-scoped employee visibility',
      'Soft-delete, deactivate and rejoin workflow with history retention',
      'Bulk employee import via CSV with validation',
      'Salary, NIC and email masking for non-authorized roles',
      'Recruitment pipeline tracking with 1-click profile migration',
    ],
  },
  {
    key: 'attendance',
    icon: 'Fingerprint',
    image: attendanceImg,
    label: 'Time & Attendance',
    tagline: 'Attendance & Biometric Engine',
    description:
      'Real-time attendance capture from biometric hardware or manual entry, with an automated calculation engine that handles late arrivals, early departures and night-shift crossovers.',
    metric: { value: '24/7', label: 'Automated shift calculation' },
    icons: ['Fingerprint', 'Zap', 'CalendarCheck2', 'Clock', 'Moon', 'FileBarChart', 'Eye', 'BarChart3'],
    highlights: [
      'Direct Hikvision biometric integration over API/TCP-IP',
      'Real-time, scheduled and manual punch synchronization',
      'Automatic first-IN / last-OUT identification',
      'Late-arrival grace periods and early-departure rules',
      'Cross-midnight night-shift attendance handling',
      'Bulk attendance upload via Excel with duplicate/error detection',
      'Live, near-real-time presence dashboard by department',
      'Date-range, site and production-line attendance reporting',
    ],
  },
  {
    key: 'leave',
    icon: 'CalendarClock',
    image: leaveImg,
    label: 'Leave Management',
    tagline: 'Configurable Approval Workflows',
    description:
      'Employee self-service leave requests routed through fully configurable, N-step approval workflows — with automatic conflict detection and real-time balance tracking.',
    metric: { value: 'N-Step', label: 'Configurable approval chains' },
    icons: ['CalendarClock', 'UserPlus', 'UsersRound', 'ShieldCheck', 'CheckCircle2', 'CalendarCheck2', 'ScrollText', 'FileCheck2'],
    highlights: [
      'Annual, Casual, Medical, Unpaid and custom leave types',
      'Employee self-service application with supervisor/HR submission on behalf',
      'Designation-based approval routing (e.g. Supervisor → HR Manager)',
      'Automatic overlapping-leave conflict detection',
      'Balance deducted only after final approval — never on submission',
      'Organization and personal leave calendars',
      'Service-period and employee-category-based leave policies',
      'Full leave history with approval status and reason',
    ],
  },
  {
    key: 'payroll',
    icon: 'Wallet',
    image: payrollImg,
    label: 'Payroll',
    tagline: 'Statutory Payroll Automation',
    description:
      'Configurable pay schemes for Wage Board and Shop & Office ordinances, automated day-type OT bucketing, and zero-variance EPF, ETF and APIT calculation on every run.',
    metric: { value: '1.5× – 3.0×', label: 'Configurable OT multipliers' },
    icons: ['Wallet', 'SlidersHorizontal', 'Calculator', 'TrendingUp', 'FileText', 'Building2', 'LineChart', 'Server'],
    highlights: [
      'Wage Board (WB) and Shop & Office (SO) pay schemes, Executive / Non-Executive rules',
      'Day-type configuration: Working Day, Saturday, Sunday, Poya, Statutory & Company Holiday',
      'Overtime bucketing at 1.5×, 2.0× and 3.0× with configurable thresholds',
      'Automatic EPF (employee & employer), ETF and APIT tax-slab calculation',
      'Configurable allowances (transport, food, attendance bonus, production incentive) and deductions',
      'Salary advance generation, approval and automatic payroll recovery',
      'Draft → Processing → Finalised → Locked payroll run lifecycle with full audit history',
      'Direct bank and ERP journal export',
    ],
  },
  {
    key: 'payslip',
    icon: 'FileText',
    image: payslipImg,
    label: 'Payslips & Meals',
    tagline: 'Trilingual Payslips & Canteen',
    description:
      'Password-protected PDF payslips generated natively in English, Sinhala and Tamil, plus a built-in barcode meal-management module for factory canteens.',
    metric: { value: '3', label: 'Native payslip languages' },
    icons: ['FileText', 'Mail', 'ScanLine', 'ScanFace', 'Clock', 'Eye', 'BarChart3', 'ShieldAlert'],
    highlights: [
      'Bulk or individual PDF payslip generation, password-protected per employee',
      'Payslip delivery by email with full delivery-log tracking',
      'Unique, non-reusable employee barcode for meal requests',
      'Mobile-camera and hardware barcode scanning at the canteen',
      'Configurable daily meal request cut-off with cancellation window',
      'Real-time meal administration dashboard by department',
      'Daily, weekly and monthly meal cost reporting',
      'Meal request, cancellation and admin-action audit logs',
    ],
  },
  {
    key: 'reports',
    icon: 'BarChart3',
    image: reportingImg,
    label: 'Analytics & Reporting',
    tagline: 'Reports & Workforce Analytics',
    description:
      'A complete reporting suite spanning employee, attendance, leave and payroll data — filterable by site, department and date range, exportable in every format you need.',
    metric: { value: 'Excel · PDF · HTML', label: 'Export formats' },
    icons: ['BarChart3', 'Users2', 'Clock', 'FileText', 'Calculator', 'Target', 'FileBarChart', 'Network'],
    highlights: [
      'Headcount summary, new joiners and leavers reports',
      'Daily attendance summary, late arrivals and absenteeism reports',
      'Leave balance summary and pending-approval reports',
      'Payroll run summary, EPF/ETF remittance and payroll cost by department',
      'Site, department and date-range filtering on every report',
      'Excel, PDF and on-screen HTML report output',
      'JSON/API report output for downstream systems',
      'Payslip register and audit-ready statutory reports',
    ],
  },
  {
    key: 'security',
    icon: 'ShieldCheck',
    image: securityImg,
    label: 'Administration & Security',
    tagline: 'Role-Based Access & Audit',
    description:
      'Enterprise-grade authentication and a five-role access model, with sensitive-field masking and an immutable audit trail across every module.',
    metric: { value: '5', label: 'Built-in scoped user roles' },
    icons: ['ShieldCheck', 'Building2', 'KeyRound', 'Lock', 'ShieldAlert', 'EyeOff', 'ScrollText', 'Zap'],
    highlights: [
      'SuperAdmin, Admin, HR Manager, Supervisor and Employee role model',
      'Tenant, company, site and reporting-hierarchy scoped access',
      'JWT bearer authentication with refresh-token rotation',
      'BCrypt password hashing and automatic session expiry',
      'Failed-login tracking, temporary lockout and rate limiting',
      'Salary, NIC, email and bank-detail masking by role',
      'Immutable audit trail with before/after values, user ID and timestamp',
      'Real-time notification centre with role-based alerts',
    ],
  },
  {
    key: 'advanced',
    icon: 'Factory',
    label: 'Advanced / Enterprise',
    tagline: 'Multi-Tenant & Floor Integration',
    description:
      'Multi-tenant branding, production-floor workforce tracking and open integration endpoints for enterprises running multiple companies, sites or factories.',
    metric: { value: 'Multi-Site', label: 'Tenant & branch architecture' },
    icons: ['Factory', 'Building2', 'Eye', 'Network', 'Globe2', 'FileCheck2', 'FileText', 'Cpu'],
    highlights: [
      'Tenant-level branding — logo, brand colour and login-page theming',
      'Multiple companies, sites and branches under one tenant',
      'Real-time production-line workforce and operator-efficiency tracking',
      'ERP / MES integration for combined workforce and production data',
      'Multi-factory and multi-branch visibility dashboards',
      'Social-compliance and audit reporting aligned to WRAP / BSCI standards',
      'Employee CSV import/export and full report export pipeline',
      'Modular architecture built to add future HR modules without redesign',
    ],
  },
  {
    key: 'visibility',
    icon: 'Eye',
    image: workforceVisibilityImg,
    label: 'Workforce Visibility',
    tagline: 'Real-Time Dashboards & Analytics',
    description:
      'Live presence dashboards, role-scoped statistics and exportable reports give you instant workforce visibility — from headcount summaries to per-department attendance and payroll cost breakdowns.',
    metric: { value: 'Real-Time', label: 'Live workforce dashboards' },
    icons: ['Eye', 'SlidersHorizontal', 'Users2', 'Clock', 'Calculator', 'FileBarChart', 'Network', 'Users'],
    highlights: [
      'Live presence dashboard by department, site and production line',
      'Role-scoped statistics visible the moment you log in',
      'Headcount summary, new joiners and leavers reports',
      'Daily attendance summary with late arrivals and absenteeism tracking',
      'Payroll cost breakdown by department, site and date range',
      'Exportable reports in Excel, PDF and on-screen HTML',
      'JSON/API report output for downstream BI systems',
      'Configurable dashboards for SuperAdmin, HR Manager and Supervisor roles',
    ],
  },
];

export default features;