export function IconBranding({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="brand-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="brand-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <radialGradient id="brand-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#brand-glow)" opacity="0.28" />

      {/* baseline grid */}
      <g stroke="#14e0c8" strokeWidth="0.6" opacity="0.2">
        <line x1="20" y1="40" x2="100" y2="40" />
        <line x1="20" y1="60" x2="100" y2="60" />
        <line x1="20" y1="80" x2="100" y2="80" />
        <line x1="40" y1="22" x2="40" y2="98" />
        <line x1="60" y1="22" x2="60" y2="98" />
        <line x1="80" y1="22" x2="80" y2="98" />
      </g>

      {/* identity mark on grid */}
      <g transform="translate(40,40)">
        <path d="M-12 12 L0 -12 L12 12 Z" fill="none" stroke="url(#brand-mark)" strokeWidth="2.4" strokeLinejoin="round" />
        <path d="M-6 12 L0 0 L6 12 Z" fill="url(#brand-mark)" opacity="0.85" />
        <circle r="2.4" cy="-12" fill="#c8f02e">
          <animate attributeName="r" values="2.4;3.6;2.4" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* type "Aa" */}
      <g transform="translate(74,38)" fill="url(#brand-frame)">
        <text x="0" y="10" fontFamily="Inter Tight, system-ui, sans-serif" fontSize="22" fontWeight="700" fill="url(#brand-mark)">Aa</text>
        <rect x="0" y="16" width="30" height="2.2" rx="1.1" fill="#14e0c8" opacity="0.6" />
      </g>

      {/* color swatches */}
      <g>
        <rect x="22" y="74" width="16" height="20" rx="3" fill="#c8f02e">
          <animate attributeName="opacity" values="1;0.6;1" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="42" y="74" width="16" height="20" rx="3" fill="#14e0c8">
          <animate attributeName="opacity" values="1;0.6;1" dur="4s" begin="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="62" y="74" width="16" height="20" rx="3" fill="#22d38c">
          <animate attributeName="opacity" values="1;0.6;1" dur="4s" begin="1.2s" repeatCount="indefinite" />
        </rect>
        <rect x="82" y="74" width="16" height="20" rx="3" fill="#2e66ff">
          <animate attributeName="opacity" values="1;0.6;1" dur="4s" begin="1.8s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
}

export default IconBranding;
