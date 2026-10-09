import type { FC } from "react";
import type { ServiceMotionProps } from "./types";
import { SeoGeoMotion } from "./SeoGeoMotion";
import { LeadGenerationMotion } from "./LeadGenerationMotion";
import { PubliciteMotion } from "./PubliciteMotion";
import { BrandingDesignMotion } from "./BrandingDesignMotion";
import { AutomatisationIaMotion } from "./AutomatisationIaMotion";

/** slug → hero motion graphic of a main service page (sites-web has its own, see sites-web-motion). */
export const serviceMotion: Record<string, FC<ServiceMotionProps>> = {
  "seo-geo": SeoGeoMotion,
  "lead-generation": LeadGenerationMotion,
  publicite: PubliciteMotion,
  "branding-design": BrandingDesignMotion,
  "automatisation-ia": AutomatisationIaMotion,
};
