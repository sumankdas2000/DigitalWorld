# AGENTS.md

This document provides an overview of the Digital World Cyber Cafe project for developers and AI agents.

## Project Overview

A full marketing website for Digital World, a 24/7 cyber cafe. Built with TanStack Start (React SSR) and deployed on Netlify. All content is a single-page layout with scroll-based sections: Hero, Services, Pricing, Amenities, Gallery, and Contact.

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | TanStack Start (React SSR) |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS v4 + custom CSS (cyberpunk dark theme) |
| Fonts | Orbitron, Exo 2, Share Tech Mono (Google Fonts) |
| Language | TypeScript |
| Deployment | Netlify |

## Directory Structure

```
src/
  routes/
    __root.tsx     # Shell: HTML head, Google Fonts, meta tags, page title
    index.tsx      # All sections: Nav, Hero, Services, Pricing, Amenities, Gallery, Contact, Footer
  styles.css       # CSS variables, animations, layout, responsive breakpoints
public/
  favicon.ico
```

## Key Concepts

### Single-Page Architecture

All sections are self-contained components co-located in `src/routes/index.tsx`:
- `Nav` — fixed, scrolled-state aware, mobile hamburger
- `Hero` — animated typewriter + glitch title + terminal monitor widget
- `Services` — 6-card grid with SVG icons
- `Pricing` — 3 plans with highlighted card
- `Amenities` — 16-item spec-sheet grid
- `Gallery` — CSS gradient + grid-line atmospheric placeholders
- `Contact` — address/hours details + contact form with success state
- `Footer`

### `useInView` Hook

Lightweight `IntersectionObserver` wrapper that triggers `.fade-up.in` scroll reveals. Defined in `index.tsx`, disconnects after first fire.

## Design Tokens (CSS Variables in `styles.css`)

| Variable | Value | Purpose |
|---|---|---|
| `--bg` | `#060a10` | Page background |
| `--bg2` | `#0c1220` | Section backgrounds |
| `--bg3` | `#111927` | Card/elevated surfaces |
| `--cyan` | `#00d4e8` | Primary accent |
| `--amber` | `#f0a500` | Section tags, badges |
| `--green` | `#00e87a` | Status/success |
| `--font-display` | Orbitron | Headings, prices, nav |
| `--font-mono` | Share Tech Mono | Labels, tags, terminal text |
| `--font-body` | Exo 2 | Body copy |

## Non-Obvious Decisions

- **`clip-path` on `.btn`** — creates angled chamfer corners; Tailwind `rounded` would conflict.
- **`position: fixed` on hero BG** — grid + scanline overlays are fixed to create depth as user scrolls.
- **`color-mix(in srgb, ...)` for translucency** — used instead of hardcoded rgba to stay DRY with CSS vars.
- **Glitch effect** — `::before`/`::after` read `data-text` attribute and animate with `clip-path`. Fires infrequently to avoid distraction.
- **No Tailwind utility classes in JSX** — all styling uses named CSS classes for coherence.
- **Gallery uses CSS gradients** — no image dependencies; replace with `<img>` tags when photos are available.
