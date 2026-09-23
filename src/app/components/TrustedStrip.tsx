"use client";

import { useEffect, useRef, useState } from "react";

/** The brands' own marks, single-colour, each drawn on the same 24x24 grid.
 *  Paths are the artwork published by the Simple Icons project, which tracks
 *  what the companies themselves ship — not redrawn approximations.
 *
 *  `height` is set per brand on purpose. The marks fill wildly different
 *  fractions of that grid — Hilton's banner is 9 units tall, Toyota's oval is
 *  16 — so a uniform box would leave Hilton looking half the weight of the
 *  rest. These values equalise the ink, not the box. */
export type Brand =
  | { name: string; kind: "mark"; height: string; path: string }
  | { name: string; kind: "wordmark"; text: string; className: string };

export const BRANDS: Brand[] = [
  {
    name: "Toyota",
    kind: "mark",
    height: "h-7",
    path: "M12 3.848C5.223 3.848 0 7.298 0 12c0 4.702 5.224 8.152 12 8.152S24 16.702 24 12c0-4.702-5.223-8.152-12-8.152zm7.334 3.839c0 1.08-1.725 1.913-4.488 2.246-.26-2.58-1.005-4.279-1.963-4.913 2.948.184 6.45 1.227 6.45 2.667zM12 16.401c-.96 0-1.746-1.5-1.808-4.389.577.047 1.18.072 1.808.072.628 0 1.23-.025 1.807-.072-.061 2.89-.847 4.389-1.807 4.389zm0-6.308c-.59 0-1.155-.019-1.69-.054.261-1.728.92-3.15 1.69-3.15.77 0 1.428 1.422 1.689 3.15-.535.034-1.099.054-1.689.054zm-.882-5.075c-.956.633-1.706 2.333-1.964 4.915C6.391 9.6 4.665 8.767 4.665 7.687c0-1.44 3.504-2.49 6.453-2.669zM2.037 11.68a5.265 5.265 0 011.048-3.164c.27 1.547 2.522 2.881 5.972 3.37V12c0 3.772.879 6.203 2.087 6.97-5.107-.321-9.107-3.48-9.107-7.29zm10.823 7.29c1.207-.767 2.087-3.198 2.087-6.97v-.115c3.447-.488 5.704-1.826 5.972-3.37a5.26 5.26 0 011.049 3.165c-.004 3.81-4.008 6.969-9.109 7.29z",
  },
  {
    name: "adidas",
    kind: "mark",
    height: "h-8",
    path: "m24 19.535-8.697-15.07-4.659 2.687 7.145 12.383Zm-8.287 0L9.969 9.59 5.31 12.277l4.192 7.258ZM4.658 14.723l2.776 4.812H1.223L0 17.41Z",
  },
  /* Gucci and Nestlé publish no single-colour vector mark in either source
     checked, so they stand in as plain wordmarks until the official files are
     supplied. Deliberately typeset rather than drawn: a wrong drawing reads as
     a broken logo, where type reads as type. */
  {
    name: "Gucci",
    kind: "wordmark",
    text: "GUCCI",
    className: "font-serif text-[20px] font-semibold tracking-[0.2em]",
  },
  {
    name: "Hilton",
    kind: "mark",
    height: "h-12",
    path: "M0 7.544v8.912h24V7.544H0zm23.588 8.503H.406V7.95h23.182v8.097zM3.682 14.41h-1.62v-.249l.324-.044V9.873l-.324-.045v-.242h1.62v.242l-.324.045v1.813h2.107V9.873l-.355-.045v-.242h1.647v.242l-.334.045v4.244l.334.044v.25H5.11v-.25l.355-.044v-1.933H3.358v1.933l.324.044v.25zm5.298 0H7.466v-.218l.31-.044V11.24l-.31-.045v-.218h1.203v3.17l.31.045v.218zm2.171.004H9.638v-.215l.303-.041V9.845l-.303-.044V9.59h1.203v4.568l.31.04v.216zm.941-3.116h-.634v-.32h.658v-.717l.88-.262v.978h.807v.32h-.81v2.043c0 .528.108.695.589.695.177 0 .334 0 .48-.037v.235c-.436.153-.804.218-1.114.218-.696 0-.856-.314-.856-.914v-2.24zm3.924 3.214c1.139 0 1.861-.715 1.861-1.786 0-1.176-.678-1.844-1.803-1.844-1.139 0-1.861.74-1.861 1.844 0 1.32.702 1.786 1.803 1.786zm.024-3.364c.525 0 .849.474.849 1.558 0 1.111-.304 1.544-.85 1.544-.51 0-.834-.453-.834-1.544 0-1.105.323-1.558.835-1.558zm3.72 3.262h-1.521v-.218l.31-.044v-2.884l-.31-.045v-.242h1.21v.478c.375-.3.74-.543 1.248-.543.678 0 .981.396.981 1.173v2.066l.31.041v.218h-1.513v-.218l.303-.044v-1.954c0-.542-.2-.784-.613-.784-.191 0-.495.133-.716.287v2.45l.31.045v.218zM7.738 10.07a.487.487 0 0 1 .975 0 .487.487 0 0 1-.488.485.485.485 0 0 1-.487-.485z",
  },
  {
    name: "H&M",
    kind: "mark",
    height: "h-7",
    path: "M16.866 4.565c.871-.429 1.303-.372 1.313.061.012.565-.071 1.313-.131 1.857-.323 2.947-.864 5.356-.906 8.383 1.424-3.686 2.619-6.248 4.156-9.403.488-1.004.799-.818 1.2-.996 1.563-.695 1.622-.268 1.417.581-.758 3.15-2.695 13.068-2.992 14.595-.086.442-.566.255-.691.082-.556-.769-1.183-.781-1.112-1.293.348-2.546 1.603-8.934 1.93-10.439-1.669 3.42-3.398 7.694-4.286 10.118-.189.515-.531.477-.745.1-.3-.529-.883-.799-.979-1.424-.306-1.987.348-5.776.439-8.172-.908 2.618-2.433 7.701-3.101 9.997-.276.95-1.193.795-.949-.131 1.015-3.854 3.201-10.67 4.148-13.121.222-.576.805-.556 1.289-.795Zm-5.535-.474c.276.067.254.393.085.838-.499 1.314-1.19 3.04-1.981 5.076.497-.057.767-.076.767-.076.713-.088.846.269.645.648-.16.303-.353.101-1.02 1.096-.376.561-.99.709-1.332.784-.821 2.175-1.702 4.602-2.557 7.188-.125.377-.489.295-.598.142-.402-.562-.698-.58-1.01-1.034-.037-.074-.11-.173-.066-.354.229-.936.837-2.859 1.762-5.392-1.165.253-2.426.524-2.947.645-.624 1.651-1.234 3.308-1.811 4.944-.358 1.015-1.29.819-.963-.141.521-1.528 1.096-3.115 1.673-4.654-.646-.069-.864-.525-1.225-.906-.139-.147-.443-.126-.592-.332-.267-.371-.241-.536.377-.714.806-.233 1.617-.449 2.432-.649 1.044-2.694 1.987-5.006 2.49-6.239.388-.951 1.387-.862 1.008.075-.772 1.906-1.563 3.885-2.344 5.893.963-.217 1.931-.409 2.904-.576.713-1.831 1.462-3.648 2.247-5.449.055-.126.215-.304.381-.332.525-.09 1.379-.552 1.675-.481ZM9.543 16.426c.082-.05.163-.111.244-.178-.062-.183-.123-.366-.183-.55-.061.078-.12.157-.179.237-.349.479-.142.65.118.491Zm.465-2.275c.433-.489-.423-.693-.226.054.011.042.025.092.04.146.063-.065.125-.132.186-.2Zm.45 1.473c.429-.372.838-.003.414.624a6.955 6.955 0 0 1-.307.424c.045.128.091.255.14.381.219.562-.357.703-.542.237a7.29 7.29 0 0 1-.05-.129c-.35.31-.754.505-1.186.37-.711-.221-.892-1.222-.228-1.993.266-.309.466-.524.634-.695-.041-.133-.081-.267-.118-.401-.087-.312-.164-.675.148-1.046.586-.695 1.945-.078 1.257.992-.165.258-.359.501-.561.748.07.221.14.441.212.661.061-.06.123-.117.187-.173Z",
  },
  {
    name: "Nestlé",
    kind: "wordmark",
    text: "Nestlé",
    className: "font-serif text-[23px] tracking-[0.01em]",
  },
];

