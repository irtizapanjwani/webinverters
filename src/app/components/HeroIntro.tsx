"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

// Timeline (ms). Total ≈ 2.8s.
const ORB_AT = 1000; // logo → orb crossfade begins
const TRAVEL_AT = 1700; // big orb starts moving right
const COPY_AT = 2150; // hero copy eases in mid-travel
const HANDOFF_AT = 2500; // travel ends; real orb takes over instantly
const END_AT = 2800;

// Durations (s)
const LOGO_IN = 0.55;
const CROSSFADE = 0.5;
const TRAVEL = 0.8;
const BACKDROP_FADE = 0.8; // runs with the travel so both finish together
const ORB_HANDOFF_FADE = 0.25;

const FALLBACK = { orbSize: 160, bigOrb: 420, logoWidth: 560 };

type Phase = "logo" | "orb" | "travel" | "handoff";
type Stage = { dx: number; dy: number; orbSize: number; bigOrb: number; logoWidth: number };

export default function HeroIntro() {
  const [finished, setFinished] = useState(false);
  const [phase, setPhase] = useState<Phase>("logo");
  const [stage, setStage] = useState<Stage | null>(null);
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

    const measure = () => {
      const orb = document.querySelector<HTMLElement>("[data-hero-orb]");
      if (!orb) return;
      const rect = orb.getBoundingClientRect();
      // The centre orb is deliberately much larger than the hero orb; it
      // shrinks into place as it travels.
      const bigOrb = Math.min(420, window.innerWidth * 0.42, window.innerHeight * 0.52);
      setStage({
        dx: rect.left + rect.width / 2 - window.innerWidth / 2,
        dy: rect.top + rect.height / 2 - window.innerHeight / 2,
        orbSize: rect.width,
        bigOrb,
        logoWidth: Math.min(bigOrb * 1.35, window.innerWidth * 0.86),
      });
    };
    measure();

    // A stale measurement would fling the orb to the wrong spot, so bail out.
    const onScroll = () => {
      if (window.scrollY > 40) end();
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const timers = [
      setTimeout(() => setPhase("orb"), ORB_AT),
      setTimeout(() => setPhase("travel"), TRAVEL_AT),
      setTimeout(() => root.setAttribute("data-hero-intro", "revealing"), COPY_AT),
      // The real orb is revealed with no transition at the exact moment the
      // overlay orb lands on it at full opacity, so the swap is invisible and
      // the orb is never even momentarily faded.
      setTimeout(() => {
        root.removeAttribute("data-hero-intro");
        setPhase("handoff");
      }, HANDOFF_AT),
      setTimeout(end, END_AT),
    ];

    return () => {
      window.removeEventListener("scroll", onScroll);
      timers.forEach(clearTimeout);
      root.removeAttribute("data-hero-intro");
    };
  }, [prefersReduced]);

  if (finished) return null;

  const orbSize = stage?.orbSize ?? FALLBACK.orbSize;
  const bigOrb = stage?.bigOrb ?? FALLBACK.bigOrb;
  const logoWidth = stage?.logoWidth ?? FALLBACK.logoWidth;
  // Starts big, ends at exactly 1 so the box-shadow matches the real orb's.
  const startScale = bigOrb / orbSize;

  const moving = phase === "travel" || phase === "handoff";

  return (
    <div className="hero-intro pointer-events-none fixed inset-0 z-200" aria-hidden="true">
      <motion.div
        className="absolute inset-0 bg-bg"
        initial={{ opacity: 1 }}
        animate={{ opacity: moving ? 0 : 1 }}
        transition={{ duration: BACKDROP_FADE, ease: "easeInOut" }}
      />

      {/* Logo stage — shares the orb stage's centre so the crossfade happens
          in place, with no jump and no gap. */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{
            opacity: phase === "logo" ? 1 : 0,
            scale: phase === "logo" ? 1 : 1.04,
          }}
          transition={{ duration: phase === "logo" ? LOGO_IN : CROSSFADE, ease: EASE }}
        >
          <Image
            src="/web-inverters-logo-dark.png"
            alt=""
            width={1090}
            height={208}
            priority
            style={{ width: logoWidth }}
            className="h-auto max-w-none"
          />
        </motion.div>
      </div>

      {/* Orb stage — big at centre, then shrinks and travels to the hero orb */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="relative"
          style={{ width: orbSize, height: orbSize }}
          initial={{ x: 0, y: 0, scale: startScale }}
          animate={{
            x: moving ? (stage?.dx ?? 0) : 0,
            y: moving ? (stage?.dy ?? 0) : 0,
            scale: moving ? 1 : startScale,
          }}
          transition={{ duration: TRAVEL, ease: EASE }}
        >
          <motion.div
            className="orb-surface absolute inset-0 rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "logo" || phase === "handoff" ? 0 : 1 }}
            transition={{
              duration: phase === "handoff" ? ORB_HANDOFF_FADE : CROSSFADE,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
