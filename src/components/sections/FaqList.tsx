"use client";

import { useMemo, useState } from "react";
import { Plus } from "@/components/ui/icons";
import { StickySearch } from "@/components/ui/StickySearch";
import { faqGroupId } from "@/lib/faq";

type FaqItem = { q: string; a: string };
type FaqGroup = { title: string; items: readonly FaqItem[] };

/**
 * Searchable, category-grouped FAQ accordion. Each group carries a stable
 * anchor id ({@link faqGroupId}) so the page's sticky table of contents can
 * jump to it. The search bar is sticky on desktop only — on mobile the sticky
 * slot is taken by the article-style TOC bar.
 */
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
    <div>
      <StickySearch
        value={query}
        onChange={setQuery}
        placeholder={searchPlaceholder}
        count={count}
        countSuffix={countSuffix}
        mobileSticky={false}
      />

      {count === 0 ? (
        <p className="rounded-2xl border border-border bg-bg-card p-8 text-center text-text-dim">
          {emptyLabel}
        </p>
      ) : (
        <div className="space-y-12">
          {filteredGroups.map((g) => (
            <div key={g.title} id={faqGroupId(g.title)} className="scroll-mt-36">
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
