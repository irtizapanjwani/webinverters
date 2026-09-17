"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const arrowVariants = {
  rest: { x: 0 },
  hover: { x: 5 },
};

const springTransition = { type: "spring" as const, stiffness: 400, damping: 22 };

export default function ExploreLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.div initial="rest" whileHover="hover" animate="rest" className="inline-block">
      <Link href={href} className="inline-flex items-center gap-2 text-sm font-bold text-ink">
        Explore {label}
        <motion.svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          variants={arrowVariants}
          transition={springTransition}
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </motion.svg>
      </Link>
    </motion.div>
  );
}
