"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CardFrame from "../frames/CardFrame";

const SWATCHES = ["#1B5AF0", "#22D3EE", "#8B5CF6", "#F4F6FB", "#0E1424"];

// CardFrame has no screen chrome, so cursor tilt never applies here — the prop
// only exists so this component has the same call signature as the other 5.
export default function BrandingGraphic(props: { tiltDisabled?: boolean } = {}) {
  void props;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <CardFrame>
      <div ref={ref} className="flex flex-col gap-6">
        <div className="flex items-center justify-center rounded-xl border border-border bg-bg-alt py-8">
          <svg viewBox="0 0 120 80" className="h-16 w-24">
            <motion.path
              d="M10 65 L35 15 L60 55 L85 15 L110 65"
              fill="none"
              stroke="var(--color-accent-2)"
              strokeWidth={7}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: inView ? 1 : 0 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>
        </div>

        <div className="flex items-center justify-center gap-3">
          {SWATCHES.map((c) => (
            <span
              key={c}
              className="size-8 rounded-full border border-border-strong"
              style={{ background: c }}
            />
          ))}
        </div>

        <div className="flex items-center justify-center gap-6 border-t border-border pt-5">
          <span className="font-display text-4xl font-semibold">Aa</span>
          <span className="text-4xl font-normal text-ink-dim">Aa</span>
        </div>
      </div>
    </CardFrame>
  );
}
