export function IconNurturing({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nurture-gauge" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="nurture-stem" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="nurture-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="nurture-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#nurture-glow)" opacity="0.22" />

      {/* score gauge (left) */}
      <g transform="translate(44,56)">
        <circle r="26" fill="none" stroke="#b9bcb2" strokeWidth="5" strokeOpacity="0.3" />
        {/* filling arc: circumference ~163 */}
        <circle r="26" fill="none" stroke="url(#nurture-gauge)" strokeWidth="5" strokeLinecap="round" strokeDasharray="163" strokeDashoffset="163" transform="rotate(-90)">
          <animate attributeName="strokeDashoffset" values="163;33;33" keyTimes="0;0.7;1" dur="4s" repeatCount="indefinite" />
        </circle>
        {/* score core */}
        <circle r="9" fill="url(#nurture-core)">
          <animate attributeName="r" values="8;10;8" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <path d="M-3.5 0 L-3.5 -4 M-3.5 0 L0 0 M0 0 L0 -4 M0 0 L3.5 -4 L3.5 0" fill="none" stroke="#0a0a0b" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* seed germinating into sprout (right) */}
      <g transform="translate(86,84)">
        {/* soil line */}
        <line x1="-14" y1="6" x2="14" y2="6" stroke="#b9bcb2" strokeWidth="1.6" strokeOpacity="0.5" strokeLinecap="round" />
        {/* stem growing */}
        <path d="M0 6 L0 -16" fill="none" stroke="url(#nurture-stem)" strokeWidth="2.4" strokeLinecap="round" strokeDasharray="24" strokeDashoffset="24">
          <animate attributeName="strokeDashoffset" values="24;24;0;0" keyTimes="0;0.25;0.6;1" dur="4s" repeatCount="indefinite" />
        </path>
        {/* leaves */}
        <path d="M0 -6 Q-9 -8 -10 -16 Q-2 -15 0 -6 Z" fill="url(#nurture-core)">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.55;0.72;1" dur="4s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="scale" values="0.2;0.2;1;1" keyTimes="0;0.55;0.72;1" dur="4s" additive="sum" repeatCount="indefinite" />
        </path>
        <path d="M0 -10 Q9 -12 10 -20 Q2 -19 0 -10 Z" fill="#22d38c">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.65;0.82;1" dur="4s" repeatCount="indefinite" />
        </path>
        {/* sprout bud sparkle */}
        <circle cx="0" cy="-18" r="0" fill="#c8f02e">
          <animate attributeName="r" values="0;0;2.4;1.4;2.4" keyTimes="0;0.8;0.88;0.94;1" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default IconNurturing;
