"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { SERVICES } from "./serviceData";

/** Scroll distance each service holds the stage for, on desktop. */
const VH_PER_SERVICE = 55;
const TRACK_VH = 100 + SERVICES.length * VH_PER_SERVICE;

/** Desktop with motion allowed: the showcase pins and scrolling walks through
 *  the services, the same idea as the About page's story. Everywhere else it
 *  stays a plain hover/tap list. */
const PINNED_QUERY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/** Ease-in-out for the list opening and closing, so neither end snaps. */
const SOFT = [0.65, 0, 0.35, 1] as const;
/** One service image in the stack. Every image stays mounted, so a change
 *  is a soft crossfade: the outgoing one drifts away in the direction of
 *  travel while the incoming one settles in from the other side. Timed rather
 *  than tied to the scroll position, so the panel never rests half-way
 *  between two images. */
function ServiceImage({ index, active }: { index: number; active: number }) {
  const reduce = useReducedMotion();
  const service = SERVICES[index];
  const shown = index === active;
  // Earlier services sit above, later ones below: scrolling down moves the
  // stack up.
  const drift = shown ? 0 : index < active ? -32 : 32;

  return (
    <motion.div
      className="absolute inset-0 p-5 sm:p-8"
      initial={false}
      animate={{
        opacity: shown ? 1 : 0,
        y: reduce ? 0 : drift,
        scale: reduce || shown ? 1 : 0.985,
      }}
      transition={
        reduce
          ? { duration: 0 }
          : {
              duration: 0.8,
              ease: SOFT,
              // The incoming image starts to show slightly after the outgoing
              // one begins to leave, so the two never sit at equal strength.
              opacity: { duration: shown ? 0.7 : 0.45, delay: shown ? 0.12 : 0, ease: SOFT },
            }
      }
      aria-hidden={!shown}
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[16px]">
        <Image
          src={service.image}
          alt={shown ? service.imageAlt : ""}
          fill
          className={service.imageFit === "contain" ? "object-contain" : "object-cover"}
          sizes="(max-width: 1024px) 100vw, 58vw"
          priority={index === 0}
        />
      </div>
    </motion.div>
  );
}

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(PINNED_QUERY);
    const update = () => setPinned(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // 0 as the track's top meets the viewport top, 1 as its bottom meets the
  // viewport bottom — the stretch during which the stage is pinned.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Wheel scrolling arrives in steps; the spring glides between them, the
  // same smoothing the About page's story uses.
  const smoothed = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.5 });

  useMotionValueEvent(smoothed, "change", (p) => {
    if (!pinned) return;
    const i = Math.min(SERVICES.length - 1, Math.max(0, Math.floor(p * SERVICES.length)));
    setActive((prev) => (prev === i ? prev : i));
  });

  /** Show service `i`. While pinned the scroll position is what decides the
   *  service, so this scrolls to the middle of that service's stretch; the
   *  scroll handler then selects it. */
  const select = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!pinned || !track) {
        setActive(i);
        return;
      }
      const top = track.getBoundingClientRect().top + window.scrollY;
      const travel = track.offsetHeight - window.innerHeight;
      window.scrollTo({
        top: top + ((i + 0.5) / SERVICES.length) * travel,
        behavior: "smooth",
      });
    },
    [pinned]
  );

  // Deep links from the navbar's Services menu: /#service-<slug> selects that
  // service — on arrival from another page, and when the link is clicked while
  // already on this page. The anchors in Services bring the section into view
  // first; once pinned, this then scrolls on to the right service.
  useEffect(() => {
    const openFromHash = () => {
      const match = window.location.hash.match(/^#service-(.+)$/);
      if (!match) return;
      const index = SERVICES.findIndex((s) => s.slug === match[1]);
      if (index >= 0) setTimeout(() => select(index), 60);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [select]);

  const tabId = (i: number) => `${baseId}-service-tab-${i}`;
  const panelId = (i: number) => `${baseId}-service-panel-${i}`;

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const last = SERVICES.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;

    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  return (
    /* The track gives the pinned stage its scroll distance on desktop; below
       that (or with reduced motion) it collapses to the content's height. */
    <div
      ref={trackRef}
      className="relative lg:h-[var(--track)] motion-reduce:lg:h-auto"
      style={{ "--track": `${TRACK_VH}vh` } as React.CSSProperties}
    >
      <div className="lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-6rem)] lg:items-start motion-reduce:lg:static motion-reduce:lg:h-auto">
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start lg:gap-14">
          {/* ---------- service list ---------- */}
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Services"
            onKeyDown={handleKeyDown}
          >
            {SERVICES.map((item, i) => {
              const isActive = i === active;
              return (
                <div key={item.title} className="relative border-b border-border">
                  {isActive && (
                    <motion.span
                      layoutId={`${baseId}-service-indicator`}
                      aria-hidden="true"
                      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: SOFT }}
                      className="absolute top-2 bottom-2 left-0 w-[3px] rounded-full bg-accent"
                    />
                  )}

                  <button
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    id={tabId(i)}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    aria-controls={panelId(i)}
                    tabIndex={isActive ? 0 : -1}
                    // Hover previews only when scrolling isn't driving the list.
                    onMouseEnter={() => !pinned && setActive(i)}
                    onFocus={() => !pinned && setActive(i)}
                    onClick={() => select(i)}
                    className="group flex w-full cursor-pointer items-center gap-4 py-5 pr-2 pl-6 text-left sm:py-6"
                  >
                    <span
                      className={`font-display text-[clamp(15px,1.8vw,21px)] leading-[1.3] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                        isActive ? "text-accent" : "text-ink-dim group-hover:text-ink"
                      }`}
                    >
                      {item.shortTitle}
                    </span>

                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`ml-auto size-4 shrink-0 transition-all duration-300 ${
                        isActive
                          ? "translate-x-0 text-accent opacity-100"
                          : "-translate-x-1 text-ink-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                      }`}
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>

                  {/* Description expands under the active service */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                          transition: reduce
                            ? { duration: 0 }
                            : { height: { duration: 0.6, ease: SOFT }, opacity: { duration: 0.4, delay: 0.15 } },
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                          transition: reduce
                            ? { duration: 0 }
                            : { height: { duration: 0.6, ease: SOFT }, opacity: { duration: 0.25 } },
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pr-2 pb-6 pl-6">
                          <p className="mb-5 max-w-[42ch] text-[15px] leading-[1.7] text-ink-dim">
                            {item.description}
                          </p>
                          <Link
                            href={`/services/${item.slug}`}
                            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(27,90,240,0.55)]"
                          >
                            Learn More
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* ---------- showcase panel ---------- */}
          <div
            id={panelId(active)}
            role="tabpanel"
            aria-labelledby={tabId(active)}
            tabIndex={0}
            className="relative min-h-[480px] overflow-hidden rounded-[24px] sm:min-h-[540px] lg:h-[min(600px,calc(100vh-140px))] lg:min-h-0"
          >
            {SERVICES.map((item, i) => (
              <ServiceImage key={item.slug} index={i} active={active} />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
}
