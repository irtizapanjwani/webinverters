"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contact", label: "Contact" },
];

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

type NavProps = {
  /** The page begins on a light background (e.g. /contact), so the
   *  unscrolled nav must use dark text and the dark logo — not the
   *  white-on-dark treatment used over the landing/portfolio heroes. */
  onLight?: boolean;
};

export default function Nav({ onLight = false }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  /** Text/logo contrast mode: dark ink when on a light surface. */
  const darkText = onLight || scrolled;

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

  useEffect(() => {
    if (!menuOpen) return;

    const panel = panelRef.current;
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
      className={`sticky z-100 w-full border-b transition-[background-color,border-color,border-radius,top] duration-300 ${
        scrolled
          ? "top-4 border-gray-400 bg-white/50 backdrop-blur-xl py-4 rounded-full mx-auto max-w-[calc(100vw-32px)] lg:max-w-[850px] overflow-hidden"
          : "top-0 border-transparent py-3.5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center" aria-label="Web Inventers home">
          <span className={`relative block aspect-[1090/208] ${
            scrolled ? "h-7 sm:h-8" : "h-6 sm:h-8 lg:h-10 xl:h-12"
          }`}>
            <Image
              src="/web-inverters-logo-dark.png"
              alt="Web Inventers logo"
              fill
              sizes="294px"
              className="object-contain"
              priority
            />
            <Image
              src="/web-inverters-logo-dark.png"
              alt=""
              aria-hidden="true"
              fill
              sizes="294px"
              className={`object-contain brightness-0 invert transition-opacity duration-300 [clip-path:inset(0_0_0_17%)] ${
                darkText ? "opacity-0" : "opacity-100"
              }`}
              priority
            />
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => {
            // Route links are active when the path matches their href.
            const isActive =
              link.href.startsWith("/") && pathname === link.href;

            const linkClass = `relative rounded-full px-4 py-2.5 text-[14.5px] font-semibold transition-colors ${
              isActive
                ? `after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:rounded-sm ${
                    darkText
                      ? "text-accent after:bg-accent"
                      : "text-white after:bg-white"
                  }`
                : darkText
                  ? "text-ink-dim hover:text-accent"
                  : "text-white/85 hover:text-white"
            }`;

            const isRoute = link.href.startsWith("/");

            return isRoute ? (
              <Link
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={linkClass}
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={linkClass}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-3.5">
          {scrolled ? null : (
            <div className="hidden lg:block">
              <Button
                href="/portfolio"
                variant="ghost"
                size="sm"
                surface={onLight ? "light" : "dark"}
              >
                View Our Work
              </Button>
            </div>
          )}
          <Button href="#start-project" size="sm">
            Start Project
          </Button>
          <button
            ref={triggerRef}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
            className="flex size-11 items-center justify-center rounded-xl border border-border-strong bg-black/[0.03] lg:hidden"
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
          className="fixed inset-0 top-0 z-99 overflow-y-auto bg-bg px-6 pt-[110px] pb-10 lg:hidden"
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
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href.startsWith("/") && pathname === link.href;
              const isRoute = link.href.startsWith("/");

              return isRoute ? (
                <Link
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMenu}
                  className={`border-b border-border px-2 py-4 text-xl font-semibold ${
                    isActive ? "text-accent" : "text-ink-dim"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMenu}
                  className="border-b border-border px-2 py-4 text-xl font-semibold text-ink-dim"
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="mt-7 flex flex-col items-stretch gap-3.5">
            <Button href="/portfolio" variant="ghost" block onClick={closeMenu}>
              View Our Work
            </Button>
            <Button href="#start-project" block onClick={closeMenu}>
              Start Project
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
