"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Headline intro: a text-width cover wipes on L→R (no scale/pop), fully covers
   the line, holds, then wipes off L→R.

   The text is not animated at all. It is simply off while the cover is arriving
   and on for the whole wipe-off, so the cover uncovering it IS the reveal —
   letter one is already there on the wipe's first frame and the line reads as
   having been behind the box the entire time. */
/* 1.5s end to end: the cover sweeps on, barely pauses, and is gone. */
const COVER_APPEAR = 0.45;
const COVER_HOLD = 0.15;
const COVER_WIPE = 0.9;

/** "on" = cover sweeping in over bare background, text hidden.
 *  "hold" = line fully covered; the text is switched on under here, unseen.
 *  "off" = cover sweeping away, uncovering text that is already in place. */
type CoverPhase = "on" | "hold" | "off";

const COVER_CLIP: Record<CoverPhase, string> = {
  on: "inset(0% 0% 0% 0%)",
  hold: "inset(0% 0% 0% 0%)",
  off: "inset(0% 0% 0% 100%)",
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

/**
 * The dark header that opens the inner pages (Portfolio, About): eyebrow,
 * cover-wipe headline, supporting line. Shared so every page gets the same
 * animation from one implementation rather than drifting copies.
 *
 * Pair it with the page-level dark backdrop behind <Nav />, which gives the
 * navbar its transparent white-text treatment over this block.
 */
export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  const reduce = useReducedMotion();
  const [coverPhase, setCoverPhase] = useState<CoverPhase>("on");

  // One clock for the cover and the text, so the text is guaranteed to be in
  // place before the wipe-off starts rather than racing it.
  useEffect(() => {
    if (reduce) return;
    const toHold = setTimeout(() => setCoverPhase("hold"), COVER_APPEAR * 1000);
    const toOff = setTimeout(
      () => setCoverPhase("off"),
      (COVER_APPEAR + COVER_HOLD) * 1000
    );
    return () => {
      clearTimeout(toHold);
      clearTimeout(toOff);
    };
  }, [reduce]);

  return (
    <div className="bg-ink pt-40 pb-20 lg:pt-48 lg:pb-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <span className="mb-2.5 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
          {eyebrow}
        </span>

        {/* Headline: cover wipes on L→R (no scale/pop), fully covers the
            text (incl. vertical bleed), holds, then wipes off L→R */}
        <div className="relative mb-5 w-fit max-w-full">
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="absolute inset-x-0 -top-2 -bottom-2 z-10 rounded-[4px] bg-gradient-to-r from-white via-[#d7e4ff] to-[#7aa7ff]"
              /* Clipped to nothing at the left edge, then opened out to
                 full width, then clipped away from the left again — all
                 four sides given in the same units so the interpolation
                 between phases is unambiguous. */
              initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
              animate={{ clipPath: COVER_CLIP[coverPhase] }}
              transition={{
                duration: coverPhase === "off" ? COVER_WIPE : COVER_APPEAR,
                ease: EASE,
              }}
            />
          )}

          {/* Deliberately NOT animated. It is hidden while the cover sweeps
              in, and fully opaque for the entire wipe-off — switched on
              during the hold, while the cover still hides it completely.
              Nothing fades: the box moving off the text is the reveal. */}
          <h1
            className={`font-display text-[clamp(25px,4vw,45px)] leading-[1.06] font-extrabold tracking-[-0.02em] text-white ${
              reduce || coverPhase === "off" ? "opacity-100" : "opacity-0"
            }`}
          >
            {title}
          </h1>
        </div>

        <p className="max-w-[640px] text-[17px] leading-[1.6] text-white/70">
          {description}
        </p>
      </div>
    </div>
  );
}
