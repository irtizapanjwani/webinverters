/** SEO analytics dashboard — charts, rankings, and performance metrics. */
export default function SeoGraphic() {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" role="presentation">
      {/* dashboard container */}
      <rect x="20" y="20" width="480" height="340" rx="16" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.5" />

      {/* top bar */}
      <rect x="20" y="20" width="480" height="44" rx="16" fill="var(--color-bg-alt)" />
      <rect x="20" y="48" width="480" height="16" fill="var(--color-bg-alt)" />
      <circle cx="44" cy="42" r="5" fill="#ff5f57" />
      <circle cx="62" cy="42" r="5" fill="#febc2e" />
      <circle cx="80" cy="42" r="5" fill="#28c840" />
      <rect x="120" y="34" width="120" height="16" rx="8" fill="var(--color-surface)" stroke="var(--color-border)" />
      <rect x="134" y="38" width="60" height="8" rx="4" fill="var(--color-border)" />

      {/* sidebar */}
      <rect x="20" y="64" width="100" height="296" fill="var(--color-bg-alt)" />
      <path d="M120 64v296" stroke="var(--color-border)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="32" y={80 + i * 36} width={i === 1 ? "76" : "60"} height="24" rx="6" fill={i === 1 ? "var(--color-accent)" : "transparent"} />
          <rect x="42" y={88 + i * 36} width="40" height="6" rx="3" fill={i === 1 ? "var(--color-surface)" : "var(--color-border-strong)"} />
        </g>
      ))}

      {/* metric cards */}
      {[0, 1, 2, 3].map((i) => {
        const x = 136 + i * 90;
        return (
          <g key={i}>
            <rect x={x} y="74" width="80" height="56" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
            <rect x={x + 10} y="84" width="36" height="6" rx="3" fill="var(--color-border)" />
            <rect x={x + 10} y="96" width="48" height="10" rx="4" fill="var(--color-ink)" />
            <rect x={x + 10} y="112" width="28" height="5" rx="2.5" fill={i < 2 ? "var(--color-accent-2)" : "var(--color-accent)"} />
          </g>
        );
      })}

      {/* main chart */}
      <g transform="translate(136 144)">
        <rect width="210" height="140" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="14" y="14" width="60" height="8" rx="4" fill="var(--color-ink)" opacity="0.6" />
        {/* chart area */}
        <path
          d="M14 120 L44 95 L74 105 L104 70 L134 55 L164 40 L194 30"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 120 L44 95 L74 105 L104 70 L134 55 L164 40 L194 30 L194 120 Z"
          fill="var(--color-accent)"
          opacity="0.08"
        />
        {/* grid lines */}
        <path d="M14 60h180" stroke="var(--color-border)" strokeDasharray="3 4" />
        <path d="M14 90h180" stroke="var(--color-border)" strokeDasharray="3 4" />
      </g>

      {/* search rankings */}
      <g transform="translate(360 144)">
        <rect width="128" height="140" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="14" y="14" width="60" height="8" rx="4" fill="var(--color-ink)" opacity="0.6" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x="14" y={32 + i * 20} width="100" height="14" rx="4" fill={i === 0 ? "var(--color-accent)" : "transparent"} opacity={i === 0 ? 0.1 : 1} />
            <circle cx="24" cy={39 + i * 20} r="6" fill={i === 0 ? "var(--color-accent)" : "var(--color-border)"} />
            <text x="24" y={42 + i * 20} textAnchor="middle" className="fill-[var(--color-surface)] font-display text-[7px] font-bold">{i + 1}</text>
            <rect x="36" y={36 + i * 20} width={50 - i * 6} height="5" rx="2.5" fill="var(--color-border-strong)" />
          </g>
        ))}
      </g>

      {/* bottom row — keyword table */}
      <g transform="translate(136 300)">
        <rect width="352" height="56" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="14" y="10" width="50" height="6" rx="3" fill="var(--color-ink)" opacity="0.5" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={14 + i * 86} y="24" width="70" height="22" rx="4" fill="var(--color-bg-alt)" />
            <rect x={20 + i * 86} y="28" width="40" height="5" rx="2.5" fill="var(--color-border-strong)" />
            <rect x={20 + i * 86} y="38" width="28" height="4" rx="2" fill={i === 0 ? "var(--color-accent-2)" : "var(--color-border)"} />
          </g>
        ))}
      </g>
    </svg>
  );
}
