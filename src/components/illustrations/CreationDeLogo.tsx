export function CreationDeLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="logocreate-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.7" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="logocreate-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="logocreate-arc" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="logocreate-pen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <linearGradient id="logocreate-guide" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.05" />
          <stop offset="0.5" stopColor="#14e0c8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.05" />
        </linearGradient>
        <filter id="logocreate-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient glow behind construction */}
      <circle cx="200" cy="200" r="96" fill="url(#logocreate-glow)" filter="url(#logocreate-blur)" opacity="0.4" />

      {/* construction grid guides */}
      <g stroke="url(#logocreate-guide)" strokeWidth="1">
        <line x1="40" y1="120" x2="360" y2="120" />
        <line x1="40" y1="200" x2="360" y2="200" />
        <line x1="40" y1="280" x2="360" y2="280" />
        <line x1="120" y1="40" x2="120" y2="360" />
        <line x1="200" y1="40" x2="200" y2="360" />
        <line x1="280" y1="40" x2="280" y2="360" />
      </g>
      {/* diagonal construction lines */}
      <g stroke="#2e66ff" strokeWidth="0.8" strokeDasharray="4 5" opacity="0.4">
        <line x1="120" y1="120" x2="280" y2="280" />
        <line x1="280" y1="120" x2="120" y2="280" />
      </g>

      {/* outer construction circle — rotating */}
      <g fill="none" stroke="url(#logocreate-arc)" strokeWidth="1.4" opacity="0.6">
        <circle cx="200" cy="200" r="92" strokeDasharray="6 8">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="36s" repeatCount="indefinite" />
        </circle>
      </g>
      {/* secondary golden-ratio circles */}
      <circle cx="200" cy="200" r="64" fill="none" stroke="#14e0c8" strokeWidth="1" strokeOpacity="0.45" />
      <circle cx="172" cy="200" r="36" fill="none" stroke="#22d38c" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="228" cy="200" r="36" fill="none" stroke="#22d38c" strokeWidth="1" strokeOpacity="0.4" />

      {/* construction node ticks on circle */}
      <g fill="#14e0c8" opacity="0.55">
        <circle cx="200" cy="108" r="2" />
        <circle cx="292" cy="200" r="2" />
        <circle cx="200" cy="292" r="2" />
        <circle cx="108" cy="200" r="2" />
      </g>

      {/* the resolved abstract mark — interlocking V / vortex arcs */}
      <g fill="none" strokeWidth="13" strokeLinecap="round">
        <path d="M158 152 L200 240 L242 152" stroke="url(#logocreate-mark)">
          <animate attributeName="stroke-dasharray" values="0 320;320 0" dur="2.4s" fill="freeze" />
        </path>
        <path d="M200 240 A62 62 0 0 1 200 152" stroke="url(#logocreate-arc)" opacity="0.85" />
      </g>
      <circle cx="200" cy="200" r="6" fill="#c8f02e" />

      {/* compass / pen — pivots around the mark, traces the arc */}
      <g>
        <animateTransform attributeName="transform" type="rotate" from="20 200 200" to="380 200 200" dur="14s" repeatCount="indefinite" />
        {/* compass leg */}
        <line x1="200" y1="200" x2="262" y2="118" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
        <line x1="200" y1="200" x2="200" y2="118" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" opacity="0.4" />
        {/* pivot */}
        <circle cx="200" cy="200" r="5" fill="none" stroke="#14e0c8" strokeWidth="2" />
        {/* drawing nib */}
        <path d="M262 118 l8 8 l-12 6 z" fill="url(#logocreate-pen)" />
        <circle cx="262" cy="118" r="3.5" fill="#c8f02e" />
      </g>

      {/* tracing dot running the outer circle */}
      <circle r="3.5" fill="#c8f02e">
        <animateMotion path="M200 108 A92 92 0 1 1 199 108" dur="6s" repeatCount="indefinite" />
      </circle>

      {/* final sparkle accent */}
      <g transform="translate(286 124)">
        <path d="M0 -13 L3 -3 L13 0 L3 3 L0 13 L-3 3 L-13 0 L-3 -3 Z" fill="url(#logocreate-mark)">
          <animateTransform attributeName="transform" type="scale" values="0.6;1.1;0.6" dur="2.6s" repeatCount="indefinite" additive="sum" />
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.6s" repeatCount="indefinite" />
        </path>
      </g>
      <g transform="translate(120 282)" fill="#14e0c8">
        <path d="M0 -7 L1.6 -1.6 L7 0 L1.6 1.6 L0 7 L-1.6 1.6 L-7 0 L-1.6 -1.6 Z">
          <animate attributeName="opacity" values="0.2;0.9;0.2" dur="3.2s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

export default CreationDeLogo;
