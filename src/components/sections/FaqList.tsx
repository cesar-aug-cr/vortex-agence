"use client";

import { useMemo, useState } from "react";
import { Plus } from "@/components/ui/icons";

type FaqItem = { q: string; a: string };
type FaqGroup = { title: string; items: readonly FaqItem[] };

/** Searchable, category-grouped FAQ accordion. */
export function FaqList({
  groups,
  searchPlaceholder,
  countSuffix,
  emptyLabel,
}: {
  groups: readonly FaqGroup[];
  searchPlaceholder: string;
  countSuffix: string;
  emptyLabel: string;
}) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;
    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter((it) =>
          `${it.q} ${it.a}`.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query, groups]);

  const count = filteredGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="mt-12">
      {/* search */}
      <div className="sticky top-24 z-10 -mx-1 mb-10 bg-bg/80 px-1 py-2 backdrop-blur-sm">
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
          {count} {countSuffix}
        </p>
      </div>

      {count === 0 ? (
        <p className="rounded-2xl border border-border bg-bg-card p-8 text-center text-text-dim">
          {emptyLabel}
        </p>
      ) : (
        <div className="space-y-12">
          {filteredGroups.map((g) => (
            <div key={g.title}>
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                {g.title}
              </h2>
              <div className="mt-4 divide-y divide-border border-y border-border">
                {g.items.map((item) => (
                  <details key={item.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-text marker:hidden">
                      {item.q}
                      <Plus
                        width={20}
                        height={20}
                        className="shrink-0 text-accent transition-transform duration-300 group-open:rotate-45"
                      />
                    </summary>
                    <p className="mt-3 max-w-2xl text-text-dim">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
