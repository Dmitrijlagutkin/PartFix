# PartFix

Marketing website for **PartFix** — a European service that recreates
impossible-to-find plastic replacement parts from customer photos using
professional 3D modeling and 3D printing.

This is the **frontend marketing site only**. There is no backend, database,
authentication, payments or API — the architecture is intentionally set up to
grow into a full platform later.

## Tech stack

| Concern            | Choice                                    |
| ------------------ | ----------------------------------------- |
| Framework          | Next.js 16 (App Router) + React 19        |
| Language           | TypeScript 5.9 (strict)                   |
| Styling            | Tailwind CSS v4                           |
| i18n               | next-intl (localized routes)              |
| Icons              | lucide-react                              |
| Lint / format      | Biome (replaces ESLint **and** Prettier)  |
| Validation         | Zod (ready for future forms)              |
| Git hooks          | Husky + lint-staged                       |
| Package manager    | pnpm                                      |

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to
your detected locale (e.g. `/en`).

> Optional: copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`
> to your production domain. It defaults to `https://partfix.eu`, so the app
> runs without any configuration.

## Scripts

| Script            | Description                                        |
| ----------------- | -------------------------------------------------- |
| `pnpm dev`        | Start the dev server                               |
| `pnpm build`      | Production build                                   |
| `pnpm start`      | Serve the production build                         |
| `pnpm check`      | Biome: lint + format + import-order validation     |
| `pnpm fix`        | Biome: auto-fix (format, lint, organize imports)   |
| `pnpm typecheck`  | TypeScript type checking (no emit)                 |

## Internationalization

- Supported locales: **en** (default), **it**, **de**, **fr**, **es**
- Locale lives in the URL: `/en`, `/it`, `/de`, `/fr`, `/es` — never a query string
- Locale detection + routing is handled by `src/proxy.ts` (Next 16's renamed middleware convention)
- Translations live in `messages/<locale>.json`
- English is complete; other locales are fully translated and can be refined

To add a page or locale, edit `src/i18n/routing.ts` and the `messages/` files.
Message keys are **type-checked** against `messages/en.json` (see
`src/global.d.ts`).

## SEO

- Per-page metadata via the Next.js Metadata API (`src/shared/lib/seo.ts`)
- Canonical URLs + `hreflang` alternates for every locale
- Dynamic OpenGraph / Twitter card images (`src/app/[locale]/opengraph-image.tsx`)
- `robots.txt` (`src/app/robots.ts`) and `sitemap.xml` (`src/app/sitemap.ts`)
- JSON-LD structured data: `Organization` + `LocalBusiness`

## Project structure

```
src/
  app/
    [locale]/
      layout.tsx            # Root layout: fonts, Navbar/Footer, JSON-LD
      page.tsx              # Home
      how-it-works/page.tsx
      contact/page.tsx
      not-found.tsx         # Localized 404
      [...rest]/page.tsx    # Catch-all -> 404
      opengraph-image.tsx   # Dynamic OG image
    icon.tsx                # Generated favicon
    manifest.ts robots.ts sitemap.ts
  features/                 # Feature-based UI
    home/  how-it-works/  contact/  navigation/
  shared/
    ui/                     # Primitives: Button, Card, Container, Section…
    components/             # Composed reusables: Faq, Cta
    lib/                    # cn(), seo helpers
    constants/              # site config, contact links
  i18n/                     # routing, request, navigation
  styles/globals.css        # Tailwind v4 theme tokens
messages/                   # en / it / de / fr / es translation files
```

## Editing content

- **Contact details** (email, WhatsApp, Telegram): `src/shared/constants/site.ts`
- **Copy / translations**: `messages/*.json`
- **Design tokens** (colors, radius, shadows, font): `src/styles/globals.css`

## Code quality

Biome runs on staged files before every commit via Husky + lint-staged.
Recommended VS Code settings (format on save, organize imports on save, Biome as
default formatter) are in `.vscode/settings.json`.

## What's intentionally not here

Backend, database, auth, payments, customer dashboard and API routes are out of
scope for this version. The structure (features, shared libs, typed i18n, Zod
already installed) is designed so these can be added incrementally.
