export function PackSeo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pkseo-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="pkseo-row" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="pkseo-top" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.55" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="pkseo-lens" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.45" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.08" />
        </radialGradient>
        <radialGradient id="pkseo-spark" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.15" />
        </radialGradient>
        <radialGradient id="pkseo-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft radial backdrop */}
      <circle cx="60" cy="60" r="46" fill="url(#pkseo-glow)" opacity="0.28" />

      {/* ranked results list, climbing to #1 */}
      <g>
        {/* row 3 (lowest) */}
        <rect x="22" y="78" width="56" height="13" rx="4" fill="url(#pkseo-row)" opacity="0.5" stroke="url(#pkseo-frame)" strokeWidth="0.8" />
        <circle cx="29.5" cy="84.5" r="2.4" fill="#2e66ff" opacity="0.75" />
        <rect x="36" y="81.5" width="24" height="2.8" rx="1.4" fill="#14e0c8" opacity="0.4" />
        <rect x="36" y="86" width="16" height="2.2" rx="1.1" fill="#14e0c8" opacity="0.28" />

        {/* row 2 (middle) */}
        <rect x="22" y="62" width="56" height="13" rx="4" fill="url(#pkseo-row)" opacity="0.72" stroke="url(#pkseo-frame)" strokeWidth="0.8" />
        <circle cx="29.5" cy="68.5" r="2.4" fill="#22d38c" />
        <rect x="36" y="65.5" width="28" height="2.8" rx="1.4" fill="#14e0c8" opacity="0.58" />
        <rect x="36" y="70" width="18" height="2.2" rx="1.1" fill="#14e0c8" opacity="0.4" />

        {/* row 1 (#1 result) */}
        <rect x="20" y="44" width="60" height="14" rx="4" fill="url(#pkseo-top)" stroke="url(#pkseo-frame)" strokeWidth="1.2" />
        <circle cx="28.5" cy="51" r="2.8" fill="#c8f02e" />
        <rect x="36" y="48" width="34" height="3" rx="1.5" fill="#14e0c8" opacity="0.85" />
        <rect x="36" y="53" width="22" height="2.4" rx="1.2" fill="#14e0c8" opacity="0.55" />
      </g>

      {/* climbing highlight sweeping up to #1 */}
      <rect x="18" y="62" width="64" height="14" rx="4" fill="none" stroke="#c8f02e" strokeWidth="1.6">
        <animate attributeName="y" values="78;44;44;78" dur="4.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.5;1;1;0.5" dur="4.6s" repeatCount="indefinite" />
      </rect>

      {/* AI / GEO citation connector from #1 result up to the spark */}
      <path d="M64 44 Q72 34 78 27" fill="none" stroke="#c8f02e" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="3 4">
        <animate attributeName="strokeDashoffset" values="14;0" dur="2.6s" repeatCount="indefinite" />
      </path>

      {/* generative-engine citation spark (the future / lime accent) */}
      <g transform="translate(82,24)">
        {/* pulsing halo */}
        <circle r="11" fill="none" stroke="#c8f02e" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" values="9;13;9" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* spark body */}
        <circle r="8.5" fill="url(#pkseo-spark)">
          <animate attributeName="r" values="8;9;8" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* four-point sparkle glyph (AI quote) */}
        <path d="M0 -6 Q1 -1 6 0 Q1 1 0 6 Q-1 1 -6 0 Q-1 -1 0 -6 Z" fill="#0a0a0b" opacity="0.85">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="5s" repeatCount="indefinite" />
        </path>
        {/* tiny orbiting citation dots */}
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4.5s" repeatCount="indefinite" />
          <circle cx="0" cy="-11.5" r="1.5" fill="#14e0c8" />
          <circle cx="10" cy="6" r="1.2" fill="#22d38c" opacity="0.8" />
          <circle cx="-10" cy="6" r="1" fill="#2e66ff" opacity="0.7" />
        </g>
      </g>

      {/* magnifier inspecting the #1 result */}
      <g transform="translate(78,72)">
        <circle r="15" fill="url(#pkseo-lens)" stroke="url(#pkseo-frame)" strokeWidth="2.4" />
        <circle r="15" fill="none" stroke="#c8f02e" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" values="15;17;15" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3.4s" repeatCount="indefinite" />
        </circle>
        {/* lens glint */}
        <path d="M-7 -7 a10 10 0 0 1 8 -4" fill="none" stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
        {/* handle */}
        <line x1="11" y1="11" x2="22" y2="22" stroke="url(#pkseo-frame)" strokeWidth="3.6" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default PackSeo;
