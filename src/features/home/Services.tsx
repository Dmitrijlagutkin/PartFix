import { Boxes, PenTool, Printer, Ruler } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/ui/Card";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";

const ICONS = [PenTool, Boxes, Printer, Ruler] as const;

type Service = { title: string; description: string };

export function Services() {
  const t = useTranslations("Services");
  const items = t.raw("items") as Service[];

  return (
    <Section id="services" tone="subtle" aria-labelledby="services-heading">
      <SectionHeading
        id="services-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        {items.map((service, index) => {
          const Icon = ICONS[index % ICONS.length] ?? PenTool;
          return (
            <Card key={service.title} className="flex gap-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                <Icon aria-hidden className="size-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{service.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
