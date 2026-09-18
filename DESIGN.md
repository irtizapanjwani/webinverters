---
name: Web Inventers
description: A white mission-control console where one electric blue signal marks every action.
colors:
  signal-blue: "#1B5AF0"
  signal-blue-lift: "#3A68EE"
  readout-teal: "#0E7490"
  console-white: "#FFFFFF"
  instrument-grey: "#F4F6FB"
  panel-grey: "#EEF1F7"
  night-ink: "#0B1120"
  ink-dim: "#4A5568"
  ink-faint: "#606B7D"
  hairline: "rgba(0, 0, 0, 0.08)"
  hairline-strong: "rgba(0, 0, 0, 0.14)"
  spotlight-navy: "#0B1330"
  spotlight-void: "#05070C"
typography:
  display:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "clamp(38px, 5.6vw, 68px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "clamp(28px, 4vw, 42px)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.18em"
rounded:
  pill: "999px"
  container: "18px"
  panel: "28px"
  control: "12px"
  inset: "10px"
  hairline-cap: "4px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "20px"
  lg: "32px"
  section: "72px"
  section-wide: "140px"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.console-white}"
    rounded: "{rounded.pill}"
    padding: "15px 28px"
    typography: "15px / 700"
  button-primary-hover:
    backgroundColor: "{colors.signal-blue}"
    textColor: "{colors.console-white}"
    rounded: "{rounded.pill}"
  button-ghost:
    backgroundColor: "rgba(0, 0, 0, 0.02)"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.pill}"
    padding: "15px 28px"
  button-ghost-dark:
    backgroundColor: "rgba(255, 255, 255, 0.04)"
    textColor: "{colors.console-white}"
    rounded: "{rounded.pill}"
    padding: "15px 28px"
  card:
    backgroundColor: "{colors.console-white}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.container}"
    padding: "24px 26px 28px"
  chip:
    backgroundColor: "rgba(0, 0, 0, 0.03)"
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
    typography: "11.5px / 600"
  input:
    backgroundColor: "{colors.console-white}"
    textColor: "{colors.night-ink}"
    rounded: "{rounded.inset}"
    padding: "12px 14px"
  nav-link:
    textColor: "{colors.ink-dim}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
    typography: "14.5px / 600"
  nav-link-active:
    textColor: "{colors.signal-blue}"
    rounded: "{rounded.pill}"
    padding: "10px 16px"
  eyebrow:
    textColor: "{colors.readout-teal}"
    typography: "{typography.label}"
---

# Design System: Web Inventers

## Overview

**Creative North Star: "Mission Control"**

This is a white console, not a brochure. The page is lit rather than styled: surfaces stay near-white and recede, hairlines do the dividing, and the only loud thing on screen is a single electric blue that marks whatever you are supposed to act on. The hero's concentric orbital rings, its dot field, and the drifting particles are not ornament — they are the system's claim to being live instrumentation, running quietly behind the copy while you read.

The density is generous but not airy for its own sake. Sections breathe at 140px on desktop and compress to 72px on mobile; the container holds at 1400px, wider than the typical marketing column, because the layout wants to feel like a wide readout rather than a narrow pitch. Type is engineered: Space Grotesk's mechanical geometry for anything structural, Plus Jakarta Sans for anything you actually read, and Manrope ExtraBold reserved for the two headlines that open a chapter — the hero, and the Services section that carries the whole offer. Where it appears, the system is permitting itself to shout, so it stays rare on purpose.

Two panels deliberately break the white: the final CTA and the featured-work thumbnails run on a fixed near-black gradient regardless of the page theme. These are spotlights, not a second theme — the darkness exists so the blue inside them can burn. Everything else stays on the console.

**Key Characteristics:**
- White console surface; tonal grey panels and hairlines carry all separation
- One electric blue signal, used for action and brand presence, never decoration
- Deep teal exclusively for micro-labels and readout figures — never a headline
- Flat by default; the only shadows in the system are colored blue glows
- Orbital, continuous, scroll-driven motion — nothing bounces
- Pills act, rectangles hold

## Colors

A cool, near-monochrome console — white through blue-grey to near-black ink — carrying exactly two chromatic voices at opposite volumes.

### Primary
- **Signal Blue** (`#1B5AF0`): The action color and the brand's single loud voice. It fills every primary button (as a gradient down from **Signal Blue Lift**, `#3A68EE`, at the top-left into Signal Blue at the bottom-right — lit from above, and dark enough at its lightest point that white label text clears 4.5:1), owns the hero H1, marks the active navigation item and its 2px underline, drives link hover states, and forms the core of the hero orb. When something on this page is blue, it is either the thing to click or the thing to remember.

