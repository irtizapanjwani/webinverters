import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy — Web Inventers",
  description:
    "The circumstances under which a Client may request and receive a refund from Web Inventers.",
};

/** Transcribed verbatim from
 *  `public/Web Inventers Privacy Policy, Refund Policy and Terms & Conditions.pdf`,
 *  section 2. Article numbering, sub-numbering (e.g. 2.1, 3.1.1), order and
 *  wording follow the PDF exactly — only the presentation is the site's.
 *  Sub-numbers are left embedded in each paragraph's text rather than
 *  regenerated, since the source's numbering is three levels deep (Article →
 *  Section → item) and a single auto-incrementing prefix cannot reproduce
 *  that. Edit the PDF and this file together so the two never disagree. */
const LAST_UPDATED = "September 2026";

const INTRO =
  "This Refund Policy governs the circumstances under which a client (“Client”) may request and receive a refund from Web Inventers (“Company”). By purchasing any service, the Client acknowledges and agrees to the terms outlined herein.";

const SECTIONS: LegalSection[] = [
  {
    title: "Purpose and Scope",
    blocks: [
      {
        kind: "p",
        text: "1.1. This Refund Policy governs the circumstances under which a Client may request and receive a refund from Web Inventers.",
      },
      {
        kind: "p",
        text: "1.2. By purchasing any service, the Client acknowledges and agrees to the terms outlined herein.",
      },
    ],
  },
  {
    title: "General Refund Eligibility",
    blocks: [
      {
        kind: "p",
        text: "2.1. Web Inventers aims to ensure Client satisfaction with the initial service deliverables.",
      },
      {
        kind: "p",
        text: "2.2. If the Client is not satisfied with the initial concepts or initial delivery, the Client may request a refund of the initial payment, subject to the deductions described below.",
      },
      {
        kind: "p",
        text: "2.3. A service and processing fee of USD $50.00 shall be deducted from any eligible refund.",
      },
      {
        kind: "p",
        text: "2.4. Refund eligibility ends once any approval has been granted in writing by email or SMS.",
      },
      {
        kind: "p",
        text: "2.5. If payment was made by credit card, the refund shall be issued to the same credit card account.",
      },
      {
        kind: "p",
        text: "2.6. Refunds are typically processed within fourteen (14) to twenty-one (21) business days from approval of the refund request.",
      },
    ],
  },
  {
    title: "Conditions Resulting in Refund Ineligibility",
    blocks: [
      {
        kind: "p",
        text: "Refunds shall not be issued under the circumstances set forth below.",
      },
      { kind: "subheading", text: "Section 3.1. Approval of Work" },
      {
        kind: "p",
        text: "A refund shall not apply if written approval via email or SMS has been issued for:",
      },
      {
        kind: "list",
        items: [
          "3.1.1. The primary design concept.",
          "3.1.2. Any project phase, including strategy, design, development, or deployment.",
          "3.1.3. Website or mobile application designs.",
          "3.1.4. A developed product being delivered, deployed, or released live.",
          "3.1.5. Mobile application source files that have been handed over and received by the Client in writing via email or SMS.",
          "3.1.6. Website projects where the Client has approved the design in writing via email or SMS and the project has proceeded to development.",
        ],
      },
      {
        kind: "subheading",
        text: "Section 3.2. Client-Side Delay, Abandonment, or Non-Cooperation",
      },
      { kind: "p", text: "A refund shall not apply if:" },
      {
        kind: "list",
        items: [
          "3.2.1. The Client has not communicated with Web Inventers for fourteen (14) or more consecutive days.",
          "3.2.2. The project has been placed on hold at the Client's request in writing via email or SMS.",
          "3.2.3. The Client fails to supply required project information, materials, or a complete creative brief.",
          "3.2.4. The Client requests a complete design change after written approval has already been provided via email or SMS.",
        ],
      },
      { kind: "subheading", text: "Section 3.3. Third-Party Interference" },
      {
        kind: "p",
        text: "3.3.1. A refund shall not apply if the Client engages another agency, contractor, or designer for the same project after approving work in writing via email or SMS.",
      },
      {
        kind: "subheading",
        text: "Section 3.4. Business, Operational, or Internal Client Reasons",
      },
      {
        kind: "p",
        text: "A refund shall not apply due to reasons unrelated to services rendered, including:",
      },
      {
        kind: "list",
        items: [
          "3.4.1. Change of business direction or strategy.",
          "3.4.2. Business dissolution or name change.",
          "3.4.3. Change of mind.",
          "3.4.4. Partner disagreement.",
          "3.4.5. Any reason not related to service performance.",
        ],
      },
      {
        kind: "p",
        text: "Written approval remains binding where previously provided via email or SMS.",
      },
      {
        kind: "subheading",
        text: "Section 3.5. Revisions and Service Packages",
      },
      { kind: "p", text: "A refund shall not apply if:" },
      {
        kind: "list",
        items: [
          "3.5.1. Multiple rounds of revisions have been accepted in writing via email or SMS.",
          "3.5.2. The Client has requested revisions.",
          "3.5.3. The Client has purchased a discounted or special package.",
          "3.5.4. For bundled service packages, a refund applies only to the specific disputed service and not the entire bundle.",
        ],
      },
      {
        kind: "subheading",
        text: "Section 3.6. Time Limit and Service Categories",
      },
      { kind: "p", text: "A refund shall not apply:" },
      {
        kind: "list",
        items: [
          "3.6.1. After fifteen (15) days from the date of purchase.",
          "3.6.2. To services including, but not limited to, Social Media Marketing/Management, SEO, Domain Registration, Web Hosting Services, Paid Plugins, SSL/DDoS services, or other subscription-based or third-party licensed services.",
        ],
      },
    ],
  },
  {
    title: "Company Rights",
    blocks: [
      {
        kind: "p",
        text: "4.1. Web Inventers reserves the right to decline, suspend, or cancel any project or engagement at its discretion.",
      },
      {
        kind: "p",
        text: "4.2. Upon cancellation and issuance of any applicable refund, the Client shall relinquish all rights to use any materials or concepts previously provided.",
      },
      {
        kind: "p",
        text: "4.3. All materials remain the exclusive property of Web Inventers unless otherwise agreed in writing.",
      },
      {
        kind: "p",
        text: "4.4. Written approvals via email or SMS shall be treated as valid authorization for the relevant project stage.",
      },
    ],
  },
  {
    title: "Intellectual Property Upon Refund",
    blocks: [
      {
        kind: "p",
        text: "5.1. Upon refund issuance, the Client shall hold no rights, ownership, license, or permission to use any material previously submitted.",
      },
      {
        kind: "p",
        text: "5.2. Any unauthorized use of such materials may constitute infringement of applicable intellectual property rights.",
      },
    ],
  },
  {
    title: "Acceptance of Written Approvals",
    blocks: [
      {
        kind: "p",
        text: "6.1. The Client acknowledges that written approval via email or SMS shall be accepted as valid authorization for any stage of service progression.",
      },
      {
        kind: "p",
        text: "6.2. Oral approval, verbal confirmations, or messages through unverified platforms such as WhatsApp, Telegram, or social media shall not constitute valid approval unless explicitly documented and confirmed via email or SMS.",
      },
    ],
  },
  {
    title: "Acceptance of Policy",
    blocks: [
      {
        kind: "p",
        text: "7.1. Payment for services constitutes acceptance of this Refund Policy.",
      },
      {
        kind: "p",
        text: "7.2. The Client confirms that they have reviewed these terms and agree to comply with them.",
      },
    ],
  },
  {
    title: "Amendments",
    blocks: [
      {
        kind: "p",
        text: "8.1. Web Inventers reserves the right to modify this Refund Policy when necessary.",
      },
      {
        kind: "p",
        text: "8.2. The version of the policy in effect at the time of purchase shall govern the applicable transaction.",
      },
    ],
  },
  {
    title: "Contact Information",
    unnumbered: true,
    blocks: [
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

export default function RefundPolicyPage() {
  return (
    <LegalPage
      title="Refund Policy"
      lastUpdated={LAST_UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
