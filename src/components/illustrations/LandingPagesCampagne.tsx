export function LandingPagesCampagne({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="lpc-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="landing-ad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.32" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="landing-page" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.18" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="landing-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="lpc-cta" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="landing-lead" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <filter id="landing-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient glow behind the CTA */}
      <circle cx="300" cy="186" r="74" fill="url(#lpc-glow)" filter="url(#landing-blur)" opacity="0.28" />

      {/* LEFT: ad creative panel */}
      <g>
        <rect x="34" y="96" width="118" height="150" rx="12" fill="url(#landing-ad)" stroke="#2e66ff" strokeWidth="1.6" strokeOpacity="0.7" />
        {/* ad badge */}
        <rect x="46" y="108" width="34" height="15" rx="4" fill="#2e66ff" />
        <text x="63" y="119" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#f2f3ee" textAnchor="middle">AD</text>
        {/* ad image block */}
        <rect x="46" y="132" width="94" height="50" rx="6" fill="#14e0c8" opacity="0.16" />
        <path d="M52 176 l16 -20 l14 16 l12 -14 l24 30" fill="none" stroke="#14e0c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        <circle cx="118" cy="146" r="6" fill="#c8f02e" opacity="0.7" />
        {/* ad copy lines */}
        <line x1="46" y1="196" x2="128" y2="196" stroke="#b9bcb2" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <line x1="46" y1="208" x2="104" y2="208" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" opacity="0.35" />
        {/* mini cta */}
        <rect x="46" y="222" width="56" height="14" rx="7" fill="#2e66ff" opacity="0.5" />
      </g>

      {/* flowing path from ad to landing page */}
      <path id="landing-conduit" d="M152 170 Q190 170 196 124" fill="none" stroke="url(#landing-flow)" strokeWidth="2" strokeDasharray="5 6" strokeLinecap="round">
        <animate attributeName="stroke-dashoffset" values="22;0" dur="1.1s" repeatCount="indefinite" />
      </path>
      <circle r="3.4" fill="#c8f02e">
        <animateMotion path="M152 170 Q190 170 196 124" dur="2.2s" repeatCount="indefinite" />
      </circle>

      {/* RIGHT: dedicated landing page (browser frame) */}
      <g>
        <rect x="216" y="64" width="150" height="244" rx="14" fill="url(#landing-page)" stroke="#14e0c8" strokeWidth="1.8" />
        {/* browser bar */}
        <path d="M216 84 a14 14 0 0 1 14 -20 h122 a14 14 0 0 1 14 14 v6 Z" fill="#14e0c8" opacity="0.12" />
        <circle cx="232" cy="76" r="3" fill="#c8f02e" />
        <circle cx="244" cy="76" r="3" fill="#22d38c" />
        <circle cx="256" cy="76" r="3" fill="#2e66ff" />
        <rect x="270" y="71" width="84" height="10" rx="5" fill="#b9bcb2" opacity="0.18" />
        {/* hero block */}
        <rect x="232" y="98" width="118" height="44" rx="6" fill="#14e0c8" opacity="0.1" />
        <line x1="244" y1="114" x2="338" y2="114" stroke="#14e0c8" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
        <line x1="244" y1="128" x2="312" y2="128" stroke="#b9bcb2" strokeWidth="2.6" strokeLinecap="round" opacity="0.4" />
        {/* form fields */}
        <rect x="232" y="156" width="118" height="14" rx="7" fill="#0a0a0b" opacity="0.25" stroke="#22d38c" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="232" y="176" width="118" height="14" rx="7" fill="#0a0a0b" opacity="0.25" stroke="#22d38c" strokeWidth="1" strokeOpacity="0.4" />
        {/* CTA button */}
        <rect x="232" y="200" width="118" height="26" rx="13" fill="url(#lpc-cta)">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="2.4s" repeatCount="indefinite" />
        </rect>
        <text x="291" y="217" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#0a0a0b" textAnchor="middle">GET OFFER</text>
        {/* trust row */}
        <g opacity="0.4">
          <line x1="232" y1="244" x2="300" y2="244" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="232" y1="256" x2="338" y2="256" stroke="#b9bcb2" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>

      {/* cursor clicking the CTA */}
      <g transform="translate(300 222)">
        <path d="M0 0 L0 20 L5 15 L9 24 L13 22 L9 13 L16 13 Z" fill="#f2f3ee" stroke="#0a0a0b" strokeWidth="1" strokeLinejoin="round" />
        <animateTransform attributeName="transform" type="translate" values="304 226;300 222;304 226" dur="2.4s" repeatCount="indefinite" />
      </g>
      {/* click ripple */}
      <circle cx="291" cy="213" r="6" fill="none" stroke="#c8f02e" strokeWidth="1.6">
        <animate attributeName="r" values="4;22;4" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0;0.9" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* captured lead dots collecting at the bottom */}
      <g>
        <path d="M291 226 Q260 320 156 336" fill="none" stroke="#c8f02e" strokeWidth="1.4" strokeOpacity="0.3" strokeDasharray="4 6" />
        <circle r="3" fill="#c8f02e"><animateMotion path="M291 226 Q260 320 156 336" dur="2.8s" repeatCount="indefinite" /></circle>
        <circle r="2.6" fill="#22d38c"><animateMotion path="M291 226 Q260 320 156 336" dur="3.4s" begin="0.8s" repeatCount="indefinite" /></circle>
      </g>
      {/* lead collection bucket */}
      <g transform="translate(120 336)">
        <circle r="26" fill="url(#landing-lead)" />
        <g fill="none" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round">
          <circle cx="0" cy="-4" r="6" />
          <path d="M-10 12 Q0 0 10 12" />
        </g>
        <circle r="20" fill="none" stroke="#c8f02e" strokeWidth="1.4">
          <animate attributeName="r" values="16;24;16" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default LandingPagesCampagne;
