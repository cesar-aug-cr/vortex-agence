export function IconAnalytics({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="anlx-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="anlx-line" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.55" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="anlx-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <radialGradient id="anlx-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#anlx-glow)" opacity="0.28" />

      {/* dashboard frame */}
      <rect x="16" y="20" width="88" height="64" rx="8" fill="none" stroke="url(#anlx-frame)" strokeWidth="1.6" />
      <line x1="16" y1="30" x2="104" y2="30" stroke="url(#anlx-frame)" strokeWidth="1" opacity="0.6" />

      {/* line chart area */}
      <path d="M22 64 L34 56 L44 60 L56 44 L68 50 L80 36 L98 30 L98 64 L22 64 Z" fill="url(#anlx-line)" opacity="0.12" />
      <path d="M22 64 L34 56 L44 60 L56 44 L68 50 L80 36 L98 30" fill="none" stroke="url(#anlx-line)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="120 120" strokeDashoffset="120">
        <animate attributeName="strokeDashoffset" values="120;0" dur="3.2s" repeatCount="indefinite" />
      </path>
      <circle cx="80" cy="36" r="3" fill="#c8f02e">
        <animate attributeName="r" values="3;4.5;3" dur="2.6s" repeatCount="indefinite" />
      </circle>

      {/* mini bars */}
      <g fill="url(#anlx-bar)">
        <rect x="24" y="72" width="5" height="6" rx="1.5">
          <animate attributeName="height" values="4;6;4" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y" values="74;72;74" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="32" y="69" width="5" height="9" rx="1.5">
          <animate attributeName="height" values="6;9;6" dur="3s" begin="0.4s" repeatCount="indefinite" />
          <animate attributeName="y" values="72;69;72" dur="3s" begin="0.4s" repeatCount="indefinite" />
        </rect>
        <rect x="40" y="66" width="5" height="12" rx="1.5">
          <animate attributeName="height" values="8;12;8" dur="3s" begin="0.8s" repeatCount="indefinite" />
          <animate attributeName="y" values="70;66;70" dur="3s" begin="0.8s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* KPI ring */}
      <g transform="translate(80,72)">
        <circle r="14" fill="none" stroke="#14e0c8" strokeWidth="3" opacity="0.18" />
        <circle r="14" fill="none" stroke="url(#anlx-line)" strokeWidth="3" strokeLinecap="round"
          strokeDasharray="88 88" strokeDashoffset="30" transform="rotate(-90)">
          <animate attributeName="strokeDashoffset" values="88;26;88" dur="4.5s" repeatCount="indefinite" />
        </circle>
        <circle r="6" fill="#c8f02e" opacity="0.18" />
        <path d="M-3 0 L-1 2.4 L3.5 -2.4" fill="none" stroke="#c8f02e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default IconAnalytics;
