"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "./Button";
import { ArrowRightIcon } from "./icons";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Compact closing prompt that sends visitors to the Contact page — one heading,
 * one paragraph, one button — instead of repeating the form.
 *
 * Built for the light pages: a soft blue-grey panel over the site's dot field,
 * with two slow-drifting Signal Blue glows behind the copy. The drift uses the
 * shared float-node animation, which the global reduced-motion rules already
 * pause.
 */
export default function ContactPrompt() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.6 },
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <section className="bg-bg pb-20 lg:pb-24">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="relative mx-auto max-w-[920px] overflow-hidden rounded-[24px] border border-border bg-bg-alt px-6 py-11 text-center sm:px-10 lg:py-14">
          {/* Decoration only */}
          <div aria-hidden="true" className="dot-field pointer-events-none absolute inset-0" />
          <div
            aria-hidden="true"
            className="animate-float-node pointer-events-none absolute -top-20 -left-16 size-[260px] rounded-full bg-[radial-gradient(circle,rgba(27,90,240,0.18),transparent_68%)] blur-2xl"
          />
          <div
            aria-hidden="true"
            className="animate-float-node pointer-events-none absolute -right-14 -bottom-24 size-[280px] rounded-full bg-[radial-gradient(circle,rgba(14,116,144,0.16),transparent_68%)] blur-2xl [animation-delay:-3.5s]"
          />

          <div className="relative mx-auto max-w-[560px]">
            <motion.h2
              {...rise(0)}
              className="font-display text-[clamp(24px,3.1vw,38px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink"
            >
              Contact <span className="text-accent">Us</span>
            </motion.h2>

            <motion.p
              {...rise(0.12)}
              className="mx-auto mt-3.5 max-w-[500px] text-[15.5px] leading-[1.65] text-ink-dim"
            >
              Not sure which package fits, or need something tailored? Tell us
              about your project and we&apos;ll recommend the right plan with a
              clear, upfront quote.
            </motion.p>

            <motion.div {...rise(0.24)} className="mt-7">
              <Button href="/contact">
                Contact Us
                <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.75" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
