const ICON_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "mb-3.5 size-5.5 text-accent-2",
};

const REASONS = [
  {
    title: "Experienced Team",
    desc: "Engineers and designers who've shipped products across a dozen industries.",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20c1-3.5 3.5-5.5 6-5.5s5 2 6 5.5" />
        <circle cx="17.5" cy="9" r="2.3" />
        <path d="M15.8 14.2c2 .3 3.7 2 4.5 4.8" />
      </svg>
    ),
  },
  {
    title: "Custom Solutions",
    desc: "No cookie-cutter builds — every solution is engineered around your goals.",
    icon: (
      <svg {...ICON_PROPS}>
        <line x1="4" y1="6" x2="20" y2="6" />
        <circle cx="9" cy="6" r="2" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <circle cx="16" cy="12" r="2" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="11" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Modern Technology",
    desc: "We build with the frameworks and infrastructure that scale with you.",
    icon: (
      <svg {...ICON_PROPS}>
        <rect x="7" y="7" width="10" height="10" rx="1.5" />
        <rect x="10" y="10" width="4" height="4" />
        <line x1="12" y1="2.5" x2="12" y2="7" />
        <line x1="12" y1="17" x2="12" y2="21.5" />
        <line x1="2.5" y1="12" x2="7" y2="12" />
        <line x1="17" y1="12" x2="21.5" y2="12" />
      </svg>
    ),
  },
  {
    title: "Quality-Focused Development",
    desc: "Rigorous code review, testing, and performance budgets on every project.",
    icon: (
      <svg {...ICON_PROPS}>
        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Business-Focused Approach",
    desc: "Every decision is measured against the outcome it drives for your business.",
    icon: (
      <svg {...ICON_PROPS} strokeWidth={1.7}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Long-Term Support",
    desc: "We stay on after launch — monitoring, iterating, and growing with you.",
    icon: (
      <svg {...ICON_PROPS}>
        <circle cx="12" cy="12" r="8.5" />
        <circle cx="12" cy="12" r="3" />
        <line x1="5.6" y1="5.6" x2="9.2" y2="9.2" />
        <line x1="18.4" y1="5.6" x2="14.8" y2="9.2" />
        <line x1="5.6" y1="18.4" x2="9.2" y2="14.8" />
        <line x1="18.4" y1="18.4" x2="14.8" y2="14.8" />
      </svg>
    ),
  },
];

export default function WhyUs() {
  return (
    <section className="bg-bg-alt py-18 lg:py-[140px]" id="about">
      <div className="mx-auto grid w-full max-w-[1400px] items-start gap-8 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="reveal max-w-[640px]">
          <span className="mb-3.5 block font-display text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Why Web Inventers
          </span>
          <h2 className="mb-4 font-display text-[clamp(28px,4vw,42px)] leading-[1.1] font-semibold tracking-[-0.02em]">
            A technology partner, not a template shop
          </h2>
          <p className="text-[17px] leading-[1.6] text-ink-dim">
            We combine senior engineering, thoughtful design, and a genuine
            stake in your outcomes — the difference between a website and a
            growth engine.
          </p>
        </div>

        <div className="reveal grid grid-cols-1 gap-4 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="rounded-[18px] border border-border bg-bg-alt p-6 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-accent/40"
            >
              {reason.icon}
              <h4 className="mb-1.5 text-[15.5px] font-bold">{reason.title}</h4>
              <p className="text-[13.5px] leading-[1.55] text-ink-dim">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
