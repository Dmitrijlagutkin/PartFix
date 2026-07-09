import { MessageCircle, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { contactLinks } from "@/shared/constants/site";
import { buttonVariants } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { HeroVideo } from "./HeroVideo";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="relative isolate overflow-hidden">
      <HeroVideo src="/media/hero-3d-printer.mp4" poster="/media/hero-3d-printer-poster.jpg" />

      {/* Legibility overlay: dark gradient with a subtle brand glow. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-br from-black/85 via-black/70 to-black/50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(55%_55%_at_15%_0%,color-mix(in_oklab,var(--color-brand-600)_40%,transparent),transparent)]"
      />

      {/* Full viewport height minus the 4rem (h-16) sticky navbar. `svh` keeps
          the height stable when mobile browser chrome shows/hides (avoids CLS). */}
      <Container className="flex min-h-[calc(100svh-4rem)] flex-col items-start justify-center gap-6 py-16 sm:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-white/90 backdrop-blur-sm">
          <Sparkles aria-hidden className="size-4 text-brand-300" />
          {t("badge")}
        </span>

        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">
          {t("title")}
        </h1>

        <p className="max-w-xl text-lg leading-relaxed text-pretty text-white/80">
          {t("subtitle")}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className={buttonVariants({ size: "lg" })}>
            {t("ctaPrimary")}
          </Link>
          <a
            href={contactLinks.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "border-white/25 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20",
            })}
          >
            <MessageCircle aria-hidden className="size-5" />
            {t("ctaSecondary")}
          </a>
        </div>

        <p className="text-sm text-white/70">{t("trust")}</p>
      </Container>
    </section>
  );
}
