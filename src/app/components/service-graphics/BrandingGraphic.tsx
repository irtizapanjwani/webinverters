/** A mark constructed on its own grid, with the system it generates around it. */
export default function BrandingGraphic() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="presentation">
      {/* construction grid */}
      <g stroke="var(--color-border)">
        <path d="M120 66v168M200 66v168M280 66v168" strokeDasharray="3 6" />
        <path d="M84 102h232M84 150h232M84 198h232" strokeDasharray="3 6" />
      </g>

      {/* the mark: concentric rings with a cut quadrant */}
      <circle cx="200" cy="150" r="66" fill="none" stroke="var(--color-border-strong)" />
      <circle cx="200" cy="150" r="46" fill="none" stroke="var(--color-accent)" strokeWidth="2.5" />
      <path
        d="M200 150 L200 84 A66 66 0 0 1 266 150 Z"
        fill="var(--color-accent)"
        opacity="0.12"
      />
      <circle cx="200" cy="150" r="14" fill="var(--color-accent)" />
      <circle cx="200" cy="84" r="4" fill="var(--color-accent-2)" />
      <circle cx="266" cy="150" r="4" fill="var(--color-accent-2)" />

      {/* measure ticks */}
      <path d="M200 150h46" stroke="var(--color-accent-2)" strokeDasharray="2 4" />
      <text x="216" y="144" className="fill-[var(--color-ink-faint)] font-display text-[10px] font-bold">
        r
      </text>

      {/* wordmark lockup */}
      <rect x="84" y="242" width="62" height="10" rx="5" fill="var(--color-ink)" />
      <rect x="152" y="242" width="38" height="10" rx="5" fill="var(--color-border-strong)" />

      {/* palette chips */}
      <g transform="translate(252 238)">
        <rect width="18" height="18" rx="5" fill="var(--color-accent)" />
        <rect x="22" width="18" height="18" rx="5" fill="var(--color-accent-2)" />
        <rect x="44" width="18" height="18" rx="5" fill="var(--color-ink)" />
        <rect x="66" width="18" height="18" rx="5" fill="var(--color-bg-alt)" stroke="var(--color-border-strong)" />
      </g>

      {/* type specimen */}
      <text x="84" y="54" className="fill-[var(--color-ink)] font-display text-[26px] font-bold">
        Aa
      </text>
      <rect x="130" y="34" width="54" height="6" rx="3" fill="var(--color-border-strong)" />
      <rect x="130" y="46" width="34" height="6" rx="3" fill="var(--color-border)" />
    </svg>
  );
}
