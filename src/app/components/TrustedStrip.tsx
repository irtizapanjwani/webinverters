"use client";

import { useEffect, useRef, useState } from "react";

const MARQUEE_ITEMS = ["Nova", "Halcyon", "Vertex", "Lumen Labs", "Orbital", "Fintra"];

/**
 * The client strip.
 *
 * A loop that runs longer than five seconds needs a way to stop it (WCAG 2.2.2,
 * Level A), and hover-to-pause does not count: it is unreachable by keyboard
 * and meaningless on touch. The control below is a real button.
 *
 * The loop also suspends itself whenever it is not being looked at — scrolled
 * out of view, or the tab in the background — so it never burns a phone battery
 * animating something nobody can see.
 */
export default function TrustedStrip() {
  const [paused, setPaused] = useState(false);
  const [offscreen, setOffscreen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);

    const onVisibility = () => setOffscreen(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const running = !paused && !offscreen;

  return (
    <div className="relative mx-auto mt-10 w-full max-w-[1400px] border-t border-border px-5 pt-6 sm:px-8">
      <div className="mb-4 flex items-center justify-between gap-4">
        <span className="text-xs font-bold tracking-[0.16em] text-ink-faint uppercase">
          Trusted by forward-thinking teams
        </span>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-ink-faint transition-colors hover:bg-black/[0.04] hover:text-ink"
        >
          <span className="sr-only">
            {paused ? "Resume scrolling client names" : "Pause scrolling client names"}
          </span>
          {paused ? (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
              <path d="M8 5v14l11-7L8 5Z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="size-4" aria-hidden="true">
              <rect x="7" y="5" width="3.5" height="14" rx="1" />
              <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
            </svg>
          )}
        </button>
      </div>

      <div
        ref={stripRef}
        className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]"
      >
        <div
          className={`flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused] ${
            running ? "" : "[animation-play-state:paused]"
          }`}
        >
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((name, i) => (
            <span
              key={`${name}-${i}`}
              /* The second run is the same six names again, purely to make the
                 loop seamless — it must not be read out twice. */
              aria-hidden={i >= MARQUEE_ITEMS.length}
              className="whitespace-nowrap font-display text-xl font-bold text-ink-faint"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
