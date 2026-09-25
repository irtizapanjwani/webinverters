"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { useCallback, useId, useState } from "react";
import Button from "./Button";
import ConsultationModal from "./ConsultationModal";
import PackageCard from "./PackageCard";
import { PACKAGES_BY_CATEGORY } from "./pricingData";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Package categories, in tab order. "SEO" is named as it is in the Services
 *  section; it takes the place the reference gives to video animation. */
const CATEGORIES = [
  "Web Development",
  "Ecommerce",
  "Mobile Apps",
  "SEO",
  "Branding",
  "Digital Marketing",
] as const;

type Category = (typeof CATEGORIES)[number];

export default function PricingPlans() {
  const baseId = useId();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<Category>("Web Development");
  const packages = PACKAGES_BY_CATEGORY[active] ?? [];
  // Package whose Start Project button opened the consultation popup.
  const [consultFor, setConsultFor] = useState<string | null>(null);
  // Stable, so the dialog's open/close effect doesn't re-run on every render.
  const closeConsult = useCallback(() => setConsultFor(null), []);

  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-[760px] text-center lg:mb-14">
          <span className="mb-4 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Check out our pocket-friendly packages
          </span>
          <h2 className="mb-5 font-display text-[clamp(24px,4vw,46px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink">
            Our Pricing <span className="text-accent">Plans</span>
          </h2>
          <p className="text-[16.5px] leading-[1.7] text-ink-dim">
            Get quality work that exceeds your expectations at reasonable prices
            from our industry experts. Chat now for special discounts.
          </p>
        </div>

        {/* Category tabs. The filled block slides between tabs rather than
            blinking from one to the next. */}
        <LayoutGroup>
          <div
            role="tablist"
            aria-label="Package categories"
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2"
          >
            {CATEGORIES.map((cat, i) => {
              const isActive = cat === active;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${i}`}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel`}
                  onClick={() => setActive(cat)}
                  className={`relative cursor-pointer rounded-[10px] px-5 py-3 text-[15px] font-medium transition-colors duration-300 ${
                    isActive ? "text-white" : "text-ink-dim hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="pricing-tab-fill"
                      aria-hidden="true"
                      transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }}
                      className="absolute inset-0 rounded-[10px] bg-accent"
                    />
                  )}
                  <span className="relative">{cat}</span>
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${CATEGORIES.indexOf(active)}`}
          className="mt-12 lg:mt-14"
        >
          {/* Cross-fade between categories; mode="wait" lets the old set leave
              before the new one arrives, so the grid never holds both. */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={active}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: EASE }}
            >
              {packages.length > 0 ? (
                /* Wraps and centres, so a short last row — or a tab with a
                   single package — sits in the middle rather than hugging the
                   left. Card widths match a three-up grid (two-up on tablets)
                   with 24px gutters. Extra row gap leaves room for each card's
                   button, which hangs half below the card. */
                <div className="mx-auto flex max-w-[1120px] flex-wrap justify-center gap-x-6 gap-y-14">
                  {packages.map((pkg) => (
                    <div
                      key={pkg.name}
                      className="w-full md:w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
                    >
                      <PackageCard
                        pkg={pkg}
                        onStartProject={() => setConsultFor(pkg.name)}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mx-auto max-w-[560px] rounded-[20px] border border-border bg-bg-alt px-6 py-12 text-center">
                  <h3 className="mb-3 font-display text-[20px] font-bold text-ink">
                    {active} packages
                  </h3>
                  <p className="mb-7 text-[15.5px] leading-[1.65] text-ink-dim">
                    Tell us what you need and we&apos;ll put together a clear,
                    upfront quote for your {active.toLowerCase()} project.
                  </p>
                  <Button href="/contact" size="sm">
                    Get a Custom Quote
                  </Button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <ConsultationModal packageName={consultFor} onClose={closeConsult} />
    </section>
  );
}
