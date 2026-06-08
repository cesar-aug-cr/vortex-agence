export function IconSmartForms({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="sforms-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="sforms-field" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.45" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="sforms-track" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="sforms-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#sforms-glow)" opacity="0.28" />

      {/* form card */}
      <rect x="26" y="20" width="68" height="80" rx="8" fill="none" stroke="url(#sforms-frame)" strokeWidth="1.6" />

      {/* progress track */}
      <g transform="translate(0,32)">
        <line x1="36" y1="0" x2="84" y2="0" stroke="#14e0c8" strokeWidth="2" opacity="0.2" strokeLinecap="round" />
        <line x1="36" y1="0" x2="84" y2="0" stroke="url(#sforms-track)" strokeWidth="2" strokeLinecap="round" strokeDasharray="48 48" strokeDashoffset="32">
          <animate attributeName="strokeDashoffset" values="48;0;0;48" keyTimes="0;0.5;0.85;1" dur="5s" repeatCount="indefinite" />
        </line>
        <circle cx="36" cy="0" r="3.4" fill="#c8f02e" />
        <circle cx="60" cy="0" r="3.4" fill="#22d38c">
          <animate attributeName="fill" values="#1d2b2a;#22d38c;#22d38c" keyTimes="0;0.5;1" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="84" cy="0" r="3.4" fill="#1d2b2a" stroke="#14e0c8" strokeWidth="1" />
      </g>

      {/* form fields */}
      <g fill="url(#sforms-field)">
        <rect x="36" y="44" width="48" height="9" rx="3" />
        <rect x="36" y="58" width="48" height="9" rx="3" opacity="0.8" />
        <rect x="36" y="72" width="30" height="9" rx="3" opacity="0.6" />
      </g>
      <g fill="#14e0c8" opacity="0.7">
        <rect x="36" y="40" width="14" height="2.4" rx="1.2" />
        <rect x="36" y="54" width="18" height="2.4" rx="1.2" />
      </g>

      {/* autofill spark / smart suggestion */}
      <g transform="translate(74,62)">
        <path d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z" fill="#c8f02e">
          <animateTransform attributeName="transform" type="scale" values="0.7;1.15;0.7" dur="2.6s" repeatCount="indefinite" additive="sum" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.6s" repeatCount="indefinite" />
        </path>
      </g>

      {/* submit button */}
      <rect x="36" y="86" width="48" height="8" rx="4" fill="#c8f02e" opacity="0.85">
        <animate attributeName="opacity" values="0.55;0.95;0.55" dur="3.2s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

export default IconSmartForms;
