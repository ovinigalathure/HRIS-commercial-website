# Global HRIS Website Implementation Guide

## 1. Project Overview

Global HRIS is a static marketing and lead-generation website built with React, Vite, Tailwind CSS v4, and JavaScript. The website presents the Global HRIS platform, its workforce capabilities, security model, integrations, comparison points, testimonials, FAQs, and free-trial conversion flow.

This project is a frontend marketing website. It does not contain the production HRIS backend, payroll engine, authentication API, database, or live device integrations.

## 2. Technology Stack

- React 19
- Vite 8
- Tailwind CSS v4
- `@tailwindcss/vite`
- JavaScript with JSX
- `lucide-react` for icons
- CSS utilities and animations defined in `src/index.css`

## 3. Local Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run the linter:

```bash
npm run lint
```

## 4. Application Structure

```text
index.html
package.json
vite.config.js
public/
  favicon.svg
src/
  App.jsx
  main.jsx
  index.css
  assets/
    images/
  components/
  context/
  data/
  hooks/
```

### Entry points

- `src/main.jsx` mounts the React application and loads global styles.
- `src/App.jsx` assembles the complete single-page website.
- `src/index.css` contains Tailwind imports, theme colors, reusable utilities, and animations.

## 5. Page Composition

`src/App.jsx` renders the page in this order:

1. Announcement bar
2. Navbar
3. Hero section
4. Trust bar
5. Product overview
6. Pain points
7. Feature showcase
8. How it works
9. Video section
10. Why Global HRIS
11. Comparison section
12. Security section
13. Integration section
14. Statistics
15. Roadmap
16. Testimonials
17. Free-trial CTA
18. FAQ
19. Final CTA
20. Footer

Modal components and the scroll-to-top control are mounted after the main page content.

## 6. Component Responsibilities

| Component | Responsibility |
| --- | --- |
| `Navbar.jsx` | Sticky navigation, responsive menu, contact link, theme toggle, and free-trial action |
| `Hero.jsx` | Primary headline, product positioning, demo action, trial action, and dashboard visual |
| `DashboardMock.jsx` | CSS-based product dashboard visual used in the hero |
| `HowItWorks.jsx` | Four-step onboarding and implementation flow |
| `WhyUs.jsx` | Key Global HRIS differentiators and detailed capability points |
| `ComparisonSection.jsx` | Comparison of Global HRIS with legacy local systems and global SaaS tools |
| `SecuritySection.jsx` | Security capabilities and trust messaging |
| `IntegrationSection.jsx` | Hardware, platform, and operational integration messaging |
| `VideoModal.jsx` | Video playback or demo fallback modal |
| `FreeTrialModal.jsx` | Trial request form, validation, loading, and success states |
| `ThemeToggle.jsx` | Light/dark theme switching |
| `Reveal.jsx` | Scroll-triggered reveal animation wrapper |
| `Icon.jsx` | Explicit Lucide icon registry used by data-driven components |

## 7. Content Management

Marketing copy is kept in `src/data/` so content can be updated without restructuring components.

Important content files:

- `src/data/content.js`: brand, contact, navigation, hero, product, pain-point, Why Global HRIS, and CTA content
- `src/data/comparison.js`: comparison columns, features, values, and status states
- `src/data/features.js`: feature showcase content
- `src/data/faqs.js`: FAQ questions and answers
- `src/data/howItWorks.js` or `content.js`: implementation steps, depending on the current data export
- `src/data/roadmap.js`: roadmap milestones
- `src/data/stats.js`: statistics
- `src/data/testimonials.js`: approved testimonial content
- `src/data/videos.js`: video metadata and video sources

### Updating the hero headline

Edit the `hero` export in `src/data/content.js`:

```js
export const hero = {
  headline: 'Your new headline',
  // ...
};
```

`Hero.jsx` reads this value through `hero.headline`.

### Updating contact details

Edit the `contact` export in `src/data/content.js`. The sales email, phone link, WhatsApp link, and company URLs are reused across the site.

## 8. The Why Global HRIS Section

The `WhyUs.jsx` component renders the differentiator content from the `whyUs` export in `src/data/content.js`.

Each item uses this shape:

```js
{
  icon: 'SlidersHorizontal',
  title: 'Capability title',
  body: 'Capability description'
}
```

The component uses:

- Responsive three-column cards
- Glassmorphism styling from `glass-card`
- Scroll reveal animation through `Reveal`
- Lucide icons resolved through `Icon.jsx`

When adding a new icon, add both its import and registry entry in `src/components/Icon.jsx`.

## 9. Comparison Section

`ComparisonSection.jsx` reads from `src/data/comparison.js` and displays capability rows as responsive comparison cards.

Each row uses this shape:

```js
{
  feature: 'Capability name',
  values: ['Global HRIS value', 'Legacy value', 'Global SaaS value'],
  states: ['good', 'bad', 'neutral']
}
```

Supported states:

- `good`: positive capability, shown with a check icon
- `neutral`: partial or conditional capability, shown with a minus icon
- `bad`: unavailable or weaker capability, shown with an X icon

## 10. Design System

Reusable Tailwind utilities are defined in `src/index.css` using Tailwind v4 `@utility` declarations.

Common utilities:

