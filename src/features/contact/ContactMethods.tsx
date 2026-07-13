// Send is used by the commented-out Telegram method below.
import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { contactLinks, siteConfig } from "@/shared/constants/site";
import { cn } from "@/shared/lib/cn";
import { CopyButton } from "@/shared/ui/CopyButton";

export function ContactMethods() {
  const t = useTranslations("ContactPage.methods");

  return (
    <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft">
        <span className="flex items-center justify-between">
          <span
            className={cn(
              "flex size-11 items-center justify-center rounded-xl",
              "bg-brand-500/10 text-brand-500",
            )}
          >
            <Mail aria-hidden className="size-5" />
          </span>
        </span>
        <span>
          <span className="block font-semibold">{t("email.label")}</span>
          <span className="mt-1 block text-sm text-muted">{siteConfig.contact.email}</span>
        </span>
        <span className="text-sm text-muted">{t("email.description")}</span>
        <span className="-ml-2.5 flex flex-wrap items-center gap-1">
          <CopyButton
            value={siteConfig.contact.email}
            copyLabel={t("email.copy")}
            copiedLabel={t("email.copied")}
          />
          <a
            href={contactLinks.email}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-muted transition-colors hover:bg-surface-subtle hover:text-ink"
          >
            <ArrowUpRight aria-hidden className="size-4" />
            {t("email.open")}
          </a>
        </span>
      </div>

      <a
        href={contactLinks.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
      >
        <span className="flex items-center justify-between">
          <span
            className={cn(
              "flex size-11 items-center justify-center rounded-xl",
              "bg-emerald-500/10 text-emerald-500",
            )}
          >
            <MessageCircle aria-hidden className="size-5" />
          </span>
          <ArrowUpRight
            aria-hidden
            className="size-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>
        <span>
          <span className="block font-semibold">{t("whatsapp.label")}</span>
          <span className="mt-1 block text-sm text-muted">{t("whatsapp.description")}</span>
        </span>
      </a>

      {/* TODO: restore the Telegram card (bump the wrapper to `max-w-3xl …
          sm:grid-cols-3`) once that account is live. */}
    </div>
  );
}
