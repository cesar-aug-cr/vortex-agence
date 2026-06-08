/**
 * Static, detailed duotone icons for the "Pourquoi vortx" pillars. Richer than
 * plain glyphs — gradients, a soft halo and layered detail — but NO animation.
 * `currentColor` = accent (the badge sets `text-accent`); gradients add cyan/blue.
 * Each icon namespaces its <defs> ids to avoid collisions on the page.
 */
type IconProps = { className?: string };
const SIZE = "h-9 w-9";

const LIME = "#c8f02e";
const CYAN = "#14e0c8";
const BLUE = "#2e66ff";
const INK = "#0a0a0b";

/** Strategy first — target rings hit by a plotted path + arrow. */
export function IconStrategy({ className = SIZE }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="why-strat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={CYAN} />
          <stop offset="1" stopColor={BLUE} />
        </linearGradient>
        <radialGradient id="why-strat-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={LIME} stopOpacity="0.45" />
          <stop offset="1" stopColor={LIME} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="21" cy="27" r="17" fill="url(#why-strat-glow)" />
      <circle cx="21" cy="27" r="14" fill="url(#why-strat)" opacity="0.16" />
      <circle cx="21" cy="27" r="14" stroke="currentColor" strokeWidth="2" />
      <circle cx="21" cy="27" r="9" stroke="currentColor" strokeWidth="2" opacity="0.65" />
      <circle cx="21" cy="27" r="4.2" fill="url(#why-strat)" />
      <circle cx="21" cy="27" r="1.7" fill={INK} />
      <path d="M5 43c4-8 8-11 16-16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.5 4.5" opacity="0.8" />
      <path d="M21 27 41 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M33 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Measurable conversion — gradient bars + trend line with data nodes. */
export function IconConversion({ className = SIZE }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="why-conv" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={BLUE} />
          <stop offset="1" stopColor={CYAN} />
        </linearGradient>
        <radialGradient id="why-conv-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={LIME} stopOpacity="0.4" />
          <stop offset="1" stopColor={LIME} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="url(#why-conv-glow)" />
      <rect x="6" y="27" width="7" height="15" rx="2" fill="url(#why-conv)" opacity="0.4" />
      <rect x="18" y="20" width="7" height="22" rx="2" fill="url(#why-conv)" opacity="0.62" />
      <rect x="30" y="12" width="7" height="30" rx="2" fill="url(#why-conv)" />
      <path d="M8 22 18 16 26 19 41 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M34 7h7v7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="16" r="2.6" fill={INK} stroke="currentColor" strokeWidth="1.8" />
      <circle cx="26" cy="19" r="2.6" fill={INK} stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/** Local anchoring — a map pin on a grid with a ripple. */
export function IconLocal({ className = SIZE }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="why-loc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={CYAN} />
          <stop offset="1" stopColor={BLUE} />
        </linearGradient>
        <radialGradient id="why-loc-glow" cx="0.5" cy="0.45" r="0.5">
          <stop offset="0" stopColor={LIME} stopOpacity="0.4" />
          <stop offset="1" stopColor={LIME} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="22" r="18" fill="url(#why-loc-glow)" />
      <g stroke="currentColor" strokeWidth="1" opacity="0.22">
        <path d="M6 30h36M6 38h36M16 12v30M32 12v30" />
      </g>
      <path
        d="M24 6a11 11 0 0 1 11 11c0 8-11 19-11 19S13 25 13 17A11 11 0 0 1 24 6Z"
        fill="url(#why-loc)"
        opacity="0.18"
      />
      <path
        d="M24 6a11 11 0 0 1 11 11c0 8-11 19-11 19S13 25 13 17A11 11 0 0 1 24 6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="17" r="4.2" fill="url(#why-loc)" />
      <circle cx="24" cy="17" r="1.7" fill={INK} />
      <ellipse cx="24" cy="40" rx="6" ry="1.8" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

/** AI-ready — a chip with circuit pins and an inner neural network. */
export function IconAI({ className = SIZE }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="why-ai" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={LIME} />
          <stop offset="1" stopColor={CYAN} />
        </linearGradient>
        <radialGradient id="why-ai-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={CYAN} stopOpacity="0.4" />
          <stop offset="1" stopColor={CYAN} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="url(#why-ai-glow)" />
      <path d="M20 14V7M28 14V7M20 34v7M28 34v7M14 20H7M14 28H7M34 20h7M34 28h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <rect x="13" y="13" width="22" height="22" rx="6" fill="url(#why-ai)" opacity="0.14" />
      <rect x="13" y="13" width="22" height="22" rx="6" stroke="currentColor" strokeWidth="2" />
      <g stroke="currentColor" strokeWidth="1.4" opacity="0.7">
        <path d="M18 19 24 24 30 19M18 29 24 24 30 29" />
      </g>
      <circle cx="24" cy="24" r="3.4" fill="url(#why-ai)" />
      <g fill="currentColor">
        <circle cx="18" cy="19" r="1.7" />
        <circle cx="30" cy="19" r="1.7" />
        <circle cx="18" cy="29" r="1.7" />
        <circle cx="30" cy="29" r="1.7" />
      </g>
    </svg>
  );
}
