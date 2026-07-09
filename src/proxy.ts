import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

// Next.js 16 "proxy" convention (formerly `middleware.ts`). next-intl's
// handler is fully compatible — it detects the locale and rewrites/redirects
// to the correct localized route.
export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - API routes
  // - Next.js internals (/_next, /_vercel)
  // - the generated /icon metadata route (dotless, so not caught by the rule below)
  // - static files (anything containing a dot, e.g. favicon.ico, sitemap.xml)
  matcher: ["/((?!api|_next|_vercel|icon|.*\\..*).*)"],
};
