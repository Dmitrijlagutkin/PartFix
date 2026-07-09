# CLAUDE.md — AI build guide for PartFix

Rules, conventions, and system notes for extending this codebase with AI
assistance. Read this before adding UI, colors, copy, or media. For a general
project intro see `README.md`; this file is the **how-to-build-correctly** guide.

---

## 1. What this is

Marketing website for **PartFix** — a European service that recreates
hard-to-find plastic replacement parts from customer photos via 3D modeling and
printing. Frontend only: **no backend, DB, auth, payments, or API**. Content is
static + fully localized. Architecture is intentionally simple so it can grow
into a platform later.

## 2. Stack & commands

| Concern   | Choice |
| --------- | ------ |
| Framework | Next.js 16 (App Router, React Server Components) + React 19 |
| Language  | TypeScript 5.x **strict** |
| Styling   | Tailwind CSS **v4** (CSS-first `@theme`, no `tailwind.config.js`) |
| i18n      | next-intl v4 (localized routes) |
| Icons     | lucide-react |
| Lint/format | Biome (replaces ESLint **and** Prettier) |
| Package manager | pnpm |

```bash
pnpm dev        # dev server (http://localhost:3000)
pnpm build      # production build
pnpm typecheck  # tsc --noEmit
pnpm check      # biome check (lint + format, read-only)
pnpm fix        # biome check --write (auto-fix imports/format) — run before committing
```

**Always run `pnpm typecheck` and `pnpm fix` before considering a change done.**

> ⚠️ **Do not upgrade TypeScript past the 5.x line.** Next 16's native TS7
> compiler crashes this build. Pin TS to `5.x`.

## 3. Project structure

```
src/
  app/[locale]/        # routes (RSC). layout.tsx wraps every page.
    page.tsx           # home (composes feature sections)
    how-it-works/  contact/  [...rest]/ (404)  not-found.tsx
    opengraph-image.tsx  icon.tsx  (dynamic OG/icons)
  features/            # page-specific composed sections, grouped by domain
    home/  navigation/  contact/  how-it-works/
  shared/
    ui/                # design-system primitives: Button, Card, Container, Section, SectionHeading
    components/        # cross-cutting pieces: Cta, Faq, JsonLd
    constants/site.ts  # brand, contact, social — SINGLE SOURCE for that data
    lib/               # cn(), seo helpers
  i18n/                # routing.ts (locales), navigation.ts (Link/router), request.ts
  styles/globals.css   # ← ALL theming lives here
messages/              # en/it/de/fr/es .json — mirrored key structure
public/media/          # self-hosted images/video + CREDITS.md
```

**Convention:** server components by default. Add `"use client"` **only** when a
component needs browser APIs, state, or effects (currently: `Navbar`,
`LanguageSwitcher`, `ThemeToggle`, `HeroVideo`).

---

## 4. Theming system (READ THIS BEFORE TOUCHING COLORS)

All theming is CSS-first in **`src/styles/globals.css`**. There is no JS theme
config. Dark is the **default**; light is opt-in via `data-theme="light"`.

### How the tokens are wired

1. **Static tokens** live in `@theme { … }` — these never change with theme:
   - `--color-brand-50 … 900` (indigo accent scale)
   - `--color-panel` (a constant near-black surface for inverted panels)
   - `--radius-*`, `--shadow-*`, `--font-sans`
2. **Semantic colors** are declared in `@theme inline { … }` and point at
   per-theme variables:
   ```css
   @theme inline {
     --color-ink: var(--ink);
     --color-muted: var(--muted);
     --color-surface: var(--surface);
     --color-surface-subtle: var(--surface-subtle);
     --color-border: var(--border);
   }
   ```
   `inline` is required so utilities compile to `var(--ink)` (resolved live per
   theme) instead of freezing a value.
3. **Per-theme values** are set on the root element:
   ```css
   :root { color-scheme: dark;  --ink: …; --surface: …; … }         /* default */
   :root[data-theme="light"] { color-scheme: light; --ink: …; … }   /* opt-in */
   ```

### Theme switching (no flash)

- `ThemeToggle` (client) flips `data-theme` on `<html>` and stores the choice in
  `localStorage.theme`.
- An **inline bootstrap script** in `app/[locale]/layout.tsx` applies the stored
  theme before first paint. `<html>` has `suppressHydrationWarning` because that
  script mutates it pre-hydration.

### RULES for adding/using color

