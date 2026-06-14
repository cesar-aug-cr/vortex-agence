export function IconPrint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="print-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="print-sheet" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.2" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.05" />
        </linearGradient>
        <radialGradient id="print-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="44" fill="url(#print-glow)" opacity="0.28" />

      {/* brochure unfolding in perspective (back panels) */}
      <g stroke="url(#print-frame)" strokeWidth="1.6" fill="url(#print-sheet)" strokeLinejoin="round">
        <path d="M30 30 L58 24 L58 70 L30 76 Z" opacity="0.55" />
        <path d="M58 24 L86 30 L86 76 L58 70 Z" />
      </g>
      <g stroke="#b9bcb2" strokeWidth="1" opacity="0.5">
        <line x1="63" y1="36" x2="80" y2="40" />
        <line x1="63" y1="44" x2="80" y2="48" />
        <line x1="63" y1="52" x2="74" y2="55" />
      </g>

      {/* business card in front cascade */}
      <g transform="translate(36,62)">
        <rect x="0" y="0" width="42" height="26" rx="3" fill="url(#print-sheet)" stroke="url(#print-frame)" strokeWidth="1.6">
          <animateTransform attributeName="transform" type="translate" values="0 4;0 0;0 4" dur="5s" repeatCount="indefinite" />
        </rect>
        <circle cx="9" cy="9" r="4" fill="none" stroke="#c8f02e" strokeWidth="1.6" />
        <circle cx="9" cy="9" r="1.5" fill="#c8f02e" />
        <rect x="17" y="6" width="20" height="2.4" rx="1.2" fill="#b9bcb2" opacity="0.7" />
        <rect x="17" y="11" width="14" height="2.4" rx="1.2" fill="#b9bcb2" opacity="0.45" />
        <rect x="6" y="19" width="30" height="2" rx="1" fill="url(#print-frame)" opacity="0.6" />
      </g>

      {/* CMYK ink dots depositing */}
      <g>
        <circle cx="44" cy="22" r="0" fill="#14e0c8">
          <animate attributeName="r" values="0;3;0" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="22;30;22" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="54" cy="20" r="0" fill="#2e66ff">
          <animate attributeName="r" values="0;3;0" dur="3s" begin="0.7s" repeatCount="indefinite" />
          <animate attributeName="cy" values="20;28;20" dur="3s" begin="0.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="64" cy="20" r="0" fill="#c8f02e">
          <animate attributeName="r" values="0;3;0" dur="3s" begin="1.4s" repeatCount="indefinite" />
          <animate attributeName="cy" values="20;28;20" dur="3s" begin="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="74" cy="22" r="0" fill="#22d38c">
          <animate attributeName="r" values="0;3;0" dur="3s" begin="2.1s" repeatCount="indefinite" />
          <animate attributeName="cy" values="22;30;22" dur="3s" begin="2.1s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default IconPrint;
