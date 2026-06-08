export function IconAiBuild({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="aibuild-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="aibuild-block" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="aibuild-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="aibuild-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#aibuild-glow)" opacity="0.3" />

      {/* layout frame being assembled */}
      <g stroke="url(#aibuild-frame)" strokeWidth="1.6" fill="none">
        <rect x="20" y="22" width="58" height="48" rx="6" />
        <line x1="20" y1="32" x2="78" y2="32" strokeWidth="1.2" />
      </g>
      <g fill="#c8f02e">
        <circle cx="24.5" cy="27" r="1.4" />
        <circle cx="29" cy="27" r="1.4" opacity="0.6" />
      </g>

      {/* content blocks dropping in */}
      <g fill="url(#aibuild-block)">
        <rect x="26" y="38" width="24" height="6" rx="2">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="26" y="48" width="40" height="4" rx="2" opacity="0.7" />
        <rect x="26" y="56" width="20" height="9" rx="2">
          <animate attributeName="opacity" values="1;0.4;1" dur="4s" begin="1s" repeatCount="indefinite" />
        </rect>
        <rect x="50" y="56" width="20" height="9" rx="2" opacity="0.45" />
      </g>

      {/* neural wiring to the AI core */}
      <g stroke="url(#aibuild-frame)" strokeWidth="1.1" fill="none" opacity="0.85">
        <path d="M78 44 Q92 44 92 60" />
        <path d="M78 60 Q88 62 92 64" />
        <path d="M70 70 Q86 80 92 70" />
      </g>
      <g fill="#14e0c8">
        <circle cx="78" cy="44" r="1.8" />
        <circle cx="78" cy="60" r="1.8" />
        <circle cx="70" cy="70" r="1.8" />
        <circle cx="92" cy="60" r="0">
          <animate attributeName="r" values="0;2.4;0" dur="3.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* AI core node */}
      <g transform="translate(92,64)">
        <circle r="11" fill="url(#aibuild-core)">
          <animate attributeName="r" values="11;12.5;11" dur="3.6s" repeatCount="indefinite" />
        </circle>
        <g stroke="#0a0a0b" strokeWidth="1.3" fill="none" opacity="0.85">
          <path d="M-4 -2 L0 -5 L4 -2 M-4 2 L0 5 L4 2" />
          <circle r="2.2" fill="#0a0a0b" stroke="none" />
        </g>
        <g stroke="#c8f02e" strokeWidth="1" fill="none">
          <circle r="15" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
    </svg>
  );
}

export default IconAiBuild;
