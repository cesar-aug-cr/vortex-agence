export function SupportsPrint({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      aria-hidden
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="supprint-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#c8f02e" stopOpacity="0.6" />
          <stop offset="1" stopColor="#c8f02e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="supprint-card" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c8f02e" />
          <stop offset="0.5" stopColor="#22d38c" />
          <stop offset="1" stopColor="#14e0c8" />
        </linearGradient>
        <linearGradient id="supprint-paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1d1d22" />
          <stop offset="1" stopColor="#17171c" />
        </linearGradient>
        <linearGradient id="supprint-paper2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#222228" />
          <stop offset="1" stopColor="#191920" />
        </linearGradient>
        <linearGradient id="supprint-folder" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#14e0c8" stopOpacity="0.5" />
          <stop offset="1" stopColor="#2e66ff" stopOpacity="0.3" />
        </linearGradient>
        <filter id="supprint-blur" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="4.5" />
        </filter>
      </defs>

      {/* glow */}
      <circle cx="200" cy="200" r="104" fill="url(#supprint-glow)" filter="url(#supprint-blur)" opacity="0.4" />

      {/* contact shadow */}
      <ellipse cx="200" cy="330" rx="140" ry="18" fill="#0a0a0b" opacity="0.3" />

      {/* ISOMETRIC stack — drawn back-to-front. iso transform: skewed parallelograms */}

      {/* FOLDER (back, largest) */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="7s" repeatCount="indefinite" additive="sum" />
        <path d="M150 252 L268 210 L348 250 L230 292 Z" fill="url(#supprint-folder)" stroke="#14e0c8" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* folder side depth */}
        <path d="M150 252 L230 292 L230 304 L150 264 Z" fill="#0a0a0b" opacity="0.4" />
        <path d="M230 292 L348 250 L348 262 L230 304 Z" fill="#0a0a0b" opacity="0.25" />
        {/* folder tab */}
        <path d="M244 222 L286 207 L312 220 L270 235 Z" fill="#2e66ff" opacity="0.4" />
      </g>

      {/* BROCHURE (tri-fold) — unfolding panels */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -7;0 0" dur="6s" repeatCount="indefinite" additive="sum" />
        <path d="M120 210 L186 186 L226 206 L160 230 Z" fill="url(#supprint-paper2)" stroke="#22d38c" strokeWidth="1" strokeOpacity="0.45" />
        <path d="M160 230 L226 206 L266 226 L200 250 Z" fill="url(#supprint-paper)" stroke="#22d38c" strokeWidth="1" strokeOpacity="0.35" />
        {/* brochure content lines */}
        <g stroke="#c8f02e" strokeWidth="2" strokeLinecap="round" opacity="0.55">
          <line x1="150" y1="206" x2="186" y2="194" />
        </g>
        <g stroke="#b9bcb2" strokeWidth="1.4" strokeLinecap="round" opacity="0.3">
          <line x1="150" y1="214" x2="178" y2="204" />
          <line x1="192" y1="222" x2="232" y2="208" />
        </g>
      </g>

      {/* LETTERHEAD (A4) */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -9;0 0" dur="5.4s" repeatCount="indefinite" additive="sum" />
        <path d="M110 168 L180 142 L248 176 L178 202 Z" fill="url(#supprint-paper)" stroke="#14e0c8" strokeWidth="1.1" strokeOpacity="0.5" />
        {/* header mark */}
        <path d="M132 166 L140 178 L148 162" fill="none" stroke="url(#supprint-card)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {/* body text lines */}
        <g stroke="#b9bcb2" strokeWidth="1.3" strokeLinecap="round" opacity="0.3">
          <line x1="150" y1="178" x2="206" y2="186" />
          <line x1="148" y1="184" x2="200" y2="192" />
          <line x1="146" y1="190" x2="190" y2="197" />
        </g>
      </g>

      {/* BUSINESS CARD (front, vivid) */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0 0;0 -11;0 0" dur="4.8s" repeatCount="indefinite" additive="sum" />
        <path d="M132 230 L196 206 L248 232 L184 256 Z" fill="url(#supprint-card)" />
        {/* card depth */}
        <path d="M132 230 L184 256 L184 264 L132 238 Z" fill="#0a0a0b" opacity="0.35" />
        <path d="M184 256 L248 232 L248 240 L184 264 Z" fill="#0a0a0b" opacity="0.2" />
        {/* mark on card */}
        <path d="M150 234 L157 246 L164 230" fill="none" stroke="#0a0a0b" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
        <line x1="190" y1="234" x2="226" y2="234" stroke="#0a0a0b" strokeWidth="2" strokeLinecap="round" opacity="0.45" />
        <line x1="186" y1="242" x2="216" y2="242" stroke="#0a0a0b" strokeWidth="1.6" strokeLinecap="round" opacity="0.3" />
      </g>

      {/* CMYK ink dots — registration / halftone, drifting up */}
      <g>
        <circle cx="300" cy="150" r="7" fill="#14e0c8" opacity="0.85">
          <animate attributeName="cy" values="150;138;150" dur="3.6s" repeatCount="indefinite" />
        </circle>
        <circle cx="314" cy="166" r="6" fill="#2e66ff" opacity="0.8">
          <animate attributeName="cy" values="166;156;166" dur="4.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="288" cy="170" r="5.5" fill="#c8f02e" opacity="0.9">
          <animate attributeName="cy" values="170;160;170" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="306" cy="184" r="5" fill="#22d38c" opacity="0.7">
          <animate attributeName="cy" values="184;176;184" dur="4.6s" repeatCount="indefinite" />
        </circle>
        {/* registration cross */}
        <g stroke="#b9bcb2" strokeWidth="1.4" opacity="0.4">
          <line x1="86" y1="110" x2="102" y2="110" />
          <line x1="94" y1="102" x2="94" y2="118" />
          <circle cx="94" cy="110" r="5" fill="none" />
        </g>
      </g>

      {/* sparkle accent */}
      <g transform="translate(110 270)">
        <path d="M0 -9 L2 -2 L9 0 L2 2 L0 9 L-2 2 L-9 0 L-2 -2 Z" fill="url(#supprint-card)">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" repeatCount="indefinite" />
        </path>
      </g>
    </svg>
  );
}

export default SupportsPrint;
