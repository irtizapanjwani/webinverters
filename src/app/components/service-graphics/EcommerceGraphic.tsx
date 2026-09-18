/** Storefront grid feeding a checkout summary — the path from browse to paid. */
export default function EcommerceGraphic() {
  const bars = [26, 38, 32, 52, 46, 68];

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="presentation">
      {/* product grid */}
      <g>
        {[0, 1, 2, 3].map((i) => {
          const x = 44 + (i % 2) * 88;
          const y = 52 + Math.floor(i / 2) * 104;
          return (
            <g key={i}>
              <rect x={x} y={y} width="76" height="92" rx="12" fill="var(--color-surface)" stroke="var(--color-border)" />
              <rect x={x + 10} y={y + 10} width="56" height="44" rx="8" fill="var(--color-bg-alt)" />
              <rect x={x + 10} y={y + 62} width="40" height="6" rx="3" fill="var(--color-border-strong)" />
              <rect x={x + 10} y={y + 74} width="26" height="6" rx="3" fill="var(--color-accent)" />
            </g>
          );
        })}
      </g>

      {/* flow into checkout */}
      <path
        d="M216 150h22a10 10 0 0 1 10 10v0"
        fill="none"
        stroke="var(--color-border-strong)"
        strokeDasharray="4 5"
      />

      {/* checkout summary */}
      <g transform="translate(248 60)">
        <rect width="112" height="180" rx="14" fill="var(--color-surface)" stroke="var(--color-border-strong)" />

        <rect x="16" y="20" width="44" height="7" rx="3.5" fill="var(--color-ink-faint)" />

        <rect x="16" y="40" width="80" height="6" rx="3" fill="var(--color-border)" />
        <rect x="16" y="54" width="62" height="6" rx="3" fill="var(--color-border)" />
        <rect x="16" y="68" width="72" height="6" rx="3" fill="var(--color-border)" />
        <path d="M16 86h80" stroke="var(--color-border)" />

        {/* revenue series */}
        <g transform="translate(16 98)">
          {bars.map((h, i) => (
            <rect
              key={i}
              x={i * 14}
              y={72 - h}
              width="8"
              height={h}
              rx="3"
              fill={i === bars.length - 1 ? "var(--color-accent)" : "var(--color-accent-2)"}
              opacity={i === bars.length - 1 ? 1 : 0.32}
            />
          ))}
        </g>

        <rect x="16" y="150" width="80" height="16" rx="8" fill="var(--color-accent)" />
      </g>

      {/* cart badge */}
      <g transform="translate(330 44)">
        <circle r="17" fill="var(--color-accent)" />
        <path
          d="M-7 -5h13l-1.6 9h-9.8Z"
          fill="none"
          stroke="var(--color-surface)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path d="M-4 -5v-2.5a4 4 0 0 1 8 0V-5" fill="none" stroke="var(--color-surface)" strokeWidth="1.8" />
      </g>
    </svg>
  );
}
