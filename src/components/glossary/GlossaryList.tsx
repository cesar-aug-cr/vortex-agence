"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { GlossaryTerm } from "@/i18n/dictionaries/fr";
import type { Locale } from "@/i18n/config";
import { localized } from "@/lib/locale";
import { StickySearch } from "@/components/ui/StickySearch";
import { glossaryCategoryId } from "@/lib/glossary";
import { ArrowRight } from "@/components/ui/icons";

/** Searchable, category-grouped glossary list. */
export function GlossaryList({
  terms,
  lang,
  searchPlaceholder,
  countSuffix,
  emptyLabel,
}: {
  terms: GlossaryTerm[];
  lang: Locale;
  searchPlaceholder: string;
  countSuffix: string;
  emptyLabel: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return terms;
    return terms.filter((t) =>
      `${t.term} ${t.short} ${t.def} ${t.category}`.toLowerCase().includes(q)
    );
  }, [query, terms]);

  // preserve category order of first appearance
  const categories = useMemo(() => {
    const order: string[] = [];
    for (const t of filtered) if (!order.includes(t.category)) order.push(t.category);
    return order.map((cat) => ({ cat, items: filtered.filter((t) => t.category === cat) }));
  }, [filtered]);

  return (
    <div className="mt-12">
      <StickySearch
        value={query}
        onChange={setQuery}
        placeholder={searchPlaceholder}
        count={filtered.length}
        countSuffix={countSuffix}
        mobileSticky={false}
      />

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-border bg-bg-card p-8 text-center text-text-dim">
          {emptyLabel}
        </p>
      ) : (
        <div className="space-y-12">
          {categories.map(({ cat, items }) => (
            <div key={cat} id={glossaryCategoryId(cat)} className="scroll-mt-28">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {cat}
              </h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {items.map((t) => (
                  <div
                    key={t.slug}
                    id={t.slug}
                    className="card scroll-mt-28 p-6"
                  >
                    <h3 className="text-lg font-semibold text-text">{t.term}</h3>
                    <p className="mt-1 text-sm font-medium text-accent">{t.short}</p>
                    <p className="mt-3 text-sm leading-relaxed text-text-dim">{t.def}</p>
                    {t.links?.length ? (
                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
                        {t.links.map((l) => (
                          <Link
                            key={l.href}
                            href={localized(lang, l.href)}
                            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong"
                          >
                            {l.label}
                            <ArrowRight
                              width={14}
                              height={14}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
