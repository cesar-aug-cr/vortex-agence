export function PackAnalytics({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pkan-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="pkan-trend" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="pkan-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.35" />
          <stop offset="0.6" stopColor="#14e0c8" stopOpacity="0.85" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <linearGradient id="pkan-barLime" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#22d38c" stopOpacity="0.5" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="pkan-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a0a0b" stopOpacity="0.92" />
          <stop offset="1" stopColor="#0a0a0b" stopOpacity="0.6" />
        </linearGradient>
        <radialGradient id="pkan-gauge" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.22" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.04" />
        </radialGradient>
        <radialGradient id="pkan-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <clipPath id="pkan-clip">
          <rect x="18" y="24" width="84" height="60" rx="9" />
        </clipPath>
      </defs>

      {/* soft radial backdrop */}
      <circle cx="60" cy="60" r="46" fill="url(#pkan-glow)" opacity="0.28" />

      {/* dashboard panel */}
      <rect x="18" y="24" width="84" height="60" rx="9" fill="url(#pkan-panel)" stroke="url(#pkan-frame)" strokeWidth="1.6" />
      <line x1="18" y1="34" x2="102" y2="34" stroke="url(#pkan-frame)" strokeWidth="1" opacity="0.5" />

      {/* title-bar window dots */}
      <circle cx="25" cy="29" r="1.5" fill="#22d38c" />
      <circle cx="30.5" cy="29" r="1.5" fill="#14e0c8" />
      <circle cx="36" cy="29" r="1.5" fill="#c8f02e" />

      {/* baseline gridlines inside panel */}
      <g stroke="#14e0c8" strokeWidth="0.6" opacity="0.16">
        <line x1="22" y1="48" x2="74" y2="48" />
        <line x1="22" y1="58" x2="74" y2="58" />
        <line x1="22" y1="68" x2="74" y2="68" />
      </g>

      {/* rising bar chart */}
      <g clipPath="url(#pkan-clip)">
        <rect x="24" y="64" width="6" height="14" rx="2" fill="url(#pkan-bar)">
          <animate attributeName="height" values="9;14;9" dur="3.6s" repeatCount="indefinite" />
          <animate attributeName="y" values="69;64;69" dur="3.6s" repeatCount="indefinite" />
        </rect>
        <rect x="34" y="58" width="6" height="20" rx="2" fill="url(#pkan-bar)">
          <animate attributeName="height" values="14;20;14" dur="3.6s" begin="0.45s" repeatCount="indefinite" />
          <animate attributeName="y" values="64;58;64" dur="3.6s" begin="0.45s" repeatCount="indefinite" />
        </rect>
        <rect x="44" y="52" width="6" height="26" rx="2" fill="url(#pkan-bar)">
          <animate attributeName="height" values="19;26;19" dur="3.6s" begin="0.9s" repeatCount="indefinite" />
          <animate attributeName="y" values="59;52;59" dur="3.6s" begin="0.9s" repeatCount="indefinite" />
        </rect>
        <rect x="54" y="46" width="6" height="32" rx="2" fill="url(#pkan-bar)">
          <animate attributeName="height" values="24;32;24" dur="3.6s" begin="1.35s" repeatCount="indefinite" />
          <animate attributeName="y" values="54;46;54" dur="3.6s" begin="1.35s" repeatCount="indefinite" />
        </rect>
        <rect x="64" y="40" width="6" height="38" rx="2" fill="url(#pkan-barLime)">
          <animate attributeName="height" values="29;38;29" dur="3.6s" begin="1.8s" repeatCount="indefinite" />
          <animate attributeName="y" values="49;40;49" dur="3.6s" begin="1.8s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* trend line overlay */}
      <path d="M24 62 L37 56 L47 50 L57 46 L67 40 L74 36" fill="none" stroke="url(#pkan-trend)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="78 78" strokeDashoffset="78">
        <animate attributeName="strokeDashoffset" values="78;0" dur="3.4s" repeatCount="indefinite" />
      </path>
      {/* moving data point on the trend */}
      <circle r="3.2" fill="#c8f02e">
        <animate attributeName="r" values="2.6;4;2.6" dur="2.6s" repeatCount="indefinite" />
        <animateMotion path="M24 62 L37 56 L47 50 L57 46 L67 40 L74 36" dur="3.4s" repeatCount="indefinite" rotate="0" />
      </circle>
      <circle cx="74" cy="36" r="2" fill="#ffffff" opacity="0.9" />

      {/* donut / gauge */}
      <g transform="translate(89,64)">
        <circle r="14" fill="url(#pkan-gauge)" />
        <circle r="14" fill="none" stroke="#14e0c8" strokeWidth="3.2" opacity="0.16" />
        <circle r="14" fill="none" stroke="url(#pkan-trend)" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="88 88" strokeDashoffset="32" transform="rotate(-90)">
          <animate attributeName="strokeDashoffset" values="88;24;88" dur="4.6s" repeatCount="indefinite" />
        </circle>
        <circle r="5.5" fill="#c8f02e" opacity="0.16" />
        <path d="M-3 0 L-0.8 2.6 L3.4 -2.6" fill="none" stroke="#c8f02e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* KPI chip — value rising */}
      <g transform="translate(22,90)">
        <rect x="0" y="0" width="30" height="11" rx="5.5" fill="#0a0a0b" stroke="url(#pkan-frame)" strokeWidth="1.1" />
        <path d="M5 7 L8 4 L11.5 7.5" fill="none" stroke="#c8f02e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="15" y="4" width="11" height="3" rx="1.5" fill="url(#pkan-trend)">
          <animate attributeName="width" values="6;11;6" dur="3.8s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* KPI chip — gauge percent */}
      <g transform="translate(58,90)">
        <rect x="0" y="0" width="30" height="11" rx="5.5" fill="#0a0a0b" stroke="url(#pkan-frame)" strokeWidth="1.1" />
        <circle cx="6" cy="5.5" r="2.6" fill="none" stroke="#14e0c8" strokeWidth="1.5" />
        <rect x="12" y="4" width="13" height="3" rx="1.5" fill="#14e0c8" opacity="0.7" />
      </g>
    </svg>
  );
}

export default PackAnalytics;
