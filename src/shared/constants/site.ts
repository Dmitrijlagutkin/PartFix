import { routing } from "@/i18n/routing";

/**
 * Central, framework-agnostic configuration for the site. Keeping contact
 * details and brand data here means a single edit updates every page,
 * the footer, structured data and the contact links.
 */
export const siteConfig = {
  name: "PartFix",
  legalName: "PartFix",
  domain: "part-fix.vercel.app",
  // Falls back to the current production domain so builds work without env config.
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://part-fix.vercel.app").replace(/\/$/, ""),
  defaultLocale: routing.defaultLocale,
  locales: routing.locales,
  contact: {
    email: "dmitrijlagutkin@gmail.com",
    // Digits only, international format (no "+", no spaces) for wa.me links.
    whatsapp: "393792962006",
    telegram: "Dmitry_Lagutkin",
  },
  social: {
    instagram: "https://instagram.com/partfix",
    linkedin: "https://www.linkedin.com/company/partfix",
  },
} as const;

export const contactLinks = {
  email: `mailto:${siteConfig.contact.email}`,
  whatsapp: `https://wa.me/${siteConfig.contact.whatsapp}`,
  telegram: `https://t.me/${siteConfig.contact.telegram}`,
} as const;

/**
 * Web3Forms access key powers the static contact form (no backend required).
 * It is a public routing key — safe to expose client-side — so we read it from
 * a `NEXT_PUBLIC_` env var. Get a free key at https://web3forms.com and set
 * `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in `.env.local` / Vercel project settings.
 */
export const web3formsAccessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";
