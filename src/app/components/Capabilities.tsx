"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import { SERVICES } from "./serviceData";
import { SERVICE_SHADES } from "./serviceShades";
import PlatformsCard from "./PlatformsCard";
import ServiceIcon from "./ServiceIcon";

function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

const blockId = (slug: string) => `capability-${slug}`;

/** The button on each service card, e.g. "All Web Design Services". */
const CTA_LABELS: Record<string, string> = {
  "web-design": "All Web Design Services",
  "mobile-apps": "All Mobile App Services",
  ecommerce: "All E-commerce Services",
  branding: "All Branding Services",
  seo: "All SEO Services",
  "social-media": "All Social Media Services",
};

/**
 * "Our Capabilities" on the Services page. The left column lists every service
 * and stays in view while the right column scrolls through them: for each
 * service, a gradient card (icon, title, description, a call to action and the
 * service's picture) followed by its specialities, with the platforms card
 * after Web Design & Development. The list highlights the service being read,
 * and clicking one glides to it.
 */
export default function Capabilities() {
  const [active, setActive] = useState(0);
  const blockRefs = useRef<(HTMLElement | null)[]>([]);

  // Highlight the service being read: the last block whose top has passed a
  // line 40% of the way down the screen. Measured on every scroll frame
  // rather than on crossing events, so a fast scroll or a jump down the page
  // can never leave the highlight behind — and the gaps between blocks (and
  // the platforms card) simply keep the previous service lit.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let index = 0;
      blockRefs.current.forEach((el, i) => {
        if (el && el.getBoundingClientRect().top <= line) index = i;
      });
      setActive(index);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="bg-bg py-18 lg:py-[120px]" aria-labelledby="capabilities-heading">
      <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] lg:gap-16 xl:gap-20">
        {/* ---------- Left: heading and the service list ---------- */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <span className="mb-3 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Expertise
          </span>
          <h2
            id="capabilities-heading"
            className="mb-8 font-display text-[clamp(26px,3.2vw,42px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink lg:mb-10"
          >
            Our <span className="text-accent">Capabilities</span>
          </h2>

          <ul className="hidden lg:block">
            {SERVICES.map((service, i) => {
              const isActive = i === active;
              return (
                <li key={service.slug}>
                  <a
                    href={`#${blockId(service.slug)}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      blockRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className="group flex items-center gap-4 border-b border-border py-3.5"
                  >
                    <span
                      className={`flex size-12 shrink-0 items-center justify-center rounded-[10px] border transition-colors duration-300 ${
                        isActive
                          ? "border-accent bg-accent text-white"
                          : "border-border bg-bg-alt text-ink-faint group-hover:text-accent"
                      }`}
                    >
                      <ServiceIcon index={i} className="size-5" />
                    </span>
                    <span
                      className={`flex-1 text-[16.5px] font-semibold transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-ink group-hover:text-accent"
                      }`}
                    >
                      {service.title}
                    </span>
                    <ArrowUpRight
                      className={`size-4 shrink-0 transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-ink-faint group-hover:text-accent"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- Right: a card and specialities per service ---------- */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {SERVICES.map((service, i) => (
            <Fragment key={service.slug}>
              <div
                id={blockId(service.slug)}
                ref={(el) => {
                  blockRefs.current[i] = el;
                }}
                className="scroll-mt-28"
              >
                <article
                  data-surface="dark"
                  className={`relative grid overflow-hidden rounded-[24px] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] ${SERVICE_SHADES[i % SERVICE_SHADES.length]}`}
                >
                  <div className="relative z-10 flex flex-col justify-center p-7 sm:p-9 xl:p-11">
                    <span className="mb-6 flex size-12 items-center justify-center rounded-[12px] border border-white/25 bg-white/10 backdrop-blur-sm">
                      <ServiceIcon index={i} className="size-5" />
                    </span>
                    <h3 className="mb-4 font-display text-[clamp(21px,2vw,28px)] leading-[1.15] font-bold tracking-[-0.01em]">
                      {service.title}
                    </h3>
                    <p className="mb-7 max-w-[440px] text-[15px] leading-[1.65] text-white/80">
                      {service.description}
                    </p>
                    {/* Opens this service's own page, or — until it has one — its
                        tab in the Services section on the home page. */}
                    <Link
                      href={service.page ?? `/#service-${service.slug}`}
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/[0.06] px-5 py-2.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-ink"
                    >
                      {CTA_LABELS[service.slug] ?? `All ${service.shortTitle} Services`}
                      <ArrowUpRight className="size-3.5" />
                    </Link>
                  </div>

                  {/* The illustration is transparent, so it sits straight on
                      the card's gradient. A soft glow behind it lifts it off
                      the darker areas, and a drop shadow grounds it. */}
                  <div className="relative px-5 pb-6 md:px-0 md:py-4 md:pr-4">
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.22),transparent)] blur-2xl"
                    />
                    <div className="relative aspect-[3/2] w-full md:aspect-auto md:h-full md:min-h-[320px]">
                      <Image
                        src={service.cardImage}
                        alt={service.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 32vw, (min-width: 768px) 45vw, 90vw"
                        className="object-contain drop-shadow-[0_24px_30px_rgba(0,0,0,0.35)]"
                      />
                    </div>
                  </div>
                </article>

                <ul className="mt-4">
                  {service.tags.map((tag) => (
                    <li key={tag}>
                      <a
                        href="#start-project"
                        className="group flex items-center justify-between gap-4 border-b border-border py-4 text-[16px] font-medium text-ink transition-colors hover:text-accent"
                      >
                        {tag}
                        <ArrowUpRight className="size-4 shrink-0 text-ink-faint transition-colors group-hover:text-accent" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {service.slug === "web-design" && <PlatformsCard />}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
