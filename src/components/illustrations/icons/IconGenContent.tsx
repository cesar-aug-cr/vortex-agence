export function IconGenContent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gen-content-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="gen-content-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.18" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gen-content-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="gen-content-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="44" fill="url(#gen-content-glow)" opacity="0.28" />

      {/* content card */}
      <rect x="26" y="28" width="68" height="64" rx="6" fill="url(#gen-content-card)" stroke="url(#gen-content-frame)" strokeWidth="1.8" />

      {/* lines of text materializing */}
      <g>
        <rect x="34" y="40" width="40" height="4" rx="2" fill="url(#gen-content-line)">
          <animate attributeName="width" values="0;40" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="34" y="50" width="48" height="3" rx="1.5" fill="#b9bcb2" opacity="0.7">
          <animate attributeName="width" values="0;48" dur="4s" begin="0.8s" repeatCount="indefinite" />
        </rect>
        <rect x="34" y="58" width="44" height="3" rx="1.5" fill="#b9bcb2" opacity="0.6">
          <animate attributeName="width" values="0;44" dur="4s" begin="1.5s" repeatCount="indefinite" />
        </rect>
        <rect x="34" y="66" width="30" height="3" rx="1.5" fill="#b9bcb2" opacity="0.5">
          <animate attributeName="width" values="0;30" dur="4s" begin="2.2s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* tracing pen/cursor moving along the writing line */}
      <g>
        <g stroke="url(#gen-content-frame)" strokeWidth="2" fill="#0a0a0b" strokeLinejoin="round">
          <path d="M0 0 L10 4 L4 6 L2 14 Z" transform="translate(70,72)">
            <animateMotion path="M0 0 L4 -32 M4 -32 L8 -22 M8 -22 L12 -14" dur="4s" repeatCount="indefinite" rotate="auto" />
          </path>
        </g>
      </g>

      {/* AI sparkles cascading */}
      <g fill="#c8f02e">
        <path d="M86 24 l1.6 4 4 1.6 -4 1.6 -1.6 4 -1.6 -4 -4 -1.6 4 -1.6 Z">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.6s" repeatCount="indefinite" />
        </path>
        <path d="M98 40 l1.2 3 3 1.2 -3 1.2 -1.2 3 -1.2 -3 -3 -1.2 3 -1.2 Z" opacity="0.8">
          <animate attributeName="opacity" values="1;0.2;1" dur="2.6s" begin="0.6s" repeatCount="indefinite" />
        </path>
        <path d="M92 56 l0.9 2.2 2.2 0.9 -2.2 0.9 -0.9 2.2 -0.9 -2.2 -2.2 -0.9 2.2 -0.9 Z">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" begin="1.2s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

export default IconGenContent;
