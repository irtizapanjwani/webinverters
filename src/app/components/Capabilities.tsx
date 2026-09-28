"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import { SERVICES } from "./serviceData";
import { SERVICE_SHADES } from "./serviceShades";

/** Line icons for the capability list and cards, in SERVICES order. */
const ICONS: React.ReactNode[] = [
  // Web Design & Development — browser window with code brackets
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 8h18" />
    <path d="m10 12-2 2 2 2" />
    <path d="m14 12 2 2-2 2" />
  </>,
  // Mobile App Development — phone
  <>
    <rect x="7" y="2.5" width="10" height="19" rx="2" />
    <path d="M11 18.5h2" />
  </>,
  // E-commerce Development — shopping bag
  <>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </>,
  // Branding — four-point spark
  <>
    <path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z" />
  </>,
  // SEO — globe
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </>,
  // Social Media Management — chat bubbles
  <>
    <path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    <path d="M17 9h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2.5L16 18h-3" />
  </>,
];

function ServiceIcon({ index, className }: { index: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONS[index % ICONS.length]}
    </svg>
  );
}

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

/** Official marks from Simple Icons (CC0), drawn in white on each platform's
 *  brand colour. The custom-build entry uses a code icon. */
const PLATFORMS: { name: string; badge: string; icon: React.ReactNode }[] = [
  {
    name: "Webflow Design & Dev",
    badge: "bg-[#146EF5]",
    icon: <path fill="currentColor" d="m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z" />,
  },
  {
    name: "WordPress Design & Dev",
    badge: "bg-[#21759B]",
    icon: <path fill="currentColor" d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" />,
  },
  {
    name: "Custom & Headless Development",
    badge: "bg-[linear-gradient(135deg,#0F766E,#10B981)]",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
        <path d="m13.5 4-3 16" />
      </g>
    ),
  },
  {
    name: "Wix Studio Design & Dev",
    badge: "bg-[linear-gradient(135deg,#4F46E5,#8B5CF6)]",
    icon: <path fill="currentColor" d="m0 7.354 2.113 9.292h.801a1.54 1.54 0 0 0 1.506-1.218l1.351-6.34a.171.171 0 0 1 .167-.137c.08 0 .15.058.167.137l1.352 6.34a1.54 1.54 0 0 0 1.506 1.218h.805l2.113-9.292h-.565c-.62 0-1.159.43-1.296 1.035l-1.26 5.545-1.106-5.176a1.76 1.76 0 0 0-2.19-1.324c-.639.176-1.113.716-1.251 1.365l-1.094 5.127-1.26-5.537A1.33 1.33 0 0 0 .563 7.354H0zm13.992 0a.951.951 0 0 0-.951.95v8.342h.635a.952.952 0 0 0 .951-.95V7.353h-.635zm1.778 0 3.158 4.66-3.14 4.632h1.325c.368 0 .712-.181.918-.486l1.756-2.59a.12.12 0 0 1 .197 0l1.754 2.59c.206.305.55.486.918.486h1.326l-3.14-4.632L24 7.354h-1.326c-.368 0-.712.181-.918.486l-1.772 2.617a.12.12 0 0 1-.197 0L18.014 7.84a1.108 1.108 0 0 0-.918-.486H15.77z" />,
  },
  {
    name: "Squarespace Design & Dev",
    badge: "bg-[#0B0B0B]",
    icon: <path fill="currentColor" d="M22.655 8.719c-1.802-1.801-4.726-1.801-6.564 0l-7.351 7.35c-.45.45-.45 1.2 0 1.65.45.449 1.2.449 1.65 0l7.351-7.351c.899-.899 2.362-.899 3.264 0 .9.9.9 2.364 0 3.264l-7.239 7.239c.9.899 2.362.899 3.263 0l5.589-5.589c1.836-1.838 1.836-4.763.037-6.563zm-2.475 2.437c-.451-.45-1.201-.45-1.65 0l-7.354 7.389c-.9.899-2.361.899-3.262 0-.45-.45-1.2-.45-1.65 0s-.45 1.2 0 1.649c1.801 1.801 4.726 1.801 6.564 0l7.351-7.35c.449-.487.449-1.239.001-1.688zm-2.439-7.35c-1.801-1.801-4.726-1.801-6.564 0l-7.351 7.351c-.45.449-.45 1.199 0 1.649s1.2.45 1.65 0l7.395-7.351c.9-.899 2.371-.899 3.27 0 .451.45 1.201.45 1.65 0 .421-.487.421-1.199-.029-1.649h-.021zm-2.475 2.437c-.45-.45-1.2-.45-1.65 0l-7.351 7.389c-.899.9-2.363.9-3.265 0-.9-.899-.9-2.363 0-3.264l7.239-7.239c-.9-.9-2.362-.9-3.263 0L1.35 8.719c-1.8 1.8-1.8 4.725 0 6.563 1.801 1.801 4.725 1.801 6.564 0l7.35-7.351c.451-.488.451-1.238 0-1.688h.002z" />,
  },
];

/**
 * "Platforms We Design & Build On" — its own card, right below the Web Design
 * & Development block. A frosted brand-blue card with a glass button per
 * platform, each badge in that platform's own colour.
 */
function PlatformsCard() {
  return (
    <section
      data-surface="dark"
      aria-labelledby="platforms-heading"
      className="relative overflow-hidden rounded-[24px] bg-[radial-gradient(70%_110%_at_15%_0%,rgba(27,90,240,0.55),transparent_60%),radial-gradient(60%_90%_at_100%_100%,rgba(14,116,144,0.35),transparent_62%),linear-gradient(180deg,#2F5FA8_0%,#6E8FBF_60%,#A3B6D2_100%)] p-6 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] sm:p-9 xl:p-11"
    >
      <h3
        id="platforms-heading"
        className="mb-7 font-display text-[clamp(21px,2vw,30px)] leading-[1.15] font-bold tracking-[-0.01em] sm:mb-8"
      >
        Platforms <span className="font-semibold text-white/80">We Design &amp; Build On</span>
      </h3>

      <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        {PLATFORMS.map((platform) => (
          <li key={platform.name}>
            <a
              href="#start-project"
              className="group flex h-full items-center gap-4 rounded-[16px] border border-white/25 bg-white/[0.12] p-3 pr-5 backdrop-blur-sm transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.2]"
            >
              <span
                className={`flex h-11 w-[68px] shrink-0 items-center justify-center rounded-full text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_14px_-6px_rgba(0,0,0,0.45)] ${platform.badge}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
                  {platform.icon}
                </svg>
              </span>
              <span className="flex-1 text-[15.5px] leading-[1.3] font-semibold">{platform.name}</span>
              <ArrowUpRight className="size-4 shrink-0 text-white/75 transition-colors group-hover:text-white" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const blockId = (slug: string) => `capability-${slug}`;

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
                    <a
                      href="#start-project"
                      className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/[0.06] px-5 py-2.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-white hover:text-ink"
                    >
                      Discuss your project
                      <ArrowUpRight className="size-3.5" />
                    </a>
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
