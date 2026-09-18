/** A scheduled month, and the reach one planned post sets off. */
export default function SocialGraphic() {
  const cells = Array.from({ length: 20 }, (_, i) => i);
  const scheduled = new Set([2, 5, 9, 12, 16]);
  const live = 9;

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="presentation">
      {/* calendar */}
      <rect x="40" y="48" width="196" height="204" rx="14" fill="var(--color-surface)" stroke="var(--color-border-strong)" />
      <path d="M40 84h196" stroke="var(--color-border)" />
      <rect x="56" y="62" width="46" height="8" rx="4" fill="var(--color-ink-faint)" />

      {cells.map((i) => {
        const col = i % 5;
        const row = Math.floor(i / 5);
        const x = 56 + col * 36;
        const y = 98 + row * 38;
        const isScheduled = scheduled.has(i);
        const isLive = i === live;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width="28"
              height="28"
              rx="8"
              fill={isLive ? "var(--color-accent)" : isScheduled ? "var(--color-bg-alt)" : "transparent"}
              stroke={isLive ? "none" : "var(--color-border)"}
            />
            {isScheduled && !isLive && <circle cx={x + 14} cy={y + 14} r="3" fill="var(--color-accent-2)" />}
            {isLive && <circle cx={x + 14} cy={y + 14} r="4" fill="var(--color-surface)" />}
          </g>
        );
      })}

      {/* reach graph from the live post */}
      <g transform="translate(268 150)">
        <circle r="74" fill="none" stroke="var(--color-border)" strokeDasharray="3 6" />
        <circle r="46" fill="none" stroke="var(--color-border)" />

        <path d="M-46 0 L-92 -2" stroke="var(--color-border-strong)" strokeDasharray="3 4" />

        {[
          [0, -46],
          [40, -22],
          [40, 24],
          [0, 46],
          [-40, 24],
        ].map(([x, y], i) => (
          <g key={i}>
            <path d={`M0 0 L${x} ${y}`} stroke="var(--color-border-strong)" />
            <circle cx={x} cy={y} r={i === 1 ? 11 : 8} fill="var(--color-surface)" stroke="var(--color-accent-2)" strokeWidth="1.8" />
          </g>
        ))}

        <circle cx="62" cy="-54" r="6" fill="var(--color-accent-2)" opacity="0.5" />
        <circle cx="-58" cy="-58" r="4" fill="var(--color-accent-2)" opacity="0.35" />

        <circle r="22" fill="var(--color-accent)" />
        <path
          d="M-7 1.5c0-4 3-7 7-7s7 3 7 7c0 5-7 9-7 9s-7-4-7-9Z"
          fill="var(--color-surface)"
        />
      </g>
    </svg>
  );
}
