export function TunnelsDeConversion({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="tunnels-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.8" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="tunnels-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tunnels-band-a" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="tunnels-band-b" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.34" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient id="tunnels-band-c" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#22d38c" stopOpacity="0.4" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="tunnels-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <filter id="tunnels-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ambient glow behind the target */}
      <circle cx="200" cy="332" r="78" fill="url(#tunnels-glow)" filter="url(#tunnels-blur)" opacity="0.35" />

      {/* funnel bands — top wide, narrowing down */}
      <g>
        {/* TOFU band */}
        <path d="M70 64 L330 64 L300 150 L100 150 Z" fill="url(#tunnels-band-a)" stroke="url(#tunnels-rim)" strokeWidth="1.6" strokeOpacity="0.7" />
        {/* MOFU band */}
        <path d="M100 158 L300 158 L268 238 L132 238 Z" fill="url(#tunnels-band-b)" stroke="url(#tunnels-rim)" strokeWidth="1.6" strokeOpacity="0.8" />
        {/* BOFU band */}
        <path d="M132 246 L268 246 L228 312 L172 312 Z" fill="url(#tunnels-band-c)" stroke="url(#tunnels-rim)" strokeWidth="1.8" strokeOpacity="0.9" />
      </g>

      {/* wireframe ellipse rims (3D feel) */}
      <g fill="none" stroke="url(#tunnels-rim)" strokeWidth="1.6">
        <ellipse cx="200" cy="64" rx="130" ry="22" strokeOpacity="0.85" />
        <ellipse cx="200" cy="154" rx="100" ry="17" strokeOpacity="0.6" />
        <ellipse cx="200" cy="242" rx="68" ry="12" strokeOpacity="0.55" />
        <ellipse cx="200" cy="312" rx="28" ry="6" strokeOpacity="0.5" />
      </g>

      {/* longitudinal wireframe lines */}
      <g stroke="#14e0c8" strokeWidth="0.9" strokeOpacity="0.22">
        <path d="M70 64 L172 312" fill="none" />
        <path d="M330 64 L228 312" fill="none" />
        <path d="M200 42 L200 318" fill="none" strokeOpacity="0.12" />
      </g>

      {/* band labels */}
      <text x="200" y="112" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#14e0c8" textAnchor="middle" opacity="0.85">TOFU</text>
      <text x="200" y="204" fontFamily="monospace" fontSize="12" fontWeight="700" fill="#22d38c" textAnchor="middle" opacity="0.85">MOFU</text>
      <text x="200" y="284" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#c8f02e" textAnchor="middle" opacity="0.9">BOFU</text>

      {/* luminous dots descending through the funnel */}
      <g fill="#c8f02e">
        <circle r="3.4"><animateMotion path="M120 64 Q150 180 196 308" dur="3.2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.4;1;1;0.6" dur="3.2s" repeatCount="indefinite" /></circle>
        <circle r="3"><animateMotion path="M250 64 Q230 180 204 308" dur="3.8s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.4;1;1;0.6" dur="3.8s" repeatCount="indefinite" /></circle>
        <circle r="2.6" fill="#14e0c8"><animateMotion path="M180 64 Q175 180 198 308" dur="4.3s" repeatCount="indefinite" /></circle>
        <circle r="2.8" fill="#22d38c"><animateMotion path="M300 64 Q260 180 206 308" dur="3.5s" repeatCount="indefinite" /></circle>
        <circle r="2.4"><animateMotion path="M95 64 Q145 180 194 308" dur="4.6s" repeatCount="indefinite" /></circle>
      </g>

      {/* glowing target / diamond core at the bottom */}
      <circle cx="200" cy="334" r="30" fill="url(#tunnels-core)" />
      <g transform="translate(200 334)">
        <path d="M0 -17 L13 0 L0 17 L-13 0 Z" fill="#0a0a0b" opacity="0.35" stroke="#c8f02e" strokeWidth="2" strokeLinejoin="round" />
        <path d="M0 -9 L7 0 L0 9 L-7 0 Z" fill="#c8f02e">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </path>
        <circle r="24" fill="none" stroke="#c8f02e" strokeWidth="1.8">
          <animate attributeName="r" values="20;30;20" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default TunnelsDeConversion;
