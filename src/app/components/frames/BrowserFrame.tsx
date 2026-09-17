"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useTilt } from "./useTilt";

export default function BrowserFrame({
  children,
  url = "yourbrand.com",
  tiltDisabled = false,
}: {
  children: ReactNode;
  url?: string;
  tiltDisabled?: boolean;
}) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(tiltDisabled);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="overflow-hidden rounded-2xl border border-border-strong bg-surface shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
    >
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
        </span>
        <span className="mx-auto flex items-center gap-1.5 rounded-full bg-bg/60 px-3 py-1 text-[11px] text-ink-faint">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-3"
          >
            <rect x="5" y="10" width="14" height="10" rx="2" />
            <path d="M8 10V7a4 4 0 0 1 8 0v3" />
          </svg>
          {url}
        </span>
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  );
}
