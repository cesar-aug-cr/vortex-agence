/**
 * Props of a main-service hero motion graphic (/services/<slug>). The words
 * are the page's own, already-localized dictionary strings.
 */
export type ServiceMotionProps = {
  className?: string;
  /** Service title, e.g. "SEO & GEO / GSO". */
  title: string;
  /** Service tagline, e.g. "Visible sur Google. Cité par les IA." */
  tagline: string;
  /** CTA label: dict.common.cta ("Réserver un appel"). */
  cta: string;
  /** The service's bullet points (4–5 short lines). */
  bullets: readonly string[];
};
