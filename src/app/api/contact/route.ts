import { NextResponse } from "next/server";
import { site } from "@/lib/site";
import {
  CONTACT_MAX_BODY_BYTES,
  leadMeta,
  validateContact,
} from "@/lib/contact-validation";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { reportServerEvent } from "@/lib/report";

/**
 * Contact form handler.
 *
 * If RESEND_API_KEY is set it sends the lead by email via Resend (no SDK —
 * plain fetch). Until then (placeholder mode), it validates + logs the lead
 * server-side so the whole flow works end-to-end. Set these env vars to go live:
 *   RESEND_API_KEY   — Resend API key
 *   CONTACT_TO       — destination inbox (defaults to site.email)
 *   CONTACT_FROM     — verified sender, e.g. "vortx <contact@vortx.lu>"
 *
 * Hardening: body size cap, per-field limits, anchored email check, per-IP
 * throttle, server-side consent check. Logs never contain personal data —
 * only `leadMeta()` (timestamp, language, interest, short email hash).
 */
const RATE = { max: 5, windowMs: 10 * 60 * 1000 };

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isRateLimited(`contact:${ip}`, RATE)) {
    return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }

  const declared = Number(req.headers.get("content-length") ?? 0);
  if (declared > CONTACT_MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too-large" }, { status: 413 });
  }
  const raw = await req.text().catch(() => "");
  if (raw.length > CONTACT_MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, error: "too-large" }, { status: 413 });
  }

  let data: unknown = null;
  try {
    data = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: a real user never fills the hidden "website" field.
  if (data && typeof data === "object" && (data as { website?: unknown }).website) {
    return NextResponse.json({ ok: true });
  }

  const result = validateContact(data);
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status });
  }
  const { lead } = result;
  const meta = leadMeta(lead);

  const to = process.env.CONTACT_TO || site.email;
  const from = process.env.CONTACT_FROM || `vortx <${site.email}>`;

  if (process.env.RESEND_API_KEY && to) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to,
          reply_to: lead.email,
          subject: `Nouveau lead — ${lead.name}${lead.company ? ` (${lead.company})` : ""}`,
          text: [
            `Nom: ${lead.name}`,
            `Email: ${lead.email}`,
            `Téléphone: ${lead.phone || "—"}`,
            `Entreprise: ${lead.company || "—"}`,
            `Services: ${lead.interest || "—"}`,
            `Langue: ${lead.lang}`,
            `Consentement données: oui — horodaté ${lead.consentAt} (serveur)`,
            "",
            lead.message,
          ].join("\n"),
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
    } catch (err) {
      await reportServerEvent(
        "contact.send-failed",
        { ...meta, reason: err instanceof Error ? err.message : String(err) },
        { notify: true }
      );
      return NextResponse.json({ ok: false, error: "send-failed" }, { status: 502 });
    }
  } else if (process.env.NODE_ENV === "production" && !process.env.CONTACT_PLACEHOLDER) {
    // Fail loudly in production rather than silently dropping a lead while the
    // UI shows success. Set RESEND_API_KEY (or CONTACT_PLACEHOLDER=1 to opt in).
    await reportServerEvent("contact.not-configured", meta, { notify: true });
    return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
  } else {
    // Dev / explicit placeholder mode — log that a lead came in (metadata only).
    console.info("[contact] new lead (email transport not configured):", meta);
  }

  return NextResponse.json({ ok: true });
}
