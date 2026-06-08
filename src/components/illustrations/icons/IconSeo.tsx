export function IconSeo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="seo-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="seo-row" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="seo-arrow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="seo-lens" cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.45" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.08" />
        </radialGradient>
        <radialGradient id="seo-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#seo-glow)" opacity="0.28" />

      {/* ranked results list */}
      <g>
        <rect x="18" y="26" width="60" height="14" rx="4" fill="url(#seo-row)" stroke="url(#seo-frame)" strokeWidth="1" />
        <circle cx="26" cy="33" r="2.6" fill="#c8f02e" />
        <rect x="34" y="30" width="34" height="3" rx="1.5" fill="#14e0c8" opacity="0.8" />
        <rect x="34" y="35" width="22" height="2.4" rx="1.2" fill="#14e0c8" opacity="0.5" />

        <rect x="18" y="44" width="60" height="14" rx="4" fill="url(#seo-row)" opacity="0.75" stroke="url(#seo-frame)" strokeWidth="0.8" />
        <circle cx="26" cy="51" r="2.6" fill="#22d38c" />
        <rect x="34" y="48" width="30" height="3" rx="1.5" fill="#14e0c8" opacity="0.6" />
        <rect x="34" y="53" width="20" height="2.4" rx="1.2" fill="#14e0c8" opacity="0.4" />

        <rect x="18" y="62" width="60" height="14" rx="4" fill="url(#seo-row)" opacity="0.55" stroke="url(#seo-frame)" strokeWidth="0.8" />
        <circle cx="26" cy="69" r="2.6" fill="#2e66ff" opacity="0.8" />
        <rect x="34" y="66" width="26" height="3" rx="1.5" fill="#14e0c8" opacity="0.45" />
        <rect x="34" y="71" width="18" height="2.4" rx="1.2" fill="#14e0c8" opacity="0.3" />
      </g>

      {/* climbing position highlight */}
      <rect x="16" y="44" width="64" height="14" rx="4" fill="none" stroke="#c8f02e" strokeWidth="1.6">
        <animate attributeName="y" values="44;26;44" dur="4.5s" repeatCount="indefinite" />
      </rect>

      {/* climbing arrow */}
      <g transform="translate(86,46)">
        <path d="M0 22 L0 -2" stroke="url(#seo-arrow)" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M-5 4 L0 -3 L5 4" fill="none" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <animateTransform attributeName="transform" type="translate" values="86 50;86 44;86 50" dur="4.5s" repeatCount="indefinite" />
      </g>

      {/* magnifier */}
      <g transform="translate(70,68)">
        <circle r="15" fill="url(#seo-lens)" stroke="url(#seo-frame)" strokeWidth="2.4" />
        <circle r="15" fill="none" stroke="#c8f02e" strokeWidth="1" opacity="0.5">
          <animate attributeName="r" values="15;17;15" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <line x1="11" y1="11" x2="22" y2="22" stroke="url(#seo-frame)" strokeWidth="3.4" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default IconSeo;
