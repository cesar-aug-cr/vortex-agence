export function SiteMultilingue({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="site-multilingue-grid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="site-multilingue-thread" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.15" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="site-multilingue-globe" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.3" />
          <stop offset="0.6" stopColor="#2e66ff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="site-multilingue-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="site-multilingue-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="site-multilingue-bubble" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <filter id="site-multilingue-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient halo */}
      <circle cx="200" cy="190" r="150" fill="url(#site-multilingue-glow)" filter="url(#site-multilingue-blur)" opacity="0.26" />

      {/* globe */}
      <circle cx="200" cy="190" r="118" fill="url(#site-multilingue-globe)" />
      <circle cx="200" cy="190" r="118" fill="none" stroke="url(#site-multilingue-grid)" strokeWidth="2" />
      {/* latitudes */}
      <g fill="none" stroke="url(#site-multilingue-grid)" strokeWidth="1" opacity="0.45">
        <line x1="86" y1="150" x2="314" y2="150" />
        <line x1="82" y1="190" x2="318" y2="190" />
        <line x1="86" y1="230" x2="314" y2="230" />
        <ellipse cx="200" cy="190" rx="118" ry="44" />
        <ellipse cx="200" cy="190" rx="118" ry="84" />
      </g>
      {/* longitudes */}
      <g fill="none" stroke="url(#site-multilingue-grid)" strokeWidth="1" opacity="0.45">
        <ellipse cx="200" cy="190" rx="40" ry="118" />
        <ellipse cx="200" cy="190" rx="80" ry="118" />
        <line x1="200" y1="72" x2="200" y2="308" />
      </g>

      {/* page nodes on the grid linked by hreflang threads */}
      <g stroke="url(#site-multilingue-thread)" strokeWidth="1.6" fill="none">
        <path d="M132 132 Q200 170 268 130" opacity="0.6" />
        <path d="M132 132 Q120 200 150 252" opacity="0.55" />
        <path d="M268 130 Q286 200 252 252" opacity="0.55" />
        <path d="M150 252 Q200 232 252 252" opacity="0.6" />
        <path d="M132 132 Q200 200 252 252" opacity="0.4" />
        <path d="M268 130 Q200 200 150 252" opacity="0.4" />
      </g>
      {/* travelling hreflang packets */}
      <g fill="#c8f02e">
        <circle r="2.8"><animateMotion path="M132 132 Q200 170 268 130" dur="3.4s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M268 130 Q286 200 252 252" dur="3.9s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M150 252 Q200 232 252 252" dur="3.1s" repeatCount="indefinite" /></circle>
        <circle r="2.4"><animateMotion path="M132 132 Q120 200 150 252" dur="4.3s" repeatCount="indefinite" /></circle>
      </g>

      {/* language bubbles orbiting / swapping */}
      <g>
        <g>
          <circle cx="132" cy="132" r="20" fill="url(#site-multilingue-bubble)" opacity="0.92" />
          <circle cx="132" cy="132" r="20" fill="none" stroke="#c8f02e" strokeWidth="1.4">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" repeatCount="indefinite" />
          </circle>
          <text x="132" y="137" fontFamily="monospace" fontSize="13" fontWeight="700" fill="#0a0a0b" textAnchor="middle">FR</text>
        </g>
        <g>
          <circle cx="268" cy="130" r="20" fill="url(#site-multilingue-bubble)" opacity="0.92" />
          <circle cx="268" cy="130" r="20" fill="none" stroke="#c8f02e" strokeWidth="1.4">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" begin="1s" repeatCount="indefinite" />
          </circle>
          <text x="268" y="135" fontFamily="monospace" fontSize="13" fontWeight="700" fill="#0a0a0b" textAnchor="middle">DE</text>
        </g>
        <g>
          <circle cx="150" cy="252" r="20" fill="url(#site-multilingue-bubble)" opacity="0.92" />
          <circle cx="150" cy="252" r="20" fill="none" stroke="#c8f02e" strokeWidth="1.4">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" begin="2s" repeatCount="indefinite" />
          </circle>
          <text x="150" y="257" fontFamily="monospace" fontSize="13" fontWeight="700" fill="#0a0a0b" textAnchor="middle">EN</text>
        </g>
        <g>
          <circle cx="252" cy="252" r="20" fill="url(#site-multilingue-bubble)" opacity="0.92" />
          <circle cx="252" cy="252" r="20" fill="none" stroke="#c8f02e" strokeWidth="1.4">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="4s" begin="3s" repeatCount="indefinite" />
          </circle>
          <text x="252" y="256" fontFamily="monospace" fontSize="8.5" fontWeight="700" fill="#0a0a0b" textAnchor="middle">AUTRE</text>
        </g>
      </g>

      {/* orbiting accent dot around the globe */}
      <g fill="#c8f02e">
        <circle r="3.4">
          <animateMotion dur="9s" repeatCount="indefinite" path="M200 72 A118 118 0 1 1 199 72 Z" />
        </circle>
      </g>

      {/* central language-switch core */}
      <circle cx="200" cy="190" r="30" fill="url(#site-multilingue-core)" />
      <circle cx="200" cy="190" r="18" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="18;25;18" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="190" r="11" fill="#0a0a0b" opacity="0.35" />
      {/* swap glyph */}
      <g stroke="#c8f02e" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M192 185 h12 l-3 -3 M208 195 h-12 l3 3" />
      </g>
    </svg>
  );
}

export default SiteMultilingue;
