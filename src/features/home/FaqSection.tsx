import { useTranslations } from "next-intl";
import { Faq, type FaqItem } from "@/shared/components/Faq";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";

export function FaqSection() {
  const t = useTranslations("Faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <Section id="faq" tone="subtle" aria-labelledby="faq-heading">
      <SectionHeading
        id="faq-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <div className="mt-14">
        <Faq items={items} />
      </div>
    </Section>
  );
}
