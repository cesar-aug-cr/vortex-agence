export function AutomatisationIa({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="autoia-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="autoia-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="autoia-gear" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="autoia-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.9" />
        </linearGradient>
        <filter id="autoia-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* gear path: 12 teeth, used twice */}
      <g>
        {/* gear A top-left */}
        <g transform="translate(110,118)">
          <path
            d="M0 -34 L7 -33 L9 -44 L21 -41 L19 -30 L25 -26 L34 -33 L43 -23 L34 -16 L37 -9 L48 -10 L51 2 L40 4 L40 11 L49 16 L43 27 L33 23 L28 28 L31 39 L19 43 L15 32 L8 33 L4 44 L-8 41 L-6 30 L-13 26 L-22 33 L-31 22 L-22 16 L-25 9 L-36 10 L-39 -2 L-28 -5 L-28 -12 L-38 -18 L-31 -29 L-21 -24 L-15 -29 L-19 -40 L-7 -43 Z"
            fill="url(#autoia-gear)"
            opacity="0.85"
          >
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="14s" repeatCount="indefinite" />
          </path>
          <circle r="16" fill="#0a0a0b" stroke="#c8f02e" strokeWidth="1.5" />
          <circle r="5" fill="#14e0c8" />
        </g>

        {/* gear B bottom-right (counter-rotating) */}
        <g transform="translate(292,288)">
          <path
            d="M0 -28 L6 -27 L7 -36 L17 -34 L16 -25 L21 -21 L28 -27 L36 -19 L28 -13 L31 -7 L40 -8 L42 2 L33 4 L33 9 L41 13 L36 22 L27 19 L23 23 L25 32 L15 35 L12 26 L6 27 L3 36 L-7 33 L-5 24 L-11 21 L-18 27 L-26 18 L-18 13 L-21 7 L-30 8 L-32 -2 L-23 -4 L-23 -10 L-32 -15 L-26 -24 L-18 -20 L-13 -24 L-16 -33 L-6 -36 Z"
            fill="url(#autoia-gear)"
            opacity="0.7"
          >
            <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="11s" repeatCount="indefinite" />
          </path>
          <circle r="13" fill="#0a0a0b" stroke="#14e0c8" strokeWidth="1.5" />
          <circle r="4" fill="#2e66ff" />
        </g>
      </g>

      {/* central AI node glow */}
      <circle cx="200" cy="200" r="100" fill="url(#autoia-glow)" filter="url(#autoia-blur)" opacity="0.4" />

      {/* interconnected data flows */}
      <g stroke="url(#autoia-flow)" strokeWidth="1.6" fill="none">
        <path d="M110 118 Q160 160 200 200" opacity="0.8" />
        <path d="M292 288 Q250 250 200 200" opacity="0.8" />
        <path d="M330 90 Q280 140 200 200" opacity="0.7" />
        <path d="M70 300 Q130 250 200 200" opacity="0.7" />
        <path d="M350 210 Q280 205 200 200" opacity="0.6" />
        <path d="M60 160 Q130 180 200 200" opacity="0.6" />
      </g>

      {/* peripheral data nodes */}
      <g fill="#2e66ff">
        <circle cx="330" cy="90" r="4" />
        <circle cx="70" cy="300" r="4" />
        <circle cx="350" cy="210" r="3.5" />
        <circle cx="60" cy="160" r="3.5" />
      </g>

      {/* travelling data packets */}
      <g fill="#c8f02e">
        <rect width="4" height="4" rx="1"><animateMotion path="M330 90 Q280 140 200 200" dur="2.6s" repeatCount="indefinite" /></rect>
        <rect width="4" height="4" rx="1"><animateMotion path="M70 300 Q130 250 200 200" dur="3.2s" repeatCount="indefinite" /></rect>
        <rect width="3.4" height="3.4" rx="1"><animateMotion path="M110 118 Q160 160 200 200" dur="2.9s" repeatCount="indefinite" /></rect>
        <rect width="3.4" height="3.4" rx="1"><animateMotion path="M292 288 Q250 250 200 200" dur="3.5s" repeatCount="indefinite" /></rect>
      </g>

      {/* central AI core radiating */}
      <circle cx="200" cy="200" r="30" fill="url(#autoia-core)" />
      <g stroke="#c8f02e" strokeWidth="1.4" opacity="0.7">
        <line x1="200" y1="158" x2="200" y2="170" />
        <line x1="200" y1="230" x2="200" y2="242" />
        <line x1="158" y1="200" x2="170" y2="200" />
        <line x1="230" y1="200" x2="242" y2="200" />
        <line x1="172" y1="172" x2="180" y2="180" />
        <line x1="220" y1="220" x2="228" y2="228" />
        <line x1="228" y1="172" x2="220" y2="180" />
        <line x1="180" y1="220" x2="172" y2="228" />
      </g>
      <circle cx="200" cy="200" r="16" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="16;23;16" dur="2.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2.6s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="200" r="7" fill="#c8f02e" />
    </svg>
  );
}

export default AutomatisationIa;
