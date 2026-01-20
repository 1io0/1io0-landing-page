import React from "react";

export default function VoyagerSVG() {
  return (
    <svg viewBox="0 0 980 520" className="w-full h-full" role="img" aria-label="Sonda espacial estilo Voyager en vector">
      <defs>
        <linearGradient id="metal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#eaf2ff" stopOpacity="0.95" />
          <stop offset="0.45" stopColor="#9fb3d6" stopOpacity="0.9" />
          <stop offset="1" stopColor="#5d6f93" stopOpacity="0.95" />
        </linearGradient>

        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffd400" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ff9f1a" stopOpacity="0.9" />
        </linearGradient>

        <linearGradient id="panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2bd7ff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#2bd7ff" stopOpacity="0.08" />
        </linearGradient>

        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* trail */}
      <g opacity="0.55" filter="url(#glow)">
        <path
          d="M80 265 C 250 205, 410 200, 520 250 C 620 300, 750 330, 900 300"
          fill="none"
          stroke="rgba(43,215,255,.55)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="M80 282 C 250 222, 410 217, 520 267 C 620 317, 750 347, 900 317"
          fill="none"
          stroke="rgba(255,45,85,.35)"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </g>

      {/* dish */}
      <g transform="translate(290 250) rotate(-8)">
        <ellipse cx="0" cy="0" rx="190" ry="132" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.18)" strokeWidth="2"/>
        <ellipse cx="0" cy="0" rx="166" ry="115" fill="rgba(0,0,0,.16)" stroke="rgba(255,255,255,.12)" strokeWidth="2"/>
        <path d="M-150 -40 Q 0 -110 150 -40" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="2"/>
        <path d="M-165 15 Q 0 -55 165 15" fill="none" stroke="rgba(255,255,255,.10)" strokeWidth="2"/>
        <path d="M-135 65 Q 0 18 135 65" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="2"/>
      </g>

      {/* arm + bus */}
      <g transform="translate(520 245) rotate(-5)">
        {/* boom */}
        <rect x="-10" y="-12" width="260" height="24" rx="12" fill="url(#metal)" opacity="0.9" />
        <rect x="62" y="-18" width="18" height="36" rx="8" fill="rgba(255,255,255,.12)" />

        {/* main bus */}
        <g transform="translate(250 -70)">
          <rect x="0" y="0" width="220" height="160" rx="18" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.16)" strokeWidth="2"/>
          <rect x="18" y="18" width="184" height="78" rx="12" fill="url(#panel)" stroke="rgba(43,215,255,.25)" strokeWidth="2"/>
          <rect x="18" y="110" width="110" height="34" rx="10" fill="rgba(0,0,0,.18)" stroke="rgba(255,255,255,.14)" strokeWidth="2"/>
          <circle cx="172" cy="127" r="18" fill="url(#gold)" stroke="rgba(255,255,255,.18)" strokeWidth="2"/>
          <circle cx="172" cy="127" r="7" fill="rgba(0,0,0,.18)" />
        </g>

        {/* mini antenna */}
        <g transform="translate(475 -98) rotate(18)">
          <rect x="-6" y="0" width="12" height="78" rx="6" fill="url(#metal)" opacity="0.95"/>
          <ellipse cx="0" cy="92" rx="44" ry="28" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.16)" strokeWidth="2"/>
          <ellipse cx="0" cy="92" rx="34" ry="20" fill="rgba(0,0,0,.14)" stroke="rgba(255,255,255,.12)" strokeWidth="2"/>
        </g>

        {/* support struts to dish */}
        <g transform="translate(-15 -6)">
          <path d="M0 0 L-120 -70" stroke="rgba(255,255,255,.18)" strokeWidth="4" strokeLinecap="round"/>
          <path d="M0 0 L-140 55" stroke="rgba(255,255,255,.12)" strokeWidth="4" strokeLinecap="round"/>
          <path d="M0 0 L-120 10" stroke="rgba(255,255,255,.10)" strokeWidth="3" strokeLinecap="round"/>
        </g>
      </g>

      {/* tiny hud label */}
      <g transform="translate(86 84)">
        <rect x="0" y="0" width="240" height="66" rx="14" fill="rgba(0,0,0,.22)" stroke="rgba(255,255,255,.14)" strokeWidth="2"/>
        <text x="16" y="28" fill="rgba(234,242,255,.92)" fontFamily="VT323, monospace" fontSize="24">VOYAGER-CLASS PROBE</text>
        <text x="16" y="50" fill="rgba(183,198,230,.92)" fontFamily="VT323, monospace" fontSize="20">vector · parallax · pseudo-3D</text>
      </g>
    </svg>
  );
}