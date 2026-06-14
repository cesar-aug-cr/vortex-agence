export function SiteEcommerce({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="site-ecommerce-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="site-ecommerce-tile" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="site-ecommerce-curve" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="site-ecommerce-flow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.2" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.8" />
        </linearGradient>
        <radialGradient id="site-ecommerce-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="site-ecommerce-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <filter id="site-ecommerce-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient halo */}
      <circle cx="160" cy="150" r="140" fill="url(#site-ecommerce-glow)" filter="url(#site-ecommerce-blur)" opacity="0.28" />

      {/* storefront window with product grid */}
      <g stroke="url(#site-ecommerce-frame)" strokeWidth="2" fill="none">
        <rect x="44" y="56" width="200" height="180" rx="14" />
        <line x1="44" y1="84" x2="244" y2="84" strokeWidth="1.5" />
      </g>
      <rect x="44" y="56" width="200" height="180" rx="14" fill="#14e0c8" opacity="0.04" />
      <g fill="#c8f02e">
        <circle cx="58" cy="70" r="2.6" />
        <circle cx="68" cy="70" r="2.6" opacity="0.7" />
        <circle cx="78" cy="70" r="2.6" opacity="0.45" />
      </g>

      {/* product grid tiles */}
      <g>
        <g>
          <rect x="60" y="98" width="76" height="58" rx="8" fill="url(#site-ecommerce-tile)" />
          <circle cx="78" cy="118" r="9" fill="#14e0c8" opacity="0.7" />
          <line x1="60" y1="146" x2="118" y2="146" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </g>
        <g>
          <rect x="152" y="98" width="76" height="58" rx="8" fill="url(#site-ecommerce-tile)" />
          <circle cx="170" cy="118" r="9" fill="#22d38c" opacity="0.7" />
          <line x1="152" y1="146" x2="210" y2="146" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        </g>
        <g>
          <rect x="60" y="166" width="76" height="58" rx="8" fill="url(#site-ecommerce-tile)" />
          <circle cx="78" cy="186" r="9" fill="#2e66ff" opacity="0.7" />
          <line x1="60" y1="214" x2="118" y2="214" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
        </g>
        <g>
          <rect x="152" y="166" width="76" height="58" rx="8" fill="url(#site-ecommerce-tile)">
            <animate attributeName="opacity" values="0.5;1;0.5" dur="3.4s" repeatCount="indefinite" />
          </rect>
          <circle cx="170" cy="186" r="9" fill="#c8f02e" opacity="0.8" />
          <line x1="152" y1="214" x2="210" y2="214" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        </g>
      </g>

      {/* rising sales curve panel */}
      <g>
        <rect x="262" y="56" width="94" height="100" rx="10" fill="#2e66ff" opacity="0.06" stroke="#2e66ff" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="272" y1="142" x2="346" y2="142" stroke="#b9bcb2" strokeWidth="1" opacity="0.4" />
        <path d="M272 134 Q294 124 306 104 T346 70" fill="none" stroke="url(#site-ecommerce-curve)" strokeWidth="2.6" strokeLinecap="round" />
        <path d="M272 134 Q294 124 306 104 T346 70 L346 142 L272 142 Z" fill="url(#site-ecommerce-curve)" opacity="0.12" />
        <circle r="3.5" fill="#c8f02e">
          <animateMotion path="M272 134 Q294 124 306 104 T346 70" dur="3.2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* secure-payment lock */}
      <g transform="translate(286,178)">
        <rect x="0" y="14" width="48" height="36" rx="7" fill="none" stroke="url(#site-ecommerce-frame)" strokeWidth="2" />
        <path d="M9 14 v-6 a15 15 0 0 1 30 0 v6" fill="none" stroke="url(#site-ecommerce-frame)" strokeWidth="2" />
        <circle cx="24" cy="30" r="4.5" fill="#c8f02e">
          <animate attributeName="opacity" values="1;0.35;1" dur="2.2s" repeatCount="indefinite" />
        </circle>
        <line x1="24" y1="33" x2="24" y2="42" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      {/* shopping bag */}
      <g transform="translate(296,236)">
        <path d="M6 18 L54 18 L50 78 L10 78 Z" fill="#14e0c8" opacity="0.1" stroke="url(#site-ecommerce-frame)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 26 v-6 a10 10 0 0 1 20 0 v6" fill="none" stroke="#c8f02e" strokeWidth="2" />
      </g>

      {/* products orbiting into the cart / conversion node */}
      <g stroke="url(#site-ecommerce-flow)" strokeWidth="1.6" fill="none">
        <path d="M150 200 Q200 280 200 318" opacity="0.6" />
        <path d="M210 224 Q210 280 200 318" opacity="0.6" />
        <path d="M300 200 Q250 280 200 318" opacity="0.5" />
      </g>
      <g fill="#c8f02e">
        <circle r="3"><animateMotion path="M150 200 Q200 280 200 318" dur="2.9s" repeatCount="indefinite" /></circle>
        <circle r="2.8"><animateMotion path="M210 224 Q210 280 200 318" dur="3.4s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M300 200 Q250 280 200 318" dur="3.8s" repeatCount="indefinite" /></circle>
      </g>

      {/* conversion / checkout core */}
      <circle cx="200" cy="332" r="56" fill="url(#site-ecommerce-glow)" filter="url(#site-ecommerce-blur)" opacity="0.5" />
      <circle cx="200" cy="332" r="32" fill="url(#site-ecommerce-core)" />
      <circle cx="200" cy="332" r="20" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="20;26;20" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="332" r="14" fill="#0a0a0b" opacity="0.35" />
      {/* small cart glyph */}
      <g stroke="#c8f02e" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M190 324 h18 l-2 11 h-13 z" />
        <circle cx="192" cy="340" r="1.8" fill="#c8f02e" />
        <circle cx="205" cy="340" r="1.8" fill="#c8f02e" />
      </g>
    </svg>
  );
}

export default SiteEcommerce;
