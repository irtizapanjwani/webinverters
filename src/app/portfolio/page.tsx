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

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
            <h1 className="mb-5 font-manrope text-[clamp(36px,5vw,56px)] leading-[1.06] font-extrabold tracking-[-0.02em] text-white">
              Crafted with passion
            </h1>
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

            {/* Project cards — alternating layout */}
            <div className="flex flex-col gap-16 lg:gap-20">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <motion.article
                      key={project.title}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { duration: 0.5, ease: EASE, layout: { duration: 0.5, ease: EASE } }
                      }
                      className={`grid items-center gap-8 lg:gap-14 ${
                        isEven
                          ? "lg:grid-cols-[1.1fr_1fr]"
                          : "lg:grid-cols-[1fr_1.1fr]"
                      }`}
                    >
                      {/* Image */}
                      <div
                        className={`relative aspect-[4/3] overflow-hidden rounded-[20px] ${
                          !isEven ? "lg:order-2" : ""
                        }`}
                      >
                        <Image
                          src={project.image}
                          alt={project.imageAlt}
                          fill
                          className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.3,1)] hover:scale-[1.03]"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>

                      {/* Text */}
                      <div className={`flex flex-col justify-center ${!isEven ? "lg:order-1" : ""}`}>
                        <span className="mb-3 inline-block w-fit rounded-full bg-accent/[0.08] px-3.5 py-1 text-[11px] font-bold tracking-[0.1em] text-accent uppercase">
                          {project.tag}
                        </span>
                        <h2 className="mb-4 font-manrope text-[clamp(24px,3vw,36px)] leading-[1.15] font-extrabold tracking-[-0.02em]">
                          {project.title}
                        </h2>
                        <p className="mb-8 max-w-[480px] text-[15.5px] leading-[1.65] text-ink-dim">
                          {project.description}
                        </p>
                        <div>
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
                        </div>
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
