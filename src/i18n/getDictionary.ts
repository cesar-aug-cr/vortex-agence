import type { Locale } from "./config";
import { fr } from "./dictionaries/fr";

/**
 * Dictionary loaders. `fr` is the source of truth and is bundled directly;
 * the other locales are lazy-loaded translations that mirror its shape.
 *
 * Each translated dictionary is its own `as const` object, so its literal
 * types differ from `fr`'s. They are structurally identical, so we expose
 * them through the single `Dictionary` type (= shape of `fr`) — the cast in
 * `getDictionary` widens away the per-locale literal differences.
 */
const dictionaries = {
  fr: async () => fr,
  en: async () => (await import("./dictionaries/en")).en,
  de: async () => (await import("./dictionaries/de")).de,
  es: async () => (await import("./dictionaries/es")).es,
} as const;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const load = dictionaries[locale] ?? dictionaries.fr;
  return (await load()) as unknown as Dictionary;
}

/** The canonical shape of every dictionary, inferred from the French source. */
export type Dictionary = typeof fr;
