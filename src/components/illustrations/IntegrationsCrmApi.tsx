export function IntegrationsCrmApi({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="crmapi-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.85" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="crmapi-hub" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.55" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="crmapi-mod-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.3" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="crmapi-mod-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.3" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="crmapi-mod-c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.3" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="crmapi-flow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0.9" />
        </linearGradient>
        <filter id="crmapi-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* central glow */}
      <circle cx="200" cy="200" r="110" fill="url(#crmapi-glow)" filter="url(#crmapi-blur)" opacity="0.3" />

      {/* bidirectional data flows (connectors) */}
      <g fill="none" strokeWidth="2" stroke="url(#crmapi-flow)">
        <path d="M120 110 Q160 150 178 178" opacity="0.85" />
        <path d="M280 110 Q240 150 222 178" opacity="0.85" />
        <path d="M200 300 L200 248" opacity="0.85" />
      </g>

      {/* travelling packets — bidirectional */}
      <g fill="#c8f02e">
        <rect width="4.5" height="4.5" rx="1"><animateMotion path="M120 110 Q160 150 178 178" dur="2.2s" repeatCount="indefinite" /></rect>
        <rect width="4" height="4" rx="1" fill="#14e0c8"><animateMotion path="M178 178 Q160 150 120 110" dur="2.6s" begin="1s" repeatCount="indefinite" /></rect>
        <rect width="4.5" height="4.5" rx="1"><animateMotion path="M280 110 Q240 150 222 178" dur="2.4s" begin="0.4s" repeatCount="indefinite" /></rect>
        <rect width="4" height="4" rx="1" fill="#14e0c8"><animateMotion path="M222 178 Q240 150 280 110" dur="2.8s" begin="1.6s" repeatCount="indefinite" /></rect>
        <rect width="4.5" height="4.5" rx="1"><animateMotion path="M200 300 L200 248" dur="2s" repeatCount="indefinite" /></rect>
        <rect width="4" height="4" rx="1" fill="#14e0c8"><animateMotion path="M200 248 L200 300" dur="2.4s" begin="1.2s" repeatCount="indefinite" /></rect>
      </g>

      {/* module A (top-left) — magnetizing in */}
      <g>
        <rect x="62" y="62" width="78" height="62" rx="13" fill="url(#crmapi-mod-a)" stroke="#14e0c8" strokeWidth="1.6">
          <animateTransform attributeName="transform" type="translate" values="-6 -5;0 0;-6 -5" dur="4s" repeatCount="indefinite" />
        </rect>
        <g transform="translate(62 62)">
          <animateTransform attributeName="transform" type="translate" values="-6 -5;0 0;-6 -5" dur="4s" repeatCount="indefinite" additive="sum" />
          <rect x="16" y="16" width="16" height="16" rx="3" fill="#14e0c8" opacity="0.8" />
          <rect x="38" y="16" width="24" height="6" rx="3" fill="#b9bcb2" opacity="0.4" />
          <rect x="38" y="26" width="18" height="6" rx="3" fill="#b9bcb2" opacity="0.3" />
          <line x1="16" y1="44" x2="56" y2="44" stroke="#14e0c8" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </g>
        {/* connector teeth toward hub */}
        <path d="M132 116 l8 0 l0 6 l6 0" fill="none" stroke="#14e0c8" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* module B (top-right) */}
      <g>
        <rect x="260" y="62" width="78" height="62" rx="13" fill="url(#crmapi-mod-b)" stroke="#2e66ff" strokeWidth="1.6">
          <animateTransform attributeName="transform" type="translate" values="6 -5;0 0;6 -5" dur="4.4s" repeatCount="indefinite" />
        </rect>
        <g transform="translate(260 62)">
          <animateTransform attributeName="transform" type="translate" values="6 -5;0 0;6 -5" dur="4.4s" repeatCount="indefinite" additive="sum" />
          <circle cx="26" cy="24" r="9" fill="none" stroke="#2e66ff" strokeWidth="2" />
          <circle cx="26" cy="24" r="3" fill="#2e66ff" />
          <rect x="42" y="16" width="22" height="6" rx="3" fill="#b9bcb2" opacity="0.4" />
          <rect x="42" y="26" width="16" height="6" rx="3" fill="#b9bcb2" opacity="0.3" />
          <line x1="16" y1="44" x2="56" y2="44" stroke="#2e66ff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </g>
      </g>

      {/* module C (bottom) — webhook source */}
      <g>
        <rect x="161" y="304" width="78" height="58" rx="13" fill="url(#crmapi-mod-c)" stroke="#c8f02e" strokeWidth="1.6">
          <animateTransform attributeName="transform" type="translate" values="0 7;0 0;0 7" dur="4.8s" repeatCount="indefinite" />
        </rect>
        <g transform="translate(161 304)">
          <animateTransform attributeName="transform" type="translate" values="0 7;0 0;0 7" dur="4.8s" repeatCount="indefinite" additive="sum" />
          <text x="14" y="24" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#c8f02e">API</text>
          <path d="M44 14 l8 7 l-8 7" fill="none" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="14" y1="40" x2="54" y2="40" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        </g>
      </g>

      {/* central CRM hub */}
      <g transform="translate(200 200)">
        <circle r="48" fill="url(#crmapi-hub)" />
        {/* rotating socket ring */}
        <g stroke="#c8f02e" strokeWidth="2" opacity="0.55">
          <circle r="40" fill="none" strokeDasharray="3 9">
            <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="30s" repeatCount="indefinite" />
          </circle>
        </g>
        <circle r="32" fill="#0a0a0b" opacity="0.5" stroke="#c8f02e" strokeWidth="1.8" />
        {/* CRM contact glyph cluster */}
        <g fill="#c8f02e">
          <circle cx="0" cy="-9" r="6" />
          <path d="M-12 8 a12 12 0 0 1 24 0 Z" />
        </g>
        <g fill="#14e0c8" opacity="0.8">
          <circle cx="-16" cy="-2" r="3.4" />
          <circle cx="16" cy="-2" r="3.4" />
        </g>
        <text x="0" y="26" fontFamily="monospace" fontSize="8" fontWeight="700" fill="#b9bcb2" textAnchor="middle">CRM</text>
        {/* pulse */}
        <circle r="36" fill="none" stroke="#c8f02e" strokeWidth="1.6">
          <animate attributeName="r" values="36;46;36" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.7;0;0.7" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* lock-in connector nodes around hub */}
      <g fill="#c8f02e">
        <circle cx="178" cy="178" r="3.5" />
        <circle cx="222" cy="178" r="3.5" />
        <circle cx="200" cy="248" r="3.5" />
      </g>
    </svg>
  );
}

export default IntegrationsCrmApi;
