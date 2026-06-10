import { i18n } from "@/i18n/config";

/**
 * Localized URL slugs.
 *
 * Key  = the CANONICAL segment — i.e. the real folder name under
 *        `src/app/[lang]/…` (always the French slug).
 * Value= the public slug shown in the URL for each locale.
 *
 * Only the FIRST path segment is localized. Deeper segments (service slugs
 * like `sites-web`, article slugs, sub-service children) are stable content
 * identifiers and pass through unchanged across languages.
 *
 * Routes intentionally NOT localized (internal / dev only): style-guide,
 * typographies-testsss, not-found.
 */
export const routeSlugs: Record<string, Record<string, string>> = {
  services: { fr: "services", en: "services", de: "leistungen", es: "servicios" },
  approche: { fr: "approche", en: "approach", de: "ansatz", es: "enfoque" },
  realisations: { fr: "realisations", en: "work", de: "referenzen", es: "proyectos" },
  agence: { fr: "agence", en: "agency", de: "agentur", es: "agencia" },
  news: { fr: "news", en: "news", de: "news", es: "noticias" },
  glossaire: { fr: "glossaire", en: "glossary", de: "glossar", es: "glosario" },
  faq: { fr: "faq", en: "faq", de: "faq", es: "faq" },
  contact: { fr: "contact", en: "contact", de: "kontakt", es: "contacto" },
  merci: { fr: "merci", en: "thank-you", de: "danke", es: "gracias" },
  "mentions-legales": {
    fr: "mentions-legales",
    en: "legal-notice",
    de: "impressum",
    es: "aviso-legal",
  },
  confidentialite: {
    fr: "confidentialite",
    en: "privacy",
    de: "datenschutz",
    es: "privacidad",
  },
  cookies: { fr: "cookies", en: "cookies", de: "cookies", es: "cookies" },
};

/** Reverse index per locale: localized slug → canonical segment. */
const reverse: Record<string, Record<string, string>> = {};
for (const canonical of Object.keys(routeSlugs)) {
  for (const l of i18n.locales) {
    const slug = routeSlugs[canonical][l];
    if (!slug) continue;
    (reverse[l] ??= {})[slug] = canonical;
  }
}

/** Canonical folder segment → localized public slug for a locale. */
export function localizeSegment(lang: string, seg: string): string {
  return routeSlugs[seg]?.[lang] ?? seg;
}

/** Localized public slug → canonical folder segment for a locale. */
export function canonicalizeSegment(lang: string, seg: string): string {
  return reverse[lang]?.[seg] ?? seg;
}

/**
 * Translate a CANONICAL internal path (e.g. "/services/sites-web") into the
 * locale's public path (e.g. "/servicios/sites-web"). First segment only.
 */
export function localizePath(lang: string, path: string): string {
  if (path === "" || path === "/") return path;
  const segs = path.replace(/^\//, "").split("/");
  segs[0] = localizeSegment(lang, segs[0]);
  return "/" + segs.join("/");
}

/**
 * Translate a locale's PUBLIC path (e.g. "/servicios/sites-web") back to the
 * canonical internal path (e.g. "/services/sites-web"). First segment only.
 */
export function canonicalizePath(lang: string, path: string): string {
  if (path === "" || path === "/") return path;
  const segs = path.replace(/^\//, "").split("/");
  segs[0] = canonicalizeSegment(lang, segs[0]);
  return "/" + segs.join("/");
}

/** True when `seg` is a known canonical route segment (has a localized map). */
export function isRouteSegment(seg: string): boolean {
  return Boolean(routeSlugs[seg]);
}
