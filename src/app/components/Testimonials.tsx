"use client";

import { useReducedMotion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Web Inventers didn't just build our website — they rebuilt how we think about our digital presence. The results spoke within weeks.",
    name: "Sara Malik",
    role: "Marketing Director, Northwind Retail",
    platform: "google" as const,
  },
  {
    quote:
      "Responsive, sharp, and genuinely invested in our growth. It felt like having an in-house engineering team.",
    name: "Daniyal Raza",
    role: "Founder, Aster Health",
    platform: "clutch" as const,
  },
  {
    quote:
      "The process was transparent from day one. Every milestone landed exactly when they said it would.",
    name: "Emily Chen",
    role: "COO, Vantage Finance",
    platform: "google" as const,
  },
  {
    quote:
      "They turned our brand vision into something tangible we could finally share with confidence. Outstanding creative work.",
    name: "Omar Farooq",
    role: "CEO, Solstice Studio",
    platform: "clutch" as const,
  },
  {
    quote:
      "Our conversion rate jumped 40% within the first month after launch. The ROI has been undeniable.",
    name: "Priya Nair",
    role: "Head of Growth, Lumina Platform",
    platform: "google" as const,
  },
  {
    quote:
      "They understood our audience better than we did. The social strategy they built drives real engagement, not just vanity metrics.",
    name: "James Whitford",
    role: "Director of Marketing, Ember Social",
    platform: "clutch" as const,
  },
  {
    quote:
      "From discovery to delivery, every step felt intentional. No wasted time, no unnecessary complexity.",
    name: "Aisha Khan",
    role: "Product Lead, Breeze IoT",
    platform: "google" as const,
  },
  {
    quote:
      "The team's technical depth is rare. They solved problems we didn't even know we had — before they became problems.",
    name: "Marcus Lee",
    role: "CTO, Canopy Growth",
    platform: "clutch" as const,
  },
];

function GoogleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Google">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-label="Facebook">
      <path
        d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.668 4.533-4.668 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z"
        fill="#1877F2"
      />
    </svg>
  );
}

const PLATFORM = {
  google: GoogleLogo,
  clutch: FacebookLogo,
} as const;

function StarRating() {
  return (
    <div className="mb-3 flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="size-3.5 fill-accent"
          aria-hidden="true"
        >
          <path d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.45.91-5.33L2.27 6.62l5.34-.78L10 1z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  const Logo = PLATFORM[t.platform];
  return (
    <div className="mb-4 rounded-[14px] border border-border bg-white p-5 transition-[border-color] duration-300 hover:border-accent/30">
      <div className="mb-3 flex items-center gap-2">
        <Logo />
        <StarRating />
      </div>
      <p className="mb-4 text-[14px] leading-[1.6] text-ink">
        &ldquo;{t.quote}&rdquo;
      </p>
      <div>
        <div className="text-[13.5px] font-bold text-ink">{t.name}</div>
        <div className="text-[12px] text-ink-faint">{t.role}</div>
      </div>
    </div>
  );
}

const COLUMNS = [
  { direction: "up" as const, speed: 38, offset: 0 },
  { direction: "down" as const, speed: 42, offset: 25 },
  { direction: "up" as const, speed: 36, offset: 50 },
  { direction: "down" as const, speed: 40, offset: 10 },
];

function distributeColumns(items: typeof TESTIMONIALS, colCount: number) {
  const cols: (typeof TESTIMONIALS)[] = Array.from({ length: colCount }, () => []);
  items.forEach((item, i) => {
    cols[i % colCount].push(item);
  });
  return cols;
}

export default function Testimonials() {
  const reduce = useReducedMotion();
  const columns = distributeColumns(TESTIMONIALS, 4);

  return (
    <section className="pt-14 pb-18 lg:pt-[104px] lg:pb-[140px] overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mb-10 max-w-[640px] sm:mb-16">
          <span className="mb-2.5 block font-display text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Testimonials
          </span>
          <h2 className="font-manrope text-[clamp(32px,4.6vw,52px)] leading-[1.06] font-extrabold tracking-[-0.02em]">
            What clients say about working with us
          </h2>
        </div>
      </div>

      <div className="relative">
        {/* side fades only — no top/bottom fade so cards extend to the edges */}
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-20 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-20 bg-gradient-to-l from-bg to-transparent" />

        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 px-5 sm:px-8 lg:grid-cols-4 lg:gap-4">
          {COLUMNS.map((col, ci) => {
            const items = columns[ci];
            const duplicated = [...items, ...items];
            const duration = col.speed;
            const isUp = col.direction === "up";

            return (
              <div
                key={ci}
                className="testimonial-col relative overflow-hidden"
                style={{
                  height: "clamp(520px, 70vh, 760px)",
                }}
              >
                <div
                  className={`flex flex-col ${reduce ? "" : "animate-marquee-vertical"}`}
                  style={
                    reduce
                      ? undefined
                      : {
                          animationDuration: `${duration}s`,
                          animationTimingFunction: "linear",
                          animationIterationCount: "infinite",
                          animationDirection: isUp ? "normal" : "reverse",
                          animationDelay: `${-(col.offset / 100) * duration}s`,
                        }
                  }
                >
                  {duplicated.map((t, i) => (
                    <TestimonialCard key={`${ci}-${i}-${t.name}`} t={t} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
