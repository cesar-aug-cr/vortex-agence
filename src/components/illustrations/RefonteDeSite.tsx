export function RefonteDeSite({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="refonte-de-site-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="refonte-de-site-block" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="refonte-de-site-gauge" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="refonte-de-site-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0" />
          <stop offset="0.5" stopColor="#c8f02e" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="refonte-de-site-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <filter id="refonte-de-site-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient halo over the new side */}
      <circle cx="280" cy="170" r="130" fill="url(#refonte-de-site-glow)" filter="url(#refonte-de-site-blur)" opacity="0.28" />

      {/* shared browser frame */}
      <g stroke="url(#refonte-de-site-frame)" strokeWidth="2" fill="none">
        <rect x="48" y="64" width="304" height="208" rx="14" />
        <line x1="48" y1="92" x2="352" y2="92" strokeWidth="1.5" />
      </g>
      <rect x="48" y="64" width="304" height="208" rx="14" fill="#14e0c8" opacity="0.04" />
      <g fill="#c8f02e">
        <circle cx="62" cy="78" r="2.6" />
        <circle cx="72" cy="78" r="2.6" opacity="0.7" />
        <circle cx="82" cy="78" r="2.6" opacity="0.45" />
      </g>

      {/* LEFT — dull old wireframe */}
      <g stroke="#b9bcb2" strokeWidth="2" fill="none" opacity="0.5">
        <rect x="66" y="106" width="128" height="34" rx="2" strokeDasharray="5 4" />
        <line x1="74" y1="123" x2="120" y2="123" strokeWidth="3" strokeLinecap="round" />
        <rect x="66" y="150" width="60" height="46" rx="2" strokeDasharray="5 4" />
        <rect x="134" y="150" width="60" height="46" rx="2" strokeDasharray="5 4" />
        <line x1="66" y1="208" x2="194" y2="208" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="66" y1="222" x2="160" y2="222" strokeWidth="2.4" strokeLinecap="round" />
        <line x1="66" y1="240" x2="180" y2="240" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M96 162 l-8 22 l16 0 z M104 160 l16 0 l0 24 l-16 0 z" />
      </g>

      {/* RIGHT — polished modern UI */}
      <g>
        <rect x="206" y="106" width="128" height="40" rx="8" fill="url(#refonte-de-site-block)" />
        <rect x="216" y="116" width="74" height="9" rx="4.5" fill="#c8f02e" opacity="0.85" />
        <rect x="216" y="132" width="100" height="6" rx="3" fill="#b9bcb2" opacity="0.4" />
        <rect x="206" y="156" width="60" height="46" rx="8" fill="url(#refonte-de-site-block)" opacity="0.85" />
        <rect x="274" y="156" width="60" height="46" rx="8" fill="url(#refonte-de-site-block)" opacity="0.85" />
        <circle cx="224" cy="172" r="7" fill="#14e0c8" />
        <circle cx="292" cy="172" r="7" fill="#22d38c" />
        <line x1="214" y1="190" x2="258" y2="190" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <line x1="282" y1="190" x2="326" y2="190" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
        <rect x="206" y="214" width="92" height="22" rx="8" fill="url(#refonte-de-site-gauge)">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="2.6s" repeatCount="indefinite" />
        </rect>
        <line x1="232" y1="225" x2="272" y2="225" stroke="#0a0a0b" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      </g>

      {/* vertical sweep line transforming old into new */}
      <g>
        <line x1="200" y1="96" x2="200" y2="266" stroke="url(#refonte-de-site-sweep)" strokeWidth="3">
          <animate attributeName="x1" values="120;280;120" dur="5s" repeatCount="indefinite" />
          <animate attributeName="x2" values="120;280;120" dur="5s" repeatCount="indefinite" />
        </line>
        <circle r="4" fill="#c8f02e">
          <animate attributeName="cx" values="120;280;120" dur="5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="96;96;96" dur="5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* rising performance gauge */}
      <g transform="translate(200,330)">
        <path d="M-56 0 A56 56 0 0 1 56 0" fill="none" stroke="#b9bcb2" strokeWidth="6" strokeLinecap="round" opacity="0.25" />
        <path d="M-56 0 A56 56 0 0 1 56 0" fill="none" stroke="url(#refonte-de-site-gauge)" strokeWidth="6" strokeLinecap="round" strokeDasharray="176" strokeDashoffset="176">
          <animate attributeName="strokeDashoffset" values="176;40;40;176" keyTimes="0;0.45;0.8;1" dur="5s" repeatCount="indefinite" />
        </path>
        {/* needle */}
        <g>
          <line x1="0" y1="0" x2="32" y2="-30" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round">
            <animateTransform attributeName="transform" type="rotate" values="-70;38;38;-70" keyTimes="0;0.45;0.8;1" dur="5s" repeatCount="indefinite" />
          </line>
        </g>
        <circle cx="0" cy="0" r="6" fill="#c8f02e" />
        <circle cx="0" cy="0" r="2.6" fill="#0a0a0b" />
      </g>
    </svg>
  );
}

export default RefonteDeSite;
