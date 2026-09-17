import Button from "./Button";
import TypeTicker from "./TypeTicker";
import { ArrowRightIcon } from "./icons";

const MARQUEE_ITEMS = ["Nova", "Halcyon", "Vertex", "Lumen Labs", "Orbital", "Fintra"];

const CODE_SNIPPETS = [
  "npm run deploy",
  "tests passing ✓",
  "shipping v2.4.0",
  "zero downtime ✓",
];

const SEO_KEYWORDS = [
  "keyword research",
  "core web vitals",
  "#1 on google",
  "organic traffic",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-8 sm:pt-8 lg:pt-8 lg:pb-10">
      <div className="dot-field pointer-events-none absolute inset-x-0 top-0 h-[640px]" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[60px]">
        <div>
          <h1 className="mb-4 font-display text-[clamp(38px,5.6vw,68px)] leading-[1.05] font-bold tracking-[-0.02em]">
            Digital Solutions That Move Business{" "}
            <span className="grad-text">Forward</span>
          </h1>

          <p className="mb-6 max-w-[520px] text-[clamp(16px,1.6vw,19px)] leading-[1.65] text-ink-dim">
            We&apos;re a full-service digital agency helping ambitious brands build,
            grow, and stand out in the digital world.
          </p>

          <div className="mb-8 flex flex-wrap gap-4">
            <Button href="#start-project">
              Get a Quote
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.75" />
            </Button>
            <Button href="#work" variant="ghost">
              View Our Work
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex aspect-square w-full max-w-[400px] items-center justify-center" aria-hidden="true">
          <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-accent/28">
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent-2 shadow-[0_0_14px_3px_rgba(34,211,238,0.7)]" />
          </div>
          <div className="absolute inset-[16%] animate-spin-slow-reverse rounded-full border border-accent-2/22">
            <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-accent-2 shadow-[0_0_14px_3px_rgba(34,211,238,0.7)]" />
          </div>
          <div className="absolute inset-[26%] animate-spin-slow-dashed rounded-full border border-dashed border-white/14">
            <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent-2 shadow-[0_0_14px_3px_rgba(34,211,238,0.7)]" />
          </div>
          <div className="absolute inset-[30%] animate-pulse-orb rounded-full bg-[radial-gradient(circle_at_34%_30%,#DCE8FF_0%,#1B5AF0_34%,#122058_72%,#05070C_100%)] shadow-[0_0_90px_10px_rgba(27,90,240,0.45),0_0_200px_60px_rgba(27,90,240,0.18)]" />

          <span
            className="falling-star absolute size-1 rounded-full bg-white shadow-[0_0_10px_3px_rgba(34,211,238,0.85)]"
            style={{ top: "62%", left: "40%", "--fall-x": "-26px", "--fall-y": "230px", animationRange: "exit 0% exit 75%" } as React.CSSProperties}
          />
          <span
            className="falling-star absolute size-1.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(27,90,240,0.85)]"
            style={{ top: "68%", left: "50%", "--fall-x": "8px", "--fall-y": "260px", animationRange: "exit 6% exit 90%" } as React.CSSProperties}
          />
          <span
            className="falling-star absolute size-1 rounded-full bg-white shadow-[0_0_10px_3px_rgba(34,211,238,0.85)]"
            style={{ top: "64%", left: "60%", "--fall-x": "28px", "--fall-y": "200px", animationRange: "exit 12% exit 100%" } as React.CSSProperties}
          />

          <div
            className="absolute flex items-center gap-2.5 rounded-[10px] border border-border-strong bg-surface/85 px-4 py-3 text-[12.5px] font-semibold shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-[10px] animate-float-node"
            style={{ top: "8%", right: "2%", animationDelay: ".5s" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-accent-2">
              <polyline points="8 6 2 12 8 18" />
              <polyline points="16 6 22 12 16 18" />
            </svg>
            <TypeTicker phrases={CODE_SNIPPETS} />
          </div>
          <div
            className="absolute flex items-center gap-2.5 rounded-[10px] border border-border-strong bg-surface/85 px-4 py-3 text-[12.5px] font-semibold shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-[10px] animate-float-node"
            style={{ bottom: "10%", left: "0%", animationDelay: "2.2s" }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-4 shrink-0 text-accent-2">
              <circle cx="10.5" cy="10.5" r="6.5" />
              <line x1="15.5" y1="15.5" x2="21" y2="21" />
              <path d="M8 11l1.5 1.5L13 9" />
            </svg>
            <TypeTicker phrases={SEO_KEYWORDS} />
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 w-full max-w-[1400px] border-t border-border px-5 pt-6 sm:px-8">
        <span className="mb-4 block text-xs font-bold tracking-[0.16em] text-ink-faint uppercase">
          Trusted by forward-thinking teams
        </span>
        <div className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="whitespace-nowrap font-display text-xl font-bold text-ink-faint opacity-70"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
