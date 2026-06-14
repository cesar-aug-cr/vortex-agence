export function IconLanding({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="landing-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="landing-cta" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="landing-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="landing-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="48" cy="60" r="46" fill="url(#landing-glow)" opacity="0.22" />

      {/* focused landing page */}
      <rect x="22" y="22" width="52" height="76" rx="6" fill="#0a0a0b" stroke="url(#landing-edge)" strokeWidth="2" />
      {/* hero */}
      <rect x="28" y="30" width="40" height="16" rx="3" fill="url(#landing-edge)" opacity="0.5" />
      <rect x="31" y="35" width="20" height="3" rx="1.5" fill="#0a0a0b" opacity="0.6" />
      <rect x="31" y="40" width="28" height="2.4" rx="1.2" fill="#0a0a0b" opacity="0.4" />
      {/* form fields */}
      <rect x="28" y="52" width="40" height="7" rx="2" fill="none" stroke="#14e0c8" strokeWidth="1.2" strokeOpacity="0.6" />
      <rect x="28" y="63" width="40" height="7" rx="2" fill="none" stroke="#14e0c8" strokeWidth="1.2" strokeOpacity="0.6" />
      {/* CTA button */}
      <rect x="28" y="76" width="40" height="11" rx="4" fill="url(#landing-cta)">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="2.6s" repeatCount="indefinite" />
      </rect>
      <rect x="40" y="80" width="16" height="3" rx="1.5" fill="#0a0a0b" opacity="0.7" />

      {/* magnet pulling leads */}
      <g transform="translate(94,60)">
        <path d="M-7 -10 L-7 4 Q-7 12 0 12 Q7 12 7 4 L7 -10 L1 -10 L1 4 Q1 6 0 6 Q-1 6 -1 4 L-1 -10 Z" fill="#0a0a0b" stroke="url(#landing-edge)" strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="-7" y="-10" width="8" height="5" fill="#c8f02e" />
        <rect x="-1" y="-10" width="8" height="5" fill="#2e66ff" />
      </g>

      {/* lead dots funneling toward CTA / magnet */}
      <g fill="#14e0c8">
        <circle r="2.6">
          <animateMotion path="M104 30 Q90 50 70 81" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.8;1" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle r="2.6" fill="#c8f02e">
          <animateMotion path="M108 60 Q92 68 70 81" dur="2.8s" begin="0.9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.8;1" dur="2.8s" begin="0.9s" repeatCount="indefinite" />
        </circle>
        <circle r="2.2" opacity="0.7">
          <animateMotion path="M104 92 Q90 86 70 81" dur="2.8s" begin="1.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0.8;0" keyTimes="0;0.8;1" dur="2.8s" begin="1.7s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* converging point */}
      <circle cx="70" cy="81" r="0" fill="url(#landing-core)">
        <animate attributeName="r" values="2;5;2" dur="2.8s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default IconLanding;
