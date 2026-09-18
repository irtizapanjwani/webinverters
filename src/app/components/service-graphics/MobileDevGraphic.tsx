/** Two phone mockups showing app screens — realistic mobile UI. */
export default function MobileDevGraphic() {
  return (
    <svg viewBox="0 0 520 380" className="h-full w-full" role="presentation">
      {/* back phone (Android style) */}
      <g transform="translate(300 30) rotate(6)">
        <rect width="160" height="320" rx="22" fill="var(--color-bg-alt)" stroke="var(--color-border-strong)" strokeWidth="1.5" />
        {/* status bar */}
        <rect x="0" y="0" width="160" height="32" rx="22" fill="var(--color-bg-alt)" />
        <rect x="0" y="18" width="160" height="14" fill="var(--color-bg-alt)" />
        <rect x="56" y="8" width="48" height="6" rx="3" fill="var(--color-border-strong)" />
        <rect x="120" y="8" width="18" height="6" rx="3" fill="var(--color-border-strong)" />
        <rect x="142" y="8" width="8" height="6" rx="2" fill="var(--color-accent-2)" />

        {/* app content */}
        <rect x="14" y="42" width="132" height="52" rx="10" fill="var(--color-accent)" opacity="0.1" />
        <rect x="24" y="54" width="60" height="10" rx="4" fill="var(--color-ink)" opacity="0.6" />
        <rect x="24" y="72" width="90" height="6" rx="3" fill="var(--color-border)" />
        <rect x="24" y="82" width="70" height="6" rx="3" fill="var(--color-border)" />

        <rect x="14" y="106" width="62" height="62" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="22" y="114" width="46" height="30" rx="6" fill="var(--color-accent)" opacity="0.15" />
        <rect x="22" y="152" width="36" height="5" rx="2.5" fill="var(--color-border-strong)" />
        <rect x="22" y="160" width="26" height="5" rx="2.5" fill="var(--color-accent)" />

        <rect x="84" y="106" width="62" height="62" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="92" y="114" width="46" height="30" rx="6" fill="var(--color-accent-2)" opacity="0.15" />
        <rect x="92" y="152" width="36" height="5" rx="2.5" fill="var(--color-border-strong)" />
        <rect x="92" y="160" width="26" height="5" rx="2.5" fill="var(--color-accent-2)" />

        <rect x="14" y="180" width="132" height="48" rx="10" fill="var(--color-surface)" stroke="var(--color-border)" />
        <rect x="24" y="190" width="80" height="6" rx="3" fill="var(--color-border-strong)" />
        <rect x="24" y="202" width="100" height="5" rx="2.5" fill="var(--color-border)" />
        <rect x="24" y="214" width="50" height="8" rx="4" fill="var(--color-accent)" />

        {/* bottom nav */}
        <rect x="0" y="278" width="160" height="42" rx="0" fill="var(--color-surface)" />
        <path d="M0 278h160" stroke="var(--color-border)" />
        <circle cx="40" cy="299" r="8" fill="var(--color-accent)" opacity="0.15" />
        <circle cx="40" cy="299" r="3" fill="var(--color-accent)" />
        <circle cx="80" cy="299" r="8" fill="var(--color-border)" opacity="0.3" />
        <circle cx="80" cy="299" r="3" fill="var(--color-border-strong)" />
        <circle cx="120" cy="299" r="8" fill="var(--color-border)" opacity="0.3" />
        <circle cx="120" cy="299" r="3" fill="var(--color-border-strong)" />
      </g>

      {/* front phone (iPhone style) */}
      <g transform="translate(48 28)">
        <rect width="180" height="324" rx="28" fill="var(--color-surface)" stroke="var(--color-border-strong)" strokeWidth="1.8" />
        {/* dynamic island */}
        <rect x="62" y="10" width="56" height="18" rx="10" fill="var(--color-ink)" />

        {/* status bar */}
        <rect x="24" y="12" width="24" height="6" rx="3" fill="var(--color-ink)" opacity="0.5" />
        <rect x="140" y="12" width="16" height="6" rx="3" fill="var(--color-ink)" opacity="0.5" />
        <rect x="158" y="12" width="8" height="6" rx="2" fill="var(--color-accent)" />

        {/* app header */}
        <rect x="20" y="40" width="80" height="12" rx="4" fill="var(--color-ink)" />
        <circle cx="154" cy="46" r="10" fill="var(--color-bg-alt)" />
        <rect x="148" y="43" width="4" height="6" rx="2" fill="var(--color-border-strong)" />
        <rect x="154" y="43" width="4" height="6" rx="2" fill="var(--color-border-strong)" />

        {/* hero card */}
        <rect x="16" y="62" width="148" height="88" rx="14" fill="var(--color-accent)" />
        <rect x="28" y="76" width="80" height="10" rx="4" fill="var(--color-surface)" opacity="0.9" />
        <rect x="28" y="94" width="100" height="6" rx="3" fill="var(--color-surface)" opacity="0.5" />
        <rect x="28" y="106" width="60" height="6" rx="3" fill="var(--color-surface)" opacity="0.4" />
        <rect x="28" y="122" width="56" height="18" rx="9" fill="var(--color-surface)" />
        <rect x="38" y="127" width="36" height="8" rx="4" fill="var(--color-accent)" />

        {/* list items */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x="16" y={162 + i * 46} width="148" height="38" rx="10" fill="var(--color-bg-alt)" />
            <rect x="28" y={170 + i * 46} width="22" height="22" rx="6" fill={i === 0 ? "var(--color-accent)" : i === 1 ? "var(--color-accent-2)" : "var(--color-accent)"} opacity="0.15" />
            <rect x="58" y={174 + i * 46} width="60" height="6" rx="3" fill="var(--color-border-strong)" />
            <rect x="58" y={186 + i * 46} width="80" height="5" rx="2.5" fill="var(--color-border)" />
          </g>
        ))}

        {/* bottom tab bar */}
        <rect x="0" y="282" width="180" height="42" rx="0" fill="var(--color-surface)" />
        <path d="M0 282h180" stroke="var(--color-border)" />
        <rect x="30" y="292" width="20" height="16" rx="4" fill="var(--color-accent)" opacity="0.15" />
        <rect x="35" y="296" width="10" height="8" rx="2" fill="var(--color-accent)" />
        <rect x="70" y="296" width="16" height="8" rx="3" fill="var(--color-border)" />
        <rect x="100" y="296" width="16" height="8" rx="3" fill="var(--color-border)" />
        <rect x="130" y="296" width="16" height="8" rx="3" fill="var(--color-border)" />
      </g>
    </svg>
  );
}
