# personal-website

Personal site for Alonso Peralta, AI Software Engineer. Dark editorial design ("Quiet Grotesque"), six pages (`/`, `/about`, `/work`, `/now`, `/resume`, `/contact`), built with Next.js 15 (Pages Router) and statically exported to Firebase Hosting at [alonsoperalta.com](https://alonsoperalta.com).

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & deploy

```bash
npm run build                       # static export → ./out
firebase deploy --only hosting      # publishes ./out to Firebase
```

`next.config.mjs` has `output: 'export'`, so `next build` produces the entire deployable site under `out/`. No SSR runtime needed.

## Where to make common edits

- **Copy / data**: `src/lib/profile.json`. All site text (about paragraphs, now entries, resume rows, work cards, links, nav, constellation graph) lives here. Editing JSON triggers a hot reload in dev.
- **Theme tokens** (colors, fonts, type scale): `src/styles/globals.css`. The accent color is set by the `--accent: var(--accent-maroon)` line. Swap to `--accent-aggie`, `--accent-indigo`, `--accent-forest`, etc., to recolor site-wide.
- **Page layout / chrome**: `src/components/Layout.js`, `TopBar.js`, `BottomNav.js`.
- **A new page**: drop a file in `src/pages/`. Layout wraps it automatically.

## Project structure

```
src/
├── pages/        # file-based routes (index, about, work, now, resume, contact)
├── components/   # Layout, TopBar, BottomNav, PageHeader, PageMeta, Constellation, WorkCard, FilmGrain
├── lib/          # profile.json (site data) + profile.js (re-exporter) + hooks/useTick.js
└── styles/       # globals.css + one .module.css per component/page
public/
├── files/        # resume.pdf
└── images/work/  # TODO: 4:3 work card thumbnails
```

For deeper notes see `CLAUDE.md` (root) and the per-folder `CLAUDE.md` files in `src/components/`, `src/styles/`, `src/lib/`.
