"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { HeaderCopy, NavService } from "@/i18n/slices";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { LogoMark } from "@/components/brand/LogoMark";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { AccessibilityWidget } from "@/components/layout/AccessibilityWidget";
import { ArrowUpRight, ArrowRight } from "@/components/ui/icons";

export function Header({
  copy,
  lang,
  overHero = false,
  sandbox = false,
}: {
  /** Typed slice of the dictionary (see i18n/slices.ts) — never the whole copy. */
  copy: HeaderCopy;
  lang: Locale;
  overHero?: boolean;
  /** /test-home white sandbox: darkens the over-hero logo so it reads on the
   *  white hero (light theme only). */
  sandbox?: boolean;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // /test-home sandbox only: track light/dark so the over-hero header renders
  // dark content on the white (light) hero instead of white-on-white.
  const [lightTheme, setLightTheme] = useState(false);
  // Mobile nav: which main services have their sub-services expanded.
  const [openServices, setOpenServices] = useState<Set<string>>(new Set());
  // Desktop services mega menu. Pointer-driven instead of pure :hover so the
  // sensitive area is exactly the trigger + the panel card: the full-width
  // wrapper is pointer-events-none, so leaving the card sideways closes it.
  // Keyboard users still get it via :focus-within (CSS classes below).
  const [megaOpen, setMegaOpen] = useState(false);
  const megaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelMegaClose = () => {
    if (megaTimer.current) {
      clearTimeout(megaTimer.current);
      megaTimer.current = null;
    }
  };
  const openMega = () => {
    cancelMegaClose();
    setMegaOpen(true);
  };
  const closeMegaSoon = (delay: number) => {
    cancelMegaClose();
    megaTimer.current = setTimeout(() => setMegaOpen(false), delay);
  };
  const closeMega = () => {
    cancelMegaClose();
    setMegaOpen(false);
  };
  useEffect(() => cancelMegaClose, []);
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMegaOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [megaOpen]);
  const toggleService = (slug: string) =>
    setOpenServices((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!sandbox) return;
    const el = document.documentElement;
    const apply = () => setLightTheme(!el.classList.contains("dark"));
    apply();
    const obs = new MutationObserver(apply);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [sandbox]);

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
  const groups: {
    key: keyof HeaderCopy["megaMenu"]["columns"];
    services: NavService[];
  }[] = [
    {
      key: "acquire",
      services: copy.services.filter((s) => s.group === "acquire"),
    },
    {
      key: "convert",
      services: copy.services.filter((s) => s.group === "convert"),
    },
    {
      key: "scale",
      services: copy.services.filter((s) => s.group === "scale"),
    },
    {
      key: "design",
      services: copy.services.filter((s) => s.group === "design"),
    },
  ];

  // The over-hero header normally renders white content (it sits on the dark
  // hero). On the /test-home white hero (sandbox + light theme) the content
  // must be dark instead — same as the solid state.
  const onLight = solid || (sandbox && lightTheme);
  const navLinkClass = onLight
    ? "text-text hover:text-accent-strong"
    : "text-white/90 hover:text-accent";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          sandbox ? "sandbox-header " : ""
        }${
          solid
            ? "border-b border-border bg-bg/85 backdrop-blur-md"
            : "border-b border-transparent"
        }`}
      >
        <div className="container-vortx flex h-20 items-center justify-between gap-6">
          <Link
            href={localized(lang, "/")}
            aria-label={`vortx — ${copy.common.breadcrumbHome}`}
            className={
              solid
                ? "text-text"
                : `text-white${sandbox ? " sandbox-overhero-logo" : ""}`
            }
          >
            <LogoMark className="h-8 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-7 text-sm font-medium xl:gap-9">
              {/* Services mega */}
              {/* h-20 = the full bar height, so the pointer can travel straight
                down from the trigger into the panel without a dead zone. */}
              <li
                className="group/mega static flex h-20 items-center"
                onPointerEnter={openMega}
                onPointerLeave={() => closeMegaSoon(150)}
              >
                <Link
                  href={localized(lang, "/services")}
                  aria-haspopup="true"
                  aria-expanded={megaOpen}
                  onClick={closeMega}
                  className={`flex items-center gap-1.5 py-2 transition-colors ${navLinkClass}`}
                >
                  {copy.nav.services}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                    className={`transition-transform ${megaOpen ? "rotate-180" : ""} group-focus-within/mega:rotate-180`}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </Link>

                {/* mega panel — the card sits 10 px up into the bar (closer to the
                  trigger); only the card itself takes pointer events. */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-[calc(100%-0.625rem)] z-40 transition-all duration-200 group-focus-within/mega:visible group-focus-within/mega:translate-y-0 group-focus-within/mega:opacity-100 ${
                    megaOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-1 opacity-0"
                  }`}
                >
                  <div className="container-vortx">
                    <div
                      className="nav-dropdown pointer-events-auto overflow-hidden rounded-2xl border border-border bg-bg-card shadow-[var(--shadow-lg)]"
                      onPointerEnter={cancelMegaClose}
                      onPointerLeave={() => closeMegaSoon(80)}
                      onClick={(e) => {
                        if ((e.target as HTMLElement).closest("a")) closeMega();
                      }}
                    >
                      <div className="p-8">
                        <p className="text-sm text-text-dim">
                          {copy.megaMenu.servicesLead}
                        </p>

                        {/* featured — flat full-width banner, right after the lead */}
                        <Link
                          href={localized(lang, "/services/lead-generation")}
                          prefetch={false}
                          className="group/feat spotlight-card card-hover relative mt-5 block rounded-xl border border-border bg-stage px-6 py-5 text-stage-text transition-[transform,box-shadow,border-color] duration-300"
                        >
                          <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-accent">
                            {copy.megaMenu.featured.label}
                          </span>
                          <div className="mt-3 flex items-center justify-between gap-6">
                            {/* vignette (images-test proposal 37): reuses the
                                lead-generation service render; sizes=128px → the
                                192 static variant (~8 Ko), lazy — the menu is
                                closed on load. Decorative, title sits next to it. */}
                            <span className="relative hidden h-[72px] w-32 shrink-0 overflow-hidden rounded-lg border border-white/10 bg-stage sm:block">
                              <Image
                                src="/services/lead-generation.webp"
                                alt=""
                                fill
                                sizes="128px"
                                className="object-cover"
                              />
                            </span>
                            <div className="min-w-0 flex-1">
                              {/* Not a heading: nav content must not outrank the page h1. */}
                              <p className="text-base font-semibold leading-tight">
                                {copy.megaMenu.featured.title}
                              </p>
                              <p className="mt-0.5 text-sm text-stage-text-dim">
                                {copy.megaMenu.featured.desc}
                              </p>
                            </div>
                            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-accent">
                              {copy.common.readMore}
                              <ArrowRight
                                width={15}
                                height={15}
                                className="transition-transform group-hover/feat:translate-x-1"
                              />
                            </span>
                          </div>
                        </Link>

                        <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                          {groups.map((g) => (
                            <div key={g.key}>
                              <p className="font-mono text-xs uppercase tracking-wide text-text-muted">
                                {copy.megaMenu.columns[g.key]}
                              </p>
                              <ul className="mt-3 space-y-3">
                                {g.services.map((s) => {
                                  const subs = s.subs;
                                  return (
                                    <li key={s.slug}>
                                      <Link
                                        href={localized(
                                          lang,
                                          `/services/${s.slug}`,
                                        )}
                                        prefetch={false}
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
                                                href={localized(
                                                  lang,
                                                  `/services/${s.slug}/${c.slug}`,
                                                )}
                                                prefetch={false}
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
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <Link
                  href={localized(lang, "/approche")}
                  className={`py-2 transition-colors ${navLinkClass}`}
                >
                  {copy.nav.approach}
                </Link>
              </li>
              <li>
                <Link
                  href={localized(lang, "/agence")}
                  className={`py-2 transition-colors ${navLinkClass}`}
                >
                  {copy.nav.about}
                </Link>
              </li>

              {/* Ressources dropdown */}
              <li className="group/res relative">
                <button
                  type="button"
                  aria-haspopup="true"
                  className={`flex items-center gap-1.5 py-2 transition-colors ${navLinkClass}`}
                >
                  {copy.nav.resources}
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    aria-hidden
                    className="transition-transform group-hover/res:rotate-180"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                <div className="invisible absolute left-0 top-full z-40 w-52 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover/res:visible group-hover/res:translate-y-0 group-hover/res:opacity-100 group-focus-within/res:visible group-focus-within/res:translate-y-0 group-focus-within/res:opacity-100">
                  <ul className="nav-dropdown overflow-hidden rounded-xl border border-border bg-bg-card p-2 shadow-[var(--shadow-lg)]">
                    {[
                      { label: copy.nav.news, href: "/news" },
                      { label: copy.nav.glossary, href: "/glossaire" },
                      { label: copy.nav.faq, href: "/faq" },
                      { label: copy.nav.quiz, href: "/quiz" },
                    ].map((l) => (
                      <li key={l.href}>
                        <Link
                          href={localized(lang, l.href)}
                          prefetch={false}
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
            {/* accessibility — leftmost. Desktop only: on mobile the launcher
              lives at the bottom of the burger menu instead. */}
            <div className="order-1 hidden lg:block">
              <AccessibilityWidget
                labels={copy.a11y}
                onDark={!onLight}
                floating
              />
            </div>
            {/* language — between accessibility and theme (visible on mobile too) */}
            <div className="order-2">
              <LanguageSwitcher lang={lang} onDark={!onLight} />
            </div>
            {/* theme / colour — to the right of language */}
            <div className="order-3">
              <ThemeToggle label={copy.common.toggleTheme} onDark={!onLight} />
            </div>
            <Link
              href={localized(lang, "/contact")}
              className="btn btn-primary order-4 hidden sm:inline-flex"
            >
              {copy.common.cta}
            </Link>

            {/* burger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? copy.common.close : copy.common.openMenu}
              aria-expanded={mobileOpen}
              className={`hdr-icon-btn order-5 inline-flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-colors hover:border-accent lg:hidden ${
                onLight
                  ? "border-transparent bg-text/5 text-text"
                  : "border-transparent bg-white/10 text-white"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden
              >
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6 6 18" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu — rendered as a sibling of <header>, NOT inside it: the
          solid header's backdrop-filter would otherwise become the containing
          block for this fixed panel and trap it inside the 80px bar. */}
      {mobileOpen && (
        <div className="fixed inset-0 top-20 z-[45] overflow-y-auto overscroll-contain border-t border-border bg-bg lg:hidden">
          <nav className="container-vortx py-8">
            {/* Primary CTA first — on mobile the menu is long, don't bury it. */}
            <Link
              href={localized(lang, "/contact")}
              onClick={() => setMobileOpen(false)}
              className="btn btn-primary mb-8 w-full"
            >
              {copy.common.cta}
            </Link>

            <p className="eyebrow">{copy.nav.services}</p>
            <ul className="mt-4 grid gap-1">
              {copy.services.map((s) => {
                const subs = s.subs;
                const open = openServices.has(s.slug);
                return (
                  <li key={s.slug} className="border-b border-border">
                    <div className="flex items-center justify-between gap-2">
                      <Link
                        href={localized(lang, `/services/${s.slug}`)}
                        prefetch={false}
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
                          className="mobnav-hint-toggle flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-text-muted transition-colors hover:text-accent dark:text-white/75"
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
                              href={localized(
                                lang,
                                `/services/${s.slug}/${c.slug}`,
                              )}
                              prefetch={false}
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
                { label: copy.nav.approach, href: "/approche" },
                { label: copy.nav.about, href: "/agence" },
                { label: copy.nav.contact, href: "/contact" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={localized(lang, l.href)}
                    prefetch={false}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-border py-3 text-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-8">{copy.nav.resources}</p>
            <ul className="mt-4 grid gap-1 text-lg font-medium">
              {[
                { label: copy.nav.news, href: "/news" },
                { label: copy.nav.glossary, href: "/glossaire" },
                { label: copy.nav.faq, href: "/faq" },
                { label: copy.nav.quiz, href: "/quiz" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={localized(lang, l.href)}
                    prefetch={false}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-border py-3 text-text"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Bottom of the menu: accessibility launcher (hidden from the bar
                on mobile) + the primary CTA repeated so it's reachable after
                scrolling through the whole list. */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center gap-3">
                <AccessibilityWidget labels={copy.a11y} />
                <span className="text-lg font-medium text-text">
                  {copy.a11y.button}
                </span>
              </div>
              <Link
                href={localized(lang, "/contact")}
                onClick={() => setMobileOpen(false)}
                className="btn btn-primary mt-6 w-full"
              >
                {copy.common.cta}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
