# instinct-fix-flip-site-template

The Atlanta Fix & Flip Loan site as a reusable template. All metro-specific
copy lives in a single data file; the layout, components, program-terms
plumbing, form logic, and schema are fixed. Hand-built by Instinct (no
AI-builder origin, hence the instinct- prefix).

Source: the Atlanta Fix & Flip Loan Astro project (live at
atlantafixandflip.loansapp.cfd). The repo preview renders the placeholder
data file so every token is visible.

## How it works

- `src/data/cities/<slug>.json` holds one metro: a `site` block (brand,
  header brand HTML, domain, form name, page code, metro/state names, GA4,
  airchatty tracker, schema service strings, footer tagline, guide links,
  priority cities, the program-terms sheet URL and fallback terms, UI
  strings), a `home` block (homepage copy), a `cities` array (one entry per
  service-area city with its full copy), `nearbyAreas`, and a `pages` block
  (guide/legal meta and intro copy).
- The root `city.config.mjs` picks which data file builds:
  ```js
  export const ACTIVE_CITY = '_placeholder';
  ```
- Two data files ship in the repo:
  - `_placeholder.json` - token skeleton (`{Biz Name}`, `{Main Service}`,
    `{City One}`-`{City Six}`, `{County One}`-`{County Three}`, `{City}`,
    `{State}`, `{ST}`, plus per-slot hint tokens). This is what the preview
    renders.
  - `atlanta-ga.json` - the filled Atlanta metro reference (33 service-area
    cities).

## Program terms (per niche, not per metro)

The rates, points and timing figures come from a Google Sheet
(`site.sheetUrl`, gviz JSON endpoint) fetched at build time, with
`site.fallbackTerms` baked in if the sheet is unreachable. These are the
program's published terms, so they live in the data file rather than the
markup; keep the sheet as the source of truth.

## Spin up a new metro

1. Duplicate the data file: `cp src/data/cities/atlanta-ga.json src/data/cities/houston-tx.json`
2. Rewrite it for that metro (copy rules below).
3. If the metro is not in Georgia, rename the state-specific guide
   (`src/pages/how-fix-and-flip-funding-works-in-georgia.astro`) and update
   the guide paths in the data file (`site.guideLinks`, `pages.*.path`) to
   match.
4. Point `city.config.mjs` at it: `export const ACTIVE_CITY = 'houston-tx';`
5. Build and ship.

## Copy rules for new data files

- Genuinely local: real county and city names, real housing stock, real
  closing practice for the state. No metro-name swap.
- No em dashes. Plain sentences.
- Never invent credentials, guarantees, or specific facts.
- Program term numbers come from the terms sheet / `site.fallbackTerms`;
  do not restate them in prose.
- Keep the not-a-lender and no-guarantee language intact.
- Never describe what the site is for (no "lead generation" phrasing).

## Build

```bash
npm install
npm run build          # SSR build (Cloudflare adapter) for production
GH_PAGES=true BASE=/<repo> NOINDEX=true npm run build   # static preview in dist/
```

GitHub Pages deploys the static build on pushes to `main` (workflow sets
`GH_PAGES`, `BASE=/instinct-fix-flip-site-template` and `NOINDEX`). The
NOINDEX flag adds the robots noindex meta to previews only; production
output is unchanged and byte-identical to the source site.

## Structure

```
city.config.mjs              <- the one per-metro edit
src/data/cities/*.json       <- all metro copy (one file per metro)
src/data/city.ts             <- data loading + named exports for components
src/data/loanTerms.ts        <- program terms: sheet fetch + fallback from data
src/components/CityContent.astro  <- home + city page body (form in hero)
src/components/DealForm.astro     <- the deal form (brand/page code from data)
src/pages/[slug].astro            <- service-area city pages
src/pages/                      <- index, 3 guides, privacy, terms
src/pages/sitemap.xml.ts          <- generated sitemap
src/pages/robots.txt.ts           <- generated robots
```

The deal form posts through the airchatty tracking script into GHL (no
backend). Hidden attribution fields (`page_site`, `page_code`,
`page_location`) and the honeypot are part of the fixed shell.

Desktop nav dropdowns open on hover; mobile keeps tap behavior.
