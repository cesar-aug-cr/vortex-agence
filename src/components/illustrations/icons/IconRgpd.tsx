export function IconRgpd({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="rgpd-shield" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="rgpd-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.28" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.08" />
        </linearGradient>
        <radialGradient id="rgpd-cookie" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="rgpd-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="58" r="46" fill="url(#rgpd-glow)" opacity="0.28" />

      {/* shield */}
      <path d="M60 18 L92 30 V58 C92 80 78 92 60 100 C42 92 28 80 28 58 V30 Z"
        fill="url(#rgpd-fill)" stroke="url(#rgpd-shield)" strokeWidth="2" strokeLinejoin="round" />

      {/* scanning sweep */}
      <path d="M60 18 L92 30 V58 C92 80 78 92 60 100 C42 92 28 80 28 58 V30 Z"
        fill="#c8f02e" opacity="0.1">
        <animate attributeName="opacity" values="0;0.18;0" dur="3.4s" repeatCount="indefinite" />
      </path>

      {/* EU stars ring */}
      <g fill="#2e66ff" opacity="0.55">
        {Array.from({ length: 8 }, (_, i) => {
          const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
          const x = 60 + Math.cos(a) * 22;
          const y = 50 + Math.sin(a) * 22;
          return <circle key={i} cx={x} cy={y} r={1.4} />;
        })}
      </g>

      {/* central check */}
      <g transform="translate(60,50)">
        <circle r="14" fill="url(#rgpd-cookie)" opacity="0.18" />
        <path d="M-7 0 L-2 5 L8 -6" fill="none" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="strokeDasharray" values="0 30;30 0" dur="1.6s" repeatCount="indefinite" />
        </path>
      </g>

      {/* consent cookie */}
      <g transform="translate(86,86)">
        <circle r="13" fill="url(#rgpd-cookie)">
          <animate attributeName="r" values="12;13.5;12" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* cookie bites */}
        <circle cx="6" cy="-7" r="3" fill="#0a0a0b" opacity="0.85" />
        {/* chips */}
        <g fill="#0a0a0b" opacity="0.8">
          <circle cx="-4" cy="-2" r="1.6" />
          <circle cx="2" cy="3" r="1.8" />
          <circle cx="-5" cy="5" r="1.3" />
          <circle cx="5" cy="6" r="1.2" />
        </g>
      </g>
    </svg>
  );
}

export default IconRgpd;
