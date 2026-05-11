# Design One-Pager: Greenity Foundation (Anti-Plastic Focus)

## Vision: "Digital Purity, Physical Sustainability"
The website should embody the message of "cleaning up" by being fast, clean, and free of "digital bloat."

## Design Pillars
1. **Zero-Waste Aesthetic:** Minimalist layouts, generous whitespace, and crisp typography. Avoid heavy gradients or complex shadows that increase rendering costs.
2. **Visual Narrative:** Use high-contrast photography of the plastic crisis vs. pristine nature to create an emotional "before/after" effect.
3. **Performance First:** 
   - SVG icons and stylized CSS patterns instead of large image assets.
   - Optimized system fonts to reduce font-face loading.
   - "Eco-Mode" (Dark Mode by default or easily toggled) to save energy on OLED screens.

## Color Palette & Typography
- **Primary:** `#15803d` (Vital Green)
- **Secondary:** `#0369a1` (Ocean Deep Blue)
- **Neutral:** `#f8fafc` (Recycled White), `#334155` (Slate Grey - color of microplastics)
- **Typography:** Sans-serif for clarity (Inter or Geist), with a slightly "mechanical" or "monospaced" feel for data-driven impact sections.

## Key Design Components
- **The "Plastic Counter":** A live-updating (simulated) counter of plastic being removed or produced.
- **Texture Overlays:** Subtle "recycled paper" or "water" textures on container backgrounds.
- **Impact Cards:** Minimalist cards showing "Victories" (e.g., "500kg plastic removed from Cox's Bazar").

## Technical Specs
- **Next.js + Tailwind (if needed for speed) or Vanilla CSS.**
- **Asset Strategy:** Use WebP/AVIF with Next/Image. Priority for SVGs.
- **Bilingual Focus:** Ensure Bengali typography (Hind Siliguri) is as legible and beautiful as the English version.

## Not Doing
- **Autoplay Video:** High data cost, poor for low-carbon design.
- **Heavy Animation Libraries:** Keep it native with CSS transitions.
