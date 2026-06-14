export function IconGuidelines({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="guidelines-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="guidelines-page" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="guidelines-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="62" r="44" fill="url(#guidelines-glow)" opacity="0.28" />

      {/* open book spine */}
      <line x1="60" y1="26" x2="60" y2="96" stroke="url(#guidelines-frame)" strokeWidth="2" />

      {/* left page: logo safe-zone */}
      <g>
        <path d="M60 28 L26 32 L26 90 L60 94 Z" fill="url(#guidelines-page)" stroke="url(#guidelines-frame)" strokeWidth="1.6" strokeLinejoin="round" />
        <rect x="33" y="40" width="20" height="20" rx="2" fill="none" stroke="#c8f02e" strokeWidth="1" strokeDasharray="3 3">
          <animate attributeName="stroke-dashoffset" values="0;-12" dur="3s" repeatCount="indefinite" />
        </rect>
        <circle cx="43" cy="50" r="5.5" fill="none" stroke="url(#guidelines-frame)" strokeWidth="1.8" />
        <circle cx="43" cy="50" r="2" fill="#c8f02e" />
        <rect x="33" y="68" width="20" height="2.6" rx="1.3" fill="#b9bcb2" opacity="0.6" />
        <rect x="33" y="74" width="14" height="2.6" rx="1.3" fill="#b9bcb2" opacity="0.4" />
      </g>

      {/* right page: color rules + spacing grid */}
      <g>
        <path d="M60 28 L94 32 L94 90 L60 94 Z" fill="url(#guidelines-page)" stroke="url(#guidelines-frame)" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="68" cy="42" r="3.4" fill="#14e0c8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="78" cy="42" r="3.4" fill="#22d38c">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="0.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="88" cy="42" r="3.4" fill="#2e66ff">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" begin="1.6s" repeatCount="indefinite" />
        </circle>
        {/* spacing grid aligning */}
        <g stroke="#c8f02e" strokeWidth="0.8" opacity="0.7">
          <line x1="66" y1="54" x2="88" y2="54" />
          <line x1="66" y1="62" x2="88" y2="62" />
          <line x1="66" y1="70" x2="88" y2="70" />
          <line x1="72" y1="52" x2="72" y2="78">
            <animate attributeName="x1" values="66;72;66" dur="5s" repeatCount="indefinite" />
            <animate attributeName="x2" values="66;72;66" dur="5s" repeatCount="indefinite" />
          </line>
          <line x1="82" y1="52" x2="82" y2="78" opacity="0.6" />
        </g>
      </g>
    </svg>
  );
}

export default IconGuidelines;
