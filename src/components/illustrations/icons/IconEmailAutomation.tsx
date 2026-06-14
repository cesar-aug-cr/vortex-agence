export function IconEmailAutomation({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="email-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <linearGradient id="email-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.12" />
        </linearGradient>
        <radialGradient id="email-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.2" />
        </radialGradient>
        <radialGradient id="email-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#email-glow)" opacity="0.22" />

      {/* envelope */}
      <g transform="translate(20,42)">
        <rect x="0" y="0" width="46" height="34" rx="4" fill="url(#email-body)" stroke="url(#email-edge)" strokeWidth="2" />
        <path d="M2 3 L23 20 L44 3" fill="none" stroke="url(#email-edge)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="opacity" values="1;0.4;1" dur="3.4s" repeatCount="indefinite" />
        </path>
      </g>

      {/* branching workflow connectors */}
      <g fill="none" stroke="url(#email-edge)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M66 59 L78 59" strokeDasharray="20" strokeDashoffset="20">
          <animate attributeName="strokeDashoffset" values="20;0;0" keyTimes="0;0.3;1" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M84 59 Q92 59 92 40 L98 40" strokeDasharray="40" strokeDashoffset="40">
          <animate attributeName="strokeDashoffset" values="40;40;0;0" keyTimes="0;0.35;0.6;1" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M84 59 Q92 59 92 78 L98 78" strokeDasharray="40" strokeDashoffset="40">
          <animate attributeName="strokeDashoffset" values="40;40;0;0" keyTimes="0;0.35;0.6;1" dur="4s" repeatCount="indefinite" />
        </path>
      </g>

      {/* trigger node (root) */}
      <g transform="translate(81,59)">
        <circle r="5" fill="url(#email-core)">
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.3;1" dur="4s" repeatCount="indefinite" />
        </circle>
        <path d="M-2 0 L0 2.4 L2.4 -2" fill="none" stroke="#0a0a0b" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <animate attributeName="opacity" values="0;1;1" keyTimes="0;0.3;1" dur="4s" repeatCount="indefinite" />
        </path>
      </g>

      {/* branch leaf nodes */}
      <g>
        <g transform="translate(103,40)">
          <circle r="5" fill="#0a0a0b" stroke="#14e0c8" strokeWidth="1.8">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.55;0.7;1" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle r="1.8" fill="#c8f02e">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.55;0.7;1" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
        <g transform="translate(103,78)">
          <circle r="5" fill="#0a0a0b" stroke="#2e66ff" strokeWidth="1.8">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.78;1" dur="4s" repeatCount="indefinite" />
          </circle>
          <circle r="1.8" fill="#14e0c8">
            <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.6;0.78;1" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* pulse traveling out of envelope */}
      <circle r="2.4" fill="#c8f02e">
        <animateMotion path="M66 59 L78 59" dur="4s" keyPoints="0;1;1" keyTimes="0;0.3;1" calcMode="linear" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;1;0" keyTimes="0;0.3;0.31" dur="4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default IconEmailAutomation;
