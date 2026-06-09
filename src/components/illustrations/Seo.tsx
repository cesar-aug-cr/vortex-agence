export function Seo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="seo-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="seo-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="seo-rank" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.55" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="seo-row" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="seo-rowtop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.9" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="seo-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <filter id="seo-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* central glow */}
      <circle cx="190" cy="180" r="120" fill="url(#seo-halo)" filter="url(#seo-blur)" opacity="0.35" />

      {/* orbit rings echoing the SeoGeo family */}
      <g fill="none" stroke="url(#seo-glass)" strokeWidth="1.2">
        <ellipse cx="200" cy="200" rx="150" ry="60" opacity="0.4">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="44s" repeatCount="indefinite" />
        </ellipse>
        <circle cx="200" cy="200" r="120" opacity="0.25" strokeDasharray="2 7" />
      </g>

      {/* ranked results list — rows lifting from #7 to #1 */}
      <g>
        {/* row 7 (bottom, dim) */}
        <g opacity="0.85">
          <rect x="86" y="288" width="170" height="20" rx="6" fill="url(#seo-row)" />
          <circle cx="100" cy="298" r="6" fill="#2e66ff" />
          <text x="96.5" y="301.5" fontSize="8" fontFamily="monospace" fill="#0a0a0b">7</text>
        </g>
        {/* row 5 */}
        <g opacity="0.9">
          <rect x="86" y="250" width="200" height="20" rx="6" fill="url(#seo-row)" />
          <circle cx="100" cy="260" r="6" fill="#2e66ff" />
          <text x="96.5" y="263.5" fontSize="8" fontFamily="monospace" fill="#0a0a0b">5</text>
        </g>
        {/* row 3 */}
        <g>
          <rect x="86" y="212" width="230" height="20" rx="6" fill="url(#seo-row)" />
          <circle cx="100" cy="222" r="6" fill="#14e0c8" />
          <text x="96.5" y="225.5" fontSize="8" fontFamily="monospace" fill="#0a0a0b">3</text>
        </g>
        {/* row 1 (top, winner) */}
        <g>
          <rect x="86" y="172" width="248" height="22" rx="7" fill="url(#seo-rowtop)" stroke="#c8f02e" strokeWidth="1" />
          <circle cx="100" cy="183" r="7" fill="#c8f02e" />
          <text x="96.5" y="186.5" fontSize="8.5" fontFamily="monospace" fontWeight="700" fill="#0a0a0b">1</text>
          <animate attributeName="opacity" values="1;0.55;1" dur="3s" repeatCount="indefinite" />
        </g>
      </g>

      {/* keyword / tag motif */}
      <g>
        <g transform="translate(296 110)">
          <path d="M0 0 L34 0 A8 8 0 0 1 42 8 L42 22 A8 8 0 0 1 34 30 L0 30 L-12 15 Z" fill="none" stroke="#22d38c" strokeWidth="1.4" opacity="0.85" />
          <circle cx="-2" cy="15" r="2.6" fill="#c8f02e" />
          <line x1="8" y1="11" x2="32" y2="11" stroke="#14e0c8" strokeWidth="2" opacity="0.7" />
          <line x1="8" y1="19" x2="26" y2="19" stroke="#14e0c8" strokeWidth="2" opacity="0.4" />
        </g>
      </g>

      {/* climbing position arrow lifting the site upward */}
      <g stroke="url(#seo-rank)" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M64 300 L116 252 L150 276 L210 196 L266 150" opacity="0.95" />
        <path d="M250 142 L266 150 L258 166" />
      </g>

      {/* travelling dots = organic traffic flowing up the ranking */}
      <g fill="#c8f02e">
        <circle r="3.4">
          <animateMotion path="M64 300 L116 252 L150 276 L210 196 L266 150" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle r="2.6">
          <animateMotion path="M64 300 L116 252 L150 276 L210 196 L266 150" dur="3.2s" begin="1.1s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill="#14e0c8">
          <animateMotion path="M64 300 L116 252 L150 276 L210 196 L266 150" dur="3.2s" begin="2.1s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* scattered organic-traffic stars */}
      <g fill="#2e66ff">
        <circle cx="150" cy="64" r="2.2" />
        <circle cx="346" cy="200" r="2.4" />
        <circle cx="54" cy="120" r="1.8" />
        <circle cx="360" cy="320" r="1.8" />
        <circle cx="120" cy="350" r="2" />
      </g>

      {/* magnifier over the results */}
      <g>
        <circle cx="246" cy="120" r="62" fill="url(#seo-core)" opacity="0.5" />
        <circle cx="246" cy="120" r="40" fill="#0a0a0b" opacity="0.55" />
        <circle cx="246" cy="120" r="40" fill="none" stroke="url(#seo-glass)" strokeWidth="6" />
        <circle cx="246" cy="120" r="40" fill="none" stroke="#c8f02e" strokeWidth="1.5" opacity="0.5">
          <animate attributeName="r" values="40;46;40" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* lens highlight */}
        <path d="M228 104 A24 24 0 0 1 256 96" fill="none" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        {/* handle */}
        <line x1="276" y1="150" x2="312" y2="186" stroke="url(#seo-glass)" strokeWidth="9" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default Seo;
