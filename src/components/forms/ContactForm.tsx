"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { localized } from "@/lib/locale";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

type FormCopy = Dictionary["contact"]["form"];
type ServiceOpt = { slug: string; title: string };

const fieldClass =
  "w-full rounded-lg border border-border bg-bg-card px-4 py-3 text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent";

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

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    const payload = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, lang }),
      });
      if (!res.ok) throw new Error();
      router.push(localized(lang, "/merci"));
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      {/* Honeypot — hidden from users, catches bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-text-dim">
          {form.name}
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm text-text-dim">
          {form.email}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </label>
        <label className="grid gap-2 text-sm text-text-dim">
          {form.phone}
          <input name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm text-text-dim">
          {form.company}
          <input name="company" autoComplete="organization" className={fieldClass} />
        </label>
      </div>

      <label className="grid gap-2 text-sm text-text-dim">
        {form.interest}
        <select name="interest" defaultValue="" className={fieldClass}>
          <option value="" disabled>
            —
          </option>
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2 text-sm text-text-dim">
        {form.message}
        <textarea name="message" required rows={5} className={fieldClass} />
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-400">
          Une erreur est survenue. Réessayez ou écrivez-nous directement par e-mail.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn btn-primary justify-self-start disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "sending" ? "…" : form.submit}
      </button>
    </form>
  );
}
