export function IconProcess({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="process-rail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <radialGradient id="process-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="process-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#process-glow)" opacity="0.26" />

      {/* base rail */}
      <line x1="22" y1="60" x2="98" y2="60" stroke="#b9bcb2" strokeWidth="2" strokeOpacity="0.35" strokeLinecap="round" />

      {/* progress sweep */}
      <line x1="22" y1="60" x2="22" y2="60" stroke="url(#process-rail)" strokeWidth="2.6" strokeLinecap="round">
        <animate attributeName="x2" values="22;42;62;82;98;98" dur="5s" repeatCount="indefinite" />
      </line>

      {/* milestone nodes */}
      <g fill="#0a0a0b" stroke="url(#process-rail)" strokeWidth="2">
        <circle cx="26" cy="60" r="6" />
        <circle cx="52" cy="60" r="6" />
        <circle cx="78" cy="60" r="6" />
        <circle cx="98" cy="60" r="6" />
      </g>

      {/* sequential lit cores */}
      <g fill="url(#process-core)">
        <circle cx="26" cy="60" r="0">
          <animate attributeName="r" values="0;5;5;5;5;0" keyTimes="0;0.12;0.4;0.7;0.95;1" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="52" cy="60" r="0">
          <animate attributeName="r" values="0;0;5;5;5;0" keyTimes="0;0.28;0.4;0.7;0.95;1" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="78" cy="60" r="0">
          <animate attributeName="r" values="0;0;0;5;5;0" keyTimes="0;0.5;0.62;0.7;0.95;1" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="98" cy="60" r="0">
          <animate attributeName="r" values="0;0;0;0;5;0" keyTimes="0;0.6;0.78;0.86;0.95;1" dur="5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* milestone flags */}
      <g stroke="url(#process-rail)" strokeWidth="1.4" fill="none" strokeLinecap="round">
        <path d="M26 54 L26 36 L40 40 L26 44" />
        <path d="M52 66 L52 84 L66 80 L52 76" opacity="0.85" />
        <path d="M78 54 L78 38 L92 42 L78 46" opacity="0.85" />
      </g>

      {/* finish star */}
      <g transform="translate(98,40)" fill="#c8f02e">
        <path d="M0 -7 L1.8 -2 L7 -2 L2.6 1.4 L4.4 6.4 L0 3.2 L-4.4 6.4 L-2.6 1.4 L-7 -2 L-1.8 -2 Z">
          <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.8;0.92;1" dur="5s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="rotate" values="0;0;0;360" keyTimes="0;0.8;0.85;1" dur="5s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

export default IconProcess;
