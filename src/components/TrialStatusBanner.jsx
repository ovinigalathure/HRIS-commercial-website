import { ArrowRight, CalendarClock } from 'lucide-react';
import { useState } from 'react';

const DAILY_MS = 24 * 60 * 60 * 1000;

/**
 * Persistent banner shown to trial tenants: "X days left in your trial".
 *
 * This component is intended to be mounted once at the top of the app shell
 * (outside the router) for a trial tenant. The trial end date is provided via
 * props (computed server-side). When the trial is read-only (expired), a
 * different message and no upgrade link are shown.
 *
 * Usage in the product app:
 *   <TrialStatusBanner expiresAt="2026-09-11T00:00:00Z" onUpgrade={...} />
 */
export default function TrialStatusBanner({ expiresAt, onUpgrade, readOnly = false }) {
  const [now] = useState(() => Date.now());

  let daysLeft = 0;
  if (expiresAt) {
    const diff = new Date(expiresAt).getTime() - now;
    daysLeft = Math.max(0, Math.ceil(diff / DAILY_MS));
  }

  if (readOnly) {
    return (
      <div className="sticky top-0 z-40 bg-amber-500/95 dark:bg-amber-600/95 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-2 text-sm font-medium">
          <CalendarClock className="h-4 w-4 shrink-0" />
          <span>
            Your trial has ended — your workspace is now read-only. Upgrade to keep full access to your data.
          </span>
          {onUpgrade ? (
            <button
              type="button"
              onClick={onUpgrade}
              className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/20 hover:bg-white/30 px-3 py-1 text-xs font-semibold transition-colors"
            >
              Upgrade <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : null}
        </div>
      </div>
    );
  }

  if (!daysLeft) return null;

  return (
    <div className="sticky top-0 z-40 bg-gradient-to-r from-royal-600 to-electric-600 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-center gap-2 text-sm font-medium">
        <CalendarClock className="h-4 w-4 shrink-0" />
        <span>
          <strong>{daysLeft}</strong> {daysLeft === 1 ? 'day' : 'days'} left in your free trial
        </span>
        {onUpgrade ? (
          <button
            type="button"
            onClick={onUpgrade}
            className="ml-2 inline-flex items-center gap-1 rounded-full bg-white/20 hover:bg-white/30 px-3 py-1 text-xs font-semibold transition-colors"
          >
            Upgrade now <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
