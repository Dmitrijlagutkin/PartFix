import { Mail } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { contactLinks } from "@/shared/constants/site";
import { buttonVariants } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

type CtaProps = {
  title: string;
  subtitle: string;
  primaryLabel: string;
  secondaryLabel: string;
};

/** Full-width conversion band, reused on the home and how-it-works pages. */
export function Cta({ title, subtitle, primaryLabel, secondaryLabel }: CtaProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-panel px-6 py-16 text-center shadow-card sm:px-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(60%_60%_at_50%_0%,var(--color-brand-600),transparent)]"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
              {title}
            </h2>
            <p className="text-lg text-pretty text-white/70">{subtitle}</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className={buttonVariants({ variant: "primary", size: "lg" })}>
                {primaryLabel}
              </Link>
              {/* TODO: switch back to WhatsApp once the account is live:
                  href={contactLinks.whatsapp} with target/rel and <MessageCircle /> */}
              <a
                href={contactLinks.email}
                className={buttonVariants({
                  variant: "outline",
                  size: "lg",
                  className: "border-white/20 bg-white/5 text-white hover:bg-white/10",
                })}
              >
                <Mail aria-hidden className="size-5" />
                {secondaryLabel}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
