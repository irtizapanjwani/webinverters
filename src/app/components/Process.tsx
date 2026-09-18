const STEPS = [
  { num: "01", title: "Discover", desc: "We dig into your business, users, and goals." },
  { num: "02", title: "Strategy", desc: "We map the roadmap, tech stack, and success metrics." },
  { num: "03", title: "Design", desc: "We craft interfaces as functional as they are beautiful." },
  { num: "04", title: "Development", desc: "We build with clean, scalable, well-tested code." },
  { num: "05", title: "Launch", desc: "We ship with confidence — tested, optimized, and ready." },
  { num: "06", title: "Growth & Support", desc: "We monitor, iterate, and help you keep growing." },
];

export default function Process() {
  return (
    <section className="bg-bg-alt py-18 lg:py-[140px]">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mx-auto mb-10 max-w-[640px] text-center sm:mb-16">
          <span className="mb-2.5 block font-display text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Our Process
          </span>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[1.1] font-semibold tracking-[-0.02em]">
            How we take an idea to launch
          </h2>
        </div>

        <div className="relative grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4 lg:before:absolute lg:before:top-[23px] lg:before:left-[calc(100%/12)] lg:before:right-[calc(100%/12)] lg:before:h-px lg:before:bg-gradient-to-r lg:before:from-accent/50 lg:before:to-accent-2/50 lg:before:content-['']">
          {STEPS.map((step) => (
            <div key={step.num} className="group relative">
              <div className="relative z-1 mb-5.5 flex size-[46px] items-center justify-center rounded-full border border-border-strong bg-bg-alt font-display text-[15px] font-bold transition-[border-color,box-shadow] duration-300 group-hover:border-accent-2 group-hover:shadow-[0_0_0_6px_rgba(14,116,144,0.1)]">
                {step.num}
              </div>
              <h3 className="mb-2 text-base font-bold">{step.title}</h3>
              <p className="text-[13.5px] leading-[1.55] text-ink-dim">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
