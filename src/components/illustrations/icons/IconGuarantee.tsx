export function IconGuarantee({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="guarantee-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="guarantee-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="guarantee-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* pulsing halo */}
      <circle cx="60" cy="58" r="40" fill="url(#guarantee-glow)" opacity="0.3">
        <animate attributeName="r" values="36;44;36" dur="3.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.35;0.18;0.35" dur="3.4s" repeatCount="indefinite" />
      </circle>

      {/* shield fill */}
      <path d="M60 22 L90 32 L90 60 Q90 86 60 98 Q30 86 30 60 L30 32 Z" fill="url(#guarantee-fill)" />

      {/* shield outline drawing itself */}
      <path d="M60 22 L90 32 L90 60 Q90 86 60 98 Q30 86 30 60 L30 32 Z" fill="none" stroke="url(#guarantee-edge)" strokeWidth="2.2" strokeLinejoin="round" strokeDasharray="240" strokeDashoffset="240">
        <animate attributeName="strokeDashoffset" values="240;0" dur="3s" repeatCount="indefinite" />
      </path>

      {/* inner ring */}
      <path d="M60 30 L82 37 L82 59 Q82 79 60 90 Q38 79 38 59 L38 37 Z" fill="none" stroke="#14e0c8" strokeWidth="1" strokeOpacity="0.4" strokeLinejoin="round" />

      {/* checkmark */}
      <path d="M46 60 L56 70 L76 46" fill="none" stroke="#c8f02e" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="60" strokeDashoffset="60">
        <animate attributeName="strokeDashoffset" values="60;60;0;0" keyTimes="0;0.45;0.75;1" dur="3s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export default IconGuarantee;
