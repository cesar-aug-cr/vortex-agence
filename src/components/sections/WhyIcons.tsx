/**
 * Static, highly-detailed duotone icons for the "Pourquoi vortx" pillars —
 * layered mini-illustrations (gradients, halos, ticks, circuit traces, node
 * networks, grids, particles) with NO animation. `currentColor` = accent (the
 * badge sets `text-accent`); gradients add cyan/blue. Each icon namespaces its
 * <defs> ids to avoid collisions on the page.
 */
type IconProps = { className?: string };
const SIZE = "h-9 w-9";

const LIME = "#c8f02e";
const CYAN = "#14e0c8";
const BLUE = "#2e66ff";
const INK = "#0a0a0b";

/** Strategy first — tactical target: graduated rings, crosshair, plotted path. */
export function IconStrategy({ className = SIZE }: IconProps) {
  // tick marks around the outer ring
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const a = (i * Math.PI) / 6;
    const cx = 22;
    const cy = 26;
    const r1 = 16.5;
    const r2 = 19;
    return (
      <line
        key={i}
        x1={cx + r1 * Math.cos(a)}
        y1={cy + r1 * Math.sin(a)}
        x2={cx + r2 * Math.cos(a)}
        y2={cy + r2 * Math.sin(a)}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity={i % 3 === 0 ? "0.9" : "0.4"}
      />
    );
  });
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="why-strat" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={CYAN} />
          <stop offset="1" stopColor={BLUE} />
        </linearGradient>
        <radialGradient id="why-strat-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={LIME} stopOpacity="0.5" />
          <stop offset="1" stopColor={LIME} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="22" cy="26" r="18" fill="url(#why-strat-glow)" />
      {ticks}
      <circle cx="22" cy="26" r="14.5" fill="url(#why-strat)" opacity="0.12" />
      <circle cx="22" cy="26" r="14.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="22" cy="26" r="10" stroke="currentColor" strokeWidth="1.6" opacity="0.7" />
      <circle cx="22" cy="26" r="6" stroke="currentColor" strokeWidth="1.6" opacity="0.85" />
      {/* crosshair ticks */}
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.7">
        <path d="M22 12v3M22 37v3M8 26h3M33 26h3" />
      </g>
      <circle cx="22" cy="26" r="3.4" fill="url(#why-strat)" />
      <circle cx="22" cy="26" r="1.5" fill={INK} />
      {/* plotted strategy path with waypoints */}
      <path d="M5 44c3-7 6-10 11-13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="0.5 4" opacity="0.8" />
      <circle cx="8.5" cy="38" r="1.4" fill="currentColor" opacity="0.8" />
      <path d="M22 26 41 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M33 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* particles */}
      <circle cx="40" cy="30" r="1.3" fill={CYAN} opacity="0.8" />
      <circle cx="9" cy="14" r="1" fill={LIME} opacity="0.8" />
    </svg>
  );
}

/** Measurable conversion — analytics dashboard: grid, bars, trend, KPI arc. */
export function IconConversion({ className = SIZE }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="why-conv" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor={BLUE} />
          <stop offset="1" stopColor={CYAN} />
        </linearGradient>
        <radialGradient id="why-conv-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={LIME} stopOpacity="0.42" />
          <stop offset="1" stopColor={LIME} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="url(#why-conv-glow)" />
      {/* grid */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.16">
        <path d="M5 42h38M5 33h38M5 24h38M5 15h38" />
      </g>
      {/* bars */}
      <rect x="6" y="29" width="6" height="13" rx="1.6" fill="url(#why-conv)" opacity="0.38" />
      <rect x="15" y="23" width="6" height="19" rx="1.6" fill="url(#why-conv)" opacity="0.55" />
      <rect x="24" y="17" width="6" height="25" rx="1.6" fill="url(#why-conv)" opacity="0.72" />
      <rect x="33" y="10" width="6" height="32" rx="1.6" fill="url(#why-conv)" />
      {/* trend line + projection */}
      <path d="M8 25 17 19 26 21 36 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 10 43 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="0.5 4" opacity="0.7" />
      <path d="M37 5h6v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* data nodes */}
      <g fill={INK} stroke="currentColor" strokeWidth="1.6">
        <circle cx="8" cy="25" r="2.2" />
        <circle cx="17" cy="19" r="2.2" />
        <circle cx="26" cy="21" r="2.2" />
      </g>
      {/* KPI arc */}
      <path d="M40 30a6 6 0 1 0 4 2" stroke={CYAN} strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
      <circle cx="3.5" cy="13" r="1.1" fill={LIME} opacity="0.8" />
    </svg>
  );
}

