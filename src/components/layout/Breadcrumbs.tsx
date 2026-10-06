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
                <Link href={localized(lang, c.href)} className={`transition-colors ${onStage ? "hover:text-accent" : "hover:text-accent-strong"}`}>
                  {c.label}
                </Link>
              ) : (
                <span className={onStage ? "text-stage-text" : "text-text-dim"}>{c.label}</span>
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
