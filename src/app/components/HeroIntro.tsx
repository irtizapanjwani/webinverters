"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Timeline (ms). Total ≈ 2.2s.
const FADE_AT = 1400; // logo and backdrop start clearing; hero copy eases in
const END_AT = 2200;

// Durations (s)
const LOGO_IN = 0.55;
const FADE_OUT = 0.6;
const BACKDROP_FADE = 0.8;

export default function HeroIntro() {
  const [finished, setFinished] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;

    const end = () => {
      root.removeAttribute("data-hero-intro");
      setFinished(true);
    };

    if (prefersReduced) {
      end();
      return;
    }

    root.setAttribute("data-hero-intro", "running");

    const onScroll = () => {
      if (window.scrollY > 40) end();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const timers = [
      setTimeout(() => {
        setLeaving(true);
        // Releases the hero copy so it eases in behind the clearing overlay.
        root.setAttribute("data-hero-intro", "revealing");
      }, FADE_AT),
      setTimeout(end, END_AT),
    ];

    return () => {
      window.removeEventListener("scroll", onScroll);
      timers.forEach(clearTimeout);
      root.removeAttribute("data-hero-intro");
    };
  }, [prefersReduced]);

  if (finished) return null;

  return (
    <div className="hero-intro pointer-events-none fixed inset-0 z-200" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-bg"
        initial={{ opacity: 1 }}
        animate={{ opacity: leaving ? 0 : 1 }}
        transition={{ duration: BACKDROP_FADE, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{
            opacity: leaving ? 0 : 1,
            scale: leaving ? 1.04 : 1,
          }}
          transition={{ duration: leaving ? FADE_OUT : LOGO_IN, ease: EASE }}
        >
          <Image
            src="/web-inverters-logo-dark.png"
            alt=""
            width={1090}
            height={208}
            priority
            className="h-auto w-[min(567px,86vw)] max-w-none"
          />
        </motion.div>
      </div>
    </div>
  );
}
