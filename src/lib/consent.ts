/**
 * Cookie consent (RGPD / ePrivacy, CNPD Luxembourg).
 *
 * Opt-in by default: nothing but strictly-necessary cookies until the user
 * grants a category. Choice is persisted in a first-party cookie (so it can be
 * read server-side / by GTM) + localStorage, and pushed into Google Consent
 * Mode v2 so GA4 / GTM / Ads respect it automatically once added.
 */

export type ConsentChoice = { analytics: boolean; marketing: boolean };
export type ConsentState = ConsentChoice & { necessary: true; ts: number };

export const CONSENT_COOKIE = "vortx_consent";
export const CONSENT_MAX_AGE_DAYS = 180; // CNPD: re-ask roughly every 6 months
export const CONSENT_EVENT = "vortx:consent"; // fired with detail: ConsentState
export const CONSENT_OPEN_EVENT = "vortx:consent-open"; // re-open the banner

export function readConsent(): ConsentState | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)vortx_consent=([^;]+)/);
  if (!match) return null;
  try {
    const v = JSON.parse(decodeURIComponent(match[1]));
    if (typeof v.analytics === "boolean" && typeof v.marketing === "boolean") {
      return { necessary: true, analytics: v.analytics, marketing: v.marketing, ts: v.ts ?? 0 };
    }
  } catch {
    /* ignore malformed cookie */
  }
  return null;
}

export function applyToGtag(c: ConsentChoice): void {
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("consent", "update", {
      analytics_storage: c.analytics ? "granted" : "denied",
      ad_storage: c.marketing ? "granted" : "denied",
      ad_user_data: c.marketing ? "granted" : "denied",
      ad_personalization: c.marketing ? "granted" : "denied",
    });
  }
}

export function writeConsent(choice: ConsentChoice): ConsentState {
  const state: ConsentState = {
    necessary: true,
    analytics: choice.analytics,
    marketing: choice.marketing,
    ts: Date.now(),
  };
  const value = encodeURIComponent(JSON.stringify(state));
  const maxAge = CONSENT_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${CONSENT_COOKIE}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax`;
  try {
    localStorage.setItem("vortx-consent-v1", JSON.stringify(state));
  } catch {
    /* storage may be unavailable */
  }
  applyToGtag(state);
  window.dispatchEvent(new CustomEvent<ConsentState>(CONSENT_EVENT, { detail: state }));
  return state;
}

/** Re-open the consent banner (e.g. from a "Gérer mes cookies" button). */
export function openConsentPreferences(): void {
  window.dispatchEvent(new Event(CONSENT_OPEN_EVENT));
}

/** Has the user consented to a given category? (necessary is always true) */
export function hasConsent(category: keyof ConsentChoice): boolean {
  const c = readConsent();
  return c ? c[category] : false;
}
