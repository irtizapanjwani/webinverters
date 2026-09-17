import Button from "./Button";
import { ArrowRightIcon } from "./icons";

export default function FinalCTA() {
  return (
    <section className="pb-18 lg:pb-[140px]">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div
          id="start-project"
          className="reveal relative overflow-hidden rounded-[28px] border border-border-strong bg-gradient-to-b from-[#0B1330] to-bg to-70% px-6 py-12 text-center sm:px-14 sm:py-20 lg:py-24"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-[-220px] size-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(27,90,240,0.35),transparent_68%)] blur-[10px]"
            aria-hidden="true"
          />
          <h2 className="relative mb-4.5 font-display text-[clamp(30px,5vw,48px)] font-bold tracking-[-0.02em]">
            Have a Project in Mind?
          </h2>
          <p className="relative mx-auto mb-9 max-w-[520px] text-[17px] text-ink-dim">
            Tell us where you want to go — we&apos;ll help engineer the way
            there. No pressure, just a straight conversation about your goals.
          </p>
          <div className="relative flex flex-wrap justify-center gap-4">
            <Button href="#start-project">
              Start Your Project
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.75" />
            </Button>
            <Button href="#contact" variant="ghost">
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
