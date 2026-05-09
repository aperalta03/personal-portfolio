# Styles

CSS Modules per component or page; theme tokens defined once in `globals.css`. Dark theme only.

## Theme tokens (`globals.css`)

| Variable | Value | Use |
|---|---|---|
| `--bg` | `#0c0c0d` | Page background |
| `--fg` | `#ebe8e1` | Primary foreground |
| `--fg-78` | `rgba(235,232,225,0.78)` | Body text |
| `--fg-70` | `rgba(235,232,225,0.70)` | Secondary text |
| `--fg-55` | `rgba(235,232,225,0.55)` | Meta / tertiary |
| `--fg-45` | `rgba(235,232,225,0.45)` | Faint mono labels |
| `--rule` | `rgba(235,232,225,0.12)` | Hairline borders |
| `--accent-aggie` | `#500000` | Alt accent. Official Texas A&M maroon (low contrast on dark) |
| `--accent-maroon` | `#7a1c2c` | Alt accent (default). A&M-leaning maroon, lifted for screen |
| `--accent-indigo` | `#7c83ff` | Alt accent |
| `--accent-oxblood` | `#c2453d` | Alt accent |
| `--accent-forest` | `#5fa97a` | Alt accent |
| `--accent-chartreuse` | `#c9e265` | Alt accent |
| `--accent` | `var(--accent-maroon)` | Active accent. Change here to swap site-wide |
| `--nav-height` | `96px` | Reserved space at page bottom for the sticky nav |
| `--transition-page` | `240ms` | Page-enter fade duration |
| `--sans` | (Geist via `next/font`) | Display + body |
| `--mono` | (Geist Mono via `next/font`) | Labels, metadata, chrome |

To swap accent: edit the `--accent: var(--accent-…)` line in `globals.css`.

## Type scale

| Use | Size | Weight | Tracking | Line-height |
|---|---|---|---|---|
| Index hero H1 | `clamp(96px, 13vw, 172px)` | 500 | -0.055em | 0.92 |
| Page H1 | `clamp(72px, 10vw, 120px)` | 500 | -0.05em | 0.95 |
| Section H2 | 32px | 500 | -0.02em | 1.1 |
| Lead paragraph | 22px | 400 | normal | 1.5 |
| Body | 18 to 19px | 400 | normal | 1.5 |
| Card title | 26px | 500 | -0.02em | 1.2 |
| Card blurb | 15px | 400 | normal | 1.5 |
| Mono label | 11 to 12px | 400 | 0.14em UPPERCASE | 1.4 |
| Mono inline (chrome) | 12px | 400 | 0.08em UPPERCASE | 1.4 |
| Footer/nav links | 15px | 400 | normal | n/a |

## Motion principles

- **Page transitions**: 240ms fade-in with a 6px lift on every route change. Keyed off `router.asPath` in `_app.js`. Disabled under `prefers-reduced-motion`.
- **Link hover**: `color .2s ease, border-color .2s ease`. Color goes to `var(--accent)`; underline appears.
- **Constellation pulse**: `r = base * (1 + 0.12 * sin(t/600 + n.x*9))` via rAF. Disabled under `prefers-reduced-motion`.
- **No drop shadows.** Anywhere.
- **Sharp corners** (`border-radius: 0`) everywhere.

## Layout principles

- Page padding: `64px` horizontal (mobile drops to `24px`), 24 to 80px vertical between sections.
- Top bar `24px 64px 16px`, bottom nav `40px 64px 56px`.
- Hairline rules at `var(--rule)` separate resume / now rows and cap meta strips.
