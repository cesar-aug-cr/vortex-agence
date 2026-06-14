export function IconAiAgent({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ai-agent-frame" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#2e66ff" />
        </linearGradient>
        <radialGradient id="ai-agent-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.25" />
        </radialGradient>
        <radialGradient id="ai-agent-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="60" cy="60" r="46" fill="url(#ai-agent-glow)" opacity="0.3" />

      {/* connectors to sub-task nodes */}
      <g stroke="url(#ai-agent-frame)" strokeWidth="1.2" fill="none" opacity="0.8">
        <line x1="60" y1="60" x2="60" y2="26" />
        <line x1="60" y1="60" x2="92" y2="42" />
        <line x1="60" y1="60" x2="92" y2="78" />
        <line x1="60" y1="60" x2="60" y2="94" />
        <line x1="60" y1="60" x2="28" y2="78" />
        <line x1="60" y1="60" x2="28" y2="42" />
      </g>

      {/* hexagonal brain core */}
      <g transform="translate(60,60)">
        <path d="M0 -16 L14 -8 L14 8 L0 16 L-14 8 L-14 -8 Z" fill="url(#ai-agent-core)" stroke="url(#ai-agent-frame)" strokeWidth="1.8" strokeLinejoin="round">
          <animateTransform attributeName="transform" type="scale" values="1;1.06;1" dur="3.6s" repeatCount="indefinite" />
        </path>
        {/* neuron network inside */}
        <g stroke="#0a0a0b" strokeWidth="1" fill="none" opacity="0.8">
          <path d="M-7 -4 L0 0 L7 -4 M0 0 L-4 6 M0 0 L5 6" />
        </g>
        <circle r="2" fill="#0a0a0b" />
        <g fill="#0a0a0b">
          <circle cx="-7" cy="-4" r="1.4" />
          <circle cx="7" cy="-4" r="1.4" />
          <circle cx="-4" cy="6" r="1.4" />
          <circle cx="5" cy="6" r="1.4" />
        </g>
      </g>

      {/* orbiting sub-task nodes lighting in sequence */}
      <g>
        <circle cx="60" cy="26" r="4" fill="#14e0c8" stroke="url(#ai-agent-frame)" strokeWidth="1.4">
          <animate attributeName="r" values="3;5;3" dur="4.2s" begin="0s" repeatCount="indefinite" />
        </circle>
        <circle cx="92" cy="42" r="4" fill="#22d38c" stroke="url(#ai-agent-frame)" strokeWidth="1.4">
          <animate attributeName="r" values="3;5;3" dur="4.2s" begin="0.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="92" cy="78" r="4" fill="#2e66ff" stroke="url(#ai-agent-frame)" strokeWidth="1.4">
          <animate attributeName="r" values="3;5;3" dur="4.2s" begin="1.4s" repeatCount="indefinite" />
        </circle>
        <circle cx="60" cy="94" r="4" fill="#c8f02e" stroke="url(#ai-agent-frame)" strokeWidth="1.4">
          <animate attributeName="r" values="3;5;3" dur="4.2s" begin="2.1s" repeatCount="indefinite" />
        </circle>
        <circle cx="28" cy="78" r="4" fill="#14e0c8" stroke="url(#ai-agent-frame)" strokeWidth="1.4">
          <animate attributeName="r" values="3;5;3" dur="4.2s" begin="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="28" cy="42" r="4" fill="#22d38c" stroke="url(#ai-agent-frame)" strokeWidth="1.4">
          <animate attributeName="r" values="3;5;3" dur="4.2s" begin="3.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* outer orbit ring */}
      <g transform="translate(60,60)" stroke="#c8f02e" strokeWidth="0.9" fill="none" opacity="0.45">
        <circle r="38" strokeDasharray="3 7">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default IconAiAgent;
