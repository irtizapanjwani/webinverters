"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const STEPS = [
  { num: "01", title: "Discover", desc: "We dig into your business, users, and goals." },
  { num: "02", title: "Strategy", desc: "We map the roadmap, tech stack, and success metrics." },
  { num: "03", title: "Design", desc: "We craft interfaces as functional as they are beautiful." },
  { num: "04", title: "Development", desc: "We build with clean, scalable, well-tested code." },
  { num: "05", title: "Launch", desc: "We ship with confidence — tested, optimized, and ready." },
  { num: "06", title: "Growth & Support", desc: "We monitor, iterate, and help you keep growing." },
];

const R = 23;

/** Both mirror the 600ms in `.draw` (globals.css). The schedule below chains
 *  one stage after another by hand, so these have to match what the CSS
 *  actually takes or the stages start overlapping again. */
const ARC_MS = 600;
const LINE_MS = 600;
/** How long the finished chain — every circle and line blue — holds before
 *  it clears, and the short blank beat before it starts again from step 1. */
const HOLD_MS = 1600;
const CLEAR_MS = 500;

/** One segment of the chain: a circle's ring, or the line leaving it. */
type Segment = { i: number; phase: "arc" | "line" };

/** Whether step `i` is joined to the next one by a visible connector.
 *
 *  Only within a row: the grid is 2 columns on phones and 3 on tablets, so
 *  consecutive steps are often on different rows, and a line between them
 *  would run backwards and diagonally across the whole section. */
