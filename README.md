# Greenity Foundation Website

## Overview
A high-performance, bilingual (English/Bengali) web platform for the **Greenity Foundation Bangladesh**. This platform is designed to drive environmental action through radical transparency, data-driven storytelling, and community engagement. Built with a "Digital Purity" vision, it prioritizes speed, accessibility, and physical sustainability.

## Tech Stack
- **Framework:** Next.js 15.1.4 (App Router)
- **Styling:** Tailwind CSS 4.0
- **Language:** TypeScript
- **Content:** Localized MDX (Stories of Change)
- **Validation:** Zod (Donation & Volunteer Forms)
- **Icons:** Lucide React
- **Hosting:** Optimized for Vercel (Edge-ready)

## Core Features
- **Impact Journalism:** Data-rich, professional field reports in EN/BN with interactive "Biological Callouts" on visual assets.
- **Ecological Ledger:** A monospaced transparency dashboard connecting funding inputs to physical ecological outputs (kilograms removed, trees planted).
- **Community Impact Board:** A gamified volunteer recognition system with a monthly leaderboard and verified achievement badges.
- **Trash to Treasure Gallery:** A visual catalog showcasing the circular economy transformation of waste into value.
- **Dynamic Program Intelligence:** Dedicated deep-dive pages for every core foundation program (Beach Cleanup, Reforestation, Eco-Literacy, Policy).
- **Eco-Mode:** Energy-efficient dark mode designed to reduce OLED power consumption.
- **Navigation Sidebar:** A modern, focused vertical navigation system for rapid impact discovery.

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or bun

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure
- `src/app/[lang]`: Localized application routes.
- `src/app/[lang]/programs/[slug]`: Dynamic program intelligence pages.
- `src/app/[lang]/stories/[slug]`: Impact journalism reports (MDX).
- `src/components`: Reusable UI components (Specialized: Dashboard, ImpactMap).
- `src/content`: Localized MDX content for stories.
- `src/dictionaries`: i18n translation engine (EN/BN).
- `docs/`: Project tracker, specifications, and design visions.

## Design Philosophy: Anti-Plastic Design
The website follows the "Anti-Plastic" design vision:
- **Minimalist:** Removing digital waste (excessive scripts/heavy images).
- **Physical:** Using "Biological Identification" callouts to connect digital data to physical impact.
- **Transparent:** Direct correlation between donor resources and verified environmental results.

---
© 2026 Greenity Foundation. Ensuring a greener and more sustainable Bangladesh.
