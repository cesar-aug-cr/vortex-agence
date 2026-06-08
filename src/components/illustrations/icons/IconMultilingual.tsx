export function IconMultilingual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="multi-globe" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <radialGradient id="multi-fill" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.28" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.06" />
        </radialGradient>
        <linearGradient id="multi-tag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="multi-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#multi-glow)" opacity="0.28" />

      {/* globe */}
      <g transform="translate(60,60)">
        <circle r="26" fill="url(#multi-fill)" stroke="url(#multi-globe)" strokeWidth="1.8" />
        <g fill="none" stroke="url(#multi-globe)" strokeWidth="1.1" opacity="0.7">
          <ellipse rx="11" ry="26" />
          <ellipse rx="22" ry="26" opacity="0.6" />
          <line x1="-26" y1="0" x2="26" y2="0" />
          <path d="M-24 -12 H24 M-24 12 H24" opacity="0.7" />
        </g>
      </g>

      {/* orbiting language tags */}
      <g transform="translate(60,60)">
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite" />
          <LangTag x={0} y={-40} label="EN" />
          <LangTag x={36} y={20} label="FR" />
          <LangTag x={-36} y={20} label="DE" />
        </g>
      </g>
    </svg>
  );
}

function LangTag({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {/* counter-rotate so text stays upright */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="18s" repeatCount="indefinite" />
        <rect x="-12" y="-9" width="24" height="18" rx="9" fill="#0a0a0b" stroke="url(#multi-tag)" strokeWidth="1.4" />
        <text x="0" y="4.5" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="700" fill="#c8f02e">{label}</text>
      </g>
    </g>
  );
}

export default IconMultilingual;
