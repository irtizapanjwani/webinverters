"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import intlTelInput, { type Iso2 } from "intl-tel-input";
import "intl-tel-input/styles";
import { PRIMARY_SURFACE, TRANSITION } from "./Button";

const EASE = [0.22, 1, 0.36, 1] as const;

/** False on the server and during hydration, true once mounted — so the
 *  portal to <body> is only ever created in the browser. */
const noop = () => () => {};
function useIsClient() {
  return useSyncExternalStore(noop, () => true, () => false);
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([type="hidden"]), textarea, [tabindex]:not([tabindex="-1"])';

type Errors = { name?: string; email?: string; phone?: string };

/* ---------- Icons ----------
   Font Awesome Free 7.3.1 by @fontawesome — https://fontawesome.com
   License: https://fontawesome.com/license/free (icons: CC BY 4.0).
   The same set the reference uses: solid user, regular envelope, regular
   paper plane, and the solid xmark for close. */
const FA = {
  user: {
    box: "0 0 448 512",
    d: "M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z",
  },
  envelope: {
    box: "0 0 512 512",
    d: "M61.4 64C27.5 64 0 91.5 0 125.4 0 126.3 0 127.1 .1 128L0 128 0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-256-.1 0c0-.9 .1-1.7 .1-2.6 0-33.9-27.5-61.4-61.4-61.4L61.4 64zM464 192.3L464 384c0 8.8-7.2 16-16 16L64 400c-8.8 0-16-7.2-16-16l0-191.7 154.8 117.4c31.4 23.9 74.9 23.9 106.4 0L464 192.3zM48 125.4C48 118 54 112 61.4 112l389.2 0c7.4 0 13.4 6 13.4 13.4 0 4.2-2 8.2-5.3 10.7L280.2 271.5c-14.3 10.8-34.1 10.8-48.4 0L53.3 136.1c-3.3-2.5-5.3-6.5-5.3-10.7z",
  },
  paperPlane: {
    box: "0 0 576 512",
    d: "M290.5 287.7L491.4 86.9 359 456.3 290.5 287.7zM457.4 53L256.6 253.8 88 185.3 457.4 53zM38.1 216.8l205.8 83.6 83.6 205.8c5.3 13.1 18.1 21.7 32.3 21.7 14.7 0 27.8-9.2 32.8-23.1L570.6 8c3.5-9.8 1-20.6-6.3-28s-18.2-9.8-28-6.3L39.4 151.7c-13.9 5-23.1 18.1-23.1 32.8 0 14.2 8.6 27 21.7 32.3z",
  },
  xmark: {
    box: "0 0 384 512",
    d: "M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z",
  },
};

function Icon({ name, className }: { name: keyof typeof FA; className: string }) {
  return (
    <svg viewBox={FA[name].box} fill="currentColor" aria-hidden="true" className={className}>
      <path d={FA[name].d} />
    </svg>
  );
}

/** Leading icon inside a field, vertically centred on a single-line input. */
const fieldIcon = "pointer-events-none absolute top-1/2 left-4 size-[15px] -translate-y-1/2 text-accent";

/**
 * "Get FREE Consultancy Now" popup, opened from a pricing card's Start Project
 * button with that package noted.
 *
 * A real modal dialog: rendered into <body> (so no transformed ancestor can
 * trap its fixed positioning), focus moves in on open and is held inside,
 * Escape or the backdrop closes it, focus returns to the button that opened
 * it, and the page behind stops scrolling.
 *
 * Validation is real. Submission is not wired — like the Contact page form,
 * there is no endpoint yet, and a fake "Sent!" would mislead a visitor. Hook
 * the provider in at the marked line in handleSubmit.
 */
export default function ConsultationModal({
  packageName,
  onClose,
}: {
  /** The package whose button was clicked; null keeps the dialog closed. */
  packageName: string | null;
  onClose: () => void;
}) {
  const open = packageName !== null;
  const id = useId();
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({
    name: "",
    email: "",
    country: "us",
    dialCode: "1",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const isClient = useIsClient();

  // Closing clears stale error messages (typed values are kept), so the next
  // time the dialog opens it starts clean rather than already showing red.
  const close = useCallback(() => {
    setErrors({});
    onClose();
  }, [onClose]);

  const setField = (field: keyof typeof values, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (field in errors) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  useEffect(() => {
    if (!open) return;
    const opener = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Skip the hidden package field, which cannot take focus.
    panel?.querySelector<HTMLElement>('input:not([type="hidden"])')?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // While the country list is open, Escape belongs to it (it closes
        // itself); don't also close the dialog underneath. Only the open list
        // counts — Escape from the phone field itself still closes the dialog.
        const t = e.target as HTMLElement | null;
        const listOpen =
          t?.closest(".iti--detached-country-selector, .iti--fullscreen-popup") ||
          document.querySelector('.iti__selected-country[aria-expanded="true"]');
        if (listOpen) return;
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    // Capture phase: intl-tel-input stops some key events from bubbling, and
    // capturing also lets us see the list still open when Escape arrives.
    document.addEventListener("keydown", onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKeyDown, true);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [open, close]);

  /* Country picker (intl-tel-input): the full country list with flags, the
     dial code shown beside the flag, US and UK pinned at the top. The list
     is as wide as its longest country name rather than the narrow field, and
     is mounted on <body> so the dialog's scrolling card cannot clip it. On
     small screens it opens as a full-screen picker instead ("AUTO"). */
  // Last chosen country, so reopening the dialog restores it. Written from the
  // picker's change event (not during render), read when the picker mounts.
  const countryRef = useRef<Iso2>("us");
  useEffect(() => {
    const input = phoneRef.current;
    if (!open || !input) return;
    const iti = intlTelInput(input, {
      initialCountry: countryRef.current,
      countryOrder: ["us", "gb"],
      separateDialCode: true,
      countrySearch: true,
      countrySelectorMode: "AUTO",
      dropdownParent: document.body,
      matchDropdownWidth: false,
      containerClass: "w-full",
    });
    const onCountryChange = () => {
      const country = iti.getSelectedCountry();
      if (!country) return;
      countryRef.current = country.iso2;
      setValues((v) => ({ ...v, country: country.iso2, dialCode: country.dialCode }));
    };
    // Native listener: the library writes to input.value itself, which React's
    // onChange does not see, so the number is tracked from the DOM instead.
    const onInput = () => setValues((v) => ({ ...v, phone: input.value }));
    input.addEventListener("countrychange", onCountryChange);
    input.addEventListener("input", onInput);
    return () => {
      input.removeEventListener("countrychange", onCountryChange);
      input.removeEventListener("input", onInput);
      iti.destroy();
    };
  }, [open]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {};
    if (!values.name.trim()) next.name = "Enter your full name.";
    const email = values.email.trim();
    if (!email) next.email = "Enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "That doesn't look like an email address.";
    // Read from the field itself — the value React holds can lag the library.
    const phone = phoneRef.current?.value ?? values.phone;
    if (phone.replace(/\D/g, "").length < 7) next.phone = "Enter a valid phone number.";
    setErrors(next);
    if (Object.keys(next).length) return;
    // No endpoint yet — send { ...values, packageName } to the provider here.
    // Full international number: `+${values.dialCode} ${values.phone}`.
  }

  /* White fields with a hairline border and a small radius, as in the
     reference. Single-line fields are 48px tall. */
  const box = (err?: string) =>
    `rounded-[8px] border bg-white transition-colors ${err ? "border-[#e5484d]" : "border-border-strong"}`;
  const input =
    "h-12 w-full bg-transparent text-[15px] text-ink placeholder:text-ink-faint";
  const errorText = (msg?: string, fieldId?: string) =>
    msg ? (
      <p id={fieldId} role="alert" className="mt-1.5 text-[12.5px] text-[#e5484d]">
        {msg}
      </p>
    ) : null;

  if (!isClient) return null;

  // AnimatePresence lives inside the portal: it can only animate real
  // elements, and a portal is not one, so wrapping the portal would drop it.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="consultation"
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25 }}
        >
          {/* Backdrop — clicking it closes the dialog */}
          <div aria-hidden="true" className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={close} />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${id}-title`}
            aria-describedby={`${id}-desc`}
            className="relative w-full max-w-[460px]"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE }}
          >
            {/* Sits on the corner, outside the scrolling card so it is never
                clipped or scrolled away. */}
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute -top-3.5 -right-3.5 z-10 flex size-12 cursor-pointer items-center justify-center rounded-full border-2 border-accent bg-white text-accent shadow-[0_8px_20px_-8px_rgba(11,17,32,0.35)] transition-colors hover:bg-accent hover:text-white"
            >
              <Icon name="xmark" className="size-[18px]" />
            </button>

            <div className="max-h-[calc(100dvh-48px)] overflow-y-auto rounded-[28px] bg-white px-6 py-8 shadow-[0_40px_80px_-24px_rgba(11,17,32,0.45)] sm:px-8">
              <h2
                id={`${id}-title`}
                className="border-l-[5px] border-accent pl-3.5 font-display text-[clamp(19px,2vw,23px)] leading-[1.2] font-extrabold tracking-[-0.02em] text-ink"
              >
                Get FREE Consultancy Now
              </h2>

              <p id={`${id}-desc`} className="mt-3 text-[14px] leading-[1.55] text-ink/80">
                Web Inventers serves businesses of all shapes and sizes. Fill out
                the form to get in touch with our website design consultant
                today.
              </p>
              <p className="mt-1.5 text-[13px] text-ink-dim">
                Selected package: <span className="font-semibold text-ink">{packageName}</span>
              </p>

              <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-3.5">
                <input type="hidden" name="package" value={packageName ?? ""} />

                <div>
                  <div className={`relative ${box(errors.name)}`}>
                    <Icon name="user" className={fieldIcon} />
                    <input
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Full Name *"
                      aria-label="Full name"
                      aria-required="true"
                      aria-invalid={errors.name ? true : undefined}
                      aria-describedby={errors.name ? `${id}-name-err` : undefined}
                      value={values.name}
                      onChange={(e) => setField("name", e.target.value)}
                      className={`${input} rounded-[8px] pr-4 pl-11`}
                    />
                  </div>
                  {errorText(errors.name, `${id}-name-err`)}
                </div>

                {/* The phone box carries the code picker too, so it gets a little more
                    of the row than email. */}
                <div className="grid gap-3.5 sm:grid-cols-[1fr_1.12fr] sm:gap-3">
                  <div>
                    <div className={`relative ${box(errors.email)}`}>
                      <Icon name="envelope" className={fieldIcon} />
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        inputMode="email"
                        placeholder="Email Address *"
                        aria-label="Email address"
                        aria-required="true"
                        aria-invalid={errors.email ? true : undefined}
                        aria-describedby={errors.email ? `${id}-email-err` : undefined}
                        value={values.email}
                        onChange={(e) => setField("email", e.target.value)}
                        className={`${input} rounded-[8px] pr-3 pl-11`}
                      />
                    </div>
                    {errorText(errors.email, `${id}-email-err`)}
                  </div>

                  {/* The flag and dial code sit inside the field, as in the
                      reference; the library sets the left padding for them.
                      Uncontrolled because the library writes to the input
                      itself — React keeps a copy via onChange. */}
                  <div>
                    <div className={`focus-within:border-accent ${box(errors.phone)}`}>
                      <input
                        ref={phoneRef}
                        name="phone"
                        type="tel"
                        autoComplete="tel-national"
                        inputMode="tel"
                        placeholder="Phone No. *"
                        aria-label="Phone number"
                        aria-required="true"
                        aria-invalid={errors.phone ? true : undefined}
                        aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
                        defaultValue={values.phone}
                        onChange={(e) => setField("phone", e.target.value)}
                        className={`${input} rounded-[8px] pr-3 focus-visible:outline-none`}
                      />
                    </div>
                    {errorText(errors.phone, `${id}-phone-err`)}
                  </div>
                </div>

                <div className={`relative ${box()}`}>
                  <Icon name="paperPlane" className="pointer-events-none absolute top-[16px] left-4 size-[15px] text-accent" />
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="To help us understand better, enter a brief description about your project."
                    aria-label="Project description"
                    value={values.message}
                    onChange={(e) => setField("message", e.target.value)}
                    className="block w-full resize-y rounded-[8px] bg-transparent py-3 pr-4 pl-11 text-[15px] leading-[1.55] text-ink placeholder:text-ink-faint"
                  />
                </div>

                <div className="mt-2 flex justify-center">
                  <button
                    type="submit"
                    className={`inline-flex min-w-[210px] cursor-pointer items-center justify-center rounded-[8px] px-10 py-3 text-[15px] font-bold tracking-[0.06em] uppercase ${PRIMARY_SURFACE} ${TRANSITION}`}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
