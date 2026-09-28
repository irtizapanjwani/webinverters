"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useRef, useState } from "react";

const STEPS = [
  {
    title: "Discover",
    body: "We align on goals, study your audience and competitors, and audit what you have — research that shapes the sitemap, content and standards.",
  },
  {
    title: "Design",
    body: "We turn strategy into layouts, components and responsive designs, with interactive prototypes so the decisions that matter are made before anything is built.",
  },
  {
    title: "Development",
    body: "We build on a clean, well-structured codebase or CMS, with accessibility, performance and analytics handled from the first line — not bolted on at the end.",
  },
  {
    title: "Launch",
    body: "We run full QA, set up redirects and tracking, hand over clearly, then plan the first improvements so the site keeps earning its place after go-live.",
  },
];

/** Where each step's dot sits along the line, as a fraction of its length. */
const DOT_AT = STEPS.map((_, i) => (i + 0.5) / STEPS.length);

/**
 * "Our Web Design Process" on the Web Design page: four large outlined circles
 * strung on one line. As the section scrolls through the screen, a Signal Blue
 * fill runs along the line from the first circle to the last, and each step's
 * dot lights up as the fill reaches it. Below 1280px (tablets and phones) the circles stack and
 * the line runs down instead. With reduced motion, the line is shown full.
 */
export default function WebProcess() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.55"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const [reached, setReached] = useState(reduce ? STEPS.length : 0);

  useMotionValueEvent(fill, "change", (v) => {
    const count = DOT_AT.filter((at) => v >= at - 0.01).length;
    setReached((prev) => (prev === count ? prev : count));
  });

  const shown = reduce ? STEPS.length : reached;

  return (
    <section
      data-surface="dark"
      aria-labelledby="web-process-heading"
      className="mt-16 overflow-hidden bg-[radial-gradient(55%_45%_at_50%_0%,rgba(27,90,240,0.22),transparent_70%),linear-gradient(180deg,#05070C_0%,#0B1330_100%)] py-20 text-white lg:mt-24 lg:py-28"
    >
      <div className="mx-auto w-full max-w-[1400px] px-5 text-center sm:px-8">
        <span className="mb-5 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase [color:#5EC4DB]">
          Process
        </span>
        <h2
          id="web-process-heading"
          className="mb-6 font-display text-[clamp(28px,4vw,56px)] leading-[1.08] font-extrabold tracking-[-0.03em]"
        >
          Our <span className="text-[#8FB2FF]">Web Design</span> Process
        </h2>
        <p className="mx-auto max-w-[600px] text-[17px] leading-[1.65] text-white/75">
          A structured process shaped by insights, analytics and research —
          measured against clear success metrics.
        </p>
      </div>

      {/* ---------- The steps on the line ----------
          Every circle is the same size and holds its dot at the same height
          (46% down), so the line is drawn at 46% of the row with plain CSS
          and passes through every dot at any screen size. The blue fill runs
          from the first dot (centre of column 1, 12.5%) to the last (87.5%). */}
      <div ref={trackRef} className="relative mx-auto mt-16 w-full max-w-[1840px] px-5 sm:px-8 lg:mt-24">
        <div className="relative">
          {/* Side by side (1280px+): the line across the row — faint across
              the full screen width, filling in blue across the circles. */}
          <div aria-hidden="true" className="pointer-events-none absolute top-[46%] left-1/2 hidden h-px w-screen -translate-x-1/2 bg-white/15 xl:block" />
          <div aria-hidden="true" className="pointer-events-none absolute right-[12.5%] left-[12.5%] top-[46%] hidden h-px xl:block">
            <motion.div
              className="h-full origin-left bg-[linear-gradient(90deg,#1B5AF0,#8FB2FF)] shadow-[0_0_12px_rgba(59,130,246,0.8)]"
              style={{ scaleX: reduce ? 1 : fill }}
            />
          </div>

          {/* Stacked (below 1280px): a line down the middle of the column. */}
          <div aria-hidden="true" className="pointer-events-none absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 bg-white/15 xl:hidden">
            <motion.div
              className="h-full w-full origin-top bg-[linear-gradient(180deg,#1B5AF0,#8FB2FF)]"
              style={{ scaleY: reduce ? 1 : fill }}
            />
          </div>

          <ol className="relative grid justify-items-center gap-10 xl:grid-cols-4 xl:gap-0">
            {STEPS.map((step, i) => {
              const lit = i < shown;
              return (
                <li
                  key={step.title}
                  className="@container relative aspect-square w-full max-w-[380px] rounded-full border border-white/15 bg-[#070B18] text-center xl:w-[92%] xl:bg-transparent"
                >
                  {/* Number and title, sitting just above the dot */}
                  <div className="absolute inset-x-[16%] bottom-[calc(54%+7cqw)] flex flex-col items-center">
                    <span className="mb-[3cqw] font-mono text-[clamp(11px,3.4cqw,13px)] text-white/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[clamp(14px,5cqw,19px)] font-semibold">{step.title}</h3>
                  </div>

                  {/* The dot on the line */}
                  <span
                    aria-hidden="true"
                    className={`absolute top-[46%] left-1/2 flex size-[clamp(26px,9.5cqw,36px)] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-500 ${
                      lit ? "bg-accent/30" : "bg-white/[0.06]"
                    }`}
                  >
                    <span
                      className={`size-3 rounded-full transition-all duration-500 ${
                        lit ? "bg-[#3B82F6] shadow-[0_0_14px_4px_rgba(59,130,246,0.75)]" : "bg-white/35"
                      }`}
                    />
                  </span>

                  {/* Description, below the dot */}
                  <p className="absolute inset-x-[14%] top-[calc(46%+8cqw)] text-[clamp(10.5px,3.45cqw,13px)] leading-[1.55] text-white/75">
                    {step.body}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="mt-14 text-center lg:mt-20">
        <a
          href="#start-project"
          className="inline-flex items-center rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(27,90,240,0.8)] transition-colors duration-300 hover:bg-accent-lift"
        >
          Request a Proposal
        </a>
      </div>
    </section>
  );
}
