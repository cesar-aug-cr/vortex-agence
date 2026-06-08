export function IconResponsive({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="resp-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="resp-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.32" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="resp-arrow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="resp-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#resp-glow)" opacity="0.28" />

      {/* desktop frame */}
      <g stroke="url(#resp-frame)" strokeWidth="1.8" fill="url(#resp-screen)">
        <rect x="14" y="24" width="64" height="44" rx="5" />
      </g>
      <line x1="14" y1="32" x2="78" y2="32" stroke="url(#resp-frame)" strokeWidth="1.2" />
      <rect x="38" y="72" width="16" height="4" rx="2" fill="url(#resp-frame)" />
      <rect x="34" y="76" width="24" height="3" rx="1.5" fill="url(#resp-frame)" opacity="0.7" />
      {/* desktop content */}
      <g fill="#14e0c8" opacity="0.5">
        <rect x="20" y="38" width="20" height="4" rx="1.5" />
        <rect x="20" y="46" width="34" height="3" rx="1.5" opacity="0.7" />
        <rect x="20" y="53" width="28" height="3" rx="1.5" opacity="0.55" />
      </g>

      {/* tablet frame */}
      <g stroke="url(#resp-frame)" strokeWidth="1.8" fill="url(#resp-screen)">
        <rect x="62" y="50" width="30" height="40" rx="5" />
      </g>
      <line x1="62" y1="58" x2="92" y2="58" stroke="url(#resp-frame)" strokeWidth="1" opacity="0.7" />
      <g fill="#14e0c8" opacity="0.5">
        <rect x="67" y="63" width="14" height="3" rx="1.5" />
        <rect x="67" y="69" width="20" height="2.5" rx="1.2" opacity="0.7" />
      </g>

      {/* phone frame */}
      <g stroke="url(#resp-frame)" strokeWidth="1.8" fill="url(#resp-screen)">
        <rect x="84" y="62" width="20" height="38" rx="5" />
      </g>
      <line x1="84" y1="68" x2="104" y2="68" stroke="url(#resp-frame)" strokeWidth="1" opacity="0.7" />
      <line x1="90" y1="96" x2="98" y2="96" stroke="url(#resp-frame)" strokeWidth="1.4" strokeLinecap="round" />
      <g fill="#14e0c8" opacity="0.5">
        <rect x="88" y="73" width="12" height="2.6" rx="1.3" />
        <rect x="88" y="79" width="9" height="2.2" rx="1.1" opacity="0.7" />
      </g>

      {/* fluid reflow arrow */}
      <g>
        <path d="M30 96 Q56 110 92 100" fill="none" stroke="url(#resp-arrow)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="3 4">
          <animate attributeName="strokeDashoffset" values="14;0" dur="2.2s" repeatCount="indefinite" />
        </path>
        <path d="M88 96 L94 100 L88 104" fill="none" stroke="#c8f02e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default IconResponsive;
