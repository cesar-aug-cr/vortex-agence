"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { localized } from "@/lib/locale";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

const STORAGE_KEY = "vortx-consent";

/** Read the stored consent ("granted" | "denied" | null). */
export function getConsent(): "granted" | "denied" | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "granted" || v === "denied" ? v : null;
}

/**
 * Opt-in cookie consent banner (RGPD / ePrivacy). Non-essential trackers
 * (GA4 / GTM / Meta) must only be loaded after `getConsent() === "granted"`
 * or after the "vortx-consent" CustomEvent fires with detail "granted".
 */
export function ConsentBanner({
  lang,
  consent,
}: {
  lang: Locale;
  consent: Dictionary["consent"];
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  function choose(value: "granted" | "denied") {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {}
    window.dispatchEvent(new CustomEvent("vortx-consent", { detail: value }));
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label={consent.title}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-2xl rounded-2xl border border-border bg-bg-elevated/95 p-5 shadow-[var(--shadow-lg)] backdrop-blur-md sm:inset-x-auto sm:right-4 sm:left-auto"
    >
      <p className="text-sm font-semibold text-text">{consent.title}</p>
      <p className="mt-2 text-sm text-text-dim">
        {consent.message}{" "}
        <Link
          href={localized(lang, "/cookies")}
          className="text-accent underline underline-offset-2"
        >
          {consent.learnMore}
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="btn btn-primary text-sm"
        >
          {consent.accept}
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="inline-flex items-center justify-center rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent"
        >
          {consent.refuse}
        </button>
      </div>
    </div>
  );
}
