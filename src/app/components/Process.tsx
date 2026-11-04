"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "Discover",
    desc: "We dig into your business, users, and goals.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "We map the roadmap, tech stack, and success metrics.",
  },
  {
    num: "03",
    title: "Design",
    desc: "We craft interfaces as functional as they are beautiful.",
  },
  {
    num: "04",
    title: "Development",
    desc: "We build with clean, scalable, well-tested code.",
  },
  {
    num: "05",
    title: "Launch",
    desc: "We ship with confidence — tested, optimized, and ready.",
  },
  {
    num: "06",
    title: "Growth & Support",
    desc: "We monitor, iterate, and help you keep growing.",
  },
];

const N = STEPS.length;
const EASE = [0.22, 1, 0.36, 1] as const;
/** How long each step stays in focus before the wheel turns. */
const INTERVAL_MS = 3200;
/** How long one turn of the wheel takes. */
const TURN_MS = 900;
/** Angle between neighbouring steps on the wheel. */
const STEP_DEG = 36;
/** Scroll distance each step holds the stage for, on desktop. */
const VH_PER_STEP = 45;
const TRACK_VH = 100 + N * VH_PER_STEP;
/** Desktop with motion allowed: the section pins and scrolling turns the
 *  wheel, like the Services section. Elsewhere the wheel turns on a timer. */
const PINNED_QUERY =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/** Where step `i` sits relative to the step in focus: 0 is the top of the
 *  wheel, -1 the slot down to the left, +1 down to the right. Kept in
 *  -2..3 so every step has one home slot per turn. */
function offsetOf(i: number, active: number) {
  let o = (((i - active) % N) + N) % N;
  if (o > 3) o -= N;
  return o;
}

/** The shortest way round from one step to another (-2..3). */
function shortestDelta(from: number, to: number) {
  let d = (((to - from) % N) + N) % N;
  if (d > 3) d -= N;
  return d;
}

