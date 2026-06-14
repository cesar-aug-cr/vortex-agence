export function EmailMarketingAutomation({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="emailauto-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.8" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="emailauto-env" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2e66ff" stopOpacity="0.34" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0.12" />
        </linearGradient>
        <linearGradient id="emailauto-branch" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#14e0c8" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#c8f02e" />
        </linearGradient>
        <radialGradient id="emailauto-crm" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.6" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" stopOpacity="0" />
        </radialGradient>
        <filter id="emailauto-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      {/* ambient glow behind CRM */}
      <circle cx="330" cy="200" r="70" fill="url(#emailauto-glow)" filter="url(#emailauto-blur)" opacity="0.3" />

      {/* LEFT: source envelope */}
      <g>
        <rect x="34" y="158" width="96" height="72" rx="10" fill="url(#emailauto-env)" stroke="#2e66ff" strokeWidth="1.8" />
        <path d="M34 168 L82 204 L130 168" fill="none" stroke="#14e0c8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M34 222 L66 198 M130 222 L98 198" fill="none" stroke="#2e66ff" strokeWidth="1.4" strokeOpacity="0.5" strokeLinecap="round" />
        {/* pulse ring on the envelope */}
        <rect x="34" y="158" width="96" height="72" rx="10" fill="none" stroke="#c8f02e" strokeWidth="1.6">
          <animate attributeName="opacity" values="0.9;0.1;0.9" dur="2.6s" repeatCount="indefinite" />
        </rect>
        <text x="82" y="248" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#14e0c8" textAnchor="middle" opacity="0.8">TRIGGER</text>
      </g>

      {/* branching workflow tree */}
      <g fill="none" stroke="url(#emailauto-branch)" strokeWidth="2" strokeLinecap="round">
        {/* trunk */}
        <path d="M130 194 H172" />
        {/* split into 3 branches */}
        <path d="M172 194 Q188 194 196 132 H236" />
        <path d="M172 194 H236" />
        <path d="M172 194 Q188 194 196 256 H236" />
        {/* secondary split on top branch */}
        <path d="M280 132 Q296 132 300 100 H322" strokeOpacity="0.8" />
        <path d="M280 132 H322" strokeOpacity="0.8" />
        {/* converge to CRM */}
        <path d="M280 194 Q310 194 322 200" />
        <path d="M280 256 Q310 256 320 214" />
        <path d="M322 100 Q344 100 332 178" strokeOpacity="0.7" />
        <path d="M322 132 Q346 132 332 182" strokeOpacity="0.7" />
      </g>

      {/* workflow decision / step nodes */}
      <g>
        {/* node A — diamond decision */}
        <g transform="translate(258 132)">
          <path d="M0 -14 L14 0 L0 14 L-14 0 Z" fill="#0a0a0b" opacity="0.4" stroke="#14e0c8" strokeWidth="1.8" strokeLinejoin="round" />
          <text x="0" y="4" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#14e0c8" textAnchor="middle">?</text>
        </g>
        {/* node B — wait step */}
        <g transform="translate(258 194)">
          <circle r="13" fill="#0a0a0b" opacity="0.4" stroke="#22d38c" strokeWidth="1.8" />
          <path d="M0 -7 V0 L5 4" fill="none" stroke="#22d38c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        {/* node C — action step */}
        <g transform="translate(258 256)">
          <rect x="-13" y="-13" width="26" height="26" rx="6" fill="#0a0a0b" opacity="0.4" stroke="#c8f02e" strokeWidth="1.8" />
          <path d="M-5 0 L-1 5 L6 -5" fill="none" stroke="#c8f02e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      </g>

      {/* travelling email icons along the branches */}
      <g>
        <g>
          <rect x="-7" y="-5" width="14" height="10" rx="2" fill="#c8f02e" />
          <path d="M-7 -4 L0 2 L7 -4" fill="none" stroke="#0a0a0b" strokeWidth="1.2" />
          <animateMotion path="M130 194 Q188 194 196 132 H236" dur="3s" repeatCount="indefinite" />
        </g>
        <g>
          <rect x="-7" y="-5" width="14" height="10" rx="2" fill="#22d38c" />
          <path d="M-7 -4 L0 2 L7 -4" fill="none" stroke="#0a0a0b" strokeWidth="1.2" />
          <animateMotion path="M130 194 H236" dur="2.6s" repeatCount="indefinite" />
        </g>
        <g>
          <rect x="-7" y="-5" width="14" height="10" rx="2" fill="#14e0c8" />
          <path d="M-7 -4 L0 2 L7 -4" fill="none" stroke="#0a0a0b" strokeWidth="1.2" />
          <animateMotion path="M130 194 Q188 194 196 256 H236" dur="3.4s" repeatCount="indefinite" />
        </g>
        {/* final hop into CRM */}
        <circle r="3" fill="#c8f02e"><animateMotion path="M280 194 Q310 194 322 200" dur="1.8s" repeatCount="indefinite" /></circle>
        <circle r="2.6" fill="#c8f02e"><animateMotion path="M280 256 Q310 256 320 214" dur="2.1s" repeatCount="indefinite" /></circle>
      </g>

      {/* RIGHT: CRM node */}
      <g transform="translate(330 200)">
        <circle r="30" fill="url(#emailauto-crm)" />
        <circle r="20" fill="#0a0a0b" opacity="0.4" />
        {/* stacked records icon */}
        <g stroke="#c8f02e" strokeWidth="2" strokeLinecap="round" fill="none">
          <rect x="-11" y="-10" width="22" height="6" rx="2" />
          <rect x="-11" y="-1" width="22" height="6" rx="2" />
          <rect x="-11" y="8" width="22" height="6" rx="2" />
        </g>
        <circle r="24" fill="none" stroke="#c8f02e" strokeWidth="1.6">
          <animate attributeName="r" values="20;30;20" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0;0.9" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <text x="0" y="48" fontFamily="monospace" fontSize="10" fontWeight="700" fill="#c8f02e" textAnchor="middle">CRM</text>
      </g>
    </svg>
  );
}

export default EmailMarketingAutomation;
