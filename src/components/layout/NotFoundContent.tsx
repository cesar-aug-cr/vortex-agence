"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { i18n, isLocale, type Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { routeSlugs } from "@/i18n/routes";
import BlackHoleLazy from "@/components/three/BlackHoleLazy";

/**
 * The not-found boundary renders without route params AND must stay free of
 * request APIs like headers() — a single headers() call there opts the whole
 * site out of static generation. So the locale is derived from the URL on the
 * client, and the handful of strings this page needs live here instead of in
 * the full dictionaries (which are server-side).
 */
const STRINGS: Record<
  Locale,
  {
    title: string;
    lead: string;
    cta: string;
    didYouMean: string;
    explore: string;
    contactLead: string;
    contactCta: string;
    nav: { services: string; about: string; news: string; contact: string };
  }
> = {
  fr: {
    title: "Page introuvable",
    lead: "Cette page a franchi l'horizon des événements — elle n'existe pas ou a été déplacée.",
    cta: "Retour à l'accueil",
    didYouMean: "Vous cherchiez peut-être :",
    explore: "Pages utiles",
    contactLead: "Vous ne trouvez pas ce que vous cherchez ?",
    contactCta: "Écrivez-nous",
    nav: { services: "Services", about: "Agence", news: "News", contact: "Contact" },
  },
  en: {
    title: "Page not found",
    lead: "This page crossed the event horizon — it doesn't exist or has been moved.",
    cta: "Back to home",
    didYouMean: "Were you looking for:",
    explore: "Useful pages",
    contactLead: "Can't find what you're looking for?",
    contactCta: "Write to us",
    nav: { services: "Services", about: "Agency", news: "News", contact: "Contact" },
  },
  de: {
    title: "Seite nicht gefunden",
    lead: "Diese Seite hat den Ereignishorizont überquert — sie existiert nicht oder wurde verschoben.",
    cta: "Zurück zur Startseite",
    didYouMean: "Meinten Sie vielleicht:",
    explore: "Nützliche Seiten",
    contactLead: "Sie finden nicht, was Sie suchen?",
    contactCta: "Schreiben Sie uns",
    nav: { services: "Leistungen", about: "Agentur", news: "News", contact: "Kontakt" },
  },
  es: {
    title: "Página no encontrada",
    lead: "Esta página cruzó el horizonte de sucesos — no existe o ha sido movida.",
    cta: "Volver al inicio",
    didYouMean: "Quizás buscaba:",
    explore: "Páginas útiles",
    contactLead: "¿No encuentra lo que busca?",
    contactCta: "Escríbanos",
    nav: { services: "Servicios", about: "Agencia", news: "Novedades", contact: "Contacto" },
  },
};

/** Iterative two-row Levenshtein — inputs are short route slugs. */
function levenshtein(a: string, b: string): number {
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  const row = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let prev = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        prev + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
      prev = tmp;
    }
  }
  return row[b.length];
}

/**
 * "Did you mean" — compare the failed first segment against every public
 * (localized) and canonical top-level slug; suggest the closest within an
 * edit distance of 2.
 */
function suggestPath(lang: Locale, pathname: string): string | null {
  const seg = decodeURIComponent(pathname.split("/")[2] ?? "").toLowerCase();
  if (seg.length < 3) return null;

  let best: { canonical: string; dist: number } | null = null;
  for (const canonical of [...Object.keys(routeSlugs), "quiz"]) {
    const publicSlug = routeSlugs[canonical]?.[lang] ?? canonical;
    const dist = Math.min(
      levenshtein(seg, publicSlug),
      levenshtein(seg, canonical)
    );
    if (dist === 0) return null; // real slug that 404'd deeper — no typo to fix
    if (dist <= 2 && (!best || dist < best.dist)) best = { canonical, dist };
  }
  return best ? localized(lang, `/${best.canonical}`) : null;
}

export function NotFoundContent() {
  const pathname = usePathname() ?? "";
  const seg = pathname.split("/")[1] ?? "";
  const lang = isLocale(seg) ? seg : i18n.defaultLocale;
  const t = STRINGS[lang];
  const suggestion = suggestPath(lang, pathname);

  const explore = [
    { href: localized(lang, "/services"), label: t.nav.services },
    { href: localized(lang, "/agence"), label: t.nav.about },
    { href: localized(lang, "/news"), label: t.nav.news },
    { href: localized(lang, "/contact"), label: t.nav.contact },
  ];

  return (
    <main>
      <section className="hero-section relative isolate flex min-h-dvh items-center overflow-hidden bg-stage text-stage-text">
        {/* 3D black hole — the particle version from the original home hero,
            "swallowing" the page */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <BlackHoleLazy
            showSphere={false}
            bhPositionOverride={[2.4, 0.4, 0]}
            bhPositionMobileOverride={[1.2, 2.6, 1]}
            bhScaleOverride={1.7}
            eventHorizonColorLight="#ffffff"
            diskLimeOnLight
          />
        </div>
        {/* readability halo between the 3D scene and the text */}
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          aria-hidden
          style={{
            background:
              "radial-gradient(60% 60% at 50% 45%, rgba(var(--hero-tint, 7,7,10),0.72), rgba(var(--hero-tint, 7,7,10),0.35) 60%, transparent 85%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3" aria-hidden
          style={{ background: "linear-gradient(to top, var(--stage), transparent)" }}
        />

        <div className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center md:py-32">
          <p className="font-mono text-6xl font-bold text-accent md:text-7xl">404</p>
          <h1 className="mt-6 text-3xl font-bold md:text-4xl">{t.title}</h1>
          <p className="mt-4 text-lg text-stage-text-dim">{t.lead}</p>

          {suggestion && (
            <p className="mt-6 text-stage-text-dim">
              {t.didYouMean}{" "}
              <Link
                href={suggestion}
                className="font-mono text-accent underline decoration-dotted underline-offset-4 hover:decoration-solid"
              >
                {suggestion}
              </Link>
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={localized(lang, "/")} className="btn btn-primary">
              {t.cta}
            </Link>
          </div>

          {/* rescue navigation */}
          <p className="mt-14 font-mono text-xs uppercase tracking-[0.22em] text-stage-text-dim">
            {t.explore}
          </p>
          <nav className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {explore.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium backdrop-blur-sm transition hover:border-accent/40 hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <p className="mt-12 text-sm text-stage-text-dim">
            {t.contactLead}{" "}
            <Link
              href={localized(lang, "/contact")}
              className="font-semibold text-accent hover:underline"
            >
              {t.contactCta}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
