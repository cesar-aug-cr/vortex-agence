import { createHash } from "node:crypto";

/** Hard ceilings for the contact payload — anything larger is not a human. */
export const CONTACT_MAX_BODY_BYTES = 16_000;
export const CONTACT_FIELD_LIMITS = {
  name: 120,
  email: 254,
  phone: 40,
  company: 120,
  interest: 300,
  message: 4000,
  lang: 5,
} as const;

/**
 * Anchored: the previous `/.+@.+\..+/` accepted "xxx\nvictim@mail.com" and
 * anything containing an @ somewhere in the middle.
 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactLead = {
  name: string;
  email: string;
  phone: string;
  company: string;
  interest: string;
  message: string;
  lang: string;
  /** Server-side timestamp of the consent, for RGPD art. 7 accountability. */
  consentAt: string;
};

export type ContactValidation =
  | { ok: true; lead: ContactLead }
  | {
      ok: false;
      error: "invalid" | "missing-fields" | "too-long" | "consent-required";
      status: 400;
    };

type Field = keyof typeof CONTACT_FIELD_LIMITS;

function field(data: Record<string, unknown>, key: string): string {
  return String(data[key] ?? "").trim();
}

export function validateContact(data: unknown): ContactValidation {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { ok: false, error: "invalid", status: 400 };
  }
  const d = data as Record<string, unknown>;

  const name = field(d, "name");
  const email = field(d, "email");
  const message = field(d, "message");
  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return { ok: false, error: "missing-fields", status: 400 };
  }

  const lead: ContactLead = {
    name,
    email,
    phone: field(d, "phone"),
    company: field(d, "company"),
    interest: field(d, "interest"),
    message,
    lang: field(d, "lang") || "fr",
    consentAt: new Date().toISOString(),
  };
  for (const key of Object.keys(CONTACT_FIELD_LIMITS) as Field[]) {
    if (lead[key].length > CONTACT_FIELD_LIMITS[key]) {
      return { ok: false, error: "too-long", status: 400 };
    }
  }

  // The form only submits with the consent box ticked, but a direct POST must
  // not be able to skip it: consent is checked and timestamped server-side.
  if (field(d, "consent") !== "oui") {
    return { ok: false, error: "consent-required", status: 400 };
  }

  return { ok: true, lead };
}

/** Short, non-reversible identifier so logs can correlate a lead without storing the address. */
export function emailHash(email: string): string {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 12);
}

/** Log-safe view of a lead: no name, email, phone, company or message. */
export function leadMeta(lead: ContactLead) {
  return {
    at: lead.consentAt,
    lang: lead.lang,
    interest: lead.interest,
    emailHash: emailHash(lead.email),
  };
}
