export function LinkedinAds({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="linkedinads-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="linkedinads-target" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="linkedinads-avatar" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="linkedinads-net" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="linkedinads-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="linkedinads-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <filter id="linkedinads-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient glow behind target */}
      <circle cx="158" cy="146" r="110" fill="url(#linkedinads-glow)" filter="url(#linkedinads-blur)" opacity="0.28" />

      {/* network edges between professional nodes */}
      <g stroke="url(#linkedinads-net)" strokeWidth="1.4" fill="none" opacity="0.6">
        <path d="M72 78 L158 146" />
        <path d="M250 70 L158 146" />
        <path d="M64 192 L158 146" />
        <path d="M252 196 L158 146" />
        <path d="M72 78 L250 70" />
        <path d="M64 192 L72 78" />
        <path d="M252 196 L250 70" />
      </g>

      {/* peripheral avatar nodes */}
      <g>
        {[
          { x: 72, y: 78, r: 17 },
          { x: 250, y: 70, r: 17 },
          { x: 64, y: 192, r: 16 },
          { x: 252, y: 196, r: 16 },
        ].map((n, i) => (
          <g key={i} transform={`translate(${n.x} ${n.y})`}>
            <circle r={n.r} fill="url(#linkedinads-avatar)" stroke="#2e66ff" strokeWidth="1.4" strokeOpacity="0.7" />
            <circle cy={-n.r * 0.22} r={n.r * 0.32} fill="#14e0c8" opacity="0.85" />
            <path d={`M${-n.r * 0.55} ${n.r * 0.5} a${n.r * 0.55} ${n.r * 0.5} 0 0 1 ${n.r * 1.1} 0 Z`} fill="#14e0c8" opacity="0.7" />
          </g>
        ))}
      </g>

      {/* travelling connection pulses toward decision-maker */}
      <g fill="#14e0c8">
        <circle r="2.6"><animateMotion path="M72 78 L158 146" dur="2.4s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M250 70 L158 146" dur="2.8s" begin="0.6s" repeatCount="indefinite" /></circle>
        <circle r="2.4"><animateMotion path="M64 192 L158 146" dur="3s" begin="1.2s" repeatCount="indefinite" /></circle>
        <circle r="2.4"><animateMotion path="M252 196 L158 146" dur="3.2s" begin="1.8s" repeatCount="indefinite" /></circle>
      </g>

      {/* targeting reticle locking onto decision-maker node */}
      <g transform="translate(158 146)">
        <circle r="46" fill="url(#linkedinads-target)" opacity="0.55" />
        {/* decision-maker avatar (highlighted) */}
        <circle r="26" fill="#0a0a0b" opacity="0.5" stroke="#c8f02e" strokeWidth="1.8" />
        <circle cy="-7" r="9" fill="#c8f02e" />
        <path d="M-15 14 a15 13 0 0 1 30 0 Z" fill="#c8f02e" />
        {/* star marker = key decision maker */}
        <g transform="translate(18 -18)" fill="#c8f02e">
          <path d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z" />
        </g>
        {/* reticle ring + ticks */}
        <g stroke="#c8f02e" strokeWidth="2" fill="none">
          <circle r="38" strokeDasharray="10 8">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="9s" repeatCount="indefinite" />
          </circle>
          <line x1="0" y1="-50" x2="0" y2="-40" />
          <line x1="0" y1="40" x2="0" y2="50" />
          <line x1="-50" y1="0" x2="-40" y2="0" />
          <line x1="40" y1="0" x2="50" y2="0" />
        </g>
        {/* lock pulse */}
        <circle r="32" fill="none" stroke="#c8f02e" strokeWidth="1.5">
          <animate attributeName="r" values="32;44;32" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* qualified leads flowing down toward pipeline + conversion */}
      <g fill="none" stroke="url(#linkedinads-flow)" strokeWidth="1.8">
        <path d="M158 192 Q200 250 244 300" opacity="0.75" />
        <path d="M158 192 Q180 256 232 314" opacity="0.6" />
        <path d="M158 192 Q160 260 220 322" opacity="0.55" />
      </g>
      <g fill="#c8f02e">
        <circle r="3"><animateMotion path="M158 192 Q200 250 244 300" dur="2.8s" repeatCount="indefinite" /></circle>
        <circle r="2.6"><animateMotion path="M158 192 Q180 256 232 314" dur="3.2s" begin="0.9s" repeatCount="indefinite" /></circle>
        <circle r="2.4" fill="#14e0c8"><animateMotion path="M158 192 Q160 260 220 322" dur="3.6s" begin="1.6s" repeatCount="indefinite" /></circle>
      </g>

      {/* rising pipeline / funnel bars filling */}
      <g>
        <rect x="282" y="220" width="86" height="132" rx="10" fill="#2e66ff" opacity="0.06" stroke="#2e66ff" strokeWidth="1" strokeOpacity="0.3" />
        <line x1="290" y1="340" x2="360" y2="340" stroke="#b9bcb2" strokeWidth="1" opacity="0.4" />
        {/* bars */}
        <g>
          <rect x="298" y="312" width="14" height="28" rx="3" fill="url(#linkedinads-bar)" opacity="0.7" />
          <rect x="318" y="290" width="14" height="50" rx="3" fill="url(#linkedinads-bar)" opacity="0.8" />
          <rect x="338" y="262" width="14" height="78" rx="3" fill="url(#linkedinads-bar)">
            <animate attributeName="height" values="40;78;40" dur="3.4s" repeatCount="indefinite" />
            <animate attributeName="y" values="300;262;300" dur="3.4s" repeatCount="indefinite" />
          </rect>
        </g>
        {/* rising trend arrow */}
        <path d="M298 326 L320 308 L340 286 L356 250" fill="none" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        <path d="M348 250 L356 250 L356 258" fill="none" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* conversion node — leads converging */}
      <g transform="translate(236 332)">
        <circle r="30" fill="url(#linkedinads-target)" />
        <circle r="19" fill="#0a0a0b" opacity="0.4" stroke="#c8f02e" strokeWidth="1.6" />
        <path d="M-8 0 l6 7 l11 -14" fill="none" stroke="#c8f02e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <circle r="23" fill="none" stroke="#c8f02e" strokeWidth="1.4">
          <animate attributeName="r" values="23;30;23" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default LinkedinAds;
