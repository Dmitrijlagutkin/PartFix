import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/shared/ui/Button";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";

type Step = { title: string; description: string };

export function HowItWorksPreview() {
  const t = useTranslations("HowItWorksPreview");
  const tProcess = useTranslations("Process");
  const steps = tProcess.raw("steps") as Step[];

  return (
    <Section id="how-it-works" aria-labelledby="how-heading">
      <SectionHeading
        id="how-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="relative mt-14 aspect-[21/9] overflow-hidden rounded-3xl border border-border shadow-card">
        <Image
          src="/media/printer-part.jpg"
          alt={t("imageAlt")}
          fill
          sizes="(min-width: 1024px) 72rem, 100vw"
          className="object-cover"
        />
      </div>

      <ol className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li key={step.title} className="relative flex flex-col gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-600 text-sm font-semibold text-white">
              {index + 1}
            </span>
            <h3 className="text-base font-semibold">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-12 flex justify-center">
        <Link href="/how-it-works" className={buttonVariants({ variant: "outline" })}>
          {t("cta")}
          <ArrowRight aria-hidden className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
