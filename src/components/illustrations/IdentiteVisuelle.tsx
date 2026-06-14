export function IdentiteVisuelle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="identvis-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#22d38c" stopOpacity="0.6" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="identvis-board" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="identvis-sw1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <linearGradient id="identvis-sw2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="identvis-type" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="identvis-photo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.2" />
        </linearGradient>
        <filter id="identvis-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* glow */}
      <circle cx="200" cy="200" r="100" fill="url(#identvis-glow)" filter="url(#identvis-blur)" opacity="0.4" />

      {/* modular system board outline */}
      <rect x="48" y="56" width="304" height="288" rx="14" fill="#0a0a0b" opacity="0.18" />
      <rect x="48" y="56" width="304" height="288" rx="14" fill="none" stroke="url(#identvis-board)" strokeWidth="1.4" />
      {/* board grid */}
      <g stroke="#14e0c8" strokeWidth="0.8" strokeOpacity="0.22" strokeDasharray="3 6">
        <line x1="200" y1="56" x2="200" y2="344" />
        <line x1="48" y1="200" x2="352" y2="200" />
      </g>

      {/* MODULE: color swatches (top-left) snapping in */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="-14 0;0 0;0 0" keyTimes="0;0.3;1" dur="4s" repeatCount="indefinite" additive="sum" />
        <rect x="72" y="80" width="34" height="44" rx="6" fill="url(#identvis-sw1)" />
        <rect x="112" y="80" width="34" height="44" rx="6" fill="url(#identvis-sw2)" />
        <rect x="152" y="80" width="22" height="44" rx="6" fill="#c8f02e" opacity="0.85" />
        <line x1="72" y1="132" x2="174" y2="132" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      </g>

      {/* MODULE: type specimen Aa (top-right) */}
      <g>
        <rect x="226" y="76" width="104" height="56" rx="8" fill="#2e66ff" opacity="0.07" stroke="#2e66ff" strokeWidth="1" strokeOpacity="0.3" />
        <text x="278" y="120" fontFamily="Inter Tight, sans-serif" fontSize="46" fontWeight="700" fill="url(#identvis-type)" textAnchor="middle">Aa</text>
        <line x1="240" y1="86" x2="284" y2="86" stroke="#14e0c8" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </g>

      {/* MODULE: icon set (bottom-left) */}
      <g transform="translate(72 230)">
        <g>
          <animateTransform attributeName="transform" type="scale" values="0.85;1;1;0.85" keyTimes="0;0.25;0.75;1" dur="5s" repeatCount="indefinite" additive="sum" />
          {/* circle icon */}
          <circle cx="14" cy="14" r="13" fill="none" stroke="#c8f02e" strokeWidth="2.4" />
          {/* square icon */}
          <rect x="44" y="1" width="26" height="26" rx="5" fill="none" stroke="#14e0c8" strokeWidth="2.4" />
          {/* triangle icon */}
          <path d="M99 1 L112 27 L86 27 Z" fill="none" stroke="#22d38c" strokeWidth="2.4" strokeLinejoin="round" />
          {/* second row */}
          <path d="M14 44 l8 8 l-8 8 l-8 -8 z" fill="none" stroke="#2e66ff" strokeWidth="2.4" strokeLinejoin="round" />
          <path d="M44 44 h26 M57 44 v26" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx="99" cy="57" r="13" fill="url(#identvis-sw1)" opacity="0.5" />
        </g>
      </g>

      {/* MODULE: photo frame (bottom-right) */}
      <g transform="translate(226 220)">
        <rect x="0" y="0" width="104" height="96" rx="8" fill="url(#identvis-photo)" stroke="#14e0c8" strokeWidth="1.4" strokeOpacity="0.5" />
        {/* mountains + sun */}
        <circle cx="78" cy="28" r="11" fill="#c8f02e" opacity="0.9" />
        <path d="M0 96 L34 52 L60 78 L80 60 L104 86 L104 96 Z" fill="#0a0a0b" opacity="0.35" />
        <path d="M0 96 L34 52 L60 78 L80 60 L104 86" fill="none" stroke="#22d38c" strokeWidth="1.6" opacity="0.6" />
      </g>

      {/* snapping alignment ticks at center cross */}
      <g fill="#c8f02e">
        <rect x="196" y="196" width="8" height="8" rx="2">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite" />
        </rect>
      </g>
      {/* connecting nodes from center to modules */}
      <g stroke="#14e0c8" strokeWidth="1" strokeOpacity="0.35">
        <line x1="200" y1="200" x2="120" y2="100" />
        <line x1="200" y1="200" x2="278" y2="104" />
        <line x1="200" y1="200" x2="120" y2="270" />
        <line x1="200" y1="200" x2="278" y2="268" />
      </g>
      <g fill="#22d38c">
        <circle r="2.5"><animateMotion path="M200 200 L120 100" dur="3s" repeatCount="indefinite" /></circle>
        <circle r="2.5"><animateMotion path="M200 200 L278 104" dur="3.4s" repeatCount="indefinite" /></circle>
        <circle r="2.5"><animateMotion path="M200 200 L120 270" dur="3.8s" repeatCount="indefinite" /></circle>
        <circle r="2.5"><animateMotion path="M200 200 L278 268" dur="3.2s" repeatCount="indefinite" /></circle>
      </g>
    </svg>
  );
}

export default IdentiteVisuelle;
