"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { localized } from "@/lib/locale";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Cookie, ArrowRight, ArrowUpRight } from "@/components/ui/icons";
import { openConsentPreferences } from "@/lib/consent";

/**
 * Mobile-only floating action pill (glassmorphism, fully rounded) that appears
 * once the hero is scrolled past. Three compact actions:
 *   🍪 (re-open cookie preferences) · "Les services" (opens an upward popover
 *   listing the services) · "Réserver un appel".
 */
export function StickyCta({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [show, setShow] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 transition-all duration-300 lg:hidden ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-[160%] opacity-0"
      }`}
      style={{ paddingBottom: "max(0px, env(safe-area-inset-bottom))" }}
    >
      <div className="relative">
        {/* Upward services popover */}
        {servicesOpen && (
          <>
            <button
              type="button"
              aria-hidden
              tabIndex={-1}
              onClick={() => setServicesOpen(false)}
              className="fixed inset-0 z-0 cursor-default"
            />
            <div className="glass-pill absolute bottom-full left-1/2 z-10 mb-3 w-64 -translate-x-1/2 animate-fade-in-up rounded-2xl bg-bg-elevated/70 p-2 shadow-[var(--shadow-lg)] backdrop-blur-xl">
              <p className="px-3 pb-1 pt-1.5 font-mono text-[0.6rem] uppercase tracking-wide text-text-muted">
                {dict.servicesSection.eyebrow}
              </p>
              <ul className="grid">
                {dict.services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={localized(lang, `/services/${s.slug}`)}
                      onClick={() => setServicesOpen(false)}
                      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-text transition-colors hover:bg-accent-soft hover:text-accent"
                    >
                      {s.title}
                      <ArrowUpRight width={13} height={13} className="text-text-muted" />
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-border pt-1">
                  <Link
                    href={localized(lang, "/services")}
                    onClick={() => setServicesOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-accent"
                  >
                    {dict.common.allServices}
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {/* glassmorphism pill */}
        <div className="glass-pill relative z-10 flex items-center gap-1.5 rounded-full bg-bg-elevated/60 p-1.5 shadow-[var(--shadow-lg)] backdrop-blur-xl">
          <button
            type="button"
            onClick={openConsentPreferences}
            aria-label={dict.consent.manage}
            title={dict.consent.manage}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-text transition-colors hover:border-accent hover:text-accent"
          >
            <Cookie width={17} height={17} />
          </button>
          <button
            type="button"
            onClick={() => setServicesOpen((v) => !v)}
            aria-haspopup="true"
            aria-expanded={servicesOpen}
            className={`whitespace-nowrap rounded-full border px-3 py-2 text-xs font-semibold transition-colors ${
              servicesOpen
                ? "border-accent text-accent"
                : "border-border-strong text-text hover:border-accent"
            }`}
          >
            {dict.common.servicesShort}
          </button>
          <Link
            href={localized(lang, "/contact")}
            className="inline-flex items-center gap-1 whitespace-nowrap rounded-full bg-accent px-3 py-2 text-xs font-semibold text-accent-ink transition-transform hover:-translate-y-0.5"
          >
            {dict.common.cta}
            <ArrowRight width={14} height={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
