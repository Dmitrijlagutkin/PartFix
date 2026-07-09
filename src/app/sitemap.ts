import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/shared/constants/site";

/** Paths without locale prefix. Add new pages here as the site grows. */
const PATHS = ["", "/how-it-works", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, `${siteConfig.url}/${locale}${path}`]),
    );

    return routing.locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${path}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
