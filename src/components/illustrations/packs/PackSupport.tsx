export function PackSupport({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pksup-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="pksup-band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="pksup-bubble" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.42" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="pksup-core" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.55" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="pksup-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft backdrop glow */}
      <circle cx="60" cy="60" r="46" fill="url(#pksup-glow)" opacity="0.28" />

      {/* lifebuoy / support ring — outer guidance */}
      <circle cx="60" cy="60" r="42" fill="none" stroke="url(#pksup-frame)" strokeWidth="1.4" opacity="0.32" />
      {/* lifebuoy lashing ticks */}
      <g stroke="#14e0c8" strokeWidth="1.6" strokeLinecap="round" opacity="0.4">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2 + Math.PI / 8;
          const x1 = 60 + Math.cos(a) * 38;
          const y1 = 60 + Math.sin(a) * 38;
          const x2 = 60 + Math.cos(a) * 45;
          const y2 = 60 + Math.sin(a) * 45;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>

      {/* responsive sweep arc — a live "we're online" pulse around the ring */}
      <circle
        cx="60"
        cy="60"
        r="42"
        fill="none"
        stroke="url(#pksup-band)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray="60 204"
        transform="rotate(-90 60 60)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="-90 60 60"
          to="270 60 60"
          dur="4.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* orbiting status node riding the arc */}
      <g>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 60 60"
          to="360 60 60"
          dur="4.5s"
          repeatCount="indefinite"
        />
        <circle cx="60" cy="18" r="3" fill="#c8f02e">
          <animate attributeName="r" values="2.4;3.4;2.4" dur="2.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* ── support agent: headset over chat bubble ── */}

      {/* chat bubble body (the conversation surface) */}
      <path
        d="M30 50 Q30 42 38 42 L82 42 Q90 42 90 50 L90 74 Q90 82 82 82 L58 82 L48 92 L48 82 L38 82 Q30 82 30 74 Z"
        fill="url(#pksup-bubble)"
        stroke="url(#pksup-frame)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* core highlight inside the bubble for depth */}
      <circle cx="60" cy="62" r="20" fill="url(#pksup-core)" opacity="0.5" />

      {/* headset band arcing over the bubble */}
      <path
        d="M34 56 A26 26 0 0 1 86 56"
        fill="none"
        stroke="url(#pksup-frame)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* left ear cup */}
      <rect x="30" y="54" width="9" height="16" rx="4" fill="#0a0a0b" stroke="url(#pksup-frame)" strokeWidth="1.8" />
      {/* right ear cup */}
      <rect x="81" y="54" width="9" height="16" rx="4" fill="#0a0a0b" stroke="url(#pksup-frame)" strokeWidth="1.8" />
      {/* boom mic arm from right cup curving to mouth area */}
      <path
        d="M85 70 Q85 82 74 84"
        fill="none"
        stroke="url(#pksup-frame)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* mic capsule — lime live highlight */}
      <circle cx="72" cy="84" r="3.2" fill="#c8f02e">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.8s" repeatCount="indefinite" />
      </circle>

      {/* typing "…" indicator — the animated heart of the chat */}
      <g>
        <circle cx="50" cy="62" r="3.4" fill="#c8f02e">
          <animate attributeName="cy" values="62;57;62" keyTimes="0;0.3;1" dur="1.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;1;0.55" keyTimes="0;0.3;1" dur="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="62" r="3.4" fill="#c8f02e">
          <animate attributeName="cy" values="62;57;62" keyTimes="0;0.3;1" dur="1.4s" begin="0.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;1;0.55" keyTimes="0;0.3;1" dur="1.4s" begin="0.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="70" cy="62" r="3.4" fill="#14e0c8">
          <animate attributeName="cy" values="62;57;62" keyTimes="0;0.3;1" dur="1.4s" begin="0.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;1;0.55" keyTimes="0;0.3;1" dur="1.4s" begin="0.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* small reply-line hints under the typing dots */}
      <g fill="#14e0c8" opacity="0.45">
        <rect x="40" y="72" width="22" height="2.2" rx="1.1" />
        <rect x="65" y="72" width="12" height="2.2" rx="1.1" opacity="0.7" />
      </g>
    </svg>
  );
}

export default PackSupport;
