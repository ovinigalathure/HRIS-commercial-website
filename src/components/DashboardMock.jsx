import { Bell, CalendarCheck2, Fingerprint, TrendingUp, Users, Wallet } from 'lucide-react';

/**
 * A hand-built, realistic dashboard composition — used since no real
 * product screenshots were supplied. Pure CSS/SVG/Tailwind, no image
 * assets, so it renders crisply at any size and in both themes.
 */
export default function DashboardMock({ className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Ambient glow */}
      <div className="absolute -inset-10 bg-gradient-to-br from-electric-500/25 via-cyan-400/10 to-transparent blur-3xl rounded-full glow-pan" />

      {/* Main dashboard panel */}
      <div className="relative glass-strong rounded-[1.75rem] p-5 sm:p-6">
        {/* window chrome */}
        <div className="flex items-center gap-1.5 mb-5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-electric-500/80" />
          <span className="ml-auto text-[11px] font-medium text-slate-400 dark:text-slate-500">Global HRIS · Dashboard</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-3">
          <div className="col-span-2 rounded-2xl bg-gradient-to-br from-royal-600 via-electric-500 to-cyan-400 p-4 text-white shadow-lg shadow-electric-500/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/80">Workforce Present Today</span>
              <Users className="h-4 w-4 text-white/70" />
            </div>
            <p className="font-display text-3xl font-bold mt-2">1,284</p>
            <div className="flex items-center gap-1 mt-1 text-xs text-white/85">
              <TrendingUp className="h-3.5 w-3.5" /> 96.4% attendance rate
            </div>
          </div>
          <div className="rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-white/60 dark:border-white/10 p-4">
            <Fingerprint className="h-4 w-4 text-cyan-500 dark:text-cyan-300 mb-2" />
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Live Sync</p>
            <p className="font-display text-lg font-bold text-navy-900 dark:text-white">Online</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-white/60 dark:border-white/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Payroll Run — August</span>
              <Wallet className="h-4 w-4 text-accent-500" />
            </div>
            <p className="font-display text-xl font-bold text-navy-900 dark:text-white">Finalised</p>
            <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 dark:bg-navy-700 overflow-hidden">
              <div className="h-full w-[100%] rounded-full bg-gradient-to-r from-accent-500 to-accent-300" />
            </div>
          </div>
          <div className="rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-white/60 dark:border-white/10 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Leave Requests</span>
              <CalendarCheck2 className="h-4 w-4 text-electric-500" />
            </div>
            <p className="font-display text-xl font-bold text-navy-900 dark:text-white">6 Pending</p>
            <p className="text-[11px] text-emerald-500 mt-2">18 approved this week</p>
          </div>
        </div>

        {/* chart */}
        <div className="rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-white/60 dark:border-white/10 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Attendance Trend</span>
            <span className="text-[11px] text-cyan-500 dark:text-cyan-300 font-semibold">+4.2%</span>
          </div>
          <svg viewBox="0 0 280 64" className="w-full h-14" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mockGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline
              points="0,46 28,38 56,44 84,26 112,32 140,18 168,28 196,12 224,22 252,8 280,16"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polygon points="0,46 28,38 56,44 84,26 112,32 140,18 168,28 196,12 224,22 252,8 280,16 280,64 0,64" fill="url(#mockGrad)" />
          </svg>
        </div>
      </div>

      {/* Floating glass chips — anchored to the four corners so they never overlap the panel content */}
      <div className="hidden sm:flex float-slow absolute -left-10 -top-7 items-center gap-2 glass-card rounded-2xl px-4 py-3 shadow-xl z-10" style={{ '--rot': '-4deg' }}>
        <span className="relative flex h-2.5 w-2.5">
          <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
        </span>
        <span className="text-xs font-semibold text-navy-900 dark:text-white whitespace-nowrap">Biometric synced</span>
      </div>

      <div className="hidden sm:flex float-slow-delay absolute -right-9 -bottom-6 items-center gap-2 glass-card rounded-2xl px-4 py-3 shadow-xl z-10" style={{ '--rot': '3deg' }}>
        <Bell className="h-4 w-4 text-accent-500" />
        <span className="text-xs font-semibold text-navy-900 dark:text-white whitespace-nowrap">Payslips sent · 1,284</span>
      </div>

      <div className="hidden sm:flex float-slow-delay2 absolute -left-8 bottom-2 items-center gap-2 glass-card rounded-2xl px-4 py-3 shadow-xl z-10" style={{ '--rot': '-2deg' }}>
        <TrendingUp className="h-4 w-4 text-cyan-500 dark:text-cyan-300" />
        <span className="text-xs font-semibold text-navy-900 dark:text-white whitespace-nowrap">100% EPF/ETF accuracy</span>
      </div>
    </div>
  );
}
