export function LandingPages({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="landing-pages-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="landing-pages-hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="landing-pages-magnet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <linearGradient id="landing-pages-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.15" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="landing-pages-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="landing-pages-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <filter id="landing-pages-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient halo */}
      <circle cx="200" cy="150" r="140" fill="url(#landing-pages-glow)" filter="url(#landing-pages-blur)" opacity="0.28" />

      {/* free-floating lead dots at the top */}
      <g fill="#14e0c8">
        <circle cx="64" cy="44" r="3"><animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" /></circle>
        <circle cx="336" cy="40" r="2.6" opacity="0.8" />
        <circle cx="120" cy="32" r="2.2" />
        <circle cx="280" cy="34" r="2.4"><animate attributeName="opacity" values="0.4;1;0.4" dur="3.6s" repeatCount="indefinite" /></circle>
        <circle cx="40" cy="80" r="2" opacity="0.7" />
        <circle cx="360" cy="78" r="2.2" />
      </g>

      {/* single focused landing page */}
      <g stroke="url(#landing-pages-frame)" strokeWidth="2" fill="none">
        <rect x="118" y="70" width="164" height="206" rx="14" />
        <line x1="118" y1="96" x2="282" y2="96" strokeWidth="1.5" />
      </g>
      <rect x="118" y="70" width="164" height="206" rx="14" fill="#14e0c8" opacity="0.04" />
      <g fill="#c8f02e">
        <circle cx="132" cy="83" r="2.4" />
        <circle cx="141" cy="83" r="2.4" opacity="0.7" />
        <circle cx="150" cy="83" r="2.4" opacity="0.45" />
      </g>

      {/* hero block */}
      <rect x="134" y="108" width="132" height="40" rx="7" fill="url(#landing-pages-hero)" />
      <rect x="146" y="118" width="80" height="9" rx="4.5" fill="#c8f02e" opacity="0.85" />
      <rect x="146" y="134" width="108" height="6" rx="3" fill="#b9bcb2" opacity="0.4" />

      {/* form fields */}
      <rect x="134" y="160" width="132" height="18" rx="6" fill="none" stroke="#14e0c8" strokeWidth="1.4" opacity="0.7" />
      <line x1="144" y1="169" x2="200" y2="169" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
      <rect x="134" y="186" width="132" height="18" rx="6" fill="none" stroke="#14e0c8" strokeWidth="1.4" opacity="0.7" />
      <line x1="144" y1="195" x2="216" y2="195" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.4" />

      {/* CTA button glowing */}
      <rect x="134" y="216" width="132" height="26" rx="8" fill="url(#landing-pages-magnet)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.6s" repeatCount="indefinite" />
      </rect>
      <line x1="170" y1="229" x2="230" y2="229" stroke="#0a0a0b" strokeWidth="3.4" strokeLinecap="round" opacity="0.7" />

      {/* trust row */}
      <g fill="#22d38c" opacity="0.6">
        <circle cx="152" cy="258" r="3" />
        <circle cx="170" cy="258" r="3" />
        <circle cx="188" cy="258" r="3" />
      </g>

      {/* magnet pulling lead dots in */}
      <g transform="translate(200,316)">
        <path d="M-22 -4 a22 22 0 0 1 44 0 v18 h-13 v-18 a9 9 0 0 0 -18 0 v18 h-13 z" fill="url(#landing-pages-magnet)" stroke="#0a0a0b" strokeWidth="1" strokeOpacity="0.3" />
        <rect x="-22" y="14" width="13" height="8" fill="#2e66ff" />
        <rect x="9" y="14" width="13" height="8" fill="#2e66ff" />
      </g>

      {/* lead dots funneling down toward the magnet / conversion point */}
      <g stroke="url(#landing-pages-flow)" strokeWidth="1.6" fill="none">
        <path d="M64 44 Q120 200 200 300" opacity="0.5" />
        <path d="M336 40 Q280 200 200 300" opacity="0.5" />
        <path d="M200 242 Q200 270 200 300" opacity="0.6" />
        <path d="M40 80 Q130 220 200 300" opacity="0.4" />
        <path d="M360 78 Q270 220 200 300" opacity="0.4" />
      </g>
      <g fill="#c8f02e">
        <circle r="3"><animateMotion path="M64 44 Q120 200 200 300" dur="3.6s" repeatCount="indefinite" /></circle>
        <circle r="2.8"><animateMotion path="M336 40 Q280 200 200 300" dur="4.1s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M200 242 Q200 270 200 300" dur="2.7s" repeatCount="indefinite" /></circle>
        <circle r="2.4"><animateMotion path="M40 80 Q130 220 200 300" dur="4.6s" repeatCount="indefinite" /></circle>
        <circle r="2.4"><animateMotion path="M360 78 Q270 220 200 300" dur="4.3s" repeatCount="indefinite" /></circle>
      </g>

      {/* converging conversion point */}
      <circle cx="200" cy="316" r="46" fill="url(#landing-pages-glow)" filter="url(#landing-pages-blur)" opacity="0.45" />
      <circle cx="200" cy="316" r="16" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="16;26;16" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.1;0.9" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default LandingPages;
