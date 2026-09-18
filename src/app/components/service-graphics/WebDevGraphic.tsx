/** Detailed website mockup — browser chrome with a realistic landing page layout. */
export default function WebDevGraphic() {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" role="presentation">
      {/* browser window */}
      <rect x="20" y="20" width="480" height="340" rx="16" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" />

      {/* title bar */}
      <rect x="20" y="20" width="480" height="44" rx="16" fill="var(--color-bg-alt)" />
      <rect x="20" y="48" width="480" height="16" fill="var(--color-bg-alt)" />
      <circle cx="44" cy="42" r="5" fill="#ff5f57" />
      <circle cx="62" cy="42" r="5" fill="#febc2e" />
      <circle cx="80" cy="42" r="5" fill="#28c840" />
      <rect x="140" y="34" width="240" height="16" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" />
      <rect x="156" y="38" width="80" height="8" rx="4" fill="var(--color-border)" />
      <path d="M374 38h18" stroke="var(--color-border-strong)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M378 34v8M382 34v8" stroke="var(--color-border-strong)" strokeWidth="1.2" strokeLinecap="round" />

      {/* website nav */}
      <rect x="40" y="78" width="440" height="36" rx="0" fill="var(--color-surface)" />
      <path d="M40 114h440" stroke="var(--color-border)" />
      <rect x="56" y="88" width="80" height="14" rx="4" fill="var(--color-accent)" />
      <rect x="156" y="90" width="48" height="8" rx="4" fill="var(--color-border-strong)" />
      <rect x="220" y="90" width="56" height="8" rx="4" fill="var(--color-border-strong)" />
      <rect x="292" y="90" width="40" height="8" rx="4" fill="var(--color-border-strong)" />
      <rect x="348" y="90" width="52" height="8" rx="4" fill="var(--color-border-strong)" />
      <rect x="420" y="84" width="48" height="22" rx="11" fill="var(--color-accent)" />

      {/* hero section */}
      <rect x="40" y="114" width="200" height="120" rx="0" fill="var(--color-surface)" />
      <rect x="56" y="130" width="140" height="14" rx="4" fill="var(--color-ink)" />
      <rect x="56" y="152" width="110" height="14" rx="4" fill="var(--color-ink)" />
      <rect x="56" y="180" width="160" height="8" rx="4" fill="var(--color-border)" />
      <rect x="56" y="194" width="130" height="8" rx="4" fill="var(--color-border)" />
      <rect x="56" y="214" width="72" height="10" rx="5" fill="var(--color-accent)" />

      {/* hero image placeholder */}
      <rect x="260" y="120" width="200" height="100" rx="12" fill="var(--color-bg-alt)" />
      <circle cx="360" cy="165" r="28" fill="var(--color-accent)" opacity="0.12" />
      <circle cx="360" cy="165" r="16" fill="var(--color-accent)" opacity="0.2" />
      <path d="M352 165l6 6 12-12" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* feature cards */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={40 + i * 152} y="248" width="140" height="88" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
          <rect x={52 + i * 152} y="260" width="28" height="28" rx="8" fill={i === 0 ? "var(--color-accent)" : i === 1 ? "var(--color-accent-2)" : "var(--color-accent)"} opacity="0.12" />
          <rect x={52 + i * 152} y={264 + 10} width="12" height="8" rx="2" fill={i === 0 ? "var(--color-accent)" : i === 1 ? "var(--color-accent-2)" : "var(--color-accent)"} opacity="0.6" />
          <rect x={52 + i * 152} y="300" width="80" height="7" rx="3.5" fill="var(--color-ink)" opacity="0.7" />
          <rect x={52 + i * 152} y="314" width="100" height="5" rx="2.5" fill="var(--color-border)" />
          <rect x={52 + i * 152} y="324" width="85" height="5" rx="2.5" fill="var(--color-border)" />
        </g>
      ))}
    </svg>
  );
}
