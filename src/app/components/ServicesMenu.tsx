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
import { SERVICE_SHADES } from "./serviceShades";
import { SOCIALS } from "./socials";

const EASE = [0.22, 1, 0.36, 1] as const;

/** How long the panel waits after the pointer leaves before closing, so the
 *  pointer can move between the Services item and the panel. */
const CLOSE_DELAY_MS = 160;

const noop = () => () => {};
function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

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
  /** Classes for the "Services" link, shared with the other navbar links so it
   *  matches their colour, size, hover and active state. */
  className: string;
  /** Colour classes for the arrow button beside the link, matching the link. */
  chevronClassName: string;
  /** The Services page is the current page. */
  active: boolean;
  /** The navbar element — the panel's content starts just below it. */
  headerRef: React.RefObject<HTMLElement | null>;
  /** Tells the navbar the panel is open, so it switches to dark text over the
   *  white panel. */
  onOpenChange?: (open: boolean) => void;
};

/**
 * The navbar's "Services" item and its mega menu: a full-width white panel
 * behind the navbar with a gradient card per service and a contact row along
 * the bottom. The page behind dims and blurs.
 *
 * The panel is portalled to <body>. The scrolled navbar is a clipped glass
 * pill, and its backdrop blur also makes it the containing block for fixed
 * children — so a panel inside it would be cut off at the pill's edge.
 *
 * "Services" itself is a link to the Services page. Hovering it (or the arrow
 * beside it) opens the panel, with a short grace period for moving onto the
 * panel. The arrow is a button, so keyboard users can open the panel too.
 * Escape, clicking the dimmed page, focus moving elsewhere, or following one
 * of its links closes it; Escape returns focus to the arrow.
 */
export default function ServicesMenu({
  className,
  chevronClassName,
  active,
  headerRef,
  onOpenChange,
}: ServicesMenuProps) {
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
      <span className="inline-flex items-center" onMouseEnter={openNow} onMouseLeave={closeSoon}>
        <Link
          href="/services"
          aria-current={active ? "page" : undefined}
          onClick={close}
          className={className}
        >
          Services
        </Link>
        <button
          ref={triggerRef}
          type="button"
          aria-label={open ? "Hide all services" : "Show all services"}
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
            // the panel so its links are next in the tab order (the panel
            // lives at the end of <body>).
            if (open) {
              close();
              return;
            }
            openNow();
            requestAnimationFrame(() =>
              panelRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true })
            );
          }}
          className={`-ml-2.5 flex size-7 items-center justify-center rounded-full transition-colors xl:-ml-3 ${chevronClassName}`}
        >
          <Chevron open={open} />
        </button>
      </span>

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

                    <div className="grid grid-cols-3 gap-x-6 gap-y-8 xl:grid-cols-6 xl:gap-5 2xl:gap-8">
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
                              className={`group relative flex h-[92px] items-center justify-between gap-3 overflow-hidden rounded-[12px] px-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] 2xl:px-5 ${SERVICE_SHADES[i % SERVICE_SHADES.length]}`}
                            >
                              <span
                                className="min-w-0 font-display text-[clamp(13px,0.95vw,16px)] leading-[1.2] font-semibold tracking-[-0.01em] [overflow-wrap:normal]"
                              >
                                {service.menuTitle}
                              </span>
                              <span className="flex size-9 shrink-0 items-center justify-center rounded-[10px] border border-white/30 bg-white/[0.06] transition-colors duration-300 group-hover:bg-white/20 2xl:size-11 2xl:rounded-[12px]">
                                <ArrowUpRight className="size-3.5" />
                              </span>
                            </Link>
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
 * The mobile menu's "Services" row: "Services" links to the Services page, and
 * the arrow beside it expands the same services as plain links under it.
 */
export function MobileServicesList({
  onNavigate,
  className,
  active,
}: {
  onNavigate: () => void;
  className: string;
  active: boolean;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  const serviceLink = useServiceLink();

  return (
    <div className="border-b border-border">
      <div className="flex items-center justify-between">
        <Link
          href="/services"
          aria-current={active ? "page" : undefined}
          onClick={onNavigate}
          className={`${className} flex-1`}
        >
          Services
        </Link>
        <button
          type="button"
          aria-label={open ? "Hide all services" : "Show all services"}
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
          className="flex size-11 items-center justify-center rounded-xl text-ink-dim"
        >
          <Chevron open={open} />
        </button>
      </div>
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