### Secondary
- **Readout Teal** (`#0E7490`): The instrument voice. It appears only on the 12px uppercase eyebrow labels above every section heading and on result figures inside work cards. It is deliberately darker and quieter than Signal Blue so the two never compete — teal reads as a readout, blue as a command.

### Neutral
- **Console White** (`#FFFFFF`): The page ground and the resting surface of cards. The default state of the system.
- **Instrument Grey** (`#F4F6FB`): The alternating section band — Stats, Why Us, and Process sit on it. Sections alternate white / grey to segment the page without a single rule line.
- **Panel Grey** (`#EEF1F7`): A deeper inset tone for nested surfaces sitting on Instrument Grey.
- **Night Ink** (`#0B1120`): All primary text. Near-black with a blue cast so it belongs to the same cool family as the accents, never a dead neutral black.
- **Ink Dim** (`#4A5568`): Body copy, descriptions, and inactive navigation. The default reading color for anything that is not a heading.
- **Ink Faint** (`#606B7D`): Metadata, captions, footer headings, disclaimers, and placeholder text. The quietest legible level — and *legible* is the binding word: it clears 4.5:1 on Console White, Instrument Grey, and Panel Grey alike, so no surface in the system can render it as decoration.
- **Hairline** (`rgba(0, 0, 0, 0.08)`) and **Hairline Strong** (`rgba(0, 0, 0, 0.14)`): Every border in the system. Alpha-based, so they hold against both white and grey bands without needing a second token.

### Spotlight (fixed, theme-independent)
- **Spotlight Navy** (`#0B1330`) into **Spotlight Void** (`#05070C`): The final CTA panel and the work-card artwork gradients. These are fixed dark regardless of the surrounding page and exist to make Signal Blue glow.

### Named Rules

**The One Voice Rule.** Signal Blue is the only color permitted to be loud. Readout Teal must never take a headline, a button, or a large fill; if a teal element starts competing with a blue one for attention, the teal is wrong.

**The Alpha Border Rule.** Borders are alpha-black (`rgba(0,0,0,0.08)` / `0.14`), never a solid grey hex. They must survive being moved from Console White onto Instrument Grey without editing.

**The Spotlight Exception Rule.** Dark surfaces exist in exactly two places: the final CTA panel and work-card artwork. Introducing a third dark region requires a reason, not a preference — the identity is the white console.

## Typography

**Display Font:** Manrope ExtraBold (800) — hero headline only
**Structural Font:** Space Grotesk (500/600/700) — section headings, stat figures, eyebrows
**Body Font:** Plus Jakarta Sans (400–800) — all reading copy, card titles, navigation, UI labels

**Character:** Space Grotesk supplies the mechanical, slightly-squared geometry that makes headings read as engineered rather than written; Plus Jakarta Sans is warm and humanist underneath it, so the reading experience never turns cold. Manrope ExtraBold appears once on the entire site and is denser and heavier than either — that is the point.

### Hierarchy
- **Display** (Manrope 800, `clamp(38px, 5.6vw, 68px)`, line-height 1.05, tracking -0.02em): The hero H1, set in Signal Blue, with its final word cycling through a blue-to-teal gradient; and the Services section heading at clamp(32px, 4.6vw, 52px) in Night Ink — same voice, section scale, no Signal Blue so the accent stays with actions. Two instances, both chapter openers. A third would make it ordinary.
- **Headline** (Space Grotesk 600, `clamp(28px, 4vw, 42px)`, line-height 1.1, tracking -0.02em): Every section H2. The CTA panel raises this to weight 700 at `clamp(30px, 5vw, 48px)` because it sits on dark.
- **Figure** (Space Grotesk 700, `clamp(32px, 4.4vw, 52px)`): Stat counters only. The trailing `+` drops to Readout Teal.
- **Title** (Plus Jakarta Sans 600, 19px): Card headings. Sub-headings inside cards step down to 15.5–16px at weight 700.
- **Body** (Plus Jakarta Sans 400, 17px, line-height 1.6): Section intros and reading copy, set in Ink Dim, capped near 640px (~70ch). Dense card copy steps down to 13.5px at line-height 1.55.
- **Label** (Space Grotesk 700, 12px, tracking 0.18em, uppercase): The Readout Teal eyebrow above every section heading. Footer column headings are the quieter variant — 13px, tracking 0.08em, Ink Faint.

### Named Rules

**The Three-Font Ceiling.** Three families, three jobs: Manrope shouts once, Space Grotesk structures, Plus Jakarta reads. A fourth family is a system failure, not a design choice.

