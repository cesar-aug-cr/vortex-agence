export function AgentsAssistantsIa({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="agentsia-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="agentsia-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.15" />
        </radialGradient>
        <linearGradient id="agentsia-hex" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="agentsia-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="agentsia-doc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.22" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.05" />
        </linearGradient>
        <filter id="agentsia-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* central glow */}
      <circle cx="214" cy="190" r="110" fill="url(#agentsia-glow)" filter="url(#agentsia-blur)" opacity="0.3" />

      {/* RAG knowledge-base document stack feeding the core (left) */}
      <g>
        <g transform="translate(40 150)">
          <rect x="0" y="14" width="62" height="78" rx="8" fill="url(#agentsia-doc)" stroke="#2e66ff" strokeWidth="1.2" strokeOpacity="0.5" opacity="0.6" transform="rotate(-8 31 53)" />
          <rect x="2" y="6" width="62" height="78" rx="8" fill="url(#agentsia-doc)" stroke="#14e0c8" strokeWidth="1.2" strokeOpacity="0.7" opacity="0.8" transform="rotate(-3 33 45)" />
          <rect x="6" y="0" width="62" height="78" rx="8" fill="url(#agentsia-doc)" stroke="#14e0c8" strokeWidth="1.4" />
          <line x1="16" y1="16" x2="58" y2="16" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
          <line x1="16" y1="28" x2="56" y2="28" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <line x1="16" y1="38" x2="50" y2="38" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          <line x1="16" y1="48" x2="58" y2="48" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          <line x1="16" y1="58" x2="46" y2="58" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
          <text x="37" y="73" fontFamily="monospace" fontSize="7" fill="#22d38c" textAnchor="middle">RAG</text>
        </g>
      </g>

      {/* knowledge flow into the core */}
      <g fill="none" stroke="url(#agentsia-flow)" strokeWidth="1.8">
        <path d="M114 178 Q150 188 168 196" opacity="0.85" />
        <path d="M114 196 Q150 200 168 200" opacity="0.7" />
        <path d="M114 214 Q150 210 168 204" opacity="0.7" />
      </g>
      <g fill="#c8f02e">
        <circle r="3"><animateMotion path="M114 178 Q150 188 168 196" dur="2.4s" repeatCount="indefinite" /></circle>
        <circle r="2.6" fill="#14e0c8"><animateMotion path="M114 214 Q150 210 168 204" dur="2.8s" begin="1s" repeatCount="indefinite" /></circle>
      </g>

      {/* orbiting task / tool nodes */}
      <g fill="none" stroke="url(#agentsia-flow)" strokeWidth="1.6">
        <path d="M214 130 Q230 90 274 84" opacity="0.7" />
        <path d="M256 196 Q300 196 326 176" opacity="0.7" />
        <path d="M244 240 Q286 268 310 296" opacity="0.7" />
        <path d="M196 250 Q188 296 150 318" opacity="0.65" />
      </g>
      <g fill="#c8f02e">
        <circle r="2.8"><animateMotion path="M214 130 Q230 90 274 84" dur="3s" repeatCount="indefinite" /></circle>
        <circle r="2.8" fill="#14e0c8"><animateMotion path="M256 196 Q300 196 326 176" dur="3.4s" begin="0.6s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M244 240 Q286 268 310 296" dur="3.2s" begin="1.2s" repeatCount="indefinite" /></circle>
        <circle r="2.6" fill="#14e0c8"><animateMotion path="M196 250 Q188 296 150 318" dur="3.6s" begin="1.8s" repeatCount="indefinite" /></circle>
      </g>

      {/* tool/task node chips */}
      <g>
        <g transform="translate(262 64)">
          <rect width="46" height="26" rx="7" fill="#0a0a0b" opacity="0.5" stroke="#c8f02e" strokeWidth="1.2" />
          <rect x="9" y="9" width="8" height="8" rx="2" fill="#c8f02e" />
          <line x1="22" y1="13" x2="38" y2="13" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </g>
        <g transform="translate(322 160)">
          <rect width="46" height="26" rx="7" fill="#0a0a0b" opacity="0.5" stroke="#14e0c8" strokeWidth="1.2" />
          <circle cx="14" cy="13" r="5" fill="none" stroke="#14e0c8" strokeWidth="1.6" />
          <line x1="24" y1="13" x2="38" y2="13" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </g>
        <g transform="translate(296 296)">
          <rect width="46" height="26" rx="7" fill="#0a0a0b" opacity="0.5" stroke="#22d38c" strokeWidth="1.2" />
          <path d="M9 18 l5 -9 l5 9 z" fill="#22d38c" />
          <line x1="24" y1="13" x2="38" y2="13" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </g>
        <g transform="translate(116 312)">
          <rect width="46" height="26" rx="7" fill="#0a0a0b" opacity="0.5" stroke="#2e66ff" strokeWidth="1.2" />
          <path d="M10 13 h8 m-4 -4 v8" stroke="#2e66ff" strokeWidth="2" strokeLinecap="round" />
          <line x1="24" y1="13" x2="38" y2="13" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </g>
      </g>

      {/* decision neurons firing around the core */}
      <g>
        <circle cx="170" cy="148" r="3" fill="#c8f02e">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="266" cy="156" r="3" fill="#14e0c8">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.2s" begin="0.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="252" cy="236" r="3" fill="#22d38c">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" begin="1s" repeatCount="indefinite" />
        </circle>
        <circle cx="172" cy="240" r="3" fill="#c8f02e">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" begin="0.3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* hexagonal AI core / brain */}
      <g transform="translate(214 196)">
        <circle r="56" fill="url(#agentsia-core)" opacity="0.7" />
        {/* rotating outer hex frame */}
        <path d="M0 -52 L45 -26 L45 26 L0 52 L-45 26 L-45 -26 Z" fill="none" stroke="url(#agentsia-hex)" strokeWidth="2" opacity="0.6">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="40s" repeatCount="indefinite" />
        </path>
        <path d="M0 -38 L33 -19 L33 19 L0 38 L-33 19 L-33 -19 Z" fill="#0a0a0b" opacity="0.55" stroke="#14e0c8" strokeWidth="1.4" />
        {/* neural web inside */}
        <g stroke="#c8f02e" strokeWidth="1.2" opacity="0.7" fill="none">
          <path d="M-14 -16 L4 -4 L-6 10 L12 16" />
          <path d="M14 -14 L4 -4 L16 6" />
          <path d="M-16 8 L-6 10 L-2 22" />
        </g>
        <g fill="#c8f02e">
          <circle cx="-14" cy="-16" r="2.6" />
          <circle cx="14" cy="-14" r="2.4" fill="#14e0c8" />
          <circle cx="4" cy="-4" r="3" />
          <circle cx="-6" cy="10" r="2.6" fill="#22d38c" />
          <circle cx="12" cy="16" r="2.4" />
          <circle cx="-16" cy="8" r="2" fill="#14e0c8" />
          <circle cx="-2" cy="22" r="2" />
        </g>
        {/* pulsing ring */}
        <circle r="42" fill="none" stroke="#c8f02e" strokeWidth="1.5">
          <animate attributeName="r" values="42;50;42" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default AgentsAssistantsIa;
