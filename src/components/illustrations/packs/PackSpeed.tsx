export function PackSpeed({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="pkspd-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pkspd-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="pkspd-arc" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="pkspd-bolt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <linearGradient id="pkspd-streak" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="pkspd-face" cx="0.5" cy="0.32" r="0.85">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#0a0a0b" />
        </radialGradient>
        <radialGradient id="pkspd-hub" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </radialGradient>
      </defs>

      {/* soft backdrop glow */}
      <circle cx="60" cy="60" r="46" fill="url(#pkspd-glow)" opacity="0.28" />

      {/* forward motion streaks (left of gauge) */}
      <g strokeLinecap="round">
        <line x1="8" y1="44" x2="26" y2="44" stroke="url(#pkspd-streak)" strokeWidth="2.6">
          <animate attributeName="x1" values="20;6;20" dur="1.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;1;0.25" dur="1.6s" repeatCount="indefinite" />
        </line>
        <line x1="4" y1="56" x2="24" y2="56" stroke="url(#pkspd-streak)" strokeWidth="2.6">
          <animate attributeName="x1" values="16;3;16" dur="1.6s" begin="0.3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;1;0.25" dur="1.6s" begin="0.3s" repeatCount="indefinite" />
        </line>
        <line x1="9" y1="68" x2="27" y2="68" stroke="url(#pkspd-streak)" strokeWidth="2.6">
          <animate attributeName="x1" values="21;7;21" dur="1.6s" begin="0.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.25;1;0.25" dur="1.6s" begin="0.6s" repeatCount="indefinite" />
        </line>
      </g>

      {/* gauge body */}
      <circle cx="60" cy="60" r="34" fill="url(#pkspd-face)" stroke="url(#pkspd-frame)" strokeWidth="2.4" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="#0a0a0b" strokeWidth="0.8" opacity="0.6" />

      {/* outer dotted bezel accents */}
      <g fill="#14e0c8" opacity="0.55">
        <circle cx="60" cy="22" r="1.3" />
        <circle cx="98" cy="60" r="1.3" />
        <circle cx="60" cy="98" r="1.3" />
        <circle cx="22" cy="60" r="1.3" />
      </g>

      {/* gauge tick scale (lower-left to upper-right sweep) */}
      <g stroke="#14e0c8" strokeWidth="1.4" strokeLinecap="round" opacity="0.5">
        {Array.from({ length: 11 }, (_, i) => {
          const a = (Math.PI * 0.75) + (i / 10) * (Math.PI * 1.5);
          const major = i % 5 === 0;
          const r1 = major ? 22 : 25;
          const x1 = 60 + Math.cos(a) * r1;
          const y1 = 60 + Math.sin(a) * r1;
          const x2 = 60 + Math.cos(a) * 28;
          const y2 = 60 + Math.sin(a) * 28;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              opacity={major ? 0.9 : 0.45}
              strokeWidth={major ? 2 : 1.2}
            />
          );
        })}
      </g>

      {/* progress arc track */}
      <path
        d="M37.5 84.5 A34 34 0 1 1 82.5 84.5"
        fill="none"
        stroke="#14e0c8"
        strokeWidth="3.6"
        strokeLinecap="round"
        opacity="0.16"
      />
      {/* progress arc fill (filling into the high zone) */}
      <path
        d="M37.5 84.5 A34 34 0 1 1 82.5 84.5"
        fill="none"
        stroke="url(#pkspd-arc)"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeDasharray="160 220"
        strokeDashoffset="160"
      >
        <animate attributeName="strokeDashoffset" values="160;18;160" dur="4.5s" repeatCount="indefinite" />
      </path>

      {/* lightning bolt — the fast core (lime accent) */}
      <path
        d="M62 38 L52 56 L60 56 L56 70 L72 50 L63 50 L70 38 Z"
        fill="url(#pkspd-bolt)"
        opacity="0.9"
      >
        <animate attributeName="opacity" values="0.45;1;0.45" dur="2.6s" repeatCount="indefinite" />
      </path>

      {/* sweeping needle, swinging up into the high zone */}
      <g transform="translate(60,60)">
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            values="-118;52;-118"
            dur="4.5s"
            repeatCount="indefinite"
          />
          <line x1="0" y1="0" x2="0" y2="-27" stroke="#c8f02e" strokeWidth="2.6" strokeLinecap="round" />
          <line x1="0" y1="0" x2="0" y2="7" stroke="#c8f02e" strokeWidth="2.6" strokeLinecap="round" opacity="0.45" />
        </g>
        <circle r="5.2" fill="url(#pkspd-hub)" />
        <circle r="5.2" fill="none" stroke="#0a0a0b" strokeWidth="1" opacity="0.4" />
      </g>

      {/* micro readout bars below hub */}
      <g fill="#c8f02e">
        <rect x="50" y="79" width="7" height="2.4" rx="1.2" opacity="0.85" />
        <rect x="59" y="79" width="11" height="2.4" rx="1.2" opacity="0.45" />
      </g>
    </svg>
  );
}

export default PackSpeed;
