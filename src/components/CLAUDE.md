# Components

## Inventory

- **Layout**: wraps every page (`_app.js` does this). Renders `<TopBar />`, `<main>{children}</main>`, `<BottomNav />`, `<FilmGrain />`.
- **TopBar**: sticky breadcrumb. Reads `useRouter().pathname` to derive the current page key.
- **BottomNav**: primary nav. Maps over `PROFILE.nav`. Active link styled in CSS via the `.active` class; also sets `aria-current="page"`.
- **PageMeta**: small mono chip (e.g. `02 / about`). Used in the right slot of `PageHeader` on most pages.
- **PageHeader**: H1 plus accent period plus right slot (`right` prop). Use for every page heading.
- **FilmGrain**: fixed-position SVG noise overlay. Single instance, mounted by `Layout`.
- **Constellation**: SVG graph for `/`. Imports `useTick` for the rAF pulse and reads `PROFILE.nodes` / `PROFILE.edges`.
- **WorkCard**: used by `/work`. Uses a striped placeholder thumb when `work.image` is absent; renders `<img>` when present.
- **DotField**: fixed-position background covering the right ~58% of the viewport, behind content (`z-index: -1`, sits above `.shell` bg via `isolation: isolate`). Same dot pattern as the index `.graphDots`, masked with a left-to-right fade so it eases in from the empty area. Hidden under 720px viewport. Used on `/about`, `/now`, `/resume` to fill the empty right half. Render as a sibling of `<section>`.
- **IntroSplash**: brand splash on every full page load of `/` (no session gating — runs on first visit and every refresh). Mirrors the hero section's layout — `topBarSpacer` (matching TopBar height) + `heroMirror` (matching `.hero` min-height, padding, flex centering) with kicker/lead placeholders at `visibility: hidden` so the headline lands at the exact y-position it'll occupy on the actual page. No jump when the overlay fades. Fades out 1.3–1.66s, JS removes `html.intro-active` and unmounts at 1.7s. Click or Escape skips.
- **PageLoader**: thin horizontal bar for every full page load of non-`/` pages (deep link, refresh). 240px track with a 72px white head sweeping left↔right on a 1.4s loop. Overlay covers the page, fades out at the same 1.3–1.66s window as IntroSplash, dismounts at 1.7s. Both components are mounted by `Layout`; each gates itself by reading `html.intro-splash` / `html.intro-bar` set by an inline `<script>` in `_document.js`. Whichever class matches, that component plays; the other returns `null` immediately.

The inline script in `_document.js` runs synchronously before React hydrates: it inspects `location.pathname` and adds the appropriate classes (`intro-active` + `intro-splash` for `/`, otherwise `intro-active` + `intro-bar`) to `<html>` so the page renders behind the overlay with `.reveal` / `.revealDown` elements at opacity 0. When the loader dismounts, the class is removed and those elements transition in. The reveal classes are defined globally in `src/styles/globals.css` and applied via plain className strings (e.g., `className={\`${styles.bar} revealDown\`}`). Stagger delay is set per-element via `style={{ '--reveal-delay': '120ms' }}`.

## Conventions

- **Naming**: PascalCase filename (`PageHeader.js`), default export named the same. Paired stylesheet at `src/styles/<Name>.module.css`.
- **Styling**: CSS Modules only. Inline `style={...}` is acceptable only for values that *must* be computed per render (e.g., per-frame SVG transforms in `Constellation`). Anything else goes in the `.module.css`.
- **Tokens**: pull colors and fonts from CSS variables. Never hex literals. Use `var(--accent)`, `var(--fg)`, `var(--rule)`, `var(--mono)`, `var(--sans)`.
- **A11y**: every interactive element has a name. `<nav>` gets `aria-label`. SVG art uses `role="img"` plus `aria-labelledby="..."` pointing at a `<title>`.
- **Reduced motion**: gate animation on `matchMedia('(prefers-reduced-motion: reduce)')`. See `Constellation.js` for the pattern.
- **No client-only globals at render**: don't read `window` / `document` outside `useEffect`. Static export hydrates from server-rendered HTML, so render-time output must be deterministic.

## Adding a new component

1. `src/components/Foo.js` plus `src/styles/Foo.module.css`.
2. Import as `import styles from '../styles/Foo.module.css'`.
3. If the component reads site data, import from `../lib/profile`.
4. If it animates, gate via `useTick` (already SSR-safe) and `prefers-reduced-motion`.
5. If it lives on a page, the page goes in `src/pages/` with `<Head>` for title and meta.
