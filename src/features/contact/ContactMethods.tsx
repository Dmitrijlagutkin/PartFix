// MessageCircle & Send are used by the commented-out WhatsApp/Telegram methods below.
import { ArrowUpRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import { contactLinks, siteConfig } from "@/shared/constants/site";
import { cn } from "@/shared/lib/cn";

type Method = {
  key: "email" | "whatsapp" | "telegram";
  href: string;
  value: string;
  external: boolean;
  Icon: typeof Mail;
  accent: string;
};

const METHODS: Method[] = [
  {
    key: "email",
    href: contactLinks.email,
    value: siteConfig.contact.email,
    external: false,
    Icon: Mail,
    accent: "bg-brand-500/10 text-brand-500",
  },
  // TODO: uncomment WhatsApp & Telegram once the accounts are live.
  // {
  //   key: "whatsapp",
  //   href: contactLinks.whatsapp,
  //   value: "WhatsApp",
  //   external: true,
  //   Icon: MessageCircle,
  //   accent: "bg-emerald-500/10 text-emerald-500",
  // },
  // {
  //   key: "telegram",
  //   href: contactLinks.telegram,
  //   value: `@${siteConfig.contact.telegram}`,
  //   external: true,
  //   Icon: Send,
  //   accent: "bg-sky-500/10 text-sky-500",
  // },
];

export function ContactMethods() {
  const t = useTranslations("ContactPage.methods");

  // TODO: restore `max-w-3xl … sm:grid-cols-3` when WhatsApp/Telegram return.
  return (
    <div className="mx-auto grid max-w-md gap-4">
      {METHODS.map(({ key, href, value, external, Icon, accent }) => (
        <a
          key={key}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="group flex flex-col gap-4 rounded-2xl border border-border bg-surface p-6 shadow-soft transition-shadow hover:shadow-card"
        >
          <span className="flex items-center justify-between">
            <span className={cn("flex size-11 items-center justify-center rounded-xl", accent)}>
              <Icon aria-hidden className="size-5" />
            </span>
            <ArrowUpRight
              aria-hidden
              className="size-5 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
          <span>
            <span className="block font-semibold">{t(`${key}.label`)}</span>
            <span className="mt-1 block text-sm text-muted">{value}</span>
          </span>
          <span className="text-sm text-muted">{t(`${key}.description`)}</span>
        </a>
      ))}
    </div>
  );
}
