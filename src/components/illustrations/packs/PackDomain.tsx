export function PackDomain({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pkdom-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="pkdom-unit" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0a0a0b" />
          <stop offset="0.5" stopColor="#14e0c8" stopOpacity="0.08" />
          <stop offset="1" stopColor="#0a0a0b" />
        </linearGradient>
        <linearGradient id="pkdom-wire" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <linearGradient id="pkdom-globe-stroke" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.5" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <radialGradient id="pkdom-globe-fill" cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.42" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.08" />
        </radialGradient>
        <radialGradient id="pkdom-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <clipPath id="pkdom-globe-clip">
          <circle cx="86" cy="42" r="16" />
        </clipPath>
      </defs>

      {/* soft radial backdrop */}
      <circle cx="60" cy="60" r="46" fill="url(#pkdom-glow)" opacity="0.28" />

      {/* ---- connection wire: server rack -> domain globe ---- */}
      <path
        d="M44 56 C58 56 60 46 72 44"
        fill="none"
        stroke="url(#pkdom-wire)"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />
      {/* travelling data packets along the wire */}
      <circle r="2.6" fill="#c8f02e">
        <animateMotion
          path="M44 56 C58 56 60 46 72 44"
          dur="2.8s"
          repeatCount="indefinite"
          rotate="auto"
        />
        <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" repeatCount="indefinite" />
      </circle>
      <circle r="1.8" fill="#14e0c8">
        <animateMotion
          path="M44 56 C58 56 60 46 72 44"
          dur="2.8s"
          begin="1.4s"
          repeatCount="indefinite"
        />
        <animate attributeName="opacity" values="0;1;1;0" dur="2.8s" begin="1.4s" repeatCount="indefinite" />
      </circle>

      {/* ---- domain globe + www tag (top-right node) ---- */}
      <g>
        <circle cx="86" cy="42" r="16" fill="url(#pkdom-globe-fill)" stroke="url(#pkdom-globe-stroke)" strokeWidth="2.4" />
        {/* meridians / parallels clipped to globe */}
        <g clipPath="url(#pkdom-globe-clip)" stroke="#14e0c8" strokeWidth="1.1" fill="none" opacity="0.55">
          <ellipse cx="86" cy="42" rx="7" ry="16" />
          <line x1="70" y1="42" x2="102" y2="42" />
          <path d="M72 33 Q86 28 100 33" />
          <path d="M72 51 Q86 56 100 51" />
        </g>
        {/* rotating sweep highlight on the globe */}
        <g clipPath="url(#pkdom-globe-clip)">
          <ellipse cx="86" cy="42" rx="3.4" ry="16" fill="#c8f02e" opacity="0.3">
            <animate attributeName="rx" values="1.5;9;1.5" dur="4.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.12;0.4;0.12" dur="4.5s" repeatCount="indefinite" />
          </ellipse>
        </g>
        {/* www domain tag */}
        <g transform="translate(74,18)">
          <rect x="0" y="0" width="24" height="11" rx="3" fill="#0a0a0b" stroke="url(#pkdom-frame)" strokeWidth="1.4" />
          <g fill="#c8f02e">
            <rect x="4" y="4.6" width="3.4" height="2" rx="1" />
            <rect x="10" y="4.6" width="3.4" height="2" rx="1" />
            <rect x="16" y="4.6" width="3.4" height="2" rx="1" />
          </g>
          <line x1="12" y1="11" x2="12" y2="17" stroke="url(#pkdom-globe-stroke)" strokeWidth="1.4" />
        </g>
      </g>

      {/* ---- server rack: 3 stacked units (bottom-left) ---- */}
      <g>
        {/* unit 1 (top) */}
        <g>
          <rect x="20" y="40" width="36" height="16" rx="3.5" fill="url(#pkdom-unit)" stroke="url(#pkdom-frame)" strokeWidth="1.8" />
          {/* drive slot ticks */}
          <g stroke="#14e0c8" strokeWidth="1.3" opacity="0.45" strokeLinecap="round">
            <line x1="25" y1="45" x2="25" y2="51" />
            <line x1="28" y1="45" x2="28" y2="51" />
            <line x1="31" y1="45" x2="31" y2="51" />
          </g>
          {/* micro label bar */}
          <rect x="37" y="46" width="9" height="2.4" rx="1.2" fill="#2e66ff" opacity="0.5" />
          {/* status LED */}
          <circle cx="50" cy="48" r="2.4" fill="#c8f02e">
            <animate attributeName="opacity" values="1;0.25;1" dur="2.6s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* unit 2 (middle) */}
        <g>
          <rect x="20" y="58" width="36" height="16" rx="3.5" fill="url(#pkdom-unit)" stroke="url(#pkdom-frame)" strokeWidth="1.8" />
          <g stroke="#14e0c8" strokeWidth="1.3" opacity="0.45" strokeLinecap="round">
            <line x1="25" y1="63" x2="25" y2="69" />
            <line x1="28" y1="63" x2="28" y2="69" />
            <line x1="31" y1="63" x2="31" y2="69" />
          </g>
          <rect x="37" y="64" width="9" height="2.4" rx="1.2" fill="#22d38c" opacity="0.5" />
          <circle cx="50" cy="66" r="2.4" fill="#14e0c8">
            <animate attributeName="opacity" values="0.25;1;0.25" dur="2.6s" begin="0.7s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* unit 3 (bottom) */}
        <g>
          <rect x="20" y="76" width="36" height="16" rx="3.5" fill="url(#pkdom-unit)" stroke="url(#pkdom-frame)" strokeWidth="1.8" />
          <g stroke="#14e0c8" strokeWidth="1.3" opacity="0.45" strokeLinecap="round">
            <line x1="25" y1="81" x2="25" y2="87" />
            <line x1="28" y1="81" x2="28" y2="87" />
            <line x1="31" y1="81" x2="31" y2="87" />
          </g>
          <rect x="37" y="82" width="9" height="2.4" rx="1.2" fill="#2e66ff" opacity="0.5" />
          <circle cx="50" cy="84" r="2.4" fill="#22d38c">
            <animate attributeName="opacity" values="1;0.25;1" dur="2.6s" begin="1.4s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* rack accent: pulsing power core highlight on top edge */}
        <rect x="20" y="38" width="36" height="2.5" rx="1.25" fill="#ffffff" opacity="0.12" />
      </g>

      {/* ---- "always-on" activity pulse ring around the rack ---- */}
      <circle cx="38" cy="66" r="30" fill="none" stroke="#c8f02e" strokeWidth="1" opacity="0.25" strokeDasharray="3 7">
        <animateTransform attributeName="transform" type="rotate" from="0 38 66" to="360 38 66" dur="14s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default PackDomain;
