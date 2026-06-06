"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { LogoMark } from "@/components/brand/LogoMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ArrowUpRight, ArrowRight } from "@/components/ui/icons";

type Service = Dictionary["services"][number];

export function Header({
  dict,
  lang,
  overHero = false,
}: {
  dict: Dictionary;
  lang: Locale;
  overHero?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const solid = scrolled || !overHero;
  const groups: { key: keyof Dictionary["megaMenu"]["columns"]; services: Service[] }[] = [
    { key: "acquire", services: dict.services.filter((s) => s.group === "acquire") },
    { key: "convert", services: dict.services.filter((s) => s.group === "convert") },
    { key: "scale", services: dict.services.filter((s) => s.group === "scale") },
  ];

  const navLinkClass = solid
    ? "text-text hover:text-accent"
    : "text-white/90 hover:text-accent";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="container-vortx flex h-20 items-center justify-between gap-6">
        <Link
          href={localized(lang, "/")}
          aria-label="VorTX — accueil"
          className={solid ? "text-text" : "text-white"}
        >
          <LogoMark className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-9 text-sm font-medium">
            {/* Services mega */}
            <li className="group/mega static">
              <Link
                href={localized(lang, "/services")}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 py-2 transition-colors ${navLinkClass}`}
              >
                {dict.nav.services}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden className="transition-transform group-hover/mega:rotate-180">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </Link>

              {/* mega panel */}
              <div className="invisible absolute inset-x-0 top-full z-40 translate-y-2 opacity-0 transition-all duration-200 group-hover/mega:visible group-hover/mega:translate-y-0 group-hover/mega:opacity-100 group-focus-within/mega:visible group-focus-within/mega:translate-y-0 group-focus-within/mega:opacity-100">
                <div className="container-vortx pt-2">
                  <div className="overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[var(--shadow-lg)]">
                    <div className="grid gap-8 p-8 lg:grid-cols-[2fr_1fr]">
                      <div>
                        <p className="text-sm text-text-dim">{dict.megaMenu.servicesLead}</p>
                        <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-3">
                          {groups.map((g) => (
                            <div key={g.key}>
                              <p className="font-mono text-xs uppercase tracking-wide text-text-muted">
                                {dict.megaMenu.columns[g.key]}
                              </p>
                              <ul className="mt-3 space-y-3">
                                {g.services.map((s) => (
                                  <li key={s.slug}>
                                    <Link
                                      href={localized(lang, `/services/${s.slug}`)}
                                      className="group/it flex items-center gap-1 text-sm font-medium text-text transition-colors hover:text-accent"
                                    >
                                      {s.title}
                                      <ArrowUpRight
                                        width={13}
                                        height={13}
                                        className="opacity-0 transition-opacity group-hover/it:opacity-100"
                                      />
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* featured */}
                      <Link
                        href={localized(lang, "/services/lead-generation")}
                        className="group/feat relative flex flex-col justify-between overflow-hidden rounded-xl bg-stage p-6 text-stage-text"
                      >
                        <div
                          className="pointer-events-none absolute inset-0"
                          aria-hidden
                          style={{
                            backgroundImage:
                              "radial-gradient(80% 80% at 80% 10%, rgba(20,224,200,0.18), transparent 60%), radial-gradient(70% 60% at 10% 100%, rgba(200,240,46,0.14), transparent 60%)",
                          }}
                        />
                        <div className="relative">
                          <span className="font-mono text-[0.7rem] uppercase tracking-wide text-accent">
                            {dict.megaMenu.featured.label}
                          </span>
                          <h4 className="mt-3 text-lg font-semibold">
                            {dict.megaMenu.featured.title}
                          </h4>
                          <p className="mt-2 text-sm text-stage-text-dim">
                            {dict.megaMenu.featured.desc}
                          </p>
                        </div>
                        <span className="relative mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                          {dict.common.readMore}
                          <ArrowRight width={15} height={15} className="transition-transform group-hover/feat:translate-x-1" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <Link href={localized(lang, "/approche")} className={`py-2 transition-colors ${navLinkClass}`}>
                {dict.nav.approach}
              </Link>
            </li>
            <li>
              <Link href={localized(lang, "/realisations")} className={`py-2 transition-colors ${navLinkClass}`}>
                {dict.nav.work}
              </Link>
            </li>
            <li>
              <Link href={localized(lang, "/agence")} className={`py-2 transition-colors ${navLinkClass}`}>
                {dict.nav.about}
              </Link>
            </li>
          </ul>
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <span
            className={`hidden font-mono text-xs uppercase tracking-widest sm:inline ${
              solid ? "text-text-muted" : "text-white/60"
            }`}
            title="Bientôt : DE · EN · LU"
          >
            FR
          </span>
          <ThemeToggle label={dict.common.toggleTheme} />
          <Link
            href={localized(lang, "/contact")}
            className="btn btn-primary hidden sm:inline-flex"
          >
            {dict.common.cta}
          </Link>

          {/* burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? dict.common.close : dict.common.openMenu}
            aria-expanded={mobileOpen}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
              solid ? "border-border-strong text-text" : "border-white/30 text-white"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-40 overflow-y-auto border-t border-border bg-bg lg:hidden">
          <nav className="container-vortx py-8">
            <p className="eyebrow">{dict.nav.services}</p>
            <ul className="mt-4 grid gap-1">
              {dict.services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={localized(lang, `/services/${s.slug}`)}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between border-b border-border py-3 text-text"
                  >
                    {s.title}
                    <ArrowUpRight width={16} height={16} className="text-text-muted" />
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="mt-8 grid gap-1 text-lg font-medium">
              {[
                { label: dict.nav.approach, href: "/approche" },
                { label: dict.nav.work, href: "/realisations" },
                { label: dict.nav.about, href: "/agence" },
                { label: dict.nav.contact, href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={localized(lang, l.href)}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-border py-3 text-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href={localized(lang, "/contact")}
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary mt-8 w-full"
            >
              {dict.common.cta}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
