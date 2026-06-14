export function IconRedesign({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="redesign-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="redesign-hero" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="redesign-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0" />
          <stop offset="0.5" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="redesign-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <clipPath id="redesign-clip">
          <rect x="20" y="26" width="80" height="68" rx="6" />
        </clipPath>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#redesign-glow)" opacity="0.22" />

      <g clipPath="url(#redesign-clip)">
        {/* before: dull wireframe (left) */}
        <g stroke="#b9bcb2" strokeWidth="1.4" fill="none" strokeOpacity="0.55">
          <rect x="26" y="32" width="28" height="14" rx="2" />
          <line x1="26" y1="54" x2="54" y2="54" />
          <line x1="26" y1="60" x2="48" y2="60" />
          <line x1="26" y1="66" x2="54" y2="66" />
          <rect x="26" y="74" width="14" height="9" rx="2" />
          <rect x="44" y="74" width="10" height="9" rx="2" />
        </g>

        {/* after: polished UI (right) */}
        <g>
          <rect x="64" y="32" width="30" height="16" rx="3" fill="url(#redesign-hero)" />
          <circle cx="71" cy="40" r="3.4" fill="#c8f02e" />
          <rect x="64" y="54" width="30" height="4" rx="2" fill="#14e0c8" fillOpacity="0.6" />
          <rect x="64" y="62" width="22" height="3" rx="1.5" fill="#14e0c8" fillOpacity="0.4" />
          <rect x="64" y="74" width="16" height="9" rx="3" fill="url(#redesign-edge)" />
          <rect x="84" y="74" width="10" height="9" rx="3" fill="#22d38c" fillOpacity="0.5" />
        </g>

        {/* sweep line */}
        <rect x="-12" y="26" width="14" height="68" fill="url(#redesign-sweep)">
          <animate attributeName="x" values="14;100;100" keyTimes="0;0.7;1" dur="3.4s" repeatCount="indefinite" />
        </rect>
      </g>

      {/* device frame */}
      <rect x="20" y="26" width="80" height="68" rx="6" fill="none" stroke="url(#redesign-edge)" strokeWidth="2" />
      {/* center divider */}
      <line x1="60" y1="26" x2="60" y2="94" stroke="#c8f02e" strokeWidth="1.4" strokeDasharray="4 4">
        <animate attributeName="strokeDashoffset" values="0;-16" dur="1.4s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}

export default IconRedesign;
