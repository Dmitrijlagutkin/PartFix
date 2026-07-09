import { Mail, MessageCircle, Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { contactLinks, siteConfig } from "@/shared/constants/site";
import { Container } from "@/shared/ui/Container";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/", key: "home" },
  { href: "/how-it-works", key: "howItWorks" },
  { href: "/contact", key: "contact" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");

  return (
    <footer className="border-t border-border bg-surface-subtle">
      <Container className="py-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">{t("tagline")}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-2">
            <nav aria-label={t("navTitle")}>
              <h2 className="text-sm font-semibold text-ink">{t("navTitle")}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors hover:text-ink"
                    >
                      {tNav(link.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="text-sm font-semibold text-ink">{t("contactTitle")}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                <li>
                  <a
                    href={contactLinks.email}
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <Mail aria-hidden className="size-4" />
                    {siteConfig.contact.email}
                  </a>
                </li>
                <li>
                  <a
                    href={contactLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <MessageCircle aria-hidden className="size-4" />
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a
                    href={contactLinks.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
                  >
                    <Send aria-hidden className="size-4" />
                    Telegram
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
