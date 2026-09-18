/** Result rows with the climb that put the top one there. */
export default function SeoGraphic() {
  const rows = [0, 1, 2, 3];

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="presentation">
      {/* search field */}
      <rect x="44" y="40" width="228" height="34" rx="17" fill="var(--color-surface)" stroke="var(--color-border-strong)" />
      <circle cx="68" cy="57" r="7" fill="none" stroke="var(--color-ink-faint)" strokeWidth="2" />
      <path d="M73 62l6 6" stroke="var(--color-ink-faint)" strokeWidth="2" strokeLinecap="round" />
      <rect x="88" y="53" width="104" height="8" rx="4" fill="var(--color-border-strong)" />

      {/* result rows — the first is the won position */}
      {rows.map((i) => {
        const y = 96 + i * 48;
        const first = i === 0;
        return (
          <g key={i}>
            <rect
              x="44"
              y={y}
              width="228"
              height="38"
              rx="10"
              fill={first ? "var(--color-surface)" : "transparent"}
              stroke={first ? "var(--color-accent)" : "var(--color-border)"}
            />
            <rect x="58" y={y + 10} width={first ? 104 : 78} height="7" rx="3.5" fill={first ? "var(--color-accent)" : "var(--color-border-strong)"} />
            <rect x="58" y={y + 23} width={first ? 142 : 110} height="5" rx="2.5" fill="var(--color-border)" />
            {first && (
              <g transform={`translate(246 ${y + 19})`}>
                <circle r="11" fill="var(--color-accent)" />
                <text textAnchor="middle" y="4" className="fill-[var(--color-surface)] font-display text-[11px] font-bold">
                  1
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* rank climb */}
      <g transform="translate(296 96)">
        <path d="M0 148V0" stroke="var(--color-border)" />
        <path d="M0 148h68" stroke="var(--color-border)" />
        <path
          d="M8 132 L26 108 L44 66 L62 22"
          fill="none"
          stroke="var(--color-accent-2)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="132" r="3" fill="var(--color-accent-2)" />
        <circle cx="26" cy="108" r="3" fill="var(--color-accent-2)" />
        <circle cx="44" cy="66" r="3" fill="var(--color-accent-2)" />
        <circle cx="62" cy="22" r="4.5" fill="var(--color-accent)" />
      </g>
    </svg>
  );
}
