"use client";

import { useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VIDEO_TESTIMONIALS = [
  {
    quote: "The entire team genuinely cares about their customer service.",
    body: "Brand Vision has delivered a complete brand and website for Olexa Education, and internal stakeholders are thrilled with the results. The team is flexible and accommodating, and they deliver work on time. Brand Vision is passionate about their work, and they strive to deliver a perfect end product.",
  },
  {
    quote: "They understood the bigger picture, not just the website design.",
    body: "Brand Vision revamped Roncelli's branding, website structure, UX, and storytelling. The team met deadlines, communicated effectively, and explored new designs that aligned with the client's vision. Moreover, they understood the bigger picture and were collaborative and easy to work with.",
  },
];


/** Google's official multicolour wordmark (public/logos/google-wordmark.svg,
 *  from the svgl brand library). Its four brand colours read on both light and
 *  dark surfaces, so it needs no plate behind it. */
function GoogleWordmark() {
  return (
    <Image
      src="/logos/google-wordmark.svg"
      alt="Google"
      width={272}
      height={92}
      unoptimized
      className="h-8 w-auto"
    />
  );
}

/** Trustpilot's official wordmark (public/logos/trustpilot-wordmark-white.svg,
 *  from the svgl brand library), in the white-lettered variant Trustpilot's
 *  brand kit specifies for dark backgrounds. The green star is unaltered. */
function TrustpilotWordmark() {
  return (
    <Image
      src="/logos/trustpilot-wordmark-white.svg"
      alt="Trustpilot"
      width={600}
      height={147}
      unoptimized
      className="h-7 w-auto"
    />
  );
}

/** Official BBB Accredited Business A+ seal (public/arating.webp, 529×342),
 *  supplied by Web Inventers. Shown as-is: its own white field and blue frame
 *  already carry it on the dark card. */
function BbbSeal() {
  return (
    <Image
      src="/arating.webp"
      alt="BBB Accredited Business, A+ rating"
      width={529}
      height={342}
      className="h-auto w-[128px]"
    />
  );
}

/** Official Clutch "Top Web Designers" badges (public/cluth.webp, 1215×360),
 *  supplied by Web Inventers — one image holding all three badges. */
function ClutchBadges() {
  return (
    <Image
      src="/cluth.webp"
      alt="Clutch Top Web Designers badges"
      width={1215}
      height={360}
      className="h-auto w-full max-w-[240px]"
    />
  );
}

/** Light testimonial cards. The static hairline border replaces the old
 *  animated blue trace — the card edge now simply holds still. */
const CARD_CLASS =
  "why-card group relative overflow-hidden rounded-[18px] border border-border bg-bg-alt p-6 sm:p-7";

/** Dark trust cards: the site's spotlight-panel base (#0B1330 → #05070C, as on
 *  the contact panel and "Have a Project in Mind?") with a Signal Blue sweep.
 *  Each card's sweep enters from a different corner, like the reference, so
 *  the three read as a set rather than three copies. */
// min-h holds the row at the height it had before the badge images were
// scaled down — the images shrank, the cards should not have.
const DARK_CARD_CLASS =
  "why-card group relative min-h-[234px] overflow-hidden rounded-[18px] border border-white/10 p-6 sm:p-7";

const DARK_SHADES = [
  "bg-[radial-gradient(120%_95%_at_88%_12%,rgba(27,90,240,0.42),transparent_62%),linear-gradient(135deg,#0B1330,#05070C)]",
  "bg-[radial-gradient(110%_100%_at_50%_0%,rgba(27,90,240,0.5),transparent_64%),linear-gradient(160deg,#0B1330,#05070C)]",
  "bg-[radial-gradient(120%_100%_at_14%_88%,rgba(27,90,240,0.55),transparent_62%),linear-gradient(135deg,#05070C,#0B1330)]",
];

/**
 * Silent looping clip filling a testimonial card, subject on the right. Loads
 * and plays only while the card is near the viewport — the clips sit far down
 * the page, so nothing is fetched until the visitor gets there — and never
 * plays under reduced motion.
 */
function VideoBackdrop({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { rootMargin: "200px" }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <>
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
      />
      {/* Darkens the left, where the text sits, and clears toward the
          subject on the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,12,0.86)_0%,rgba(5,7,12,0.62)_42%,rgba(5,7,12,0)_78%)]"
      />
    </>
  );
}

type WhyUsProps = {
  /** One clip per testimonial card, in order. Omit to keep the plain cards
   *  (the landing page does). */
  testimonialVideos?: string[];
};

export default function WhyUs({ testimonialVideos }: WhyUsProps = {}) {
  const [active, setActive] = useState<number | null>(null);

  const contentStyle = (i: number) => {
    const isActive = active === i;
    return {
      transform: isActive ? "scale(1) translateY(0)" : "scale(0.97) translateY(3px)",
      opacity: isActive ? 1 : 0.75,
    };
  };

  return (
    <section className="bg-bg-alt pt-14 pb-18 lg:pt-[104px] lg:pb-[140px]" id="about">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        {/* centered heading */}
        <div className="mx-auto mb-14 max-w-[640px] text-center sm:mb-20">
          <span className="mb-2.5 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Why Web Inventers
          </span>
          <h2 className="font-display text-[clamp(23px,3.7vw,42px)] leading-[1.06] font-extrabold tracking-[-0.02em]">
            A technology partner, not a template shop
          </h2>
        </div>

        {/* video testimonials — a clip fills the card when one is passed in */}
        <div className="mb-4 grid grid-cols-1 gap-4 sm:mb-5 lg:grid-cols-2 lg:gap-5">
          {VIDEO_TESTIMONIALS.map((t, i) => {
            const video = testimonialVideos?.[i];
            return (
              <div
                key={t.quote}
                data-surface={video ? "dark" : undefined}
                className={
                  video
                    ? "why-card group relative overflow-hidden rounded-[18px] border border-white/10 bg-[#05070C] p-6 sm:p-7"
                    : CARD_CLASS
                }
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
              >
                {video && <VideoBackdrop src={video} />}
                {/* Text holds the left ~64% of the card, leaving the right to
                    the subject of the clip (or clear space without one). Type
                    is sized so the card reads as a wide rectangle. */}
                <div
                  className="relative z-10 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] lg:max-w-[64%]"
                  style={contentStyle(i)}
                >
                  <p
                    className={`mb-3 text-[clamp(16px,1.4vw,19px)] leading-[1.35] font-medium italic ${
                      video ? "text-white" : "text-ink"
                    }`}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className={`text-[13.5px] leading-[1.55] ${video ? "text-white/80" : "text-ink-dim"}`}>
                    {t.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* trust badges */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <div
            data-surface="dark"
            className={`${DARK_CARD_CLASS} ${DARK_SHADES[0]}`}
            onMouseEnter={() => setActive(2)}
            onMouseLeave={() => setActive(null)}
          >
            <div
              className="relative z-10 flex h-full flex-col justify-center gap-4 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={contentStyle(2)}
            >
              <div className="flex items-center">
                <GoogleWordmark />
              </div>
              <div className="h-px bg-white/15" />
              <div className="flex items-center">
                <TrustpilotWordmark />
              </div>
            </div>
          </div>

          <div
            data-surface="dark"
            className={`${DARK_CARD_CLASS} ${DARK_SHADES[1]}`}
            onMouseEnter={() => setActive(3)}
            onMouseLeave={() => setActive(null)}
          >
            <div
              className="relative z-10 flex h-full flex-col items-center justify-center gap-5 text-center transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={contentStyle(3)}
            >
              <BbbSeal />
              <p className="text-[15px] leading-[1.45] font-semibold text-white">
                Performance and accessibility checks before launch
              </p>
            </div>
          </div>

          <div
            data-surface="dark"
            className={`${DARK_CARD_CLASS} ${DARK_SHADES[2]}`}
            onMouseEnter={() => setActive(4)}
            onMouseLeave={() => setActive(null)}
          >
            <div
              className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={contentStyle(4)}
            >
              <ClutchBadges />
              <h3 className="font-display text-[19px] leading-[1.3] font-bold text-white">
                Clutch Top Web Design Agency
              </h3>
              <p className="font-mono text-[13px] text-white/60">2023, 2024, 2025, 2026</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
