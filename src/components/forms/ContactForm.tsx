"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { localized } from "@/lib/locale";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Check } from "@/components/ui/icons";

type FormCopy = Dictionary["contact"]["form"];
type ServiceOpt = { slug: string; title: string };

const fieldClass =
  "w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent";

const STEPS = 3;

/**
 * Multi-step contact form: ① pick one or more services · ② your details ·
 * ③ message + data-handling consent. Each step's required fields are validated
 * natively by the browser when advancing (the Next/Submit button submits the
 * form, which only carries the fields currently mounted for that step).
 */
export function ContactForm({
  lang,
  form,
  services,
}: {
  lang: Locale;
  form: FormCopy;
  services: ServiceOpt[];
}) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [step, setStep] = useState(0);
  const [error, setError] = useState("");

  const [selected, setSelected] = useState<string[]>([]);
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    website: "", // honeypot
  });
  const [consent, setConsent] = useState(false);

  const set = (k: keyof typeof data) => (e: { target: { value: string } }) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const toggleService = (title: string) =>
    setSelected((s) => (s.includes(title) ? s.filter((t) => t !== title) : [...s, title]));

  // Service choices + a generic "Other" option.
  const options: ServiceOpt[] = [...services, { slug: "autre", title: form.serviceOther }];

  const stepTitles = [form.stepServices, form.stepDetails, form.stepMessage];

  async function send() {
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          interest: selected.join(", "),
          consent: consent ? "oui" : "non",
          lang,
        }),
      });
      if (!res.ok) throw new Error();
      router.push(localized(lang, "/merci"));
    } catch {
      setStatus("error");
      setError(form.error);
    }
  }

  // The button is a submit, so native constraint validation runs first; this
  // only fires once the visible required fields are valid.
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Require at least one service on the first step.
    if (step === 0 && selected.length === 0) {
      setError(form.servicesRequired);
      return;
    }
    setError("");
    if (step < STEPS - 1) setStep((s) => s + 1);
    else send();
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6">
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        value={data.website}
        onChange={set("website")}
        className="hidden"
      />

      {/* progress */}
      <div>
        <div className="flex items-center gap-2">
          {Array.from({ length: STEPS }, (_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-accent" : "bg-border"
              }`}
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-xs text-text-muted">
          {form.step} {step + 1} / {STEPS} · {stepTitles[step]}
        </p>
      </div>

      {/* Step 1 — services multi-choice */}
      {step === 0 && (
        <fieldset className="grid gap-3">
          <legend className="text-sm font-medium text-text">{form.servicesLabel}</legend>
          <p className="text-xs text-text-muted">{form.servicesHint}</p>
          <div className="mt-1 grid gap-3 sm:grid-cols-2">
            {options.map((opt, i) => {
              const on = selected.includes(opt.title);
              return (
                <button
                  key={opt.slug}
                  type="button"
                  onClick={() => toggleService(opt.title)}
                  aria-pressed={on}
                  style={{ animationDelay: `${0.15 + i * 0.06}s` }}
                  className={`option-hint flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-left text-sm transition-colors ${
                    on
                      ? "border-accent bg-accent-soft text-text"
                      : "border-border text-text-dim hover:border-border-strong hover:text-text"
                  }`}
                >
                  {opt.title}
                  <span
                    aria-hidden
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                      on ? "border-accent bg-accent text-accent-ink" : "border-border-strong"
                    }`}
                  >
                    {on && <Check width={14} height={14} />}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>
      )}

      {/* Step 2 — details */}
      {step === 1 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-text-dim">
            {form.name}
            <input
              name="name"
              required
              autoComplete="name"
              value={data.name}
              onChange={set("name")}
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 text-sm text-text-dim">
            {form.email}
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              value={data.email}
              onChange={set("email")}
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 text-sm text-text-dim">
            {form.phone}
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              value={data.phone}
              onChange={set("phone")}
              className={fieldClass}
            />
          </label>
          <label className="grid gap-2 text-sm text-text-dim">
            {form.company}
            <input
              name="company"
              autoComplete="organization"
              value={data.company}
              onChange={set("company")}
              className={fieldClass}
            />
          </label>
        </div>
      )}

      {/* Step 3 — message + consent */}
      {step === 2 && (
        <div className="grid gap-5">
          <label className="grid gap-2 text-sm text-text-dim">
            {form.message}
            <textarea
              name="message"
              required
              rows={5}
              value={data.message}
              onChange={set("message")}
              className={fieldClass}
            />
          </label>

          <label className="flex cursor-pointer items-start gap-3 text-sm text-text-dim">
            <input
              type="checkbox"
              required
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-[var(--accent)]"
            />
            <span className="leading-relaxed">
              {form.consentBefore}
              <Link
                href={localized(lang, "/confidentialite")}
                target="_blank"
                className="font-medium text-accent underline underline-offset-2"
              >
                {form.consentLink}
              </Link>
              {form.consentAfter}
            </span>
          </label>
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      )}

      {/* navigation */}
      <div className="flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setError("");
              setStep((s) => Math.max(0, s - 1));
            }}
            className="inline-flex items-center gap-2 rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent hover:text-accent"
          >
            ← {form.back}
          </button>
        ) : (
          <span />
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "sending"
            ? "…"
            : step < STEPS - 1
              ? `${form.next} →`
              : form.submit}
        </button>
      </div>
    </form>
  );
}
