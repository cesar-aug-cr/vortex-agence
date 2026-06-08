"use client";

import { useMemo, useState } from "react";
import type { GlossaryTerm } from "@/i18n/dictionaries/fr";

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
      {/* search */}
      <div className="sticky top-24 z-10 -mx-1 mb-8 bg-bg/80 px-1 py-2 backdrop-blur-sm">
        <div className="relative">
          <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-full border border-border bg-bg-card py-3.5 pl-12 pr-4 text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent"
          />
        </div>
        <p className="mt-2 px-2 font-mono text-xs text-text-muted">
          {filtered.length} {countSuffix}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-border bg-bg-card p-8 text-center text-text-dim">
          {emptyLabel}
        </p>
      ) : (
        <div className="space-y-12">
          {categories.map(({ cat, items }) => (
            <div key={cat}>
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
