export function IconLocalSeo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="local-seo-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="local-seo-pin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <radialGradient id="local-seo-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="44" fill="url(#local-seo-glow)" opacity="0.28" />

      {/* faint region contour */}
      <path d="M22 58 L34 44 L50 50 L62 38 L82 46 L96 40 L98 66 L84 78 L64 74 L48 84 L30 78 Z"
        fill="none" stroke="#b9bcb2" strokeWidth="1.1" opacity="0.4" strokeLinejoin="round" />

      {/* concentric near-me radar rings */}
      <g fill="none" stroke="url(#local-seo-frame)" strokeWidth="1.4">
        <circle cx="60" cy="64" r="10" opacity="0">
          <animate attributeName="r" values="6;30" dur="3.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="3.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="64" r="10" opacity="0">
          <animate attributeName="r" values="6;30" dur="3.4s" begin="1.7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0" dur="3.4s" begin="1.7s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* location pin */}
      <g transform="translate(60,44)">
        <path d="M0 0 C-12 0 -14 14 0 30 C14 14 12 0 0 0 Z" fill="url(#local-seo-pin)" stroke="url(#local-seo-frame)" strokeWidth="1.8" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="translate" values="0 -2;0 0;0 -2" dur="3.2s" repeatCount="indefinite" />
        </path>
        <circle cx="0" cy="12" r="4.2" fill="#0a0a0b" />
      </g>

      {/* small 5-star arc orbiting */}
      <g transform="translate(60,64)">
        <g>
          <animateTransform attributeName="transform" type="rotate" values="-12;12;-12" dur="6s" repeatCount="indefinite" />
          <g fill="#c8f02e" transform="translate(0,-30)">
            <path d="M0 -3 l0.9 2 2.1 0.2 -1.6 1.4 0.5 2.1 -1.9 -1.1 -1.9 1.1 0.5 -2.1 -1.6 -1.4 2.1 -0.2 Z" transform="translate(-20,2)" opacity="0.7" />
            <path d="M0 -3 l0.9 2 2.1 0.2 -1.6 1.4 0.5 2.1 -1.9 -1.1 -1.9 1.1 0.5 -2.1 -1.6 -1.4 2.1 -0.2 Z" transform="translate(-10,-1)" opacity="0.85" />
            <path d="M0 -3.4 l1 2.3 2.4 0.2 -1.8 1.6 0.6 2.4 -2.2 -1.3 -2.2 1.3 0.6 -2.4 -1.8 -1.6 2.4 -0.2 Z" />
            <path d="M0 -3 l0.9 2 2.1 0.2 -1.6 1.4 0.5 2.1 -1.9 -1.1 -1.9 1.1 0.5 -2.1 -1.6 -1.4 2.1 -0.2 Z" transform="translate(10,-1)" opacity="0.85" />
            <path d="M0 -3 l0.9 2 2.1 0.2 -1.6 1.4 0.5 2.1 -1.9 -1.1 -1.9 1.1 0.5 -2.1 -1.6 -1.4 2.1 -0.2 Z" transform="translate(20,2)" opacity="0.7" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default IconLocalSeo;
