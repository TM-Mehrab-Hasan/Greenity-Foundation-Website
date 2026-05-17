# Implementation Plan: Phase 4 Polish & Performance

## Overview
This plan outlines the steps to complete the Volunteer Portal, optimize performance to 95+ Lighthouse score, and implement instant navigation.

## Architecture Decisions
- **Volunteer Portal:** Use a single-page layout with clear logical sections (Personal Info, Skills, Motivation) to distinguish it from the multi-step Donation flow, while maintaining the same "Impactful" aesthetic.
- **Instant Navigation:** Leverage Next.js `loading.tsx` for granular loading states and `next/link` prefetching. We will also investigate `ppr` (Partial Prerendering) if applicable to the current Next.js version (15.1.4).
- **Asset Strategy:** Shift from bitmap placeholders to SVG patterns and CSS gradients for LCP sections (Hero, Section Dividers).

## Task List

### Phase 1: Foundation (Dictionaries & Routes)
- [ ] **Task 1: Update Dictionaries**
  - Description: Add localized strings for the Volunteer Portal in `en.json` and `bn.json`.
  - Acceptance: `dictionary.volunteer` contains all needed labels.
  - Verify: Check dictionary files.
  - Files: `src/dictionaries/en.json`, `src/dictionaries/bn.json`
- [ ] **Task 2: Setup Volunteer Route**
  - Description: Create the `[lang]/volunteer/page.tsx` and basic layout.
  - Acceptance: Page accessible at `/en/volunteer` and `/bn/volunteer`.
  - Verify: Manual browser check.
  - Files: `src/app/[lang]/volunteer/page.tsx`

### Phase 2: Core Features (Volunteer Portal UI)
- [ ] **Task 3: Implement Volunteer Form Component**
  - Description: Create a responsive form with Zod validation.
  - Acceptance: Form handles inputs, shows errors, and has a success state.
  - Verify: Manual testing with invalid/valid data.
  - Files: `src/components/Volunteer/VolunteerForm.tsx`
- [ ] **Task 4: Integrate Volunteer Portal into Home/Navbar**
  - Description: Add links to the Volunteer Portal in the Hero section and Navbar.
  - Acceptance: Easy discovery from the homepage.
  - Verify: Clicking links navigates to the portal.
  - Files: `src/app/[lang]/page.tsx`, `src/components/Navbar/Navbar.tsx`

### Phase 3: Polish & Performance
- [ ] **Task 5: Asset Optimization Sweep**
  - Description: Identify and replace large images with CSS/SVG patterns.
  - Acceptance: LCP reduced by at least 20%.
  - Verify: Lighthouse audit.
  - Files: Multiple components.
- [ ] **Task 6: Implement Instant Navigation Patterns**
  - Description: Add `loading.tsx` files and optimize link prefetching.
  - Acceptance: Perceived "instant" feel during transitions.
  - Verify: Browser devtools network tab.
  - Files: `src/app/[lang]/volunteer/loading.tsx`, etc.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Performance targets not met | High | Use dynamic imports for heavy components like the Impact Map. |
| Form complexity | Medium | Keep the UI minimal and focused on conversion. |

## Open Questions
- Should we use a multi-step form for the volunteer portal (like the donation form) or a single-page layout? -> **Decided: Single-page for variety.**
- What specific "Instant Navigation" features are most relevant for this version of Next.js? -> **Focus on `loading.tsx` and optimized prefetching.**
