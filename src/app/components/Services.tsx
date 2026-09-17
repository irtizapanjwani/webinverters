import ServiceStackGate from "./ServiceStackGate";
import { SERVICES } from "./serviceData";

// overflow-x-clip (not -hidden): `hidden` would force overflow-y to auto and
// break the sticky fallback cards inside this section.
export default function Services() {
  return (
    <section className="overflow-x-clip py-18 lg:py-[140px]" id="services">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="reveal mb-14 max-w-[640px] sm:mb-20">
          <span className="mb-3.5 block font-display text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            What We Do
          </span>
          <h2 className="mb-4 font-display text-[clamp(28px,4vw,42px)] leading-[1.1] font-semibold tracking-[-0.02em]">
            Services engineered around outcomes
          </h2>
          <p className="text-[17px] leading-[1.6] text-ink-dim">
            From first sketch to shipped product — every service is built to
            compound into business growth.
          </p>
        </div>

        <ServiceStackGate services={SERVICES} />
      </div>
    </section>
  );
}
