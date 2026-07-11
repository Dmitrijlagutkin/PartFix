"use client";

import { Loader2, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { type ComponentProps, useState } from "react";
import { siteConfig, web3formsAccessKey } from "@/shared/constants/site";
import { cn } from "@/shared/lib/cn";
import { buttonVariants } from "@/shared/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

// React 19 deprecated the `FormEvent` alias; derive the handler's event type
// from the form element's own `onSubmit` prop instead.
type FormSubmitEvent = Parameters<NonNullable<ComponentProps<"form">["onSubmit"]>>[0];

const fieldClass = cn(
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink",
  "placeholder:text-muted transition-colors focus-visible:outline-none",
  "focus-visible:border-brand-600",
);

/**
 * Reliable, backend-free contact form. Posts JSON to Web3Forms which relays the
 * submission to our inbox — no mail client needed, so it works everywhere
 * `mailto:` does not. Includes a honeypot field for spam.
 */
export function ContactForm() {
  const t = useTranslations("ContactPage.form");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormSubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Honeypot: real users leave it empty; bots fill it. Silently succeed.
    if (data.get("botcheck")) {
      setStatus("success");
      form.reset();
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: web3formsAccessKey,
          subject: t("emailSubject"),
          from_name: siteConfig.name,
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-8 text-center shadow-soft">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
          <Send aria-hidden className="size-5" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">{t("successTitle")}</h3>
        <p className="mt-2 text-sm text-muted">{t("successBody")}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-6")}
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto grid max-w-xl gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft sm:p-8"
    >
      {/* Honeypot — visually hidden, off the tab order, ignored by real users. */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium">
          {t("nameLabel")}
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          {t("emailLabel")}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          className={fieldClass}
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="message" className="text-sm font-medium">
          {t("messageLabel")}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-500">
          {t("errorBody")}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={buttonVariants({ variant: "primary", size: "lg", className: "mt-2 w-full" })}
      >
        {submitting ? (
          <Loader2 aria-hidden className="size-5 animate-spin" />
        ) : (
          <Send aria-hidden className="size-5" />
        )}
        {submitting ? t("submitting") : t("submit")}
      </button>

      <p className="text-center text-xs text-muted">{t("privacyNote")}</p>
    </form>
  );
}
