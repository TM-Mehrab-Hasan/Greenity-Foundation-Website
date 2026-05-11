# Greenity Foundation Website

Ensuring a greener and more sustainable Bangladesh through community-led environmental action.

## Overview
This is the official website for **Greenity Foundation Bangladesh**, a non-profit organization dedicated to environmental preservation, plastic waste reduction, and reforestation.

The website is a high-performance, bilingual (English & Bengali) application built with **Next.js 15**, featuring a "Zero-Waste" minimalist design and an "Eco-Mode" (optimized dark mode).

## Tech Stack
- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Fonts:** [Geist](https://vercel.com/font) (Latin) & [Hind Siliguri](https://fonts.google.com/specimen/Hind+Siliguri) (Bengali)
- **Internationalization:** Custom dictionary-based i18n implementation.

## Features
- **Bilingual Support:** Full content parity between English and Bengali.
- **Eco-Mode:** Energy-efficient dark mode with high-contrast accessibility.
- **Zero-Waste Design:** Minimalist aesthetic with subtle textures and SVG-first assets.
- **Responsive:** Optimized for all screen sizes, from mobile to desktop.
- **Performance:** Optimized images, custom font loading, and static page generation.

## Getting Started

### Prerequisites
- Node.js 20+
- npm or bun

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/TM-Mehrab-Hasan/Greenity-Foundation-Website.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### Building for Production
```bash
npm run build
npm run start
```

## Project Structure
- `src/app/[lang]`: Main application routes (i18n aware).
- `src/components`: Reusable UI components (Navbar, Hero, etc.).
- `src/dictionaries`: JSON translation files for English and Bengali.
- `docs/`: Design vision and implementation plans.
- `public/`: Static assets (logo, banner, etc.).

## Social Media
- [Facebook](https://www.facebook.com/Greenity.Foundation.Bangladesh/)

## License
© 2026 Greenity Foundation. All rights reserved.
