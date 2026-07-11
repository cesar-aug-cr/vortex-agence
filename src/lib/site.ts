/**
 * Central site configuration — single place to edit real-world facts.
 * TODO (placeholders to replace with real data):
 *   - phone, sameAs (socials), legal.vat (pending registration),
 *     legal.director, legal.host
 */
export const site = {
  name: "vortx",
  url: "https://vortx.lu",
  defaultLocale: "fr",
  locales: ["fr", "en", "de", "es"] as const,
  description:
    "Agence marketing & web à Luxembourg : sites qui convertissent, SEO & GEO, génération de leads et publicité en ligne.",
  email: "contact@vortx.lu",
  phone: "" as string, // placeholder — e.g. "+352 ..."
  address: {
    street: "18, rue de l'Ouest" as string,
    postalCode: "L-2273" as string,
    locality: "Luxembourg",
    region: "Luxembourg",
    country: "LU",
  },
  sameAs: [] as string[], // placeholder — LinkedIn / Instagram / …
  founded: "2024",

  /**
   * Legal identity — required for real "Mentions légales" / privacy pages.
   * Still pending: vat (registration in progress), director, host details —
   * their lines render as clearly-flagged placeholders (or are omitted)
   * until filled.
   */
  legal: {
    companyName: "vortx" as string,
    legalForm: "Société à responsabilité limitée simplifiée (SARL-S)" as string,
    rcs: "B309552" as string, // N° RCS Luxembourg
    vat: "" as string, // pending — e.g. "LU12345678" once registered
    businessPermit: "10196845 / 0" as string, // Autorisation d'établissement
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

/**
 * Sub-services temporarily hidden from navigation, grids, generated routes
 * and the sitemap. Remove a slug here to bring the page back (its translated
 * content stays in the dictionaries).
 */
export const hiddenSubServices: ReadonlySet<string> = new Set(["application-web"]);

/** Service sub-pages (children of a parent service slug). Excludes hidden ones. */
export const subServiceRoutes = [
  { parent: "publicite", child: "google-ads" },
  { parent: "publicite", child: "meta-ads" },
  { parent: "publicite", child: "linkedin-ads" },
  { parent: "seo-geo", child: "seo" },
  { parent: "seo-geo", child: "geo-gso" },
  { parent: "seo-geo", child: "seo-local" },
  { parent: "sites-web", child: "site-vitrine" },
  { parent: "sites-web", child: "site-e-commerce" },
  { parent: "sites-web", child: "landing-pages" },
  { parent: "sites-web", child: "refonte-de-site" },
  { parent: "sites-web", child: "site-multilingue" },
  { parent: "lead-generation", child: "tunnels-de-conversion" },
  { parent: "lead-generation", child: "landing-pages-campagne" },
  { parent: "lead-generation", child: "email-marketing-automation" },
  { parent: "lead-generation", child: "lead-nurturing-scoring" },
  { parent: "lead-generation", child: "optimisation-conversion-cro" },
  { parent: "branding-design", child: "creation-de-logo" },
  { parent: "branding-design", child: "identite-visuelle" },
  { parent: "branding-design", child: "charte-graphique" },
  { parent: "branding-design", child: "supports-print" },
  { parent: "branding-design", child: "strategie-de-marque-naming" },
  { parent: "automatisation-ia", child: "automatisation-workflows" },
  { parent: "automatisation-ia", child: "agents-assistants-ia" },
  { parent: "automatisation-ia", child: "chatbots-ia" },
  { parent: "automatisation-ia", child: "integrations-crm-api" },
  { parent: "automatisation-ia", child: "ia-contenu-generatif" },
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
  "quiz",
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
  "ux-ui-design-site-qui-convertit-bonnes-pratiques",
  "geo-seo-luxembourg-etre-cite-par-les-ia",
  "google-ads-ou-seo-ou-investir-budget-marketing",
  "tunnel-de-conversion-transformer-visiteurs-en-clients",
  "combien-coute-un-site-web-luxembourg-2026",
  "quest-ce-quun-bon-logo-identite-qui-dure",
  "rgpd-cookies-site-web-luxembourg",
  "5-taches-pme-confier-a-l-ia",
  "ia-pme-luxembourg-par-ou-commencer",
] as const;
