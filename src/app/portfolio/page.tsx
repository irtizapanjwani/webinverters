"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const CATEGORIES = ["ALL", "BRAND", "MARKETING", "PRODUCT"] as const;
type Category = (typeof CATEGORIES)[number];

const PROJECTS = [
  {
    category: "PRODUCT" as Category,
    tag: "E-COMMERCE",
    title: "Northwind Retail",
    description: "A premium e-commerce platform that redefined online retail for a growing fashion brand, blending seamless UX with a bold visual identity.",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    imageAlt: "Premium retail store with curated fashion display",
  },
  {
    category: "BRAND" as Category,
    tag: "BRANDING",
    title: "Solstice Studio",
    description: "Complete brand identity and visual language system for a creative studio looking to stand out in a crowded market.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    imageAlt: "Brand identity design with color systems and typography",
  },
  {
    category: "MARKETING" as Category,
    tag: "SOCIAL",
    title: "Ember Social",
    description: "Social media strategy and campaign management that drove 3x engagement growth for an emerging lifestyle brand.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    imageAlt: "Social media campaign management and analytics",
  },
  {
    category: "PRODUCT" as Category,
    tag: "SAAS",
    title: "Lumina Platform",
    description: "Analytics SaaS dashboard built for speed and clarity — turning complex data into actionable insights at a glance.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "SaaS analytics platform interface",
  },
  {
    category: "BRAND" as Category,
    tag: "IDENTITY",
    title: "Verdant Studio",
    description: "A nature-inspired brand identity system built around sustainability, trust, and quiet sophistication.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    imageAlt: "Brand identity and visual language system",
  },
  {
    category: "MARKETING" as Category,
    tag: "SEO",
    title: "Canopy Growth",
    description: "SEO overhaul that tripled organic traffic in six months through technical optimization and strategic content.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    imageAlt: "SEO analytics and search performance dashboard",
  },
  {
    category: "PRODUCT" as Category,
    tag: "HEALTHCARE",
    title: "Aster Health",
    description: "Healthcare technology platform digitizing diagnostics for modern clinics — fast, secure, and patient-first.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    imageAlt: "Healthcare technology with digital diagnostics",
  },
  {
    category: "BRAND" as Category,
    tag: "STRATEGY",
    title: "Meridian Partners",
    description: "Brand strategy and positioning for a consultancy firm entering new verticals across North America.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    imageAlt: "Brand strategy presentation in boardroom meeting",
  },
  {
    category: "MARKETING" as Category,
    tag: "CONTENT",
    title: "Pulse Media",
    description: "Content marketing engine producing high-performing assets across blog, social, and email channels.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    imageAlt: "Digital marketing analytics and performance metrics",
  },
  {
    category: "PRODUCT" as Category,
    tag: "MOBILE APP",
    title: "Breeze IoT",
    description: "Smart home IoT mobile app putting full control of connected devices in the palm of your hand.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    imageAlt: "Smart home IoT mobile app dashboard on iPhone",
  },
  {
    category: "MARKETING" as Category,
    tag: "STRATEGY",
    title: "Drift Campaign",
    description: "Multi-channel campaign strategy that launched a DTC brand from zero to 10k customers in 90 days.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    imageAlt: "Marketing strategy planning with documents and tools",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/* Headline intro: tall light-blue/white boxes sweep open left→right and cover
   the headline line; then they close away L→R while the headline — sitting
   behind them the whole time — is unveiled by a clip wipe, not a fade-in. */
const HERO_BOXES = [
  "w-12 bg-white sm:w-16",
  "w-8 bg-[#8fb4ff] sm:w-10",
  "w-14 bg-white/85 sm:w-20",
  "hidden w-7 bg-[#3a68ee] sm:block sm:w-9",
  "hidden w-16 bg-[#c9dbff] sm:block",
  "hidden w-10 bg-white sm:block sm:w-12",
  "hidden w-12 bg-[#5b86f5] lg:block",
  "hidden w-8 bg-white/80 lg:block",
  "hidden w-14 bg-[#9ec1ff] lg:block",
  "hidden w-6 bg-white lg:block",
];
const BOX_STAGGER = 0.08;
const BOX_DURATION = 0.45;
const CLOSE_STAGGER = 0.07;
const CLOSE_DURATION = 0.4;
const BOXES_DONE = BOX_STAGGER * (HERO_BOXES.length - 1) + BOX_DURATION;
const UNVEIL_DURATION = CLOSE_STAGGER * (HERO_BOXES.length - 1) + CLOSE_DURATION;

const boxVariants = {
  cover: (i: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: { duration: BOX_DURATION, ease: EASE, delay: BOX_STAGGER * i },
  }),
  gone: (i: number) => ({
    scaleX: 0,
    opacity: 0,
    transition: { duration: CLOSE_DURATION, ease: EASE, delay: CLOSE_STAGGER * i },
  }),
};

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const [unveiling, setUnveiling] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setUnveiling(true), BOXES_DONE * 1000);
    return () => clearTimeout(t);
  }, [reduce]);

  const filtered =
    activeCategory === "ALL"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <div className="relative w-full bg-bg">
      {/* Dark hero backdrop — gives the navbar the same transparent/white text look as the landing page */}
      <div className="absolute inset-x-0 top-0 z-0 h-[340px] bg-ink lg:h-[400px]" />

      <Nav />

      <main id="top" className="relative z-10">
        {/* Hero header on dark bg */}
        <div className="bg-ink pt-40 pb-20 lg:pt-48 lg:pb-28">
          <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
            <span className="mb-2.5 block font-display text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
              Selected Work
            </span>

            {/* Headline slot — boxes cover the line L→R, then close away L→R
                while the headline (behind them all along) is clip-unveiled */}
            <div className="relative mb-5">
              {!reduce && (
                <motion.div
                  aria-hidden="true"
                  className="absolute inset-0 z-10 flex items-center gap-1.5 sm:gap-2"
                >
                  {HERO_BOXES.map((cls, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={boxVariants}
                      initial="gone"
                      animate={unveiling ? "gone" : "cover"}
                      className={`block h-10 rounded-[5px] sm:h-12 lg:h-14 ${cls}`}
                      style={{ transformOrigin: "left center" }}
                    />
                  ))}
                </motion.div>
              )}

              <motion.h1
                className="font-manrope text-[clamp(36px,5vw,56px)] leading-[1.06] font-extrabold tracking-[-0.02em] text-white"
                initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                animate={{
                  clipPath:
                    reduce || unveiling ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                }}
                transition={
                  reduce
                    ? { duration: 0 }
                    : { duration: UNVEIL_DURATION, ease: EASE }
                }
              >
                Crafted with passion
              </motion.h1>
            </div>

            <p className="max-w-[640px] text-[17px] leading-[1.6] text-white/70">
              A showcase of our recent work — each project tailored to solve
              real business challenges and deliver measurable results.
            </p>
          </div>
        </div>

        {/* White content area */}
        <div className="py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
            {/* Category filters */}
            <LayoutGroup>
              <div
                role="tablist"
                aria-label="Filter projects by category"
                className="mb-12 flex flex-wrap gap-2 sm:gap-2.5"
              >
                {CATEGORIES.map((cat) => {
                  const isActive = cat === activeCategory;
                  const isHovered = cat === hoveredCategory;
                  const showPill = hoveredCategory ? isHovered : isActive;
                  return (
                    <button
                      key={cat}
                      role="tab"
                      aria-selected={isActive}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      onMouseEnter={() => setHoveredCategory(cat)}
                      onMouseLeave={() => setHoveredCategory(null)}
                      className="relative cursor-pointer px-5 py-2 text-[13px] font-semibold tracking-[0.04em] uppercase transition-colors duration-300"
                    >
                      {showPill && (
                        <motion.span
                          layoutId="active-category-pill-portfolio"
                          aria-hidden="true"
                          transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE }}
                          className="absolute inset-0 rounded-full bg-accent"
                        />
                      )}
                      <span
                        className={`relative z-10 transition-colors duration-300 ${
                          showPill ? "text-white" : "text-ink-dim hover:text-ink"
                        }`}
                      >
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>

            {/* Project cards — alternating layout; children reveal on scroll */}
            <div className="flex flex-col gap-16 lg:gap-20">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => {
                  const isEven = i % 2 === 0;
                  const view = { once: true, amount: 0.3 } as const;
                  return (
                    <motion.article
                      key={project.title}
                      layout
                      exit={{ opacity: 0, y: 30 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.5, ease: EASE, layout: { duration: 0.5, ease: EASE } }
                      }
                      className={`grid items-stretch gap-8 lg:gap-14 ${
                        isEven
                          ? "lg:grid-cols-[1fr_1.2fr]"
                          : "lg:grid-cols-[1.2fr_1fr]"
                      }`}
                    >
                      {/* Image — two-phase reveal: (1) zooms out into place and
                          stays locked there, (2) then a soft blur-dissolve
                          (fade-form, not a plain opacity fade) clarifies it.
                          Cell stretches; frame keeps 4:3 and sits top-aligned
                          so the heading stays parallel to the image top. */}
                      <div className={`flex min-w-0 ${!isEven ? "lg:order-2" : ""}`}>
                        <motion.div
                          className="relative aspect-[4/3] w-full overflow-hidden rounded-[20px]"
                          initial={
                            reduce
                              ? false
                              : { opacity: 0, scale: 1.2, filter: "blur(18px)" }
                          }
                          whileInView={{
                            opacity: [0, 1, 1],
                            scale: [1.2, 1, 1],
                            filter: ["blur(18px)", "blur(8px)", "blur(0px)"],
                          }}
                          viewport={view}
                          transition={
                            reduce
                              ? { duration: 0 }
                              : {
                                  duration: 1.5,
                                  times: [0, 0.5, 1],
                                  ease: [0.22, 1, 0.36, 1],
                                }
                          }
                        >
                          <Image
                            src={project.image}
                            alt={project.imageAlt}
                            fill
                            className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.3,1)] hover:scale-[1.03]"
                            sizes="(max-width: 1024px) 100vw, 45vw"
                          />
                        </motion.div>
                      </div>

                      {/* Text — heading top-aligned with image top, button
                          bottom-aligned with image bottom */}
                      <div
                        className={`flex flex-col justify-between ${
                          !isEven ? "lg:order-1" : ""
                        }`}
                      >
                        <div>
                          {/* Tag + heading drop in from above */}
                          <motion.span
                            initial={reduce ? false : { opacity: 0, y: -28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={view}
                            transition={
                              reduce ? { duration: 0 } : { duration: 0.5, ease: EASE }
                            }
                            className="mb-3 inline-block w-fit rounded-full bg-accent/[0.08] px-3.5 py-1 text-[11px] font-bold tracking-[0.1em] text-accent uppercase"
                          >
                            {project.tag}
                          </motion.span>
                          <motion.h2
                            initial={reduce ? false : { opacity: 0, y: -36 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={view}
                            transition={
                              reduce
                                ? { duration: 0 }
                                : { duration: 0.55, ease: EASE, delay: 0.08 }
                            }
                            className="mb-4 font-manrope text-[clamp(24px,3vw,36px)] leading-[1.15] font-extrabold tracking-[-0.02em]"
                          >
                            {project.title}
                          </motion.h2>
                          {/* Description rises from below */}
                          <motion.p
                            initial={reduce ? false : { opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={view}
                            transition={
                              reduce
                                ? { duration: 0 }
                                : { duration: 0.55, ease: EASE, delay: 0.14 }
                            }
                            className="mb-8 max-w-[480px] text-[15.5px] leading-[1.65] text-ink-dim lg:mb-0"
                          >
                            {project.description}
                          </motion.p>
                        </div>
                        <motion.div
                          initial={reduce ? false : { opacity: 0, y: 28 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={view}
                          transition={
                            reduce
                              ? { duration: 0 }
                              : { duration: 0.5, ease: EASE, delay: 0.22 }
                          }
                        >
                          <a
                            href="#"
                            className="group inline-flex items-center gap-2 rounded-full border border-border-strong bg-black/[0.02] px-6 py-3 text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:border-black/20 hover:bg-black/[0.05]"
                          >
                            VIEW PROJECT
                            <svg
                              viewBox="0 0 16 16"
                              fill="none"
                              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                            >
                              <path
                                d="M3 8h10M9 4l4 4-4 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </a>
                        </motion.div>
                      </div>
                    </motion.article>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
