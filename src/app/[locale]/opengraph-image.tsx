import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/shared/constants/site";

export const alt = siteConfig.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

/** Dynamically generated OpenGraph / Twitter card image, per locale. */
export default async function OpengraphImage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.home" });

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "80px",
        background: "linear-gradient(135deg, #1c1c22 0%, #2a2358 100%)",
        color: "white",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: 40,
          fontWeight: 600,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "#6d5efc",
            display: "flex",
          }}
        />
        {siteConfig.name}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 900 }}>
          {t("title")}
        </div>
        <div style={{ fontSize: 30, color: "rgba(255,255,255,0.7)", maxWidth: 900 }}>
          {t("description")}
        </div>
      </div>
    </div>,
    size,
  );
}
