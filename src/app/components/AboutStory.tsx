"use client";

import {
  cubicBezier,
  motion,
  type MotionValue,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The photos in the left window, top of the stack first. */
const PHOTOS = [
  {
    src: "/about/about1.webp",
    alt: "A team looking down into the camera against a blue sky, labelled with their roles",
  },
  {
    src: "/about/about2.webp",
    alt: "Two designers mapping a project on a wall of sketches, with a weekly project timeline",
  },
  {
    src: "/about/about3.webp",
    alt: "Quality dashboards for accessibility, performance, markup and privacy against a blue sky",
  },
];

type Panel =
  | {
      kind: "intro";
      eyebrow: string;
      title: string;
      accent: string;
      body: string;
      photo: number;
    }
  | { kind: "numbered"; title: string; body: string; photo: number };

/** The text panels on the right, in scroll order. `photo` is the index into
 *  PHOTOS shown beside the panel. There are four panels and three photos, so
 *  the intro and Who We Are share about1: it holds still while the text moves,
 *  then lifts away as Our Vision arrives.
 *
 *  Body copy is a first draft built from lines the site already uses. Replace
 *  it with Web Inventers' own words. */
const PANELS: Panel[] = [
  {
    kind: "intro",
    eyebrow: "Why Web Inventers",
    title: "A Considered Approach",
    accent: "From Strategy to Launch",
    body: "Every project follows the same disciplined path — understand the problem, set a clear direction, design with purpose, then build it properly — so the thinking done at the start still shows in what goes live.",
    photo: 0,
  },
  {
    kind: "numbered",
    title: "Who We Are",
    body: "Web Inventers is a full-service digital agency. We design and engineer websites, apps, and brands for ambitious businesses — with strategy, design, and development working together, so the thinking behind every decision carries through to how it is built.",
    photo: 0,
  },
  {
    kind: "numbered",
    title: "Our Vision",
    body: "A web where every business, whatever its size, stands on a digital presence that is fast, accessible, and built to last — technology that works for the people who use it, not the other way round.",
    photo: 1,
  },
  {
    kind: "numbered",
    title: "Our Mission",
    body: "To help ambitious brands build, grow, and stand out in the digital world. We do it as a technology partner, not a template shop: understanding the goal first, then engineering the most direct way there.",
    photo: 2,
  },
];

/* ---------- Scroll timeline ----------
   The track is cut into equal beats: hold panel 1, slide, hold panel 2, slide,
   … hold the last panel. Panel i therefore rests on beat 2i and leaves on beat
   2i + 1. Everything below is derived from that, so adding a panel or a photo
   re-times the whole section with no other change. */
const BEATS = PANELS.length * 2 - 1;

/** Scroll distance per beat. The animation plays over (track − one screen), so
 *  the track grows with the number of beats and every slide keeps the same
 *  unhurried pace however many panels there are. Raise it to slow further. */
const VH_PER_BEAT = 80;
const TRACK_VH = 100 + BEATS * VH_PER_BEAT;

const beat = (k: number): [number, number] => [k / BEATS, (k + 1) / BEATS];

/** Text strip: each panel is one full window high, so moving to panel n is a
 *  translateY of −100n %, reached during the slide beats and held between. */
const INPUT = Array.from({ length: BEATS + 1 }, (_, k) => k / BEATS);
const OUTPUT = INPUT.map((_, k) => -100 * Math.floor(k / 2));

/** The beat during which a photo lifts away: the exit beat of the last panel
 *  that shows it. The final photo is never lifted — its range sits past the
 *  end of the track, so it simply stays. */
function liftBeat(photo: number): [number, number] {
  let last = -1;
  PANELS.forEach((p, i) => {
    if (p.photo === photo) last = i;
  });
  return last < PANELS.length - 1 ? beat(2 * last + 1) : [1, 2];
}

/** Ease-in-out for every slide: starts gently, travels, settles gently — so a
 *  panel never jerks into motion or stops dead. Holds are flat regardless. */
const SLIDE_EASE = cubicBezier(0.65, 0, 0.35, 1);

/**
 * One photo in the stack. Layers are piled with the first on top, so the next
 * photo is always already sitting underneath: when its time comes a layer
 * lifts up and out of the window, uncovering the one below. Nothing slides in —
 * only the covering photo moves.
 */
function PhotoLayer({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const photo = PHOTOS[index];

  const lift = useTransform(progress, liftBeat(index), [0, -100], {
    ease: SLIDE_EASE,
  });
  const y = useMotionTemplate`${lift}%`;

  // While the photo above clears, this one eases from a faint zoom to rest —
  // just enough depth to read as a photo that was waiting underneath. The top
  // photo has nothing above it, so its settle range sits before the track.
  const scale = useTransform(
    progress,
    index === 0 ? [-2, -1] : liftBeat(index - 1),
    [1.05, 1],
    { ease: SLIDE_EASE }
  );

  return (
    <motion.div
      className="absolute inset-0 shadow-[0_22px_44px_-10px_rgba(11,17,32,0.45)]"
      style={{ y, zIndex: PHOTOS.length - index }}
    >
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover"
          priority={index === 0}
        />
      </motion.div>
    </motion.div>
  );
}

/** "01", "02", … counting only the numbered panels, so the intro takes none. */
function panelNumber(index: number) {
  const n = PANELS.slice(0, index + 1).filter((p) => p.kind === "numbered").length;
  return String(n).padStart(2, "0");
}

function PanelBody({ index }: { index: number }) {
  const panel = PANELS[index];

  if (panel.kind === "intro") {
    return (
      <>
        <span className="mb-4 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
          {panel.eyebrow}
        </span>
        <h2 className="mb-5 font-display text-[clamp(24px,3.2vw,40px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink">
          {panel.title}
          <br />
          <span className="text-accent">{panel.accent}</span>
        </h2>
        <p className="max-w-[560px] text-[16px] leading-[1.75] text-ink-dim">
          {panel.body}
        </p>
      </>
    );
  }

  return (
    <>
      <span className="mb-4 block font-mono text-[13px] tracking-[0.04em] text-accent-2">
        {panelNumber(index)}
      </span>
      <h3 className="mb-5 font-display text-[clamp(24px,3.2vw,40px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-accent">
        {panel.title}
      </h3>
      <p className="max-w-[560px] text-[16px] leading-[1.75] text-ink-dim">
        {panel.body}
      </p>
    </>
  );
}

/**
 * A text panel with its own vertical line. The line spans only this panel's
 * text, and fills top to bottom while the panel is resting on screen — full
 * just as the next panel slides in, whose line then starts again from the top.
 */
function TextPanel({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const fill = useTransform(progress, beat(2 * index), [0, 1]);

  return (
    <div className="relative pl-10">
      <div aria-hidden="true" className="absolute top-0 left-0 h-full w-[2px] bg-accent/15" />
      <motion.div
        aria-hidden="true"
        className="absolute top-0 left-0 h-full w-[2px] origin-top bg-accent"
        style={{ scaleY: fill }}
      />
      <PanelBody index={index} />
    </div>
  );
}

export default function AboutStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Progress runs while the pinned stage is on screen: 0 as the track's top
  // meets the viewport top, 1 as its bottom meets the viewport bottom.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  // Raw wheel progress ratchets on shapes this large; the spring carries it
  // between scroll events.
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });

  // The text strip and the photo stack share the same beats and easing, so the
  // words change exactly as the covering photo lifts away.
  const shift = useTransform(smoothed, INPUT, OUTPUT, { ease: SLIDE_EASE });
  const y = useMotionTemplate`${shift}%`;

  return (
    <section className="bg-bg py-20 lg:py-0">
      {/* Desktop: pinned stage. Hidden under reduced motion — scroll-driven
          movement is exactly what that preference opts out of. */}
      <div
        ref={trackRef}
        className="relative hidden lg:block motion-reduce:lg:hidden"
        style={{ height: `${TRACK_VH}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center">
          <div className="mx-auto grid w-full max-w-[1400px] grid-cols-[1.05fr_1fr] items-stretch gap-16 px-8 xl:gap-24">
            {/* Square window over a stack of photos. Each image carries its
                own rounded frame. */}
            <div className="relative aspect-square w-full max-w-[72vh] overflow-hidden rounded-[24px]">
              {PHOTOS.map((photo, i) => (
                <PhotoLayer key={photo.src} index={i} progress={smoothed} />
              ))}
            </div>

            {/* Text window, the same height as the photo window (the grid row
                stretches it), clipping a strip that moves in lockstep. Each
                panel sits at the top of its slot, level with the photo. */}
            <div className="relative overflow-hidden">
              <motion.div className="absolute inset-0" style={{ y }}>
                {PANELS.map((panel, i) => (
                  <div
                    key={panel.title}
                    className="absolute inset-x-0 h-full"
                    style={{ top: `${i * 100}%` }}
                  >
                    <TextPanel index={i} progress={smoothed} />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Phones, tablets, and reduced motion: the panels stacked, each rising
          into place once as it enters the viewport. A photo appears with the
          first panel that uses it, so the shared one is not shown twice. */}
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-16 px-5 sm:px-8 lg:hidden motion-reduce:lg:flex motion-reduce:lg:py-28">
        {PANELS.map((panel, i) => {
          const photo =
            i === 0 || PANELS[i - 1].photo !== panel.photo
              ? PHOTOS[panel.photo]
              : null;
          return (
            <motion.div
              key={panel.title}
              initial={reduce ? false : { opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12"
            >
              {photo && (
                <div className="relative aspect-square w-full overflow-hidden rounded-[24px]">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div
                className={`border-l-2 border-accent pl-6 ${
                  photo ? "" : "md:col-span-2 md:max-w-[50%] md:justify-self-end"
                }`}
              >
                <PanelBody index={i} />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
