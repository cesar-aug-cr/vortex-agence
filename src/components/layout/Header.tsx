"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { hiddenSubServices } from "@/lib/site";
import { LogoMark } from "@/components/brand/LogoMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { AccessibilityWidget } from "@/components/layout/AccessibilityWidget";
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
  // Mobile nav: which main services have their sub-services expanded.
  const [openServices, setOpenServices] = useState<Set<string>>(new Set());
  const toggleService = (slug: string) =>
    setOpenServices((prev) => {
      const next = new Set(prev);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return next;
    });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    // Collapse every expanded sub-list when the menu closes, so each open
    // starts fresh (and the one-time hint animation reads cleanly).
    if (!mobileOpen) setOpenServices(new Set());
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
    <>
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
          aria-label="vortx — accueil"
          className={solid ? "text-text" : "text-white"}
        >
          <LogoMark className="h-8 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:block">
          <ul className="flex items-center gap-7 text-sm font-medium xl:gap-9">
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
                                {g.services.map((s) => {
                                  const subs =
                                    ((dict.subServices as Record<string, readonly { slug: string; title: string }[]>)[s.slug] ?? []).filter(
                                      (c) => !hiddenSubServices.has(c.slug)
                                    );
                                  return (
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
                                      {subs.length > 0 && (
                                        <ul className="mt-1.5 space-y-1.5 border-l border-border pl-3">
                                          {subs.map((c) => (
                                            <li key={c.slug}>
                                              <Link
                                                href={localized(lang, `/services/${s.slug}/${c.slug}`)}
                                                className="text-sm text-text-dim transition-colors hover:text-accent"
                                              >
                                                {c.title}
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                    </li>
                                  );
                                })}
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

            {/* Ressources dropdown */}
            <li className="group/res relative">
              <button
                type="button"
                aria-haspopup="true"
                className={`flex items-center gap-1.5 py-2 transition-colors ${navLinkClass}`}
              >
                {dict.nav.resources}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden className="transition-transform group-hover/res:rotate-180">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full z-40 w-52 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover/res:visible group-hover/res:translate-y-0 group-hover/res:opacity-100 group-focus-within/res:visible group-focus-within/res:translate-y-0 group-focus-within/res:opacity-100">
                <ul className="overflow-hidden rounded-xl border border-border bg-bg-card p-2 shadow-[var(--shadow-lg)]">
                  {[
                    { label: dict.nav.news, href: "/news" },
                    { label: dict.nav.glossary, href: "/glossaire" },
                    { label: dict.nav.faq, href: "/faq" },
                    { label: dict.nav.quiz, href: "/quiz" },
                  ].map((l) => (
                    <li key={l.href}>
                      <Link
                        href={localized(lang, l.href)}
                        className="block rounded-lg px-3 py-2 text-sm font-medium text-text transition-colors hover:bg-accent-soft hover:text-accent"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </nav>

        {/* Right cluster — order on every size: a11y · language · theme ·
            (CTA / burger) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* accessibility — leftmost */}
          <div className="order-1">
            <AccessibilityWidget labels={dict.a11y} onDark={!solid} />
          </div>
          {/* language — between accessibility and theme (visible on mobile too) */}
          <div className="order-2">
            <LanguageSwitcher lang={lang} onDark={!solid} />
          </div>
          {/* theme / colour — to the right of language */}
          <div className="order-3">
            <ThemeToggle label={dict.common.toggleTheme} onDark={!solid} />
          </div>
          <Link
            href={localized(lang, "/contact")}
            className="btn btn-primary order-4 hidden sm:inline-flex"
          >
            {dict.common.cta}
          </Link>

          {/* burger */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? dict.common.close : dict.common.openMenu}
            aria-expanded={mobileOpen}
            className={`order-5 inline-flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
              solid ? "border-border-strong text-text" : "border-white/30 text-white"
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              {mobileOpen ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu — rendered as a sibling of <header>, NOT inside it: the
          solid header's backdrop-filter would otherwise become the containing
          block for this fixed panel and trap it inside the 80px bar. */}
      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-[45] overflow-y-auto border-t border-border bg-bg lg:hidden">
          <nav className="container-vortx py-8">
            <p className="eyebrow">{dict.nav.services}</p>
            <ul className="mt-4 grid gap-1">
              {dict.services.map((s) => {
                const subs = (
                  (dict.subServices as Record<string, readonly { slug: string; title: string }[]>)[s.slug] ?? []
                ).filter((c) => !hiddenSubServices.has(c.slug));
                const open = openServices.has(s.slug);
                return (
                  <li key={s.slug} className="border-b border-border">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={localized(lang, `/services/${s.slug}`)}
                        onClick={() => setMobileOpen(false)}
                        className="mobnav-hint-row group flex flex-1 items-center gap-1.5 rounded-lg px-2 py-3 text-text"
                      >
                        {s.title}
                        <ArrowUpRight
                          width={16}
                          height={16}
                          className="text-text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </Link>
                      {subs.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleService(s.slug)}
                          aria-expanded={open}
                          aria-label={s.title}
                          className="mobnav-hint-toggle flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:text-accent"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden
                            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                      )}
                    </div>
                    {subs.length > 0 && open && (
                      <ul className="mb-3 ml-2 grid gap-0.5 border-l border-border pl-3">
                        {subs.map((c) => (
                          <li key={c.slug}>
                            <Link
                              href={localized(lang, `/services/${s.slug}/${c.slug}`)}
                              onClick={() => setMobileOpen(false)}
                              className="block py-2 text-sm text-text-dim transition-colors hover:text-accent"
                            >
                              {c.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
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

            <p className="eyebrow mt-8">{dict.nav.resources}</p>
            <ul className="mt-4 grid gap-1 text-lg font-medium">
              {[
                { label: dict.nav.news, href: "/news" },
                { label: dict.nav.glossary, href: "/glossaire" },
                { label: dict.nav.faq, href: "/faq" },
                { label: dict.nav.quiz, href: "/quiz" },
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
    </>
  );
}
