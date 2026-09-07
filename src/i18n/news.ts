import { fr } from "./dictionaries/fr";

/**
 * Article slugs, derived from the source dictionary. This used to be a
 * hand-maintained duplicate in lib/site.ts: an article added to the dictionary
 * without updating it silently dropped out of the sitemap and OG image routes,
 * and a renamed slug left a 404 behind. Server-only (imports the full `fr`).
 */
export const newsSlugs: readonly string[] = fr.news.articles.map((a) => a.slug);
