"use client";

import { useId, useRef, useState } from "react";
import { PRIMARY_SURFACE, TRANSITION } from "./Button";
import { ArrowRightIcon } from "./icons";
import { SERVICES } from "./serviceData";
import SelectField from "./SelectField";

const COUNTRIES = [
  { name: "Pakistan", code: "+92" },
  { name: "United States", code: "+1" },
  { name: "United Kingdom", code: "+44" },
  { name: "Canada", code: "+1" },
  { name: "United Arab Emirates", code: "+971" },
  { name: "Australia", code: "+61" },
  { name: "Germany", code: "+49" },
  { name: "France", code: "+33" },
];

const SOURCES = [
  "Google or search",
  "Social media",
  "Referral or word of mouth",
  "Your portfolio",
  "Other",
];

type FieldErrors = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
};

/**
 * Presentation-complete contact form matching the reference layout.
 *
 * Validation, error, and field states are real and run entirely in the
 * browser. Submission is deliberately not wired: there is no endpoint yet, and
 * a fake "Message sent!" would tell a visitor something untrue. When a
 * provider is chosen, replace the body of `handleSubmit`'s success branch —
 * everything around it is already in place.
 */
export default function ContactForm() {
  const id = useId();
  const fileRef = useRef<HTMLInputElement>(null);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    service: "",
    source: "",
    message: "",
  });
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});

  const errId = `${id}-error`;

  function setField(field: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  const selectedCountry = COUNTRIES.find((c) => c.name === values.country);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const next: FieldErrors = {};
    const email = values.email.trim();
    const phone = values.phone.trim();
    const message = values.message.trim();

    if (values.firstName.trim() === "") {
      next.firstName = "Enter your first name.";
    }
    if (values.lastName.trim() === "") {
      next.lastName = "Enter your last name.";
    }
    // Deliberately permissive: one @, something either side, a dot in the
    // domain. Anything stricter starts rejecting valid real-world addresses.
    if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email =
        email === ""
          ? "Enter your email address so we can reply."
          : "That doesn't look like an email address — check for a typo.";
    }
    if (!selectedCountry) {
      next.phone = "Select your country code.";
    } else if (phone === "" || phone.replace(/\D/g, "").length < 7) {
      next.phone = "Enter a valid phone number.";
    }
    if (values.service === "") {
      next.service = "Pick the service you're interested in.";
    }
    if (message === "") {
      next.message = "Tell us a bit about your project.";
    } else if (message.length < 10) {
      next.message = "A few more details will help us prepare — 10 characters minimum.";
    }

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // No endpoint yet. See the note above this component.
  }

  /* Field surface from the reference: soft blue-grey fill, hairline border and
     a small corner radius — square-ish rounded rectangles, not capsules. */
  const fieldBase =
    "w-full rounded-[10px] border bg-bg-alt px-4 py-3.5 font-body text-[15px] transition-colors placeholder:text-ink-faint";
  const border = (error?: string) =>
    error ? "border-[#e5484d]" : "border-border-strong";
  const labelBase = "mb-2 block text-[14.5px] font-medium text-ink";
  const req = <span className="text-[#e5484d]">*</span>;
  const fieldError = (message?: string) =>
    message ? (
      <p role="alert" className="mt-2 text-[12.5px] text-[#e5484d]">
        {message}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-first`} className={labelBase}>
            First Name{req}
          </label>
          <input
            id={`${id}-first`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            maxLength={100}
            value={values.firstName}
            onChange={(e) => setField("firstName", e.target.value)}
            aria-invalid={errors.firstName ? true : undefined}
            className={`${fieldBase} text-ink ${border(errors.firstName)}`}
          />
          {fieldError(errors.firstName)}
        </div>

        <div>
          <label htmlFor={`${id}-last`} className={labelBase}>
            Last Name{req}
          </label>
          <input
            id={`${id}-last`}
            name="lastName"
            type="text"
            autoComplete="family-name"
            maxLength={100}
            value={values.lastName}
            onChange={(e) => setField("lastName", e.target.value)}
            aria-invalid={errors.lastName ? true : undefined}
            className={`${fieldBase} text-ink ${border(errors.lastName)}`}
          />
          {fieldError(errors.lastName)}
        </div>

        <div>
          <label htmlFor={`${id}-email`} className={labelBase}>
            Email{req}
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            placeholder="you@company.com"
            value={values.email}
            onChange={(e) => setField("email", e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            className={`${fieldBase} text-ink ${border(errors.email)}`}
          />
          {fieldError(errors.email)}
        </div>

        <div>
          <label htmlFor={`${id}-country`} className={labelBase}>
            Phone Number{req}
          </label>
          <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3">
            <SelectField
              id={`${id}-country`}
              name="country"
              ariaLabel="Country code"
              placeholder="Country"
              value={values.country}
              onChange={(v) => setField("country", v)}
              options={COUNTRIES.map((c) => ({ value: c.name, label: c.name }))}
              invalid={Boolean(errors.phone)}
              className={`${fieldBase} ${border(errors.phone)}`}
            />
            <input
              id={`${id}-phone`}
              name="phone"
              type="tel"
              autoComplete="tel-national"
              inputMode="tel"
              maxLength={20}
              placeholder={selectedCountry ? selectedCountry.code : "Phone number"}
              value={values.phone}
              onChange={(e) => setField("phone", e.target.value)}
              aria-invalid={errors.phone ? true : undefined}
              className={`${fieldBase} text-ink ${border(errors.phone)}`}
            />
          </div>
          {fieldError(errors.phone)}
        </div>

        <div>
          <label htmlFor={`${id}-service`} className={labelBase}>
            What service are you looking for?{req}
          </label>
          <SelectField
            id={`${id}-service`}
            name="service"
            placeholder="Please Select"
            value={values.service}
            onChange={(v) => setField("service", v)}
            options={SERVICES.map((s) => ({ value: s.title, label: s.title }))}
            invalid={Boolean(errors.service)}
            className={`${fieldBase} ${border(errors.service)}`}
          />
          {fieldError(errors.service)}
        </div>

        <div>
          <label htmlFor={`${id}-source`} className={labelBase}>
            Where did you hear about us?
          </label>
          <SelectField
            id={`${id}-source`}
            name="source"
            placeholder="Please Select"
            value={values.source}
            onChange={(v) => setField("source", v)}
            options={SOURCES.map((s) => ({ value: s, label: s }))}
            className={`${fieldBase} ${border()}`}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor={`${id}-message`} className={labelBase}>
            Tell us more about your project:{req}
          </label>
          <p className="-mt-1 mb-2.5 max-w-[720px] text-[13px] leading-[1.55] text-ink-faint">
            Share a bit about your company/organization, what you&apos;re
            looking to achieve, and any helpful details such as your timeline,
            budget range, current website or brand, and relevant links.
          </p>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            maxLength={2000}
            value={values.message}
            onChange={(e) => setField("message", e.target.value)}
            aria-invalid={errors.message ? true : undefined}
            className={`w-full resize-y rounded-[10px] border bg-bg-alt px-4 py-3.5 font-body text-[15px] text-ink transition-colors placeholder:text-ink-faint ${border(errors.message)}`}
          />
          {fieldError(errors.message)}
        </div>

        <div className="sm:col-span-2">
          <span className="mb-2 block text-[14.5px] font-medium text-ink">
            File upload
          </span>
          <div className="flex flex-wrap items-center gap-3">
            <input
              ref={fileRef}
              type="file"
              name="file"
              className="sr-only"
              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className={`rounded-[8px] border border-border-strong bg-surface px-5 py-2.5 text-sm font-bold text-ink transition-colors hover:bg-black/[0.04] ${TRANSITION}`}
            >
              Choose File
            </button>
            <span className="text-[14px] text-ink-faint" aria-live="polite">
              {fileName || "No file chosen"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className={`inline-flex items-center gap-2.5 rounded-full px-7 py-[15px] text-[15px] font-bold whitespace-nowrap ${PRIMARY_SURFACE} ${TRANSITION} active:scale-[0.97]`}
        >
          Send Message
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.75" />
        </button>
        <p id={errId} className="max-w-[340px] text-[13px] leading-[1.5] text-ink-faint">
          We&apos;ll only use your details to reply — nothing else.
        </p>
      </div>
    </form>
  );
}
