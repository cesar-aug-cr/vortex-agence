export function PackSmartForms({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="pksf-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pksf-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="pksf-card" x1="0" y1="0" x2="0.7" y2="1">
          <stop offset="0" stopColor="#0a0a0b" />
          <stop offset="1" stopColor="#0a0a0b" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="pksf-field" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="pksf-track" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="pksf-btn" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="pksf-spark" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.4" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft backdrop glow */}
      <circle cx="60" cy="60" r="46" fill="url(#pksf-glow)" opacity="0.28" />

      {/* back card — depth layer */}
      <rect
        x="32"
        y="30"
        width="58"
        height="68"
        rx="9"
        fill="#0a0a0b"
        opacity="0.45"
        stroke="url(#pksf-frame)"
        strokeWidth="1"
        strokeOpacity="0.35"
      />

      {/* main form card */}
      <rect
        x="26"
        y="24"
        width="58"
        height="68"
        rx="9"
        fill="url(#pksf-card)"
        stroke="url(#pksf-frame)"
        strokeWidth="1.6"
      />

      {/* stepper of 3 nodes with connecting rail */}
      <g transform="translate(0,38)">
        {/* base rail */}
        <line x1="38" y1="0" x2="72" y2="0" stroke="#14e0c8" strokeWidth="2" strokeLinecap="round" opacity="0.18" />
        {/* progress fill rail (partway, animated) */}
        <line x1="38" y1="0" x2="72" y2="0" stroke="url(#pksf-track)" strokeWidth="2" strokeLinecap="round" strokeDasharray="34 34" strokeDashoffset="22">
          <animate attributeName="strokeDashoffset" values="34;5;5;34" keyTimes="0;0.45;0.85;1" dur="4.5s" repeatCount="indefinite" />
        </line>

        {/* step 1 — checked */}
        <circle cx="38" cy="0" r="4.6" fill="#22d38c" />
        <path d="M35.6 0 L37.3 1.7 L40.4 -1.6" fill="none" stroke="#0a0a0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* step 2 — checked */}
        <circle cx="55" cy="0" r="4.6" fill="#22d38c" />
        <path d="M52.6 0 L54.3 1.7 L57.4 -1.6" fill="none" stroke="#0a0a0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

        {/* step 3 — active (lime, pulsing ring) */}
        <circle cx="72" cy="0" r="6.4" fill="none" stroke="#c8f02e" strokeWidth="1.3" opacity="0.7">
          <animate attributeName="r" values="5.6;7.6;5.6" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="72" cy="0" r="4.6" fill="#0a0a0b" stroke="#c8f02e" strokeWidth="1.8" />
        <circle cx="72" cy="0" r="1.8" fill="#c8f02e" />
      </g>

      {/* progress bar partway */}
      <g transform="translate(0,52)">
        <rect x="34" y="0" width="42" height="3.4" rx="1.7" fill="#14e0c8" opacity="0.16" />
        <rect x="34" y="0" width="27" height="3.4" rx="1.7" fill="url(#pksf-track)">
          <animate attributeName="width" values="22;30;22" dur="4.5s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* input field 1 (with label tick + filled value) */}
      <g transform="translate(0,60)">
        <rect x="34" y="2.4" width="13" height="2.2" rx="1.1" fill="#14e0c8" opacity="0.7" />
        <rect x="34" y="6" width="42" height="9" rx="3" fill="url(#pksf-field)" stroke="url(#pksf-frame)" strokeWidth="0.8" strokeOpacity="0.5" />
        <rect x="37" y="9.4" width="22" height="2.2" rx="1.1" fill="#14e0c8" opacity="0.55" />
      </g>

      {/* input field 2 (active — lime focus ring + blinking caret) */}
      <g transform="translate(0,76)">
        <rect x="34" y="2.4" width="17" height="2.2" rx="1.1" fill="#22d38c" opacity="0.7" />
        <rect x="34" y="6" width="42" height="9" rx="3" fill="url(#pksf-field)" stroke="#c8f02e" strokeWidth="1.2" />
        <rect x="37" y="9.4" width="14" height="2.2" rx="1.1" fill="#c8f02e" opacity="0.6" />
        <rect x="53" y="8.4" width="1.3" height="4.2" rx="0.6" fill="#c8f02e">
          <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.5;0.5;1" dur="1.4s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* primary submit button */}
      <g transform="translate(0,94)">
        <rect x="34" y="-2" width="42" height="11" rx="5.5" fill="url(#pksf-btn)">
          <animate attributeName="opacity" values="0.82;1;0.82" dur="3.2s" repeatCount="indefinite" />
        </rect>
        <rect x="46" y="2.6" width="18" height="2.4" rx="1.2" fill="#0a0a0b" opacity="0.85" />
      </g>

      {/* smart spark — "intelligent" star, top-right of card */}
      <g transform="translate(86,30)">
        <circle r="9" fill="url(#pksf-spark)">
          <animate attributeName="opacity" values="0.35;0.8;0.35" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <g>
          <animateTransform attributeName="transform" type="scale" values="0.78;1.12;0.78" dur="2.6s" repeatCount="indefinite" additive="sum" />
          <path
            d="M0 -6.5 L1.7 -1.7 L6.5 0 L1.7 1.7 L0 6.5 L-1.7 1.7 L-6.5 0 L-1.7 -1.7 Z"
            fill="#c8f02e"
          />
          <circle r="1.5" fill="#ffffff" />
        </g>
        {/* twin micro-sparkles */}
        <circle cx="8" cy="-7" r="1.1" fill="#14e0c8">
          <animate attributeName="opacity" values="0;1;0" dur="2.6s" begin="0.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="-7" cy="8" r="0.9" fill="#c8f02e">
          <animate attributeName="opacity" values="0;1;0" dur="2.6s" begin="1.3s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default PackSmartForms;
