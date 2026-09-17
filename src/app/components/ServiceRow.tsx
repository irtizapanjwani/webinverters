"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import ExploreLink from "./ExploreLink";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ServiceRow({
  index,
  title,
  exploreLabel,
  description,
  tags,
  graphic,
  reverse = false,
  stagger = 0,
  animateEntrance = true,
  twoCol = false,
}: {
  index: number;
  title: string;
  exploreLabel: string;
  description: string;
  tags: string[];
  graphic: ReactNode;
  reverse?: boolean;
  stagger?: number;
  /** Disable the scroll-triggered fade/slide-in — used inside the 3D stack,
   * where the block's own rise animation already serves as the entrance. */
  animateEntrance?: boolean;
  /** Always two columns, ignoring viewport breakpoints. The 3D card has its own
   * fixed pixel width, so `lg:` (which measures the viewport) would otherwise
   * collapse it to one tall column that can't fit the wide glass block. */
  twoCol?: boolean;
}) {
  const textReveal = animateEntrance
    ? {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-15% 0px" } as const,
      }
    : { initial: false as const, animate: { opacity: 1, y: 0 } };

  const gridClass = twoCol
    ? "grid grid-cols-2 items-center gap-8"
    : "grid items-center gap-10 lg:grid-cols-2 lg:gap-16";
  const textOrder = reverse ? (twoCol ? "order-2" : "lg:order-2") : "";
  const graphicOrder = reverse ? (twoCol ? "order-1" : "lg:order-1") : "";

  return (
    <div className={gridClass}>
      <motion.div
        {...textReveal}
        transition={{ duration: 0.65, ease: EASE, delay: stagger }}
        className={`min-w-0 ${textOrder}`}
      >
        <span className="mb-4 block font-display text-sm font-bold text-accent-2">
          {String(index).padStart(2, "0")}
        </span>
        <h3 className="mb-3 font-display text-2xl font-semibold tracking-[-0.02em] sm:text-[28px]">
          {title}
        </h3>
        <p className="mb-5 max-w-md text-[15px] leading-[1.65] text-ink-dim">{description}</p>
        <div className="mb-6 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-white/5 px-3 py-1.5 text-[12px] font-semibold text-ink-dim"
            >
              {tag}
            </span>
          ))}
        </div>
        <ExploreLink href="#" label={exploreLabel} />
      </motion.div>

      <motion.div
        {...textReveal}
        transition={{ duration: 0.65, ease: EASE, delay: stagger + 0.1 }}
        className={`min-w-0 ${graphicOrder}`}
      >
        {graphic}
      </motion.div>
    </div>
  );
}
