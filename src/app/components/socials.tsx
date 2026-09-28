/** Web Inventers social accounts, shared by the footer and the navbar's
 *  Services panel. The profiles are not live yet, so both render these as
 *  labelled "coming soon" icons rather than links. */
export const SOCIALS = [
  {
    label: "Web Inventers on X",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M4 4l16 16M20 4 4 20" />
      </svg>
    ),
  },
  {
    label: "Web Inventers on LinkedIn",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="size-4">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Web Inventers on Facebook",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <path d="M14 9h3V6h-3a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9Z" />
      </svg>
    ),
  },
];
