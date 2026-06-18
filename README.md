# Digital World Cyber Cafe

A full marketing website for **Digital World**, a 24/7 cyber cafe offering high-speed internet, pro gaming rigs, printing services, private booths, and refreshments.

## Tech Stack

- **Framework**: TanStack Start (React 19, SSR)
- **Styling**: Tailwind CSS v4 + custom CSS variables (cyberpunk dark theme)
- **Fonts**: Orbitron (display), Exo 2 (body), Share Tech Mono (monospace) via Google Fonts
- **Routing**: TanStack Router (file-based)
- **Deployment**: Netlify (via `@netlify/vite-plugin-tanstack-start`)

## Sections

1. **Hero** — Animated typewriter tagline, glitch title effect, live stats, terminal monitor widget
2. **Services** — 6-card grid covering internet, gaming, printing, software, booths, and cafe
3. **Pricing** — 3 plans (Casual, Power User, Night Owl) with highlighted popular option
4. **Amenities** — 16-item spec sheet grid
5. **Gallery** — CSS-generated atmospheric grid placeholders
6. **Contact** — Location info + contact form with success state

## Running Locally

```bash
npm install
npm run dev        # starts on http://localhost:3000
```

Or with Netlify CLI for full platform emulation:

```bash
netlify dev --port 8889
```
