export function IaContenuGeneratif({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="iacontenu-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.82" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="iacontenu-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="iacontenu-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.12" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="iacontenu-variant" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.2" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="iacontenu-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="iacontenu-pen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="iacontenu-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.1" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.9" />
        </linearGradient>
        <filter id="iacontenu-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient glow */}
      <circle cx="180" cy="180" r="118" fill="url(#iacontenu-glow)" filter="url(#iacontenu-blur)" opacity="0.26" />

      {/* multilingual content variants fanning out behind the card */}
      <g>
        <g transform="rotate(8 150 170)" opacity="0.5">
          <rect x="92" y="74" width="156" height="196" rx="14" fill="url(#iacontenu-variant)" stroke="#2e66ff" strokeWidth="1.2" strokeOpacity="0.5" />
          <text x="104" y="94" fontFamily="monospace" fontSize="8" fill="#2e66ff">DE</text>
        </g>
        <g transform="rotate(4 150 170)" opacity="0.7">
          <rect x="88" y="70" width="156" height="196" rx="14" fill="url(#iacontenu-variant)" stroke="#14e0c8" strokeWidth="1.2" strokeOpacity="0.6" />
          <text x="100" y="90" fontFamily="monospace" fontSize="8" fill="#14e0c8">EN</text>
        </g>
      </g>

      {/* main content card (FR) being generated */}
      <g>
        <rect x="78" y="66" width="170" height="206" rx="16" fill="url(#iacontenu-card)" stroke="#14e0c8" strokeWidth="1.6" />
        {/* title chip */}
        <g transform="translate(94 82)">
          <rect width="40" height="16" rx="5" fill="#c8f02e" />
          <text x="20" y="12" fontFamily="monospace" fontSize="8.5" fontWeight="700" fill="#0a0a0b" textAnchor="middle">FR</text>
        </g>
        <line x1="142" y1="90" x2="232" y2="90" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round" opacity="0.75" />

        {/* generated text lines (revealing with widths animating) */}
        <g strokeLinecap="round">
          <line x1="94" y1="122" x2="232" y2="122" stroke="#b9bcb2" strokeWidth="2.6" opacity="0.5" />
          <line x1="94" y1="136" x2="216" y2="136" stroke="#b9bcb2" strokeWidth="2.6" opacity="0.45" />
          <line x1="94" y1="150" x2="228" y2="150" stroke="#b9bcb2" strokeWidth="2.6" opacity="0.4" />
          <line x1="94" y1="164" x2="200" y2="164" stroke="#b9bcb2" strokeWidth="2.6" opacity="0.35" />
          {/* the line currently being written */}
          <line x1="94" y1="178" x2="120" y2="178" stroke="url(#iacontenu-line)" strokeWidth="3">
            <animate attributeName="x2" values="100;188;100" dur="3.4s" repeatCount="indefinite" />
          </line>
        </g>

        {/* writing cursor / pen tip on the active line */}
        <g>
          <g transform="translate(120 178)">
            <animateTransform attributeName="transform" type="translate" values="100 178;188 178;100 178" dur="3.4s" repeatCount="indefinite" />
            <path d="M0 0 l22 -22 l8 8 l-22 22 l-10 2 z" fill="url(#iacontenu-pen)" />
            <path d="M0 0 l-3 8 l8 -3 z" fill="#c8f02e" />
            <line x1="0" y1="-12" x2="0" y2="12" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round">
              <animate attributeName="opacity" values="1;0.2;1" dur="0.9s" repeatCount="indefinite" />
            </line>
          </g>
        </g>

        {/* placeholder for remaining paragraph */}
        <g opacity="0.25">
          <line x1="94" y1="200" x2="226" y2="200" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="94" y1="214" x2="210" y2="214" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* brand-voice check node */}
        <g transform="translate(94 236)">
          <rect width="138" height="22" rx="7" fill="#22d38c" opacity="0.12" stroke="#22d38c" strokeWidth="1.2" />
          <circle cx="15" cy="11" r="7" fill="none" stroke="#22d38c" strokeWidth="1.6" />
          <path d="M11 11 l3 3 l5 -6" fill="none" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="2.4s" repeatCount="indefinite" />
          </path>
          <text x="30" y="15" fontFamily="monospace" fontSize="8" fill="#22d38c">brand voice</text>
        </g>
      </g>

      {/* AI sparkles */}
      <g fill="#c8f02e">
        <g transform="translate(286 110)">
          <path d="M0 -14 L3 -3 L14 0 L3 3 L0 14 L-3 3 L-14 0 L-3 -3 Z">
            <animateTransform attributeName="transform" type="scale" values="1;1.3;1" dur="2.4s" repeatCount="indefinite" additive="sum" />
          </path>
        </g>
        <g transform="translate(312 150)" fill="#14e0c8">
          <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z">
            <animateTransform attributeName="transform" type="scale" values="1;1.4;1" dur="2s" begin="0.6s" repeatCount="indefinite" additive="sum" />
          </path>
        </g>
        <g transform="translate(300 70)" fill="#22d38c">
          <path d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z">
            <animateTransform attributeName="transform" type="scale" values="1;1.5;1" dur="2.6s" begin="1s" repeatCount="indefinite" additive="sum" />
          </path>
        </g>
      </g>

      {/* generative AI core feeding the card */}
      <g transform="translate(300 280)">
        <circle r="40" fill="url(#iacontenu-core)" />
        <circle r="26" fill="#0a0a0b" opacity="0.45" stroke="#c8f02e" strokeWidth="1.6" />
        {/* spark glyph in core */}
        <path d="M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4 Z" fill="#c8f02e" />
        <circle r="30" fill="none" stroke="#c8f02e" strokeWidth="1.5">
          <animate attributeName="r" values="30;38;30" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;0;0.6" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* flow from AI core into the card */}
      <g fill="none" stroke="url(#iacontenu-flow)" strokeWidth="1.8" opacity="0.7">
        <path d="M268 262 Q220 230 188 200" />
      </g>
      <g fill="#c8f02e">
        <circle r="3"><animateMotion path="M268 262 Q220 230 188 200" dur="2.6s" repeatCount="indefinite" /></circle>
        <circle r="2.4" fill="#14e0c8"><animateMotion path="M268 262 Q220 230 188 200" dur="2.6s" begin="1.1s" repeatCount="indefinite" /></circle>
      </g>
    </svg>
  );
}

export default IaContenuGeneratif;
