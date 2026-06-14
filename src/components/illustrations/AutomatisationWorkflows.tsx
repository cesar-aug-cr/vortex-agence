export function AutomatisationWorkflows({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="autoflow-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="autoflow-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="autoflow-wire" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.15" />
          <stop offset="0.5" stopColor="#22d38c" stopOpacity="0.7" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="autoflow-gear" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="autoflow-module" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.16" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="autoflow-trigger" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.3" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.06" />
        </linearGradient>
        <filter id="autoflow-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient glow */}
      <circle cx="200" cy="206" r="120" fill="url(#autoflow-glow)" filter="url(#autoflow-blur)" opacity="0.28" />

      {/* connecting wires (trigger -> action chain) */}
      <g fill="none" strokeWidth="2" stroke="url(#autoflow-wire)">
        <path d="M96 96 Q160 96 192 150" opacity="0.85" />
        <path d="M200 178 Q200 210 200 232" opacity="0.85" />
        <path d="M208 150 Q250 96 312 96" opacity="0.8" />
        <path d="M176 256 Q120 300 92 314" opacity="0.8" />
        <path d="M224 256 Q288 300 316 314" opacity="0.8" />
        <path d="M312 120 Q300 200 224 244" opacity="0.55" />
        <path d="M92 120 Q104 200 176 244" opacity="0.55" />
      </g>

      {/* luminous pulses travelling along the wires */}
      <g fill="#c8f02e">
        <circle r="3.4"><animateMotion path="M96 96 Q160 96 192 150" dur="2.4s" repeatCount="indefinite" /></circle>
        <circle r="3.4"><animateMotion path="M200 178 Q200 210 200 232" dur="1.8s" begin="2.4s" repeatCount="indefinite" /></circle>
        <circle r="3"><animateMotion path="M208 150 Q250 96 312 96" dur="2.6s" repeatCount="indefinite" /></circle>
        <circle r="3" fill="#14e0c8"><animateMotion path="M176 256 Q120 300 92 314" dur="3s" begin="0.8s" repeatCount="indefinite" /></circle>
        <circle r="3" fill="#14e0c8"><animateMotion path="M224 256 Q288 300 316 314" dur="3.2s" begin="1.4s" repeatCount="indefinite" /></circle>
      </g>

      {/* trigger module (top-left) */}
      <g>
        <rect x="58" y="68" width="78" height="56" rx="12" fill="url(#autoflow-trigger)" stroke="#c8f02e" strokeWidth="1.6" />
        <path d="M84 80 l-10 18 h8 l-4 16 14 -22 h-8 z" fill="#c8f02e" />
        <text x="112" y="86" fontFamily="monospace" fontSize="7.5" fill="#b9bcb2" textAnchor="middle">TRIG</text>
        <line x1="98" y1="106" x2="124" y2="106" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <line x1="98" y1="114" x2="118" y2="114" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      </g>

      {/* app module (top-right) with turning gear */}
      <g>
        <rect x="284" y="68" width="74" height="56" rx="12" fill="url(#autoflow-module)" stroke="#14e0c8" strokeWidth="1.4" />
        <g transform="translate(310,96)">
          <path
            d="M0 -16 L4 -15 L5 -22 L13 -20 L11 -13 L15 -10 L21 -15 L26 -9 L21 -5 L23 0 L30 -1 L31 7 L24 8 L23 13 L29 17 L24 23 L18 19 L14 22 L15 29 L7 30 L5 23 L0 23 L-3 30 L-11 27 L-8 21 L-12 17 L-19 21 L-23 14 L-17 11 L-18 5 L-25 5 L-25 -3 L-18 -4 L-17 -10 L-24 -13 L-19 -20 L-13 -16 L-9 -19 L-11 -25 L-3 -26 Z"
            fill="url(#autoflow-gear)"
            opacity="0.85"
          >
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="12s" repeatCount="indefinite" />
          </path>
          <circle r="7" fill="#0a0a0b" stroke="#14e0c8" strokeWidth="1.2" />
          <circle r="2.6" fill="#c8f02e" />
        </g>
      </g>

      {/* central router/logic core */}
      <g>
        <circle cx="200" cy="205" r="40" fill="url(#autoflow-core)" />
        <rect x="178" y="183" width="44" height="44" rx="11" fill="#0a0a0b" opacity="0.5" stroke="#c8f02e" strokeWidth="1.6" />
        <circle cx="200" cy="205" r="13" fill="none" stroke="#c8f02e" strokeWidth="2">
          <animate attributeName="r" values="13;19;13" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;0.2;1" dur="2.6s" repeatCount="indefinite" />
        </circle>
        {/* branching logic glyph */}
        <g stroke="#c8f02e" strokeWidth="2" fill="none" strokeLinecap="round">
          <path d="M200 196 v18" />
          <path d="M200 205 h10" />
        </g>
        <circle cx="200" cy="196" r="2.6" fill="#c8f02e" />
        <circle cx="210" cy="205" r="2.6" fill="#14e0c8" />
        <circle cx="200" cy="214" r="2.6" fill="#22d38c" />
      </g>

      {/* action node bottom-left (gear) */}
      <g>
        <rect x="50" y="296" width="74" height="52" rx="12" fill="url(#autoflow-module)" stroke="#22d38c" strokeWidth="1.4" />
        <g transform="translate(74,322)">
          <path
            d="M0 -13 L4 -12 L5 -18 L11 -16 L9 -10 L13 -8 L18 -12 L22 -7 L18 -3 L20 1 L26 0 L27 6 L21 7 L20 11 L25 15 L20 20 L15 16 L11 19 L12 25 L6 26 L4 20 L0 20 L-3 26 L-9 23 L-6 18 L-10 14 L-16 18 L-20 12 L-15 9 L-16 4 L-22 4 L-22 -2 L-16 -3 L-15 -8 L-21 -11 L-16 -17 L-11 -13 L-7 -16 L-9 -22 L-3 -23 Z"
            fill="url(#autoflow-gear)"
            opacity="0.7"
          >
            <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="9s" repeatCount="indefinite" />
          </path>
          <circle r="6" fill="#0a0a0b" stroke="#22d38c" strokeWidth="1.2" />
        </g>
        <line x1="98" y1="312" x2="118" y2="312" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <line x1="98" y1="320" x2="112" y2="320" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      </g>

      {/* action node bottom-right (delivered check) */}
      <g>
        <rect x="276" y="296" width="74" height="52" rx="12" fill="url(#autoflow-trigger)" stroke="#c8f02e" strokeWidth="1.6" />
        <circle cx="300" cy="322" r="13" fill="#0a0a0b" opacity="0.45" />
        <path d="M293 322 l5 6 l10 -12" fill="none" stroke="#c8f02e" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" repeatCount="indefinite" />
        </path>
        <line x1="322" y1="312" x2="342" y2="312" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        <line x1="322" y1="320" x2="336" y2="320" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
      </g>

      {/* connector dots on module edges */}
      <g fill="#14e0c8">
        <circle cx="136" cy="96" r="3.5" />
        <circle cx="284" cy="96" r="3.5" />
        <circle cx="200" cy="178" r="3.5" fill="#c8f02e" />
        <circle cx="200" cy="232" r="3.5" fill="#c8f02e" />
      </g>
    </svg>
  );
}

export default AutomatisationWorkflows;
