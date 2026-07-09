import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { Footer } from "@/features/navigation/Footer";
import { Navbar } from "@/features/navigation/Navbar";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { JsonLd } from "@/shared/components/JsonLd";
import { siteConfig } from "@/shared/constants/site";
import { organizationJsonLd } from "@/shared/lib/seo";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#16171d",
  colorScheme: "dark light",
};

// Runs before paint to apply the persisted theme, preventing a flash of the
// default (dark) theme for visitors who selected light. Kept dependency-free
// and inlined so it executes synchronously during HTML parsing.
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`;

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("defaultTitle"),
      template: `%s · ${siteConfig.name}`,
    },
    description: t("defaultDescription"),
    applicationName: siteConfig.name,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enables static rendering for this locale.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "A11y" });
  const jsonLd = organizationJsonLd(locale as Locale);

  return (
    <html lang={locale} className={inter.variable} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col font-sans antialiased">
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, non-user theme bootstrap script */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd data={jsonLd} />
        <NextIntlClientProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brand-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            {t("skipToContent")}
          </a>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
