"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BrowserFrame from "../frames/BrowserFrame";
import CountUp from "../CountUp";

const METRICS = [
  { label: "LCP", value: "1.2s" },
  { label: "FCP", value: "0.6s" },
  { label: "CLS", value: "0.01" },
];

const SCORE = 98;
const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function WebDevGraphic({ tiltDisabled = false }: { tiltDisabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <BrowserFrame url="hyperflow.studio" tiltDisabled={tiltDisabled}>
      <div ref={ref}>
        <div className="mb-5 flex items-center justify-between">
          <span className="font-display text-xs font-bold tracking-[0.14em] text-ink-faint uppercase">
            Hyperflow Studio
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-accent-2">
            <span className="size-1.5 rounded-full bg-accent-2 shadow-[0_0_8px_#22D3EE]" />
            Live
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative flex size-24 shrink-0 items-center justify-center">
            <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
              <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="var(--color-border)" strokeWidth="8" />
              <motion.circle
                cx="50"
                cy="50"
                r={RADIUS}
                fill="none"
                stroke="var(--color-accent-2)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                initial={{ strokeDashoffset: CIRCUMFERENCE }}
                animate={{
                  strokeDashoffset: inView ? CIRCUMFERENCE * (1 - SCORE / 100) : CIRCUMFERENCE,
                }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
            <span className="absolute font-display text-xl font-bold">
              <CountUp to={SCORE} duration={1.3} />
            </span>
          </div>

          <div className="flex flex-1 flex-col gap-2.5">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="flex items-center justify-between rounded-lg border border-border bg-bg-alt px-3 py-2 text-[12.5px]"
              >
                <span className="font-semibold text-ink-dim">{m.label}</span>
                <span className="font-display font-bold text-accent-2">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}
