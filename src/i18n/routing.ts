import { defineRouting } from "next-intl/routing";

/**
 * Single source of truth for supported locales and routing behaviour.
 * `localePrefix: "always"` guarantees every locale — including the default —
 * gets an explicit prefix (`/en`, `/it`, …) which is the correct choice for SEO.
 */
export const routing = defineRouting({
  locales: ["en", "it", "de", "fr", "es"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
