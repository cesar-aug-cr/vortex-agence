import type { Locale } from "./config";
import { fr } from "./dictionaries/fr";

/**
 * Dictionary loaders. `fr` is bundled directly (default + only shipped
 * locale today). Future locales are added as dynamic imports here, e.g.:
 *   de: () => import("./dictionaries/de").then((m) => m.de),
 */
const dictionaries = {
  fr: async () => fr,
} as const;

export async function getDictionary(locale: Locale) {
  const load = dictionaries[locale] ?? dictionaries.fr;
  return load();
}

/** The canonical shape of every dictionary, inferred from the French source. */
export type Dictionary = typeof fr;