- ✅ **Use semantic utilities** so things adapt automatically:
  `bg-surface`, `bg-surface-subtle`, `text-ink`, `text-muted`, `border-border`.
- ✅ **`brand-*` is a constant accent** in both themes — safe for buttons, links,
  focus rings, small accents.
- ✅ **Inverted "dark panel" (dark bg + white text in BOTH themes):** use
  **`bg-panel text-white`**. Used by the CTA band (`shared/components/Cta.tsx`)
  and the secondary button variant.
- ✅ **Colored icon tiles / soft chips:** use a translucent adaptive tint, e.g.
  `bg-brand-500/10 text-brand-500` (also `emerald`/`sky` variants). These read
  correctly on both light cards and dark cards.
- ✅ **Text over an image/video:** use explicit `text-white`/`text-black` **plus a
  contrast overlay** — do NOT rely on semantic tokens there (see `Hero`).
- ❌ **Never** use `bg-ink` / `bg-white` together with `text-white` for a dark
  panel. `--ink` **flips to near-white in dark mode** → invisible white-on-white.
  This is the #1 theming bug. Use `bg-panel` instead.
- ❌ **Avoid solid light shades** like `bg-brand-50` / `bg-emerald-50` as tile
  backgrounds — they become harsh bright blocks on dark cards. Use `/10` tints.

### Gotcha: new `@theme` tokens + dev server

Tailwind v4 does **not** reliably hot-reload new `@theme` tokens. After adding a
token or changing `@theme`, if styles look stale: **restart `pnpm dev`** and, if
still stale, `rm -rf .next/dev` first. (The production build is always correct;
verify with `pnpm build` + grep the emitted CSS in `.next/static`.)

---

## 5. Internationalization

- Locales: **en, it, de, fr, es**. Default `en`. `localePrefix: "always"`
  (every locale is prefixed, `/en`, `/it`, …). Source: `src/i18n/routing.ts`.
- **Every user-facing string lives in `messages/*.json`.** No hardcoded copy.
- Keys are **mirrored across all 5 files** — when you add a key you MUST add it
  to all five (`en/it/de/fr/es`), translated. Missing keys throw at runtime.
- Namespaces are per-feature: `Hero`, `Problem`, `Services`, `WhyUs`,
  `HowItWorksPreview`, `Process`, `Faq`, `Nav`, `Footer`, `A11y`,
  `ThemeToggle`, `LocaleSwitcher`, `Metadata`, `ContactPage`, …
- Access:
  - `const t = useTranslations("Namespace")` (works in RSC and client).
  - `t.raw("items")` for arrays/objects (cast to a local type).
  - ICU select/plural is used (see `LocaleSwitcher.locale`).
- **Images need localized `imageAlt` keys** in their section's namespace.
- Navigation: import `Link`, `usePathname`, `useRouter` from
  `@/i18n/navigation` (NOT `next/link`/`next/navigation`) so locale is preserved.

---

## 6. UI primitives & patterns

- **`Button` / `buttonVariants({ variant, size, className })`** — variants:
  `primary` (brand), `secondary` (`bg-panel`), `outline`, `ghost`. Use the
  `buttonVariants(...)` class helper to style `<a>` / `<Link>` as buttons.
- **`Section`** — vertical rhythm wrapper; `tone="subtle"` for alternating tinted
  bands (`bg-surface-subtle`); `bare` to skip the inner `Container`.
- **`SectionHeading`** — eyebrow + title + description; `align="left" | "center"`
  (default center). Use `align="left"` inside 2-column layouts.
- **`Container`** — max-width + horizontal padding.
- **`Card`** — bordered surface card.
- **Icons:** lucide-react, always `aria-hidden`, sized with `size-*`.

### Recipe: add a new home section

1. Create `src/features/home/MySection.tsx` (server component).
2. Wrap in `<Section aria-labelledby="my-heading">` + `<SectionHeading id="my-heading" …/>`.
3. Add a `MySection` namespace to **all 5** `messages/*.json`.
4. Import & place it in `src/app/[locale]/page.tsx`.
5. `pnpm typecheck && pnpm fix`.

---

## 7. Media & assets

- Self-host everything in **`public/media/`**; reference via `next/image`
  (`fill` + `sizes` for responsive framed images). Never hotlink a CDN.
- **Hero video:** `HeroVideo` (client) autoplays muted/looping and **honors
  `prefers-reduced-motion`** by showing the poster image instead (WCAG 2.2.2).
  Always ship a `poster`. Keep `<video>` `aria-hidden` (decorative).
