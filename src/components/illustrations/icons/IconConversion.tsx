export function IconConversion({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="conv-funnel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#22d38c" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="conv-edge" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <radialGradient id="conv-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="conv-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#conv-glow)" opacity="0.28" />

      {/* funnel body */}
      <path d="M26 28 L94 28 L66 66 L66 88 L54 94 L54 66 Z" fill="url(#conv-funnel)" stroke="url(#conv-edge)" strokeWidth="1.6" strokeLinejoin="round" />

      {/* incoming visitor dots */}
      <g fill="#14e0c8">
        <circle cx="38" cy="20" r="2.6">
          <animate attributeName="cy" values="20;38;52;66" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cx" values="38;46;54;60" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0.5;0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="16" r="2.6" fill="#c8f02e">
          <animate attributeName="cy" values="16;36;54;66" dur="3s" begin="0.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0.5;0" dur="3s" begin="0.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="82" cy="20" r="2.6">
          <animate attributeName="cy" values="20;38;52;66" dur="3s" begin="1.4s" repeatCount="indefinite" />
          <animate attributeName="cx" values="82;74;66;60" dur="3s" begin="1.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0.5;0" dur="3s" begin="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" cy="18" r="2" opacity="0.6">
          <animate attributeName="cy" values="18;40;58;66" dur="3s" begin="2.1s" repeatCount="indefinite" />
          <animate attributeName="cx" values="50;54;58;60" dur="3s" begin="2.1s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0.7;0.4;0" dur="3s" begin="2.1s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* converted client at the bottom */}
      <g transform="translate(60,98)">
        <circle r="13" fill="url(#conv-core)">
          <animate attributeName="r" values="12;14;12" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <path d="M-5 0 L-1.5 4 L5.5 -4" fill="none" stroke="#0a0a0b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export default IconConversion;