/** Local anchoring — map: grid, roads, main pin with ripples + satellites. */
export function IconLocal({ className = SIZE }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="why-loc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={CYAN} />
          <stop offset="1" stopColor={BLUE} />
        </linearGradient>
        <radialGradient id="why-loc-glow" cx="0.5" cy="0.42" r="0.5">
          <stop offset="0" stopColor={LIME} stopOpacity="0.42" />
          <stop offset="1" stopColor={LIME} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="24" cy="22" r="18" fill="url(#why-loc-glow)" />
      {/* map grid + roads */}
      <g stroke="currentColor" opacity="0.2">
        <path d="M5 18h38M5 30h38M5 40h38M14 8v36M34 8v36" strokeWidth="1" />
      </g>
      <path d="M5 36c8-2 10-10 18-11s14-6 20-9" stroke="currentColor" strokeWidth="1.4" opacity="0.35" strokeLinecap="round" />
      {/* satellite pins */}
      <circle cx="38" cy="14" r="2.4" fill="url(#why-loc)" opacity="0.6" />
      <circle cx="11" cy="34" r="2" fill="url(#why-loc)" opacity="0.5" />
      {/* ripples */}
      <ellipse cx="24" cy="39" rx="9" ry="3" stroke="currentColor" strokeWidth="1.2" opacity="0.25" />
      <ellipse cx="24" cy="39" rx="5" ry="1.7" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
      {/* main pin */}
      <path d="M24 6a11 11 0 0 1 11 11c0 8-11 19-11 19S13 25 13 17A11 11 0 0 1 24 6Z" fill="url(#why-loc)" opacity="0.2" />
      <path d="M24 6a11 11 0 0 1 11 11c0 8-11 19-11 19S13 25 13 17A11 11 0 0 1 24 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="24" cy="17" r="4.2" fill="url(#why-loc)" />
      <circle cx="24" cy="17" r="1.6" fill={INK} />
      {/* particles */}
      <circle cx="40" cy="34" r="1.1" fill={CYAN} opacity="0.8" />
      <circle cx="9" cy="12" r="1" fill={LIME} opacity="0.8" />
    </svg>
  );
}

/** AI-ready — neural chip: circuit traces, layered node network, glowing core. */
export function IconAI({ className = SIZE }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" aria-hidden className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="why-ai" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={LIME} />
          <stop offset="1" stopColor={CYAN} />
        </linearGradient>
        <radialGradient id="why-ai-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={CYAN} stopOpacity="0.45" />
          <stop offset="1" stopColor={CYAN} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="why-ai-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={LIME} />
          <stop offset="1" stopColor={CYAN} />
        </radialGradient>
      </defs>
      <circle cx="24" cy="24" r="18" fill="url(#why-ai-glow)" />
      {/* pins (3 per side) */}
      <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M17 12V7M24 12V6M31 12V7M17 36v5M24 36v6M31 36v5M12 17H7M12 24H6M12 31H7M36 17h5M36 24h6M36 31h5" />
      </g>
      <rect x="11" y="11" width="26" height="26" rx="6.5" fill="url(#why-ai)" opacity="0.12" />
      <rect x="11" y="11" width="26" height="26" rx="6.5" stroke="currentColor" strokeWidth="1.8" />
      {/* corner circuit traces */}
      <g stroke="currentColor" strokeWidth="1.2" opacity="0.5" fill="none">
        <path d="M16 16h4v4M32 16h-4v4M16 32h4v-4M32 32h-4v-4" />
      </g>
      {/* neural network: 2 inputs · core · 2 outputs */}
      <g stroke="currentColor" strokeWidth="1.3" opacity="0.7">
        <path d="M17 18 24 24 31 18M17 30 24 24 31 30M17 18 17 30M31 18 31 30" />
      </g>
      <g fill="currentColor">
        <circle cx="17" cy="18" r="1.9" />
        <circle cx="31" cy="18" r="1.9" />
        <circle cx="17" cy="30" r="1.9" />
        <circle cx="31" cy="30" r="1.9" />
      </g>
      <circle cx="24" cy="24" r="4" fill="url(#why-ai-core)" />
      <circle cx="24" cy="24" r="1.7" fill={INK} />
      {/* particles */}
      <circle cx="42" cy="14" r="1.1" fill={LIME} opacity="0.8" />
      <circle cx="6" cy="34" r="1" fill={CYAN} opacity="0.8" />
    </svg>
  );
}
