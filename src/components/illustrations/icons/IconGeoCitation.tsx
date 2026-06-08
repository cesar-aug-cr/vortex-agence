export function IconGeoCitation({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="geocite-bubble" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="geocite-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <radialGradient id="geocite-node" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.25" />
        </radialGradient>
        <radialGradient id="geocite-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="56" r="46" fill="url(#geocite-glow)" opacity="0.28" />

      {/* AI answer bubble */}
      <path d="M22 22 H86 a8 8 0 0 1 8 8 V58 a8 8 0 0 1 -8 8 H44 l-10 12 v-12 H22 a8 8 0 0 1 -8 -8 V30 a8 8 0 0 1 8 -8 Z"
        fill="url(#geocite-bubble)" stroke="url(#geocite-edge)" strokeWidth="1.6" strokeLinejoin="round" />

      {/* big quotation marks */}
      <g fill="#c8f02e" opacity="0.9">
        <path d="M28 32 q-4 0 -4 5 q0 4 4 4 q3 0 3 3 q0 4 -5 4 v3 q9 0 9 -9 v-6 q0 -4 -7 -4 Z" />
        <path d="M44 32 q-4 0 -4 5 q0 4 4 4 q3 0 3 3 q0 4 -5 4 v3 q9 0 9 -9 v-6 q0 -4 -7 -4 Z" opacity="0.7" />
      </g>

      {/* answer text lines */}
      <g fill="#14e0c8" opacity="0.65">
        <rect x="56" y="32" width="30" height="3" rx="1.5" />
        <rect x="56" y="39" width="24" height="3" rx="1.5" opacity="0.7" />
        <rect x="24" y="50" width="56" height="3" rx="1.5" opacity="0.55" />
      </g>

      {/* cited source link line */}
      <path d="M60 70 Q70 86 88 90" fill="none" stroke="url(#geocite-edge)" strokeWidth="1.6" strokeDasharray="3 4" strokeLinecap="round">
        <animate attributeName="strokeDashoffset" values="14;0" dur="2.4s" repeatCount="indefinite" />
      </path>

      {/* cited source node */}
      <g transform="translate(92,94)">
        <circle r="12" fill="url(#geocite-node)">
          <animate attributeName="r" values="11;13;11" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* link / chain glyph */}
        <g stroke="#0a0a0b" strokeWidth="1.6" fill="none" strokeLinecap="round">
          <path d="M-4 0 a3 3 0 0 1 3 -3 h2" />
          <path d="M4 0 a3 3 0 0 1 -3 3 h-2" />
          <line x1="-2" y1="0" x2="2" y2="0" />
        </g>
        <circle r="15.5" fill="none" stroke="#c8f02e" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" values="15.5;18;15.5" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default IconGeoCitation;
