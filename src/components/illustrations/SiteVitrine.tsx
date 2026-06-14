export function SiteVitrine({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="site-vitrine-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="site-vitrine-hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="site-vitrine-block" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d38c" stopOpacity="0.5" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="site-vitrine-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0" />
          <stop offset="0.5" stopColor="#c8f02e" stopOpacity="0.45" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="site-vitrine-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="site-vitrine-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <filter id="site-vitrine-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
        <clipPath id="site-vitrine-screen">
          <rect x="58" y="92" width="284" height="208" rx="4" />
        </clipPath>
      </defs>

      {/* ambient halo */}
      <circle cx="200" cy="180" r="150" fill="url(#site-vitrine-glow)" filter="url(#site-vitrine-blur)" opacity="0.3" />

      {/* browser frame */}
      <g stroke="url(#site-vitrine-frame)" strokeWidth="2" fill="none">
        <rect x="56" y="64" width="288" height="236" rx="16" />
        <line x1="56" y1="92" x2="344" y2="92" strokeWidth="1.5" />
      </g>
      <rect x="56" y="64" width="288" height="236" rx="16" fill="#14e0c8" opacity="0.04" />

      {/* chrome dots + url bar */}
      <g fill="#c8f02e">
        <circle cx="72" cy="78" r="3" />
        <circle cx="84" cy="78" r="3" opacity="0.7" />
        <circle cx="96" cy="78" r="3" opacity="0.45" />
      </g>
      <rect x="120" y="72" width="208" height="12" rx="6" fill="url(#site-vitrine-block)" opacity="0.7" />
      <circle cx="130" cy="78" r="2.6" fill="#14e0c8" />

      {/* content lighting up section-by-section */}
      <g clipPath="url(#site-vitrine-screen)">
        {/* hero band */}
        <rect x="72" y="108" width="256" height="64" rx="8" fill="url(#site-vitrine-hero)">
          <animate attributeName="opacity" values="0.35;1;0.35" dur="4.8s" repeatCount="indefinite" />
        </rect>
        <rect x="88" y="124" width="120" height="12" rx="6" fill="#c8f02e" opacity="0.8" />
        <rect x="88" y="144" width="170" height="7" rx="3.5" fill="#b9bcb2" opacity="0.4" />

        {/* feature cards row */}
        <g>
          <rect x="72" y="186" width="78" height="58" rx="8" fill="url(#site-vitrine-block)">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.8s" begin="0.6s" repeatCount="indefinite" />
          </rect>
          <rect x="161" y="186" width="78" height="58" rx="8" fill="url(#site-vitrine-block)">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.8s" begin="1.2s" repeatCount="indefinite" />
          </rect>
          <rect x="250" y="186" width="78" height="58" rx="8" fill="url(#site-vitrine-block)">
            <animate attributeName="opacity" values="0.3;0.9;0.3" dur="4.8s" begin="1.8s" repeatCount="indefinite" />
          </rect>
          <circle cx="92" cy="206" r="6" fill="#14e0c8" />
          <circle cx="181" cy="206" r="6" fill="#22d38c" />
          <circle cx="270" cy="206" r="6" fill="#2e66ff" />
          <line x1="84" y1="226" x2="138" y2="226" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <line x1="173" y1="226" x2="227" y2="226" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <line x1="262" y1="226" x2="316" y2="226" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* footer text rows */}
        <line x1="72" y1="262" x2="200" y2="262" stroke="#14e0c8" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="72" y1="276" x2="270" y2="276" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" opacity="0.35" />

        {/* glass reflection sweep */}
        <rect x="-120" y="92" width="120" height="208" fill="url(#site-vitrine-sweep)" transform="skewX(-18)">
          <animate attributeName="x" values="-120;460" dur="5.5s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* conversion CTA node pulsing at the bottom */}
      <circle cx="200" cy="338" r="34" fill="url(#site-vitrine-core)" />
      <circle cx="200" cy="338" r="22" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="22;28;22" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <rect x="176" y="330" width="48" height="16" rx="8" fill="#0a0a0b" opacity="0.45" />
      <rect x="176" y="330" width="48" height="16" rx="8" fill="none" stroke="#c8f02e" strokeWidth="1.6" />
      <line x1="186" y1="338" x2="214" y2="338" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" />

      {/* flowing accents drawn toward the CTA */}
      <g fill="#14e0c8">
        <circle r="2.6"><animateMotion path="M120 300 Q150 326 200 338" dur="3s" repeatCount="indefinite" /></circle>
        <circle r="2.2"><animateMotion path="M280 300 Q250 326 200 338" dur="3.6s" repeatCount="indefinite" /></circle>
      </g>
    </svg>
  );
}

export default SiteVitrine;
