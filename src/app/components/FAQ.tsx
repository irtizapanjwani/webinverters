"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import Button from "./Button";
import { FAQ_CATEGORIES, type Faq, type FaqBlock } from "./faqData";

const EASE = [0.22, 1, 0.36, 1] as const;
const COLUMNS = 3;

/** Splits a list into COLUMNS runs in reading order, with any remainder going
 *  to the leftmost columns — 6 → 2/2/2, 5 → 2/2/1, 4 → 2/1/1. Columns are
 *  separate stacks (as in the reference) rather than grid rows, so opening an
 *  answer only pushes down the questions beneath it in the same column. */
function toColumns<T>(items: T[]): T[][] {
  const base = Math.floor(items.length / COLUMNS);
  const extra = items.length % COLUMNS;
  const cols: T[][] = [];
  let at = 0;
  for (let c = 0; c < COLUMNS; c++) {
    const size = base + (c < extra ? 1 : 0);
    cols.push(items.slice(at, at + size));
    at += size;
  }
  return cols;
}

function Answer({ blocks }: { blocks: FaqBlock[] }) {
  return (
    <div className="flex flex-col gap-3.5 pr-10 pb-6 text-[15px] leading-[1.7] text-ink-dim">
      {blocks.map((block, i) => {
        if (block.kind === "p") return <p key={i}>{block.text}</p>;

        if (block.kind === "list") {
          const List = block.ordered ? "ol" : "ul";
          return (
            <List
              key={i}
              className={`flex flex-col gap-1.5 pl-5 ${block.ordered ? "list-decimal" : "list-disc"} marker:text-accent`}
            >
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </List>
          );
        }

        return (
          <dl key={i} className="flex flex-col gap-3">
            {block.items.map((item) => (
              <div key={item.term}>
                <dt className="font-semibold text-ink">{item.term}</dt>
                <dd className="mt-0.5">{item.text}</dd>
              </div>
            ))}
          </dl>
        );
      })}
    </div>
  );
}

function FaqItem({
  faq,
  id,
  open,
  onToggle,
}: {
  faq: Faq;
  id: string;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();

  return (
    <div className="border-b border-border">
      <h3>
        <button
          type="button"
          id={`${id}-q`}
          aria-expanded={open}
          aria-controls={`${id}-a`}
          onClick={onToggle}
          /* Every row is at least two lines of question tall (2 × 16.5px ×
             1.4 + 48px padding ≈ 94px), with the text and icon centred in it.
             One- and two-line questions then take the same height, so the
             divider lines fall at the same height in all three columns. */
          className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left text-[16.5px] leading-[1.4] font-medium text-ink transition-colors hover:text-accent lg:min-h-[96px]"
        >
          {faq.q}
          {/* Plus that turns into a cross when the answer is open */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            aria-hidden="true"
            className={`size-5 shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-a`}
            role="region"
            aria-labelledby={`${id}-q`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
            className="overflow-hidden"
          >
            <Answer blocks={faq.a} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const baseId = useId();
  const [category, setCategory] = useState(0);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const columns = toColumns(FAQ_CATEGORIES[category].items);

  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        {/* Heading left; contact prompt right, as in the reference */}
        <div className="mb-12 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="font-display text-[clamp(24px,4vw,46px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink">
            Frequently Asked <span className="text-accent">Questions</span>
          </h2>
          <div className="flex flex-col items-start gap-4 lg:items-start lg:pt-2">
            <p className="text-[16px] text-ink-dim">
              Still have questions? Contact us to discuss.
            </p>
            <Button href="/contact" variant="ghost" size="sm">
              Contact Us
            </Button>
          </div>
        </div>

        {/* One tab per section of the FAQ document */}
        <div
          role="tablist"
          aria-label="FAQ topics"
          className="mb-10 flex flex-wrap gap-2 sm:gap-2.5"
        >
          {FAQ_CATEGORIES.map((cat, i) => {
            const active = i === category;
            return (
              <button
                key={cat.title}
                type="button"
                role="tab"
                id={`${baseId}-tab-${i}`}
                aria-selected={active}
                aria-controls={`${baseId}-panel`}
                onClick={() => {
                  setCategory(i);
                  setOpenKey(null);
                }}
                className={`cursor-pointer rounded-full border px-4.5 py-2 text-[13px] font-semibold tracking-[0.02em] transition-colors duration-300 ${
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-border-strong text-ink-dim hover:border-accent/40 hover:text-ink"
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        <div
          id={`${baseId}-panel`}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${category}`}
          className="grid gap-x-12 lg:grid-cols-3 xl:gap-x-16"
        >
          {columns.map((col, c) => (
            <div key={c} className="flex flex-col">
              {col.map((faq) => {
                const key = `${category}-${faq.q}`;
                return (
                  <FaqItem
                    key={key}
                    faq={faq}
                    id={`${baseId}-${category}-${FAQ_CATEGORIES[category].items.indexOf(faq)}`}
                    open={openKey === key}
                    onToggle={() => setOpenKey(openKey === key ? null : key)}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
