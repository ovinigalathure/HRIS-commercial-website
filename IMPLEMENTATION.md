# Global HRIS Website Implementation Guide

## 1. Project Overview

Global HRIS is a static marketing and lead-generation website built with React, Vite, Tailwind CSS v4, and JavaScript. The website presents the Global HRIS platform, its workforce capabilities, security model, integrations, comparison points, testimonials, FAQs, and free-trial conversion flow.

This project is a frontend marketing website. It does not contain the production HRIS backend, payroll engine, authentication API, database, or live device integrations.

The site includes a frontend **free-trial conversion flow**: a lead-capture form that sends details to the sales team via EmailJS (or a configured trial backend), followed by an in-app trial landing/preview page. See [Section 13 — Forms and Free Trial Integration](#13-forms-and-free-trial-integration).

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
.env.example          # Template for EmailJS / trial API config (copy to .env)
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
- `src/App.jsx` assembles the complete single-page website and handles view routing
  between the marketing home page, the trial landing page (`TrialVerifyPage.jsx`), and
  the full trial demo page (`TrialDemoPage.jsx`) via the `view` state in `ModalContext`.
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

`src/App.jsx` renders this home page by default. When the `view` state (in `ModalContext`)
is `trial-landing` or the URL has `?verify=1`, it renders `TrialVerifyPage.jsx` instead; when
`view` is `trial-demo`, it renders `TrialDemoPage.jsx`. See the Free Trial section.

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
| `FreeTrialModal.jsx` | Trial request form with EmailJS / trial-API submission and success state |
| `TrialVerifyPage.jsx` | Landing page for email verification links and post-signup confirmation |
| `TrialDemoPage.jsx` | Full in-app free trial page — trial banner, signup form, onboarding checklist |
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

## 13. Forms and Free Trial Integration

The "Start Free Trial" flow is a real, two-stage experience:

1. **Lead capture form** (`FreeTrialModal.jsx`) collects the visitor's name, work email,
   company, phone, employee count, and job role.
2. On submit, the details are delivered to the sales inbox (sales@globalhris.com) via
   **EmailJS**, then the modal shows a success state with a **"Start Free Trial"** button.

### Trial submission behavior

`submitTrialRequest()` in `FreeTrialModal.jsx`:

- If the trial backend is configured (`VITE_TRIAL_API_URL`), it `POST`s the lead to that
  deployment's public endpoint `POST /api/trial/signup` (`{ companyName, fullName,
  workEmail, phone }`) — the marketing-site half of the Free Trial feature (see
  `TrialDemoPage.jsx`).
- Otherwise it falls back to **EmailJS** to email the lead details to sales@globalhris.com.
- After a successful send, the modal stays in the same tab and offers a **"Start Free Trial"**
  button that navigates to the in-app trial landing/preview experience.

### Trial pages and routing

The site has no router; view switching is handled in `App.jsx` via a `view` state in
`ModalContext` (`home` | `trial-landing` | `trial-demo`), plus the `?verify=1` query
route for email verification links:

- `TrialVerifyPage.jsx` — landing page for email verification links and the post-signup
  "trial is on its way" confirmation. When opened, "Explore a trial preview" navigates
  to the trial demo in the same tab (it does not open an external URL).
- `TrialDemoPage.jsx` — the full in-app free trial page: a "Trial Version — X days
  remaining" banner, a signup form, the 9-step guided onboarding checklist, and the
  trial package feature list. All navigation stays within the same tab.

### Environment configuration (`.env`)

Copy `.env.example` to `.env` and set:

```text
VITE_EMAILJS_SERVICE_ID=service_xxx
VITE_EMAILJS_TEMPLATE_ID=template_xxx
VITE_EMAILJS_PUBLIC_KEY=public_key

# Trial backend (POST /api/trial/signup). Leave empty to fall back to EmailJS.
VITE_TRIAL_API_URL=https://trial.yourdomain.com
```

### Security notes

- Only the **public** EmailJS key is used in the browser. The EmailJS **private key** and
  SMTP port belong to the EmailJS dashboard server-side config and must **never** be put
  in frontend `.env` or committed to the repo — `.env` is git-ignored for this reason.
- With the EmailJS free plan, the recipient (To Email) must be set inside the EmailJS
  template, not overridden from client code.
- The EmailJS template's `{{variable}}` names must match the names sent from the code
  (e.g. `from_name`, `work_email`, `company_name`, `phone`, plus aliases and a `message`
  blob). Because each field is sent under multiple aliases and a combined `{{message}}`,
  the email renders all details regardless of exact template naming.
- Trial API configuration is frontend-only (public); keep any service secrets server-side.

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
- Test the free-trial modal: submission, EmailJS send, and the success → trial preview flow.
- Confirm the EmailJS service/template IDs, public key, and template recipient are correct.
- Confirm all email, phone, WhatsApp, and external website links.
- Replace placeholder videos and testimonials.
- Confirm the favicon, logo, metadata, and page title.
- If the trial backend is live, set `VITE_TRIAL_API_URL` and verify `POST /api/trial/signup` and rate-limit/validation errors render cleanly.
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
- Keep production EmailJS/trial configuration out of committed files — always use the
  git-ignored `.env` (see `.env.example`).
- Keep trial-related config frontend-only and public; never expose service private keys.

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
