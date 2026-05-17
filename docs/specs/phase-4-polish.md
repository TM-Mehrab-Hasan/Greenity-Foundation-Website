# Spec: Phase 4 Polish & Performance

## Objective
The goal is to complete the Phase 4 milestones for the Greenity Foundation website. This includes:
1. **Performance Hardening:** Achieving a Lighthouse score of 95+ across all metrics (Performance, Accessibility, Best Practices, SEO).
2. **Volunteer Portal UI:** Creating a dedicated, high-conversion volunteer application flow.
3. **Instant Navigation:** Implementing Next.js `unstable_instant` (or equivalent fast-loading strategies) for near-instant route transitions.
4. **Asset Optimization:** Replacing heavy assets with CSS/SVG patterns where possible to reduce LCP.

## Tech Stack
- **Framework:** Next.js 15.1.4
- **Styling:** Tailwind CSS 4.0
- **Language:** TypeScript
- **State Management:** React `useState`/`useContext` (minimal)
- **Validation:** Zod (for Volunteer Portal)

## Commands
- **Dev:** `npm run dev`
- **Build:** `npm run build`
- **Lint:** `npm run lint`
- **Lighthouse:** `npx lighthouse http://localhost:3000 --view` (run against production build)

## Project Structure
- `src/app/[lang]/volunteer` → Volunteer Portal page
- `src/components/Volunteer` → Volunteer-specific components
- `src/components/Common` → Performance-optimized shared components (e.g., OptimizedImage)

## Code Style
- Use **Server Components** by default.
- Use `"use client"` only for interactivity.
- Follow the "Anti-Plastic" design vision: minimalist, high-contrast, zero-waste aesthetic.
- Prioritize CSS/SVG over bitmap images.

## Testing Strategy
- **Manual Verification:** Lighthouse audits on every major change.
- **Form Validation:** Zod schema validation for the volunteer form.
- **Responsive Check:** Test on mobile (iPhone SE/Pro Max) and desktop (1080p+).

## Boundaries
- **Always:** Use localized strings from dictionaries.
- **Ask First:** Before adding new heavy dependencies (e.g., animation libraries).
- **Never:** Hardcode text in components.

## Success Criteria
- [ ] Lighthouse Performance Score >= 95.
- [ ] Lighthouse Accessibility Score >= 98.
- [ ] Volunteer Portal UI is functional and matches the "Impactful" design style.
- [ ] Route transitions between Home, About, and Volunteer are perceived as "instant".

## Open Questions
- Should we use a multi-step form for the volunteer portal (like the donation form) or a single-page layout?
- What specific "Instant Navigation" features are most relevant for this version of Next.js? (e.g., `loading.tsx`, `prefetching`, or specific experimental features).
