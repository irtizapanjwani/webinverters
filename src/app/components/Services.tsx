import ServicesShowcase from "./ServicesShowcase";

export default function Services() {
  return (
    <section className="py-18 lg:py-[140px]" id="services">
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
