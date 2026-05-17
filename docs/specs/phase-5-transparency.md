# Spec: Phase 5 Transparency & Engagement

## Objective
To elevate the Greenity Foundation platform from an information site to an interactive accountability and community engine.
1. **Transparency Dashboard:** A live-feel ledger connecting donations to physical environmental impact.
2. **Volunteer Gamification:** Recognition system for community action.
3. **"Trash to Treasure" Gallery:** A visual catalog of the circular economy in action.

## Tech Stack
- **Framework:** Next.js 15.1.4 (PPR enabled where applicable)
- **Styling:** Tailwind CSS 4.0
- **Animations:** Framer Motion (for dashboard transitions and card flips)
- **Data Visualization:** SVG-based custom charts (maintaining the "Biological Identification" aesthetic)

## Project Structure
- `src/app/[lang]/transparency` → Dashboard and Ledger
- `src/app/[lang]/impact-gallery` → Trash to Treasure catalog
- `src/components/Dashboard` → Specialized data viz components
- `src/components/Gamification` → Leaderboard and Badge components

## Design Principles
- **Data as Art:** Use clean lines, monospaced fonts for numbers, and technical callouts.
- **Radical Transparency:** Every dollar must feel connected to a physical gram of plastic or a single tree.
- **Physicality:** Use the "Biological Identification" style (leader lines) to explain how recycled products were made.

## Success Criteria
- [ ] Users can toggle between "Economic Input" and "Ecological Output" views on the dashboard.
- [ ] Volunteer "Leaderboard" shows active community contributors without compromising privacy.
- [ ] Impact Gallery uses high-quality callouts to explain the transformation of waste.

## Commands
- **PPR Status:** `NEXT_EXPERIMENTAL_PPR=true npm run dev`
