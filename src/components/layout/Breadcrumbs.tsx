import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { site } from "@/lib/site";

export type Crumb = { label: string; href?: string };

/** Localized accessible label for the breadcrumb nav (screen readers). */
const NAV_LABEL: Record<Locale, string> = {
  fr: "Fil d'Ariane",
  en: "Breadcrumb",
  de: "Brotkrümelnavigation",
  es: "Ruta de navegación",
};

export function Breadcrumbs({
  lang,
  homeLabel,
  items,
  className = "container-vortx pt-28 md:pt-32",
  tone = "base",
}: {
  lang: Locale;
  homeLabel: string;
  items: Crumb[];
  /** Wrapper classes — override when the nav sits inside another block (e.g. a full-bleed cover). */
  className?: string;
  /** "stage": light text for the always-dark stage surfaces. */
  tone?: "base" | "stage";
}) {
  const onStage = tone === "stage";
  const all: Crumb[] = [{ label: homeLabel, href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${localized(lang, c.href)}` } : {}),
    })),
  };

  return (
    <nav aria-label={NAV_LABEL[lang] ?? NAV_LABEL.fr} className={className}>
      <ol className={`flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wide ${onStage ? "text-stage-text-dim" : "text-text-muted"}`}>
        {all.map((c, i) => {
          const last = i === all.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-2">
              {c.href && !last ? (
                /* previous levels: thin underline */
                <Link
                  href={localized(lang, c.href)}
                  className={`underline decoration-1 underline-offset-4 transition-colors ${
                    onStage ? "decoration-stage-text-dim/50 hover:text-accent hover:decoration-accent" : "decoration-text-muted/50 hover:text-accent-strong hover:decoration-accent-strong"
                  }`}
                >
                  {c.label}
                </Link>
              ) : (
                /* current page: pill */
                <span
                  aria-current="page"
                  style={{ color: "var(--accent)" }}
                  className={`inline-flex items-center rounded-full border px-2.5 py-0.5 ${
                    onStage ? "border-white/15 bg-black/55 backdrop-blur-sm" : "border-stage-border bg-stage"
                  }`}
                >
                  {c.label}
                </span>
              )}
              {!last && <span aria-hidden className={onStage ? "text-stage-text-dim/50" : "text-text-muted/50"}>/</span>}
            </li>
          );
        })}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
