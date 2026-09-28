"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import { SERVICES } from "./serviceData";
import { WEB_TABS, type ShowcaseTab } from "./servicePages";

function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/**
 * The Web Design page's showcase: a large card with the service picture on the
 * right and, on the left, a headline and description for the kind of website
 * picked in the tab bar along its foot. Below it, a bar of related services.
 *
 * The tabs follow the ARIA tabs pattern: arrow keys, Home and End move between
 * them, and the text panel is labelled by the selected tab.
 */
type WebServiceTabsProps = {
  tabs?: ShowcaseTab[];
  /** The service picture on the right of the card. */
  image?: string;
  /** What the showcase and its tabs are about, for screen readers. */
  label?: string;
  tabsLabel?: string;
  /** Services not to list as related (this page's own is always left out). */
  slug?: string;
  exclude?: string[];
};

export default function WebServiceTabs({
  tabs = WEB_TABS,
  image = "/services-landing-page/web-design.jpg",
  label = "Website design services",
  tabsLabel = "Kinds of website",
  slug = "web-design",
  exclude = ["ecommerce"],
}: WebServiceTabsProps) {
  const TABS = tabs;
  const related = SERVICES.filter((s) => s.slug !== slug && !exclude.includes(s.slug));
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const tab = TABS[active];

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = TABS.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 pt-8 sm:px-6 lg:px-8 lg:pt-10">
      {/* ---------- Showcase card ---------- */}
      <section
        data-surface="dark"
        aria-label={label}
        className="relative overflow-hidden rounded-[28px] bg-[#0B1330] text-white"
      >
        {/* The picture fills the right of the card. Its white backdrop is
            kept (it belongs to the photo), and the card's navy fades across
            it from the left so the text always sits on dark. */}
        <div aria-hidden="true" className="absolute inset-y-0 right-0 w-full lg:w-[68%]">
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0B1330_0%,rgba(11,19,48,0.92)_22%,rgba(11,19,48,0.35)_52%,rgba(11,19,48,0)_72%)] max-lg:bg-[linear-gradient(180deg,rgba(11,19,48,0.82),#0B1330_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(11,19,48,0.55))]" />
          {/* A navy tint along the right and top edges, so the card keeps its
              outline where the photo's white meets the white page. */}
          <div className="absolute inset-0 bg-[linear-gradient(270deg,rgba(11,19,48,0.55),transparent_22%),linear-gradient(180deg,rgba(11,19,48,0.4),transparent_18%)]" />
        </div>

        <div className="relative flex min-h-[620px] flex-col justify-between gap-10 p-7 sm:p-10 lg:min-h-[680px] lg:p-14">
          {/* Headline, description and call to action for the selected tab */}
          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${active}`}
            className="max-w-[560px]"
          >
            <h2 className="mb-6 font-display text-[clamp(30px,3.6vw,52px)] leading-[1.06] font-extrabold tracking-[-0.03em]">
              <span className="text-[#8FB2FF]">{tab.lead}</span>
              <br />
              {tab.rest}
            </h2>
            <p className="mb-8 text-[16px] leading-[1.7] text-white/80">{tab.body}</p>
            <a
              href="#start-project"
              className="inline-flex items-center rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(27,90,240,0.8)] transition-colors duration-300 hover:bg-accent-lift"
            >
              Request a Proposal
            </a>
          </div>

          {/* The tab bar along the foot of the card */}
          <div
            role="tablist"
            aria-label={tabsLabel}
            onKeyDown={onKeyDown}
            className="flex gap-1.5 overflow-x-auto rounded-full border border-white/15 bg-[#0B1330]/75 p-1.5 backdrop-blur-md [scrollbar-width:none]"
          >
            {TABS.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.label}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`${baseId}-tab-${i}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  className={`shrink-0 grow rounded-full border px-5 py-2.5 text-[15px] font-semibold whitespace-nowrap transition-colors duration-300 ${
                    selected
                      ? "border-white bg-white text-ink"
                      : "border-white/10 text-white hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Related services ---------- */}
      <nav
        data-surface="dark"
        aria-label="Related services"
        className="mt-6 flex flex-col gap-6 rounded-[28px] bg-[radial-gradient(45%_140%_at_0%_50%,rgba(27,90,240,0.55),transparent_70%),radial-gradient(40%_140%_at_100%_50%,rgba(14,116,144,0.4),transparent_70%),linear-gradient(90deg,#0F1D4A,#0B1330)] p-7 text-white sm:p-9 lg:flex-row lg:items-center lg:justify-between lg:px-14"
      >
        <p className="font-display text-[clamp(24px,2.4vw,34px)] leading-[1.1] font-extrabold tracking-[-0.02em]">
          Related <span className="text-[#8FB2FF]">Services</span>
        </p>
        <div className="flex flex-wrap items-center gap-3 lg:gap-4">
          <ul className="flex flex-wrap gap-3">
            {related.map((service) => (
              <li key={service.slug}>
                <Link
                  href={service.page ?? `/#service-${service.slug}`}
                  className="group flex items-center gap-3 rounded-[14px] border border-white/15 bg-white/[0.05] py-2 pr-2 pl-4 text-[15px] font-semibold transition-colors duration-300 hover:border-white/35 hover:bg-white/[0.1]"
                >
                  {service.menuTitle}
                  <span className="flex size-10 items-center justify-center rounded-[10px] border border-white/20 transition-colors duration-300 group-hover:bg-white/15">
                    <ArrowUpRight />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <span aria-hidden="true" className="mx-2 hidden h-12 w-px bg-white/15 xl:block" />
          <Link
            href="/services"
            className="rounded-full border border-white/20 px-6 py-2.5 text-[15px] font-semibold transition-colors duration-300 hover:bg-white hover:text-ink"
          >
            All Services
          </Link>
        </div>
      </nav>
    </div>
  );
}
