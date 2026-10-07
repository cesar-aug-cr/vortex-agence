"use client";

import { useEffect, useRef, useState } from "react";

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
      className={className}
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

const INPUT_CLASS =
  "w-full rounded-full border border-border bg-bg-card py-3.5 pl-12 pr-4 text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent";

/**
 * Search bar shared by the FAQ and Glossary lists, with a result count.
 *
 * Default: a bar pinned flush under the nav (full-bleed on mobile, contained
 * on desktop), count below it.
 *
 * `collapsible`: only a round magnifier button follows the scroll (sticky on
 * every size, right-aligned); pressing it opens the field next to it (closing
 * clears the query). The count stays in the flow where the bar used to be.
 * `mobileSticky` only applies to the non-collapsible bar.
 */
export function StickySearch({
  value,
  onChange,
  placeholder,
  count,
  countSuffix,
  mobileSticky = true,
  collapsible = false,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  count: number;
  countSuffix: string;
  /** When false, sticky on desktop only (mobile keeps it in flow). */
  mobileSticky?: boolean;
  /** Closed by default; the sticky magnifier button opens the field. */
  collapsible?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const sticky = mobileSticky ? "sticky" : "lg:sticky";

  useEffect(() => {
    if (collapsible && open) inputRef.current?.focus();
  }, [collapsible, open]);

  const countLine = (
    <p className="mb-10 mt-3 px-1 font-mono text-xs text-text-muted">
      {count} {countSuffix}
    </p>
  );

  if (collapsible) {
    const toggle = () => {
      if (open) onChange("");
      setOpen((o) => !o);
    };
    return (
      <>
        {/* sticky everywhere: on phones it sits under the sticky summary bar
            (header 80 px + bar 44 px + 12 px), on desktop 16 px under the header */}
        <div className="pointer-events-none sticky top-[8.5rem] z-20 flex justify-end lg:top-24">
          <div
            className={`pointer-events-auto flex items-center gap-2 rounded-full ${
              open ? "w-full border border-border bg-bg/85 p-1.5 shadow-[var(--shadow-md)] backdrop-blur-md" : ""
            }`}
          >
            {open && (
              <div className="relative min-w-0 flex-1">
                <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
                <input
                  ref={inputRef}
                  id="sticky-search-field"
                  type="search"
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  placeholder={placeholder}
                  className={INPUT_CLASS}
                />
              </div>
            )}
            <button
              type="button"
              onClick={toggle}
              aria-expanded={open}
              aria-controls="sticky-search-field"
              aria-label={placeholder}
              title={placeholder}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-stage-border bg-stage text-[#c8f02e] shadow-[0_0_0_1px_rgba(79,122,10,0.35),0_0_22px_4px_rgba(79,122,10,0.45)] dark:shadow-[0_0_0_1px_rgba(200,240,46,0.35),0_0_22px_4px_rgba(200,240,46,0.45)] transition-colors hover:border-[#c8f02e] focus-visible:border-[#c8f02e] dark:border-border dark:bg-bg-card dark:text-text dark:hover:border-accent dark:hover:text-accent dark:focus-visible:border-accent"
            >
              {open ? <CloseIcon /> : <SearchIcon />}
            </button>
          </div>
        </div>
        {countLine}
      </>
    );
  }

  return (
    <>
      <div className={`${sticky} top-20 z-30`}>
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 rounded-b-2xl border-x border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-md lg:left-auto lg:right-auto lg:w-full lg:translate-x-0 lg:px-5">
          <div className="relative">
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
            <input
              type="search"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className={INPUT_CLASS}
            />
          </div>
        </div>
      </div>
      {countLine}
    </>
  );
}
