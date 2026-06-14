export function IconAbTest({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="abtest-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="abtest-curve" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="abtest-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="abtest-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="64" r="46" fill="url(#abtest-glow)" opacity="0.24" />

      {/* rising curve above the variants */}
      <path d="M20 40 Q44 38 58 28 T100 14" fill="none" stroke="url(#abtest-curve)" strokeWidth="2" strokeLinecap="round" strokeDasharray="120" strokeDashoffset="120">
        <animate attributeName="strokeDashoffset" values="120;0" dur="2.6s" repeatCount="indefinite" />
      </path>
      <circle r="2.6" fill="#c8f02e">
        <animateMotion path="M20 40 Q44 38 58 28 T100 14" dur="2.6s" repeatCount="indefinite" />
      </circle>

      {/* variant A page */}
      <g>
        <rect x="20" y="50" width="36" height="46" rx="5" fill="#0a0a0b" stroke="#b9bcb2" strokeWidth="1.6" strokeOpacity="0.6" />
        <rect x="26" y="58" width="24" height="5" rx="2" fill="#b9bcb2" fillOpacity="0.5" />
        <rect x="26" y="68" width="24" height="3" rx="1.5" fill="#b9bcb2" fillOpacity="0.3" />
        <rect x="26" y="75" width="18" height="3" rx="1.5" fill="#b9bcb2" fillOpacity="0.3" />
        <rect x="26" y="84" width="16" height="6" rx="3" fill="#b9bcb2" fillOpacity="0.4" />
      </g>

      {/* variant B page (winner) */}
      <g>
        <rect x="64" y="50" width="36" height="46" rx="5" fill="#0a0a0b" stroke="url(#abtest-edge)" strokeWidth="1.8">
          <animate attributeName="strokeWidth" values="1.8;2.6;1.8" dur="2.6s" repeatCount="indefinite" />
        </rect>
        <rect x="70" y="58" width="24" height="5" rx="2" fill="url(#abtest-edge)" />
        <rect x="70" y="68" width="24" height="3" rx="1.5" fill="#14e0c8" fillOpacity="0.5" />
        <rect x="70" y="75" width="18" height="3" rx="1.5" fill="#14e0c8" fillOpacity="0.5" />
        <rect x="70" y="84" width="20" height="6" rx="3" fill="url(#abtest-core)" />
      </g>

      {/* labels */}
      <text x="38" y="110" fontFamily="sans-serif" fontSize="13" fontWeight="700" textAnchor="middle" fill="#b9bcb2">A</text>
      <text x="82" y="110" fontFamily="sans-serif" fontSize="13" fontWeight="700" textAnchor="middle" fill="#c8f02e">B</text>

      {/* winner crown node on B */}
      <g transform="translate(82,40)">
        <circle r="0" fill="url(#abtest-core)">
          <animate attributeName="r" values="0;8;7;8" keyTimes="0;0.5;0.75;1" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <path d="M-4 1 L-4 -3 L-1.5 -1 L0 -4 L1.5 -1 L4 -3 L4 1 Z" fill="#0a0a0b" opacity="0">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.5;0.6;1" dur="2.6s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

export default IconAbTest;
