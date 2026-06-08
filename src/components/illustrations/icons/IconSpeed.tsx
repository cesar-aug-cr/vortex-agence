export function IconSpeed({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="speed-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="speed-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.55" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="speed-streak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="speed-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="62" cy="62" r="46" fill="url(#speed-glow)" opacity="0.28" />

      {/* stopwatch top button + stem */}
      <g stroke="url(#speed-ring)" strokeWidth="2.4" strokeLinecap="round">
        <line x1="62" y1="20" x2="62" y2="28" />
        <line x1="54" y1="18" x2="70" y2="18" />
        <line x1="84" y1="30" x2="90" y2="24" />
      </g>

      {/* outer dial */}
      <circle cx="62" cy="62" r="32" fill="#0a0a0b" stroke="url(#speed-ring)" strokeWidth="2.4" opacity="0.95" />
      {/* progress arc */}
      <circle cx="62" cy="62" r="32" fill="none" stroke="url(#speed-arc)" strokeWidth="3.2" strokeLinecap="round"
        strokeDasharray="201 201" strokeDashoffset="150" transform="rotate(-90 62 62)">
        <animate attributeName="strokeDashoffset" values="180;40;180" dur="4.5s" repeatCount="indefinite" />
      </circle>

      {/* tick marks */}
      <g stroke="#14e0c8" strokeWidth="1.4" opacity="0.5">
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = 62 + Math.cos(a) * 26;
          const y1 = 62 + Math.sin(a) * 26;
          const x2 = 62 + Math.cos(a) * 29;
          const y2 = 62 + Math.sin(a) * 29;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* sweeping hand */}
      <g transform="translate(62,62)">
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="2.4s" repeatCount="indefinite" />
          <line x1="0" y1="0" x2="0" y2="-22" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
        </g>
        <circle r="3.4" fill="#c8f02e" />
      </g>

      {/* motion streaks */}
      <g strokeLinecap="round">
        <line x1="6" y1="50" x2="22" y2="50" stroke="url(#speed-streak)" strokeWidth="2.4">
          <animate attributeName="x1" values="14;6;14" dur="1.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" />
        </line>
        <line x1="2" y1="62" x2="20" y2="62" stroke="url(#speed-streak)" strokeWidth="2.4">
          <animate attributeName="x1" values="12;2;12" dur="1.4s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin="0.3s" repeatCount="indefinite" />
        </line>
        <line x1="6" y1="74" x2="22" y2="74" stroke="url(#speed-streak)" strokeWidth="2.4">
          <animate attributeName="x1" values="15;6;15" dur="1.4s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" begin="0.6s" repeatCount="indefinite" />
        </line>
      </g>
    </svg>
  );
}

export default IconSpeed;
