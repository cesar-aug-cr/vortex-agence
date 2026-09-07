import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";
import { resetRateLimits } from "@/lib/rate-limit";
import { EMAIL_RE, validateContact } from "@/lib/contact-validation";

const valid = {
  name: "Ada",
  email: "ada@example.lu",
  message: "Bonjour, je souhaite un audit.",
  interest: "Sites web",
  consent: "oui",
  lang: "fr",
};

let ipCounter = 0;
function post(body: unknown, headers: Record<string, string> = {}) {
  const raw = typeof body === "string" ? body : JSON.stringify(body);
  return POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        // Fresh IP per request unless the test wants to hit the throttle.
        "x-forwarded-for": `10.0.0.${++ipCounter}`,
        ...headers,
      },
      body: raw,
    })
  );
}

describe("EMAIL_RE", () => {
  it("is anchored", () => {
    expect(EMAIL_RE.test("ada@example.lu")).toBe(true);
    expect(EMAIL_RE.test("xxx\nvictim@mail.com")).toBe(false);
    expect(EMAIL_RE.test("not an email")).toBe(false);
    expect(EMAIL_RE.test("a@b")).toBe(false);
  });
});

describe("validateContact", () => {
  it("accepts a complete payload and timestamps the consent", () => {
    const r = validateContact(valid);
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.lead.consentAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  it("rejects missing consent", () => {
    expect(validateContact({ ...valid, consent: "non" })).toMatchObject({ ok: false, error: "consent-required" });
    expect(validateContact({ ...valid, consent: undefined })).toMatchObject({ ok: false, error: "consent-required" });
  });

  it("rejects over-long fields", () => {
    expect(validateContact({ ...valid, message: "x".repeat(4001) })).toMatchObject({ ok: false, error: "too-long" });
  });
});

describe("POST /api/contact", () => {
  beforeEach(() => resetRateLimits());
  afterEach(() => vi.restoreAllMocks());

  it("returns 400 on a non-JSON body", async () => {
    const res = await post("not json");
    expect(res.status).toBe(400);
  });

  it("returns 400 on missing fields or a malformed email", async () => {
    expect((await post({ ...valid, name: "" })).status).toBe(400);
    expect((await post({ ...valid, email: "xxx\nvictim@mail.com" })).status).toBe(400);
  });

  it("returns 400 without server-side consent", async () => {
    const res = await post({ ...valid, consent: "non" });
    expect(res.status).toBe(400);
    expect(await res.json()).toMatchObject({ error: "consent-required" });
  });

  it("returns 413 on an oversized body", async () => {
    const res = await post({ ...valid, message: "x".repeat(20_000) });
    expect(res.status).toBe(413);
  });

  it("swallows honeypot submissions with a fake success", async () => {
    const res = await post({ ...valid, website: "http://spam.example" });
    expect(res.status).toBe(200);
  });

  it("accepts a valid lead in placeholder mode without logging personal data", async () => {
    const info = vi.spyOn(console, "info").mockImplementation(() => {});
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const logged = JSON.stringify(info.mock.calls);
    expect(logged).not.toContain(valid.email);
    expect(logged).not.toContain(valid.name);
    expect(logged).not.toContain(valid.message);
    expect(logged).toContain("emailHash");
  });

  it("throttles the 6th submission from the same IP within the window", async () => {
    vi.spyOn(console, "info").mockImplementation(() => {});
    const ip = { "x-forwarded-for": "203.0.113.7" };
    for (let i = 0; i < 5; i++) expect((await post(valid, ip)).status).toBe(200);
    expect((await post(valid, ip)).status).toBe(429);
  });
});
