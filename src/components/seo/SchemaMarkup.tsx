import { site, serviceSlugs } from "@/lib/site";

/**
 * Site-wide JSON-LD: Organization + LocalBusiness + WebSite.
 * Service/FAQ/BreadcrumbList schemas are emitted on their respective pages.
 */
export function SchemaMarkup() {
  const org = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    url: site.url,
    description: site.description,
    email: site.email || undefined,
    telephone: site.phone || undefined,
    foundingDate: site.founded,
    areaServed: { "@type": "Country", name: "Luxembourg" },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    knowsLanguage: ["fr", "de", "en"],
    sameAs: site.sameAs.length ? site.sameAs : undefined,
    makesOffer: serviceSlugs.map((slug) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", url: `${site.url}/fr/services/${slug}` },
    })),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${site.url}/#organization` },
    inLanguage: "fr",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}