export function BrandLogo({ brand }: { brand: Brand }) {
  if (brand.kind === "wordmark") {
    return <span className={`${brand.className} leading-none`}>{brand.text}</span>;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      role="img"
      aria-label={brand.name}
      className={`${brand.height} w-auto`}
    >
      <path d={brand.path} />
    </svg>
  );
}

export default function TrustedStrip() {
  const [offscreen, setOffscreen] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stripRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      ([entry]) => setOffscreen(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);

    const onVisibility = () => setOffscreen(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const running = !offscreen;

  return (
    /* The marquee reads as the bottom of the hero footage rather than a panel
       under it: a tall gradient grows out of the video and the logos sit in its
       darkest part, so there is no horizontal edge anywhere.

       Now that the hero copy is white, the rise is no longer capped just below it — it climbs well into
       the hero, which deepens the fade and darkens the type background. */
    <div data-surface="dark" className="relative mt-12 w-full">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-[220px] bottom-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.3)_28%,rgba(0,0,0,0.72)_60%,rgba(0,0,0,0.95)_100%)]"
      />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pb-12 sm:px-8">
        <span className="mb-6 block text-xs font-bold tracking-[0.16em] text-white/65 uppercase">
          Trusted by forward-thinking teams
        </span>

        <div
          ref={stripRef}
          className="group overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_4%,#000_96%,transparent)]"
        >
          {/* Two identical halves sliding by exactly -50%, so the second is
              always in position the instant the first leaves.

              `min-w-[100vw]` is what keeps the right-hand side filled: six logos
              at their natural width are narrower than a desktop strip, so a
              half sized to its contents would clear the screen before the next
              one arrived and leave a hole travelling in from the right. Forcing
              each half to at least the viewport width means one is always
              covering the strip. `justify-around` then spreads the logos across
              that width, and the px-10 on each half keeps the spacing across
              the seam equal to the spacing within a half. */}
          <div
            className={`flex w-max animate-marquee [animation-duration:32s] group-hover:[animation-play-state:paused] ${
              running ? "" : "[animation-play-state:paused]"
            }`}
          >
            {[0, 1].map((copy) => (
              <div
                key={copy}
                aria-hidden={copy === 1}
                className="flex min-w-[100vw] shrink-0 items-center justify-around gap-16 px-10"
              >
                {BRANDS.map((brand) => (
                  <span
                    key={brand.name}
                    className="flex shrink-0 items-center text-white/80"
                  >
                    <BrandLogo brand={brand} />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
