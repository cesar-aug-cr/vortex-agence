import type { MetadataRoute } from "next";
import { site, mainRoutes, serviceSlugs, newsSlugs, subServiceRoutes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // All page paths (relative to /<lang>), with their priority + frequency.
  const paths: { path: string; priority: number; freq: "weekly" | "monthly" }[] = [];
  for (const route of mainRoutes) {
    paths.push({
      path: route ? `/${route}` : "",
      priority: route === "" ? 1 : 0.7,
      freq: route === "" ? "weekly" : "monthly",
    });
  }
  for (const slug of serviceSlugs) {
    paths.push({ path: `/services/${slug}`, priority: 0.8, freq: "monthly" });
  }
  for (const { parent, child } of subServiceRoutes) {
    paths.push({ path: `/services/${parent}/${child}`, priority: 0.7, freq: "monthly" });
  }
  for (const slug of newsSlugs) {
    paths.push({ path: `/news/${slug}`, priority: 0.6, freq: "monthly" });
  }

  // One entry per (path × locale), each carrying hreflang alternates for the
  // whole language set so search engines link the translations together.
  for (const { path, priority, freq } of paths) {
    const languages = Object.fromEntries(
      site.locales.map((l) => [l, `${site.url}/${l}${path}`])
    );
    for (const lang of site.locales) {
      entries.push({
        url: `${site.url}/${lang}${path}`,
        lastModified: now,
        changeFrequency: freq,
        priority,
        alternates: { languages },
      });
    }
  }

  return entries;
}
