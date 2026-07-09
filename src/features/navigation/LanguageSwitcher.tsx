"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { type ChangeEvent, useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { type Locale, routing } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";

/**
 * Locale switcher backed by a native <select> — accessible, keyboard-friendly
 * and dependency-free. Preserves the current pathname when switching locales.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function onChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      // Re-navigate to the same pathname under the newly selected locale.
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className={cn("relative inline-flex items-center", className)}>
      <Globe aria-hidden className="pointer-events-none absolute left-2.5 size-4 text-muted" />
      <select
        aria-label={t("label")}
        value={locale}
        onChange={onChange}
        disabled={isPending}
        className="h-9 cursor-pointer appearance-none rounded-full border border-border bg-surface py-0 pr-8 pl-8 text-sm font-medium text-ink transition-colors hover:bg-surface-subtle focus-visible:outline-none disabled:opacity-60"
      >
        {routing.locales.map((cur) => (
          <option key={cur} value={cur}>
            {t("locale", { locale: cur })}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="pointer-events-none absolute right-2.5 size-4 text-muted"
        fill="none"
        stroke="currentColor"
      >
        <path d="m6 8 4 4 4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
