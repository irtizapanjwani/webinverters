"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";

/** `soon` marks a destination that does not exist yet: rendered as a labelled,
 * non-interactive item rather than a link to nowhere. */
const NAV_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Portfolio" },
  { href: "#", label: "Blog", soon: true },
  { href: "#", label: "Careers", soon: true },
  { href: "#contact", label: "Contact" },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // The open menu is a modal surface: Escape closes it, Tab cycles inside it,
  // and focus returns to the trigger on close so the keyboard user is never
  // dropped back at the top of the document.
  useEffect(() => {
    if (!menuOpen) return;

    const panel = panelRef.current;
    // Captured now: by cleanup time the ref may already point elsewhere.
    const trigger = triggerRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      trigger?.focus();
    };
  }, [menuOpen, closeMenu]);

  return (
    <header
      /* `padding` is deliberately NOT transitioned. The header is sticky and
         so occupies flow: animating its padding reflows every section below it
         for the full 300ms each time the scroll threshold is crossed. The
         compaction still happens — it just resolves in one frame, while the
         background, blur and hairline ease in around it. */
      className={`sticky top-0 z-100 w-full border-b transition-[background-color,border-color] duration-300 ${
        scrolled
          ? "border-border bg-bg/82 py-2 backdrop-blur-lg"
          : "border-transparent py-3.5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center" aria-label="Web Inventers home">
          <Image
            src="/web-inverters-logo-dark.png"
            alt="Web Inventers logo"
            width={1090}
            height={208}
            className="h-7 w-auto sm:h-10 lg:h-12 xl:h-14"
            priority
          />
        </a>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            link.soon ? (
              <span
                key={link.label}
                aria-disabled="true"
                className="relative cursor-default rounded-full px-4 py-2.5 text-[14.5px] font-semibold text-ink-faint"
              >
                {link.label}
                <span className="ml-1.5 align-middle text-[11px] font-bold tracking-[0.1em] text-ink-faint uppercase">
                  Soon
                </span>
              </span>
            ) : (
              <a
                key={link.label}
                href={link.href}
                aria-current={link.label === "Home" ? "page" : undefined}
                className={`relative rounded-full px-4 py-2.5 text-[14.5px] font-semibold transition-colors ${
                  link.label === "Home"
                    ? "text-accent after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:rounded-sm after:bg-accent"
                    : "text-ink-dim hover:text-accent"
                }`}
              >
                {link.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-3.5">
          {/* wrapper controls visibility: putting `hidden` on the Button itself
              collides with the `inline-flex` in its base classes */}
          <div className="hidden xl:block">
            <Button href="#work" variant="ghost" size="sm">
              View Our Work
            </Button>
          </div>
          <Button href="#start-project" size="sm">
            Get a Quote
          </Button>
          <button
            ref={triggerRef}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className="flex size-11 items-center justify-center rounded-xl border border-border-strong bg-black/[0.03] xl:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="size-5"
            >
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="17" x2="20" y2="17" />
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={panelRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 top-0 z-99 overflow-y-auto bg-bg px-6 pt-[110px] pb-10 xl:hidden"
        >
          <div className="mx-auto flex w-full max-w-[1400px] justify-end px-5 sm:px-8">
            <button
              aria-label="Close menu"
              onClick={closeMenu}
              className="flex size-11 items-center justify-center rounded-xl border border-border-strong bg-black/[0.03]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                className="size-5"
              >
                <line x1="5" y1="5" x2="19" y2="19" />
                <line x1="19" y1="5" x2="5" y2="19" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col items-stretch gap-1" aria-label="Mobile">
            {NAV_LINKS.map((link) =>
              link.soon ? (
                <span
                  key={link.label}
                  aria-disabled="true"
                  className="flex items-center justify-between border-b border-border px-2 py-4 text-xl font-semibold text-ink-faint"
                >
                  {link.label}
                  <span className="text-[11px] font-bold tracking-[0.1em] uppercase">
                    Soon
                  </span>
                </span>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={link.label === "Home" ? "page" : undefined}
                  onClick={closeMenu}
                  className="border-b border-border px-2 py-4 text-xl font-semibold text-ink-dim"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>
          <div className="mt-7 flex flex-col items-stretch gap-3.5">
            <Button href="#work" variant="ghost" block onClick={closeMenu}>
              View Our Work
            </Button>
            <Button href="#start-project" block onClick={closeMenu}>
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
