import type { MetadataRoute } from "next";
import { site, mainRoutes, serviceSlugs, subServiceRoutes } from "@/lib/site";
import { newsSlugs } from "@/i18n/news";
import { localized } from "@/lib/locale";
import { fr } from "@/i18n/dictionaries/fr";

/**
 * Site-wide lastmod for the static pages. Bump this when page copy actually
 * changes (i.e. at each content deploy). Never `new Date()`: a lastmod that
 * changes on every build is unreliable and gets ignored by Google.
 */
const SITE_LASTMOD = new Date("2026-07-11");

/** Per-article lastmod, sourced from the dictionary (updated ?? date). */
const NEWS_LASTMOD = new Map<string, Date>(
  fr.news.articles.map((a) => [a.slug, new Date(a.updated || a.date)])
);

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Routes that are noindex — must not appear in the sitemap.
  const noindex = new Set(["mentions-legales", "confidentialite", "cookies"]);

  // All page paths (relative to /<lang>), with their priority + frequency.
  const paths: {
    path: string;
    priority: number;
    freq: "weekly" | "monthly";
    lastmod: Date;
  }[] = [];
  for (const route of mainRoutes) {
    if (noindex.has(route)) continue;
    paths.push({
      path: route ? `/${route}` : "",
      priority: route === "" ? 1 : 0.7,
      freq: route === "" ? "weekly" : "monthly",
      lastmod: SITE_LASTMOD,
    });
  }
  for (const slug of serviceSlugs) {
    paths.push({ path: `/services/${slug}`, priority: 0.8, freq: "monthly", lastmod: SITE_LASTMOD });
  }
  for (const { parent, child } of subServiceRoutes) {
    paths.push({ path: `/services/${parent}/${child}`, priority: 0.7, freq: "monthly", lastmod: SITE_LASTMOD });
  }
  for (const slug of newsSlugs) {
    paths.push({
      path: `/news/${slug}`,
      priority: 0.6,
      freq: "monthly",
      lastmod: NEWS_LASTMOD.get(slug) ?? SITE_LASTMOD,
    });
  }

  // One entry per (path × locale), each carrying hreflang alternates for the
  // whole language set (+ x-default → default locale) so search engines link
  // the translations together — mirrors lib/metadata.ts.
  for (const { path, priority, freq, lastmod } of paths) {
    const languages: Record<string, string> = Object.fromEntries(
      site.locales.map((l) => [l, `${site.url}${localized(l, path)}`])
    );
    languages["x-default"] = `${site.url}${localized(site.defaultLocale, path)}`;

    for (const lang of site.locales) {
      entries.push({
        url: `${site.url}${localized(lang, path)}`,
        lastModified: lastmod,
        changeFrequency: freq,
        priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
