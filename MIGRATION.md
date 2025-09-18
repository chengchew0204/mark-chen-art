# Vite to Next.js Migration

This project has been migrated from Vite to Next.js with App Router while preserving all functionality and design 1:1.

## Migration Changes

### Architecture
- **Framework**: Vite → Next.js 14 with App Router
- **Language**: JavaScript → TypeScript
- **Routing**: Multi-page HTML → App Router pages
- **Components**: Vanilla JS classes → React components

### File Structure
```
app/                    # Next.js App Router pages
├── layout.tsx         # Root layout with metadata
├── page.tsx          # Home page
├── painting/page.tsx # Painting page
├── drawing/page.tsx  # Drawing page
├── blog/page.tsx     # Blog page
├── shop/page.tsx     # Shop page
└── contact/page.tsx  # Contact page

src/
├── components/        # React components
│   ├── Header.tsx    # Navigation header
│   ├── InfiniteGrid.tsx # Complex infinite grid component
│   └── pages/        # Page components
├── styles/           # SCSS styles (preserved structure)
└── lib/              # Utilities and GSAP config
```

### Preserved Features
- ✅ **Infinite Grid**: Complex GSAP-powered infinite scrolling grid
- ✅ **Touch/Mouse Interactions**: Drag, wheel, and touch scrolling
- ✅ **Responsive Design**: Mobile-optimized layouts
- ✅ **Navigation**: Active states and routing
- ✅ **Modal Popup**: Artist info modal on home page
- ✅ **Animations**: GSAP intro animations and parallax effects
- ✅ **Typography**: Roboto Mono font loading
- ✅ **SEO**: Meta tags and structured metadata

### Key Components

#### InfiniteGrid
- Migrated complex vanilla JS infinite grid to React
- Preserved all GSAP animations and interactions
- Maintains periodic tiling and collision detection
- Mobile-responsive with touch support

#### Header
- Converted to React with Next.js routing
- Preserves active state logic
- Uses `usePathname` for route detection

#### Pages
- Each page maintains original body classes for styling
- Responsive width calculations preserved
- CSS custom properties maintained

### Dependencies
- **Next.js 14**: App Router framework
- **React 18**: Component library
- **TypeScript**: Type safety
- **GSAP 3.13**: Animations (unchanged)
- **Sass**: SCSS preprocessing (unchanged)

### Development
```bash
npm install
npm run dev     # Development server
npm run build   # Production build
npm run start   # Production server
```

### Notes
- All original SCSS files preserved with minimal changes
- GSAP plugins properly configured for SSR
- Image optimization handled by Next.js
- Static assets moved to `/public` directory
- Maintains pixel-perfect design fidelity


