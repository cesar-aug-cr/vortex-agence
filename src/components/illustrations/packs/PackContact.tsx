export function PackContact({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="pkct-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="pkct-flap" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" />
          <stop offset="0.5" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#22d38c" />
        </linearGradient>
        <linearGradient id="pkct-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="pkct-line" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="pkct-send" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="pkct-badge" cx="0.4" cy="0.35" r="0.75">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" />
        </radialGradient>
        <radialGradient id="pkct-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* soft radial backdrop */}
      <circle cx="60" cy="60" r="46" fill="url(#pkct-glow)" opacity="0.28" />

      {/* incoming-signal arcs behind the envelope */}
      <g fill="none" stroke="#14e0c8" strokeLinecap="round">
        <path d="M96 40 a18 18 0 0 1 0 32" strokeWidth="2" opacity="0.4">
          <animate attributeName="opacity" values="0.12;0.5;0.12" dur="3.6s" repeatCount="indefinite" />
        </path>
        <path d="M101 33 a26 26 0 0 1 0 46" strokeWidth="1.8" opacity="0.22">
          <animate attributeName="opacity" values="0.06;0.34;0.06" dur="3.6s" begin="0.5s" repeatCount="indefinite" />
        </path>
      </g>

      {/* message card sliding up out of the envelope */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 6;0 -3;0 6" dur="4.5s" repeatCount="indefinite" />
        <rect x="36" y="30" width="48" height="40" rx="5" fill="url(#pkct-card)" stroke="url(#pkct-frame)" strokeWidth="1.6" />
        {/* avatar dot + name bar (sender) */}
        <circle cx="45" cy="40" r="3.6" fill="#c8f02e" opacity="0.9" />
        <rect x="52" y="37" width="26" height="2.8" rx="1.4" fill="#14e0c8" opacity="0.8" />
        <rect x="52" y="42" width="16" height="2.4" rx="1.2" fill="#14e0c8" opacity="0.4" />
        {/* message body micro-text bars */}
        <rect x="42" y="52" width="36" height="2.6" rx="1.3" fill="url(#pkct-line)" />
        <rect x="42" y="58" width="36" height="2.6" rx="1.3" fill="url(#pkct-line)" opacity="0.8" />
        <rect x="42" y="64" width="22" height="2.6" rx="1.3" fill="url(#pkct-line)" opacity="0.6" />
      </g>

      {/* envelope back body */}
      <rect x="28" y="58" width="64" height="38" rx="7" fill="#0a0a0b" stroke="url(#pkct-frame)" strokeWidth="2" opacity="0.96" />

      {/* envelope front pocket (overlaps card so it reads as "inside") */}
      <path
        d="M28 62 L60 86 L92 62 L92 89 a7 7 0 0 1 -7 7 L35 96 a7 7 0 0 1 -7 -7 Z"
        fill="#0a0a0b"
        stroke="url(#pkct-frame)"
        strokeWidth="2"
      />
      {/* inner fold highlight on the pocket */}
      <path d="M28 62 L60 86 L92 62" fill="none" stroke="#14e0c8" strokeWidth="1.4" strokeLinejoin="round" opacity="0.35" />

      {/* open flap, hinged at the top, gently lifting */}
      <g>
        <animateTransform attributeName="transform" type="rotate" values="0 60 58;-3.5 60 58;0 60 58" dur="4.5s" repeatCount="indefinite" />
        <path
          d="M28 60 L60 36 L92 60"
          fill="none"
          stroke="url(#pkct-flap)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* notification badge — the most important lime highlight */}
      <g transform="translate(90,38)">
        <circle r="9.5" fill="#0a0a0b" />
        <circle r="8" fill="url(#pkct-badge)">
          <animate attributeName="r" values="7.4;8.4;7.4" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle r="13" fill="none" stroke="#c8f02e" strokeWidth="1.4" opacity="0.5">
          <animate attributeName="r" values="9;15;9" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;0;0.55" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <path d="M-1.4 -3 h2.8 v3.4 h-2.8 Z M-1.4 1.4 h2.8 v2.2 h-2.8 Z" fill="#0a0a0b" opacity="0.85" />
      </g>

      {/* short form/field line with send arrow at the base */}
      <g transform="translate(0,104)">
        <rect x="28" y="-4" width="52" height="9" rx="4.5" fill="none" stroke="#14e0c8" strokeWidth="1.5" opacity="0.55" />
        <rect x="33" y="-1.2" width="30" height="3" rx="1.5" fill="url(#pkct-line)" opacity="0.7" />
        {/* send button + arrow */}
        <circle cx="88" cy="0.5" r="8" fill="#0a0a0b" stroke="url(#pkct-send)" strokeWidth="1.8" />
        <g stroke="url(#pkct-send)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M84.5 0.5 h7 M89 -2.4 l2.5 2.9 l-2.5 2.9">
            <animate attributeName="opacity" values="0.55;1;0.55" dur="3.2s" repeatCount="indefinite" />
          </path>
        </g>
      </g>
    </svg>
  );
}

export default PackContact;
