import type { FC } from "react";
import { SeoGeo } from "./SeoGeo";
import { LeadGeneration } from "./LeadGeneration";
import { Publicite } from "./Publicite";
import { BrandingDesign } from "./BrandingDesign";
import { GoogleAds } from "./GoogleAds";
import { MetaAds } from "./MetaAds";
import { Seo } from "./Seo";
import { GeoGso } from "./GeoGso";
import { LinkedinAds } from "./LinkedinAds";
import { SeoLocal } from "./SeoLocal";
import { SiteVitrine } from "./SiteVitrine";
import { SiteEcommerce } from "./SiteEcommerce";
import { LandingPages } from "./LandingPages";
import { RefonteDeSite } from "./RefonteDeSite";
import { ApplicationWeb } from "./ApplicationWeb";
import { SiteMultilingue } from "./SiteMultilingue";
import { TunnelsDeConversion } from "./TunnelsDeConversion";
import { LandingPagesCampagne } from "./LandingPagesCampagne";
import { EmailMarketingAutomation } from "./EmailMarketingAutomation";
import { CreationDeLogo } from "./CreationDeLogo";
import { IdentiteVisuelle } from "./IdentiteVisuelle";
import { SupportsPrint } from "./SupportsPrint";
import { ChatbotsIa } from "./ChatbotsIa";
import { IntegrationsCrmApi } from "./IntegrationsCrmApi";

/** slug → service illustration component (see CONVERSATION.md mapping).
 *  "sites-web" is not here: its hero is the laser motion graphic
 *  (sites-web-motion/SitesWebMotion), which needs the page's localized copy. */
export const serviceIllustration: Record<string, FC<{ className?: string }>> = {
  "seo-geo": SeoGeo,
  "lead-generation": LeadGeneration,
  publicite: Publicite,
  "branding-design": BrandingDesign,
  // Temporarily uses the "Applications & plateformes sur-mesure" visual
  // (the application-web sub-service is hidden for now — see lib/site.ts).
  "automatisation-ia": ApplicationWeb,
};

/** illustration key → component, for service sub-pages (Google/Meta Ads…). */
export const subServiceIllustration: Record<string, FC<{ className?: string }>> = {
  // publicité
  "google-ads": GoogleAds,
  "meta-ads": MetaAds,
  "linkedin-ads": LinkedinAds,
  // seo & geo
  seo: Seo,
  "geo-gso": GeoGso,
  "seo-local": SeoLocal,
  // sites web
  "site-vitrine": SiteVitrine,
  "site-e-commerce": SiteEcommerce,
  "landing-pages": LandingPages,
  "refonte-de-site": RefonteDeSite,
  "application-web": ApplicationWeb,
  "site-multilingue": SiteMultilingue,
  // génération de leads
  "tunnels-de-conversion": TunnelsDeConversion,
  "landing-pages-campagne": LandingPagesCampagne,
  "email-marketing-automation": EmailMarketingAutomation,
  // branding & design
  "creation-de-logo": CreationDeLogo,
  "identite-visuelle": IdentiteVisuelle,
  "supports-print": SupportsPrint,
  // automatisation & ia
  "chatbots-ia": ChatbotsIa,
  "integrations-crm-api": IntegrationsCrmApi,
};
