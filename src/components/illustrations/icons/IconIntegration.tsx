export function IconIntegration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="integration-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="integration-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.25" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="integration-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="44" fill="url(#integration-glow)" opacity="0.28" />

      {/* left module with male connector tab, magnetizing right */}
      <g>
        <path d="M22 40 H50 V52 H56 V60 H50 V72 H22 Z"
          fill="url(#integration-fill)" stroke="url(#integration-frame)" strokeWidth="1.8" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="translate" values="-4 0;0 0;-4 0" dur="4.5s" repeatCount="indefinite" />
        </path>
        <circle cx="34" cy="50" r="2.2" fill="#14e0c8" />
        <rect x="30" y="58" width="14" height="2.4" rx="1.2" fill="#b9bcb2" opacity="0.6" />
      </g>

      {/* right module with female notch */}
      <g>
        <path d="M98 40 H70 V52 H64 V60 H70 V72 H98 Z"
          fill="url(#integration-fill)" stroke="url(#integration-frame)" strokeWidth="1.8" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="translate" values="4 0;0 0;4 0" dur="4.5s" repeatCount="indefinite" />
        </path>
        <circle cx="86" cy="50" r="2.2" fill="#2e66ff" />
        <rect x="76" y="58" width="14" height="2.4" rx="1.2" fill="#b9bcb2" opacity="0.6" />
      </g>

      {/* lock-point spark */}
      <circle cx="60" cy="56" r="0" fill="url(#integration-glow)">
        <animate attributeName="r" values="0;9;0" dur="4.5s" repeatCount="indefinite" />
      </circle>

      {/* bidirectional pulsing data flow */}
      <g>
        <circle r="2.4" fill="#c8f02e">
          <animateMotion path="M28 84 H92" dur="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <circle r="2.4" fill="#14e0c8">
          <animateMotion path="M92 92 H28" dur="2.2s" begin="1.1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1;0" dur="2.2s" begin="1.1s" repeatCount="indefinite" />
        </circle>
      </g>
      <g stroke="url(#integration-frame)" strokeWidth="1" opacity="0.4" strokeDasharray="2 4">
        <line x1="28" y1="84" x2="92" y2="84" />
        <line x1="28" y1="92" x2="92" y2="92" />
      </g>
    </svg>
  );
}

export default IconIntegration;
