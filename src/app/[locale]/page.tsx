import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaSection } from "@/features/home/CtaSection";
import { FaqSection } from "@/features/home/FaqSection";
import { Hero } from "@/features/home/Hero";
import { HowItWorksPreview } from "@/features/home/HowItWorksPreview";
import { ProblemSection } from "@/features/home/ProblemSection";
import { Services } from "@/features/home/Services";
import { WhyChooseUs } from "@/features/home/WhyChooseUs";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/shared/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.home" });
  return buildMetadata({ locale, title: t("title"), description: t("description"), path: "" });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ProblemSection />
      <HowItWorksPreview />
      <Services />
      <WhyChooseUs />
      <FaqSection />
      <CtaSection />
    </>
  );
}
