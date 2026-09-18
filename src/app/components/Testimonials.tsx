import { StarIcon } from "./icons";

const TESTIMONIALS = [
  {
    quote:
      "Web Inventers didn't just build our website — they rebuilt how we think about our digital presence. The results spoke within weeks.",
    initials: "SM",
    name: "Sara Malik",
    role: "Marketing Director, Northwind Retail",
  },
  {
    quote:
      "Responsive, sharp, and genuinely invested in our growth. It felt like having an in-house engineering team.",
    initials: "DR",
    name: "Daniyal Raza",
    role: "Founder, Aster Health",
  },
  {
    quote:
      "The process was transparent from day one. Every milestone landed exactly when they said it would.",
    initials: "EC",
    name: "Emily Chen",
    role: "COO, Vantage Finance",
  },
];

export default function Testimonials() {
  return (
    <section className="pt-14 pb-18 lg:pt-[104px] lg:pb-[140px]">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mb-10 max-w-[640px] sm:mb-16">
          <span className="mb-2.5 block font-display text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
            Testimonials
          </span>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] leading-[1.1] font-semibold tracking-[-0.02em]">
            What clients say about working with us
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex h-full flex-col rounded-[18px] border border-border bg-surface p-7 px-6.5"
            >
              <div className="mb-4.5 flex gap-0.75" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} className="size-[15px] text-accent-2" />
                ))}
              </div>
              <p className="mb-6 grow text-[15px] leading-[1.65] text-ink">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <span className="flex size-[42px] shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-display text-sm font-bold text-white">
                  {t.initials}
                </span>
                {/* min-w-0 lets a long name or a long company title wrap
                    instead of pushing the avatar out of the card. */}
                <div className="min-w-0">
                  <div className="text-[14.5px] font-bold">{t.name}</div>
                  <div className="text-[12.5px] text-ink-faint">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-7 text-[13px] text-ink-faint">
          Sample testimonials shown for layout purposes — to be replaced with
          real client quotes.
        </p>
      </div>
    </section>
  );
}
