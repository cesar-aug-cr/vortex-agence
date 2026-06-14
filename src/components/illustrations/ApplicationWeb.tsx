export function ApplicationWeb({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="application-web-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="application-web-panel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="application-web-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="application-web-api" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.2" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.85" />
        </linearGradient>
        <radialGradient id="application-web-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="application-web-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <filter id="application-web-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient halo */}
      <circle cx="200" cy="200" r="150" fill="url(#application-web-glow)" filter="url(#application-web-blur)" opacity="0.25" />

      {/* main dashboard panel */}
      <g stroke="url(#application-web-frame)" strokeWidth="2" fill="none">
        <rect x="100" y="48" width="200" height="148" rx="12" />
        <line x1="100" y1="74" x2="300" y2="74" strokeWidth="1.4" />
        <line x1="148" y1="74" x2="148" y2="196" strokeWidth="1.2" strokeOpacity="0.6" />
      </g>
      <rect x="100" y="48" width="200" height="148" rx="12" fill="#14e0c8" opacity="0.04" />
      <g fill="#c8f02e">
        <circle cx="113" cy="61" r="2.4" />
        <circle cx="122" cy="61" r="2.4" opacity="0.7" />
        <circle cx="131" cy="61" r="2.4" opacity="0.45" />
      </g>

      {/* sidebar nav items */}
      <g>
        <rect x="110" y="86" width="28" height="7" rx="3.5" fill="#c8f02e" opacity="0.8" />
        <rect x="110" y="102" width="28" height="7" rx="3.5" fill="#b9bcb2" opacity="0.4" />
        <rect x="110" y="118" width="28" height="7" rx="3.5" fill="#b9bcb2" opacity="0.4" />
        <rect x="110" y="134" width="28" height="7" rx="3.5" fill="#b9bcb2" opacity="0.4" />
      </g>

      {/* assembling chart bars */}
      <g>
        <rect x="162" y="150" width="14" height="34" rx="3" fill="url(#application-web-bar)">
          <animate attributeName="height" values="0;34;34" keyTimes="0;0.5;1" dur="4s" repeatCount="indefinite" />
          <animate attributeName="y" values="184;150;150" keyTimes="0;0.5;1" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="184" y="138" width="14" height="46" rx="3" fill="url(#application-web-bar)">
          <animate attributeName="height" values="0;46;46" keyTimes="0;0.55;1" dur="4s" repeatCount="indefinite" />
          <animate attributeName="y" values="184;138;138" keyTimes="0;0.55;1" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="206" y="158" width="14" height="26" rx="3" fill="url(#application-web-bar)" opacity="0.85">
          <animate attributeName="height" values="0;26;26" keyTimes="0;0.6;1" dur="4s" repeatCount="indefinite" />
          <animate attributeName="y" values="184;158;158" keyTimes="0;0.6;1" dur="4s" repeatCount="indefinite" />
        </rect>
        <rect x="228" y="126" width="14" height="58" rx="3" fill="#c8f02e" opacity="0.85">
          <animate attributeName="height" values="0;58;58" keyTimes="0;0.65;1" dur="4s" repeatCount="indefinite" />
          <animate attributeName="y" values="184;126;126" keyTimes="0;0.65;1" dur="4s" repeatCount="indefinite" />
        </rect>
        {/* mini stat tile */}
        <rect x="258" y="88" width="32" height="24" rx="5" fill="url(#application-web-panel)" />
        <line x1="264" y1="100" x2="284" y2="100" stroke="#14e0c8" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* gear-modules around the dashboard */}
      <g stroke="url(#application-web-frame)" strokeWidth="2" fill="#0a0a0b" fillOpacity="0.25">
        <g transform="translate(64,118)">
          <circle r="20" />
          <circle r="8" fill="none" />
          <g>
            <path d="M0 -20 v-7 M0 20 v7 M-20 0 h-7 M20 0 h7 M14 -14 l5 -5 M-14 14 l-5 5 M14 14 l5 5 M-14 -14 l-5 -5" strokeLinecap="round" />
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="9s" repeatCount="indefinite" />
          </g>
        </g>
        <g transform="translate(338,116)">
          <circle r="16" />
          <circle r="6" fill="none" />
          <g>
            <path d="M0 -16 v-6 M0 16 v6 M-16 0 h-6 M16 0 h6 M11 -11 l4 -4 M-11 11 l-4 4 M11 11 l4 4 M-11 -11 l-4 -4" strokeLinecap="round" />
            <animateTransform attributeName="transform" type="rotate" from="360" to="0" dur="7s" repeatCount="indefinite" />
          </g>
        </g>
      </g>

      {/* user / back-office nodes */}
      <g>
        <g transform="translate(72,300)">
          <circle r="22" fill="#14e0c8" opacity="0.1" stroke="url(#application-web-frame)" strokeWidth="2" />
          <circle cx="0" cy="-5" r="6" fill="none" stroke="#c8f02e" strokeWidth="2" />
          <path d="M-10 11 a10 9 0 0 1 20 0" fill="none" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round" />
        </g>
        <g transform="translate(328,300)">
          <circle r="22" fill="#2e66ff" opacity="0.1" stroke="url(#application-web-frame)" strokeWidth="2" />
          <rect x="-9" y="-9" width="18" height="14" rx="2" fill="none" stroke="#c8f02e" strokeWidth="2" />
          <line x1="-9" y1="-3" x2="9" y2="-3" stroke="#c8f02e" strokeWidth="1.4" />
          <line x1="-4" y1="9" x2="4" y2="9" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round" />
        </g>
      </g>

      {/* API lines linking modules + nodes to the core */}
      <g stroke="url(#application-web-api)" strokeWidth="1.6" fill="none">
        <path d="M84 118 Q140 130 160 196" opacity="0.6" />
        <path d="M322 116 Q260 130 240 196" opacity="0.6" />
        <path d="M82 282 Q140 250 178 220" opacity="0.55" />
        <path d="M318 282 Q260 250 222 220" opacity="0.55" />
        <path d="M160 196 Q180 280 200 318" opacity="0.6" />
        <path d="M240 196 Q220 280 200 318" opacity="0.6" />
      </g>

      {/* data dots flowing along the API lines */}
      <g fill="#c8f02e">
        <circle r="2.8"><animateMotion path="M84 118 Q140 130 160 196" dur="3.2s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M322 116 Q260 130 240 196" dur="3.6s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M82 282 Q140 250 178 220" dur="4s" repeatCount="indefinite" /></circle>
        <circle r="2.4"><animateMotion path="M318 282 Q260 250 222 220" dur="4.4s" repeatCount="indefinite" /></circle>
        <circle r="3"><animateMotion path="M160 196 Q180 280 200 318" dur="2.9s" repeatCount="indefinite" /></circle>
        <circle r="3"><animateMotion path="M240 196 Q220 280 200 318" dur="3.3s" repeatCount="indefinite" /></circle>
      </g>

      {/* central platform core */}
      <circle cx="200" cy="332" r="48" fill="url(#application-web-glow)" filter="url(#application-web-blur)" opacity="0.45" />
      <circle cx="200" cy="332" r="28" fill="url(#application-web-core)" />
      <circle cx="200" cy="332" r="18" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="18;24;18" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="332" r="12" fill="#0a0a0b" opacity="0.35" />
      {/* hub glyph — interlocking nodes */}
      <g fill="#c8f02e">
        <circle cx="200" cy="326" r="2.6" />
        <circle cx="194" cy="336" r="2.6" />
        <circle cx="206" cy="336" r="2.6" />
        <line x1="200" y1="326" x2="194" y2="336" stroke="#c8f02e" strokeWidth="1.4" />
        <line x1="200" y1="326" x2="206" y2="336" stroke="#c8f02e" strokeWidth="1.4" />
        <line x1="194" y1="336" x2="206" y2="336" stroke="#c8f02e" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

export default ApplicationWeb;
