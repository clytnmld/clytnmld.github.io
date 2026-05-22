# Clayton Mildy — QA Engineer (Next.js port)

Personal-website portfolio, ported from a single-file HTML design prototype to
**Next.js 14 (App Router) + TypeScript + CSS Modules**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the built output
```

## Folder map

```
app/                       Next.js entry points (layout, page, globals.css)
components/
  cursor/CustomCursor      Two-element custom cursor (dot + ring)
  effects/Reveal           Wrapper that opts an element into the scroll-reveal
  effects/RevealRoot       Client-only hook host for the global observer
  layout/Nav               Sticky nav + mobile hamburger menu
  layout/Footer            Site footer
  ui/Button                Polymorphic <a>/<button>, primary + ghost variants
  ui/SectionHead           Watermark + eyebrow + title + lede block
  ui/Marquee               Auto-scrolling skills marquee
  ui/SepStrip              Monospace divider strip between sections
  sections/Hero            Hero with stats card + corner crosshairs
  sections/About           Bio, principle cards, education receipt
  sections/Skills          Three skill-bucket cards
  sections/Exhibit         "Caught in the wild" intentional-bug exhibit
  sections/Work            Selected case studies (CASE-001…004)
  sections/AI              "with AI" workflows + closing one-liner
  sections/Contact         Contact info + validated form
  widgets/LiveFeed         Floating "tail -f tests.log" widget
data/                      Single source of truth for copy + structured content
  meta.ts                  Site name, nav links, hero pills, principles, receipt
  skills.ts                Skill groups and items
  projects.ts              Case-study data + metric structure
  aiWorkflows.ts           AI pipelines and bullets
lib/useReveal.ts           IntersectionObserver hook for scroll reveals
```

## How styling works

- **Design tokens** (colors, type, spacing, cursor sizing) live as CSS custom
  properties in [`app/globals.css`](app/globals.css). Edit one variable, the
  whole site updates.
- **Per-component styles** are co-located as `*.module.css` files next to
  their components, scoped automatically by the bundler.
- **A few shared utility classes** (`.wrap`, `.sectionTag`, `.sectionTitle`,
  `.sectionLede`, `[data-reveal]`) live in `globals.css` — they're used
  across multiple sections and reading them in one place makes the section
  components much shorter.
- The **accent color** is lime (`#a3e635`); its RGB triplet is exposed as
  `--accent-rgb` so soft fills (`rgba(var(--accent-rgb), .12)`) follow
  automatically when you swap the accent.

## Adding / editing content

You shouldn't need to touch the section components to update copy:

- **Skills** → `data/skills.ts`
- **Case studies** → `data/projects.ts` (each `Metric` lets you accent part of
  the value via `prefix` / `accent` / `suffix`)
- **AI workflows** → `data/aiWorkflows.ts` (prose for the workflow body is
  rendered inline in `sections/AI.tsx` because it has inline emphasis markup)
- **Hero pills, status card, education receipt, principles, marquee words,
  nav links, contact info** → `data/meta.ts`

## Notes / intentional omissions

- The original prototype included a runtime "Tweaks" panel (React + Babel
  loaded from a CDN) to live-edit cursor size, accent color, etc. That was a
  design-time tool, not a portfolio feature, so it's not ported here. The
  same knobs are now CSS custom properties — change them in `globals.css`.
- The hero stats bar's `fillbar` animation, the marquee scroll, and the
  pulsing nav/live-feed dots all auto-disable under `prefers-reduced-motion`.
- The contact form has no backend — submit shows a green "Sent" confirmation
  and resets. Wire it to your handler of choice in `sections/Contact.tsx`'s
  `handleSubmit`.
