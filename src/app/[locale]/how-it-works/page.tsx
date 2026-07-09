import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaSection } from "@/features/home/CtaSection";
import { ProcessSteps } from "@/features/how-it-works/ProcessSteps";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/shared/lib/seo";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.howItWorks" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/how-it-works",
  });
}

export default async function HowItWorksPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HowItWorksPage");

  return (
    <>
      <Section aria-labelledby="hiw-heading" className="pb-8">
        <SectionHeading
          id="hiw-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
      </Section>
      <Section className="pt-0" aria-label={t("title")}>
        <ProcessSteps />
      </Section>
      <CtaSection />
    </>
  );
}
