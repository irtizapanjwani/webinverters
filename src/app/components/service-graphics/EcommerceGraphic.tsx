/** Ecommerce store interface — product grid with a cart sidebar. */
export default function EcommerceGraphic() {
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

      {/* store nav */}
      <rect x="20" y="64" width="480" height="40" fill="var(--color-surface)" />
      <path d="M20 104h480" stroke="var(--color-border)" />
      <rect x="36" y="76" width="70" height="14" rx="4" fill="var(--color-ink)" />
      <rect x="140" y="78" width="44" height="10" rx="4" fill="var(--color-border-strong)" />
      <rect x="196" y="78" width="52" height="10" rx="4" fill="var(--color-border-strong)" />
      <rect x="260" y="78" width="38" height="10" rx="4" fill="var(--color-border-strong)" />
      <circle cx="460" cy="84" r="12" fill="var(--color-bg-alt)" stroke="var(--color-border)" />
      <circle cx="460" cy="84" r="4" fill="var(--color-border-strong)" />
      <circle cx="440" cy="84" r="12" fill="var(--color-accent)" />
      <rect x="435" y="80" width="10" height="8" rx="2" fill="var(--color-surface)" />

      {/* product grid */}
      {[0, 1, 2, 3].map((i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 36 + col * 160;
        const y = 116 + row * 118;
        return (
          <g key={i}>
            <rect x={x} y={y} width="144" height="108" rx="12" fill="var(--color-surface)" stroke="var(--color-border)" />
            <rect x={x + 10} y={y + 10} width="124" height="52" rx="8" fill="var(--color-bg-alt)" />
            {/* product image placeholder */}
            <rect x={x + 40} y={y + 20} width="40" height="32" rx="6" fill="var(--color-accent)" opacity="0.1" />
            <circle cx={x + 60} cy={y + 36} r="10" fill="var(--color-accent)" opacity="0.2" />
            <rect x={x + 10} y={y + 70} width="80" height="6" rx="3" fill="var(--color-border-strong)" />
            <rect x={x + 10} y={y + 82} width="50" height="6" rx="3" fill="var(--color-accent)" />
            <rect x={x + 10} y={y + 94} width="36" height="8" rx="4" fill="var(--color-ink)" opacity="0.7" />
          </g>
        );
      })}

      {/* cart sidebar */}
      <g transform="translate(370 104)">
        <rect width="118" height="248" rx="12" fill="var(--color-surface)" stroke="var(--color-border-strong)" />
        <rect x="14" y="14" width="60" height="10" rx="4" fill="var(--color-ink)" />
        <path d="M14 32h90" stroke="var(--color-border)" />

        {/* cart items */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="14" y={42 + i * 56} width="90" height="48" rx="8" fill="var(--color-bg-alt)" />
            <rect x={22} y={50 + i * 56} width="28" height="28" rx="6" fill="var(--color-surface)" stroke="var(--color-border)" />
            <rect x={58} y={50 + i * 56} width="38" height="6" rx="3" fill="var(--color-border-strong)" />
            <rect x={58} y={62 + i * 56} width="26" height="5" rx="2.5" fill="var(--color-accent)" />
            <rect x={58} y={74 + i * 56} width="18" height="5" rx="2.5" fill="var(--color-border)" />
          </g>
        ))}

        <path d="M14 208h90" stroke="var(--color-border)" />
        <rect x="14" y="218" width="50" height="6" rx="3" fill="var(--color-border-strong)" />
        <rect x="14" y="230" width="30" height="8" rx="4" fill="var(--color-accent)" />
      </g>
    </svg>
  );
}
