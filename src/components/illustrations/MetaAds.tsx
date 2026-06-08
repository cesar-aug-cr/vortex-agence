export function MetaAds({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="metaads-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="metaads-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="metaads-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="metaads-image" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d38c" stopOpacity="0.3" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="metaads-net" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id="metaads-flow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.85" />
        </linearGradient>
        <filter id="metaads-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient glow behind the feed card */}
      <circle cx="138" cy="120" r="100" fill="url(#metaads-glow)" filter="url(#metaads-blur)" opacity="0.28" />

      {/* social feed card */}
      <g>
        <rect x="40" y="48" width="190" height="200" rx="16" fill="#14e0c8" opacity="0.05" />
        <rect x="40" y="48" width="190" height="200" rx="16" fill="none" stroke="url(#metaads-card)" strokeWidth="2" />

        {/* header: avatar + name lines */}
        <circle cx="64" cy="74" r="11" fill="none" stroke="#c8f02e" strokeWidth="2" />
        <circle cx="64" cy="74" r="4.5" fill="#c8f02e" />
        <line x1="84" y1="70" x2="148" y2="70" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="84" y1="80" x2="120" y2="80" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" opacity="0.3" />

        {/* image block with play/camera glyph */}
        <rect x="56" y="96" width="158" height="86" rx="10" fill="url(#metaads-image)" stroke="#22d38c" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="124" y="126" width="26" height="26" rx="6" fill="none" stroke="#c8f02e" strokeWidth="2.4" />
        <path d="M133 132 l9 7 l-9 7 z" fill="#c8f02e" />

        {/* engagement bar */}
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* heart */}
          <path d="M70 210 c-5 -6 -14 -1 -8 6 l8 8 l8 -8 c6 -7 -3 -12 -8 -6 z" fill="#c8f02e" stroke="#c8f02e" strokeWidth="1.5">
            <animateTransform attributeName="transform" type="scale" values="1;1.18;1" additive="sum" dur="2.6s" repeatCount="indefinite" />
          </path>
          {/* comment bubble */}
          <path d="M108 208 h26 a5 5 0 0 1 5 5 v10 a5 5 0 0 1 -5 5 h-16 l-8 7 v-7 a5 5 0 0 1 -2 -20 z" fill="none" stroke="#14e0c8" strokeWidth="2" />
          {/* share */}
          <path d="M168 212 l24 -6 l-7 22 l-5 -10 z" fill="none" stroke="#2e66ff" strokeWidth="2" />
        </g>
      </g>

      {/* floating like / comment / @ bubbles rising from the card */}
      <g>
        <g fill="#c8f02e">
          <path d="M252 150 c-4 -5 -11 -1 -6 5 l6 7 l6 -7 c5 -6 -2 -10 -6 -5 z">
            <animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 0; 4 -22; 8 -44" dur="3s" repeatCount="indefinite" />
          </path>
        </g>
        <g stroke="#14e0c8" strokeWidth="2" fill="none">
          <circle cx="276" cy="116" r="9">
            <animate attributeName="opacity" values="0;0.9;0" dur="3.4s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 0; -4 -20; -8 -42" dur="3.4s" repeatCount="indefinite" />
          </circle>
        </g>
        <g>
          <text x="300" y="96" fontFamily="monospace" fontSize="20" fontWeight="700" fill="#2e66ff">@
            <animate attributeName="opacity" values="0;1;0" dur="3.8s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 0; 3 -18; 6 -38" dur="3.8s" repeatCount="indefinite" />
          </text>
        </g>
      </g>

      {/* audience network nodes on the right */}
      <g>
        <g stroke="url(#metaads-net)" strokeWidth="1.4" fill="none">
          <path d="M300 168 L344 150" />
          <path d="M300 168 L350 196" />
          <path d="M344 150 L350 196" />
          <path d="M300 168 L304 226" />
          <path d="M350 196 L304 226" />
        </g>
        <g fill="#2e66ff">
          <circle cx="344" cy="150" r="6" />
          <circle cx="350" cy="196" r="5" />
          <circle cx="304" cy="226" r="5" />
        </g>
        {/* hub node */}
        <circle cx="300" cy="168" r="9" fill="none" stroke="#14e0c8" strokeWidth="2">
          <animate attributeName="r" values="9;13;9" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.3;1" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="168" r="4" fill="#14e0c8" />
      </g>

      {/* engagement flows from card + network toward the converting node */}
      <g stroke="url(#metaads-flow)" strokeWidth="1.6" fill="none">
        <path d="M134 248 Q150 300 200 332" opacity="0.7" />
        <path d="M300 168 Q280 260 212 322" opacity="0.6" />
        <path d="M304 226 Q270 290 216 326" opacity="0.55" />
      </g>

      {/* travelling engagement dots converging on the converting node */}
      <g fill="#c8f02e">
        <circle r="3"><animateMotion path="M134 248 Q150 300 200 332" dur="2.9s" repeatCount="indefinite" /></circle>
        <circle r="2.8"><animateMotion path="M300 168 Q280 260 212 322" dur="3.5s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M304 226 Q270 290 216 326" dur="3.2s" repeatCount="indefinite" /></circle>
      </g>

      {/* converting node core */}
      <circle cx="200" cy="336" r="34" fill="url(#metaads-core)" />
      <circle cx="200" cy="336" r="22" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="22;28;22" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      {/* heart-as-conversion in the core */}
      <path d="M200 348 c-9 -9 -20 -2 -12 9 l12 12 l12 -12 c8 -11 -3 -18 -12 -9 z" fill="#c8f02e" />
    </svg>
  );
}

export default MetaAds;
