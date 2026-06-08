export function IconAdsTargeting({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ads-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="ads-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="ads-bull" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="ads-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="50" cy="52" r="44" fill="url(#ads-glow)" opacity="0.28" />

      {/* concentric target */}
      <g transform="translate(48,50)">
        <circle r="30" fill="none" stroke="url(#ads-ring)" strokeWidth="2" opacity="0.5" />
        <circle r="21" fill="none" stroke="url(#ads-ring)" strokeWidth="2" opacity="0.7" />
        <circle r="12" fill="none" stroke="url(#ads-ring)" strokeWidth="2" />
        <circle r="5" fill="url(#ads-bull)">
          <animate attributeName="r" values="4;6;4" dur="2.6s" repeatCount="indefinite" />
        </circle>
        {/* pulsing hit ring */}
        <circle r="5" fill="none" stroke="#c8f02e" strokeWidth="1.4" opacity="0.6">
          <animate attributeName="r" values="5;14;5" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* cursor / arrow hit */}
      <g transform="translate(58,60)">
        <path d="M0 0 L0 18 L5 13 L9 22 L13 20 L9 11 L16 11 Z" fill="#0a0a0b" stroke="#c8f02e" strokeWidth="1.4" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="translate" values="0 0;-4 -4;0 0" dur="2.6s" repeatCount="indefinite" />
        </path>
      </g>

      {/* budget -> ROAS uplift bars */}
      <g>
        <rect x="84" y="74" width="9" height="18" rx="2" fill="#2e66ff" opacity="0.4" />
        <rect x="98" y="58" width="9" height="34" rx="2" fill="url(#ads-bar)">
          <animate attributeName="height" values="26;34;26" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="y" values="66;58;66" dur="3.4s" repeatCount="indefinite" />
        </rect>
        {/* uplift arrow */}
        <path d="M84 72 L107 56" fill="none" stroke="#c8f02e" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="3 3">
          <animate attributeName="strokeDashoffset" values="12;0" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M102 55 L108 55 L108 61" fill="none" stroke="#c8f02e" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default IconAdsTargeting;
