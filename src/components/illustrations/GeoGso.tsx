export function GeoGso({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="geogso-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="geogso-halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.75" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="geogso-orbit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="geogso-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="geogso-bubble" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.16" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="geogso-cite" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <filter id="geogso-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* central glow */}
      <circle cx="200" cy="200" r="120" fill="url(#geogso-halo)" filter="url(#geogso-blur)" opacity="0.4" />

      {/* orbit rings */}
      <g fill="none" stroke="url(#geogso-orbit)" strokeWidth="1.2">
        <ellipse cx="200" cy="200" rx="150" ry="58" opacity="0.45">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="42s" repeatCount="indefinite" />
        </ellipse>
        <ellipse cx="200" cy="200" rx="150" ry="58" opacity="0.35" transform="rotate(72 200 200)" />
        <circle cx="200" cy="200" r="118" opacity="0.25" strokeDasharray="2 7" />
      </g>

      {/* source documents around the LLM core */}
      <g>
        {/* doc connection lines into the LLM node */}
        <g stroke="url(#geogso-flow)" strokeWidth="1.5" fill="none" opacity="0.85">
          <line x1="74" y1="96" x2="200" y2="200" />
          <line x1="58" y1="240" x2="200" y2="200" />
          <line x1="330" y1="92" x2="200" y2="200" />
          <line x1="346" y1="250" x2="200" y2="200" />
        </g>

        {/* document glyphs */}
        <g>
          {[
            { x: 60, y: 76 },
            { x: 44, y: 220 },
            { x: 316, y: 72 },
            { x: 332, y: 230 },
          ].map((d, i) => (
            <g key={i} transform={`translate(${d.x} ${d.y})`}>
              <rect x="0" y="0" width="30" height="38" rx="4" fill="#0a0a0b" opacity="0.5" />
              <rect x="0" y="0" width="30" height="38" rx="4" fill="none" stroke="#14e0c8" strokeWidth="1.3" opacity="0.8" />
              <line x1="6" y1="9" x2="24" y2="9" stroke="#22d38c" strokeWidth="1.6" opacity="0.7" />
              <line x1="6" y1="16" x2="24" y2="16" stroke="#22d38c" strokeWidth="1.6" opacity="0.5" />
              <line x1="6" y1="23" x2="20" y2="23" stroke="#22d38c" strokeWidth="1.6" opacity="0.35" />
            </g>
          ))}
        </g>
      </g>

      {/* travelling dots flowing from documents into the LLM core */}
      <g fill="#c8f02e">
        <circle r="3">
          <animateMotion path="M74 96 L200 200" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="2.6">
          <animateMotion path="M346 250 L200 200" dur="3.6s" repeatCount="indefinite" />
        </circle>
        <circle r="2.4" fill="#14e0c8">
          <animateMotion path="M58 240 L200 200" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle r="2.6">
          <animateMotion path="M330 92 L200 200" dur="3.3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* scattered stars */}
      <g fill="#2e66ff">
        <circle cx="150" cy="58" r="2.2" />
        <circle cx="200" cy="350" r="2.4" />
        <circle cx="116" cy="330" r="1.8" />
        <circle cx="296" cy="330" r="1.8" />
      </g>

      {/* LLM core node */}
      <circle cx="200" cy="200" r="46" fill="url(#geogso-core)" />
      <circle cx="200" cy="200" r="26" fill="#0a0a0b" opacity="0.55" />
      <circle cx="200" cy="200" r="26" fill="none" stroke="#c8f02e" strokeWidth="1.6" opacity="0.5">
        <animate attributeName="r" values="26;33;26" dur="3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="200" y="204.5" fontSize="13" fontFamily="monospace" fontWeight="700" fill="#c8f02e" textAnchor="middle">LLM</text>

      {/* AI answer bubble that quotes the cited source */}
      <g transform="translate(196 250)">
        <path
          d="M16 0 L140 0 A14 14 0 0 1 154 14 L154 56 A14 14 0 0 1 140 70 L40 70 L24 88 L26 70 L16 70 A14 14 0 0 1 2 56 L2 14 A14 14 0 0 1 16 0 Z"
          fill="url(#geogso-bubble)"
          stroke="#14e0c8"
          strokeWidth="1.4"
        >
          <animate attributeName="opacity" values="0.7;1;0.7" dur="3.4s" repeatCount="indefinite" />
        </path>
        {/* opening quotation mark */}
        <text x="14" y="34" fontSize="30" fontFamily="serif" fontWeight="700" fill="#c8f02e" opacity="0.85">&#8220;</text>
        {/* quoted answer lines */}
        <line x1="40" y1="20" x2="138" y2="20" stroke="#22d38c" strokeWidth="2.4" opacity="0.75" strokeLinecap="round" />
        <line x1="40" y1="30" x2="120" y2="30" stroke="#22d38c" strokeWidth="2.4" opacity="0.5" strokeLinecap="round" />
        {/* highlighted citation chip linking back to your site */}
        <g transform="translate(40 44)">
          <rect x="0" y="0" width="58" height="16" rx="8" fill="url(#geogso-cite)" />
          <text x="29" y="11.5" fontSize="8" fontFamily="monospace" fontWeight="700" fill="#0a0a0b" textAnchor="middle">vortx.lu</text>
        </g>
        {/* link node pointing to the source */}
        <g transform="translate(110 52)">
          <circle r="7" fill="none" stroke="#c8f02e" strokeWidth="1.6" />
          <path d="M-3 0 A3 3 0 0 1 0 -3 M0 3 A3 3 0 0 1 3 0" fill="none" stroke="#c8f02e" strokeWidth="1.6" strokeLinecap="round" transform="rotate(45)" />
          <circle r="11" fill="none" stroke="#c8f02e" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="11;15;11" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.8s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>
    </svg>
  );
}

export default GeoGso;
