"use client";

import { useEffect, useState } from "react";

const CYCLE_MS = 3600;

/**
 * Types a phrase in left-to-right, holds, then erases it right-to-left before
 * the next one. Width animates in `ch` units, so the font stays monospace
 * (see .type-ticker) for the measurement to stay exact.
 */
export default function TypeTicker({
  phrases,
  widthCh = 16,
}: {
  phrases: string[];
  widthCh?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const next = () => setIndex((i) => (i + 1) % phrases.length);
    const t = setTimeout(next, CYCLE_MS);
    return () => clearTimeout(t);
  }, [index, phrases.length]);

  const phrase = phrases[index];

  return (
    <span
      className="type-ticker-box relative inline-block h-4 align-bottom"
      style={{ width: `${widthCh}ch` }}
    >
      <span
        key={index}
        className="type-ticker absolute left-0 top-0 text-accent-2"
        style={{ "--ticker-len": phrase.length } as React.CSSProperties}
      >
        {phrase}
      </span>
    </span>
  );
}
