"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { featureIcons } from "@/components/illustrations/icons";
import { ArrowUpRight } from "@/components/ui/icons";

export type NewsCard = {
  slug: string;
  href: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readingMinutes: number;
  cover: string;
};

type Labels = {
  all: string;
  filterLabel: string;
  readingTime: string;
  readArticle: string;
  empty: string;
};

/**
 * News grid with category filtering. Categories are derived from the articles
 * themselves (first-seen order), so adding an article with a new category
 * surfaces a new filter automatically.
 */
export function NewsList({
  articles,
  labels,
  locale,
}: {
  articles: NewsCard[];
  labels: Labels;
  locale: string;
}) {
  const [active, setActive] = useState<string>("__all__");

  const categories = useMemo(() => {
    const seen: string[] = [];
    for (const a of articles) if (!seen.includes(a.category)) seen.push(a.category);
    return seen;
  }, [articles]);

  const fmt = useMemo(
    () => new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }),
    [locale]
  );

  const shown = active === "__all__" ? articles : articles.filter((a) => a.category === active);

  const pill = (key: string, label: string, isActive: boolean) => (
    <button
      key={key}
      type="button"
      onClick={() => setActive(key)}
      aria-pressed={isActive}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
        isActive
          ? "bg-accent text-accent-ink"
          : "border border-border text-text-dim hover:border-accent/50 hover:text-text"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="mt-12 md:mt-14">
      {/* filters */}
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs uppercase tracking-wide text-text-muted">
          {labels.filterLabel}
        </span>
        <div className="flex flex-wrap gap-2">
          {pill("__all__", labels.all, active === "__all__")}
          {categories.map((c) => pill(c, c, active === c))}
        </div>
      </div>

      {/* grid */}
      {shown.length === 0 ? (
        <p className="mt-12 text-text-dim">{labels.empty}</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((a) => {
            const Cover = featureIcons[a.cover];
            return (
              <Link
                key={a.slug}
                href={a.href}
                className="card card-hover spotlight-card group flex flex-col overflow-hidden"
              >
                <div className="illu-stage relative flex h-44 items-center justify-center overflow-hidden border-b border-border">
                  {Cover && <Cover className="h-28 w-28" />}
                  <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-stage/70 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wide text-stage-text-dim backdrop-blur-sm">
                    {a.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="font-mono text-xs text-text-muted">
                    {fmt.format(new Date(a.date))} · {a.readingMinutes} {labels.readingTime}
                  </span>
                  <h2 className="mt-3 text-lg font-semibold leading-snug text-text transition-colors group-hover:text-accent">
                    {a.title}
                  </h2>
                  <p className="mt-3 line-clamp-3 flex-1 text-sm text-text-dim">{a.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    {labels.readArticle}
                    <ArrowUpRight
                      width={15}
                      height={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
