# lib

**All site copy and data live in `profile.json`.** Edit content there, never in pages or components.

## Data flow

```
profile.json   ← edit here (single source of truth)
    ↓
profile.js     ← thin re-exporter, named exports for ergonomics
    ↓
pages / components
```

Pages import named slices from `profile.js`: `import { hero, about, now, work, resume, contact, identity, links, nav, constellation } from '../lib/profile'`.

## `profile.json` shape

| Key | Used by | Notes |
|---|---|---|
| `identity` | TopBar, Resume download, Contact, About meta | Name, role, location, locale (top-bar tag), graduation, school, GPA, languages, email, github, linkedin, **resumeUrl** (path to current PDF), resumeLabel (tooltip text) |
| `hero` | `/` | `kicker` (mono line above H1), `headline` (array of two strings, joined with `<br />`), `lead` (paragraph; supports `@@Stealth Startup@@` for accent plus optional `leadLink: { match, href }` to turn one match into a link) |
| `about` | `/about` | `paragraphs` (array; the first one starts mid-word so the page can prepend the drop-cap "I" itself; others can use `@@text@@` for accent), `meta` (3-cell strip at bottom: `{ key, value }[]`) |
| `now` | `/now` | `lead` (paragraph), `entries` (`{ date, body }[]`) |
| `work` | `/work` | `lead` (paragraph), `items` (`{ id, date, important?, title, kind, blurb, image?, repo?, paper? }[]`; `date` uses quarter-year format like `Q1-Q4 2025` or `Q2 2024`; `important: true` pins the card above non-important ones; `repo` controls the GitHub badge, `paper` is a string path to a downloadable PDF that renders a paper icon next to the repo badge with tooltip "Read research paper". See below). The page sorts items dynamically; array order in JSON does not matter. |
| `resume` | `/resume` | `experience` (org-grouped, see below), `education` and `abroad` (`{ years, title, org, blurb }[]`), `stack` (`{ key, value }[]`) |
| `contact` | `/contact` | `lead`, `buttonLabel` ("Email me"), `buttonAriaLabel` |
| `constellation` | `/` graph | `nodes` (`{ id, label, x, y, size, description, links }[]`; x/y in 0 to 1; description and links drive the click-popover, see below), `edges` (`[fromId, toId][]`) |
| `links` | Contact, BottomNav | `{ label, href, hint }[]`. Github, linkedin, email, resume |
| `nav` | BottomNav | `{ label, href, key }[]`. Drives the sticky bottom nav |

## Voice / copy conventions

The site uses a deliberately plain voice. When editing copy in `profile.json`:

- **No em dashes (—) in prose.** Use periods, commas, colons, semicolons, or parens. Em dashes inside date-range fields (`tenure`, `years`) are fine and conventional; keep them there.
- **No AI tells.** Don't write "leverage", "applied", "robust", "productized", "AI-driven / AI-first / AI-enabled", "de-risking", "delve", "navigate", "tapestry", "comprehensive". Avoid the "not just X, but Y" pattern, the "It's not X, it's Y" pattern, "more X than I should admit" flourishes, and parenthetical asides that explain a joke.
- **Plain, direct, declarative.** Short sentences are fine. Periods do the work em dashes used to.
- **Active over passive.** "The sponsor took it on" beats "Adopted by the sponsor".
- **Concrete numbers over adjectives.** "98% accuracy" beats "highly accurate".

If a line sounds like a recruiter wrote it, rewrite it.

## Resume `experience` shape (org-grouped)

Each top-level entry is an organization. `roles` is always an array, even for single-role tenures. When `roles.length > 1`, the page renders a LinkedIn-style vertical timeline (hairline plus accent dots) connecting the roles. The first role in the array is treated as the current/most-recent and gets a filled dot.

```json
{
  "org": "Stealth Startup",
  "tenure": "Jan 2025 — Present",
  "roles": [
    { "years": "May 2026 —",          "title": "Lead AI Engineer",        "blurb": "..." },
    { "years": "Aug 2025 — May 2026", "title": "AI Software Engineer",    "blurb": "..." },
    { "years": "Jan 2025 — Aug 2025", "title": "AI Solutions Specialist", "blurb": "..." }
  ]
}
```

(Date-range em dashes inside `tenure` and `years` are intentional. The voice convention covers prose only.)

To add a new role at an existing org, prepend to that org's `roles` array. To add a new org, append a new top-level entry.

## Inline accent / link syntax

