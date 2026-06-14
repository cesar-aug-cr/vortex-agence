export function IconWebapp({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="webapp-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="webapp-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="webapp-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="webapp-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#webapp-glow)" opacity="0.22" />

      {/* dashboard panel */}
      <rect x="20" y="24" width="48" height="38" rx="5" fill="url(#webapp-panel)" stroke="url(#webapp-edge)" strokeWidth="1.8" />
      <line x1="20" y1="32" x2="68" y2="32" stroke="url(#webapp-edge)" strokeWidth="1.1" opacity="0.7" />
      {/* mini bar chart */}
      <g fill="#14e0c8">
        <rect x="26" y="48" width="5" height="8" rx="1">
          <animate attributeName="height" values="8;14;8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y" values="48;42;48" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="34" y="44" width="5" height="12" rx="1">
          <animate attributeName="height" values="12;6;12" dur="3s" begin="0.5s" repeatCount="indefinite" />
          <animate attributeName="y" values="44;50;44" dur="3s" begin="0.5s" repeatCount="indefinite" />
        </rect>
        <rect x="42" y="46" width="5" height="10" rx="1">
          <animate attributeName="height" values="10;16;10" dur="3s" begin="1s" repeatCount="indefinite" />
          <animate attributeName="y" values="46;40;46" dur="3s" begin="1s" repeatCount="indefinite" />
        </rect>
      </g>
      <circle cx="59" cy="50" r="6" fill="none" stroke="#c8f02e" strokeWidth="2" strokeDasharray="28" strokeDashoffset="9" />

      {/* secondary stats panel */}
      <rect x="74" y="24" width="26" height="18" rx="4" fill="url(#webapp-panel)" stroke="url(#webapp-edge)" strokeWidth="1.6" />
      <rect x="78" y="29" width="14" height="3" rx="1.5" fill="#14e0c8" fillOpacity="0.6" />
      <rect x="78" y="35" width="9" height="3" rx="1.5" fill="#14e0c8" fillOpacity="0.4" />

      {/* interlocking gear modules */}
      <g transform="translate(82,76)">
        <g fill="none" stroke="url(#webapp-edge)" strokeWidth="2">
          <circle r="9" fill="#0a0a0b" />
          <g strokeWidth="3">
            <path d="M0 -13 L0 -10 M0 13 L0 10 M-13 0 L-10 0 M13 0 L10 0 M-9 -9 L-7 -7 M9 9 L7 7 M9 -9 L7 -7 M-9 9 L-7 7" strokeLinecap="round" />
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="9s" repeatCount="indefinite" />
          </g>
        </g>
        <circle r="3" fill="url(#webapp-core)" />
      </g>
      <g transform="translate(99,92)">
        <g fill="none" stroke="#14e0c8" strokeWidth="1.6" opacity="0.8">
          <circle r="6" fill="#0a0a0b" />
          <g strokeWidth="2.4">
            <path d="M0 -9 L0 -7 M0 9 L0 7 M-9 0 L-7 0 M9 0 L7 0" strokeLinecap="round" />
            <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="7s" repeatCount="indefinite" />
          </g>
        </g>
      </g>

      {/* API lines + flowing data dots */}
      <path id="webapp-line1" d="M44 62 Q44 76 68 76" fill="none" stroke="#2e66ff" strokeWidth="1.4" strokeOpacity="0.5" />
      <path id="webapp-line2" d="M87 42 Q90 60 82 67" fill="none" stroke="#2e66ff" strokeWidth="1.4" strokeOpacity="0.5" />
      <g fill="#c8f02e">
        <circle r="2.4">
          <animateMotion path="M44 62 Q44 76 68 76" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle r="2.4" fill="#14e0c8">
          <animateMotion path="M87 42 Q90 60 82 67" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default IconWebapp;
