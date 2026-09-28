/** Line icons for each service, in SERVICES order. Used by the Services page
 *  capability list and cards, and the service pages' heroes. */
const ICONS: React.ReactNode[] = [
  // Web Design & Development — browser window with code brackets
  <>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M3 8h18" />
    <path d="m10 12-2 2 2 2" />
    <path d="m14 12 2 2-2 2" />
  </>,
  // Mobile App Development — phone
  <>
    <rect x="7" y="2.5" width="10" height="19" rx="2" />
    <path d="M11 18.5h2" />
  </>,
  // E-commerce Development — shopping bag
  <>
    <path d="M5 8h14l-1 12H6L5 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </>,
  // Branding — four-point spark
  <>
    <path d="M12 3c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7Z" />
  </>,
  // SEO — globe
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
  </>,
  // Social Media Management — chat bubbles
  <>
    <path d="M4 5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    <path d="M17 9h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v2.5L16 18h-3" />
  </>,
];

export default function ServiceIcon({
  index,
  className,
  strokeWidth = 1.5,
}: {
  index: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {ICONS[index % ICONS.length]}
    </svg>
  );
}
