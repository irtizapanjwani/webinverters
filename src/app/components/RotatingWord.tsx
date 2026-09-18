"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["Forward", "Faster", "Further"];
const HOLD_MS = 2800;
const TRANSITION_S = 0.6;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function RotatingWord() {
  const [index, setIndex] = useState(0);
  // Default false so the first client render matches the server-rendered
  // markup exactly; useReducedMotion() itself can't be read until after
  // mount, and branching the DOM structure on it directly causes a
  // hydration mismatch (the server has no matchMedia to resolve it with).
  const [reduceMotion, setReduceMotion] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const sync = () => setReduceMotion(!!prefersReduced);
    sync();
  }, [prefersReduced]);

  useEffect(() => {
    if (reduceMotion) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % WORDS.length), HOLD_MS);
    return () => clearTimeout(t);
  }, [index, reduceMotion]);

  const word = WORDS[index];

  // Reduced motion: no continuous cycling at all, just the original static word.
  if (reduceMotion) {
    return <span className="grad-text">{WORDS[0]}</span>;
  }

  return (
    // Ghost copies of every word sit in the same grid cell (in normal flow)
    // to reserve stable space; the animated word is absolutely positioned on
    // top so swapping words never shifts surrounding layout.
    <span className="relative inline-grid align-baseline">
      {WORDS.map((w) => (
        <span key={w} aria-hidden="true" className="invisible col-start-1 row-start-1">
          {w}
        </span>
      ))}
      <AnimatePresence>
        <motion.span
          key={word}
          className="grad-text absolute inset-0 col-start-1 row-start-1"
          initial={{ opacity: 0, scale: 1.04, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: TRANSITION_S, ease: EASE }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
