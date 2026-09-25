import Link from "next/link";
import { PRIMARY_SURFACE, TRANSITION } from "./Button";
import type { Package } from "./pricingData";

/** Renders `**bold**` runs from the package document as <strong>. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
        part.startsWith("**") ? (
          <strong key={i} className="font-semibold text-ink">
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="relative pl-4 before:absolute before:top-[0.62em] before:left-0 before:size-1.5 before:rounded-full before:bg-ink-faint">
      {children}
    </li>
  );
}

/**
 * One pricing package, laid out after the reference: name, big price with the
 * struck-through original, a scrolling feature list, the contact row, and a
 * Start Project button straddling the card's bottom edge.
 */
export default function PackageCard({
  pkg,
  onStartProject,
}: {
  pkg: Package;
  /** Opens the consultation popup for this package. Without it, the button
   *  falls back to a plain link to the Contact page. */
  onStartProject?: () => void;
}) {
  const buttonClass = `inline-flex cursor-pointer items-center rounded-full px-7 py-3 text-[14px] font-bold whitespace-nowrap ${PRIMARY_SURFACE} ${TRANSITION}`;

  return (
    <article className="relative flex h-full flex-col rounded-[18px] border border-border-strong bg-surface px-5 pt-6 pb-10 transition-[border-color,box-shadow] duration-300 hover:border-accent hover:shadow-[0_24px_50px_-30px_rgba(27,90,240,0.45)] sm:px-6">
      {/* The ribbon is clipped to the card's corner by its own wrapper, so the
          card itself can stay unclipped for the button hanging off its edge. */}
      {pkg.bestSeller && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[18px]">
          <span className="absolute top-[22px] right-[-44px] w-[170px] rotate-45 bg-accent py-1 text-center text-[10.5px] font-bold tracking-[0.14em] text-white uppercase shadow-[0_6px_16px_-6px_rgba(27,90,240,0.6)]">
            Best Seller
          </span>
        </div>
      )}

      <h3 className="max-w-[200px] font-display text-[clamp(16px,1.25vw,18px)] leading-[1.2] font-bold tracking-[-0.01em] text-ink">
        {pkg.name}
      </h3>
      {pkg.bestSeller && <span className="sr-only">Best seller</span>}

      {/* Price: "$" set high, the figure large, the original price struck
          through beside it above "Only" (or the billing period) — as in the
          reference. Unpriced packages show "Custom Quote" at the same height,
          so their cards line up with the priced ones. */}
      <div className="mt-4 mb-5 flex min-h-[46px] items-center gap-2.5">
        {pkg.price !== undefined ? (
          <>
            <div className="flex items-start text-ink">
              <span className="mt-1 mr-0.5 font-display text-[18px] font-bold">$</span>
              <span className="font-display text-[clamp(36px,3.1vw,46px)] leading-none font-extrabold tracking-[-0.03em]">
                {pkg.price.toLocaleString("en-US")}
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              {pkg.was !== undefined && (
                <span className="font-display text-[15px] font-bold text-ink-faint line-through">
                  <span className="sr-only">was </span>${pkg.was.toLocaleString("en-US")}
                </span>
              )}
              <span className="text-[13.5px] font-semibold text-ink-dim">
                {pkg.period ?? "Only"}
              </span>
            </div>
          </>
        ) : (
          <span className="font-display text-[clamp(24px,2vw,30px)] leading-none font-extrabold tracking-[-0.02em] text-ink">
            Custom Quote
          </span>
        )}
      </div>

      {/* Feature list: fixed height with its own scrollbar (the "scroller" in
          the reference), so every card keeps the same height however long
          its list runs. Focusable so keyboard users can scroll it too. */}
      <div
        tabIndex={0}
        role="region"
        aria-label={`${pkg.name} features`}
        className="h-[196px] overflow-y-auto overscroll-contain pr-3 [scrollbar-color:var(--color-accent)_var(--color-border)] [scrollbar-width:thin]"
      >
        <ul className="flex flex-col gap-2 text-[13.5px] leading-[1.45] text-ink-dim">
          {pkg.features.map((f) => (
            <Bullet key={f}>
              <Rich text={f} />
            </Bullet>
          ))}
        </ul>

        {pkg.valueAdded && pkg.valueAdded.length > 0 && (
          <>
            <p className="mt-4 mb-2 text-[11px] font-bold tracking-[0.12em] text-ink uppercase">
              {pkg.valueAddedLabel}
            </p>
            <ul className="flex flex-col gap-2 text-[13.5px] leading-[1.45] text-ink-dim">
              {pkg.valueAdded.map((f) => (
                <Bullet key={f}>
                  <Rich text={f} />
                </Bullet>
              ))}
            </ul>
          </>
        )}

        {pkg.note && (
          <p className="mt-4 text-[12px] font-bold tracking-[0.06em] text-accent">
            {pkg.note}
          </p>
        )}
      </div>

      {/* Contact row: phone, and email in place of the reference's live chat
          (the site has none). */}
      <div className="mt-5 grid grid-cols-2 border-t border-border pt-4">
        <div className="pr-3">
          <p className="text-[13px] font-bold text-ink">Speak with us</p>
          <a
            href="tel:+18324021715"
            className="mt-0.5 inline-block text-[13.5px] font-semibold text-ink-dim transition-colors hover:text-accent"
          >
            (832) 402-1715
          </a>
        </div>
        <div className="border-l border-border pl-3">
          <p className="text-[13px] font-bold text-ink">Want to discuss?</p>
          <a
            href="mailto:info@webinventers.com"
            className="mt-0.5 inline-block text-[13.5px] font-semibold text-ink-dim transition-colors hover:text-accent"
          >
            Email Us
          </a>
        </div>
      </div>

      {/* Straddles the bottom edge: half on the card, half below it. The
          offset lives on this wrapper because the button's own hover lift is
          also a translate, and would otherwise cancel it. */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
        {onStartProject ? (
          <button
            type="button"
            onClick={onStartProject}
            aria-haspopup="dialog"
            className={buttonClass}
          >
            Start Project
            <span className="sr-only"> — {pkg.name}</span>
          </button>
        ) : (
          <Link href="/contact" className={buttonClass}>
            Start Project
          </Link>
        )}
      </div>
    </article>
  );
}