- **LICENSING RULE (strict):** only use assets that are **free for commercial
  use with no attribution required**. Approved sources:
  - **Pexels** (Pexels License) — images. Direct pattern:
    `https://images.pexels.com/photos/<id>/pexels-photo-<id>.jpeg?…&w=1200`
  - **Mixkit** (Mixkit Free License) — video. Direct pattern:
    `https://assets.mixkit.co/videos/<id>/<id>-720.mp4`,
    poster `…/<id>-thumb-720-0.jpg`
  - (Unsplash / Pixabay licenses are also acceptable.)
- **Record every asset** in `public/media/CREDITS.md` (file → source id → license).
- Do NOT commit assets from sources that require attribution or forbid
  commercial use, or any stock with a visible watermark.

---

## 8. Performance — Core Web Vitals (always)

Treat **LCP, INP, and CLS** as acceptance criteria for every change, not an
afterthought.

**LCP (largest paint fast):**
- The hero poster is an optimized `next/image` with `priority` — it is the LCP
  element, never the video. Keep exactly **one** `priority` image above the fold.
- Below-the-fold images stay lazy (default) so they don't contend with LCP.
- Heavy media (video) is **deferred to `requestIdleCallback`** and uses
  `preload="none"` — it must never block first paint. See `HeroVideo`.
- Fonts: `next/font` (self-hosted, `display: "swap"`) — don't add remote fonts.

**CLS (no layout shift):**
- Every image/video sits in a **fixed-size container** (`aspect-[x/y]` or the
  hero's `min-h`) with `fill` + `object-cover`. Always reserve space.
- Media cross-fades with `opacity`, never by resizing.
- Use **`svh`** (not `vh`) for full-height sections so mobile chrome show/hide
  doesn't reflow. The hero is `min-h-[calc(100svh-4rem)]`.
- Gate any theme/DOM-dependent icon on a `mounted` flag to avoid hydration
  swaps that shift layout (see `ThemeToggle`).

**INP (responsive interactions):**
- Keep client JS minimal; prefer server components. Only `Navbar`,
  `LanguageSwitcher`, `ThemeToggle`, `HeroVideo` are client.
- No heavy synchronous work in event handlers; theme toggle just flips an attr.

**Data / respect the user:** skip the autoplay video for
`prefers-reduced-motion`, `navigator.connection.saveData`, and 2g connections.

**Verify:** after UI changes run `pnpm build` and sanity-check with Lighthouse /
the browser Performance panel before calling it done.

## 9. Accessibility & SEO

- Respect `prefers-reduced-motion` (CSS animations are neutralized in
  `globals.css`; video falls back to poster).
- Keep the skip-link, `:focus-visible` ring, `aria-label`s, and semantic
  headings intact. Decorative media is `aria-hidden`.
- SEO helpers in `src/shared/lib/seo.ts` (`buildMetadata`, `organizationJsonLd`);
  structured data via `JsonLd`. `sitemap.ts`, `robots.ts`, `manifest.ts`, and
  `opengraph-image.tsx` are generated — update them when routes/brand change.
- Brand/contact data comes from `src/shared/constants/site.ts` — edit there, not
  inline.

## 10. Code style (Biome)

- Double quotes, semicolons, trailing commas, 2-space indent, 100 col width.
- Imports are auto-organized — run `pnpm fix` (don't hand-order imports).
- `useExhaustiveDependencies` and `noConsole` are **warnings**; `console.warn`/
  `console.error` are allowed.
- Config: `biome.json`. CSS linting is enabled with Tailwind directive support.

## 11. Quick gotcha checklist

- [ ] New color? Use semantic/`brand`/`panel` utilities — never `bg-ink`+`text-white`.
- [ ] Bright tile? Use `bg-*-500/10` tint, not `bg-*-50`.
- [ ] New string? Added to **all 5** message files.
- [ ] New image? `next/image`, localized `imageAlt`, logged in `CREDITS.md`,
      license verified free/commercial/no-attribution.
- [ ] Above-fold image? Exactly one `priority` `next/image`; heavy media deferred.
- [ ] New media? Fixed-size container (`aspect-*` / `min-h`) so there's zero CLS.
- [ ] Edited `@theme`? Restart dev server (and `rm -rf .next/dev` if stale).
- [ ] Before done: `pnpm typecheck` + `pnpm fix` clean.
- [ ] Don't upgrade TypeScript past 5.x.
