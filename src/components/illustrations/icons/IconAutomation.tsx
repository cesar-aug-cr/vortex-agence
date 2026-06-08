export function IconAutomation({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="auto-gear" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="auto-path" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="auto-node" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.25" />
        </radialGradient>
        <radialGradient id="auto-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#auto-glow)" opacity="0.28" />

      {/* gear A */}
      <g transform="translate(40,38)">
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="9s" repeatCount="indefinite" />
          <GearShape r={15} teeth={8} color="url(#auto-gear)" />
        </g>
        <circle r="5" fill="none" stroke="url(#auto-gear)" strokeWidth="2" />
      </g>

      {/* gear B (counter-rotating) */}
      <g transform="translate(64,56)">
        <g>
          <animateTransform attributeName="transform" type="rotate" from="22.5" to="-337.5" dur="9s" repeatCount="indefinite" />
          <GearShape r={11} teeth={6} color="#22d38c" />
        </g>
        <circle r="3.6" fill="none" stroke="#22d38c" strokeWidth="1.8" />
      </g>

      {/* workflow path between nodes */}
      <path id="auto-flow" d="M22 90 H44 a6 6 0 0 0 6 -6 V78 a6 6 0 0 1 6 -6 H92" fill="none" stroke="url(#auto-path)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4">
        <animate attributeName="strokeDashoffset" values="16;0" dur="2.2s" repeatCount="indefinite" />
      </path>

      {/* workflow nodes */}
      <rect x="14" y="84" width="12" height="12" rx="3" fill="#0a0a0b" stroke="url(#auto-gear)" strokeWidth="1.4" />
      <g transform="translate(92,72)">
        <circle r="8" fill="url(#auto-node)" />
        <path d="M-3 0 L-1 2.4 L3.5 -2.4" fill="none" stroke="#0a0a0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* moving token along the path */}
      <circle r="2.8" fill="#c8f02e">
        <animateMotion dur="2.2s" repeatCount="indefinite">
          <mpath href="#auto-flow" />
        </animateMotion>
      </circle>
    </svg>
  );
}

function GearShape({ r, teeth, color }: { r: number; teeth: number; color: string }) {
  const tooth = (i: number) => {
    const a = (i / teeth) * Math.PI * 2;
    const tx = Math.cos(a) * (r + 3.5);
    const ty = Math.sin(a) * (r + 3.5);
    return (
      <rect
        key={i}
        x={tx - 1.6}
        y={ty - 1.6}
        width={3.2}
        height={3.2}
        rx={1}
        fill={color}
        transform={`rotate(${(a * 180) / Math.PI} ${tx} ${ty})`}
      />
    );
  };
  return (
    <g>
      <circle r={r} fill="none" stroke={color} strokeWidth="3" />
      {Array.from({ length: teeth }, (_, i) => tooth(i))}
    </g>
  );
}

export default IconAutomation;
