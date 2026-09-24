import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Web Inventers",
  description:
    "How Web Inventers collects, uses and protects the information of its customers and website visitors.",
};

/** Transcribed verbatim from
 *  `public/Web Inventers Privacy Policy, Refund Policy and Terms & Conditions.pdf`,
 *  section 1. Section numbering, order and wording follow the PDF exactly —
 *  only the presentation is the site's. Edit the PDF and this file together so
 *  the two never disagree. */
const LAST_UPDATED = "2026";

const INTRO =
  "Web Inventers values the privacy of its customers and website visitors. We do not support spam or any unlawful activities. Our practices follow applicable privacy standards to help maintain a safe and compliant online environment. By continuing to use our website, you agree to the terms outlined in this policy.";

const SECTIONS: LegalSection[] = [
  {
    title: "Information We Collect",
    blocks: [
      {
        kind: "p",
        text: "When you visit our website, we may automatically collect non-personal information such as your IP address, browser type, language preferences, access times, and information about how you interact with our website.",
      },
      {
        kind: "p",
        text: "During registration, signup, inquiry, or service processes, we may collect personal information including:",
      },
      {
        kind: "list",
        items: [
          "Full name",
          "Email address",
          "Phone number",
          "Residential or business address",
          "Project or service requirements",
          "Billing and payment-related information, where applicable",
        ],
      },
    ],
  },
  {
    title: "Use of Information",
    blocks: [
      { kind: "p", text: "We may use the information collected to:" },
      {
        kind: "list",
        items: [
          "Provide and manage our services",
          "Respond to inquiries and requests",
          "Communicate regarding projects and services",
          "Send important service updates and notifications",
          "Send promotional offers or blog content where permitted",
          "Maintain internal business and service records",
          "Improve our website, services, and customer experience",
        ],
      },
      {
        kind: "p",
        text: "We do not intentionally send spam. Where applicable, you may opt out of promotional communications.",
      },
    ],
  },
  {
    title: "Data Security",
    blocks: [
      {
        kind: "p",
        text: "Web Inventers takes reasonable measures to protect personal information against unauthorized access, misuse, alteration, disclosure, or destruction.",
      },
      {
        kind: "p",
        text: "Our website may use encryption and other security technologies. However, no internet-based system can be guaranteed to be completely secure.",
      },
    ],
  },
  {
    title: "Children's Privacy",
    blocks: [
      {
        kind: "p",
        text: "Our services are not intended for individuals under the age of 13. If you are under 13, please do not use this website or submit personal information through it.",
      },
    ],
  },
  {
    title: "External Links",
    blocks: [
      {
        kind: "p",
        text: "Our website may contain links to third-party websites. These websites operate under their own privacy policies and terms. Web Inventers is not responsible for the content, security, or privacy practices of third-party websites.",
      },
    ],
  },
  {
    title: "Testimonials",
    blocks: [
      {
        kind: "p",
        text: "Web Inventers may display testimonials from clients on its website or marketing materials.",
      },
      {
        kind: "p",
        text: "If you voluntarily submit a testimonial, it may be published along with your name and other information you have provided. You may contact us to request modification or removal of your testimonial.",
      },
    ],
  },
  {
    title: "Legal Disclosure",
    blocks: [
      {
        kind: "p",
        text: "Web Inventers may disclose personal information where required by applicable law, legal process, court order, or valid request from a government or law-enforcement authority.",
      },
    ],
  },
  {
    title: "Policy Updates",
    blocks: [
      {
        kind: "p",
        text: "Web Inventers may update this Privacy Policy periodically. Any material changes may be communicated through our website, email, or other appropriate communication channels.",
      },
    ],
  },
  {
    title: "Contact Us",
    blocks: [
      {
        kind: "p",
        text: "If you have questions, concerns, suggestions, or requests regarding this Privacy Policy, please contact us:",
      },
      {
        kind: "contact",
        name: "Web Inventers",
        email: "info@webinventers.com",
        phone: "(832) 402-1715",
        phoneHref: "+18324021715",
      },
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated={LAST_UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
