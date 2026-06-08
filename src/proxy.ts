import { NextResponse, type NextRequest } from "next/server";
import { i18n } from "@/i18n/config";

/**
 * Locale routing (Next 16 "proxy" convention, formerly "middleware").
 * Every page lives under /<locale>/… ; requests without a locale prefix
 * are redirected to the default locale. Files, _next and api are excluded
 * via the matcher below.
 */
/** Pick the best supported locale from the Accept-Language header. */
function preferredLocale(req: NextRequest): string {
  const header = req.headers.get("accept-language");
  if (!header) return i18n.defaultLocale;
  // e.g. "de-DE,de;q=0.9,en;q=0.8" → ["de","de","en"]
  const wanted = header
    .split(",")
    .map((part) => part.split(";")[0].trim().slice(0, 2).toLowerCase())
    .filter(Boolean);
  for (const code of wanted) {
    const hit = i18n.locales.find((l) => l === code);
    if (hit) return hit;
  }
  return i18n.defaultLocale;
}

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const hasLocale = i18n.locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );
  if (hasLocale) return;

  const locale = preferredLocale(req);
  const target = pathname === "/" ? "" : pathname;
  return NextResponse.redirect(new URL(`/${locale}${target}${search}`, req.url));
}

export const config = {
  // Exclude _next, api, dotted files, AND Next's extensionless metadata routes
  // (icon, opengraph-image…) — otherwise "/icon" gets redirected to "/fr/icon"
  // which 404s (those routes live at the root, not under /<locale>).
  matcher: [
    "/",
    "/((?!_next|api|icon|apple-icon|opengraph-image|twitter-image|manifest|sitemap|robots|favicon|.*\\..*).*)",
  ],
};