Wrap text in `@@…@@` to render it in accent color inside any paragraph (about, hero lead). For `hero.lead`, additionally set `leadLink: { match: "Stealth Startup", href: "/about" }` to turn that one match into a `<Link>`.

## Drop-cap convention (about page)

The first paragraph in `about.paragraphs` should start mid-word so the page can prepend the drop-cap "I" itself. Example: `" was born in Peru…"` (the leading space is intentional). The page renders `<span class="dropCap">I</span>` then your paragraph string after it, so the result is "I was born in Peru…".

## Adding or editing a constellation node

Each node carries:

- `id`, `label`, `x`, `y`, `size`: layout and identity. `x` and `y` are 0 to 1 normalized; the SVG re-projects them.
- `description`: 1 to 3 sentences in first person. Voice rules apply (no em dashes in prose, no AI tells, plain and direct). Used by the click-popover.
- `links`: `{ label, href }[]`. Prefer in-app anchors (`/work#extractai`, `/resume`, `/about`) so visitors stay in the site. External URLs are allowed (the popover renders them with a `↗` glyph and `target="_blank"`).

`me` is special: leave its `description` as `""` and `links` as `[]`. The component skips the click handler for it. Hover scale still applies subtly.

To add a node:

1. Append an entry to `constellation.nodes` with all fields.
2. Add at least one edge in `constellation.edges` linking it to an existing node.
3. Pick `x`/`y` so the new node doesn't overlap labels visually. Pulse animation handles the small jitter; you don't need exact spacing.
4. The work-card anchor links (e.g., `/work#extractai`) require the corresponding `id` in `work.items` to match the desired URL fragment.

## Adding a new work card

1. Append to `work.items` in `profile.json`: `{ id, date, title, kind, blurb }`. `date` uses quarter-year format (`Q1-Q4 2025`, `Q2 2024`, `Q1-Q2 2026`).
2. Optionally drop a 4:3 image at `public/images/work/<id>.png` and add `"image": "/images/work/<id>.png"` to the entry. `WorkCard` switches from striped placeholder to the real image.
3. Optionally add a `repo` field with one of three shapes:
   - `{ "private": true }`: greyed GitHub icon with a "Private Repo" tooltip. No link.
   - `{ "url": "https://github.com/..." }`: accent GitHub icon, opens the repo in a new tab.
   - `{ "soon": true }`: greyed GitHub icon with a "Coming soon" tooltip. Use as a placeholder until you have a URL to drop in.
   - Omit `repo` entirely if the project shouldn't show a GitHub badge.

   Any of the three shapes can additionally include `"label": "..."` to override the tooltip text. Useful when one URL covers multiple sub-projects (e.g. `{ "url": "...", "label": "Inventory Tracker, BrainstormAI, FlashcardAI" }`), when only part of the project is open-sourced (`{ "url": "...", "label": "Web Frontend Only" }`), or when a private repo needs a more specific reason (`{ "private": true, "label": "Organization Locked" }`).
4. Optionally set `"important": true` to pin the card to the top of the page above non-important cards.
5. Optionally add `"paper": "/files/<filename>.pdf"` (drop the PDF into `public/files/` first). Renders a document icon next to the repo badge with tooltip "Read research paper" and triggers a download on click.
6. To wire it into the constellation, add a node to `constellation.nodes` (`x`, `y` in 0 to 1) and at least one edge in `constellation.edges`.

### Work card ordering

`/work` (in `src/pages/work.js`) sorts `work.items` dynamically at render. The order in JSON has no effect. The sort is:

1. **Important first.** Items with `"important": true` come before items without the flag.
2. **Within each group, newest first.** Sorted by the latest quarter in the `date` field. So `Q1 2026` outranks `Q1-Q4 2025`, which outranks `Q2 2024`. For ranges like `Q1-Q4 2025`, the end quarter (Q4) is what's compared.

If you change a card's `date` or `important` flag, the page reorders automatically on the next build. No manual rearranging in JSON.

## Adding a new page

`profile.json` doesn't enumerate pages; `nav` does. To add `/projects`:

1. Add `{ "label": "projects", "href": "/projects", "key": "projects" }` to `nav`.
2. Create `src/pages/projects.js` and a matching `src/styles/Projects.module.css`.
3. The Layout, sticky nav, and page transition all work automatically.

## `hooks/useTick.js`

`useTick({ paused })` returns a millisecond timestamp updated every animation frame. SSR-safe (initial value is `0`, no `window` access at render). The constellation passes `paused: true` when `prefers-reduced-motion: reduce` is set.
