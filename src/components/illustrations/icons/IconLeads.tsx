export function IconLeads({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="leads-magnet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="leads-token" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.2" />
        </linearGradient>
        <radialGradient id="leads-qual" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="leads-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="62" r="46" fill="url(#leads-glow)" opacity="0.28" />

      {/* magnet body (U-shape) */}
      <g transform="translate(60,70)">
        <path d="M-18 4 a18 18 0 0 1 36 0 V20 h-11 V4 a7 7 0 0 0 -14 0 V20 h-11 Z"
          fill="url(#leads-magnet)" stroke="url(#leads-magnet)" strokeWidth="1" strokeLinejoin="round" />
        {/* pole caps */}
        <rect x="-18" y="20" width="11" height="7" rx="1.5" fill="#c8f02e" />
        <rect x="7" y="20" width="11" height="7" rx="1.5" fill="#2e66ff" />
        {/* field lines */}
        <g stroke="#c8f02e" strokeWidth="1.2" fill="none" opacity="0.5">
          <path d="M-13 24 q-8 -2 -8 -10">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.4s" repeatCount="indefinite" />
          </path>
          <path d="M13 24 q8 -2 8 -10">
            <animate attributeName="opacity" values="0.2;0.7;0.2" dur="2.4s" begin="0.4s" repeatCount="indefinite" />
          </path>
        </g>
      </g>

      {/* contact / person tokens being pulled in */}
      <g>
        <g>
          <PersonToken />
          <animateTransform attributeName="transform" type="translate" values="-22 -32;6 8;-22 -32" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3.4s" repeatCount="indefinite" />
        </g>
        <g>
          <PersonToken />
          <animateTransform attributeName="transform" type="translate" values="24 -34;-4 6;24 -34" dur="3.4s" begin="1.1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3.4s" begin="1.1s" repeatCount="indefinite" />
        </g>
        <g>
          <PersonToken />
          <animateTransform attributeName="transform" type="translate" values="2 -42;2 4;2 -42" dur="3.4s" begin="2.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3.4s" begin="2.2s" repeatCount="indefinite" />
        </g>
      </g>

      {/* qualified lead check */}
      <g transform="translate(90,30)">
        <circle r="11" fill="url(#leads-qual)">
          <animate attributeName="r" values="10;12;10" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <path d="M-4 0 L-1.5 3 L4.5 -3.5" fill="none" stroke="#0a0a0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function PersonToken() {
  return (
    <g transform="translate(60,60)" fill="url(#leads-token)" stroke="#14e0c8" strokeWidth="0.8">
      <circle cx="0" cy="-3" r="3.2" />
      <path d="M-5 5 a5 5 0 0 1 10 0 Z" />
    </g>
  );
}

export default IconLeads;
