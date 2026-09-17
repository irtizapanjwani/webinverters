import Image from "next/image";
import { ArrowRightIcon } from "./icons";

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
  { label: "Portfolio", href: "#work" },
  { label: "Blog", href: "#" },
  { label: "Careers", href: "#" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  {
    label: "Web Inventers on X",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M4 4l16 16M20 4 4 20" />
      </svg>
    ),
  },
  {
    label: "Web Inventers on LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-4">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="size-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Web Inventers on Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M14 9h3V6h-3a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-border pt-14 pb-8 lg:pt-22">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">
        <div className="mb-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          <div>
            <Image
              src="/web-inverters-logo.png"
              alt="Web Inventers logo"
              width={720}
              height={408}
              className="mb-5 h-6 w-auto"
            />
            <p className="mb-6 max-w-[300px] text-sm leading-[1.65] text-ink-dim">
              Web Inventers is a full-service digital agency engineering
              websites, apps, and brands that move businesses forward.
            </p>
            <div className="flex gap-2.5">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex size-[38px] items-center justify-center rounded-[10px] border border-border-strong transition-colors hover:border-white/28 hover:bg-white/6"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="mb-5 text-[13px] font-bold tracking-[0.08em] text-ink-faint uppercase">
              Services
            </h5>
            <ul>
              {SERVICE_LINKS.map((label) => (
                <li key={label} className="mb-3.25">
                  <a href="#" className="text-[14.5px] text-ink-dim transition-colors hover:text-ink">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-5 text-[13px] font-bold tracking-[0.08em] text-ink-faint uppercase">
              Company
            </h5>
            <ul>
              {COMPANY_LINKS.map((link) => (
                <li key={link.label} className="mb-3.25">
                  <a href={link.href} className="text-[14.5px] text-ink-dim transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="mb-5 text-[13px] font-bold tracking-[0.08em] text-ink-faint uppercase">
              Get in Touch
            </h5>
            <ul>
              <li className="mb-3.25 text-[14.5px] text-ink-dim">[Office Address]</li>
              <li className="mb-3.25 text-[14.5px] text-ink-dim">[Phone Number]</li>
              <li className="mb-3.25 text-[14.5px] text-ink-dim">[Email Address]</li>
            </ul>
            <div className="mt-5.5">
              <h5 className="mb-1.5 text-[13px] font-bold tracking-[0.08em] text-ink-faint uppercase">
                Newsletter
              </h5>
              <p className="text-[13px] text-ink-dim">
                Occasional updates on our work — no spam.
              </p>
              <div className="mt-3 flex gap-2">
                <label htmlFor="nl-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="nl-email"
                  type="email"
                  placeholder="you@company.com"
                  className="min-w-0 grow rounded-[10px] border border-border-strong bg-surface px-3.5 py-3 font-body text-sm text-ink placeholder:text-ink-faint focus:outline-none"
                />
                <button
                  type="button"
                  aria-label="Subscribe"
                  className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-[#4C7CFF] px-4.5 py-3 text-white shadow-[0_12px_30px_-8px_rgba(27,90,240,0.55)] transition-transform hover:-translate-y-0.5"
                >
                  <ArrowRightIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-7 text-[13px] text-ink-faint">
          <span>© 2026 Web Inventers. All rights reserved.</span>
          <div className="flex gap-5.5">
            <a href="#" className="hover:text-ink">Privacy Policy</a>
            <a href="#" className="hover:text-ink">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
