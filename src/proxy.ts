import { NextResponse, type NextRequest } from "next/server";
import { i18n } from "@/i18n/config";

/**
 * Locale routing (Next 16 "proxy" convention, formerly "middleware").
 * Every page lives under /<locale>/… ; requests without a locale prefix
 * are redirected to the default locale. Files, _next and api are excluded
 * via the matcher below.
 */
export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const hasLocale = i18n.locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const locale = i18n.defaultLocale;
  const target = pathname === "/" ? "" : pathname;
  return NextResponse.redirect(new URL(`/${locale}${target}${search}`, req.url));
}

export const config = {
  matcher: ["/", "/((?!_next|api|.*\\..*).*)"],
};
