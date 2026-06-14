export function IconChatbot({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="chatbot-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="chatbot-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.22" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id="chatbot-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="44" fill="url(#chatbot-glow)" opacity="0.28" />

      {/* incoming bubble (top-left) */}
      <g>
        <path d="M24 32 H66 a6 6 0 0 1 6 6 V58 a6 6 0 0 1 -6 6 H40 L30 73 V64 H24 a6 6 0 0 1 -6 -6 V38 a6 6 0 0 1 6 -6 Z"
          fill="url(#chatbot-fill)" stroke="url(#chatbot-frame)" strokeWidth="1.8" strokeLinejoin="round">
          <animate attributeName="opacity" values="0.55;1;0.55" dur="4s" repeatCount="indefinite" />
        </path>
        <g fill="#c8f02e">
          <circle cx="34" cy="48" r="2.4">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="45" cy="48" r="2.4">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin="0.35s" repeatCount="indefinite" />
          </circle>
          <circle cx="56" cy="48" r="2.4">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin="0.7s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* reply bubble (bottom-right) morphing into voice waveform */}
      <g>
        <path d="M54 60 H96 a6 6 0 0 1 6 6 V86 a6 6 0 0 1 -6 6 H72 L62 101 V92 H54 a6 6 0 0 1 -6 -6 V66 a6 6 0 0 1 6 -6 Z"
          fill="url(#chatbot-fill)" stroke="url(#chatbot-frame)" strokeWidth="1.8" strokeLinejoin="round">
          <animate attributeName="opacity" values="1;0.55;1" dur="4s" repeatCount="indefinite" />
        </path>
        {/* voice waveform bars */}
        <g stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round">
          <line x1="60" y1="76" x2="60" y2="76">
            <animate attributeName="y1" values="76;70;76" dur="1.1s" repeatCount="indefinite" />
            <animate attributeName="y2" values="76;82;76" dur="1.1s" repeatCount="indefinite" />
          </line>
          <line x1="68" y1="76" x2="68" y2="76">
            <animate attributeName="y1" values="76;66;76" dur="1.1s" begin="0.2s" repeatCount="indefinite" />
            <animate attributeName="y2" values="76;86;76" dur="1.1s" begin="0.2s" repeatCount="indefinite" />
          </line>
          <line x1="76" y1="76" x2="76" y2="76" stroke="#14e0c8">
            <animate attributeName="y1" values="76;62;76" dur="1.1s" begin="0.1s" repeatCount="indefinite" />
            <animate attributeName="y2" values="76;90;76" dur="1.1s" begin="0.1s" repeatCount="indefinite" />
          </line>
          <line x1="84" y1="76" x2="84" y2="76">
            <animate attributeName="y1" values="76;66;76" dur="1.1s" begin="0.3s" repeatCount="indefinite" />
            <animate attributeName="y2" values="76;86;76" dur="1.1s" begin="0.3s" repeatCount="indefinite" />
          </line>
          <line x1="92" y1="76" x2="92" y2="76">
            <animate attributeName="y1" values="76;70;76" dur="1.1s" begin="0.45s" repeatCount="indefinite" />
            <animate attributeName="y2" values="76;82;76" dur="1.1s" begin="0.45s" repeatCount="indefinite" />
          </line>
        </g>
      </g>
    </svg>
  );
}

export default IconChatbot;
