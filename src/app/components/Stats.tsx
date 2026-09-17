"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { target: 120, label: "Projects Completed" },
  { target: 80, label: "Clients Served" },
  { target: 14, label: "Industries Served" },
  { target: 6, label: "Years of Experience" },
];

function StatCard({ target, label }: { target: number; label: string }) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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
              setValue(Math.round(eased * target));
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div className="bg-bg-alt px-5 py-7 text-center sm:py-11">
      <span
        ref={ref}
        className="block font-display text-[clamp(32px,4.4vw,52px)] font-bold text-ink"
      >
        {value}
        <span className="text-accent-2">+</span>
      </span>
      <span className="mt-2 block text-sm font-medium text-ink-dim">{label}</span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="bg-bg-alt py-18 lg:py-[140px]">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="reveal mx-auto mb-10 max-w-[640px] text-center sm:mb-16">
          <span className="mb-3.5 block font-display text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Trust &amp; Results
          </span>
          <h2 className="mb-4 font-display text-[clamp(28px,4vw,42px)] leading-[1.1] font-semibold tracking-[-0.02em]">
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

        <div className="reveal grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-border bg-border lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
