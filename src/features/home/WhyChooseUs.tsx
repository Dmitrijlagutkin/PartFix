import { BadgeCheck, Euro, Leaf, ShieldCheck, Timer, Truck } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";

const ICONS = [BadgeCheck, Timer, Euro, Truck, ShieldCheck, Leaf] as const;

type Reason = { title: string; description: string };

export function WhyChooseUs() {
  const t = useTranslations("WhyUs");
  const items = t.raw("items") as Reason[];

  return (
    <Section id="why-us" aria-labelledby="why-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border shadow-card">
          <Image
            src="/media/printer-filament.jpg"
            alt={t("imageAlt")}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div>
          <SectionHeading
            id="why-heading"
            align="left"
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
          />
          <ul className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {items.map((reason, index) => {
              const Icon = ICONS[index % ICONS.length] ?? BadgeCheck;
              return (
                <li key={reason.title} className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-500/10 text-brand-500">
                    <Icon aria-hidden className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{reason.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{reason.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
