/**
 * Central site configuration — single place to edit real-world facts.
 * TODO (placeholders to replace with real data):
 *   - url (final domain), email, phone, address, sameAs (socials)
 */
export const site = {
  name: "VorTX",
  url: "https://vortx.lu",
  defaultLocale: "fr",
  locales: ["fr"] as const,
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

/** Top-level routes (relative to /<lang>) used for the sitemap. */
export const mainRoutes = [
  "",
  "services",
  "approche",
  "realisations",
  "agence",
  "contact",
  "mentions-legales",
  "confidentialite",
  "cookies",
] as const;
