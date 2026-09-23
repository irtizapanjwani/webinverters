"use client";

import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/** Open width of the capsule, in `em` so it tracks the headline's font size
 *  across every breakpoint instead of drifting at one of them. */
const PILL_EM = 2.15;

/** Line icons for the step cards, drawn on the shared 24px grid at a single
 *  stroke weight so the three read as one set. */
function StepIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

const SubmitIcon = () => (
  <StepIcon>
    <path d="M12 4v11" />
    <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
    <path d="M5 19h14" />
  </StepIcon>
);

const ScheduleIcon = () => (
  <StepIcon>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" />
    <path d="M8 3v4M16 3v4M3.5 10h17" />
    <path d="m9.5 14.5 1.8 1.8 3.4-3.4" />
  </StepIcon>
);

const ProposalIcon = () => (
  <StepIcon>
    <path d="M12 3 20 7.5v9L12 21l-8-4.5v-9L12 3Z" />
    <path d="m4 7.5 8 4.5 8-4.5" />
    <path d="M12 12v9" />
  </StepIcon>
);

const STEPS = [
  {
    Icon: SubmitIcon,
    title: "Submit the form",
    desc: "A Web Inventers sales specialist will email you within 24 hours to confirm a few details. If you don’t see our message, check your spam folder.",
  },
  {
    Icon: ScheduleIcon,
    title: "Schedule a quick meeting",
    desc: "We’ll set a time to talk through your goals, scope, timeline, and budget so we understand exactly what you need.",
  },
  {
    Icon: ProposalIcon,
    title: "Review your custom proposal",
    desc: "After the meeting, we’ll create a tailored proposal for your project with deliverables, timeline, pricing, and clear next steps.",
  },
];

export default function NextSteps() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();

  /* Measured against the heading itself, not the section. The section starts
     well above its own heading, so tracking it meant the capsule was already
     part-open before the words were on screen.
     Progress 0 is the heading's top touching the bottom of the viewport —
     genuinely shut on arrival — and 1 is that same edge three-tenths up the
     screen, so the opening is spread over most of a screen of scrolling
     instead of being over in a moment. */
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start end", "start 0.3"],
  });

  /* Raw scroll progress steps with the wheel, which on a shape this large
     reads as ratcheting. The spring gives it weight and carries it between
     scroll events. */
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    mass: 0.35,
  });

  const openEm = useTransform(smoothed, [0, 1], [0, PILL_EM], { clamp: true });
  const width = useMotionTemplate`${openEm}em`;

  return (
    <section className="bg-bg py-20 lg:py-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mx-auto max-w-[900px] text-center">
          <span className="mb-4 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Next Steps
          </span>

          <h2
            ref={headingRef}
            className="font-display text-[clamp(24px,4.4vw,51px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink"
          >
            Here&apos;s what
            <br />
            happens{" "}
            {/* The capsule is an inline part of the line, so the words close up
                around it when it is shut and part as it opens — the same
                behaviour as the reference. The image inside keeps a fixed
                width and is centred, so the frame reveals it from the middle
                outwards rather than squashing it. */}
            <motion.span
              aria-hidden="true"
              style={reduce ? { width: `${PILL_EM}em` } : { width }}
              className="relative -mb-[0.08em] inline-block h-[1.02em] shrink-0 overflow-hidden rounded-full align-middle"
            >
              <span className="absolute top-0 left-1/2 h-full w-[2.15em] -translate-x-1/2">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80"
                  alt=""
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </span>
            </motion.span>{" "}
            <span className="text-accent">next!</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-6">
          {STEPS.map((step) => (
            <div
              key={step.title}
              className="rounded-[20px] border border-border bg-bg-alt p-7 lg:p-8"
            >
              <span className="mb-6 flex size-14 items-center justify-center rounded-[14px] border border-border bg-surface text-ink shadow-[0_1px_2px_rgba(11,17,32,0.05)]">
                <step.Icon />
              </span>
              <h3 className="mb-2.5 font-display text-[19px] font-bold tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-[15px] leading-[1.6] text-ink-dim">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
