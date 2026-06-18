import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Section, SectionHeading } from "@/components/ui/Section";
import { featureIcons } from "@/components/illustrations/icons";
import { ArrowUpRight } from "@/components/ui/icons";

const DATE_LOCALE: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en-GB",
  de: "de-DE",
  es: "es-ES",
};

type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readingMinutes: number;
  cover: string;
};

/**
 * "Related articles" block shown at the bottom of a service / sub-service page:
 * the news pieces tied to that service (see lib/relatedArticles). Pure internal
 * linking — reuses the news-card look.
 */
export function RelatedServiceArticles({
  lang,
  title,
  lead,
  articles,
  readingTimeLabel,
  readLabel,
}: {
  lang: Locale;
  title: string;
  lead: string;
  articles: Article[];
  readingTimeLabel: string;
  readLabel: string;
}) {
  if (articles.length === 0) return null;

  const fmt = new Intl.DateTimeFormat(DATE_LOCALE[lang] ?? "fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Section tone="muted">
      <SectionHeading eyebrow={title} title={lead} />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => {
          const Cover = featureIcons[a.cover];
          return (
            <Link
              key={a.slug}
              href={localized(lang, `/news/${a.slug}`)}
              className="card card-hover spotlight-card group flex flex-col overflow-hidden"
            >
              <div className="illu-stage relative flex h-36 items-center justify-center overflow-hidden border-b border-border">
                {Cover && <Cover className="h-24 w-24" />}
                <span className="absolute left-4 top-4 rounded-full border border-border bg-bg/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-text-dim backdrop-blur-sm">
                  {a.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-xs text-text-muted">
                  {fmt.format(new Date(a.date))} · {a.readingMinutes} {readingTimeLabel}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-text transition-colors group-hover:text-accent">
                  {a.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm text-text-dim">{a.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  {readLabel}
                  <ArrowUpRight width={15} height={15} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
