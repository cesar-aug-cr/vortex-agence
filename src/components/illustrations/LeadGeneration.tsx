export function LeadGeneration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="leadgen-funnel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.7" />
          <stop offset="0.55" stopColor="#22d38c" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="leadgen-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <radialGradient id="leadgen-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="leadgen-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <filter id="leadgen-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* vortex rings — concentric ellipses narrowing down */}
      <g fill="none" stroke="url(#leadgen-rim)" strokeWidth="1.6">
        <ellipse cx="200" cy="92" rx="150" ry="34" opacity="0.85" />
        <ellipse cx="200" cy="120" rx="124" ry="28" opacity="0.7" />
        <ellipse cx="200" cy="150" rx="96" ry="22" opacity="0.6" />
        <ellipse cx="200" cy="182" rx="68" ry="16" opacity="0.5" />
        <ellipse cx="200" cy="216" rx="42" ry="11" opacity="0.45" />
        <ellipse cx="200" cy="252" rx="22" ry="7" opacity="0.4" />
      </g>

      {/* funnel body fill */}
      <path
        d="M50 92 Q200 130 350 92 L222 256 Q200 264 178 256 Z"
        fill="url(#leadgen-funnel)"
        opacity="0.5"
      />

      {/* spiralling particles being pulled in */}
      <g>
        <g fill="#14e0c8">
          <circle r="3"><animateMotion path="M60 70 Q200 110 200 290" dur="3.4s" repeatCount="indefinite" /></circle>
          <circle r="2.6"><animateMotion path="M340 70 Q200 110 200 290" dur="3.9s" repeatCount="indefinite" /></circle>
          <circle r="3.2"><animateMotion path="M40 110 Q200 140 200 290" dur="4.3s" repeatCount="indefinite" /></circle>
        </g>
        <g fill="#c8f02e">
          <circle r="2.8"><animateMotion path="M360 110 Q200 140 200 290" dur="3.1s" repeatCount="indefinite" /></circle>
          <circle r="2.4"><animateMotion path="M120 56 Q200 120 200 290" dur="4.7s" repeatCount="indefinite" /></circle>
          <circle r="2.6"><animateMotion path="M280 56 Q200 120 200 290" dur="3.7s" repeatCount="indefinite" /></circle>
        </g>
        <g fill="#2e66ff">
          <circle r="2.2"><animateMotion path="M90 80 Q200 130 200 290" dur="5.1s" repeatCount="indefinite" /></circle>
          <circle r="2.2"><animateMotion path="M310 80 Q200 130 200 290" dur="4.9s" repeatCount="indefinite" /></circle>
        </g>
      </g>

      {/* free-floating particles at the wide mouth */}
      <g fill="#14e0c8" opacity="0.8">
        <circle cx="70" cy="60" r="2.4" />
        <circle cx="330" cy="58" r="2" />
        <circle cx="150" cy="48" r="1.8" />
        <circle cx="250" cy="50" r="2.2" />
        <circle cx="44" cy="92" r="1.8" />
        <circle cx="356" cy="94" r="2" />
      </g>

      {/* conversion point — luminous */}
      <circle cx="200" cy="292" r="58" fill="url(#leadgen-glow)" filter="url(#leadgen-blur)" opacity="0.55" />
      <circle cx="200" cy="292" r="30" fill="url(#leadgen-core)" />
      <circle cx="200" cy="292" r="14" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="14;22;14" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="292" r="6" fill="#c8f02e" />
    </svg>
  );
}

export default LeadGeneration;