- `glass`: translucent surface with blur and border
- `glass-card`: interactive content surface with hover lift
- `glass-panel`: larger rounded glass surface
- `glass-strong`: stronger modal or panel background
- `btn-primary`: primary gradient action button
- `btn-secondary`: secondary glass action button
- `btn-orange`: orange CTA action button
- `eyebrow`: small uppercase section label
- `section-pad`: consistent vertical section spacing
- `text-gradient`: blue/cyan gradient text
- `grid-pattern`: subtle background grid

The site supports light and dark themes through the custom `dark` variant. Theme preference is persisted in local storage and the initial theme is applied before React mounts.

## 11. Animation System

Scroll reveal animations are implemented with:

- `src/components/Reveal.jsx`
- `src/hooks/useReveal.js`
- `.reveal` and `.reveal-scale` styles in `src/index.css`

Use the wrapper for a new animated section:

```jsx
<Reveal delay={120} variant="scale">
  <div>Content</div>
</Reveal>
```

Use small stagger delays for repeated content, for example `index * 70` or `index * 100`.

Existing hover animations are provided by `glass-card`, buttons, and component-level Tailwind transition utilities.

## 12. Icons

Icons come from `lucide-react`. Data-driven icons are passed as strings:

```jsx
<Icon name="ShieldCheck" />
```

The icon must be explicitly imported and added to the registry in `src/components/Icon.jsx`. This keeps the client bundle smaller than importing the complete icon package.

## 13. Forms and Backend Integration

`FreeTrialModal.jsx` currently uses a mock `submitTrialRequest()` flow. It provides the frontend form experience, validation, loading state, and success state.

To connect a real backend:

1. Replace the mock submit function with a `fetch` request to the production API.
2. Validate and sanitize input on the server.
3. Configure the API base URL through environment variables.
4. Handle API errors and rate limits in the modal.
5. Keep credentials and private service keys on the server only.

Example environment variable:

```text
VITE_API_BASE_URL=https://api.example.com
```

Only public configuration should use the `VITE_` prefix. Never place secrets in frontend environment variables.

## 14. Videos and Testimonials

Video entries are stored in `src/data/videos.js`. Placeholder entries can use `src: null`; the UI falls back to a demo-booking message.

Testimonials should contain approved, real customer content only. Replace placeholder quotes with authorized testimonials before publishing.

## 15. Assets and Branding

- Replace `src/assets/images/logo.jpg` to update the shared logo, or update the import in `Logo.jsx`.
- Replace `public/favicon.svg` to update the browser favicon.
- Real product screenshots can be placed in `src/assets/images/` and used in place of the CSS dashboard mock.

## 16. Production Checklist

Before deployment:

- Run `npm run lint`.
- Run `npm run build`.
- Test the page on mobile and desktop widths.
- Test light and dark mode.
- Test navbar links and responsive menu behavior.
- Test free-trial modal validation and success state.
- Confirm all email, phone, WhatsApp, and external website links.
- Replace placeholder videos and testimonials.
- Confirm the favicon, logo, metadata, and page title.
- Connect the trial form to a protected backend endpoint.
- Check that no confidential URLs, credentials, or internal implementation information are exposed.

## 17. Deployment

The generated `dist/` directory is a static website bundle. It can be deployed to any static hosting provider that supports SPA fallback behavior, including Azure Static Web Apps, Vercel, Netlify, Cloudflare Pages, or an equivalent web server.

For production hosting, configure the server to serve `index.html` for unknown frontend routes if client-side routing is introduced later.

## 18. Maintenance Guidelines

- Keep marketing content in `src/data/`.
- Reuse existing design utilities before adding new CSS.
- Use `Reveal` for section and repeated-item animations.
- Add icons through the explicit `Icon.jsx` registry.
- Avoid putting secrets or internal backend details in this public project.
- Keep components focused and avoid unrelated refactors when updating copy or styling.

## 19. UI Upgrade Implementation

The current UI upgrade adds formal motion and interaction patterns without introducing a new animation dependency.

### Shared motion

- `src/components/Reveal.jsx` supports `up`, `scale`, `left`, `right`, and `rotate` variants.
- `src/hooks/useTilt.js` provides pointer tilt and cursor spotlight positioning for desktop hover surfaces.
- `src/hooks/useScrollProgress.js` reports section scroll progress for scroll-linked visualizations.
- `spotlight-card` and directional reveal styles are defined in `src/index.css`.
- Continuous motion pauses when `prefers-reduced-motion: reduce` is enabled.

### Redesigned sections

- `WhyUs.jsx` uses an asymmetric featured bento card and directional reveal/spotlight motion.
- `IntegrationSection.jsx` uses a responsive animated data-flow diagram, live device pulse, detail-card tilt, and hardware badges.
- `RoadmapSection.jsx` uses a scroll-drawn connector, phase quick navigation, alternating desktop layout, and active-phase highlighting.
- `FAQ.jsx` uses a two-column responsive accordion, open-state accent bars, morphing plus icons, and a closing CTA.

### Local testimonial submissions

`Testimonials.jsx` now combines seed testimonials with visitor submissions created by `TestimonialForm.jsx`. `useTestimonials.js` stores visitor entries under `ghris-shared-testimonials` in the visitor's local browser storage.

Visitor feedback is intentionally device-local and is not a shared public feed. Each visitor can see the seeded entries and their own submissions, and can delete their own entries. `StarRating.jsx` provides interactive form ratings and read-only display ratings.
