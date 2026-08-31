# Global HRIS — Marketing Website

A static, promotional React website for **Global HRIS**, built with Vite, React and Tailwind CSS v4. This is a marketing/lead-gen site — it does not implement the actual HRIS product.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # production build -> dist/
npm run preview  # preview the production build locally
```

## What's inside

- **React 19 + Vite + Tailwind CSS v4** (via `@tailwindcss/vite`), JavaScript (no TypeScript).
- **Light & dark mode** — toggle in the navbar, persisted to `localStorage`, respects system preference on first visit. No flash-of-wrong-theme (the theme class is applied before React mounts, via the inline script in `index.html`).
- **Glassmorphism design system** — reusable `glass`, `glass-card`, `glass-panel`, `glass-strong`, `btn-primary` etc. utilities defined in `src/index.css` via Tailwind v4's `@utility` directive.
- **All content lives in `src/data/*.js`** — edit copy, features, FAQs, stats, roadmap and comparison data there instead of hunting through components.
- **Icons** — [lucide-react](https://lucide.dev/), referenced by name through `src/components/Icon.jsx`. Add new icon names to the import list + registry in that file as needed (keeps the bundle small — icons are explicitly imported, not the whole library).

## Content sourcing & honesty notes

Everything in this build is sourced from the approved Global HRIS marketing content and the "Global HRIS & Payroll Management System" feature specification you provided. Two sections are intentionally **not** filled with invented content:

- **`src/data/videos.js`** — no real product video files or links were supplied, so this ships with placeholder entries (`src: null`). The video section and modal both work today (clicking a video opens a "video coming soon, book a demo" modal); once you have a real MP4/YouTube/Vimeo URL, set `src` on an entry and it plays automatically — no other code changes needed.
- **`src/data/testimonials.js`** — no approved client quotes were supplied, so this ships with clearly-labeled placeholder cards, not fabricated customer claims. Replace `quote`/`name`/`role`/`org` with real testimonials once you have permission to use them.

No internal/confidential implementation details (credentials, UAT URLs, database or infrastructure info) from the implementation guide were used anywhere on this public site.

## Images & branding

- **Logo**: `src/assets/images/logo.jpg` is the Global Exceed logo you provided — used in the navbar and footer via `src/components/Logo.jsx`. Swap the file (keep the same filename, or update the import path) to update it everywhere at once.
- **Product screenshots**: none were supplied, so the hero/video-poster "dashboard" visual (`src/components/DashboardMock.jsx`) is a hand-built CSS/SVG composition, not a real screenshot. If you'd like to swap in real product screenshots later, replace `<DashboardMock />` usages with an `<img>` and drop the screenshots into `src/assets/images/`.
- **Favicon**: `public/favicon.svg` — replace with your own mark any time.

## Free Trial form

`src/components/FreeTrialModal.jsx` collects Full Name, Work Email, Company Name, Phone, Employee Count and Job Role, and calls a mock `submitTrialRequest()` function (simulated network delay + success state). To connect a real backend, replace the body of `submitTrialRequest` with an actual API call — the form, validation and success/loading UI do not need to change.

## Contact information used on the site

- Sales email: `sales@globalhris.com`
- Company email: `charith@globalexceed.com`
- Phone: `+94 76 857 2112`
- Sites: `global-hris.com` / `globalexceed.com`

Edit these in `src/data/content.js` (`contact` export) if anything changes.
