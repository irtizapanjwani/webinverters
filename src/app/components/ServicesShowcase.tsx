"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useRef, useState } from "react";
import { SERVICES } from "./serviceData";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The services rail and its showcase.
 *
 * Built as a vertical tablist rather than a row of cards: the six services are
 * one instrument with six readings, and the panel is the readout. That also
 * buys the correct keyboard contract for free — arrow keys move between
 * services, Home/End jump to the ends, and activation follows focus, which is
 * exactly what hover does for a mouse. Hover is an accelerator here, never the
 * only way in.
 */
export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const tabId = (i: number) => `${baseId}-service-tab-${i}`;
  const panelId = (i: number) => `${baseId}-service-panel-${i}`;

  const service = SERVICES[active];
  const Graphic = service.Graphic;

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
    : { duration: 0.55, ease: EASE };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-start lg:gap-16">
      {/* ---------- the rail ---------- */}
      <div
        role="tablist"
        aria-orientation="vertical"
        aria-label="Services"
        onKeyDown={handleKeyDown}
        className="border-t border-border"
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
              className="group relative flex w-full items-center justify-between gap-4 border-b border-border py-5 pr-2 pl-5 text-left sm:py-6"
            >
              {isActive && (
                <motion.span
                  layoutId={`${baseId}-service-indicator`}
                  aria-hidden="true"
                  transition={reduce ? { duration: 0 } : { duration: 0.4, ease: EASE }}
                  className="absolute top-2 bottom-2 left-0 w-[3px] rounded-full bg-accent"
                />
              )}

              <span
                className={`font-display text-[clamp(17px,2.1vw,24px)] leading-[1.25] font-semibold tracking-[-0.01em] transition-colors duration-300 ${
                  isActive ? "text-accent" : "text-ink-dim group-hover:text-ink"
                }`}
              >
                {item.shortTitle}
              </span>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`size-4 shrink-0 transition-all duration-300 ${
                  isActive
                    ? "translate-x-0 text-accent opacity-100"
                    : "-translate-x-1 text-ink-faint opacity-0 group-hover:translate-x-0 group-hover:opacity-60"
                }`}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          );
        })}
      </div>

      {/* ---------- the showcase ---------- */}
      <div
        id={panelId(active)}
        role="tabpanel"
        aria-labelledby={tabId(active)}
        tabIndex={0}
        className="relative min-h-[520px] overflow-hidden rounded-[28px] border border-border bg-bg-alt sm:min-h-[560px] lg:min-h-[620px]"
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: reduce ? 1 : 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            /* Exit runs quicker than entry so the incoming reading leads and
               the two never sit at half opacity together for long. */
            exit={{
              opacity: 0,
              scale: reduce ? 1 : 0.985,
              transition: reduce ? { duration: 0 } : { duration: 0.32, ease: EASE },
            }}
            transition={swap}
            className="absolute inset-0 flex flex-col"
          >
            <div className="relative min-h-0 flex-1 p-4 sm:p-6">
              <div className="flex h-full w-full items-center justify-center text-ink">
                <Graphic />
              </div>
            </div>

            {/* One surface, divided — not a second card inside the panel. The
                hairline does the separating, as it does everywhere else. */}
            <div className="border-t border-border px-6 py-7 sm:px-8 sm:py-8">
              <h3 className="mb-2.5 font-display text-[19px] font-semibold tracking-[-0.01em] sm:text-[21px]">
                {service.title}
              </h3>
              <p className="mb-5 max-w-[46ch] text-[15px] leading-[1.6] text-ink-dim">
                {service.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <li
                    key={tag}
                    /* 12.5px, not the 11.5px of the work-card chips: these are
                       multi-word capability phrases people actually read, not
                       one-word category labels glanced at. */
                    className="rounded-full border border-border bg-black/[0.03] px-3 py-1 text-[12.5px] font-semibold text-ink-dim"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
