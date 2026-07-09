import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation APIs. Always import `Link`, `redirect`,
 * `usePathname`, `useRouter` and `getPathname` from here instead of `next/*`
 * so that the active locale prefix is handled automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
