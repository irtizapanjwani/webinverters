import Button from "./Button";
import RotatingWord from "./RotatingWord";
import TrustedStrip from "./TrustedStrip";
import { ArrowRightIcon } from "./icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-6 pb-8 sm:pt-8 lg:pt-8 lg:pb-10">
      <div className="dot-field pointer-events-none absolute inset-x-0 top-0 h-[640px]" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[60px]">
        <div data-hero-reveal>
          <h1 className="mb-4 font-manrope text-[clamp(38px,5.6vw,68px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-accent">
            Digital Solutions That Move Your Business{" "}
            <RotatingWord />
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

        <div className="relative mx-auto flex aspect-square w-full max-w-[290px] items-center justify-center sm:max-w-[400px]" aria-hidden="true">
          <div className="absolute inset-[6%] animate-spin-slow rounded-full border border-accent/28">
            <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent-2 shadow-[0_0_14px_3px_rgba(14,116,144,0.7)]" />
          </div>
          <div className="absolute inset-[16%] animate-spin-slow-reverse rounded-full border border-accent-2/22">
            <span className="absolute top-1/2 -right-1 size-2 -translate-y-1/2 rounded-full bg-accent-2 shadow-[0_0_14px_3px_rgba(14,116,144,0.7)]" />
          </div>
          <div className="absolute inset-[26%] animate-spin-slow-dashed rounded-full border border-dashed border-border-strong">
            <span className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent-2 shadow-[0_0_14px_3px_rgba(14,116,144,0.7)]" />
          </div>
          <div
            data-hero-orb
            className="orb-surface absolute inset-[30%] animate-pulse-orb rounded-full"
          />

          <span
            className="falling-star absolute size-1 rounded-full bg-accent-2 shadow-[0_0_10px_3px_rgba(14,116,144,0.6)]"
            style={{ top: "62%", left: "40%", "--fall-x": "-26px", "--fall-y": "230px", animationRange: "exit 0% exit 75%" } as React.CSSProperties}
          />
          <span
            className="falling-star absolute size-1.5 rounded-full bg-accent shadow-[0_0_12px_4px_rgba(27,90,240,0.55)]"
            style={{ top: "68%", left: "50%", "--fall-x": "8px", "--fall-y": "260px", animationRange: "exit 6% exit 90%" } as React.CSSProperties}
          />
          <span
            className="falling-star absolute size-1 rounded-full bg-accent-2 shadow-[0_0_10px_3px_rgba(14,116,144,0.6)]"
            style={{ top: "64%", left: "60%", "--fall-x": "28px", "--fall-y": "200px", animationRange: "exit 12% exit 100%" } as React.CSSProperties}
          />
        </div>
      </div>

      <TrustedStrip />
    </section>
  );
}
