/**
 * Static duotone icons for the "Pourquoi vortx" pillars — richer than the plain
 * line icons (a filled accent-2 shape + accent details) but with NO animation.
 * `currentColor` = accent (the badge sets `text-accent`); accent-2 is explicit.
 */
type IconProps = { className?: string };

const svg = "h-6 w-6";

/** Strategy first — target hit by a plotted path/arrow. */
export function IconStrategy({ className = svg }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="10.5" cy="13.5" r="7" fill="var(--accent-2)" opacity="0.18" />
      <circle cx="10.5" cy="13.5" r="7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="10.5" cy="13.5" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="10.5" cy="13.5" r="0.9" fill="currentColor" />
      <path d="M10.5 13.5 19.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M15.5 4.5H19.5V8.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Measurable conversion — rising bars + trend line. */
export function IconConversion({ className = svg }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="13" width="3.6" height="7" rx="1" fill="var(--accent-2)" opacity="0.3" />
      <rect x="10.2" y="9.5" width="3.6" height="10.5" rx="1" fill="var(--accent-2)" opacity="0.5" />
      <rect x="16.9" y="5.5" width="3.6" height="14.5" rx="1" fill="currentColor" />
      <path d="M4 11.5 9 8.5 13 9.5 20 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3.5H20V7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Local anchoring — a map pin. */
export function IconLocal({ className = svg }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        fill="var(--accent-2)"
        opacity="0.18"
      />
      <path
        d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="10" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** AI-ready — a chip / neural node. */
export function IconAI({ className = svg }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="7" y="7" width="10" height="10" rx="2.6" fill="var(--accent-2)" opacity="0.18" />
      <rect x="7" y="7" width="10" height="10" rx="2.6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <path
        d="M10 7V4M14 7V4M10 20v-3M14 20v-3M7 10H4M7 14H4M20 10h-3M20 14h-3"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
