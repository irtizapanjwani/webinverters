"use client";

import { useEffect, useRef, useState } from "react";

function ToyotaLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 w-auto" aria-label="Toyota">
      <ellipse cx="30" cy="20" rx="28" ry="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="30" cy="20" rx="16" ry="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="30" cy="20" rx="6" ry="10" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <text x="64" y="25" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">TOYOTA</text>
    </svg>
  );
}

function AdidasLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 w-auto" aria-label="Adidas">
      <path d="M14 30 L22 14 L26 30Z" fill="currentColor" />
      <path d="M22 30 L30 14 L34 30Z" fill="currentColor" opacity="0.7" />
      <path d="M30 30 L38 14 L42 30Z" fill="currentColor" opacity="0.4" />
      <text x="50" y="25" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">ADIDAS</text>
    </svg>
  );
}

function GucciLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 w-auto" aria-label="Gucci">
      <circle cx="24" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="16" y="26" fill="currentColor" fontSize="18" fontWeight="700" fontFamily="serif">G</text>
      <text x="56" y="25" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">GUCCI</text>
    </svg>
  );
}

function HiltonLogo() {
  return (
    <svg viewBox="0 0 120 40" className="h-7 w-auto" aria-label="Hilton">
      <rect x="8" y="8" width="24" height="24" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="14" y="26" fill="currentColor" fontSize="16" fontWeight="700" fontFamily="system-ui">H</text>
      <text x="40" y="25" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">HILTON</text>
    </svg>
  );
}

function HmLogo() {
  return (
    <svg viewBox="0 0 100 40" className="h-7 w-auto" aria-label="H&M">
      <text x="8" y="27" fill="currentColor" fontSize="18" fontWeight="700" fontFamily="serif" fontStyle="italic">H&M</text>
    </svg>
  );
}

function NestleLogo() {
  return (
    <svg viewBox="0 0 130 40" className="h-7 w-auto" aria-label="Nestle">
      <circle cx="22" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 28 L18 18 L22 24 L26 14 L30 28" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <text x="44" y="25" fill="currentColor" fontSize="14" fontWeight="600" fontFamily="system-ui" letterSpacing="0.08em">NESTLÉ</text>
    </svg>
  );
}

const BRANDS = [ToyotaLogo, AdidasLogo, GucciLogo, HiltonLogo, HmLogo, NestleLogo];

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
          className={`flex w-max animate-marquee items-center gap-16 group-hover:[animation-play-state:paused] ${
            running ? "" : "[animation-play-state:paused]"
          }`}
        >
          {[...BRANDS, ...BRANDS].map((Logo, i) => (
            <span
              key={i}
              aria-hidden={i >= BRANDS.length}
              className="flex shrink-0 items-center text-ink-faint"
            >
              <Logo />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
