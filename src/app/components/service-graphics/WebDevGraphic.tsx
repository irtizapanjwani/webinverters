/** Browser viewport with a performance dial — the console reading a build. */
export default function WebDevGraphic() {
  const r = 26;
  const c = 2 * Math.PI * r;

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="presentation">
      <rect x="40" y="44" width="320" height="212" rx="14" fill="var(--color-surface)" stroke="var(--color-border-strong)" />
      <path d="M40 72h320" stroke="var(--color-border)" />
      <circle cx="60" cy="58" r="3.5" fill="var(--color-border-strong)" />
      <circle cx="73" cy="58" r="3.5" fill="var(--color-border-strong)" />
      <circle cx="86" cy="58" r="3.5" fill="var(--color-border-strong)" />
      <rect x="150" y="52" width="100" height="12" rx="6" fill="var(--color-bg-alt)" />

      {/* page skeleton */}
      <rect x="62" y="92" width="122" height="10" rx="5" fill="var(--color-accent)" />
      <rect x="62" y="110" width="92" height="7" rx="3.5" fill="var(--color-border-strong)" />
      <rect x="62" y="124" width="108" height="7" rx="3.5" fill="var(--color-border)" />
      <rect x="62" y="148" width="56" height="20" rx="10" fill="var(--color-accent)" />
      <rect x="126" y="148" width="46" height="20" rx="10" fill="none" stroke="var(--color-border-strong)" />

      <rect x="62" y="188" width="118" height="32" rx="10" fill="none" stroke="var(--color-border)" />

      {/* performance dial */}
      <g transform="translate(276 148)">
        <circle r={r} fill="none" stroke="var(--color-border)" strokeWidth="7" />
        <circle
          r={r}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * 0.04}
          transform="rotate(-90)"
        />
        <text textAnchor="middle" y="6" className="fill-[var(--color-ink)] font-display text-[18px] font-bold">
          98
        </text>
      </g>
      <rect x="236" y="196" width="80" height="6" rx="3" fill="var(--color-border)" />
      <rect x="236" y="196" width="66" height="6" rx="3" fill="var(--color-accent-2)" />
      <rect x="236" y="212" width="80" height="6" rx="3" fill="var(--color-border)" />
      <rect x="236" y="212" width="54" height="6" rx="3" fill="var(--color-accent-2)" />
    </svg>
  );
}
