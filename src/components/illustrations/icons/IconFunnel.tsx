export function IconFunnel({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="funnel-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="funnel-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.3" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="funnel-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="funnel-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="58" r="46" fill="url(#funnel-glow)" opacity="0.24" />

      {/* wireframe funnel */}
      <path d="M26 28 L94 28 L66 64 L66 80 L54 86 L54 64 Z" fill="url(#funnel-body)" stroke="url(#funnel-edge)" strokeWidth="2" strokeLinejoin="round" />
      {/* internal grid lines */}
      <g stroke="#14e0c8" strokeWidth="0.9" strokeOpacity="0.4">
        <line x1="34" y1="38" x2="86" y2="38" />
        <line x1="42" y1="48" x2="78" y2="48" />
        <line x1="50" y1="58" x2="70" y2="58" />
      </g>

      {/* descending luminous dots */}
      <g>
        <circle r="2.8" fill="#14e0c8">
          <animateMotion path="M40 22 L57 64 L57 86" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0.4;0" keyTimes="0;0.6;0.85;1" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="2.8" fill="#c8f02e">
          <animateMotion path="M60 18 L60 64 L60 86" dur="3s" begin="0.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0.4;0" keyTimes="0;0.6;0.85;1" dur="3s" begin="0.7s" repeatCount="indefinite" />
        </circle>
        <circle r="2.8" fill="#22d38c">
          <animateMotion path="M80 22 L63 64 L63 86" dur="3s" begin="1.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0.4;0" keyTimes="0;0.6;0.85;1" dur="3s" begin="1.4s" repeatCount="indefinite" />
        </circle>
        <circle r="2.2" fill="#14e0c8" opacity="0.7">
          <animateMotion path="M52 20 L58 64 L58 86" dur="3s" begin="2.1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.7;0.3;0" keyTimes="0;0.6;0.85;1" dur="3s" begin="2.1s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* condensing target diamond */}
      <g transform="translate(60,96)">
        <path d="M0 -12 L12 0 L0 12 L-12 0 Z" fill="url(#funnel-core)">
          <animateTransform attributeName="transform" type="rotate" values="0;90" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
        </path>
        <circle r="4" fill="#0a0a0b" />
        <circle r="2" fill="#c8f02e">
          <animate attributeName="r" values="1.4;2.6;1.4" dur="1.6s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default IconFunnel;
