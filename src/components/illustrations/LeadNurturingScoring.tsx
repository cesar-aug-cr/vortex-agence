export function LeadNurturingScoring({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="nurturing-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="nurturing-temp" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="nurturing-cold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="nurturing-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <linearGradient id="nurturing-hot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="nurturing-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <filter id="nurturing-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient glow behind the hot lead */}
      <circle cx="316" cy="118" r="64" fill="url(#nurturing-glow)" filter="url(#nurturing-blur)" opacity="0.3" />

      {/* cold -> warm -> hot progression rail */}
      <path d="M70 118 Q190 70 316 118" fill="none" stroke="url(#nurturing-temp)" strokeWidth="2" strokeOpacity="0.35" strokeDasharray="5 7" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" values="24;0" dur="1.4s" repeatCount="indefinite" />
      </path>

      {/* prospect avatar nodes with score gauges */}
      {/* COLD node */}
      <g transform="translate(70 118)">
        <circle r="26" fill="#0a0a0b" opacity="0.35" stroke="url(#nurturing-cold)" strokeWidth="2" />
        <g fill="none" stroke="#14e0c8" strokeWidth="2" strokeLinecap="round">
          <circle cx="0" cy="-5" r="7" />
          <path d="M-12 14 Q0 0 12 14" />
        </g>
        {/* score gauge arc */}
        <path d="M-20 22 A24 24 0 0 1 -8 30" fill="none" stroke="#2e66ff" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 60;14 60;0 60" dur="3.4s" repeatCount="indefinite" />
        </path>
        <text x="0" y="44" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#14e0c8" textAnchor="middle">COLD</text>
      </g>

      {/* WARM node */}
      <g transform="translate(193 84)">
        <circle r="28" fill="#0a0a0b" opacity="0.35" stroke="url(#nurturing-warm)" strokeWidth="2" />
        <g fill="none" stroke="#22d38c" strokeWidth="2" strokeLinecap="round">
          <circle cx="0" cy="-6" r="7.5" />
          <path d="M-13 15 Q0 0 13 15" />
        </g>
        <path d="M-22 22 A26 26 0 0 1 6 32" fill="none" stroke="#22d38c" strokeWidth="3.4" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 80;34 80;0 80" dur="3.4s" repeatCount="indefinite" />
        </path>
        <text x="0" y="46" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#22d38c" textAnchor="middle">WARM</text>
      </g>

      {/* HOT node */}
      <g transform="translate(316 118)">
        <circle r="30" fill="url(#nurturing-core)" />
        <circle r="22" fill="#0a0a0b" opacity="0.4" stroke="url(#nurturing-hot)" strokeWidth="2" />
        <g fill="none" stroke="#c8f02e" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="0" cy="-6" r="8" />
          <path d="M-14 16 Q0 0 14 16" />
        </g>
        <path d="M-24 24 A30 30 0 1 1 24 24" fill="none" stroke="#c8f02e" strokeWidth="3.6" strokeLinecap="round">
          <animate attributeName="stroke-dasharray" values="0 200;160 200;0 200" dur="3.4s" repeatCount="indefinite" />
        </path>
        <circle r="34" fill="none" stroke="#c8f02e" strokeWidth="1.4">
          <animate attributeName="r" values="30;40;30" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <text x="0" y="50" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#c8f02e" textAnchor="middle">HOT</text>
      </g>

      {/* travelling score points along the rail */}
      <g fill="#c8f02e">
        <circle r="3.4"><animateMotion path="M70 118 Q190 70 316 118" dur="3.2s" repeatCount="indefinite" /></circle>
        <circle r="2.6" fill="#22d38c"><animateMotion path="M70 118 Q190 70 316 118" dur="3.8s" begin="1.2s" repeatCount="indefinite" /></circle>
      </g>

      {/* germinating seed (growth metaphor) */}
      <g transform="translate(100 286)">
        {/* soil mound */}
        <path d="M-44 30 Q0 14 44 30 L44 36 L-44 36 Z" fill="#22d38c" opacity="0.14" />
        <line x1="-46" y1="30" x2="46" y2="30" stroke="#22d38c" strokeWidth="1.6" strokeOpacity="0.4" strokeLinecap="round" />
        {/* stem */}
        <path d="M0 30 Q-2 6 0 -10" fill="none" stroke="url(#nurturing-hot)" strokeWidth="3" strokeLinecap="round">
          <animate attributeName="d" values="M0 30 Q-2 18 0 8;M0 30 Q-2 6 0 -10;M0 30 Q-2 6 0 -10" dur="4s" repeatCount="indefinite" />
        </path>
        {/* leaves */}
        <path d="M0 6 Q-18 0 -22 -16 Q-4 -14 0 6 Z" fill="#22d38c" opacity="0.7">
          <animate attributeName="opacity" values="0.2;0.8;0.8" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M0 -2 Q18 -8 22 -24 Q4 -22 0 -2 Z" fill="#c8f02e" opacity="0.8">
          <animate attributeName="opacity" values="0.2;0.9;0.9" dur="4s" begin="0.4s" repeatCount="indefinite" />
        </path>
        <text x="0" y="56" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#22d38c" textAnchor="middle" opacity="0.8">NURTURE</text>
      </g>

      {/* MQL -> SQL handoff */}
      <g transform="translate(250 286)">
        {/* MQL chip */}
        <rect x="-46" y="-14" width="56" height="28" rx="14" fill="#0a0a0b" opacity="0.35" stroke="#22d38c" strokeWidth="1.6" />
        <text x="-18" y="5" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#22d38c" textAnchor="middle">MQL</text>
        {/* arrow */}
        <path d="M16 0 H46" fill="none" stroke="url(#nurturing-temp)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M40 -6 L48 0 L40 6" fill="none" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="2.6" fill="#c8f02e"><animateMotion path="M16 0 H46" dur="1.4s" repeatCount="indefinite" /></circle>
        {/* SQL chip */}
        <rect x="52" y="-14" width="56" height="28" rx="14" fill="#c8f02e" opacity="0.92" />
        <text x="80" y="5" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#0a0a0b" textAnchor="middle">SQL</text>
      </g>
    </svg>
  );
}

export default LeadNurturingScoring;
