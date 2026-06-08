"use client";

/**
 * Footer "back to top" control — smooth-scrolls to the top of the page.
 * Respects reduced-motion (the browser honours scroll-behavior automatically
 * via "smooth", which falls back to instant under prefers-reduced-motion).
 */
export function BackToTop({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="group inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 font-mono text-xs uppercase tracking-wide text-stage-text transition-colors hover:border-accent hover:text-accent"
      aria-label={label}
    >
      {label}
      <svg
        width={14}
        height={14}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        aria-hidden
        className="transition-transform group-hover:-translate-y-0.5"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
