"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useId, useRef, useState } from "react";
import { SERVICES } from "./serviceData";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (i: number) => `${baseId}-service-tab-${i}`;
  const panelId = (i: number) => `${baseId}-service-panel-${i}`;

  const service = SERVICES[active];

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const last = SERVICES.length - 1;
    let next: number | null = null;

    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;

    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const swap = reduce
    ? { duration: 0 }
    : { duration: 0.5, ease: EASE };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:items-start lg:gap-14">
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
            <button
              key={item.title}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={tabId(i)}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={panelId(i)}
              tabIndex={isActive ? 0 : -1}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              className="group relative w-full border-b border-border py-5 pr-2 pl-6 text-left sm:py-6"
            >
              <div className="flex items-center gap-4">
                {isActive && (
                  <motion.span
                    layoutId={`${baseId}-service-indicator`}
                    aria-hidden="true"
                    transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }}
                    className="absolute top-2 bottom-2 left-0 w-[3px] rounded-full bg-accent"
                  />
                )}

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
              </div>

              {/* description expands inline on the active tab */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pl-0">
                      <p className="mb-5 max-w-[42ch] text-[15px] leading-[1.7] text-ink-dim">
                        {item.description}
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(27,90,240,0.55)]"
                      >
                        Learn More
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>

      {/* ---------- showcase panel ---------- */}
      <div
        id={panelId(active)}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="relative min-h-[480px] overflow-hidden rounded-[24px] sm:min-h-[540px] lg:min-h-[600px]"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{
              opacity: 0,
              scale: reduce ? 1 : 0.98,
              transition: reduce ? { duration: 0 } : { duration: 0.3, ease: EASE },
            }}
            transition={swap}
            className="absolute inset-0 flex flex-col"
          >
            <div className="relative min-h-0 flex-1 overflow-hidden p-5 sm:p-8">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[16px]">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  className={service.imageFit === "contain" ? "object-contain" : "object-cover"}
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority={active === 0}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
