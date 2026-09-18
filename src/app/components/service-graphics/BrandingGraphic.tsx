/** Brand identity system — logo, color palette, typography, and business cards. */
export default function BrandingGraphic() {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" role="presentation">
      {/* business card front */}
      <g transform="translate(30 40)">
        <rect width="200" height="120" rx="10" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
        {/* logo mark */}
        <rect x="20" y="20" width="32" height="32" rx="8" fill="var(--color-accent)" />
        <rect x="24" y="24" width="12" height="12" rx="3" fill="var(--color-surface)" opacity="0.5" />
        <rect x="38" y="38" width="12" height="12" rx="3" fill="var(--color-surface)" opacity="0.3" />
        {/* company name */}
        <rect x="62" y="24" width="80" height="10" rx="4" fill="var(--color-ink)" />
        <rect x="62" y="40" width="50" height="6" rx="3" fill="var(--color-border)" />
        {/* contact info */}
        <rect x="20" y="72" width="70" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="20" y="82" width="90" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="20" y="92" width="60" height="5" rx="2.5" fill="var(--color-border)" />
        {/* accent bar */}
        <rect x="160" y="20" width="20" height="80" rx="4" fill="var(--color-accent)" opacity="0.12" />
      </g>

      {/* business card back */}
      <g transform="translate(260 40)">
        <rect width="200" height="120" rx="10" fill="var(--color-accent)" />
        <rect x="20" y="20" width="160" height="80" rx="6" fill="var(--color-surface)" opacity="0.1" />
        {/* logo centered */}
        <rect x="82" y="42" width="36" height="36" rx="10" fill="var(--color-surface)" opacity="0.2" />
        <rect x="88" y="48" width="12" height="12" rx="3" fill="var(--color-surface)" opacity="0.4" />
        <rect x="100" y="60" width="12" height="12" rx="3" fill="var(--color-surface)" opacity="0.3" />
        <rect x="72" y="86" width="56" height="6" rx="3" fill="var(--color-surface)" opacity="0.5" />
      </g>

      {/* color palette */}
      <g transform="translate(30 184)">
        <rect x="0" y="0" width="44" height="44" rx="8" fill="var(--color-accent)" />
        <rect x="52" y="0" width="44" height="44" rx="8" fill="var(--color-accent-2)" />
        <rect x="104" y="0" width="44" height="44" rx="8" fill="var(--color-ink)" />
        <rect x="156" y="0" width="44" height="44" rx="8" fill="var(--color-bg-alt)" stroke="var(--color-border-strong)" />
        <rect x="208" y="0" width="44" height="44" rx="8" fill="var(--color-surface)" stroke="var(--color-border-strong)" />
        {/* labels */}
        <rect x="0" y="50" width="44" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="52" y="50" width="44" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="104" y="50" width="44" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="156" y="50" width="44" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="208" y="50" width="44" height="5" rx="2.5" fill="var(--color-border)" />
      </g>

      {/* typography specimen */}
      <g transform="translate(260 184)">
        <rect width="210" height="110" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
        <text x="20" y="30" className="fill-[var(--color-ink)] font-display text-[22px] font-bold">Aa</text>
        <rect x="52" y="14" width="100" height="8" rx="4" fill="var(--color-ink)" opacity="0.7" />
        <rect x="52" y="28" width="70" height="6" rx="3" fill="var(--color-border)" />
        <path d="M20 46h170" stroke="var(--color-border)" />
        <rect x="20" y="56" width="140" height="6" rx="3" fill="var(--color-border-strong)" />
        <rect x="20" y="68" width="160" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="20" y="79" width="120" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="20" y="90" width="90" height="5" rx="2.5" fill="var(--color-border)" />
      </g>
    </svg>
  );
}
