"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; text: string };

/**
 * Scroll-spy: returns the id of the section currently being read.
 * A heading becomes active once it crosses the upper band of the viewport,
 * and stays active until the next one does.
 */
function useActiveHeading(ids: string[]) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const visible = new Set<string>();

    const pick = () => {
      // topmost visible heading wins; if none visible, keep the last passed one
      const first = ids.find((id) => visible.has(id));
      if (first) {
        setActiveId(first);
        return;
      }
      // nothing in the band → choose the last heading above the band
      let current = "";
      for (const el of els) {
        if (el.getBoundingClientRect().top < 120) current = el.id;
      }
      if (current) setActiveId(current);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        }
        pick();
      },
      { rootMargin: "-88px 0px -65% 0px", threshold: 0 }
    );

    els.forEach((el) => obs.observe(el));
    pick();
    return () => obs.disconnect();
  }, [ids]);

  return activeId;
}

/**
 * Article table of contents.
 * - `variant="mobile"`: a sticky, collapsible bar pinned under the header so
 *   readers can jump between sections from anywhere (hidden on desktop).
 * - `variant="desktop"`: a plain list meant to sit in a sticky left sidebar
 *   (hidden on mobile).
 * The section currently being read is highlighted in lime (scroll-spy).
 */
export function ArticleToc({
  items,
  title,
  variant = "mobile",
}: {
  items: TocItem[];
  title: string;
  variant?: "mobile" | "desktop";
}) {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const activeId = useActiveHeading(items.map((i) => i.id));

  if (items.length < 2) return null;

  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    }
    setOpen(false);
  };

  if (variant === "desktop") {
    return (
      <nav className="hidden rounded-2xl border border-border bg-bg-card p-5 lg:block">
        <p className="font-mono text-xs uppercase tracking-wide text-text-muted">{title}</p>
        <ol className="mt-3 grid gap-1">
          {items.map((h, i) => {
            const active = h.id === activeId;
            return (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => go(e, h.id)}
                  aria-current={active ? "location" : undefined}
                  className={`block border-l-2 py-1 pl-3 text-sm leading-snug transition-colors ${
                    active
                      ? "border-accent font-semibold text-accent"
                      : "border-transparent text-text-dim hover:text-accent-strong"
                  }`}
                >
                  <span className={active ? "text-accent" : "text-text-muted"}>{i + 1}.</span>{" "}
                  {h.text}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  // mobile — sticky collapsible bar under the header
  const activeText = items.find((h) => h.id === activeId)?.text;

  return (
    <nav className="sticky top-20 z-30 -mx-4 mb-8 border-y border-border bg-bg/90 backdrop-blur-md lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
      >
        <span className="inline-flex min-w-0 items-center gap-2 font-mono text-xs uppercase tracking-wide text-accent">
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
            <path d="M4 6h16M4 12h12M4 18h8" />
          </svg>
          <span className="truncate">{!open && activeText ? activeText : title}</span>
        </span>
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          aria-hidden
          className={`shrink-0 text-text-muted transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {open && (
        <ol className="grid gap-1 px-4 pb-4">
          {items.map((h, i) => {
            const active = h.id === activeId;
            return (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  onClick={(e) => go(e, h.id)}
                  aria-current={active ? "location" : undefined}
                  className={`block rounded-lg px-2 py-2 text-sm transition-colors ${
                    active
                      ? "bg-accent-soft font-semibold text-accent"
                      : "text-text-dim hover:bg-accent-soft hover:text-accent-strong"
                  }`}
                >
                  {i + 1}. {h.text}
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </nav>
  );
}
