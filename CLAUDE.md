# Personal Site · Alonso Peralta

Dark editorial personal site (Quiet Grotesque). Six pages: index, about, work, now, resume, contact. Single accent (Aggie maroon by default), oversized grotesque headlines, mono labels for metadata.

## Stack

- Next.js 15.3 (Pages Router) + React 19, JavaScript (no TypeScript)
- Static export (`output: 'export'`); `next build` writes the deployable site to `out/`
- CSS Modules per component, theme tokens in `src/styles/globals.css`
- `next/font/google` for Geist + Geist Mono, bound to `--sans` / `--mono`
- Firebase Hosting at alonsoperalta.com

## Commands

```bash
npm run dev                       # http://localhost:3000
npm run build                     # writes ./out/
firebase deploy --only hosting    # publishes ./out/ to Firebase
```

## Project map

- `src/pages/`: file-based routes. `_app.js` wraps every page in `<Layout>`. `_document.js` sets the html lang.
- `src/components/`: Layout chrome (TopBar, BottomNav, FilmGrain), page primitives (PageHeader, PageMeta), feature components (Constellation, WorkCard). See `src/components/CLAUDE.md`.
- `src/lib/profile.json`: **single source of truth for all site copy and data.** Edit content here, never in pages or components. `profile.js` is a thin re-exporter that named-exports slices for ergonomic imports. See `src/lib/CLAUDE.md`.
- `src/lib/hooks/useTick.js`: SSR-safe rAF tick used by the constellation animation.
- `src/styles/`: `globals.css` (theme tokens) plus one `.module.css` per component or page. See `src/styles/CLAUDE.md`.
- `public/files/resume.pdf`: linked from `/resume` and `/contact`.
- `public/images/work/`: TODO. Drop 4:3 work thumbnails here, then add `image: '/images/work/foo.png'` to entries in `profile.json`.

## Conventions

- **Styling**: CSS Modules. No inline styles except dynamic transforms (e.g., per-frame SVG values in `Constellation.js`). Tokens live in `globals.css` (`--bg`, `--fg`, `--fg-78/70/55/45`, `--rule`, `--accent`).
- **Components**: PascalCase filename, paired `.module.css` in `src/styles/`. Default export.
- **Routing**: file-based. Active link style is derived from `useRouter().pathname` in `BottomNav`.
- **Content**: never hardcode copy in pages or components. Add fields to `src/lib/profile.json` and import them via `profile.js`.
- **Copy voice**: plain, direct. No em dashes in prose. No AI tells. Full guide in `src/lib/CLAUDE.md`.
- **Accessibility**: every page has exactly one `<h1>` (via `PageHeader`); SVG graphics expose a `<title>` and `aria-labelledby`; nav uses `aria-current="page"`.

## Deployment

- Firebase project: `myportfolio-eb8f4` (see `.firebaserc`).
- Firebase hosting config: `public: "out"` (see `firebase.json`).
- Deploy: `npm run build && firebase deploy --only hosting`.
- Custom domain `alonsoperalta.com` is mapped at the Firebase Console; DNS is at the registrar. No code changes are needed to update content. Just deploy.

## Known TODOs

- Real work card images (drop into `public/images/work/`, wire via `work.image` field).
- OG image (`public/og-image.png`, 1200×630) for social shares.
