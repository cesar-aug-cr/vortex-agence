export function IconStrategy({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="strategy-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="strategy-needle" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="strategy-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="52" r="44" fill="url(#strategy-glow)" opacity="0.28" />

      {/* compass ring */}
      <g stroke="url(#strategy-frame)" fill="none">
        <circle cx="60" cy="50" r="30" strokeWidth="2" />
        <circle cx="60" cy="50" r="24" strokeWidth="0.9" opacity="0.5" strokeDasharray="2 4" />
      </g>

      {/* tick marks N E S W */}
      <g stroke="#b9bcb2" strokeWidth="1.4" opacity="0.7">
        <line x1="60" y1="22" x2="60" y2="27" />
        <line x1="60" y1="73" x2="60" y2="78" />
        <line x1="32" y1="50" x2="37" y2="50" />
        <line x1="83" y1="50" x2="88" y2="50" />
      </g>

      {/* stabilizing needle */}
      <g transform="translate(60,50)">
        <animateTransform attributeName="transform" type="rotate" values="-40;28;-14;6;0;0" keyTimes="0;0.25;0.5;0.7;0.85;1" dur="5s" repeatCount="indefinite" additive="sum" />
        <path d="M0 -22 L6 0 L0 4 L-6 0 Z" fill="url(#strategy-needle)" />
        <path d="M0 22 L6 0 L0 -4 L-6 0 Z" fill="#2e66ff" opacity="0.7" />
      </g>
      <circle cx="60" cy="50" r="3.4" fill="#0a0a0b" stroke="#c8f02e" strokeWidth="1.4" />

      {/* letters arranging into a name beneath */}
      <g fill="url(#strategy-frame)">
        <rect x="38" y="92" width="8" height="9" rx="1.5">
          <animate attributeName="y" values="98;92;92" keyTimes="0;0.4;1" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.4;1" dur="5s" repeatCount="indefinite" />
        </rect>
        <rect x="48" y="92" width="8" height="9" rx="1.5">
          <animate attributeName="y" values="98;92;92" keyTimes="0;0.55;1" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.55;1" dur="5s" repeatCount="indefinite" />
        </rect>
        <rect x="58" y="92" width="8" height="9" rx="1.5">
          <animate attributeName="y" values="98;92;92" keyTimes="0;0.7;1" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.7;1" dur="5s" repeatCount="indefinite" />
        </rect>
        <rect x="68" y="92" width="8" height="9" rx="1.5" fill="#c8f02e">
          <animate attributeName="y" values="98;92;92" keyTimes="0;0.85;1" dur="5s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.85;1" dur="5s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
}

export default IconStrategy;
