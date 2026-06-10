import type { FC } from "react";
import { PackDomain } from "./PackDomain";
import { PackResponsive } from "./PackResponsive";
import { PackSeo } from "./PackSeo";
import { PackContact } from "./PackContact";
import { PackSmartForms } from "./PackSmartForms";
import { PackSsl } from "./PackSsl";
import { PackSupport } from "./PackSupport";
import { PackAnalytics } from "./PackAnalytics";
import { PackSpeed } from "./PackSpeed";

/** Complex illustrated icons for the sites-web "everything included" packs grid. */
export const packIcons: Record<string, FC<{ className?: string }>> = {
  server: PackDomain,
  responsive: PackResponsive,
  seo: PackSeo,
  contact: PackContact,
  smartforms: PackSmartForms,
  ssl: PackSsl,
  support: PackSupport,
  analytics: PackAnalytics,
  speed: PackSpeed,
};
