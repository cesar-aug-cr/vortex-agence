export function PackSsl({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pkssl-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="pkssl-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.26" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="pkssl-bar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.55" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="pkssl-seal" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="pkssl-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft backdrop glow */}
      <circle cx="60" cy="60" r="46" fill="url(#pkssl-glow)" opacity="0.28" />

      {/* secure pulse ring */}
      <circle cx="60" cy="58" r="38" fill="none" stroke="#c8f02e" strokeWidth="1.4" opacity="0.4">
        <animate attributeName="r" values="34;46;34" dur="4.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.45;0;0.45" dur="4.2s" repeatCount="indefinite" />
      </circle>

      {/* https address-bar pill */}
      <g>
        <rect x="22" y="16" width="76" height="15" rx="7.5" fill="#0a0a0b" stroke="url(#pkssl-frame)" strokeWidth="1.6" />
        {/* lock glyph inside the bar */}
        <g transform="translate(31,23.5)" stroke="#c8f02e" strokeWidth="1.4" strokeLinecap="round" fill="none">
          <rect x="-3" y="-1.4" width="6" height="5" rx="1.2" fill="#c8f02e" stroke="none" />
          <path d="M-1.8 -1.4 V-3 a1.8 1.8 0 0 1 3.6 0 V-1.4" />
        </g>
        {/* address text bars */}
        <g fill="url(#pkssl-bar)" opacity="0.85">
          <rect x="40" y="21" width="14" height="3.2" rx="1.6" />
          <rect x="57" y="21" width="22" height="3.2" rx="1.6" opacity="0.55" />
        </g>
        <circle cx="92" cy="23.5" r="2" fill="#14e0c8" opacity="0.7" />
      </g>

      {/* shield body */}
      <path
        d="M60 36 L86 45 V64 C86 80 75 90 60 96 C45 90 34 80 34 64 V45 Z"
        fill="url(#pkssl-fill)"
        stroke="url(#pkssl-frame)"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* shield inner edge accent */}
      <path
        d="M60 41 L81 48 V64 C81 77 72 86 60 91 C48 86 39 77 39 64 V48 Z"
        fill="none"
        stroke="#14e0c8"
        strokeWidth="1"
        strokeLinejoin="round"
        opacity="0.4"
      />
      {/* encryption scan sweep over shield */}
      <path
        d="M60 36 L86 45 V64 C86 80 75 90 60 96 C45 90 34 80 34 64 V45 Z"
        fill="#c8f02e"
        opacity="0.12"
      />

      {/* padlock inside shield */}
      <g transform="translate(60,66)">
        {/* shackle */}
        <path
          d="M-7 -3 V-8 a7 7 0 0 1 14 0 V-3"
          fill="none"
          stroke="url(#pkssl-frame)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        {/* body */}
        <rect x="-10.5" y="-3" width="21" height="17" rx="3.6" fill="#0a0a0b" stroke="url(#pkssl-frame)" strokeWidth="2" />
        {/* keyhole */}
        <circle cx="0" cy="3" r="2.4" fill="#c8f02e" />
        <rect x="-1.3" y="3" width="2.6" height="6" rx="1.3" fill="#c8f02e" />
        {/* unlock glint highlight */}
        <circle cx="-0.8" cy="2" r="0.8" fill="#ffffff" opacity="0.85" />
      </g>

      {/* certificate seal + ribbon */}
      <g transform="translate(92,80)">
        {/* ribbon tails */}
        <path d="M-4 8 L-7 20 L-2 16 L2 20 L1 8 Z" fill="url(#pkssl-bar)" opacity="0.85" stroke="#0a0a0b" strokeWidth="0.6" />
        {/* scalloped seal ring */}
        <g stroke="#22d38c" strokeWidth="1.2" opacity="0.65">
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2;
            const x1 = Math.cos(a) * 9;
            const y1 = Math.sin(a) * 9;
            const x2 = Math.cos(a) * 11.5;
            const y2 = Math.sin(a) * 11.5;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
          })}
        </g>
        {/* seal disc */}
        <circle r="9" fill="url(#pkssl-seal)" stroke="url(#pkssl-frame)" strokeWidth="1.6" />
        {/* verified check */}
        <path d="M-4 0 L-1 3.2 L4.5 -3.6" fill="none" stroke="#0a0a0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="strokeDasharray" values="0 18;18 0" dur="3.2s" repeatCount="indefinite" />
        </path>
      </g>

      {/* drifting encrypted bits */}
      <g fill="#14e0c8">
        <circle cx="26" cy="78" r="1.5" opacity="0.6">
          <animate attributeName="cy" values="80;72;80" dur="4.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="30" cy="88" r="1.2" fill="#c8f02e" opacity="0.7" />
        <circle cx="40" cy="100" r="1.3" opacity="0.5" />
      </g>
    </svg>
  );
}

export default PackSsl;
