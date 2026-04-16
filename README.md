# Lyft Driver Financial Wellness Hub

Practical, no-jargon financial education for rideshare drivers and gig workers — taxes, savings, investing, retirement, debt, and budgeting. Videos by Sergio Avedian. Built with Next.js 14 (App Router).

## Stack

- **Next.js 14** (App Router, React Server Components where possible)
- **TypeScript** (strict)
- **Tailwind CSS** (utility styling) + custom CSS tokens for the brand theme
- **lucide-react** icons
- Zero third-party data layer — content is local TypeScript (`src/data/`)
- Tenant-driven theming so the same codebase can rebrand (default + lyft tenants included)

## Quick start

```bash
npm install
npm run dev
```

App runs at http://localhost:3000.

## Scripts

| Command         | What it does                                |
| --------------- | ------------------------------------------- |
| `npm run dev`   | Start the dev server                        |
| `npm run build` | Production build                            |
| `npm run start` | Start the production server (after build)   |
| `npm run lint`  | Run Next.js ESLint rules                    |

## Deploy to Vercel

```bash
npx vercel
```

Or push this repo and import it from the Vercel dashboard. No env vars required for the default Lyft tenant.

### Tenant switching

The app reads `NEXT_PUBLIC_TENANT_SLUG` at runtime. Defaults to `lyft`. Supported values: `lyft`, `default` (generic Sergio Avedian branding).

## Project structure

```
app/
  layout.tsx              # Root layout (html/body, providers, nav, footer)
  page.tsx                # Home (hero slider, tools, blog, etc.)
  read/[slug]/page.tsx    # Article/guide detail page
  watch/[slug]/page.tsx   # Video detail page
  topic/[slug]/page.tsx   # Topic category page
  search/page.tsx         # Browse & search

src/
  components/             # HubNav, HubFooter, HeroSlider, EditorialCard, etc.
  hooks/                  # useProgress, useSearch, useTenant
  config/
    hubNav.ts             # Shared nav links (used by nav + footer)
    tenants/               # Per-tenant theme + brand config
  data/
    content.ts            # Videos, articles, guides (with article bodies)
    topics.ts             # Topic categories
    tools.ts              # Interactive tool tiles (Coming Soon)
    blog.ts               # Driver Wellness Blog articles
  styles/
    globals.css           # Minimal reset
    hub-tokens.css        # Design system tokens + a11y utilities

public/
  logos/                  # Tenant logos (Lyft, etc.)
  thumbnails/             # Stock/placeholder images for videos + articles
```

## Accessibility

- Skip-to-content link (first focusable element, visible on focus)
- `:focus-visible` brand-colored rings on every interactive element
- `prefers-reduced-motion` respected (hero slider auto-rotation disabled; hover animations suppressed)
- `aria-current="page"` on the active nav link
- Keyboard arrow-key navigation in the hero carousel
- Live region announcing slide changes for screen readers
- Semantic landmarks (`<nav aria-label="Primary">`, `<main>`, `<footer>`)
- WCAG AA text contrast maintained on all surfaces

## Content types

- **Videos** — real YouTube embeds from Sergio Avedian's episodes on The Rideshare Guy channel
- **Articles** — full editorial body (dek, paragraphs, h2/h3, lists, callouts, key takeaways) rendered via the `ArticleBody` block renderer
- **Guides** — same article body structure, longer form
- **Blog** — separate wellness-focused content surfaced on the home page
- **Tools** — six interactive calculators (currently "Coming Soon" tiles)

## Design system

Theme tokens live as CSS custom properties, set at runtime by `TenantProvider` based on the selected tenant config:

- `--color-brand`, `--color-brand-dark`
- `--hub-bg`, `--hub-surface`, `--hub-surface-2`, `--hub-surface-hover`
- `--hub-text`, `--hub-text-muted`, `--hub-text-faint`, `--hub-border`
- `--card-radius`, `--button-radius`

Swap the tenant, swap the theme — no code changes.

## License

Private / unreleased. Content © Sergio Avedian.
