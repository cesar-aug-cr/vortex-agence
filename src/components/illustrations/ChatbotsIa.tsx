export function ChatbotsIa({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="chatbots-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.8" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="chatbots-core" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="chatbots-window" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.1" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="chatbots-bubuser" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="chatbots-bubbot" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.32" />
          <stop offset="1" stopColor="#22d38c" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="chatbots-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <filter id="chatbots-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* ambient glow */}
      <circle cx="180" cy="170" r="120" fill="url(#chatbots-glow)" filter="url(#chatbots-blur)" opacity="0.26" />

      {/* chat window */}
      <g>
        <rect x="60" y="56" width="240" height="222" rx="18" fill="url(#chatbots-window)" stroke="#14e0c8" strokeWidth="1.6" />
        {/* header bar */}
        <line x1="60" y1="86" x2="300" y2="86" stroke="#14e0c8" strokeWidth="1" strokeOpacity="0.4" />
        <circle cx="80" cy="71" r="4.5" fill="#c8f02e" />
        <circle cx="82" cy="71" r="2.6" fill="#0a0a0b" opacity="0.5" />
        <text x="96" y="74.5" fontFamily="monospace" fontSize="9" fill="#b9bcb2">assistant</text>
        <circle cx="284" cy="71" r="3" fill="#22d38c">
          <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* bot bubble 1 (left) */}
        <g>
          <path d="M80 104 h96 a10 10 0 0 1 10 10 v18 a10 10 0 0 1 -10 10 h-86 l-12 10 v-10 a10 10 0 0 1 -8 -10 v-18 a10 10 0 0 1 10 -10 Z" fill="url(#chatbots-bubbot)" stroke="#c8f02e" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="92" y1="118" x2="170" y2="118" stroke="#c8f02e" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
          <line x1="92" y1="128" x2="150" y2="128" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* user bubble (right) */}
        <g>
          <path d="M280 158 h-96 a10 10 0 0 0 -10 10 v18 a10 10 0 0 0 10 10 h86 l12 10 v-10 a10 10 0 0 0 8 -10 v-18 a10 10 0 0 0 -10 -10 Z" fill="url(#chatbots-bubuser)" stroke="#2e66ff" strokeWidth="1.2" strokeOpacity="0.6" />
          <line x1="188" y1="172" x2="266" y2="172" stroke="#14e0c8" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
          <line x1="188" y1="182" x2="240" y2="182" stroke="#b9bcb2" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </g>

        {/* bot typing bubble (left, animated dots) */}
        <g>
          <path d="M80 214 h54 a10 10 0 0 1 10 10 v12 a10 10 0 0 1 -10 10 h-44 l-12 9 v-9 a10 10 0 0 1 -8 -10 v-12 a10 10 0 0 1 10 -10 Z" fill="url(#chatbots-bubbot)" stroke="#c8f02e" strokeWidth="1.2" strokeOpacity="0.6" />
          <circle cx="92" cy="230" r="3" fill="#c8f02e">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="104" cy="230" r="3" fill="#c8f02e">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="116" cy="230" r="3" fill="#c8f02e">
            <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* multilingual tags */}
      <g fontFamily="monospace" fontSize="9" fontWeight="700">
        <g transform="translate(60 290)">
          <rect width="34" height="20" rx="6" fill="#c8f02e" />
          <text x="17" y="14" fill="#0a0a0b" textAnchor="middle">FR</text>
        </g>
        <g transform="translate(100 290)">
          <rect width="34" height="20" rx="6" fill="#0a0a0b" opacity="0.5" stroke="#14e0c8" strokeWidth="1.2" />
          <text x="17" y="14" fill="#14e0c8" textAnchor="middle">DE</text>
        </g>
        <g transform="translate(140 290)">
          <rect width="34" height="20" rx="6" fill="#0a0a0b" opacity="0.5" stroke="#22d38c" strokeWidth="1.2" />
          <text x="17" y="14" fill="#22d38c" textAnchor="middle">EN</text>
        </g>
      </g>

      {/* voice waveform */}
      <g stroke="url(#chatbots-wave)" strokeWidth="3" strokeLinecap="round">
        <line x1="196" y1="300" x2="196" y2="300">
          <animate attributeName="y1" values="298;288;298" dur="1.1s" repeatCount="indefinite" />
          <animate attributeName="y2" values="302;312;302" dur="1.1s" repeatCount="indefinite" />
        </line>
        <line x1="208" y1="294" x2="208" y2="306">
          <animate attributeName="y1" values="294;280;294" dur="0.9s" repeatCount="indefinite" />
          <animate attributeName="y2" values="306;320;306" dur="0.9s" repeatCount="indefinite" />
        </line>
        <line x1="220" y1="290" x2="220" y2="310">
          <animate attributeName="y1" values="290;274;290" dur="1.3s" repeatCount="indefinite" />
          <animate attributeName="y2" values="310;326;310" dur="1.3s" repeatCount="indefinite" />
        </line>
        <line x1="232" y1="294" x2="232" y2="306">
          <animate attributeName="y1" values="294;282;294" dur="1s" repeatCount="indefinite" />
          <animate attributeName="y2" values="306;318;306" dur="1s" repeatCount="indefinite" />
        </line>
        <line x1="244" y1="298" x2="244" y2="302">
          <animate attributeName="y1" values="298;290;298" dur="1.2s" repeatCount="indefinite" />
          <animate attributeName="y2" values="302;310;302" dur="1.2s" repeatCount="indefinite" />
        </line>
      </g>

      {/* channel dots feeding the window (left edge) */}
      <g>
        <g fill="#2e66ff">
          <circle cx="38" cy="120" r="6" />
          <circle cx="38" cy="150" r="6" fill="#14e0c8" />
          <circle cx="38" cy="180" r="6" fill="#22d38c" />
        </g>
        <g stroke="#14e0c8" strokeWidth="1.4" fill="none" opacity="0.5">
          <path d="M44 120 Q54 132 60 144" />
          <path d="M44 150 H60" />
          <path d="M44 180 Q54 168 60 158" />
        </g>
      </g>

      {/* handoff-to-human node (bottom-right) */}
      <g>
        <g fill="none" stroke="#c8f02e" strokeWidth="1.6" opacity="0.6">
          <path d="M300 220 Q330 250 332 286" />
        </g>
        <circle r="2.8" fill="#c8f02e">
          <animateMotion path="M300 220 Q330 250 332 286" dur="2.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="332" cy="300" r="26" fill="url(#chatbots-core)" />
        <circle cx="332" cy="300" r="18" fill="#0a0a0b" opacity="0.4" stroke="#c8f02e" strokeWidth="1.4" />
        {/* human glyph */}
        <circle cx="332" cy="294" r="5" fill="#c8f02e" />
        <path d="M322 312 a10 10 0 0 1 20 0 Z" fill="#c8f02e" />
        <circle cx="332" cy="300" r="24" fill="none" stroke="#c8f02e" strokeWidth="1.4">
          <animate attributeName="r" values="24;30;24" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2.8s" repeatCount="indefinite" />
        </circle>
      </g>
    </svg>
  );
}

export default ChatbotsIa;
