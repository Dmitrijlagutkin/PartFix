import { useTranslations } from "next-intl";
import { Cta } from "@/shared/components/Cta";

export function CtaSection() {
  const t = useTranslations("Cta");
  return (
    <Cta
      title={t("title")}
      subtitle={t("subtitle")}
      primaryLabel={t("primary")}
      secondaryLabel={t("secondary")}
    />
  );
}
