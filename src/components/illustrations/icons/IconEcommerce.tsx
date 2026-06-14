export function IconEcommerce({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ecom-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="ecom-bag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.14" />
        </linearGradient>
        <radialGradient id="ecom-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="ecom-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="62" r="46" fill="url(#ecom-glow)" opacity="0.24" />

      {/* orbiting product cards */}
      <g>
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 60 62" to="360 60 62" dur="16s" repeatCount="indefinite" />
          <rect x="20" y="34" width="13" height="13" rx="3" fill="#0a0a0b" stroke="url(#ecom-edge)" strokeWidth="1.4" />
          <rect x="88" y="74" width="13" height="13" rx="3" fill="#0a0a0b" stroke="url(#ecom-edge)" strokeWidth="1.4" />
        </g>
        <g>
          <animateTransform attributeName="transform" type="rotate" from="360 60 62" to="0 60 62" dur="20s" repeatCount="indefinite" />
          <rect x="86" y="30" width="11" height="11" rx="3" fill="#0a0a0b" stroke="#14e0c8" strokeWidth="1.3" strokeOpacity="0.7" />
          <rect x="22" y="78" width="11" height="11" rx="3" fill="#0a0a0b" stroke="#14e0c8" strokeWidth="1.3" strokeOpacity="0.7" />
        </g>
      </g>

      {/* shopping bag */}
      <path d="M40 50 L80 50 L86 96 L34 96 Z" fill="url(#ecom-bag)" stroke="url(#ecom-edge)" strokeWidth="2" strokeLinejoin="round" />
      {/* handle */}
      <path d="M48 50 L48 44 Q48 34 60 34 Q72 34 72 44 L72 50" fill="none" stroke="url(#ecom-edge)" strokeWidth="2" strokeLinecap="round" />

      {/* upward sales arrow */}
      <path d="M46 84 L56 74 L62 80 L74 64" fill="none" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset="60">
        <animate attributeName="strokeDashoffset" values="60;0;0" keyTimes="0;0.6;1" dur="3.2s" repeatCount="indefinite" />
      </path>
      <path d="M68 64 L74 64 L74 70" fill="none" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.55;0.65;1" dur="3.2s" repeatCount="indefinite" />
      </path>

      {/* pulsing buy node */}
      <g transform="translate(60,96)">
        <circle r="9" fill="url(#ecom-core)">
          <animate attributeName="r" values="8;10;8" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="-2.5" cy="-1" r="1.6" fill="#0a0a0b" />
        <circle cx="2.5" cy="-1" r="1.6" fill="#0a0a0b" />
        <path d="M-3 2.5 Q0 5 3 2.5" fill="none" stroke="#0a0a0b" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default IconEcommerce;
