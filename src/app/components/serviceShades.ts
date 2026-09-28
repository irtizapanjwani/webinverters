/** One gradient per service, in SERVICES order: soft blurred light streaks
 *  over a base colour, each service in its own colour family. Shared by the
 *  navbar's Services menu and the Services page's capability cards, so a
 *  service keeps the same colour everywhere. */
export const SERVICE_SHADES = [
  // Web Design & Development — the site's own palette: deep navy lit with
  // Signal Blue (#1B5AF0) and a touch of cyan
  "bg-[radial-gradient(55%_150%_at_70%_25%,rgba(27,90,240,0.95),transparent_62%),radial-gradient(45%_130%_at_100%_100%,rgba(58,104,238,0.8),transparent_65%),radial-gradient(40%_120%_at_0%_100%,rgba(14,116,144,0.55),transparent_65%),linear-gradient(115deg,#0B1330_0%,#0F1D4A_55%,#12245C_100%)]",
  // Mobile App Development — steel blue
  "bg-[radial-gradient(80%_140%_at_20%_0%,rgba(147,197,253,0.35),transparent_60%),linear-gradient(135deg,#2B5A8C,#3D6E9E_55%,#34507A)]",
  // E-commerce Development — olive green
  "bg-[radial-gradient(60%_140%_at_85%_50%,rgba(205,214,170,0.75),transparent_65%),radial-gradient(50%_120%_at_20%_100%,rgba(52,68,26,0.9),transparent_70%),linear-gradient(135deg,#55633A,#7C8A5A)]",
  // Branding — navy into violet and rose
  "bg-[radial-gradient(55%_150%_at_55%_60%,rgba(124,58,237,0.75),transparent_65%),radial-gradient(45%_130%_at_100%_20%,rgba(190,24,93,0.7),transparent_65%),radial-gradient(45%_130%_at_15%_100%,rgba(37,99,235,0.8),transparent_65%),linear-gradient(120deg,#0B1330,#1E1B4B)]",
  // SEO — electric blue
  "bg-[radial-gradient(60%_150%_at_80%_20%,rgba(59,130,246,0.95),transparent_62%),radial-gradient(50%_130%_at_10%_100%,rgba(6,182,212,0.6),transparent_65%),linear-gradient(135deg,#0B1330,#0F1D4A)]",
  // Social Media Management — near black with a deep red glow
  "bg-[radial-gradient(45%_140%_at_75%_40%,rgba(153,27,27,0.75),transparent_65%),linear-gradient(135deg,#050505,#1A0F0F)]",
];
