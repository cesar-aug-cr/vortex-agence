export function IconWordPress({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="wp-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="wp-block" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.1" />
        </linearGradient>
        <radialGradient id="wp-disc" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.3" />
        </radialGradient>
        <radialGradient id="wp-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#wp-glow)" opacity="0.28" />

      {/* admin dashboard frame */}
      <g stroke="url(#wp-frame)" strokeWidth="1.6" fill="none">
        <rect x="18" y="24" width="84" height="62" rx="7" />
        <line x1="42" y1="24" x2="42" y2="86" strokeWidth="1.2" />
        <line x1="18" y1="36" x2="102" y2="36" strokeWidth="1.2" />
      </g>

      {/* sidebar menu */}
      <g fill="url(#wp-block)">
        <rect x="24" y="44" width="12" height="4" rx="2" />
        <rect x="24" y="52" width="12" height="4" rx="2" opacity="0.7" />
        <rect x="24" y="60" width="12" height="4" rx="2" opacity="0.55" />
        <rect x="24" y="68" width="12" height="4" rx="2" opacity="0.4" />
      </g>
      <rect x="22" y="43.2" width="16" height="5.6" rx="2.8" fill="#c8f02e" opacity="0.25">
        <animate attributeName="y" values="43.2;51.2;59.2;43.2" dur="5s" repeatCount="indefinite" />
      </rect>

      {/* content blocks */}
      <g fill="url(#wp-block)">
        <rect x="48" y="42" width="48" height="8" rx="2" />
        <rect x="48" y="54" width="22" height="14" rx="2" opacity="0.6" />
        <rect x="74" y="54" width="22" height="14" rx="2" opacity="0.45" />
        <rect x="48" y="72" width="48" height="5" rx="2" opacity="0.5" />
      </g>

      {/* CMS W-disc / globe-gear mark */}
      <g transform="translate(60,18)">
        <circle r="12" fill="url(#wp-disc)" />
        {/* gear teeth */}
        <g fill="#0a0a0b" opacity="0.85">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="16s" repeatCount="indefinite" />
          <g>
            <rect x="-1.3" y="-15" width="2.6" height="4" rx="1" />
            <rect x="-1.3" y="11" width="2.6" height="4" rx="1" />
            <rect x="-15" y="-1.3" width="4" height="2.6" rx="1" />
            <rect x="11" y="-1.3" width="4" height="2.6" rx="1" />
          </g>
        </g>
        {/* W mark */}
        <path d="M-6 -3 L-3.5 5 L-1 -2 L1 5 L3.5 -3" fill="none" stroke="#0a0a0b" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="8.4" fill="none" stroke="#0a0a0b" strokeWidth="1" opacity="0.5" />
      </g>
    </svg>
  );
}

export default IconWordPress;
