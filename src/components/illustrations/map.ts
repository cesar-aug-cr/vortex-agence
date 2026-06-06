import type { FC } from "react";
import { SitesWeb } from "./SitesWeb";
import { SeoGeo } from "./SeoGeo";
import { LeadGeneration } from "./LeadGeneration";
import { Publicite } from "./Publicite";
import { BrandingDesign } from "./BrandingDesign";
import { AutomatisationIa } from "./AutomatisationIa";

/** slug → service illustration component (see CONVERSATION.md mapping). */
export const serviceIllustration: Record<string, FC<{ className?: string }>> = {
  "sites-web": SitesWeb,
  "seo-geo": SeoGeo,
  "lead-generation": LeadGeneration,
  publicite: Publicite,
  "branding-design": BrandingDesign,
  "automatisation-ia": AutomatisationIa,
};
