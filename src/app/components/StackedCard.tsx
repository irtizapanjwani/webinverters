"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { ReactNode } from "react";
import { useIsMobile } from "./useIsMobile";

export default function StackedCard({
  children,
  index,
  isLast = false,
}: {
  children: ReactNode;
  index: number;
  isLast?: boolean;
}) {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Only the tail end of this card's own scroll range overlaps with the
  // next card sliding up over it, so dimming is held off until ~75%.
  const scale = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 1, 0.6]);
  const blurPx = useTransform(scrollYProgress, [0, 0.75, 1], [0, 0, 4]);
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  if (isMobile) {
    return <div className="py-8">{children}</div>;
  }

  return (
    <section ref={sectionRef} className="relative min-h-screen" style={{ zIndex: index }}>
      <motion.div
        style={{
          scale: isLast ? 1 : scale,
          opacity: isLast ? 1 : opacity,
          filter: isLast ? "none" : filter,
          willChange: "transform",
        }}
        className="sticky top-24 rounded-[28px] border border-border-strong bg-surface/55 p-8 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-[20px] backdrop-saturate-[1.6] sm:p-10 lg:p-14"
      >
        {children}
      </motion.div>
    </section>
  );
}
