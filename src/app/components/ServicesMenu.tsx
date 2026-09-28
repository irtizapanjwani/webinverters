"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { SERVICES } from "./serviceData";
import { SOCIALS } from "./socials";

const EASE = [0.22, 1, 0.36, 1] as const;

/** How long the panel waits after the pointer leaves before closing, so the
 *  pointer can move between the Services item and the panel. */
const CLOSE_DELAY_MS = 160;

const noop = () => () => {};
function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

/** One gradient per service card, in SERVICES order: soft blurred light
 *  streaks over a base colour, each card in its own colour family. */
const CARD_SHADES = [
  // Web Design & Development — navy with a warm orange streak
  "bg-[radial-gradient(45%_160%_at_62%_40%,rgba(234,88,12,0.95),transparent_65%),radial-gradient(40%_120%_at_100%_100%,rgba(220,38,38,0.85),transparent_70%),linear-gradient(115deg,#0B1330_0%,#1F2A48_42%,#7C2D12_100%)]",
  // Mobile App Development — steel blue
  "bg-[radial-gradient(80%_140%_at_20%_0%,rgba(147,197,253,0.35),transparent_60%),linear-gradient(135deg,#2B5A8C,#3D6E9E_55%,#34507A)]",
  // E-commerce Development — olive green
  "bg-[radial-gradient(60%_140%_at_85%_50%,rgba(205,214,170,0.75),transparent_65%),radial-gradient(50%_120%_at_20%_100%,rgba(52,68,26,0.9),transparent_70%),linear-gradient(135deg,#55633A,#7C8A5A)]",
  // Branding — navy into violet and rose
  "bg-[radial-gradient(55%_150%_at_55%_60%,rgba(124,58,237,0.75),transparent_65%),radial-gradient(45%_130%_at_100%_20%,rgba(190,24,93,0.7),transparent_65%),radial-gradient(45%_130%_at_15%_100%,rgba(37,99,235,0.8),transparent_65%),linear-gradient(120deg,#0B1330,#1E1B4B)]",
  // SEO — electric blue
  "bg-[radial-gradient(60%_150%_at_80%_20%,rgba(59,130,246,0.95),transparent_62%),radial-gradient(50%_130%_at_10%_100%,rgba(6,182,212,0.6),transparent_65%),linear-gradient(135deg,#0B1330,#0F1D4A)]",
  // Social Media Management — near black with a deep red glow
  "bg-[radial-gradient(45%_140%_at_75%_40%,rgba(153,27,27,0.75),transparent_65%),linear-gradient(135deg,#050505,#1A0F0F)]",
];

function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/** Link to one service on the landing page. From any other page it navigates
 *  there, and the browser scrolls to the service's anchor at the top of the
 *  services section while the section reads the hash to pick the tab. On the
 *  landing page itself the click updates the hash, glides to the anchor, and
 *  tells the section the hash changed. */