function connects(positions: { x: number; y: number }[], i: number) {
  const from = positions[i];
  const to = positions[i + 1];
  if (!from || !to) return false;
  return Math.abs(from.y - to.y) < 4 && to.x > from.x;
}

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  /** How far the chain has been drawn: segments before `progress` stay lit,
   *  the one at `progress` is drawing now, and the rest are still dark. -1
   *  means nothing is lit. `lap` changes on every loop so the drawing
   *  animations restart. */
  const [progress, setProgress] = useState(-1);
  const [lap, setLap] = useState(0);
  const [animate, setAnimate] = useState(false);
  const reduce = useReducedMotion();

  const measure = useCallback(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const rect = grid.getBoundingClientRect();
    const pts = circleRefs.current.map((el) => {
      if (!el) return { x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      return { x: r.left - rect.left + r.width / 2, y: r.top - rect.top + r.height / 2 };
    });
    setPositions(pts);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setAnimate(true); observer.disconnect(); }
      },
      { threshold: 0.2 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [reduce]);

  /** The chain in drawing order: circle 1, its line, circle 2, its line, and
   *  so on. A step whose connector was skipped (end of a wrapped row) goes
   *  straight to the next circle. */
  const sequence = useMemo(() => {
    const seq: Segment[] = [];
    positions.forEach((_, i) => {
      seq.push({ i, phase: "arc" });
      if (connects(positions, i)) seq.push({ i, phase: "line" });
    });
    return seq;
  }, [positions]);

  /** "done" stays blue, "drawing" is animating in now, "off" is still dark. */
  const segmentState = (i: number, phase: Segment["phase"]) => {
    const k = sequence.findIndex((s) => s.i === i && s.phase === phase);
    if (k < 0 || progress < 0 || k > progress) return "off";
    return k < progress ? "done" : "drawing";
  };

  useEffect(() => {
    if (!animate || reduce || sequence.length < 2) return;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    // Each segment draws in and then stays lit, so the blue builds up from
    // step 1 to the last step. Once the whole chain is lit it holds, clears,
    // and the next lap starts again from step 1.
    const step = (k: number) => {
      if (cancelled) return;
      setProgress(k);
      if (k < sequence.length - 1) {
        const ms = sequence[k].phase === "line" ? LINE_MS : ARC_MS;
        timer = setTimeout(() => step(k + 1), ms);
        return;
      }
      timer = setTimeout(() => {
        if (cancelled) return;
        setProgress(-1);
        timer = setTimeout(() => {
          setLap((l) => l + 1);
          step(0);
        }, CLEAR_MS);
      }, ARC_MS + HOLD_MS);
    };

    step(0);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [animate, reduce, sequence]);

  const box = positions.length >= 2
    ? { w: Math.max(...positions.map((p) => p.x)) + R + 10, h: Math.max(...positions.map((p) => p.y)) + R + 10 }
    : null;

  return (
    <section ref={sectionRef} className="bg-bg-alt py-18 lg:py-[140px]">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mx-auto mb-10 max-w-[640px] text-center sm:mb-16">
          <span className="mb-2.5 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Our Process
          </span>
          <h2 className="font-display text-[clamp(21px,3.2vw,34px)] leading-[1.1] font-semibold tracking-[-0.02em]">
            How we take an idea to launch
          </h2>
        </div>

        <div ref={gridRef} className="relative grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {/* Layer 0: connector lines between circles (behind everything) */}
          {box && !reduce && (
            <svg className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible" aria-hidden="true">
              {positions.map((p, i) => {
                if (!connects(positions, i)) return null;
                const d = `M ${p.x + R} ${p.y} L ${positions[i + 1].x - R} ${positions[i + 1].y}`;
                const state = segmentState(i, "line");
                return (
                  <g key={i}>
                    {/* The track the line will travel, always visible so the
                        steps read as connected before the animation reaches
                        them. */}
                    <path d={d} fill="none" stroke="rgba(27,90,240,0.12)" strokeWidth="1.5" />
                    {/* The line itself. Dark until its turn, then `draw` runs
                        the offset to 0, and it stays drawn until the lap ends. */}
                    <path
                      /* `key` carries the state and lap so React remounts the
                         node each time it starts drawing. Re-adding the class
                         to a surviving element does not reliably restart a CSS
                         animation, and this one has to restart every lap. */
                      key={`${state}-${lap}`}
                      className={state === "drawing" ? "draw" : ""}
                      d={d}
                      fill="none"
                      stroke="#1b5af0"
                      strokeWidth="2"
                      strokeLinecap="round"
                      pathLength="1"
                      strokeDasharray="1"
                      strokeDashoffset={state === "done" ? 0 : 1}
                    />
                  </g>
                );
              })}
            </svg>
          )}

          {/* Circle divs (background + number only, no CSS border) */}
          {STEPS.map((step, i) => (
            <div key={step.num} className="group relative z-1">
              <div
                ref={(el) => { circleRefs.current[i] = el; }}
                className="relative z-1 mb-5.5 flex size-[46px] items-center justify-center rounded-full bg-bg-alt font-mono text-[15px] font-semibold transition-[box-shadow] duration-300 group-hover:shadow-[0_0_0_6px_rgba(14,116,144,0.1)]"
              >
                {step.num}
              </div>
              <h3 className="mb-2 text-base font-bold">{step.title}</h3>
              <p className="text-[13.5px] leading-[1.55] text-ink-dim">{step.desc}</p>
            </div>
          ))}

          {/* Layer 1-2: circle outlines + arcs (above circles) */}
          {box && !reduce && (
            <svg
              className="pointer-events-none absolute inset-0 z-2 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              {positions.map((p, i) => {
                const cx = p.x;
                const cy = p.y;
                // The ring lights when the chain reaches this circle and stays
                // lit for the rest of the lap.
                const state = segmentState(i, "arc");
                const lit = state !== "off";
                const arcClass = state === "drawing" ? "draw" : "";
                const arcOffset = state === "done" ? 0 : 1;
                return (
                  <g key={i}>
                    {/* Circle outline — lights up blue when active */}
                    <circle
                      cx={cx} cy={cy} r={R} fill="none"
                      stroke={lit ? "#1b5af0" : "rgba(0,0,0,0.14)"}
                      strokeWidth={lit ? 2 : 1}
                      style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                    />

                    {/* Top arc: left edge → along top of circle → right edge */}
                    <path
                      key={`t-${state}-${lap}`}
                      className={arcClass}
                      d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
                      fill="none" stroke="#1b5af0" strokeWidth="2" strokeLinecap="round"
                      pathLength="1" strokeDasharray="1" strokeDashoffset={arcOffset}
                    />
                    {/* Bottom arc: left edge → along bottom of circle → right edge */}
                    <path
                      key={`b-${state}-${lap}`}
                      className={arcClass}
                      d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 0 ${cx + R} ${cy}`}
                      fill="none" stroke="#1b5af0" strokeWidth="2" strokeLinecap="round"
                      pathLength="1" strokeDasharray="1" strokeDashoffset={arcOffset}
                    />
                  </g>
                );
              })}
            </svg>
          )}
        </div>
      </div>
    </section>
  );
}
