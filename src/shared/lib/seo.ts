import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/shared/constants/site";

/** OpenGraph `locale` codes keyed by our short locale codes. */
const OG_LOCALES: Record<Locale, string> = {
  en: "en_US",
  it: "it_IT",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  uk: "uk_UA",
};

type BuildMetadataArgs = {
  locale: Locale;
  title: string;
  description: string;
  /** Path without the locale prefix, e.g. "/how-it-works". Use "" for home. */
  path?: string;
};

/**
 * Build a fully-formed `Metadata` object with canonical URL, hreflang
 * alternates for every locale, OpenGraph and Twitter cards. Every page's
 * `generateMetadata` should delegate here to stay consistent.
 */
export function buildMetadata({
  locale,
  title,
  description,
  path = "",
}: BuildMetadataArgs): Metadata {
  const canonical = `${siteConfig.url}/${locale}${path}`;

  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${siteConfig.url}/${l}${path}`]),
  );
  // x-default points at the default locale for search engines.
  languages["x-default"] = `${siteConfig.url}/${routing.defaultLocale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      locale: OG_LOCALES[locale],
      // The `opengraph-image` file convention auto-populates the image here.
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * Organization + LocalBusiness structured data (JSON-LD). Rendered once in the
 * root layout so it appears on every page.
 */
export function organizationJsonLd(locale: Locale) {
  const url = `${siteConfig.url}/${locale}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#organization`,
        name: siteConfig.name,
        legalName: siteConfig.legalName,
        url,
        email: siteConfig.contact.email,
        sameAs: [siteConfig.social.instagram, siteConfig.social.linkedin],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${siteConfig.url}/#localbusiness`,
        name: siteConfig.name,
        url,
        email: siteConfig.contact.email,
        priceRange: "€€",
        areaServed: "EU",
        parentOrganization: { "@id": `${siteConfig.url}/#organization` },
      },
    ],
  };
}
