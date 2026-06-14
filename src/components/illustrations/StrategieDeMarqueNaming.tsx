export function StrategieDeMarqueNaming({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="stratnaming-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#22d38c" stopOpacity="0.6" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="stratnaming-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="stratnaming-needle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="stratnaming-axis" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.1" />
          <stop offset="0.5" stopColor="#14e0c8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="stratnaming-word" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="stratnaming-tag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <filter id="stratnaming-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* glow */}
      <circle cx="200" cy="186" r="100" fill="url(#stratnaming-glow)" filter="url(#stratnaming-blur)" opacity="0.4" />

      {/* POSITIONING MAP — two axes */}
      <g>
        <line x1="64" y1="186" x2="336" y2="186" stroke="url(#stratnaming-axis)" strokeWidth="1.6" />
        <line x1="200" y1="50" x2="200" y2="322" stroke="url(#stratnaming-axis)" strokeWidth="1.6" />
        {/* axis arrow ticks */}
        <g stroke="#14e0c8" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.6">
          <path d="M330 181 l6 5 l-6 5" />
          <path d="M195 56 l5 -6 l5 6" />
        </g>
        {/* quadrant guide dots */}
        <g fill="#b9bcb2" opacity="0.3">
          <circle cx="132" cy="118" r="1.6" />
          <circle cx="268" cy="118" r="1.6" />
          <circle cx="132" cy="254" r="1.6" />
          <circle cx="268" cy="254" r="1.6" />
        </g>
        {/* positioning sample points */}
        <circle cx="262" cy="128" r="4" fill="#2e66ff" opacity="0.6" />
        <circle cx="146" cy="232" r="3.4" fill="#14e0c8" opacity="0.5" />
        <circle cx="150" cy="132" r="3" fill="#22d38c" opacity="0.5" />
      </g>

      {/* COMPASS dial */}
      <g>
        <circle cx="200" cy="186" r="74" fill="#0a0a0b" opacity="0.2" />
        <circle cx="200" cy="186" r="74" fill="none" stroke="#14e0c8" strokeWidth="1.4" strokeOpacity="0.55" />
        <circle cx="200" cy="186" r="60" fill="none" stroke="#2e66ff" strokeWidth="1" strokeOpacity="0.4" strokeDasharray="3 6" />
        {/* compass tick marks ring — rotating slowly */}
        <g stroke="#14e0c8" strokeWidth="1.4" opacity="0.5">
          <animateTransform attributeName="transform" type="rotate" from="0 200 186" to="360 200 186" dur="40s" repeatCount="indefinite" />
          <line x1="200" y1="112" x2="200" y2="122" />
          <line x1="200" y1="250" x2="200" y2="260" />
          <line x1="126" y1="186" x2="136" y2="186" />
          <line x1="264" y1="186" x2="274" y2="186" />
          <line x1="148" y1="134" x2="155" y2="141" />
          <line x1="252" y1="134" x2="245" y2="141" />
          <line x1="148" y1="238" x2="155" y2="231" />
          <line x1="252" y1="238" x2="245" y2="231" />
        </g>
      </g>

      {/* stabilizing NEEDLE — settles toward north with a damped wobble */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-34 200 186;26 200 186;-14 200 186;8 200 186;-2 200 186;0 200 186" keyTimes="0;0.25;0.5;0.7;0.88;1" dur="4.5s" fill="freeze" />
        <path d="M200 122 L210 186 L200 196 L190 186 Z" fill="url(#stratnaming-needle)" />
        <path d="M200 250 L210 186 L200 176 L190 186 Z" fill="#b9bcb2" opacity="0.4" />
      </g>
      {/* compass core */}
      <circle cx="200" cy="186" r="22" fill="url(#stratnaming-core)" />
      <circle cx="200" cy="186" r="13" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="13;18;13" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="186" r="4.5" fill="#c8f02e" />

      {/* orbiting VALUE TAGS */}
      <g fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700">
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 200 186" to="360 200 186" dur="22s" repeatCount="indefinite" />
          <g transform="translate(270 120)">
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur="22s" repeatCount="indefinite" additive="sum" />
            <rect x="-26" y="-11" width="52" height="22" rx="11" fill="#0a0a0b" opacity="0.4" stroke="url(#stratnaming-tag)" strokeWidth="1.2" />
            <text x="0" y="3.5" textAnchor="middle" fill="#14e0c8">TRUST</text>
          </g>
        </g>
        <g>
          <animateTransform attributeName="transform" type="rotate" from="120 200 186" to="480 200 186" dur="26s" repeatCount="indefinite" />
          <g transform="translate(286 186)">
            <animateTransform attributeName="transform" type="rotate" from="-120 0 0" to="-480 0 0" dur="26s" repeatCount="indefinite" additive="sum" />
            <rect x="-26" y="-11" width="52" height="22" rx="11" fill="#0a0a0b" opacity="0.4" stroke="url(#stratnaming-tag)" strokeWidth="1.2" />
            <text x="0" y="3.5" textAnchor="middle" fill="#c8f02e">BOLD</text>
          </g>
        </g>
        <g>
          <animateTransform attributeName="transform" type="rotate" from="240 200 186" to="600 200 186" dur="30s" repeatCount="indefinite" />
          <g transform="translate(128 246)">
            <animateTransform attributeName="transform" type="rotate" from="-240 0 0" to="-600 0 0" dur="30s" repeatCount="indefinite" additive="sum" />
            <rect x="-30" y="-11" width="60" height="22" rx="11" fill="#0a0a0b" opacity="0.4" stroke="url(#stratnaming-tag)" strokeWidth="1.2" />
            <text x="0" y="3.5" textAnchor="middle" fill="#22d38c">MODERN</text>
          </g>
        </g>
      </g>

      {/* BRAND NAME letters arranging into place (bottom) */}
      <g fontFamily="Inter Tight, sans-serif" fontSize="34" fontWeight="800" fill="url(#stratnaming-word)" textAnchor="middle">
        <text x="160" y="346">
          V
          <animate attributeName="opacity" values="0;1" dur="0.6s" begin="0.4s" fill="freeze" />
        </text>
        <text x="184" y="346">
          o
          <animate attributeName="opacity" values="0;1" dur="0.6s" begin="0.7s" fill="freeze" />
        </text>
        <text x="208" y="346">
          r
          <animate attributeName="opacity" values="0;1" dur="0.6s" begin="1s" fill="freeze" />
        </text>
        <text x="226" y="346">
          T
          <animate attributeName="opacity" values="0;1" dur="0.6s" begin="1.3s" fill="freeze" />
        </text>
        <text x="246" y="346">
          X
          <animate attributeName="opacity" values="0;1" dur="0.6s" begin="1.6s" fill="freeze" />
        </text>
      </g>
      {/* underline accent under the name */}
      <line x1="148" y1="356" x2="258" y2="356" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round">
        <animate attributeName="stroke-dasharray" values="0 120;120 0" dur="1s" begin="1.8s" fill="freeze" />
      </line>
    </svg>
  );
}

export default StrategieDeMarqueNaming;
