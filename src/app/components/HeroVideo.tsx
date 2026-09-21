"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Full-bleed video backdrop for the top of the page.
 *
 *  It has to span two siblings — the sticky header and the hero section — so it
 *  cannot live inside either one: the header's height changes as it compacts on
 *  scroll, and the hero's wrapper clips its own overflow. Instead it is an
 *  absolute layer on the page root, measured to end exactly at the bottom of
 *  the hero (i.e. just past the "Trusted by" strip). */
export default function HeroVideo() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);

  useIsomorphicLayoutEffect(() => {
    const layer = ref.current;
    const root = layer?.offsetParent;
    const hero = document.getElementById("hero");
    if (!layer || !root || !hero) return;

    const measure = () =>
      setHeight(
        hero.getBoundingClientRect().bottom - root.getBoundingClientRect().top
      );

    measure();

    // The hero reflows on resize, on font load, and as the rotating headline
    // word changes width — re-measure from the element itself rather than
    // guessing a height.
    const ro = new ResizeObserver(measure);
    ro.observe(hero);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 overflow-hidden"
      style={{ height: height ?? undefined }}
    >
      <video
        className="size-full object-cover"
        src="/6248593-uhd_3840_2160_25fps.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
    </div>
  );
}
