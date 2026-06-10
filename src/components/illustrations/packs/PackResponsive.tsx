export function PackResponsive({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pkrsp-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="pkrsp-frame2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <linearGradient id="pkrsp-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.30" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="pkrsp-arrow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="pkrsp-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <radialGradient id="pkrsp-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft radial backdrop */}
      <circle cx="60" cy="60" r="46" fill="url(#pkrsp-glow)" opacity="0.28" />

      {/* ---- DESKTOP (largest, back-left) ---- */}
      <rect
        x="14"
        y="28"
        width="58"
        height="42"
        rx="5"
        fill="#0a0a0b"
        stroke="url(#pkrsp-frame)"
        strokeWidth="2"
      />
      <rect x="14" y="28" width="58" height="42" rx="5" fill="url(#pkrsp-screen)" />
      {/* top browser bar + traffic dots */}
      <line x1="14" y1="35" x2="72" y2="35" stroke="url(#pkrsp-frame)" strokeWidth="1.1" opacity="0.7" />
      <circle cx="19" cy="31.5" r="1.1" fill="#22d38c" />
      <circle cx="23" cy="31.5" r="1.1" fill="#14e0c8" opacity="0.7" />
      <circle cx="27" cy="31.5" r="1.1" fill="#2e66ff" opacity="0.7" />
      {/* desktop content — multi-column reflow */}
      <g fill="#14e0c8" opacity="0.55">
        <rect x="19" y="40" width="22" height="3.4" rx="1.7" />
        <rect x="19" y="46" width="13" height="2.6" rx="1.3" opacity="0.7" />
        <rect x="19" y="51" width="13" height="2.6" rx="1.3" opacity="0.7" />
        <rect x="36" y="46" width="13" height="2.6" rx="1.3" opacity="0.55" />
        <rect x="36" y="51" width="13" height="2.6" rx="1.3" opacity="0.55" />
        <rect x="53" y="40" width="14" height="13" rx="2.5" opacity="0.32" />
      </g>
      {/* accent reflow block, animates width to imply adaptation */}
      <rect x="19" y="59" height="3.4" rx="1.7" fill="url(#pkrsp-bar)">
        <animate attributeName="width" values="14;46;14" dur="4.2s" repeatCount="indefinite" />
      </rect>
      {/* monitor stand */}
      <rect x="38" y="70" width="10" height="4" rx="1.5" fill="url(#pkrsp-frame)" opacity="0.8" />
      <rect x="33" y="74" width="20" height="2.6" rx="1.3" fill="url(#pkrsp-frame)" opacity="0.55" />

      {/* ---- TABLET (mid, front-centre) ---- */}
      <rect
        x="60"
        y="52"
        width="30"
        height="40"
        rx="5"
        fill="#0a0a0b"
        stroke="url(#pkrsp-frame2)"
        strokeWidth="2"
      />
      <rect x="60" y="52" width="30" height="40" rx="5" fill="url(#pkrsp-screen)" />
      <line x1="60" y1="58" x2="90" y2="58" stroke="url(#pkrsp-frame2)" strokeWidth="1" opacity="0.6" />
      <circle cx="75" cy="89" r="1.4" fill="url(#pkrsp-frame2)" opacity="0.8" />
      {/* tablet content — two-column collapsing */}
      <g fill="#14e0c8" opacity="0.55">
        <rect x="64" y="62" width="16" height="3" rx="1.5" />
        <rect x="64" y="68" width="11" height="2.4" rx="1.2" opacity="0.7" />
        <rect x="64" y="72.5" width="11" height="2.4" rx="1.2" opacity="0.7" />
        <rect x="79" y="68" width="7" height="6.9" rx="1.6" opacity="0.32" />
      </g>
      <rect x="64" y="79" height="3" rx="1.5" fill="url(#pkrsp-bar)" opacity="0.85">
        <animate attributeName="width" values="22;10;22" dur="4.2s" repeatCount="indefinite" />
      </rect>

      {/* ---- PHONE (smallest, front-right) ---- */}
      <rect
        x="92"
        y="60"
        width="20"
        height="40"
        rx="5"
        fill="#0a0a0b"
        stroke="url(#pkrsp-frame)"
        strokeWidth="2"
      />
      <rect x="92" y="60" width="20" height="40" rx="5" fill="url(#pkrsp-screen)" />
      {/* phone notch + home indicator */}
      <line x1="99" y1="63.5" x2="105" y2="63.5" stroke="url(#pkrsp-frame)" strokeWidth="1.4" strokeLinecap="round" opacity="0.8" />
      <line x1="98" y1="97" x2="106" y2="97" stroke="url(#pkrsp-frame)" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      {/* phone content — single column stack */}
      <g fill="#14e0c8" opacity="0.55">
        <rect x="95.5" y="68" width="13" height="2.8" rx="1.4" />
        <rect x="95.5" y="73.5" width="13" height="4.4" rx="1.6" opacity="0.3" />
        <rect x="95.5" y="80.5" width="9" height="2.2" rx="1.1" opacity="0.7" />
      </g>
      <rect x="95.5" y="85.5" height="2.8" rx="1.4" fill="url(#pkrsp-bar)">
        <animate attributeName="width" values="13;6;13" dur="4.2s" repeatCount="indefinite" />
      </rect>

      {/* ---- fluid reflow arrow sweeping across breakpoints ---- */}
      <path
        d="M22 80 Q44 102 70 94 T104 86"
        fill="none"
        stroke="url(#pkrsp-arrow)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="3 5"
      >
        <animate attributeName="strokeDashoffset" values="16;0" dur="3s" repeatCount="indefinite" />
      </path>
      <path
        d="M99 81 L105 86 L99 91"
        fill="none"
        stroke="#c8f02e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* travelling pulse riding the arrow */}
      <circle r="2.2" fill="#c8f02e">
        <animateMotion path="M22 80 Q44 102 70 94 T104 86" dur="3s" repeatCount="indefinite" rotate="auto" />
        <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* micro breakpoint ticks */}
      <g stroke="#14e0c8" strokeWidth="1.4" strokeLinecap="round" opacity="0.5">
        <line x1="24" y1="14" x2="24" y2="18" />
        <line x1="60" y1="11" x2="60" y2="15" />
        <line x1="96" y1="14" x2="96" y2="18" />
      </g>
      <line x1="24" y1="16" x2="96" y2="16" stroke="#14e0c8" strokeWidth="1" opacity="0.3" strokeDasharray="2 3" />
    </svg>
  );
}

export default PackResponsive;
