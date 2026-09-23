"use client";

import Image from "next/image";

/** Each card names a country and the city it operates from. Street-level
 *  detail is still outstanding: add it to `line`, and add a `mapUrl` per entry
 *  if the corner button should open directions. */
const LOCATIONS = [
  {
    country: "USA",
    badge: "Head Office",
    line: "New York",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=900&q=80",
    alt: "Manhattan high-rise architecture in New York",
  },
  {
    country: "UK",
    badge: null,
    line: "London",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=900&q=80",
    alt: "Westminster and the Elizabeth Tower in London",
  },
  {
    country: "Canada",
    badge: null,
    line: "Toronto",
    image: "https://images.unsplash.com/photo-1517935706615-2717063c2225?w=900&q=80",
    alt: "The CN Tower above the Toronto skyline",
  },
  {
    country: "UAE",
    badge: null,
    line: "Dubai",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80",
    alt: "Dubai skyline with the Burj Khalifa at dusk",
  },
];

/** Decorative only while the cards carry no address to navigate to — giving it
 *  a button's affordance with nothing behind it would be a dead control. */
function NavigateIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <polygon points="3 11 22 2 13 21 11 13 3 11" />
    </svg>
  );
}

export default function Locations() {
  return (
    <section className="bg-bg pb-20 lg:pb-28">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <span className="mb-4 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
          Locations
        </span>

        {/* Heading left, supporting paragraph right and optically aligned to
            the heading's second line, as in the reference. */}
        <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-16">
          <h2 className="font-display text-[clamp(24px,3.7vw,45px)] leading-[1.08] font-extrabold tracking-[-0.02em] text-ink">
            Collaborating With Clients
            <br />
            Across{" "}
            <span className="text-accent">The Globe</span>
          </h2>

          <p className="max-w-[520px] text-[16px] leading-[1.65] text-ink-dim lg:pb-2">
            Our designers, developers and strategists work across several time
            zones, so there is always someone awake on your project. Wherever
            you are, you get the same team and the same standard of work.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
          {LOCATIONS.map((location) => (
            <article
              key={location.country}
              className="group relative aspect-[3/4] overflow-hidden rounded-[20px]"
            >
              <Image
                src={location.image}
                alt={location.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(.2,.7,.3,1)] group-hover:scale-[1.04]"
              />

              {/* Legibility scrim. Tall and soft rather than a band, so the
                  type sits on darkness without a visible edge across the
                  photo. */}
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(to_bottom,transparent,rgba(5,7,12,0.72)_55%,rgba(5,7,12,0.94))]"
              />

              <span
                aria-hidden="true"
                className="absolute top-4 right-4 flex size-14 items-center justify-center rounded-[16px] border border-white/25 bg-white/15 text-white backdrop-blur-md"
              >
                <NavigateIcon />
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5">
                {location.badge && (
                  <span className="mb-3 inline-block rounded-[7px] bg-black/70 px-2.5 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">
                    {location.badge}
                  </span>
                )}
                <h3 className="mb-2.5 font-display text-[clamp(22px,2vw,28px)] leading-[1.1] font-bold text-white">
                  {location.country}
                </h3>
                <address className="text-[14px] leading-[1.5] text-white/75 not-italic">
                  {location.line}
                </address>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
