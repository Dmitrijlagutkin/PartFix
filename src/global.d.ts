import type { routing } from "@/i18n/routing";
import type messages from "../messages/en.json";

// Augments next-intl with app-specific types so `useTranslations` keys and
// the active `Locale` are fully type-checked.
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
