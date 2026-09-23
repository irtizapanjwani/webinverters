import Button from "./Button";
import RotatingWord from "./RotatingWord";
import TrustedStrip from "./TrustedStrip";
import { ArrowRightIcon } from "./icons";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden pt-16 sm:pt-20 lg:pt-28">
      <div className="dot-field pointer-events-none absolute inset-x-0 top-0 h-[640px]" aria-hidden="true" />

      <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-6 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[60px]">
        <div data-hero-reveal>
          <h1 className="mb-4 font-display text-[clamp(26px,4.4vw,54px)] leading-[1.05] font-extrabold tracking-[-0.02em] text-white">
            Digital Solutions That Move Your Business{" "}
            <RotatingWord />
          </h1>

          <p className="mb-6 max-w-[520px] text-[clamp(16px,1.6vw,19px)] leading-[1.65] text-white/85">
            We&apos;re a full-service digital agency helping ambitious brands build,
            grow, and stand out in the digital world.
          </p>

          <div className="mb-8 flex flex-wrap gap-4">
            <Button href="#start-project">
              Start Project
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.75" />
            </Button>
            {/* The hero now sits on the video, so the ghost button uses the
                existing dark-surface treatment rather than the light one. */}
            <Button href="#work" variant="ghost" surface="dark">
              View Our Work
            </Button>
          </div>
        </div>
      </div>

      <TrustedStrip />
    </section>
  );
}
