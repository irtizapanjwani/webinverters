/** Social media management — content calendar with post previews and analytics. */
export default function SocialGraphic() {
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

      {/* sidebar nav */}
      <rect x="20" y="64" width="90" height="296" fill="var(--color-bg-alt)" />
      <path d="M110 64v296" stroke="var(--color-border)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="30" y={80 + i * 36} width="70" height="24" rx="6" fill={i === 0 ? "var(--color-accent)" : "transparent"} />
          <rect x="40" y={88 + i * 36} width="40" height="6" rx="3" fill={i === 0 ? "var(--color-surface)" : "var(--color-border-strong)"} />
        </g>
      ))}

      {/* content calendar */}
      <g transform="translate(126 74)">
        <rect width="230" height="180" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="14" y="12" width="80" height="8" rx="4" fill="var(--color-ink)" opacity="0.6" />

        {/* day headers */}
        {["M", "T", "W", "T", "F", "S", "S"].map((_, i) => (
          <text key={i} x={28 + i * 30} y="32" textAnchor="middle" className="fill-[var(--color-ink-faint)] font-display text-[7px] font-bold">
            {["M", "T", "W", "T", "F", "S", "S"][i]}
          </text>
        ))}

        {/* calendar grid */}
        {Array.from({ length: 20 }, (_, i) => {
          const col = i % 7;
          const row = Math.floor(i / 7);
          const x = 14 + col * 30;
          const y = 40 + row * 32;
          const hasPost = [2, 5, 8, 11, 14, 17].includes(i);
          const isLive = i === 8;
          return (
            <g key={i}>
              <rect x={x} y={y} width="24" height="24" rx="6" fill={isLive ? "var(--color-accent)" : hasPost ? "var(--color-accent)" : "transparent"} opacity={isLive ? 1 : hasPost ? 0.12 : 1} stroke={hasPost ? "none" : "var(--color-border)"} />
              {hasPost && !isLive && <circle cx={x + 12} cy={y + 12} r="3" fill="var(--color-accent)" opacity="0.4" />}
              {isLive && <circle cx={x + 12} cy={y + 12} r="4" fill="var(--color-surface)" />}
            </g>
          );
        })}
      </g>

      {/* post preview card */}
      <g transform="translate(370 74)">
        <rect width="118" height="120" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="12" y="12" width="94" height="54" rx="8" fill="var(--color-accent)" opacity="0.1" />
        <rect x="20" y="18" width="40" height="8" rx="3" fill="var(--color-accent)" opacity="0.3" />
        <rect x="20" y="32" width="60" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="20" y="42" width="50" height="5" rx="2.5" fill="var(--color-border)" />
        {/* platform icons */}
        <circle cx="24" cy="78" r="7" fill="#1da1f2" opacity="0.7" />
        <circle cx="44" cy="78" r="7" fill="#e4405f" opacity="0.7" />
        <circle cx="64" cy="78" r="7" fill="#0077b5" opacity="0.7" />
        <circle cx="84" cy="78" r="7" fill="#ff0000" opacity="0.7" />
        <rect x="12" y="94" width="94" height="16" rx="4" fill="var(--color-accent)" />
        <rect x="30" y="98" width="60" height="8" rx="4" fill="var(--color-surface)" opacity="0.8" />
      </g>

      {/* analytics panel */}
      <g transform="translate(126 266)">
        <rect width="362" height="88" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="14" y="12" width="60" height="8" rx="4" fill="var(--color-ink)" opacity="0.5" />

        {/* metric cards */}
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x={14 + i * 88} y="28" width="80" height="48" rx="8" fill="var(--color-bg-alt)" />
            <rect x={22 + i * 88} y="36" width="36" height="5" rx="2.5" fill="var(--color-border)" />
            <rect x={22 + i * 88} y="46" width="48" height="8" rx="3" fill="var(--color-ink)" />
            <rect x={22 + i * 88} y="60" width="28" height="5" rx="2.5" fill={i < 2 ? "var(--color-accent-2)" : "var(--color-accent)"} />
          </g>
        ))}
      </g>
    </svg>
  );
}