**The Eyebrow Contract.** Every major section opens with the same three-part stack: teal uppercase eyebrow → Space Grotesk headline → Ink Dim intro paragraph. This rhythm is how the page stays scannable at speed; new sections inherit it rather than inventing an opening.

**The Tightening Rule.** Anything above 28px carries -0.02em tracking. Large type in this system is always slightly tighter than default — it is what makes headings read as machined.

## Layout

A single 1400px max-width container with 20px gutters on mobile and 32px from 640px up. Wider than a standard marketing column on purpose: the console should feel like a full readout, not a centered pitch.

The base section rhythm is 72px of vertical padding on mobile and 140px from 1024px up — a deliberately large jump that makes desktop feel composed and mobile feel efficient. Sections alternate Console White and Instrument Grey bands; that alternation, not a divider, is what separates them.

That base is a default, not a uniform. Vertical space is the page's cheapest hierarchy signal, so three sections deliberately break it:

- **Paired sections close ranks.** Why Us follows Services, and Testimonials follows Featured Work — each pair is one argument in two parts, so the second member opens at 56px / 104px instead of the full interval. The tighter gap is what tells the reader the two belong together.
- **The decision gets air.** The final CTA opens at 88px / 180px, the largest interval on the page. It is the only section whose job is a decision, and the pause before it is doing real work.

**The Cadence Rule.** Spacing is priority made visible. If every section is separated by the same interval, the page has told the reader that every section matters equally — which is never true. Before adding a section, decide whether it continues the previous argument (tighten) or begins a new one (full interval).

### Section header rhythm

Every section header is a three-part stack, and its two gaps are deliberately unequal: 10px from eyebrow to headline, 20px from headline to intro paragraph. The eyebrow and the headline are one unit; the paragraph is support hanging beneath it. Equal gaps there would flatten label, statement, and support into a single undifferentiated block.

Grids are asymmetric where there is a hierarchy and even where there is not. The hero splits `1.05fr / 0.95fr` (copy slightly favored over the orbital graphic); Why Us splits `0.85fr / 1.15fr` (intro yields to the reason grid); the footer runs `1.4fr / 1fr / 1fr / 1.3fr`. Card grids are even: one column, two at 640px, three at 1024px. The process strip runs two columns on mobile, three at 640px, and all six in a row at 1024px with a hairline gradient rail threading the step markers.

Breakpoints are Tailwind defaults — 640px (`sm`), 1024px (`lg`), 1280px (`xl`). Navigation is the exception: it holds its full horizontal link row until 1280px and collapses to a full-screen overlay below that, because seven links plus two buttons cannot compress honestly any earlier.

**The Alternating Band Rule.** Consecutive sections never share a background. If a new section lands next to Instrument Grey, it is Console White, and vice versa.

## Elevation & Depth

The system is flat. Cards, panels, inputs, and navigation sit directly on their background with a hairline border and no grey shadow anywhere. Depth is created by tonal layering — Console White on Instrument Grey on Panel Grey — and by hairline borders that darken slightly on hover.

The only shadows in the system are colored. Signal Blue glows sit under the primary button and around the hero orb, and they signify energy, not elevation. A grey drop shadow anywhere in this system is a defect.

### Shadow Vocabulary
- **Signal Lift** (`box-shadow: 0 12px 30px -8px rgba(27, 90, 240, 0.55)`): Resting glow beneath every primary button. The negative spread keeps it tight under the pill rather than spreading into a halo.
- **Signal Lift Raised** (`box-shadow: 0 18px 40px -8px rgba(27, 90, 240, 0.7)`): The same glow intensified on hover, paired with a 2px upward translate.
- **Orb Corona** (`box-shadow: 0 0 90px 10px rgba(27, 90, 240, 0.45), 0 0 200px 60px rgba(27, 90, 240, 0.18)`): The hero orb's two-stage atmospheric bloom. Reserved for the orb; not a reusable surface treatment.
- **Focus Ring** (`box-shadow: 0 0 0 6px rgba(14, 116, 144, 0.1)`): A soft teal halo used on process step markers at hover. The correct basis for interactive focus rings elsewhere.

### Named Rules

**The No Grey Shadow Rule.** Shadows in this system are blue and they mean "powered on." If depth is needed, reach for a tonal background step or a stronger hairline — never `rgba(0,0,0,·)` blur.

**The Flat-At-Rest Rule.** Every surface is flat until touched. Hover raises a card 4–6px and darkens its hairline; it does not introduce a shadow the resting state lacked.

## Shapes

Three radii, and the radius is the affordance.