function useServiceLink() {
  const pathname = usePathname();
  return useCallback(
    (slug: string) => ({
      href: `/#service-${slug}`,
      onClick: (e: React.MouseEvent) => {
        if (pathname !== "/") return;
        e.preventDefault();
        const hash = `#service-${slug}`;
        if (window.location.hash !== hash) window.history.pushState(null, "", hash);
        window.dispatchEvent(new HashChangeEvent("hashchange"));
        // Start the glide once the panel's exit and the tab switch have
        // begun: framer-motion measures those animations with the page's
        // scroll position saved, then restores it — which would cancel a
        // scroll started in the same frame.
        setTimeout(() => {
          document
            .getElementById(`service-${slug}`)
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 80);
      },
    }),
    [pathname]
  );
}

type ServicesMenuProps = {
  /** Classes for the trigger, shared with the other navbar links so it matches
   *  their colour, size and hover state. */
  className: string;
  /** The navbar element — the panel's content starts just below it. */
  headerRef: React.RefObject<HTMLElement | null>;
  /** Tells the navbar the panel is open, so it switches to dark text over the
   *  white panel. */
  onOpenChange?: (open: boolean) => void;
};

/**
 * The navbar's "Services" item and its mega menu: a full-width white panel
 * behind the navbar with a column per service — a gradient card and the
 * service's specialities as a list — and a contact row along the bottom. The
 * page behind dims and blurs.
 *
 * The panel is portalled to <body>. The scrolled navbar is a clipped glass
 * pill, and its backdrop blur also makes it the containing block for fixed
 * children — so a panel inside it would be cut off at the pill's edge.
 *
 * Opens on hover (with a short grace period for moving onto the panel) and on
 * click or Enter/Space. Escape, clicking the dimmed page, focus moving
 * elsewhere, or following one of its links closes it; Escape returns focus to
 * the trigger.
 */
export default function ServicesMenu({ className, headerRef, onOpenChange }: ServicesMenuProps) {
  const [open, setOpenState] = useState(false);
  const [contentTop, setContentTop] = useState(96);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isClient = useIsClient();
  const reduce = useReducedMotion();
  const panelId = useId();
  const headingId = useId();
  const serviceLink = useServiceLink();

  const setOpen = useCallback(
    (next: boolean) => {
      setOpenState(next);
      onOpenChange?.(next);
    },
    [onOpenChange]
  );

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };
  const openNow = () => {
    cancelClose();
    setOpen(true);
  };
  const closeSoon = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  };
  const close = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(false);
  }, [setOpen]);

  // The panel runs up behind the navbar; its content starts below it. The
  // navbar moves and changes shape as the page scrolls, so keep measuring.
  useEffect(() => {
    if (!open) return;
    const place = () => {
      const header = headerRef.current;
      if (header) setContentTop(Math.round(header.getBoundingClientRect().bottom));
    };
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, [open, headerRef]);

  // Escape, and focus moving outside both trigger and panel.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      close();
      triggerRef.current?.focus();
    };
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target;
      if (t instanceof Node && !panelRef.current?.contains(t) && !triggerRef.current?.contains(t)) {
        close();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [open, close]);

  useEffect(() => cancelClose, []);

  const fade = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -12 } };

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={(e) => {
          // A mouse click lands after hover has already opened the panel, so
          // it only keeps it open — toggling would shut it under the pointer.
          if (e.detail > 0) {
            openNow();
            return;
          }
          // Enter/Space toggles. Opening from the keyboard moves focus into
          // the panel so its links are next in the tab order (the panel lives
          // at the end of <body>).
          if (open) {
            close();
            return;
          }
          openNow();
          requestAnimationFrame(() =>
            panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true })
          );
        }}
        onMouseEnter={openNow}
        onMouseLeave={closeSoon}
        className={`${className} inline-flex items-center gap-1`}
      >
        Services
        <Chevron open={open} />
      </button>

      {isClient &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                {/* The page behind, dimmed and blurred. Clicking it closes. */}
                <motion.div
                  key="scrim"
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={close}
                  className="fixed inset-0 z-[98] hidden bg-[#05070C]/45 backdrop-blur-md lg:block"
                />

                <motion.div
                  key="panel"
                  ref={panelRef}
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  {...fade}
                  transition={{ duration: 0.28, ease: EASE }}
                  onMouseEnter={openNow}
                  onMouseLeave={closeSoon}
                  style={{ paddingTop: contentTop + 36 }}
                  className="fixed inset-x-0 top-0 z-[99] hidden max-h-screen overflow-y-auto bg-white pb-7 shadow-[0_30px_60px_-30px_rgba(11,17,32,0.4)] lg:block"
                >
                  <div className="mx-auto w-full max-w-[1760px] px-8 xl:px-12">
                    <p
                      id={headingId}
                      className="mb-7 font-display text-[clamp(22px,1.9vw,28px)] leading-[1.1] font-extrabold tracking-[-0.02em] text-accent"
                    >
                      All Services
                    </p>

                    <div className="grid grid-cols-3 gap-x-6 gap-y-8 xl:grid-cols-6 xl:gap-8">
                      {SERVICES.map((service, i) => {
                        const link = serviceLink(service.slug);
                        const go = (e: React.MouseEvent) => {
                          link.onClick(e);
                          close();
                        };
                        return (
                          <div key={service.slug} className="min-w-0">
                            <Link
                              href={link.href}
                              onClick={go}
                              className={`group relative flex h-[92px] items-center justify-between gap-3 overflow-hidden rounded-[12px] px-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] 2xl:px-5 ${CARD_SHADES[i % CARD_SHADES.length]}`}
                            >
                              <span
                                className="min-w-0 font-display text-[clamp(13.5px,1vw,16px)] leading-[1.2] font-semibold tracking-[-0.01em] [overflow-wrap:normal]"
                              >
                                {service.menuTitle}
                              </span>
                              <span className="flex size-11 shrink-0 items-center justify-center rounded-[12px] border border-white/30 bg-white/[0.06] transition-colors duration-300 group-hover:bg-white/20 2xl:size-[58px]">
                                <ArrowUpRight />
                              </span>
                            </Link>

                            <ul className="mt-6">
                              {service.tags.map((tag) => (
                                <li key={tag}>
                                  <Link
                                    href={link.href}
                                    onClick={go}
                                    className="flex items-center justify-between gap-3 border-b border-border py-3 text-[14.5px] leading-[1.4] text-ink-dim transition-colors hover:text-accent"
                                  >
                                    {tag}
                                    <ArrowUpRight className="size-3.5 shrink-0" />
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>

                    {/* Contact row */}
                    <div className="mt-9 flex items-center justify-between gap-6 border-t border-border pt-5">
                      <div className="flex items-center gap-8 xl:gap-12">
                        <Link
                          href="/contact"
                          onClick={close}
                          className="rounded-full border border-border-strong px-6 py-2.5 text-[14.5px] font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
                        >
                          Contact Us
                        </Link>
                        <a href="tel:+18324021715" className="text-[15px] text-ink transition-colors hover:text-accent">
                          (832) 402-1715
                        </a>
                        <a href="mailto:info@webinventers.com" className="text-[15px] text-ink transition-colors hover:text-accent">
                          info@webinventers.com
                        </a>
                      </div>
                      {/* Profiles are not live yet — shown as labelled
                          placeholders, as in the footer. */}
                      <div className="flex gap-2">
                        {SOCIALS.map((social) => (
                          <span
                            key={social.label}
                            role="img"
                            aria-label={`${social.label} — coming soon`}
                            className="flex size-11 items-center justify-center rounded-[10px] bg-bg-alt text-ink"
                          >
                            {social.icon}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}

/**
 * The mobile menu's "Services" row: a disclosure that lists the same services
 * as plain links under it.
 */
export function MobileServicesList({
  onNavigate,
  className,
}: {
  onNavigate: () => void;
  className: string;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const serviceLink = useServiceLink();

  return (
    <div className="border-b border-border">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className={`${className} flex w-full items-center justify-between`}
      >
        Services
        <Chevron open={open} />
      </button>
      {open && (
        <ul id={listId} className="flex flex-col pb-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                {...serviceLink(service.slug)}
                onClick={(e) => {
                  serviceLink(service.slug).onClick(e);
                  onNavigate();
                }}
                className="flex items-center justify-between px-4 py-2.5 text-base font-medium text-ink-dim hover:text-accent"
              >
                {service.title}
                <ArrowUpRight />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
