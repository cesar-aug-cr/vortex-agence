/**
 * i18n configuration.
 *
 * `locales` = languages currently shipped (have a dictionary).
 * `plannedLocales` = roadmap; adding one = create a dictionary file +
 * move its code into `locales`. No routing/component change required.
 */
export const i18n = {
  defaultLocale: "fr",
  locales: ["fr"],
  plannedLocales: ["de", "en", "lu"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
export type PlannedLocale = (typeof i18n)["plannedLocales"][number];

export const localeNames: Record<string, string> = {
  fr: "Français",
  de: "Deutsch",
  en: "English",
  lu: "Lëtzebuergesch",
};

export function isLocale(value: string): value is Locale {
  return (i18n.locales as readonly string[]).includes(value);
}
