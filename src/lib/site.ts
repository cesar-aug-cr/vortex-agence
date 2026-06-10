/**
 * Central site configuration — single place to edit real-world facts.
 * TODO (placeholders to replace with real data):
 *   - url (final domain), email, phone, address, sameAs (socials)
 */
export const site = {
  name: "vortx",
  url: "https://vortx.lu",
  defaultLocale: "fr",
  locales: ["fr", "en", "de", "es"] as const,
  description:
    "Agence marketing & web à Luxembourg : sites qui convertissent, SEO & GEO, génération de leads et publicité en ligne.",
  email: "contact@vortx.lu", // placeholder
  phone: "" as string, // placeholder — e.g. "+352 ..."
  address: {
    street: "" as string, // placeholder — set to flip schema to LocalBusiness
    postalCode: "" as string, // placeholder
    locality: "Luxembourg",
    region: "Luxembourg",
    country: "LU",
  },
  sameAs: [] as string[], // placeholder — LinkedIn / Instagram / …
  founded: "2024",

  /**
   * Legal identity — required for real "Mentions légales" / privacy pages.
   * Fill these with the company's actual data (and have a lawyer review the
   * pages). While empty, the legal pages show clearly-flagged placeholders.
   */
  legal: {
    companyName: "" as string, // Raison sociale — ex: "vortx S.à r.l."
    legalForm: "" as string, // Forme juridique — ex: "Société à responsabilité limitée"
    rcs: "" as string, // N° RCS Luxembourg — ex: "B123456"
    vat: "" as string, // N° TVA — ex: "LU12345678"
    capital: "" as string, // Capital social (optionnel)
    director: "" as string, // Directeur de la publication (nom)
    host: {
      name: "" as string, // Hébergeur — ex: "Vercel Inc."
      address: "" as string, // Adresse de l'hébergeur
      url: "" as string, // Site de l'hébergeur
    },
  },
} as const;

/** Service slugs (must match the dictionary `services[].slug`). */
export const serviceSlugs = [
  "sites-web",
  "seo-geo",
  "lead-generation",
  "publicite",
  "branding-design",
  "automatisation-ia",
] as const;

/** Service sub-pages (children of a parent service slug). */
export const subServiceRoutes = [
  { parent: "publicite", child: "google-ads" },
  { parent: "publicite", child: "meta-ads" },
  { parent: "seo-geo", child: "seo" },
  { parent: "seo-geo", child: "geo-gso" },
] as const;

/** Top-level routes (relative to /<lang>) used for the sitemap. */
export const mainRoutes = [
  "",
  "services",
  "approche",
  "realisations",
  "agence",
  "news",
  "glossaire",
  "faq",
  "contact",
  "mentions-legales",
  "confidentialite",
  "cookies",
] as const;

/**
 * News article slugs (must match the dictionary `news.articles[].slug`).
 * Kept here so the sitemap stays dependency-free of the dictionary.
 */
export const newsSlugs = [
  "geo-seo-luxembourg-etre-cite-par-les-ia",
  "google-ads-ou-seo-ou-investir-budget-marketing",
  "tunnel-de-conversion-transformer-visiteurs-en-clients",
  "combien-coute-un-site-web-luxembourg-2026",
  "quest-ce-quun-bon-logo-identite-qui-dure",
  "rgpd-cookies-site-web-luxembourg",
  "5-taches-pme-confier-a-l-ia",
  "ia-pme-luxembourg-par-ou-commencer",
] as const;
