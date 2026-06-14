import type { FC } from "react";
import { SitesWeb } from "./SitesWeb";
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
import { LeadNurturingScoring } from "./LeadNurturingScoring";
import { OptimisationConversionCro } from "./OptimisationConversionCro";
import { CreationDeLogo } from "./CreationDeLogo";
import { IdentiteVisuelle } from "./IdentiteVisuelle";
import { CharteGraphique } from "./CharteGraphique";
import { SupportsPrint } from "./SupportsPrint";
import { StrategieDeMarqueNaming } from "./StrategieDeMarqueNaming";
import { AutomatisationWorkflows } from "./AutomatisationWorkflows";
import { AgentsAssistantsIa } from "./AgentsAssistantsIa";
import { ChatbotsIa } from "./ChatbotsIa";
import { IntegrationsCrmApi } from "./IntegrationsCrmApi";
import { IaContenuGeneratif } from "./IaContenuGeneratif";

/** slug → service illustration component (see CONVERSATION.md mapping). */
export const serviceIllustration: Record<string, FC<{ className?: string }>> = {
  "sites-web": SitesWeb,
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
  "lead-nurturing-scoring": LeadNurturingScoring,
  "optimisation-conversion-cro": OptimisationConversionCro,
  // branding & design
  "creation-de-logo": CreationDeLogo,
  "identite-visuelle": IdentiteVisuelle,
  "charte-graphique": CharteGraphique,
  "supports-print": SupportsPrint,
  "strategie-de-marque-naming": StrategieDeMarqueNaming,
  // automatisation & ia
  "automatisation-workflows": AutomatisationWorkflows,
  "agents-assistants-ia": AgentsAssistantsIa,
  "chatbots-ia": ChatbotsIa,
  "integrations-crm-api": IntegrationsCrmApi,
  "ia-contenu-generatif": IaContenuGeneratif,
};
