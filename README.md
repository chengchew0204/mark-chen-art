# Mark Chen Art - Next.js Portfolio

A contemporary art portfolio website showcasing drawings and paintings by Mark Chen, built with Next.js and featuring an interactive infinite grid gallery.

## Features

- **Interactive Infinite Grid**: GSAP-powered infinite scrolling gallery with touch and mouse support
- **Responsive Design**: Mobile-optimized layouts with adaptive spacing
- **Modern Architecture**: Next.js 14 with App Router and TypeScript
- **Smooth Animations**: GSAP animations with parallax effects
- **SEO Optimized**: Structured metadata and semantic HTML

## Pages

- **Home**: Hero section with artist introduction modal
- **Drawing**: Interactive infinite grid showcasing drawings and studies
- **Painting**: Gallery for paintings (content coming soon)
- **Blog**: Artist insights and process (content coming soon)
- **Shop**: Original artworks and prints (content coming soon)
- **Contact**: Get in touch (content coming soon)

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: SCSS with responsive design
- **Animations**: GSAP with SplitText
- **Fonts**: Roboto Mono (Google Fonts)

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   └── [pages]/          # Individual page routes
├── src/
│   ├── components/        # React components
│   │   ├── Header.tsx    # Navigation
│   │   ├── InfiniteGrid.tsx # Gallery grid
│   │   └── pages/        # Page components
│   ├── styles/           # SCSS stylesheets
│   │   ├── components/   # Component styles
│   │   ├── pages/        # Page-specific styles
│   │   └── util/         # Variables and mixins
│   └── lib/              # Utilities
└── public/               # Static assets
    ├── img/              # Artwork images
    └── fav/              # Favicons
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Artist Statement

Contemporary artist exploring the intersection of traditional techniques and modern expression through drawing and painting. Each work captures moments of contemplation, translating emotion into monochrome studies and vibrant impressions.

---

**Mark Chen Art** - Limited edition prints and original works available.