import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";
import { site } from "@/lib/site";
import { localized } from "@/lib/locale";

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
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "fr_LU",
      siteName: site.name,
      title,
      description,
      url,
    },
    twitter: { card: "summary_large_image", title, description },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}
