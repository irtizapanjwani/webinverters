"use client";

import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";

const CATEGORIES = ["ALL", "BRAND", "MARKETING", "PRODUCT"] as const;
type Category = (typeof CATEGORIES)[number];

const PROJECTS = [
  /* ── PRODUCT (4) ── */
  {
    category: "PRODUCT" as Category,
    tag: "E-COMMERCE",
    title: "Northwind Retail",
    image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80",
    imageAlt: "Premium retail store with curated fashion display",
  },
  {
    category: "PRODUCT" as Category,
    tag: "HEALTHCARE",
    title: "Aster Health",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
    imageAlt: "Healthcare technology with digital diagnostics",
  },
  {
    category: "PRODUCT" as Category,
    tag: "SAAS",
    title: "Lumina Platform",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    imageAlt: "SaaS analytics platform interface",
  },
  {
    category: "PRODUCT" as Category,
    tag: "MOBILE APP",
    title: "Breeze IoT",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80",
    imageAlt: "Smart home IoT mobile app dashboard on iPhone",
  },

  /* ── BRAND (4) ── */
  {
    category: "BRAND" as Category,
    tag: "FINTECH",
    title: "Vantage Finance",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80",
    imageAlt: "Financial data visualization and trading analytics",
  },
  {
    category: "BRAND" as Category,
    tag: "BRANDING",
    title: "Solstice Studio",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80",
    imageAlt: "Brand identity design with color systems and typography",
  },
  {
    category: "BRAND" as Category,
    tag: "IDENTITY",
    title: "Verdant Studio",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80",
    imageAlt: "Brand identity and visual language system",
  },
  {
    category: "BRAND" as Category,
    tag: "STRATEGY",
    title: "Meridian Partners",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
    imageAlt: "Brand strategy presentation in boardroom meeting",
  },

  /* ── MARKETING (4) ── */
  {
    category: "MARKETING" as Category,
    tag: "SOCIAL",
    title: "Ember Social",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80",
    imageAlt: "Social media campaign management and analytics",
  },
  {
    category: "MARKETING" as Category,
    tag: "SEO",
    title: "Canopy Growth",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    imageAlt: "SEO analytics and search performance dashboard",
  },
  {
    category: "MARKETING" as Category,
    tag: "CONTENT",
    title: "Pulse Media",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80",
    imageAlt: "Digital marketing analytics and performance metrics",
  },
  {
    category: "MARKETING" as Category,
    tag: "STRATEGY",
    title: "Drift Campaign",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80",
    imageAlt: "Marketing strategy planning with documents and tools",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FeaturedWork() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [hoveredCategory, setHoveredCategory] = useState<Category | null>(null);
  const reduce = useReducedMotion();
  const filterRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered =
    activeCategory === "ALL"
      ? PROJECTS.slice(0, 4)
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="py-18 lg:py-[140px]" id="work">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mb-10 max-w-[640px] sm:mb-16">
          <span className="mb-2.5 block font-display text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Featured Work
          </span>
          <h2 className="mb-5 font-manrope text-[clamp(32px,4.6vw,52px)] leading-[1.06] font-extrabold tracking-[-0.02em]">
            Projects that moved the needle
          </h2>
          <p className="text-[17px] leading-[1.6] text-ink-dim">
            A look at recent engagements — full case studies available on
            request.
          </p>
        </div>

        {/* ---------- category filters ---------- */}
        <LayoutGroup>
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="mb-10 flex flex-wrap gap-2 sm:gap-2.5"
          >
            {CATEGORIES.map((cat, i) => {
              const isActive = cat === activeCategory;
              const isHovered = cat === hoveredCategory;
              const showPill = hoveredCategory ? isHovered : isActive;
              return (
                <button
                  key={cat}
                  ref={(el) => { filterRefs.current[i] = el; }}
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
                      layoutId="active-category-pill"
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

        {/* ---------- project grid ---------- */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const globalIndex = PROJECTS.indexOf(project);
              const isHovered = hovered === globalIndex;
              const isAnyHovered = hovered !== null;
              return (
                <motion.article
                  key={project.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 0.4, ease: EASE, layout: { duration: 0.4, ease: EASE } }
                  }
                  className="group block cursor-pointer"
                  onMouseEnter={() => setHovered(globalIndex)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <div className="relative mb-3 aspect-[4/3] overflow-hidden rounded-[16px]">
                    <Image
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      className={`object-cover transition-all duration-400 ease-[cubic-bezier(.2,.7,.3,1)] ${
                        isAnyHovered && !isHovered
                          ? "brightness-[0.65] saturate-[0.4]"
                          : isHovered
                            ? "scale-[1.04]"
                            : "scale-100"
                      }`}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="px-0.5">
                    <h3 className="mb-0.5 font-manrope text-[17px] font-bold tracking-[-0.01em]">
                      {project.title}
                    </h3>
                    <span className="text-[12px] font-medium tracking-[0.08em] text-ink-faint uppercase">
                      # {project.tag}
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
