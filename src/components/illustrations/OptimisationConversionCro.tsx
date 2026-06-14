export function OptimisationConversionCro({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="cro-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cro-variant-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="cro-variant-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.28" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="cro-curve" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="cro-heat-hot" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#22d38c" stopOpacity="0.35" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cro-heat-mid" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cro-win" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <filter id="cro-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient glow behind winner B */}
      <circle cx="288" cy="96" r="64" fill="url(#cro-glow)" filter="url(#cro-blur)" opacity="0.3" />

      {/* VARIANT A panel */}
      <g>
        <rect x="38" y="56" width="138" height="170" rx="12" fill="url(#cro-variant-a)" stroke="#2e66ff" strokeWidth="1.6" strokeOpacity="0.7" />
        <circle cx="58" cy="74" r="9" fill="#2e66ff" opacity="0.55" />
        <text x="58" y="78" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#f2f3ee" textAnchor="middle">A</text>
        {/* layout blocks */}
        <rect x="54" y="92" width="106" height="34" rx="6" fill="#14e0c8" opacity="0.1" />
        <line x1="66" y1="106" x2="148" y2="106" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <line x1="66" y1="116" x2="120" y2="116" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" opacity="0.3" />
        <rect x="54" y="138" width="50" height="40" rx="6" fill="#2e66ff" opacity="0.16" />
        <rect x="112" y="138" width="48" height="40" rx="6" fill="#2e66ff" opacity="0.16" />
        {/* small cta */}
        <rect x="54" y="190" width="64" height="18" rx="9" fill="#2e66ff" opacity="0.5" />
        {/* heatmap (cool) */}
        <circle cx="86" cy="200" r="22" fill="url(#cro-heat-mid)" />
      </g>

      {/* VARIANT B panel (winner) */}
      <g>
        <rect x="224" y="56" width="138" height="170" rx="12" fill="url(#cro-variant-b)" stroke="#c8f02e" strokeWidth="1.8">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="2.6s" repeatCount="indefinite" />
        </rect>
        <circle cx="244" cy="74" r="9" fill="#c8f02e" />
        <text x="244" y="78" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#0a0a0b" textAnchor="middle">B</text>
        {/* layout blocks */}
        <rect x="240" y="92" width="106" height="34" rx="6" fill="#c8f02e" opacity="0.12" />
        <line x1="252" y1="106" x2="334" y2="106" stroke="#c8f02e" strokeWidth="3.4" strokeLinecap="round" opacity="0.7" />
        <line x1="252" y1="116" x2="300" y2="116" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" opacity="0.4" />
        <rect x="240" y="138" width="106" height="34" rx="6" fill="#22d38c" opacity="0.16" />
        {/* big winning cta */}
        <rect x="240" y="184" width="106" height="24" rx="12" fill="#c8f02e">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
        </rect>
        <text x="293" y="200" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#0a0a0b" textAnchor="middle">CONVERT</text>
        {/* heatmap (hot on the CTA) */}
        <circle cx="293" cy="196" r="30" fill="url(#cro-heat-hot)">
          <animate attributeName="r" values="24;34;24" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="312" cy="150" r="16" fill="url(#cro-heat-mid)" />
      </g>

      {/* split-test divider with VS */}
      <g transform="translate(200 130)">
        <line x1="0" y1="-78" x2="0" y2="120" stroke="#b9bcb2" strokeWidth="1.4" strokeDasharray="3 6" strokeOpacity="0.4" />
        <circle r="16" fill="#0a0a0b" opacity="0.6" stroke="url(#cro-curve)" strokeWidth="1.8" />
        <text x="0" y="4" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#14e0c8" textAnchor="middle">VS</text>
      </g>

      {/* rising conversion curve panel */}
      <g>
        <rect x="38" y="252" width="248" height="116" rx="12" fill="#2e66ff" opacity="0.05" stroke="#2e66ff" strokeWidth="1" strokeOpacity="0.3" />
        <text x="54" y="272" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#b9bcb2" opacity="0.7">CVR %</text>
        {/* axes */}
        <line x1="54" y1="352" x2="270" y2="352" stroke="#b9bcb2" strokeWidth="1" opacity="0.4" />
        <line x1="54" y1="282" x2="54" y2="352" stroke="#b9bcb2" strokeWidth="1" opacity="0.3" />
        {/* baseline A curve (flat) */}
        <path d="M54 340 Q120 338 180 334 T270 330" fill="none" stroke="#2e66ff" strokeWidth="2" strokeOpacity="0.45" strokeDasharray="4 5" />
        {/* winning B curve (rising) */}
        <path d="M54 344 Q120 330 170 304 T270 274" fill="none" stroke="url(#cro-curve)" strokeWidth="2.6" strokeLinecap="round" />
        <circle r="3.6" fill="#c8f02e">
          <animateMotion path="M54 344 Q120 330 170 304 T270 274" dur="3.4s" repeatCount="indefinite" />
        </circle>
        {/* uplift label */}
        <text x="246" y="290" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#c8f02e" textAnchor="end">+38%</text>
      </g>

      {/* winning crown / star on B node */}
      <g transform="translate(330 248)">
        <circle r="22" fill="url(#cro-win)" />
        <path d="M0 -11 L3 -3 L11 -3 L5 2 L7 10 L0 5 L-7 10 L-5 2 L-11 -3 L-3 -3 Z" fill="#0a0a0b" opacity="0.4" stroke="#c8f02e" strokeWidth="1.6" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="rotate" values="0;12;0;-12;0" dur="5s" repeatCount="indefinite" />
        </path>
        <circle r="17" fill="none" stroke="#c8f02e" strokeWidth="1.4">
          <animate attributeName="r" values="14;22;14" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default OptimisationConversionCro;
