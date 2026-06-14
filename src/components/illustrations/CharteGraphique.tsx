export function CharteGraphique({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="charteg-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.6" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="charteg-pageL" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#17171c" />
          <stop offset="1" stopColor="#1d1d22" />
        </linearGradient>
        <linearGradient id="charteg-pageR" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d1d22" />
          <stop offset="1" stopColor="#17171c" />
        </linearGradient>
        <linearGradient id="charteg-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="charteg-spine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="charteg-scale" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <filter id="charteg-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* glow */}
      <circle cx="200" cy="210" r="100" fill="url(#charteg-glow)" filter="url(#charteg-blur)" opacity="0.4" />

      {/* book shadow */}
      <ellipse cx="200" cy="318" rx="150" ry="16" fill="#0a0a0b" opacity="0.3" />

      {/* OPEN MANUAL — two spreads */}
      <g>
        {/* subtle breathing of the whole book */}
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="6s" repeatCount="indefinite" additive="sum" />

        {/* left page */}
        <path d="M196 96 L60 112 L60 296 L196 304 Z" fill="url(#charteg-pageL)" stroke="#2e66ff" strokeWidth="1.2" strokeOpacity="0.4" />
        {/* right page */}
        <path d="M204 96 L340 112 L340 296 L204 304 Z" fill="url(#charteg-pageR)" stroke="#14e0c8" strokeWidth="1.2" strokeOpacity="0.4" />
        {/* spine */}
        <rect x="196" y="96" width="8" height="208" fill="url(#charteg-spine)" opacity="0.8" />

        {/* LEFT SPREAD: logo safe-zone */}
        <g>
          {/* safe-zone dashed frame */}
          <rect x="84" y="138" width="86" height="74" rx="3" fill="none" stroke="#c8f02e" strokeWidth="1" strokeDasharray="5 4" opacity="0.6" />
          {/* mark inside */}
          <path d="M112 156 L127 188 L142 156" fill="none" stroke="url(#charteg-mark)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="127" cy="172" r="3" fill="#c8f02e" />
          {/* clear-space measure ticks */}
          <g stroke="#14e0c8" strokeWidth="1" opacity="0.5">
            <line x1="78" y1="138" x2="78" y2="212" />
            <line x1="75" y1="138" x2="81" y2="138" />
            <line x1="75" y1="212" x2="81" y2="212" />
          </g>
          {/* caption lines */}
          <line x1="84" y1="236" x2="166" y2="234" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          <line x1="84" y1="250" x2="140" y2="249" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
        </g>

        {/* RIGHT SPREAD: color chips + type scale */}
        <g>
          {/* color-code chips */}
          <rect x="222" y="134" width="22" height="30" rx="4" fill="#c8f02e" />
          <rect x="250" y="134" width="22" height="30" rx="4" fill="#22d38c" />
          <rect x="278" y="134" width="22" height="30" rx="4" fill="#14e0c8" />
          <rect x="306" y="134" width="22" height="30" rx="4" fill="#2e66ff" />
          {/* hex code lines under chips */}
          <g stroke="#b9bcb2" strokeWidth="1.4" strokeLinecap="round" opacity="0.35">
            <line x1="222" y1="172" x2="244" y2="172" />
            <line x1="250" y1="172" x2="272" y2="172" />
            <line x1="278" y1="172" x2="300" y2="172" />
            <line x1="306" y1="172" x2="328" y2="172" />
          </g>
          {/* typographic scale — descending bars aligning */}
          <g fill="url(#charteg-scale)">
            <rect x="222" y="194" width="100" height="9" rx="2">
              <animate attributeName="width" values="0;100" dur="1.4s" fill="freeze" />
            </rect>
            <rect x="222" y="212" width="74" height="7" rx="2">
              <animate attributeName="width" values="0;74" dur="1.6s" fill="freeze" />
            </rect>
            <rect x="222" y="228" width="54" height="5" rx="2">
              <animate attributeName="width" values="0;54" dur="1.8s" fill="freeze" />
            </rect>
            <rect x="222" y="242" width="40" height="4" rx="2">
              <animate attributeName="width" values="0;40" dur="2s" fill="freeze" />
            </rect>
          </g>
        </g>
      </g>

      {/* spacing/baseline grid overlay sweeping across pages */}
      <g stroke="#14e0c8" strokeWidth="0.7" strokeOpacity="0.25">
        <line x1="60" y1="272" x2="340" y2="280" />
        <line x1="60" y1="284" x2="340" y2="292" />
      </g>

      {/* turning-page highlight sweep */}
      <path d="M204 96 L300 106 L300 290 L204 300 Z" fill="#c8f02e" opacity="0">
        <animate attributeName="opacity" values="0;0.08;0" dur="5s" repeatCount="indefinite" />
      </path>

      {/* bookmark ribbon */}
      <path d="M196 96 L196 200 L200 192 L204 200 L204 96 Z" fill="#c8f02e" opacity="0.85" />

      {/* sparkle accent */}
      <g transform="translate(322 120)">
        <path d="M0 -10 L2.2 -2.2 L10 0 L2.2 2.2 L0 10 L-2.2 2.2 L-10 0 L-2.2 -2.2 Z" fill="url(#charteg-mark)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.8s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

export default CharteGraphique;
