export function SitesWeb({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sitesweb-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="sitesweb-signal" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.55" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="sitesweb-block" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="sitesweb-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <filter id="sitesweb-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* ambient halo */}
      <circle cx="200" cy="200" r="150" fill="url(#sitesweb-glow)" opacity="0.35" />

      {/* browser frame */}
      <g stroke="url(#sitesweb-frame)" strokeWidth="2" fill="none">
        <rect x="70" y="70" width="260" height="200" rx="14" />
        <line x1="70" y1="102" x2="330" y2="102" strokeWidth="1.5" />
      </g>
      {/* browser chrome dots */}
      <g fill="#c8f02e">
        <circle cx="86" cy="86" r="3" />
        <circle cx="98" cy="86" r="3" opacity="0.7" />
        <circle cx="110" cy="86" r="3" opacity="0.45" />
      </g>
      {/* url bar */}
      <rect x="130" y="80" width="180" height="12" rx="6" fill="url(#sitesweb-block)" opacity="0.6" />

      {/* layout blocks dissolving into flow */}
      <g fill="url(#sitesweb-block)">
        <rect x="90" y="120" width="90" height="14" rx="4" />
        <rect x="90" y="142" width="120" height="8" rx="3" opacity="0.7" />
        <rect x="90" y="156" width="100" height="8" rx="3" opacity="0.55" />
        <rect x="90" y="178" width="64" height="40" rx="6" opacity="0.5" />
        <rect x="162" y="178" width="64" height="40" rx="6" opacity="0.35" />
      </g>

      {/* rising conversion signal */}
      <path
        d="M90 250 L130 232 L168 240 L208 206 L246 214 L288 168 L320 138"
        fill="none"
        stroke="url(#sitesweb-signal)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M90 250 L130 232 L168 240 L208 206 L246 214 L288 168 L320 138 L320 260 L90 260 Z"
        fill="url(#sitesweb-signal)"
        opacity="0.12"
      />
      {/* signal nodes */}
      <g fill="#c8f02e">
        <circle cx="130" cy="232" r="3.5" />
        <circle cx="208" cy="206" r="3.5" />
        <circle cx="288" cy="168" r="3.5" />
        <circle cx="320" cy="138" r="5">
          <animate attributeName="r" values="5;7;5" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* cursor */}
      <g transform="translate(252,196)">
        <path
          d="M0 0 L0 22 L6 16 L11 26 L15 24 L10 14 L18 14 Z"
          fill="#0a0a0b"
          stroke="#c8f02e"
          strokeWidth="1.5"
          strokeLinejoin="round"
        >
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 4 -6; 0 0"
            dur="3.4s"
            repeatCount="indefinite"
          />
        </path>
      </g>

      {/* floating particles drawn into the page */}
      <g fill="#14e0c8">
        <circle cx="345" cy="120" r="2">
          <animate attributeName="cx" values="345;300;345" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="210" r="2.4">
          <animate attributeName="cy" values="210;180;210" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="350" cy="240" r="1.8" opacity="0.6">
          <animate attributeName="cx" values="350;310;350" dur="6s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* soft underline glow */}
      <ellipse cx="200" cy="288" rx="120" ry="10" fill="url(#sitesweb-glow)" filter="url(#sitesweb-blur)" opacity="0.3" />
    </svg>
  );
}

export default SitesWeb;
