export function IconLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="logo-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="logo-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#logo-glow)" opacity="0.22" />

      {/* geometric construction lines */}
      <g stroke="#b9bcb2" strokeWidth="0.9" strokeOpacity="0.45" fill="none">
        <circle cx="60" cy="60" r="34" strokeDasharray="214" strokeDashoffset="214">
          <animate attributeName="strokeDashoffset" values="214;0;0" keyTimes="0;0.5;1" dur="4.4s" repeatCount="indefinite" />
        </circle>
        <line x1="26" y1="60" x2="94" y2="60" strokeDasharray="68" strokeDashoffset="68">
          <animate attributeName="strokeDashoffset" values="68;0;0" keyTimes="0;0.4;1" dur="4.4s" repeatCount="indefinite" />
        </line>
        <line x1="60" y1="26" x2="60" y2="94" strokeDasharray="68" strokeDashoffset="68">
          <animate attributeName="strokeDashoffset" values="68;0;0" keyTimes="0;0.4;1" dur="4.4s" repeatCount="indefinite" />
        </line>
        <rect x="36" y="36" width="48" height="48" strokeDasharray="192" strokeDashoffset="192">
          <animate attributeName="strokeDashoffset" values="192;0;0" keyTimes="0;0.5;1" dur="4.4s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* compass / pen tracing */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="-90 60 60;270 60 60" keyTimes="0;0.5" dur="4.4s" repeatCount="indefinite" />
        <line x1="60" y1="60" x2="94" y2="60" stroke="url(#logo-edge)" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="94" cy="60" r="2.6" fill="#c8f02e" />
        <circle cx="60" cy="60" r="2" fill="#14e0c8" />
      </g>

      {/* resolved abstract logo mark (V vortex) */}
      <path d="M40 44 L60 84 L80 44" fill="none" stroke="url(#logo-mark)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="90" strokeDashoffset="90">
        <animate attributeName="strokeDashoffset" values="90;90;0;0" keyTimes="0;0.5;0.8;1" dur="4.4s" repeatCount="indefinite" />
      </path>
      <path d="M52 44 L60 60 L68 44" fill="none" stroke="#14e0c8" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="40" strokeDashoffset="40">
        <animate attributeName="strokeDashoffset" values="40;40;0;0" keyTimes="0;0.55;0.85;1" dur="4.4s" repeatCount="indefinite" />
      </path>

      {/* final sparkle */}
      <g transform="translate(80,44)" fill="#c8f02e">
        <path d="M0 -7 L1.6 -1.6 L7 0 L1.6 1.6 L0 7 L-1.6 1.6 L-7 0 L-1.6 -1.6 Z" opacity="0">
          <animate attributeName="opacity" values="0;0;1;0.3;1" keyTimes="0;0.85;0.9;0.95;1" dur="4.4s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="scale" values="0.3;0.3;1.2;0.9;1.2" keyTimes="0;0.85;0.9;0.95;1" dur="4.4s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

export default IconLogo;
