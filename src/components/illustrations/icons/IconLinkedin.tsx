export function IconLinkedin({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="linkedin-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="linkedin-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.22" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.06" />
        </linearGradient>
        <radialGradient id="linkedin-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="58" r="44" fill="url(#linkedin-glow)" opacity="0.28" />

      {/* network connectors */}
      <g stroke="url(#linkedin-frame)" strokeWidth="1.2" opacity="0.7">
        <line x1="60" y1="48" x2="30" y2="30" />
        <line x1="60" y1="48" x2="90" y2="30" />
        <line x1="60" y1="48" x2="28" y2="62" />
        <line x1="60" y1="48" x2="92" y2="62" />
      </g>

      {/* avatar nodes (circle head + shoulder arc) */}
      <g>
        {[
          { x: 30, y: 30, d: "0s" },
          { x: 90, y: 30, d: "0.8s" },
          { x: 28, y: 62, d: "1.6s" },
          { x: 92, y: 62, d: "2.4s" },
        ].map((n, i) => (
          <g key={i} transform={`translate(${n.x},${n.y})`}>
            <circle r="9" fill="url(#linkedin-fill)" stroke="url(#linkedin-frame)" strokeWidth="1.6">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" begin={n.d} repeatCount="indefinite" />
            </circle>
            <circle cy="-2.4" r="2.8" fill="#14e0c8" />
            <path d="M-4.4 4 a4.4 3.4 0 0 1 8.8 0" fill="#14e0c8" />
          </g>
        ))}
      </g>

      {/* central targeted node */}
      <g transform="translate(60,48)">
        <circle r="11" fill="url(#linkedin-fill)" stroke="url(#linkedin-frame)" strokeWidth="2" />
        <circle cy="-3" r="3.4" fill="#c8f02e" />
        <path d="M-5.4 5 a5.4 4 0 0 1 10.8 0" fill="#c8f02e" />
        {/* targeting reticle locking on */}
        <g stroke="#c8f02e" strokeWidth="1.5" fill="none">
          <circle r="16" strokeDasharray="6 6">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="9s" repeatCount="indefinite" />
            <animate attributeName="r" values="20;16;16" keyTimes="0;0.4;1" dur="4s" repeatCount="indefinite" />
          </circle>
          <line x1="-20" y1="0" x2="-15" y2="0" />
          <line x1="20" y1="0" x2="15" y2="0" />
          <line x1="0" y1="-20" x2="0" y2="-15" />
          <line x1="0" y1="20" x2="0" y2="15" />
        </g>
      </g>

      {/* rising pipeline/funnel bars beneath */}
      <g>
        <rect x="40" y="92" width="9" height="14" rx="1.5" fill="#2e66ff" opacity="0.6">
          <animate attributeName="height" values="2;14;2" dur="5s" begin="0s" repeatCount="indefinite" />
          <animate attributeName="y" values="104;92;104" dur="5s" begin="0s" repeatCount="indefinite" />
        </rect>
        <rect x="52" y="86" width="9" height="20" rx="1.5" fill="#22d38c">
          <animate attributeName="height" values="2;20;2" dur="5s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="y" values="104;86;104" dur="5s" begin="0.6s" repeatCount="indefinite" />
        </rect>
        <rect x="64" y="80" width="9" height="26" rx="1.5" fill="url(#linkedin-frame)">
          <animate attributeName="height" values="2;26;2" dur="5s" begin="1.2s" repeatCount="indefinite" />
          <animate attributeName="y" values="104;80;104" dur="5s" begin="1.2s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
}

export default IconLinkedin;
