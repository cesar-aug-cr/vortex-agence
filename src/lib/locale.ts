import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/routes";

/**
 * Build the public, locale-prefixed URL for a CANONICAL internal path.
 * The first path segment is translated to the locale's slug, so
 * `localized("es", "/agence")` → `/es/agencia` and
 * `localized("de", "/services/sites-web")` → `/de/leistungen/sites-web`.
 */
export function localized(lang: Locale | string, path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  if (path === "/") return `/${lang}`;
  return `/${lang}${localizePath(lang, path)}`;
}
