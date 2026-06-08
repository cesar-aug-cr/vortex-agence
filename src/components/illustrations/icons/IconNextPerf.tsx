export function IconNextPerf({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="nextperf-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.55" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="nextperf-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.5" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="nextperf-bolt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="nextperf-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="58" r="46" fill="url(#nextperf-glow)" opacity="0.3" />

      {/* gauge track */}
      <path d="M24 76 A38 38 0 0 1 96 76" fill="none" stroke="#14e0c8" strokeWidth="6" strokeLinecap="round" opacity="0.18" />
      {/* gauge fill */}
      <path d="M24 76 A38 38 0 0 1 96 76" fill="none" stroke="url(#nextperf-arc)" strokeWidth="6" strokeLinecap="round" strokeDasharray="120 200" strokeDashoffset="120">
        <animate attributeName="strokeDashoffset" values="120;14;120" dur="5s" repeatCount="indefinite" />
      </path>

      {/* needle */}
      <g transform="translate(60,76)">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-72;58;-72" dur="5s" repeatCount="indefinite" />
          <line x1="0" y1="0" x2="0" y2="-30" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" />
        </g>
        <circle r="4" fill="#0a0a0b" stroke="#c8f02e" strokeWidth="1.5" />
      </g>

      {/* lightning bolt */}
      <path d="M62 30 L52 50 L60 50 L56 66 L72 44 L63 44 L70 30 Z" fill="url(#nextperf-bolt)" opacity="0.95">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite" />
      </path>

      {/* rising frame-rate bars */}
      <g fill="url(#nextperf-bar)">
        <rect x="30" y="88" width="6" height="10" rx="1.5">
          <animate attributeName="height" values="6;10;6" dur="3s" repeatCount="indefinite" />
          <animate attributeName="y" values="92;88;92" dur="3s" repeatCount="indefinite" />
        </rect>
        <rect x="40" y="84" width="6" height="14" rx="1.5">
          <animate attributeName="height" values="10;14;10" dur="3s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="y" values="88;84;88" dur="3s" begin="0.3s" repeatCount="indefinite" />
        </rect>
        <rect x="50" y="80" width="6" height="18" rx="1.5">
          <animate attributeName="height" values="13;18;13" dur="3s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" values="85;80;85" dur="3s" begin="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="60" y="76" width="6" height="22" rx="1.5" fill="#c8f02e">
          <animate attributeName="height" values="16;22;16" dur="3s" begin="0.9s" repeatCount="indefinite" />
          <animate attributeName="y" values="82;76;82" dur="3s" begin="0.9s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
}

export default IconNextPerf;
