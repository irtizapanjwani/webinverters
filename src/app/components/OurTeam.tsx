"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import Button from "./Button";

type Member = {
  name: string;
  role: string;
  /** Path under /public, e.g. "/team/jane.webp". Until one is set the card
   *  shows a neutral silhouette, so no stranger's face stands in for staff. */
  photo?: string;
};

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=600&fit=crop&crop=faces&q=80`;

/** ⚠ DEMO DATA — NOT REAL STAFF. Invented names on Unsplash stock portraits,
 *  here only to preview the layout. Replace every entry with a real team
 *  member (photo in /public/team/) before this page goes live: a visitor will
 *  read these as the people they would be working with.
 *
 *  Keep at least seven or so: the row has to be wider than the screen for the
 *  sideways travel to have anywhere to go. */
const TEAM: Member[] = [
  { name: "Daniel Reyes", role: "Creative Director", photo: unsplash("1507003211169-0a1dd7228f2d") },
  { name: "Sofia Martinez", role: "Project Lead", photo: unsplash("1494790108377-be9c29b29330") },
  { name: "Lucas Meyer", role: "Lead Developer", photo: unsplash("1500648767791-00dcc994a43e") },
  { name: "Emily Carter", role: "UX/UI Designer", photo: unsplash("1438761681033-6461ffad8d80") },
  { name: "Richard Hayes", role: "Operations Director", photo: unsplash("1472099645785-5658abf4ff4e") },
  { name: "Anna Petrova", role: "Brand Strategist", photo: unsplash("1544005313-94ddf0286df2") },
  { name: "Omar Haddad", role: "Full-Stack Developer", photo: unsplash("1506794778202-cad84cf45f1d") },
  { name: "Mei Tanaka", role: "Motion Designer", photo: unsplash("1534528741775-53994a69daeb") },
  { name: "James Walker", role: "Account Director", photo: unsplash("1519085360753-af0119f7cbe7") },
  { name: "Hannah Brooks", role: "SEO Specialist", photo: unsplash("1573496359142-b8d87734a5a2") },
  { name: "Aisha Rahman", role: "Digital Marketing Specialist", photo: unsplash("1580489944761-15a19d654956") },
  { name: "Thomas Becker", role: "Technical Lead", photo: unsplash("1560250097-0b93528c311a") },
];

/** Card backgrounds, cycled. All drawn from the site palette — Signal Blue,
 *  teal accent, and the spotlight navy — so the row reads as one set. */
const SHADES = [
  "linear-gradient(160deg,#1b5af0,#0B1330)",
  "linear-gradient(160deg,#0e7490,#0B1330)",
  "linear-gradient(160deg,#1d2a4d,#05070C)",
  "linear-gradient(160deg,#3a68ee,#05070C)",
];

/** Pinned track height. The animation plays over (track − one screen). */
const TRACK_VH = 280;

function Silhouette() {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="absolute bottom-0 left-1/2 w-[78%] -translate-x-1/2 text-white/[0.13]"
      fill="currentColor"
    >
      <circle cx="60" cy="44" r="24" />
      <path d="M12 120c0-28 21.5-46 48-46s48 18 48 46Z" />
    </svg>
  );
}

function TeamCard({ member, index }: { member: Member; index: number }) {
  return (
    <article
      className="relative aspect-square w-[clamp(170px,12.5vw,215px)] shrink-0 snap-start overflow-hidden rounded-[14px] border border-white/15"
      style={{ background: SHADES[index % SHADES.length] }}
    >
      {member.photo ? (
        <Image
          src={member.photo}
          alt={member.name}
          fill
          sizes="215px"
          className="object-cover"
        />
      ) : (
        <Silhouette />
      )}
      {/* Legibility scrim under the name */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-3.5">
        <h3 className="font-display text-[15px] leading-tight font-bold text-white">
          {member.name}
        </h3>
        <p className="mt-1 text-[12px] text-white/75">{member.role}</p>
      </div>
    </article>
  );
}

/** Heading copy is a draft that makes no claims about the team's background —
 *  replace it once the real line-up is in. */
function TeamHeading() {
  return (
    <>
      <span className="mb-4 block text-xs font-bold tracking-[0.18em] text-accent-2 uppercase">
        Our Team
      </span>
      <h2 className="mb-5 font-display text-[clamp(24px,4vw,46px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink">
        Strategy and creative talent
        <br />
        behind <span className="text-accent">every launch</span>
      </h2>
      <p className="mx-auto max-w-[560px] text-[16px] leading-[1.7] text-ink-dim">
        Strategists, designers, and engineers working as one team — from the
        first conversation to the final detail before launch.
      </p>
    </>
  );
}

/**
 * Closing call to join the team, on the site's spotlight surface: the navy →
 * near-black base of the contact and "Have a Project in Mind?" panels, with a
 * Signal Blue glow at each end where the reference has its warm light.
 *
 * The avatars are the first three team members with photos, so they update
 * with the team list. There is no careers page yet, so the button goes to
 * Contact — point it at /careers once one exists.
 */
function JoinTeamBanner() {
  const faces = TEAM.filter((m) => m.photo).slice(0, 3);

  return (
    <div
      data-surface="dark"
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[radial-gradient(38%_150%_at_6%_50%,rgba(27,90,240,0.5),transparent_70%),radial-gradient(34%_150%_at_96%_30%,rgba(27,90,240,0.42),transparent_70%),linear-gradient(135deg,#0B1330,#05070C)] px-6 py-8 sm:px-10 lg:py-9"
    >
      <div className="flex flex-col items-start gap-7 lg:flex-row lg:items-center lg:gap-10">
        {faces.length > 0 && (
          <div className="flex shrink-0">
            {faces.map((m, i) => (
              <div
                key={m.name}
                className={`relative size-[76px] overflow-hidden rounded-full ring-2 ring-[#0B1330] ${
                  i > 0 ? "-ml-4" : ""
                }`}
              >
                <Image src={m.photo!} alt={m.name} fill sizes="76px" className="object-cover" />
              </div>
            ))}
          </div>
        )}

        <h3 className="shrink-0 font-display text-[clamp(20px,2.2vw,28px)] leading-[1.15] font-extrabold tracking-[-0.02em] text-white">
          Become a part
          <br />
          <span className="text-[#7aa7ff]">of Web Inventers</span>
        </h3>

        <p className="max-w-[520px] text-[15px] leading-[1.65] text-white/70 lg:flex-1">
          We&apos;re always looking for people who care about the craft. If
          you&apos;d like to build your career with us, get in touch.
        </p>

        <Button href="/contact" variant="ghost" surface="dark" size="sm" className="shrink-0 lg:ml-auto">
          Join the Team
        </Button>
      </div>
    </div>
  );
}

export default function OurTeam() {
  const trackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });

  // Heading: rises out of the top of the stage and fades as scrolling begins.
  const headY = useTransform(smoothed, [0.04, 0.4], [0, -160]);
  const headOpacity = useTransform(smoothed, [0.04, 0.34], [1, 0]);

  // Cards lift into the space the heading vacates.
  const rowLift = useTransform(smoothed, [0.04, 0.4], [0, -12]);
  const rowY = useMotionTemplate`${rowLift}vh`;

  // The row reads left to right: it opens with the first card at the left
  // edge, then slides left so the view travels along it to the last card.
  // Its overflow is (100vw − its own width, a negative amount) — `100%` in
  // translateX is the row's own width — so the end position needs no measuring
  // and holds for any number of cards.
  const travelled = useTransform(smoothed, [0.06, 1], [0, 1]);
  const rowX = useMotionTemplate`calc(${travelled} * (100vw - 100%))`;

  return (
    /* A small lead-in only: the stage centres its content in the screen,
       which already puts some air above the heading. */
    <section className="bg-bg lg:pt-8">
      {/* Desktop: pinned stage. Hidden under reduced motion. */}
      <div
        ref={trackRef}
        className="relative hidden lg:block motion-reduce:lg:hidden"
        style={{ height: `${TRACK_VH}vh` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div
            className="mx-auto mb-16 w-full max-w-[860px] px-8 text-center"
            style={{ y: headY, opacity: headOpacity }}
          >
            <TeamHeading />
          </motion.div>

          <motion.div
            className="flex w-max gap-6 px-8"
            style={{ x: rowX, y: rowY }}
          >
            {TEAM.map((member, i) => (
              <TeamCard key={`member-${i}`} member={member} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Phones, tablets, and reduced motion: heading in place, and a row
          the visitor swipes sideways instead of scroll-driven travel. */}
      <div className="py-20 lg:hidden motion-reduce:lg:block motion-reduce:lg:py-28">
        <div className="mx-auto max-w-[860px] px-5 text-center sm:px-8">
          <TeamHeading />
        </div>
        <div className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:px-8">
          {TEAM.map((member, i) => (
            <TeamCard key={`member-${i}`} member={member} index={i} />
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 pb-20 sm:px-8 lg:pb-28">
        <JoinTeamBanner />
      </div>
    </section>
  );
}
