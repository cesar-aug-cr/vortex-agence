export function SeoLocal({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="seolocal-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="seolocal-radar" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.35" />
          <stop offset="0.7" stopColor="#14e0c8" stopOpacity="0.05" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="seolocal-pin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="seolocal-row" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.04" />
        </linearGradient>
        <linearGradient id="seolocal-rowtop" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.12" />
        </linearGradient>
        <filter id="seolocal-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* faint region contour */}
      <g opacity="0.4">
        <path
          d="M70 150 Q90 116 130 122 Q150 96 188 108 Q220 92 246 116 Q288 110 296 146 Q330 158 320 196 Q336 226 304 244 Q300 280 262 278 Q240 306 204 292 Q170 308 150 280 Q112 282 108 248 Q76 236 86 200 Q66 178 70 150 Z"
          fill="#14e0c8"
          fillOpacity="0.05"
          stroke="url(#seolocal-pin)"
          strokeWidth="1.4"
          strokeDasharray="4 6"
        />
      </g>

      {/* glow under pin */}
      <circle cx="190" cy="178" r="120" fill="url(#seolocal-glow)" filter="url(#seolocal-blur)" opacity="0.28" />

      {/* concentric "near me" radar rings pulsing around the pin */}
      <g transform="translate(190 168)">
        <circle r="60" fill="url(#seolocal-radar)" />
        <g fill="none" stroke="#14e0c8" strokeWidth="1.6">
          <circle r="30">
            <animate attributeName="r" values="14;72;14" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="3.6s" repeatCount="indefinite" />
          </circle>
          <circle r="30">
            <animate attributeName="r" values="14;72;14" dur="3.6s" begin="1.2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="3.6s" begin="1.2s" repeatCount="indefinite" />
          </circle>
          <circle r="30">
            <animate attributeName="r" values="14;72;14" dur="3.6s" begin="2.4s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0;0.8" dur="3.6s" begin="2.4s" repeatCount="indefinite" />
          </circle>
        </g>
        {/* static guide ring */}
        <circle r="70" fill="none" stroke="#c8f02e" strokeWidth="1" strokeDasharray="2 8" opacity="0.5" />
      </g>

      {/* glowing location pin */}
      <g transform="translate(190 130)">
        <path
          d="M0 0 C-26 0 -34 22 -22 42 C-14 56 0 72 0 72 C0 72 14 56 22 42 C34 22 26 0 0 0 Z"
          fill="url(#seolocal-pin)"
        >
          <animateTransform attributeName="transform" type="translate" values="0 -6;0 0;0 -6" dur="3s" repeatCount="indefinite" />
        </path>
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 -6;0 0;0 -6" dur="3s" repeatCount="indefinite" />
          <circle cx="0" cy="26" r="12" fill="#0a0a0b" opacity="0.5" />
          <circle cx="0" cy="26" r="7" fill="#c8f02e">
            <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* 5-star arc */}
      <g fill="#c8f02e">
        <g transform="translate(300 96)">
          <path d="M0 -7 L1.8 -2 L7 -2 L3 1.4 L4.6 6.4 L0 3.4 L-4.6 6.4 L-3 1.4 L-7 -2 L-1.8 -2 Z" />
        </g>
        <g transform="translate(318 84)">
          <path d="M0 -7 L1.8 -2 L7 -2 L3 1.4 L4.6 6.4 L0 3.4 L-4.6 6.4 L-3 1.4 L-7 -2 L-1.8 -2 Z" />
        </g>
        <g transform="translate(338 78)">
          <path d="M0 -7 L1.8 -2 L7 -2 L3 1.4 L4.6 6.4 L0 3.4 L-4.6 6.4 L-3 1.4 L-7 -2 L-1.8 -2 Z" />
        </g>
        <g transform="translate(358 84)">
          <path d="M0 -7 L1.8 -2 L7 -2 L3 1.4 L4.6 6.4 L0 3.4 L-4.6 6.4 L-3 1.4 L-7 -2 L-1.8 -2 Z" />
        </g>
        <g transform="translate(376 96)" opacity="0.5">
          <path d="M0 -7 L1.8 -2 L7 -2 L3 1.4 L4.6 6.4 L0 3.4 L-4.6 6.4 L-3 1.4 L-7 -2 L-1.8 -2 Z" />
        </g>
      </g>

      {/* ranked local-pack list (3 results) */}
      <g>
        {/* winner */}
        <g>
          <rect x="64" y="296" width="272" height="30" rx="9" fill="url(#seolocal-rowtop)" stroke="#c8f02e" strokeWidth="1.2">
            <animate attributeName="opacity" values="1;0.6;1" dur="3s" repeatCount="indefinite" />
          </rect>
          <g transform="translate(80 311)">
            <path d="M0 -6 C-5 -6 -7 -2 -4 4 L0 11 L4 4 C7 -2 5 -6 0 -6 Z" fill="#0a0a0b" opacity="0.6" />
            <circle cx="0" cy="-1" r="2.2" fill="#c8f02e" />
          </g>
          <text x="96" y="306" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#0a0a0b">#1</text>
          <line x1="116" y1="304" x2="244" y2="304" stroke="#0a0a0b" strokeWidth="2.6" strokeLinecap="round" opacity="0.55" />
          <g fill="#c8f02e" transform="translate(282 308)">
            <circle cx="0" cy="0" r="2" /><circle cx="9" cy="0" r="2" /><circle cx="18" cy="0" r="2" /><circle cx="27" cy="0" r="2" /><circle cx="36" cy="0" r="2" opacity="0.4" />
          </g>
        </g>
        {/* #2 */}
        <g opacity="0.85">
          <rect x="64" y="334" width="240" height="26" rx="8" fill="url(#seolocal-row)" />
          <circle cx="82" cy="347" r="6" fill="#14e0c8" />
          <text x="78.5" y="350.5" fontFamily="monospace" fontSize="8" fill="#0a0a0b">2</text>
          <line x1="98" y1="347" x2="220" y2="347" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" opacity="0.45" />
        </g>
        {/* #3 */}
        <g opacity="0.65">
          <rect x="64" y="368" width="210" height="24" rx="8" fill="url(#seolocal-row)" />
          <circle cx="82" cy="380" r="6" fill="#2e66ff" />
          <text x="78.5" y="383.5" fontFamily="monospace" fontSize="8" fill="#0a0a0b">3</text>
          <line x1="98" y1="380" x2="196" y2="380" stroke="#b9bcb2" strokeWidth="2.4" strokeLinecap="round" opacity="0.4" />
        </g>
      </g>

      {/* scattered nearby search dots */}
      <g fill="#2e66ff" opacity="0.7">
        <circle cx="96" cy="96" r="2.4" />
        <circle cx="300" cy="200" r="2.6" />
        <circle cx="76" cy="232" r="2" />
        <circle cx="288" cy="252" r="2.2" />
      </g>
    </svg>
  );
}

export default SeoLocal;