- **Pill** (`999px`): Everything you click or that reports a state — buttons, navigation links, chips, tags, the stat `+` badges. Full-round means interactive.
- **Container** (`18px`): Everything that holds content — cards, work thumbnails, the stats grid. Soft-rectangular means it contains.
- **Panel** (`28px`): The CTA spotlight only. The largest surface on the page earns the largest curve.
- **Control** (`12px`) and **Inset** (`10px`): Square-ish small controls — the mobile menu toggle, social icon buttons, the newsletter input. These are deliberately tighter than pills so they read as utilities, not calls to action.

Borders are always 1px alpha-black hairlines. There are no heavy strokes, no double borders, and no dashed borders except the hero's slowest orbital ring, where dashing signals a different rotation rate.

Recurring geometry is circular: concentric rings, dot fields, orbital markers, the round orb, the 46px circular process markers, the 42px avatar circles. The circle is the system's signature form — instrumentation is round.

**The Pills-Act Rule.** If it is full-round, it does something. Never give a static container a pill radius, and never give a button an 18px corner.

## Components

### Buttons
- **Shape:** Full pill (`999px`), inline-flex with a 10px gap for trailing icons.
- **Sizing:** Default 15px/28px padding at 15px text; small variant 11px/20px at 14px. Both at weight 700.
- **Primary:** Signal Blue gradient (`to bottom-right`, `#3A68EE` → `#1B5AF0`), white text, Signal Lift glow. Hover raises 2px and intensifies the glow; active compresses to `scale(0.97)`.
- **Ghost (light):** `rgba(0,0,0,0.02)` fill, Night Ink text, Hairline Strong border. Hover deepens fill to `0.05` and border to `rgba(0,0,0,0.2)`, raising 2px.
- **Ghost (dark):** The same construction inverted for the CTA spotlight — `rgba(255,255,255,0.04)` fill, white text, `rgba(255,255,255,0.15)` border. Selected explicitly by surface, not inferred.
- **Motion:** 300ms on `cubic-bezier(.2, .7, .3, 1)`, transitioning transform, shadow, background, and border only.
- **Icons:** Trailing arrow shifts 3px right on hover via the parent's group state — the arrow moves, the button does not stretch.

### Cards / Containers
- **Corner Style:** 18px Container radius.
- **Background:** the band's own tone, always — Console White on white bands, Instrument Grey on grey ones. Cards are not a different colour from what they sit on; the hairline alone separates them. This is the flat system at its most literal, and it is why the border weight matters so much: it is the only thing drawing the box.
- **Border:** 1px Hairline, deepening to Hairline Strong or `Signal Blue / 40%` on hover depending on the card's role.
- **Shadow Strategy:** None. See Elevation — hover raises 4–6px on transform alone.
- **Internal Padding:** 24–26px horizontal, 26–28px vertical.

### Chips
- **Style:** Pill, `rgba(0,0,0,0.03)` fill, Hairline border, Ink Dim text at 11.5px weight 600. Used for service tags on work cards.
- **On artwork:** The dark variant — `rgba(0,0,0,0.6)` with a `rgba(255,255,255,0.16)` border, white text, and a backdrop blur — sits on the fixed-dark thumbnail gradients and is theme-independent by design.

### Inputs / Fields
- **Style:** Inset radius (10px), Console White fill, Hairline Strong border, 14px body type, Ink Faint placeholder.
- **Focus:** Must render a visible focus indicator — the teal Focus Ring (`0 0 0 6px rgba(14,116,144,0.1)`) plus a Signal Blue border is the system-correct treatment. *The implemented newsletter input currently sets `focus:outline-none` with no replacement; that is a defect against this rule, not the rule.*

### Navigation
- **Style:** Sticky header, transparent and 14px tall at rest, transitioning at 24px of scroll to an 8px-tall bar with an 82%-opacity white background, a backdrop blur, and a Hairline bottom border.
- **Links:** Plus Jakarta 14.5px weight 600, Ink Dim, pill hit area. Hover goes Signal Blue. Active adds a 2px Signal Blue underline inset 16px from each edge with a 4px cap radius.
- **Mobile:** Below 1280px, links collapse behind a 44px square Control-radius toggle into a full-screen opaque overlay with stacked 20px links on hairline dividers and both CTAs stacked full-width at the bottom. Body scroll locks while open.

### Signature: The Orbital Instrument
The hero's right column is the system's signature object and its clearest statement of identity: three concentric rings at 6%, 16%, and 26% inset, rotating at 40s, 56s (reversed), and 70s (dashed), each carrying a small glowing marker at a different clock position. At the center sits the orb — a radial gradient from a near-white highlight at 34%/30% through Signal Blue into near-black — wrapped in the Orb Corona and breathing on a 6s scale pulse between 1 and 1.045. Particles fall from beneath it on scroll-driven timelines.

