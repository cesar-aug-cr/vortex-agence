/**
 * i18n configuration.
 *
 * `locales` = languages currently shipped (have a dictionary).
 * `plannedLocales` = roadmap; adding one = create a dictionary file +
 * move its code into `locales`. No routing/component change required.
 */
export const i18n = {
  defaultLocale: "fr",
  locales: ["fr", "en", "de", "es"],
  plannedLocales: ["lu"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
export type PlannedLocale = (typeof i18n)["plannedLocales"][number];

export const localeNames: Record<string, string> = {
  fr: "Français",
  en: "English",
  de: "Deutsch",
  es: "Español",
  lu: "Lëtzebuergesch",
};

/** Short codes shown in the language switcher chip. */
export const localeShort: Record<string, string> = {
  fr: "FR",
  en: "EN",
  de: "DE",
  es: "ES",
  lu: "LU",
};

export function isLocale(value: string): value is Locale {
  return (i18n.locales as readonly string[]).includes(value);
}
