"use client";

import { useState } from "react";
import Link from "next/link";
import { localized } from "@/lib/locale";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { ArrowUpRight } from "@/components/ui/icons";

/**
 * Desktop-only floating buttons on the right of the hero. They drift gently
 * (staggered float) and the whole group freezes while hovered. The first button
 * opens a services popover. Uses always-dark "stage" colours since the hero
 * stage is dark in both themes.
 */
export function HeroFloatingButtons({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const [open, setOpen] = useState(false);

  const pill =
    "glass-pill inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-stage-text shadow-[var(--shadow-lg)] backdrop-blur-xl transition-colors hover:bg-white/[0.16]";
  const float = "animate-float group-hover:[animation-play-state:paused]";

  return (
    <div className="group pointer-events-auto absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex">
      {/* 1. Services (with popover) */}
      <div
        className={`relative ${float}`}
        style={{ animationDuration: "5.6s" }}
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="true"
          aria-expanded={open}
          className={`${pill} ${open ? "bg-white/[0.16]" : ""}`}
        >
          {dict.common.servicesVortx}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
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
            <div className="glass-pill absolute right-0 top-full z-10 mt-3 w-64 animate-fade-in-up rounded-2xl bg-stage-elevated/90 p-2 text-stage-text shadow-[var(--shadow-lg)] backdrop-blur-xl">
              <p className="px-3 pb-1 pt-1.5 font-mono text-[0.6rem] uppercase tracking-wide text-stage-text-dim">
                {dict.servicesSection.eyebrow}
              </p>
              <ul className="grid">
                {dict.services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={localized(lang, `/services/${s.slug}`)}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-stage-text transition-colors hover:bg-white/5 hover:text-accent"
                    >
                      {s.title}
                      <ArrowUpRight width={13} height={13} className="text-stage-text-dim" />
                    </Link>
                  </li>
                ))}
                <li className="mt-1 border-t border-white/10 pt-1">
                  <Link
                    href={localized(lang, "/services")}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-accent"
                  >
                    {dict.common.allServices}
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>

      {/* 2. Réalisations */}
      <Link
        href={localized(lang, "/realisations")}
        className={`${pill} ${float}`}
        style={{ animationDuration: "6.4s", animationDelay: "-1.6s" }}
      >
        {dict.nav.work}
        <ArrowUpRight width={15} height={15} />
      </Link>

      {/* 3. FAQ */}
      <a
        href="#faq"
        className={`${pill} ${float}`}
        style={{ animationDuration: "7s", animationDelay: "-3.2s" }}
      >
        {dict.common.faq}
        <ArrowUpRight width={15} height={15} />
      </a>
    </div>
  );
}
