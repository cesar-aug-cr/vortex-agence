"use client";

import { useMemo, useState } from "react";
import type { GlossaryTerm } from "@/i18n/dictionaries/fr";
import { StickySearch } from "@/components/ui/StickySearch";
import { glossaryCategoryId } from "@/lib/glossary";

/** Searchable, category-grouped glossary list. */
export function GlossaryList({
  terms,
  searchPlaceholder,
  countSuffix,
  emptyLabel,
}: {
  terms: GlossaryTerm[];
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
