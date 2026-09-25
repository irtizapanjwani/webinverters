import Button from "./Button";
import { ArrowRightIcon } from "./icons";

export default function FinalCTA() {
  return (
    <section className="pt-22 pb-18 lg:pt-[180px] lg:pb-[140px]">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        {/* Deliberately a fixed-dark spotlight panel, independent of the
            site's own light theme — it no longer blends into the page bg */}
        <div
          className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-[#0B1330] to-[#05070C] px-6 py-12 text-center sm:px-14 sm:py-20 lg:py-24"
        >
          <div
            className="pointer-events-none absolute left-1/2 top-[-220px] size-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(27,90,240,0.35),transparent_68%)] blur-[10px]"
            aria-hidden="true"
          />
          <h2 className="relative mb-4.5 font-display text-[clamp(22px,4vw,39px)] font-bold tracking-[-0.02em] text-white">
            Have a Project in Mind?
          </h2>
          <p className="relative mx-auto mb-9 max-w-[520px] text-[17px] text-white/70">
            Tell us where you want to go — we&apos;ll help engineer the way
            there. No pressure, just a straight conversation about your goals.
          </p>
          <div className="relative flex flex-wrap justify-center gap-4">
            <Button href="/contact">
              Start Your Project
              <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.75" />
            </Button>
            <Button href="/contact" variant="ghost" surface="dark">
              Book a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
