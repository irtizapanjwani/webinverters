"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import BrowserFrame from "../frames/BrowserFrame";
import CountUp from "../CountUp";

const KEYWORDS = [
  { term: "digital agency near me", from: 14, to: 3 },
  { term: "custom web development", from: 22, to: 8 },
  { term: "ecommerce seo services", from: 31, to: 11 },
];

export default function SeoGraphic({ tiltDisabled = false }: { tiltDisabled?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <BrowserFrame url="search-console.app" tiltDisabled={tiltDisabled}>
      <div ref={ref}>
        <span className="mb-4 block font-display text-xs font-bold tracking-[0.14em] text-ink-faint uppercase">
          Keyword Rankings
        </span>

        <div className="mb-4 flex flex-col gap-2">
          {KEYWORDS.map((k) => (
            <div
              key={k.term}
              className="flex items-center justify-between rounded-lg border border-border bg-bg-alt px-3 py-2"
            >
              <span className="truncate text-[12px] font-medium text-ink-dim">{k.term}</span>
              <span className="flex items-center gap-1.5 font-display text-sm font-bold text-accent-2">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-3"
                >
                  <line x1="12" y1="19" x2="12" y2="5" />
                  <polyline points="6 11 12 5 18 11" />
                </svg>
                <CountUp to={k.to} from={k.from} duration={1.3} />
              </span>
            </div>
          ))}
        </div>

        <svg viewBox="0 0 200 50" className="h-12 w-full">
          <motion.path
            d="M4 42 L40 34 L76 36 L112 20 L148 22 L196 6"
            fill="none"
            stroke="var(--color-accent-2)"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: inView ? 1 : 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </div>
    </BrowserFrame>
  );
}
