export function BrandingDesign({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="branding-grid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.4" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="branding-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="branding-c1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <linearGradient id="branding-c2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <radialGradient id="branding-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.7" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <filter id="branding-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* modular baseline grid */}
      <g stroke="url(#branding-grid)" strokeWidth="1">
        <line x1="40" y1="80" x2="360" y2="80" />
        <line x1="40" y1="140" x2="360" y2="140" />
        <line x1="40" y1="200" x2="360" y2="200" />
        <line x1="40" y1="260" x2="360" y2="260" />
        <line x1="40" y1="320" x2="360" y2="320" />
        <line x1="80" y1="40" x2="80" y2="360" />
        <line x1="140" y1="40" x2="140" y2="360" />
        <line x1="200" y1="40" x2="200" y2="360" />
        <line x1="260" y1="40" x2="260" y2="360" />
        <line x1="320" y1="40" x2="320" y2="360" />
      </g>
      {/* grid intersection ticks */}
      <g fill="#14e0c8" opacity="0.4">
        <circle cx="80" cy="80" r="1.6" />
        <circle cx="200" cy="80" r="1.6" />
        <circle cx="320" cy="80" r="1.6" />
        <circle cx="80" cy="200" r="1.6" />
        <circle cx="320" cy="200" r="1.6" />
        <circle cx="80" cy="320" r="1.6" />
        <circle cx="200" cy="320" r="1.6" />
        <circle cx="320" cy="320" r="1.6" />
      </g>

      {/* glow behind mark */}
      <circle cx="200" cy="200" r="90" fill="url(#branding-glow)" filter="url(#branding-blur)" opacity="0.4" />

      {/* abstract chromatic circle — overlapping arcs */}
      <g fill="none" strokeWidth="14" strokeLinecap="round" opacity="0.85">
        <path d="M200 120 A80 80 0 0 1 280 200" stroke="url(#branding-c1)" />
        <path d="M280 200 A80 80 0 0 1 200 280" stroke="url(#branding-c2)" />
        <path d="M200 280 A80 80 0 0 1 120 200" stroke="#22d38c" opacity="0.7" />
        <path d="M120 200 A80 80 0 0 1 200 120" stroke="#2e66ff" opacity="0.6" />
      </g>

      {/* modular shape system — corner tokens */}
      <rect x="62" y="62" width="26" height="26" rx="4" fill="none" stroke="#c8f02e" strokeWidth="2" />
      <circle cx="325" cy="75" r="14" fill="none" stroke="#14e0c8" strokeWidth="2" />
      <path d="M62 312 L88 312 L75 338 Z" fill="none" stroke="#2e66ff" strokeWidth="2" strokeLinejoin="round" />
      <rect x="312" y="312" width="26" height="26" rx="13" fill="url(#branding-mark)" opacity="0.6" />

      {/* central brand mark — abstract "V" vortex */}
      <g>
        <circle cx="200" cy="200" r="34" fill="none" stroke="#c8f02e" strokeWidth="2">
          <animateTransform attributeName="transform" type="rotate" from="0 200 200" to="360 200 200" dur="28s" repeatCount="indefinite" />
        </circle>
        <path
          d="M178 184 L200 224 L222 184"
          fill="none"
          stroke="url(#branding-mark)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="200" cy="200" r="4" fill="#c8f02e" />
      </g>

      {/* type-specimen baseline chips */}
      <g fill="url(#branding-grid)">
        <rect x="120" y="332" width="40" height="6" rx="3" opacity="0.7" />
        <rect x="170" y="332" width="60" height="6" rx="3" opacity="0.5" />
        <rect x="240" y="332" width="34" height="6" rx="3" opacity="0.4" />
      </g>
    </svg>
  );
}

export default BrandingDesign;
