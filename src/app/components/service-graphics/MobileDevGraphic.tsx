/** Two handsets on concentric signal arcs — the orbital language, pocket-sized. */
export default function MobileDevGraphic() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="presentation">
      {/* signal arcs, echoing the hero's rings */}
      <circle cx="200" cy="150" r="118" fill="none" stroke="var(--color-border)" />
      <circle cx="200" cy="150" r="90" fill="none" stroke="var(--color-border)" strokeDasharray="4 6" />
      <circle cx="200" cy="32" r="4" fill="var(--color-accent-2)" />

      {/* back handset */}
      <g transform="translate(238 74) rotate(8)">
        <rect width="86" height="160" rx="16" fill="var(--color-bg-alt)" stroke="var(--color-border-strong)" />
        <rect x="12" y="22" width="62" height="40" rx="7" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="12" y="70" width="44" height="6" rx="3" fill="var(--color-border-strong)" />
        <rect x="12" y="82" width="58" height="6" rx="3" fill="var(--color-border)" />
        <rect x="12" y="100" width="62" height="24" rx="12" fill="var(--color-accent-2)" opacity="0.18" />
      </g>

      {/* front handset */}
      <g transform="translate(66 58)">
        <rect width="104" height="190" rx="20" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
        <rect x="38" y="9" width="28" height="5" rx="2.5" fill="var(--color-border-strong)" />

        <rect x="14" y="26" width="76" height="52" rx="10" fill="var(--color-accent)" />
        <circle cx="34" cy="46" r="8" fill="var(--color-surface)" opacity="0.32" />
        <rect x="24" y="60" width="56" height="5" rx="2.5" fill="var(--color-surface)" opacity="0.5" />

        <rect x="14" y="88" width="50" height="6" rx="3" fill="var(--color-ink-faint)" />
        <rect x="14" y="102" width="76" height="5" rx="2.5" fill="var(--color-border-strong)" />
        <rect x="14" y="114" width="64" height="5" rx="2.5" fill="var(--color-border)" />

        <rect x="14" y="132" width="36" height="30" rx="8" fill="var(--color-bg-alt)" stroke="var(--color-border)" />
        <rect x="54" y="132" width="36" height="30" rx="8" fill="var(--color-bg-alt)" stroke="var(--color-border)" />

        {/* tab bar */}
        <path d="M14 172h76" stroke="var(--color-border)" />
        <circle cx="33" cy="180" r="3.5" fill="var(--color-accent)" />
        <circle cx="52" cy="180" r="3.5" fill="var(--color-border-strong)" />
        <circle cx="71" cy="180" r="3.5" fill="var(--color-border-strong)" />
      </g>
    </svg>
  );
}
