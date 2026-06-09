"use client";

/**
 * Sticky search bar pinned flush under the nav (full-bleed on mobile, contained
 * on desktop), with a result count below. Shared by the FAQ and Glossary lists.
 */
export function StickySearch({
  value,
  onChange,
  placeholder,
  count,
  countSuffix,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  count: number;
  countSuffix: string;
}) {
  return (
    <>
      <div className="sticky top-20 z-30">
        <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 rounded-b-2xl border-x border-b border-border bg-bg/85 px-4 py-3 backdrop-blur-md lg:left-auto lg:right-auto lg:w-full lg:translate-x-0 lg:px-5">
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
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full rounded-full border border-border bg-bg-card py-3.5 pl-12 pr-4 text-text outline-none transition-colors placeholder:text-text-muted focus:border-accent"
            />
          </div>
        </div>
      </div>

      <p className="mb-10 mt-3 px-1 font-mono text-xs text-text-muted">
        {count} {countSuffix}
      </p>
    </>
  );
}
