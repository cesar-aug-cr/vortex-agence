export function IconBrandIdentity({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brand-identity-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="brand-identity-swatch" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="brand-identity-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="44" fill="url(#brand-identity-glow)" opacity="0.28" />

      {/* modular system grid */}
      <g stroke="url(#brand-identity-frame)" strokeWidth="1.6" fill="none">
        <rect x="24" y="24" width="72" height="72" rx="7" />
        <line x1="60" y1="24" x2="60" y2="96" strokeWidth="1.1" opacity="0.55" />
        <line x1="24" y1="60" x2="96" y2="60" strokeWidth="1.1" opacity="0.55" />
      </g>

      {/* color swatches filling in (top-left cell) */}
      <g>
        <rect x="30" y="30" width="11" height="11" rx="2" fill="url(#brand-identity-swatch)">
          <animate attributeName="opacity" values="0.15;1;0.15" dur="4.2s" repeatCount="indefinite" />
        </rect>
        <rect x="43" y="30" width="11" height="11" rx="2" fill="#14e0c8">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="4.2s" begin="0.7s" repeatCount="indefinite" />
        </rect>
        <rect x="30" y="43" width="11" height="11" rx="2" fill="#2e66ff" opacity="0.85" />
        <rect x="43" y="43" width="11" height="11" rx="2" fill="#22d38c">
          <animate attributeName="opacity" values="1;0.3;1" dur="4.2s" begin="1.4s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* type specimen (top-right cell) */}
      <g>
        <text x="66" y="46" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="url(#brand-identity-frame)">Aa</text>
        <rect x="66" y="50" width="22" height="2.4" rx="1.2" fill="#b9bcb2" opacity="0.7" />
      </g>

      {/* icon mark (bottom-left cell) */}
      <g transform="translate(42,78)" stroke="#c8f02e" strokeWidth="1.8" fill="none" strokeLinejoin="round">
        <path d="M-7 5 L0 -8 L7 5 Z">
          <animateTransform attributeName="transform" type="rotate" values="0;0;360;360" keyTimes="0;0.6;0.85;1" dur="7s" repeatCount="indefinite" />
        </path>
        <circle cx="0" cy="0" r="2.2" fill="#c8f02e" stroke="none" />
      </g>

      {/* spacing dots (bottom-right cell) */}
      <g fill="#14e0c8">
        <circle cx="68" cy="72" r="2" />
        <circle cx="78" cy="72" r="2" opacity="0.7" />
        <circle cx="88" cy="72" r="2" opacity="0.45" />
        <rect x="66" y="80" width="24" height="3" rx="1.5" fill="url(#brand-identity-swatch)">
          <animate attributeName="width" values="6;24;6" dur="5s" repeatCount="indefinite" />
        </rect>
        <rect x="66" y="87" width="16" height="3" rx="1.5" fill="#2e66ff" opacity="0.6" />
      </g>
    </svg>
  );
}

export default IconBrandIdentity;
