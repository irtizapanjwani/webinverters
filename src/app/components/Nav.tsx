"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "./Button";

const NAV_LINKS = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#work", label: "Portfolio" },
  { href: "#", label: "Blog" },
  { href: "#", label: "Careers" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <header
      className={`sticky top-0 z-100 w-full border-b transition-[background-color,border-color,padding] duration-300 ${
        scrolled
          ? "border-border bg-bg/82 py-2 backdrop-blur-lg"
          : "border-transparent py-3.5"
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center" aria-label="Web Inventers home">
          <Image
            src="/web-inverters-logo.png"
            alt="Web Inventers logo"
            width={720}
            height={408}
            className="h-16 w-auto"
            priority
          />
        </a>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative rounded-full px-4 py-2.5 text-[14.5px] font-semibold transition-colors ${
                link.label === "Home"
                  ? "text-ink after:absolute after:bottom-1 after:left-4 after:right-4 after:h-0.5 after:rounded-sm after:bg-gradient-to-r after:from-accent after:to-accent-2"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              {link.label}
            </a>
          ))}
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
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="flex size-11 items-center justify-center rounded-xl border border-border-strong bg-white/[0.03] xl:hidden"
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
        <div className="fixed inset-0 top-0 z-99 bg-bg px-6 pt-[110px] pb-10 xl:hidden">
          <div className="mx-auto flex w-full max-w-[1400px] justify-end px-5 sm:px-8">
            <button
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="flex size-11 items-center justify-center rounded-xl border border-border-strong bg-white/[0.03]"
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
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="border-b border-border px-2 py-4 text-xl font-semibold text-ink-dim"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-7 flex flex-col items-stretch gap-3.5">
            <Button href="#work" variant="ghost" block onClick={() => setMenuOpen(false)}>
              View Our Work
            </Button>
            <Button href="#start-project" block onClick={() => setMenuOpen(false)}>
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
