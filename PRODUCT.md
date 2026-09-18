# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Mixed inbound. The site must work for whoever arrives — referral, search, or social — rather than one sharp persona. In practice that spans small-business owners and founders comparing a few agencies, and in-house marketing or product leads looking for an execution partner. No single audience has been declared primary, so the page cannot assume shared vocabulary, budget range, or prior knowledge of the agency.

The visitor is evaluating, not using. They arrive cold, scan for whether this agency can build the thing they need, and decide within one session whether to make contact.

## Product Purpose

Web Inventers is a full-service digital agency. This site is its public front door: it exists to convert inbound visitors into direct conversations about a project.

**Success is a direct contact** — the visitor emails, calls, or submits the project form. Not a newsletter signup, not a download, not time-on-page. Every section is judged by whether it moves a stranger toward contacting the team.

## Positioning

**Speed to launch.** Fixed, short timelines — projects ship in weeks, not quarters. This is the claim the site leads on and the one a neighboring agency could not truthfully copy without changing how it operates.

Open: the specific timeline commitment (e.g. "launched in 4 weeks") has not been confirmed. Do not publish a number until the user supplies one.

## Operating Context

Visitors arrive cold and on any device; mobile is a first-class case, not a fallback. They comparison-shop — this site is likely one of several agency sites open at once — so the first viewport carries disproportionate weight.

The evaluation happens entirely on-page. There is no login, no trial, no product to try. The only artifacts a visitor can weigh are the work shown, the process described, and the ease of getting in touch.

## Capabilities and Constraints

**Services actually delivered:**
- Web design & development (custom sites and web applications) — the core offer
- E-commerce development (online stores)
- Mobile app development (iOS/Android)
- Branding, SEO, and social media management as ongoing services

All six footer service lines are backed by real capability. Nothing listed is aspirational.

**Contact channels that are real and must be wired:**
- Email — business inbox for inbound project enquiries
- Phone — a published, dialable number
- On-site contact form

WhatsApp is **not** an offered channel and must not appear. The actual email address and phone number have not yet been supplied; request them before shipping any contact surface rather than inventing placeholders.

**Technical constraints:**
- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, `framer-motion` available
- Fonts already committed in `src/app/layout.tsx`: Space Grotesk (display), Plus Jakarta Sans (body), Manrope ExtraBold (hero heading only)
- `AGENTS.md` is authoritative: this Next.js version has breaking changes from training data — read `node_modules/next/dist/docs/` before writing framework code
- The contact form has **no submission endpoint**. A backend or form service must be chosen before the form can be honest about what happens on submit.
- `src/app/components/Services.tsx` is currently a stub — heading and intro only, no service content rendered.

## Brand Commitments

- Name: **Web Inventers** (spelled with "Inventers", not "Inventors" — preserve it)
- Logo assets: `public/web-inverters-logo-dark.png`, `public/web-inverters-logo.jpeg` (note the filenames say "inverters"; the brand is "Inventers")
- Voice in existing copy: plain, direct, outcome-framed, low-jargon — "Tell us where you want to go." No confirmed voice guide beyond what is already written.

## Evidence on Hand

**There is none. Every quantitative and social claim currently on the page is placeholder and must not be treated as fact or carried forward as true:**

- Stats (`Stats.tsx`): 120+ projects, 80+ clients, 14 industries, 6 years — all invented
- Client marquee (`Hero.tsx`): Nova, Halcyon, Vertex, Lumen Labs, Orbital, Fintra — all invented
- Case studies (`FeaturedWork.tsx`): Northwind Retail, Aster Health, Vantage Finance, with their result figures — all invented
- Testimonials (`Testimonials.tsx`): Sara Malik, Daniyal Raza, Emily Chen and their quotes — all invented

No real portfolio pieces, client logos, metrics, testimonials, case studies, press, or team photos have been supplied. Future work must either obtain real material from the user or design sections that earn trust without fabricated proof. **Do not invent replacements, and do not preserve the existing filler as if it were true.**

## Product Principles

1. **Contact is the only conversion.** Every section either builds the case for making contact or earns its place some other way; sections that do neither are cut.
2. **Never fabricate proof.** No invented clients, metrics, quotes, or logos. Where real evidence is missing, the design must build credibility through craft, clarity, and specificity of process instead.
3. **Speed is the argument.** Short timelines are the differentiator; the site should demonstrate that decisiveness in its own structure, not just assert it in copy.
4. **Written for strangers.** Mixed inbound means no assumed context — plain language, no insider jargon, and a legible path from "what do you do" to "how do I reach you."
5. **Mobile is a primary case.** Inbound from social and search lands on phones; the mobile experience is designed, not derived.

## Accessibility & Inclusion

No product-specific standard has been established beyond the craft floor: keyboard-reachable navigation and contact paths, honest focus states, respected reduced-motion preferences, and text contrast that holds on both the light page and the fixed-dark CTA panel.
