"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, localeNames, localeShort, type Locale } from "@/i18n/config";
import { canonicalizePath, localizePath } from "@/i18n/routes";

/**
 * Language switcher — swaps the locale segment of the current path while
 * keeping the rest of the route, so the user stays on the same page.
 */
export function LanguageSwitcher({
  lang,
  onDark = false,
}: {
  lang: Locale;
  onDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() || `/${lang}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Swap locale AND translate the slug: canonicalize the current localized
  // path, then re-localize it for the target language so the user lands on the
  // same page with that language's URL (e.g. /es/agencia → /de/agentur).
  const pathFor = (target: string) => {
    const rest = pathname.replace(/^\/[^/]+/, "") || "/";
    const canonical = canonicalizePath(lang, rest);
    const localizedRest = localizePath(target, canonical);
    return `/${target}${localizedRest === "/" ? "" : localizedRest}`;
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={localeNames[lang]}
        className={`inline-flex h-11 items-center gap-1.5 rounded-full border px-3.5 font-mono text-xs uppercase tracking-widest transition-colors ${
          onDark
            ? "border-white/25 text-white/80 hover:border-accent hover:text-accent"
            : "border-border-strong text-text-muted hover:border-accent hover:text-accent"
        }`}
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
        {localeShort[lang]}
        <svg
          width={12}
          height={12}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-0 cursor-default"
          />
          <ul className="absolute right-0 top-full z-10 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-bg-card py-1 shadow-[var(--shadow-lg)]">
            {i18n.locales.map((l) => (
              <li key={l}>
                <Link
                  href={pathFor(l)}
                  hrefLang={l}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-accent-soft hover:text-accent ${
                    l === lang ? "font-semibold text-accent" : "text-text"
                  }`}
                >
                  {localeNames[l]}
                  <span className="font-mono text-xs text-text-muted">{localeShort[l]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
