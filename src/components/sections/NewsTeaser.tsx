import Link from "next/link";
import type { Dictionary } from "@/i18n/getDictionary";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { Section, SectionHeading } from "@/components/ui/Section";
import { featureIcons } from "@/components/illustrations/icons";
import { ArrowRight, ArrowUpRight } from "@/components/ui/icons";

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** Homepage teaser linking to the latest news articles. */
export function NewsTeaser({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const articles = dict.news.articles.slice(0, 3);
  if (articles.length === 0) return null;

  return (
    <Section tone="base">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow={dict.news.eyebrow}
          title={dict.news.homeTitle}
          lead={dict.news.homeLead}
        />
        <Link
          href={localized(lang, "/news")}
          className="group inline-flex items-center gap-2 text-sm font-semibold text-accent"
        >
          {dict.news.seeAll}
          <ArrowRight width={16} height={16} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {articles.map((a) => {
          const Cover = featureIcons[a.cover];
          return (
            <Link
              key={a.slug}
              href={localized(lang, `/news/${a.slug}`)}
              className="card card-hover spotlight-card group flex flex-col overflow-hidden"
            >
              <div className="illu-stage relative flex h-40 items-center justify-center overflow-hidden border-b border-border">
                {Cover && <Cover className="h-28 w-28" />}
                <span className="news-cat absolute left-4 top-4 rounded-full border border-border bg-bg/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-text-dim backdrop-blur-sm">
                  {a.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <span className="font-mono text-xs text-text-muted">
                  {formatDate(a.date)} · {a.readingMinutes} {dict.news.readingTime}
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-snug text-text transition-colors group-hover:text-accent">
                  {a.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 text-sm text-text-dim">{a.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                  {dict.news.readArticle}
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
