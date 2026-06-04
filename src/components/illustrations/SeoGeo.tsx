export function SeoGeo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="seogeo-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="seogeo-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="seogeo-orbit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="seogeo-citation" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.9" />
        </linearGradient>
        <filter id="seogeo-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* central glow */}
      <circle cx="200" cy="200" r="120" fill="url(#seogeo-halo)" filter="url(#seogeo-blur)" opacity="0.4" />

      {/* orbit rings */}
      <g fill="none" stroke="url(#seogeo-orbit)" strokeWidth="1.2">
        <ellipse cx="200" cy="200" rx="150" ry="60" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="40s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="200" cy="200" rx="150" ry="60" opacity="0.4" transform="rotate(60 200 200)" />
        <ellipse cx="200" cy="200" rx="150" ry="60" opacity="0.4" transform="rotate(120 200 200)" />
        <circle cx="200" cy="200" r="100" opacity="0.3" strokeDasharray="2 7" />
      </g>

      {/* citation lines from query nodes to core */}
      <g stroke="url(#seogeo-citation)" strokeWidth="1.5" fill="none" opacity="0.85">
        <line x1="64" y1="120" x2="200" y2="200" />
        <line x1="330" y1="98" x2="200" y2="200" />
        <line x1="350" y1="220" x2="200" y2="200" />
        <line x1="90" y1="300" x2="200" y2="200" />
        <line x1="280" y1="320" x2="200" y2="200" />
        <line x1="50" y1="210" x2="200" y2="200" />
      </g>

      {/* query nodes (constellation) */}
      <g>
        <g fill="#14e0c8">
          <circle cx="64" cy="120" r="6" />
          <circle cx="330" cy="98" r="5" />
          <circle cx="350" cy="220" r="6.5" />
          <circle cx="90" cy="300" r="5.5" />
          <circle cx="280" cy="320" r="6" />
          <circle cx="50" cy="210" r="4.5" />
        </g>
        {/* node rings */}
        <g fill="none" stroke="#c8f02e" strokeWidth="1" opacity="0.5">
          <circle cx="64" cy="120" r="11" />
          <circle cx="350" cy="220" r="12" />
          <circle cx="280" cy="320" r="11" />
        </g>
      </g>

      {/* secondary scattered stars */}
      <g fill="#2e66ff">
        <circle cx="150" cy="70" r="2" />
        <circle cx="320" cy="170" r="2.4" />
        <circle cx="120" cy="350" r="2" />
        <circle cx="360" cy="300" r="1.8" />
        <circle cx="40" cy="160" r="1.8" />
      </g>

      {/* travelling citation pulses */}
      <g fill="#c8f02e">
        <circle r="3">
          <animateMotion path="M64 120 L200 200" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="3">
          <animateMotion path="M350 220 L200 200" dur="3.6s" repeatCount="indefinite" />
        </circle>
        <circle r="2.5">
          <animateMotion path="M280 320 L200 200" dur="4.2s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* core "cité par l'IA" */}
      <circle cx="200" cy="200" r="46" fill="url(#seogeo-core)" />
      <circle cx="200" cy="200" r="20" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="20;26;20" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0.2;0.9" dur="3s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="200" r="9" fill="#c8f02e" />
    </svg>
  );
}

export default SeoGeo;
