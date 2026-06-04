import type { Locale } from "@/i18n/config";

/** Prefix an internal path with the active locale. */
export function localized(lang: Locale | string, path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `/${lang}${path === "/" ? "" : path}`;
}
