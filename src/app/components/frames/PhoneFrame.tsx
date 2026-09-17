"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useTilt } from "./useTilt";

export default function PhoneFrame({
  children,
  tiltDisabled = false,
}: {
  children: ReactNode;
  tiltDisabled?: boolean;
}) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(tiltDisabled);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="mx-auto w-full max-w-[260px] rounded-[2.25rem] border-[6px] border-surface-2 bg-bg-alt p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)]"
    >
      <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface">
        <div className="absolute left-1/2 top-0 z-10 h-5 w-24 -translate-x-1/2 rounded-b-2xl bg-bg-alt" />
        <div className="p-4 pt-8">{children}</div>
      </div>
    </motion.div>
  );
}
