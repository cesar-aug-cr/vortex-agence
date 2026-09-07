import { NextResponse } from "next/server";
import { clientIp, isRateLimited } from "@/lib/rate-limit";
import { reportServerEvent } from "@/lib/report";

/**
 * Error & policy-violation sink. Accepts:
 *  - JSON from the error boundaries ({ kind: "client.error", … })
 *  - legacy CSP reports (application/csp-report, { "csp-report": {…} })
 *  - Reporting API batches (application/reports+json, [{ type, body }, …])
 * Everything is written to the server log through reportServerEvent; client
 * errors additionally notify ALERT_WEBHOOK_URL. Always answers 204 so a
 * failing reporter can never affect the visitor.
 */
const MAX_BYTES = 8_000;
const RATE = { max: 20, windowMs: 60 * 1000 };

const CLIENT_KEYS = ["scope", "message", "stack", "digest", "url", "ua"];
const CSP_KEYS = [
  "document-uri",
  "blocked-uri",
  "violated-directive",
  "effective-directive",
  "source-file",
  "line-number",
  "disposition",
];
const REPORTING_KEYS = [
  "documentURL",
  "blockedURL",
  "effectiveDirective",
  "disposition",
  "message",
  "sourceFile",
  "lineNumber",
];

function pick(o: Record<string, unknown>, keys: string[]) {
  return Object.fromEntries(
    keys.filter((k) => k in o).map((k) => [k, String(o[k] ?? "").slice(0, 600)])
  );
}

const done = () => new NextResponse(null, { status: 204 });

export async function POST(req: Request) {
  const ip = clientIp(req);
  if (isRateLimited(`report:${ip}`, RATE)) return done();

  const raw = await req.text().catch(() => "");
  if (!raw || raw.length > MAX_BYTES) return done();

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return done();
  }

  if (Array.isArray(payload)) {
    // Reporting API batch.
    for (const item of payload.slice(0, 10) as { type?: string; body?: Record<string, unknown> }[]) {
      await reportServerEvent(`browser.${String(item?.type ?? "report").slice(0, 40)}`, pick(item?.body ?? {}, REPORTING_KEYS));
    }
    return done();
  }

  if (!payload || typeof payload !== "object") return done();
  const p = payload as Record<string, unknown>;

  const cspReport = p["csp-report"];
  if (cspReport && typeof cspReport === "object") {
    await reportServerEvent("csp.violation", pick(cspReport as Record<string, unknown>, CSP_KEYS));
    return done();
  }

  await reportServerEvent(String(p.kind ?? "client.error").slice(0, 60), pick(p, CLIENT_KEYS), {
    notify: true,
  });
  return done();
}
