import Image from "next/image";
import NewsletterForm from "./NewsletterForm";

const SERVICE_LINKS = [
  "Web Design & Development",
  "E-commerce Development",
  "Mobile App Development",
  "Branding",
  "SEO",
  "Social Media Management",
];

const COMPANY_LINKS = [
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", soon: true },
  { label: "Terms & Conditions", soon: true },
];

const SOCIALS = [
  {
    label: "Web Inventers on X",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M4 4l16 16M20 4 4 20" />
      </svg>
    ),
  },
  {
    label: "Web Inventers on LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <line x1="8" y1="10" x2="8" y2="17" />
        <circle cx="8" cy="7" r="0.6" fill="currentColor" />
        <path d="M12 17v-4.5a2.5 2.5 0 0 1 5 0V17" />
      </svg>
    ),
  },
  {
    label: "Web Inventers on Instagram",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="size-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Web Inventers on Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M14 9h3V6h-3a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-border pt-14 pb-8 lg:pt-22 overflow-visible">
      {/* Scrolling marquee below footer */}
      <div className="absolute bottom-0 left-0 w-full translate-y-full overflow-hidden py-5" aria-hidden="true">
        <div className="animate-marquee flex whitespace-nowrap">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="mx-6 font-display text-[28px] font-extrabold tracking-[-0.02em] text-accent/[0.2]">
              LET&rsquo;S BUILD, SOMETHING AWESOME!
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mb-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Image
              src="/web-inverters-logo-dark.png"
              alt="Web Inventers logo"
              width={1090}
              height={208}
              className="mb-5 h-8 w-auto"
            />
            <p className="mb-6 max-w-[300px] text-sm leading-[1.65] text-ink-dim">
              Web Inventers is a full-service digital agency engineering
              websites, apps, and brands that move businesses forward.
            </p>
            {/* Accounts are not live yet: rendered as labelled placeholders so
                the row reads as pending rather than broken. Swap each span for
                an <a href> once the profile URLs exist. */}
            <div className="flex gap-2.5">
              {SOCIALS.map((social) => (
                <span
                  key={social.label}
                  role="img"
                  aria-label={`${social.label} — coming soon`}
                  className="flex size-11 items-center justify-center rounded-[10px] border border-border text-ink-faint"
                >
                  {social.icon}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-[13px] font-bold tracking-[0.08em] text-ink-faint uppercase">
              Services
            </h3>
            {/* These point at the on-page Services section rather than at
                per-service pages, which do not exist yet. */}
            <ul>
              {SERVICE_LINKS.map((label) => (
                <li key={label} className="mb-3.25">
                  <a
                    href="#services"
                    className="inline-block py-0.5 text-[14.5px] text-ink-dim transition-colors hover:text-ink"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[13px] font-bold tracking-[0.08em] text-ink-faint uppercase">
              Company
            </h3>
            <ul>
              {COMPANY_LINKS.map((link) => (
                <li key={link.label} className="mb-3.25">
                  <a
                    href={link.href}
                    className="inline-block py-0.5 text-[14.5px] text-ink-dim transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-[13px] font-bold tracking-[0.08em] text-ink-faint uppercase">
              Get in Touch
            </h3>
            {/* Placeholders until Web Inventers supplies the real details.
                Kept as plain text — a tel:/mailto: link to a placeholder is a
                broken action, not a pending one. */}
            <ul>
              <li className="mb-3.25 text-[14.5px] text-ink-faint italic">
                [Office Address]
              </li>
              <li className="mb-3.25 text-[14.5px] text-ink-faint italic">
                [Phone Number]
              </li>
              <li className="mb-3.25 text-[14.5px] text-ink-faint italic">
                [Email Address]
              </li>
            </ul>
            <div className="mt-5.5">
              <h3 className="mb-1.5 text-[13px] font-bold tracking-[0.08em] text-ink-faint uppercase">
                Newsletter
              </h3>
              <p className="text-[13px] text-ink-dim">
                Occasional updates on our work — no spam.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-7 text-[13px] text-ink-faint">
          <span>© 2026 Web Inventers. All rights reserved.</span>
          <div className="flex gap-5.5">
            {LEGAL_LINKS.map((link) => (
              <span key={link.label} aria-disabled="true" className="inline-flex items-center gap-1.5">
                {link.label}
                <span className="text-[11px] font-bold tracking-[0.1em] uppercase">
                  Soon
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
