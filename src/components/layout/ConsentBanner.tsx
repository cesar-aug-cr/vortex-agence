"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { localized } from "@/lib/locale";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Cookie } from "@/components/ui/icons";
import {
  readConsent,
  writeConsent,
  CONSENT_OPEN_EVENT,
  type ConsentChoice,
} from "@/lib/consent";

/**
 * Opt-in cookie consent (RGPD / ePrivacy). Strictly-necessary cookies only
 * until the visitor grants a category. Persists via lib/consent (cookie +
 * Google Consent Mode v2). Once a choice exists, a floating cookie button
 * (bottom-right, iubenda-style) lets the visitor re-open their preferences.
 */
export function ConsentBanner({
  lang,
  consent,
}: {
  lang: Locale;
  consent: Dictionary["consent"];
}) {
  const [open, setOpen] = useState(false);
  const [decided, setDecided] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice>({ analytics: false, marketing: false });

  const reopen = useCallback(() => {
    const existing = readConsent();
    setChoice({
      analytics: existing?.analytics ?? false,
      marketing: existing?.marketing ?? false,
    });
    setShowPrefs(true);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (readConsent()) setDecided(true);
    else setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, [reopen]);

  function decide(c: ConsentChoice) {
    writeConsent(c);
    setOpen(false);
    setShowPrefs(false);
    setDecided(true);
  }

  // Floating re-open button (shown once a choice exists and the banner is closed)
  if (!open) {
    if (!decided) return null;
    return (
      <button
        type="button"
        onClick={reopen}
        aria-label={consent.manage}
        title={consent.manage}
        className="fixed bottom-5 left-5 z-30 hidden h-12 w-12 items-center justify-center rounded-full border border-border bg-bg-elevated/70 text-text shadow-[var(--shadow-md)] backdrop-blur-xl transition-colors hover:border-accent hover:text-accent-strong lg:flex"
      >
        <Cookie width={22} height={22} />
      </button>
    );
  }

  const cat = consent.categories;
  const secondaryBtn =
    "inline-flex items-center justify-center rounded-full border border-border-strong px-5 py-2.5 text-sm font-semibold text-text transition-colors hover:border-accent";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={consent.title}
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-xl rounded-2xl border border-border bg-bg-elevated/95 p-5 shadow-[var(--shadow-lg)] backdrop-blur-md sm:inset-x-auto sm:right-4 sm:left-auto"
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

      {showPrefs && (
        <div className="mt-4 grid gap-3">
          <ToggleRow
            title={cat.necessary.title}
            desc={cat.necessary.desc}
            checked
            disabled
            badge={cat.necessary.always}
          />
          <ToggleRow
            title={cat.analytics.title}
            desc={cat.analytics.desc}
            checked={choice.analytics}
            onChange={(v) => setChoice((p) => ({ ...p, analytics: v }))}
          />
          <ToggleRow
            title={cat.marketing.title}
            desc={cat.marketing.desc}
            checked={choice.marketing}
            onChange={(v) => setChoice((p) => ({ ...p, marketing: v }))}
          />
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => decide({ analytics: true, marketing: true })}
          className="btn btn-primary text-sm"
        >
          {consent.acceptAll}
        </button>
        {showPrefs ? (
          <button type="button" onClick={() => decide(choice)} className={secondaryBtn}>
            {consent.save}
          </button>
        ) : (
          <button type="button" onClick={() => setShowPrefs(true)} className={secondaryBtn}>
            {consent.customize}
          </button>
        )}
        <button
          type="button"
          onClick={() => decide({ analytics: false, marketing: false })}
          className={secondaryBtn}
        >
          {consent.rejectAll}
        </button>
      </div>
    </div>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
  disabled,
  badge,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  badge?: string;
}) {
  return (
    <label
      className={`flex items-start justify-between gap-4 rounded-xl border border-border p-3 ${
        disabled ? "opacity-80" : "cursor-pointer"
      }`}
    >
      <span>
        <span className="flex items-center gap-2 text-sm font-medium text-text">
          {title}
          {badge && (
            <span className="rounded-full bg-accent-soft px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-accent">
              {badge}
            </span>
          )}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-text-dim">{desc}</span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-1 h-5 w-5 shrink-0 accent-[color:var(--accent)] disabled:cursor-not-allowed"
      />
    </label>
  );
}
