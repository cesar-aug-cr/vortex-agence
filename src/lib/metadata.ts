import type { Metadata } from "next";
import { i18n, type Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { localized } from "@/lib/locale";

/** hreflang alternates for a path across every shipped locale (+ x-default). */
function languageAlternates(path: string): Record<string, string> {
  const langs: Record<string, string> = {};
  for (const l of i18n.locales) langs[l] = localized(l, path);
  langs["x-default"] = localized(i18n.defaultLocale, path);
  return langs;
}

/** OpenGraph locale per language. */
const ogLocale: Record<string, string> = {
  fr: "fr_LU",
  en: "en_GB",
  de: "de_LU",
  es: "es_ES",
};

/**
 * Build per-page metadata with a localized canonical + OpenGraph/Twitter.
 * `metadataBase` is set once in the root layout, so relative URLs resolve.
 * Titles are passed verbatim (the dictionary titles already carry the brand),
 * so the layout title template stays "%s" to avoid double-branding.
 */
export function buildMetadata({
  lang,
  path,
  title,
  description,
  index = true,
}: {
  lang: Locale;
  path: string;
  title: string;
  description: string;
  index?: boolean;
}): Metadata {
  const url = localized(lang, path);
  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type: "website",
      locale: ogLocale[lang] ?? "fr_LU",
      siteName: site.name,
      title,
      description,
      url,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}
