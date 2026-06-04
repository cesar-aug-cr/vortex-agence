import type { MetadataRoute } from "next";
import { site, mainRoutes, serviceSlugs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const lang of site.locales) {
    for (const route of mainRoutes) {
      entries.push({
        url: `${site.url}/${lang}${route ? `/${route}` : ""}`,
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
      });
    }
    for (const slug of serviceSlugs) {
      entries.push({
        url: `${site.url}/${lang}/services/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
