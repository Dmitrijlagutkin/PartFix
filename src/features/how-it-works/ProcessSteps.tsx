import { Camera, Cog, Package, Printer, Ruler } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [Camera, Ruler, Cog, Printer, Package] as const;

type Step = { title: string; description: string };

/** Vertical numbered timeline of the full process. */
export function ProcessSteps() {
  const t = useTranslations("Process");
  const steps = t.raw("steps") as Step[];

  return (
    <ol className="mx-auto flex max-w-3xl flex-col">
      {steps.map((step, index) => {
        const Icon = ICONS[index % ICONS.length] ?? Camera;
        const isLast = index === steps.length - 1;
        return (
          <li key={step.title} className="relative flex gap-6 pb-12 last:pb-0">
            {!isLast ? (
              <span
                aria-hidden
                className="absolute top-12 left-6 h-[calc(100%-3rem)] w-px bg-border"
              />
            ) : null}
            <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-soft">
              <Icon aria-hidden className="size-5" />
            </div>
            <div className="pt-1">
              <span className="text-sm font-semibold text-brand-600">
                {t("stepLabel", { number: index + 1 })}
              </span>
              <h3 className="mt-1 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
