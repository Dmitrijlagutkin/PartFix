import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/shared/ui/Button";
import { Section } from "@/shared/ui/Section";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <Section className="flex min-h-[60vh] items-center">
      <div className="mx-auto flex max-w-md flex-col items-center gap-6 text-center">
        <span className="text-6xl font-semibold tracking-tight text-brand-600">404</span>
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <p className="text-muted">{t("description")}</p>
        <Link href="/" className={buttonVariants()}>
          {t("cta")}
        </Link>
      </div>
    </Section>
  );
}
