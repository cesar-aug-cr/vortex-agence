/**
 * Props of the /services/sites-web hero motion graphic. The words are the
 * page's own, already-localized dictionary strings.
 */
export type SitesWebMotionProps = {
  className?: string;
  /** Mini-site headline: serviceContent["sites-web"].motionTitle ("Sites web qui
   *  convertissent"), deliberately not the page title. */
  title: string;
  /** Line under it: the service tagline. */
  tagline: string;
  /** CTA label of the mini-site button: dict.common.cta ("Réserver un appel"). */
  cta: string;
  /** Chip above the headline, shown as "</> {eyebrow}":
   *  serviceContent["sites-web"].motionEyebrow ("Sur-mesure"). */
  eyebrow: string;
};
