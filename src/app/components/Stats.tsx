"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const STATS = [
  { target: 120, label: "Projects Completed" },
  { target: 80, label: "Clients Served" },
  { target: 14, label: "Industries Served" },
  { target: 6, label: "Years of Experience" },
];

/** Layout effect on the client, plain effect during SSR — lets us drop the
 *  counters to zero before the browser paints, so the count-up starts from 0
 *  without the real figures flashing first. */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** One counter drives both copies of the content so they can never disagree.
 *
 *  Seeded with the real figures rather than zero: server-rendered HTML, a
 *  failed hydration, and a reader with scripting off all show the true numbers.
 *  Only once we know we can actually animate do we rewind to zero — a counter
 *  stuck reading "0+ Projects Completed" is worse than no counter at all. */
function useCountUp() {
  const [values, setValues] = useState(() => STATS.map((s) => s.target));
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Counting from zero is decorative motion; honour the user's preference
    // and leave the final figures in place.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    setValues(STATS.map(() => 0));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            const dur = 1300;
            let start: number | null = null;
            const step = (ts: number) => {
              if (start === null) start = ts;
              const p = Math.min((ts - start) / dur, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setValues(STATS.map((s) => Math.round(eased * s.target)));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, values };
}

/** The section's content. Rendered twice: once normally, once in white inside
 *  the expanding circle, so the colour change follows the circle's edge exactly
 *  instead of flipping at some arbitrary scroll threshold. */
function StatsContent({ values, white }: { values: number[]; white?: boolean }) {
  return (
    <div
      className={`${white ? "stats-white " : ""}mx-auto w-full max-w-[1400px] px-5 sm:px-8`}
    >
      <div className="mx-auto mb-10 max-w-[640px] text-center sm:mb-16">
        <span className="mb-2.5 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
          Trust &amp; Results
        </span>
        <h2 className="mb-5 font-display text-[clamp(21px,3.2vw,34px)] leading-[1.1] font-semibold tracking-[-0.02em]">
          Numbers that back up the work
        </h2>
        <p className="text-[17px] leading-[1.6] text-ink-dim">
          A snapshot of the impact we&apos;ve delivered for clients across
          industries.{" "}
          <em className="not-italic text-ink-faint">
            (Illustrative figures — final numbers supplied by Web Inventers.)
          </em>
        </p>
      </div>

      <div className="stats-grid grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-border bg-border lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <div key={stat.label} className="stats-card bg-bg-alt px-5 py-7 text-center sm:py-11">
            <span className="block font-display text-[clamp(32px,4.4vw,52px)] font-bold text-ink">
              {values[i]}
              <span className="text-accent-2">+</span>
            </span>
            <span className="mt-2 block text-sm font-medium text-ink-dim">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { ref: countRef, values } = useCountUp();

  // Centre (relative to this section) is the hero orb's centre, so y is
  // negative — the growth literally starts at the orb, up in the hero.
  const [geo, setGeo] = useState({ x: 0, y: -320, r0: 80, maxScale: 15 });

  // 0 when this section's top hits the middle of the viewport, 1 when it hits
  // the top — so the growth always happens while scrolling, even on short
  // viewports where the section is already partly visible on load.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "start start"],
  });

  // The orb's own scale. Everything else is derived from it, so the growing
  // shape and the section's blue fill can never drift apart.
  const scale = useTransform(scrollYProgress, [0, 0.75], [1, reduce ? 1 : geo.maxScale], {
    clamp: true,
  });
  const radius = useTransform(scale, (s) => geo.r0 * s);

  // Fades in over the real orb while still orb-sized, so it reads as the orb
  // starting to grow rather than a new circle appearing.
  const opacity = useTransform(scrollYProgress, [0, 0.015], [0, reduce ? 0 : 1], { clamp: true });
  // The orb's sphere shading flattens into flat Signal Blue as it becomes the
  // section's surface.
  const spherical = useTransform(scrollYProgress, [0, 0.2], [1, 0], { clamp: true });
  const flat = useTransform(scrollYProgress, [0, 0.2], [0, 1], { clamp: true });

  // A real circle() clip — the transition edge can only ever be curved.
  const clipInSection = useMotionTemplate`circle(${radius}px at ${geo.x}px ${geo.y}px)`;

  useEffect(() => {
    const compute = () => {
      const section = sectionRef.current;
      if (!section) return;
      const sRect = section.getBoundingClientRect();
      const orb = document.querySelector<HTMLElement>("[data-hero-orb]");
      const oRect = orb?.getBoundingClientRect();
      const base = oRect?.width || 160;
      const x = oRect ? oRect.left + oRect.width / 2 - sRect.left : sRect.width / 2;
      const y = oRect ? oRect.top + oRect.height / 2 - sRect.top : -320;

      const maxR = Math.max(
        Math.hypot(x, y),
        Math.hypot(sRect.width - x, y),
        Math.hypot(x, sRect.height - y),
        Math.hypot(sRect.width - x, sRect.height - y)
      );

      setGeo({ x, y, r0: base / 2, maxScale: (maxR * 1.05) / (base / 2) });
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    <section ref={sectionRef} data-stats-section className="relative bg-bg-alt py-18 lg:py-[140px]">
      {/* The hero orb itself, growing. It starts exactly on top of the real orb
          at the same size with the same sphere shading, so the expansion reads
          as that orb opening up. It overflows this section freely and is only
          clipped by the Hero+Stats wrapper in page.tsx. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute z-0"
        style={{
          width: geo.r0 * 2,
          height: geo.r0 * 2,
          left: geo.x - geo.r0,
          top: geo.y - geo.r0,
          scale,
          opacity,
          willChange: "transform",
        }}
      >
        <motion.div
          className="orb-surface absolute inset-0 rounded-full"
          style={{ opacity: spherical }}
        />
        <motion.div
          className="absolute inset-0 rounded-full bg-accent"
          style={{ opacity: flat }}
        />
      </motion.div>

      <div ref={countRef} className="relative z-10">
        <StatsContent values={values} />
      </div>

      {/* Same circle, now carrying the section on Signal Blue with white copy.
          Because it is clipped to the circle, the colour boundary IS the
          circle's curved edge. */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 bg-accent"
        style={{ clipPath: clipInSection, opacity }}
      >
        <div className="py-18 lg:py-[140px]">
          <StatsContent values={values} white />
        </div>
      </motion.div>
    </section>
  );
}