export default function Process() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  /** Monotonic position of the wheel (`active % N` is the step in focus),
   *  plus where it was before the last turn, to spot steps that wrap round
   *  the hidden back of the wheel. */
  const [{ active, prev: lastActive }, setWheel] = useState({
    active: 0,
    prev: 0,
  });
  const turn = (delta: number) =>
    setWheel((w) => ({ active: w.active + delta, prev: w.active }));
  const [inView, setInView] = useState(false);
  const [paused, setPaused] = useState(false);

  const current = ((active % N) + N) % N;

  // Only turn while the section is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Pinned: the scroll position picks the step. 0 as the track's top meets
  // the viewport top, 1 as its bottom meets the viewport bottom; the spring
  // glides between wheel steps, as in the Services section.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });
  /** How far through the focused step the scroll is, for its ring. */
  const ring = useTransform(smoothed, (p) => {
    const x = Math.min(Math.max(p, 0), 1) * N;
    return Math.min(1, x - Math.min(N - 1, Math.floor(x)));
  });

  useMotionValueEvent(smoothed, "change", (p) => {
    if (!pinned) return;
    const i = Math.min(N - 1, Math.max(0, Math.floor(p * N)));
    setWheel((w) => (w.active === i ? w : { active: i, prev: w.active }));
  });

  // Auto-advance when not pinned. Re-armed on every change, so a click
  // restarts the timer.
  useEffect(() => {
    if (pinned || !inView || paused || reduce) return;
    const t = setTimeout(() => turn(1), INTERVAL_MS);
    return () => clearTimeout(t);
  }, [active, inView, paused, reduce, pinned]);

  const goTo = useCallback(
    (step: number) => {
      const track = trackRef.current;
      if (pinned && track) {
        // Scroll to the middle of that step's stretch; the scroll handler
        // then turns the wheel.
        const top = track.getBoundingClientRect().top + window.scrollY;
        const travel = track.offsetHeight - window.innerHeight;
        window.scrollTo({
          top: top + ((step + 0.5) / N) * travel,
          behavior: "smooth",
        });
        return;
      }
      const delta = shortestDelta(current, step);
      if (delta !== 0) turn(delta);
    },
    [pinned, current],
  );

  return (
    <section
      ref={sectionRef}
      data-surface="dark"
      /* overflow-clip, not hidden: hidden would make the section a scroll
         container and stop the stage below from sticking. */
      className="relative overflow-clip bg-black py-14 text-white lg:py-0 motion-reduce:lg:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* The track gives the pinned stage its scroll distance on desktop;
          elsewhere it collapses to the content's height. */}
      <div
        ref={trackRef}
        className="relative lg:h-[var(--track)] motion-reduce:lg:h-auto"
        style={{ "--track": `${TRACK_VH}vh` } as React.CSSProperties}
      >
        <div className="relative lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:pt-16 motion-reduce:lg:static motion-reduce:lg:h-auto motion-reduce:lg:pt-0">
          {/* Soft blue glow behind the wheel's focus point */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[42%] left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(27,90,240,0.28),transparent_65%)]"
          />

          <div className="relative mx-auto w-full max-w-[1400px] px-5 sm:px-8">
            <div className="mx-auto mb-6 max-w-[640px] text-center sm:mb-8">
              <span className="mb-2.5 block text-xs font-bold tracking-[0.18em] text-accent-lift uppercase">
                Our Process
              </span>
              <h2 className="font-display text-[clamp(21px,3.2vw,34px)] leading-[1.1] font-semibold tracking-[-0.02em] text-white">
                How we take an idea to <span className="text-[#8FB2FF]">launch</span>
              </h2>
            </div>

            {/* Screen-reader version: the whole process as a plain list */}
            <ol className="sr-only">
              {STEPS.map((s) => (
                <li key={s.num}>
                  {s.num}. {s.title}: {s.desc}
                </li>
              ))}
            </ol>

            {/* The wheel. Each step hangs off the wheel's centre (far below the
            stage) and is rotated round it, so a turn carries every circle
            along the arc: the focused one sinks to the bottom-left while the
            next rises from the bottom-right. Radius is a CSS variable so the
            wheel tightens on small screens. */}
            <div
              aria-hidden="true"
              className="relative mx-auto h-[150px] overflow-hidden [--r:260px] [mask-image:linear-gradient(to_bottom,#000_75%,transparent)] sm:h-[176px] sm:[--r:340px] lg:h-[200px] lg:[--r:480px]"
            >
              {STEPS.map((step, i) => {
                const o = offsetOf(i, active);
                const prevO = offsetOf(i, lastActive);
                // A step that moved by anything other than the wheel's own turn
                // has gone round the hidden back: jump it there instantly.
                const wrapped = prevO - o !== active - lastActive;
                const focus = o === 0;
                // Pinned, the walk-through has a start and an end, so 06 and 01
                // are not shown as each other's neighbours.
                const visible =
                  Math.abs(o) <= 1 && (!pinned || Math.abs(i - current) <= 1);
                const angle = o * STEP_DEG;
                const duration = reduce || wrapped ? 0 : TURN_MS;

                return (
                  <div
                    key={step.num}
                    className="absolute top-[calc(var(--r)+54px)] left-1/2 sm:top-[calc(var(--r)+62px)]"
                    style={{
                      transform: `rotate(${angle}deg) translateY(calc(var(--r) * -1)) rotate(${-angle}deg)`,
                      transition: `transform ${duration}ms cubic-bezier(.22,1,.36,1), opacity ${duration}ms ease`,
                      opacity: visible ? 1 : 0,
                    }}
                  >
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => goTo(i)}
                      className="flex -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
                    >
                      <span
                        className={`relative flex items-center justify-center rounded-full font-display font-extrabold transition-all ease-[cubic-bezier(.22,1,.36,1)] ${
                          focus
                            ? "size-[88px] border border-white/10 bg-white/[0.04] text-[28px] text-white sm:size-[104px] sm:text-[34px]"
                            : "size-[52px] border border-white/15 bg-white/[0.02] text-[15px] text-white/45 sm:size-[60px] sm:text-[18px]"
                        }`}
                        style={{ transitionDuration: `${duration}ms` }}
                      >
                        {step.num}
                        {/* Progress ring: fills while this step is in focus, so the
                        next turn never comes as a surprise. */}
                        {focus && (
                          <svg
                            viewBox="0 0 100 100"
                            className="absolute inset-[-6px] -rotate-90 overflow-visible"
                          >
                            <circle
                              cx="50"
                              cy="50"
                              r="48"
                              fill="none"
                              stroke="rgba(255,255,255,0.08)"
                              strokeWidth="1.5"
                            />
                            {pinned ? (
                              <motion.circle
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="#3a68ee"
                                strokeWidth="2"
                                strokeLinecap="round"
                                style={{ pathLength: ring }}
                              />
                            ) : (
                              <motion.circle
                                key={`${active}-${paused}`}
                                cx="50"
                                cy="50"
                                r="48"
                                fill="none"
                                stroke="#3a68ee"
                                strokeWidth="2"
                                strokeLinecap="round"
                                initial={{
                                  pathLength: reduce || paused ? 1 : 0,
                                }}
                                animate={{ pathLength: 1 }}
                                transition={{
                                  duration:
                                    reduce || paused || !inView
                                      ? 0
                                      : INTERVAL_MS / 1000,
                                  ease: "linear",
                                }}
                              />
                            )}
                          </svg>
                        )}
                      </span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* The focused step's title and description */}
            <div
              className="mx-auto mt-2 min-h-[88px] max-w-[440px] text-center"
              aria-live="polite"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current}
                  initial={reduce ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
                >
                  <h3 className="mb-2 font-display text-[20px] font-bold text-white sm:text-[24px]">
                    {STEPS[current].title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-white/65">
                    {STEPS[current].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Step dots */}
            <div className="mt-4 flex justify-center gap-2.5">
              {STEPS.map((step, i) => (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Step ${step.num}: ${step.title}`}
                  aria-current={i === current ? "step" : undefined}
                  className="group flex h-6 cursor-pointer items-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-7 bg-accent-lift"
                        : "w-1.5 bg-white/25 group-hover:bg-white/50"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
