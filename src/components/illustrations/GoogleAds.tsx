export function GoogleAds({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="googleads-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="googleads-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="googleads-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="googleads-ad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.28" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="googleads-curve" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="googleads-flow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.85" />
        </linearGradient>
        <filter id="googleads-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient glow behind search bar */}
      <circle cx="160" cy="78" r="90" fill="url(#googleads-glow)" filter="url(#googleads-blur)" opacity="0.3" />

      {/* search bar */}
      <g>
        <rect x="44" y="52" width="232" height="48" rx="24" fill="none" stroke="url(#googleads-bar)" strokeWidth="2" />
        <rect x="44" y="52" width="232" height="48" rx="24" fill="#14e0c8" opacity="0.05" />
        {/* query text placeholder lines */}
        <line x1="72" y1="76" x2="148" y2="76" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="158" y1="76" x2="196" y2="76" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.3" />
        {/* blinking caret */}
        <line x1="204" y1="66" x2="204" y2="86" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round">
          <animate attributeName="opacity" values="1;0;1" dur="1.4s" repeatCount="indefinite" />
        </line>
      </g>

      {/* magnifier */}
      <g stroke="#c8f02e" strokeWidth="3" fill="none" strokeLinecap="round">
        <circle cx="306" cy="70" r="14" />
        <line x1="316" y1="80" x2="330" y2="94" />
      </g>

      {/* query dots flowing down from the search bar into results */}
      <g stroke="url(#googleads-flow)" strokeWidth="1.4" fill="none" opacity="0.5">
        <path d="M120 100 Q120 130 120 156" />
        <path d="M200 100 Q200 130 200 156" />
      </g>

      {/* ranked result rows */}
      <g>
        {/* highlighted Ad slot */}
        <rect x="44" y="150" width="232" height="50" rx="10" fill="url(#googleads-ad)" stroke="#c8f02e" strokeWidth="1.6">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="3s" repeatCount="indefinite" />
        </rect>
        {/* Ad badge */}
        <rect x="56" y="160" width="26" height="14" rx="4" fill="#c8f02e" />
        <text x="69" y="171" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#0a0a0b" textAnchor="middle">Ad</text>
        <line x1="92" y1="167" x2="240" y2="167" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <line x1="56" y1="184" x2="200" y2="184" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" opacity="0.4" />

        {/* organic result rows below */}
        <g opacity="0.55">
          <line x1="56" y1="218" x2="180" y2="218" stroke="#14e0c8" strokeWidth="3" strokeLinecap="round" />
          <line x1="56" y1="230" x2="244" y2="230" stroke="#b9bcb2" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
        </g>
        <g opacity="0.4">
          <line x1="56" y1="252" x2="164" y2="252" stroke="#14e0c8" strokeWidth="3" strokeLinecap="round" />
          <line x1="56" y1="264" x2="232" y2="264" stroke="#b9bcb2" strokeWidth="2.2" strokeLinecap="round" opacity="0.5" />
        </g>
      </g>

      {/* rising ROAS / performance curve panel */}
      <g>
        <rect x="294" y="150" width="64" height="118" rx="10" fill="#2e66ff" opacity="0.06" stroke="#2e66ff" strokeWidth="1" strokeOpacity="0.3" />
        {/* axis */}
        <line x1="302" y1="258" x2="350" y2="258" stroke="#b9bcb2" strokeWidth="1" opacity="0.4" />
        {/* rising curve */}
        <path d="M302 252 Q318 240 326 224 T350 162" fill="none" stroke="url(#googleads-curve)" strokeWidth="2.4" strokeLinecap="round" />
        <circle r="3.5" fill="#c8f02e">
          <animateMotion path="M302 252 Q318 240 326 224 T350 162" dur="3.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* clicks flowing from the Ad slot down toward conversion */}
      <g stroke="url(#googleads-flow)" strokeWidth="1.6" fill="none">
        <path d="M120 200 Q140 280 200 326" opacity="0.7" />
        <path d="M236 200 Q230 280 200 326" opacity="0.7" />
        <path d="M170 200 Q160 280 200 326" opacity="0.55" />
      </g>

      {/* travelling clicks converging on the conversion node */}
      <g fill="#c8f02e">
        <circle r="3"><animateMotion path="M120 200 Q140 280 200 326" dur="2.8s" repeatCount="indefinite" /></circle>
        <circle r="3"><animateMotion path="M236 200 Q230 280 200 326" dur="3.3s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M170 200 Q160 280 200 326" dur="3.6s" repeatCount="indefinite" /></circle>
      </g>

      {/* conversion core — coin / check */}
      <circle cx="200" cy="332" r="34" fill="url(#googleads-core)" />
      <circle cx="200" cy="332" r="22" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="22;28;22" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="332" r="16" fill="#0a0a0b" opacity="0.35" />
      <path d="M191 332 l6 7 l12 -14" fill="none" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default GoogleAds;
