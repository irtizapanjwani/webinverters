import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms & Conditions — Web Inventers",
  description:
    "The Terms & Conditions governing the use of Web Inventers' website and the purchase or use of its services.",
};

/** Transcribed verbatim from
 *  `public/Web Inventers Privacy Policy, Refund Policy and Terms & Conditions.pdf`,
 *  section 3. Section numbering, order and wording follow the PDF exactly —
 *  only the presentation is the site's. Edit the PDF and this file together so
 *  the two never disagree. */
const LAST_UPDATED = "September 2026";

const INTRO =
  "These Terms & Conditions govern the use of Web Inventers' website and the purchase or use of its services. By purchasing or using our services, the Client acknowledges and agrees to these terms.";

const SECTIONS: LegalSection[] = [
  {
    title: "Revision Policy",
    blocks: [
      {
        kind: "p",
        text: "Clients are entitled to a fixed number of revisions based on their selected package (referred to as the “Revision Entitlement”).",
      },
      {
        kind: "p",
        text: "Included revisions cover minor edits or adjustments to the existing work.",
      },
      {
        kind: "p",
        text: "Once the included revisions have been used, additional changes may be billed according to their complexity and Web Inventers' standard pricing.",
      },
      {
        kind: "p",
        text: "A “revision” means a minor modification or adjustment, while a “re-do” refers to a major change, new requirement, or request to restart the work, which may incur additional charges.",
      },
    ],
  },
  {
    title: "Project Requirements",
    blocks: [
      {
        kind: "p",
        text: "All necessary details, documents, materials, content, and requirements must be provided at the beginning of the project.",
      },
      {
        kind: "p",
        text: "Any additional requests submitted after the project has started may be treated as new work and may involve additional charges.",
      },
      {
        kind: "p",
        text: "Optional features, custom functionalities, third-party APIs, or plugin integrations, whether free or paid, are not included in discounted or promotional packages unless agreed upon in advance.",
      },
    ],
  },
  {
    title: "Turnaround Time",
    blocks: [
      {
        kind: "p",
        text: "Turnaround Time refers to the duration required to deliver initial concepts after receiving complete project details and confirmation.",
      },
      {
        kind: "list",
        items: [
          "Logo designs: 24–36 hours",
          "Packages with 4+ logo concepts: Minimum 36 hours",
          "Website design: 36–48 hours after complete submission of project details",
          "Website development: Approximately 2–3 weeks, depending on project requirements and Client feedback",
        ],
      },
      {
        kind: "p",
        text: "For complex projects, timelines may be divided into milestones and communicated through official communication channels.",
      },
      {
        kind: "p",
        text: "Orders placed on weekends (Friday/Saturday) will begin processing from the next working Monday, excluding holidays.",
      },
    ],
  },
  {
    title: "Quality Assurance",
    blocks: [
      {
        kind: "p",
        text: "Web Inventers is committed to delivering high-quality services and completing revisions within the applicable package scope.",
      },
      {
        kind: "p",
        text: "The Client is responsible for reviewing submitted work and providing clear, timely feedback to keep the project progressing according to the agreed timeline.",
      },
    ],
  },
  {
    title: "Delivery Policy",
    blocks: [
      {
        kind: "p",
        text: "If a Client fails to respond within five (5) working days despite repeated follow-ups, a 25% reactivation fee may be applied.",
      },
      {
        kind: "p",
        text: "Prior communication from the Client may be considered when adjusting project deadlines and determining whether a reactivation fee applies.",
      },
    ],
  },
  {
    title: "Payment Terms & Service Suspension",
    blocks: [
      {
        kind: "p",
        text: "Clients using installment plans must meet the agreed payment deadlines.",
      },
      {
        kind: "p",
        text: "Late payments may incur a 20% surcharge on the total order value.",
      },
      {
        kind: "p",
        text: "A grace period of three (3) days will be provided. Failure to clear outstanding dues within this period may result in temporary suspension of services until payment is completed.",
      },
    ],
  },
  {
    title: "Maintenance & Support",
    blocks: [
      {
        kind: "p",
        text: "Maintenance services, including WordPress and plugin updates, may be provided to help maintain website performance and functionality.",
      },
      { kind: "p", text: "Customer support is available:" },
      { kind: "p", text: "Monday to Friday, 11:00 AM to 8:00 PM (EST)." },
      {
        kind: "p",
        text: "The scope of maintenance and support depends on the service package or agreement between Web Inventers and the Client.",
      },
    ],
  },
  {
    title: "Response Time (SLA)",
    blocks: [
      {
        kind: "p",
        text: "Web Inventers aims to respond to queries, support requests, and communications within 24–72 working hours.",
      },
      {
        kind: "p",
        text: "Response times may vary depending on the nature and complexity of the request.",
      },
    ],
  },
  {
    title: "Communication Policy",
    blocks: [
      {
        kind: "p",
        text: "Web Inventers is not responsible for commitments, instructions, or agreements made through unauthorized or unofficial communication channels.",
      },
      {
        kind: "p",
        text: "Information shared through verified company communication channels will be considered the official basis for project-related decisions and instructions.",
      },
    ],
  },
  {
    title: "Third-Party Services",
    blocks: [
      {
        kind: "p",
        text: "Some projects may require third-party services, software, plugins, hosting providers, APIs, subscriptions, or other external platforms.",
      },
      {
        kind: "p",
        text: "The availability, functionality, pricing, terms, and policies of such third-party services are controlled by their respective providers.",
      },
      {
        kind: "p",
        text: "Web Inventers is not responsible for changes, interruptions, limitations, or failures caused by third-party providers.",
      },
    ],
  },
  {
    title: "Intellectual Property",
    blocks: [
      {
        kind: "p",
        text: "Unless otherwise agreed in writing, ownership and usage rights relating to project materials shall be determined according to the applicable service agreement and payment status.",
      },
      {
        kind: "p",
        text: "Clients may not reproduce, resell, distribute, or commercially exploit Web Inventers' proprietary materials, resources, systems, or internal processes without written authorization.",
      },
    ],
  },
  {
    title: "Policy Updates",
    blocks: [
      {
        kind: "p",
        text: "Web Inventers reserves the right to update or modify these Terms & Conditions when necessary.",
      },
      {
        kind: "p",
        text: "Clients are encouraged to review this page periodically to remain informed about any changes.",
      },
    ],
  },
  {
    title: "Contact Us",
    blocks: [
      {
        kind: "p",
        text: "For questions regarding these Terms & Conditions, please contact:",
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

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      lastUpdated={LAST_UPDATED}
      intro={INTRO}
      sections={SECTIONS}
    />
  );
}