Three different, slow, non-synchronized periods are what make it read as a live instrument rather than a loading spinner. Any reuse of this object must preserve the mismatched periods.

### Motion Grammar

**The One Journey Rule.** This page animates one thing: the orb. It resolves out of the logo, travels into the hero, breathes there, and on scroll expands until it floods the Trust & Results section in Signal Blue. That single continuous journey is the page's authored motion, and it is the reason nothing else competes for arrival. Sections do not animate in. There is no scroll-reveal system, and adding one back would break the journey by surrounding it with nine imitations of itself.

- **Content is visible at rest.** No section, heading, or paragraph starts hidden and waits for a scroll position to earn its opacity. This is both the motion thesis and a robustness property: nothing on this page can be made permanently invisible by a script that fails.
- **Focal journey:** the orb. Intro hand-off at ~2.5s; the scroll expansion is driven by real scroll progress through the section, with the growing circle and the section's blue fill derived from one shared value so they can never drift apart.
- **State transitions:** 300ms on `cubic-bezier(.2, .7, .3, 1)`.
- **Entrance and word transitions:** 600ms on `cubic-bezier(0.22, 1, 0.36, 1)` — a decelerating ease with no overshoot.
- **Ambient loops:** orbital rings 40s / 56s reversed / 70s dashed, orb pulse 6s, client marquee 14s linear. Atmosphere only — each one can be frozen at any instant without losing meaning, which is exactly what reduced motion does to them.
- **Loops yield.** Any loop longer than five seconds carries a real pause control (a button, not hover — hover is unreachable by keyboard and meaningless on touch), and suspends itself when scrolled offscreen or when the tab is hidden.
- **Reduced motion:** `prefers-reduced-motion: reduce` skips the intro entirely, freezes every ambient loop in place at full visual weight, stops the stat counters at their real figures, holds the orb at rest size, and drops the rotating hero word to its static first word. Reduced motion means stillness, never a blank or diminished page. Non-negotiable; any new motion inherits it.

## Do's and Don'ts

### Do:
- **Do** open every section with the eyebrow contract: Readout Teal 12px uppercase label (0.18em tracking) → Space Grotesk headline → Ink Dim 17px intro.
- **Do** alternate Console White and Instrument Grey between consecutive sections instead of drawing divider rules.
- **Do** use alpha-black hairlines (`rgba(0,0,0,0.08)` / `0.14`) for every border so it survives moving between bands.
- **Do** pick radius by affordance: pill for interactive, 18px for containers, 10–12px for small utility controls.
- **Do** keep the container at 1400px with 20px / 32px gutters, and the section rhythm at 72px / 140px.
- **Do** give every interactive element a visible `:focus-visible` treatment — the teal Focus Ring plus a Signal Blue border.
- **Do** honor `prefers-reduced-motion` on anything animated, in the same pass that adds the animation.
- **Do** declare new colors as `@theme` tokens in `globals.css` rather than inlining hex values in components.

### Don't:
- **Don't** add a grey drop shadow. The only shadows here are Signal Blue glows that mean "powered on."
- **Don't** let Readout Teal take a headline, a button, or a large fill — it is a readout voice, capped at micro-labels and figures.
- **Don't** introduce a fourth font family. Three families, three jobs.
- **Don't** add a third dark region. The CTA panel and work-card artwork are the only sanctioned exceptions to the white console.
- **Don't** reach for bounce, spring, or overshoot easing. Motion here is orbital, continuous, and decelerating.
- **Don't** drift toward the dark gradient-mesh SaaS template, stock office photography, glassmorphism, oversized emoji, or purple-pink gradient washes — all four are confirmed anti-references.
- **Don't** pursue brutalism or maximalism. This system's confidence comes from precision, not from noise or heavy black rules.
- **Don't** strip a focus outline without replacing it.
- **Don't** hardcode literal hex values that shadow an existing token. Cyan `#22D3EE` and violet `#8B5CF6` were removed from the hero markers, process hover ring, and work-card artwork in favor of Readout Teal and Signal Blue Lift; reintroducing either is drift, and cyan-on-dark in particular is the single most recognizable generated-UI tell.
- **Don't** let any text token fall below 4.5:1 on Console White, Instrument Grey, or Panel Grey. The ink ladder is deliberately three steps deep — Night Ink 18.8:1, Ink Dim 7.5:1, Ink Faint 5.4:1 — and the quietest step is still fully readable.
