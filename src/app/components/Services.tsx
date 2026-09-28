import ServicesShowcase from "./ServicesShowcase";
import { SERVICES } from "./serviceData";

export default function Services() {
  return (
    <section className="relative py-18 lg:py-[140px]" id="services">
      {/* Anchors for the navbar's Services menu (/#service-<slug>). They give
          each link a real target at the top of this section, so the browser
          and the router scroll here on arrival; the showcase reads the same
          hash to select the tab. */}
      {SERVICES.map((service) => (
        <span
          key={service.slug}
          id={`service-${service.slug}`}
          aria-hidden="true"
          className="absolute top-0 left-0"
        />
      ))}
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mb-14 max-w-[640px] sm:mb-20">
          <h2 className="mb-5 font-display text-[clamp(27px,4.7vw,58px)] leading-[1.02] font-extrabold tracking-[-0.03em]">
            Services
          </h2>
          <p className="text-[17px] leading-[1.6] text-ink-dim">
            From first sketch to shipped product — every service is built to
            compound into business growth.
          </p>
        </div>

        <ServicesShowcase />
      </div>
    </section>
  );
}
