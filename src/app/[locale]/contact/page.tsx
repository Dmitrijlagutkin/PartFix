import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
// Contact form hidden until the site is indexed — restore the import and the
// <ContactForm /> block below to bring it back.
// import { ContactForm } from "@/features/contact/ContactForm";
import { ContactMethods } from "@/features/contact/ContactMethods";
import type { Locale } from "@/i18n/routing";
import { buildMetadata } from "@/shared/lib/seo";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.contact" });
  return buildMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    path: "/contact",
  });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ContactPage");

  return (
    <Section aria-labelledby="contact-heading">
      <SectionHeading
        id="contact-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      {/* Contact form hidden until the site is indexed — restore this block
          (and the import above) to bring it back.
      <div className="mt-14">
        <ContactForm />
      </div>
      <p className="mx-auto mt-10 mb-10 max-w-2xl text-center text-sm text-muted">
        {t("orReachUs")}
      </p>
      */}
      <div className="mt-14">
        <ContactMethods />
      </div>
      <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted">{t("responseNote")}</p>
    </Section>
  );
}
