import { NextResponse } from "next/server";
import { site } from "@/lib/site";

/**
 * Contact form handler.
 *
 * If RESEND_API_KEY is set it sends the lead by email via Resend (no SDK —
 * plain fetch). Until then (placeholder mode), it validates + logs the lead
 * server-side so the whole flow works end-to-end. Set these env vars to go live:
 *   RESEND_API_KEY   — Resend API key
 *   CONTACT_TO       — destination inbox (defaults to site.email)
 *   CONTACT_FROM     — verified sender, e.g. "vortx <contact@vortx.lu>"
 */
export async function POST(req: Request) {
  const data = await req.json().catch(() => null);

  if (!data || typeof data !== "object") {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  // Honeypot: a real user never fills the hidden "website" field.
  if (data.website) return NextResponse.json({ ok: true });

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const message = String(data.message ?? "").trim();
  if (!name || !email || !message || !/.+@.+\..+/.test(email)) {
    return NextResponse.json({ ok: false, error: "missing-fields" }, { status: 400 });
  }

  const lead = {
    name,
    email,
    phone: String(data.phone ?? "").trim(),
    company: String(data.company ?? "").trim(),
    interest: String(data.interest ?? "").trim(),
    consent: String(data.consent ?? "").trim(),
    message,
    lang: String(data.lang ?? "fr"),
  };

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
            `Consentement données: ${lead.consent || "—"}`,
            "",
            lead.message,
          ].join("\n"),
        }),
      });
      if (!res.ok) throw new Error(`Resend ${res.status}`);
    } catch (err) {
      console.error("[contact] email send failed:", err);
      return NextResponse.json({ ok: false, error: "send-failed" }, { status: 502 });
    }
  } else {
    // Placeholder mode — no transport configured yet.
    console.info("[contact] new lead (email transport not configured):", lead);
  }

  return NextResponse.json({ ok: true });
}
