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
- **IntroSplash**: one-shot brand splash mounted by `Layout`. Plays only on first tab visit (gated via `sessionStorage.intro-played`). Returning visitors are detected before hydration via an inline `<script>` in `_document.js` that adds `html.intro-played` for a CSS short-circuit (`display: none`), preventing a flash. The splash auto-dismisses at 1.3s via CSS animation, then unmounts at 1.7s; click or Escape skips early. Honors `prefers-reduced-motion` by collapsing all animations to 0.01ms.

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
