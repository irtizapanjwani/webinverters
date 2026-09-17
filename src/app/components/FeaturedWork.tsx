import { ArrowRightIcon } from "./icons";

const PROJECTS = [
  {
    tag: "Retail",
    gradient:
      "radial-gradient(120% 120% at 20% 20%, #1B5AF0 0%, #0B1330 55%, #05070C 100%)",
    title: "Northwind Retail",
    meta: "E-commerce Platform",
    services: ["Web Design", "E-commerce", "SEO"],
    result: "+64% conversion rate*",
  },
  {
    tag: "Healthcare",
    gradient:
      "radial-gradient(120% 120% at 80% 20%, #22D3EE 0%, #0B1330 55%, #05070C 100%)",
    title: "Aster Health",
    meta: "Mobile App",
    services: ["Mobile App", "Branding"],
    result: "120K+ downloads*",
  },
  {
    tag: "Fintech",
    gradient:
      "radial-gradient(120% 120% at 30% 80%, #8B5CF6 0%, #0B1330 55%, #05070C 100%)",
    title: "Vantage Finance",
    meta: "Brand & Web",
    services: ["Branding", "Web Design", "SEO"],
    result: "3x lead volume*",
  },
];

export default function FeaturedWork() {
  return (
    <section className="py-18 lg:py-[140px]" id="work">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="reveal mb-10 max-w-[640px] sm:mb-16">
          <span className="mb-3.5 block font-display text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Featured Work
          </span>
          <h2 className="mb-4 font-display text-[clamp(28px,4vw,42px)] leading-[1.1] font-semibold tracking-[-0.02em]">
            Projects that moved the needle
          </h2>
          <p className="text-[17px] leading-[1.6] text-ink-dim">
            A look at recent engagements — full case studies available on
            request.
          </p>
        </div>

        <div className="grid gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href="#"
              className="reveal group block overflow-hidden rounded-[18px] border border-border bg-surface transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-border-strong"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <div
                  className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.3,1)] group-hover:scale-[1.06]"
                  style={{ background: project.gradient }}
                />
                <span className="absolute top-4 left-4 rounded-full border border-white/16 bg-bg/70 px-3 py-1.5 text-[11.5px] font-bold tracking-[0.04em] backdrop-blur-md">
                  {project.tag}
                </span>
              </div>
              <div className="px-6 pt-6.5 pb-7">
                <h3 className="mb-1.5 text-[19px] font-semibold">{project.title}</h3>
                <div className="mb-3.5 text-[13px] text-ink-faint">{project.meta}</div>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-white/5 px-2.5 py-1 text-[11.5px] font-semibold text-ink-dim"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mb-4 text-[13.5px] font-bold text-accent-2">
                  {project.result}
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold">
                  View Case Study
                  <ArrowRightIcon className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-7 text-[13px] text-ink-faint">
          *Sample projects and results shown for layout purposes — to be
          replaced with real case studies and client-approved figures.
        </p>
      </div>
    </section>
  );
}
