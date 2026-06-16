/**
 * Maps each news article (by slug) to the service slugs it's relevant to, so a
 * service page can surface the articles that talk about it — internal linking
 * that helps both SEO and the reader. Slugs are locale-independent, so the map
 * lives here rather than in the per-locale dictionaries.
 */
export const articleServices: Record<string, string[]> = {
  "geo-seo-luxembourg-etre-cite-par-les-ia": ["seo-geo"],
  "google-ads-ou-seo-ou-investir-budget-marketing": ["publicite", "seo-geo"],
  "tunnel-de-conversion-transformer-visiteurs-en-clients": ["lead-generation", "sites-web"],
  "combien-coute-un-site-web-luxembourg-2026": ["sites-web"],
  "quest-ce-quun-bon-logo-identite-qui-dure": ["branding-design"],
  "rgpd-cookies-site-web-luxembourg": ["sites-web"],
  "5-taches-pme-confier-a-l-ia": ["automatisation-ia"],
  "ia-pme-luxembourg-par-ou-commencer": ["automatisation-ia"],
  "ux-ui-design-site-qui-convertit-bonnes-pratiques": ["sites-web", "branding-design"],
};

/** Filters a list of articles down to those tied to a given service slug. */
export function articlesForService<T extends { slug: string }>(
  serviceSlug: string,
  articles: readonly T[]
): T[] {
  return articles.filter((a) => articleServices[a.slug]?.includes(serviceSlug));
}
