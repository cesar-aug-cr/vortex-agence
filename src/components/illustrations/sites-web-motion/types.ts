/**
 * Props of the /services/sites-web hero motion graphic. Human-language words
 * come from the page (already-localized dictionary strings); defaults are FR.
 */
export type SitesWebMotionProps = {
  className?: string;
  /** Mini-site headline, e.g. the service title "Sites web qui convertissent". */
  title?: string;
  /** Short line under it, e.g. the service tagline. */
  tagline?: string;
  /** CTA label of the mini-site button, e.g. "Réserver un appel". */
  cta?: string;
};
