export function Publicite({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="publicite-bull" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="publicite-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="publicite-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="publicite-traj" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.05" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.85" />
        </linearGradient>
        <filter id="publicite-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* center glow */}
      <circle cx="200" cy="200" r="120" fill="url(#publicite-glow)" filter="url(#publicite-blur)" opacity="0.35" />

      {/* concentric target rings */}
      <g fill="none" stroke="url(#publicite-ring)" strokeWidth="1.6">
        <circle cx="200" cy="200" r="150" opacity="0.35" strokeDasharray="3 8" />
        <circle cx="200" cy="200" r="118" opacity="0.55" />
        <circle cx="200" cy="200" r="86" opacity="0.7" />
        <circle cx="200" cy="200" r="54" opacity="0.85" />
      </g>

      {/* crosshair */}
      <g stroke="#14e0c8" strokeWidth="1" opacity="0.5">
        <line x1="200" y1="20" x2="200" y2="70" />
        <line x1="200" y1="330" x2="200" y2="380" />
        <line x1="20" y1="200" x2="70" y2="200" />
        <line x1="330" y1="200" x2="380" y2="200" />
      </g>

      {/* converging click/impression trajectories */}
      <g stroke="url(#publicite-traj)" strokeWidth="1.6" fill="none">
        <path d="M40 40 Q120 130 200 200" opacity="0.8" />
        <path d="M360 50 Q280 130 200 200" opacity="0.8" />
        <path d="M50 350 Q130 270 200 200" opacity="0.75" />
        <path d="M355 340 Q275 270 200 200" opacity="0.75" />
        <path d="M30 200 Q110 200 200 200" opacity="0.6" />
        <path d="M200 30 Q200 110 200 200" opacity="0.6" />
      </g>

      {/* impression nodes at trajectory origins */}
      <g fill="#2e66ff">
        <circle cx="40" cy="40" r="4" />
        <circle cx="360" cy="50" r="4" />
        <circle cx="50" cy="350" r="3.5" />
        <circle cx="355" cy="340" r="3.5" />
        <circle cx="30" cy="200" r="3" />
        <circle cx="200" cy="30" r="3" />
      </g>

      {/* travelling clicks converging on bullseye */}
      <g fill="#c8f02e">
        <circle r="3"><animateMotion path="M40 40 Q120 130 200 200" dur="2.8s" repeatCount="indefinite" /></circle>
        <circle r="3"><animateMotion path="M360 50 Q280 130 200 200" dur="3.3s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M50 350 Q130 270 200 200" dur="3.8s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M355 340 Q275 270 200 200" dur="3.1s" repeatCount="indefinite" /></circle>
      </g>

      {/* bullseye */}
      <circle cx="200" cy="200" r="26" fill="url(#publicite-bull)" />
      <circle cx="200" cy="200" r="14" fill="none" stroke="#c8f02e" strokeWidth="2">
        <animate attributeName="r" values="14;20;14" dur="2.2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.2;1" dur="2.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="200" cy="200" r="6" fill="#c8f02e" />
    </svg>
  );
}

export default Publicite;
