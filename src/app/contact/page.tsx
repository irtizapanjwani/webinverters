"use client";

import { useEffect } from "react";
import Image from "next/image";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { BRANDS, BrandLogo } from "../components/TrustedStrip";
import NextSteps from "../components/NextSteps";
import Locations from "../components/Locations";

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5"
      aria-hidden="true"
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full bg-bg">
      {/* Page starts on white — the nav renders its dark-text treatment */}
      <Nav onLight />

      <main id="top">
        <div className="mx-auto w-full max-w-[1400px] px-4 pt-3 sm:px-6 lg:px-8 lg:pt-5">
          {/* Dark spotlight panel — same family as FinalCTA, warmed by the
              reference's amber glow */}
          <section
            id="start-project"
            className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#0B1330] to-[#05070C] p-6 sm:p-10 lg:p-12"
          >
            {/* Glow field, decorative only. Signal Blue rather than the amber
                it used to be, so this panel matches the "Have a Project in
                Mind?" spotlight — same base gradient, same light. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-28 top-1/4 size-[560px] rounded-full bg-[radial-gradient(circle,rgba(27,90,240,0.42),transparent_65%)] blur-[90px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-32 size-[420px] rounded-full bg-[radial-gradient(circle,rgba(14,116,144,0.3),transparent_65%)] blur-[90px]"
            />

            <div className="relative grid items-start gap-12 lg:grid-cols-[0.95fr_1.15fr] lg:gap-14 xl:gap-20">
              {/* Left: headline + contact rows.
                  `min-w-0` on both columns is load-bearing: an `fr` track will
                  not shrink below its content's min-content width, so anything
                  wide inside a column silently pushes the whole grid past the
                  panel, where the section's `overflow-hidden` clips it. */}
              <div className="flex min-w-0 flex-col">
                <span className="mb-6 block text-xs font-bold tracking-[0.18em] text-white uppercase">
                  Let&apos;s Talk
                </span>

                <h1 className="mb-6 font-display text-[clamp(24px,4.7vw,58px)] leading-[1.02] font-extrabold tracking-[-0.02em] text-white">
                  Start the
                  <br />
                  Conversation.
                </h1>

                <p className="max-w-[480px] text-[16.5px] leading-[1.65] text-white/70">
                  Tell us about your project. We&apos;ll review the details and
                  come back with an informed perspective and a clear path
                  forward.
                </p>

                {/* Contact rows — real phone and email, live links. */}
                <div className="mt-14 flex flex-col gap-5 lg:mt-24">
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-[14px] border border-white/15 bg-white/[0.04] text-white">
                      <PhoneIcon />
                    </span>
                    <a
                      href="tel:+18324021715"
                      className="text-[15.5px] leading-[1.6] text-white/70 transition-colors hover:text-white"
                    >
                      (832) 402-1715
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="flex size-14 shrink-0 items-center justify-center rounded-[14px] border border-white/15 bg-white/[0.04] text-white">
                      <MailIcon />
                    </span>
                    <a
                      href="mailto:info@webinventers.com"
                      className="text-[15.5px] leading-[1.6] text-white/70 transition-colors hover:text-white"
                    >
                      info@webinventers.com
                    </a>
                  </div>
                </div>

                {/* Named contact card — a person to talk to, not an inbox. */}
                <div className="mt-12 flex items-start gap-5 rounded-[20px] border border-white/10 bg-white/[0.04] p-5 sm:p-6 lg:mt-14">
                  <Image
                    src="/contact/mac-collins.webp"
                    alt="Mac Collins"
                    width={80}
                    height={80}
                    // Served as-is: the file is already sized and sharpened
                    // for this slot, and re-encoding at the default quality
                    // softened it again.
                    unoptimized
                    className="size-16 shrink-0 rounded-[12px] object-cover sm:size-20"
                  />
                  <div className="min-w-0 flex-1 self-center">
                    <p className="text-[clamp(19px,1.8vw,24px)] leading-[1.2] font-medium text-white">
                      Mac Collins
                    </p>
                    <p className="mt-2 text-[14px] leading-[1.5] text-white/75">
                      Senior Brand Manager{" "}
                      <span className="text-white/45">| Web Inventers</span>
                    </p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="flex size-10 shrink-0 items-center justify-center rounded-[10px] bg-white/[0.08] text-[15px] font-bold text-white"
                  >
                    in
                  </span>
                </div>
              </div>

              {/* Right: white form card. The brand marquee below the form has
                  deliberately over-wide halves, which without `min-w-0` here
                  dragged this whole column to ~1700px and pushed the form's
                  second field column (Last Name, Phone, Where did you hear)
                  outside the clipped panel. */}
              <div className="min-w-0 rounded-[24px] bg-white p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] sm:p-8 lg:p-10">
                <ContactForm />

                {/* Brand strip below Submit — two identical halves sliding by
                    exactly -50% so the loop seams are invisible. Each half is
                    forced wider than the card (`min-w-[820px]`) so one half is
                    always covering the strip and no gap travels in from the
                    right. Right-to-left via the shared `animate-marquee`. */}
                <div className="mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
                  <div className="flex w-max animate-marquee [animation-duration:28s]">
                    {[0, 1].map((copy) => (
                      <div
                        key={copy}
                        aria-hidden={copy === 1}
                        className="flex min-w-[820px] shrink-0 items-center justify-around gap-14 px-8"
                      >
                        {BRANDS.map((brand) => (
                          <span
                            key={brand.name}
                            className="flex shrink-0 items-center text-ink/70"
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
          </section>
        </div>

        <NextSteps />
        <Locations />
      </main>

      <Footer />
    </div>
  );
}
