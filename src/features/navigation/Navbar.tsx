"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";
import { buttonVariants } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/how-it-works", key: "howItWorks" },
  { href: "/contact", key: "contact" },
] as const;

export function Navbar() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes. `pathname` is an
  // intentional trigger-only dependency, not read inside the effect.
  // biome-ignore lint/correctness/useExhaustiveDependencies: reset menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-surface/80 backdrop-blur-md">
      <Container>
        <nav aria-label={t("primary")} className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center rounded-full" aria-label={t("brand")}>
            <Logo />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-surface-subtle",
                    isActive(link.href) ? "text-ink" : "text-muted",
                  )}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link href="/contact" className={buttonVariants({ size: "sm" })}>
              {t("getQuote")}
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-subtle md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </nav>
      </Container>

      {open ? (
        <div id="mobile-menu" className="border-t border-border md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-surface-subtle",
                  isActive(link.href) ? "text-ink" : "text-muted",
                )}
              >
                {t(link.key)}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-border pt-4">
              <div className="flex items-center gap-3">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
              <Link href="/contact" className={buttonVariants({ size: "sm", className: "flex-1" })}>
                {t("getQuote")}
              </Link>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
