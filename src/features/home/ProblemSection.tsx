import { Clock, PackageX, Recycle } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/shared/ui/Card";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";

const ICONS = [PackageX, Clock, Recycle] as const;

type Point = { title: string; description: string };

export function ProblemSection() {
  const t = useTranslations("Problem");
  const points = t.raw("points") as Point[];

  return (
    <Section id="problem" tone="subtle" aria-labelledby="problem-heading">
      <SectionHeading
        id="problem-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {points.map((point, index) => {
          const Icon = ICONS[index % ICONS.length] ?? PackageX;
          return (
            <Card key={point.title}>
              <div className="flex size-11 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                <Icon aria-hidden className="size-5" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{point.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{point.description}</p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
}
