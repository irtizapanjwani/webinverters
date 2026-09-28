function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

/** Official marks from Simple Icons (CC0), drawn in white on each platform's
 *  brand colour. The custom-build entry uses a code icon. */
const PLATFORMS: { name: string; badge: string; icon: React.ReactNode }[] = [
  {
    name: "Webflow Design & Dev",
    badge: "bg-[#146EF5]",
    icon: <path fill="currentColor" d="m24 4.515-7.658 14.97H9.149l3.205-6.204h-.144C9.566 16.713 5.621 18.973 0 19.485v-6.118s3.596-.213 5.71-2.435H0V4.515h6.417v5.278l.144-.001 2.622-5.277h4.854v5.244h.144l2.72-5.244H24Z" />,
  },
  {
    name: "WordPress Design & Dev",
    badge: "bg-[#21759B]",
    icon: <path fill="currentColor" d="M21.469 6.825c.84 1.537 1.318 3.3 1.318 5.175 0 3.979-2.156 7.456-5.363 9.325l3.295-9.527c.615-1.54.82-2.771.82-3.864 0-.405-.026-.78-.07-1.11m-7.981.105c.647-.03 1.232-.105 1.232-.105.582-.075.514-.93-.067-.899 0 0-1.755.135-2.88.135-1.064 0-2.85-.15-2.85-.15-.585-.03-.661.855-.075.885 0 0 .54.061 1.125.09l1.68 4.605-2.37 7.08L5.354 6.9c.649-.03 1.234-.1 1.234-.1.585-.075.516-.93-.065-.896 0 0-1.746.138-2.874.138-.2 0-.438-.008-.69-.015C4.911 3.15 8.235 1.215 12 1.215c2.809 0 5.365 1.072 7.286 2.833-.046-.003-.091-.009-.141-.009-1.06 0-1.812.923-1.812 1.914 0 .89.513 1.643 1.06 2.531.411.72.89 1.643.89 2.977 0 .915-.354 1.994-.821 3.479l-1.075 3.585-3.9-11.61.001.014zM12 22.784c-1.059 0-2.081-.153-3.048-.437l3.237-9.406 3.315 9.087c.024.053.05.101.078.149-1.12.393-2.325.609-3.582.609M1.211 12c0-1.564.336-3.05.935-4.39L7.29 21.709C3.694 19.96 1.212 16.271 1.211 12M12 0C5.385 0 0 5.385 0 12s5.385 12 12 12 12-5.385 12-12S18.615 0 12 0" />,
  },
  {
    name: "Custom & Headless Development",
    badge: "bg-[linear-gradient(135deg,#0F766E,#10B981)]",
    icon: (
      <g fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
        <path d="m13.5 4-3 16" />
      </g>
    ),
  },
  {
    name: "Wix Studio Design & Dev",
    badge: "bg-[linear-gradient(135deg,#4F46E5,#8B5CF6)]",
    icon: <path fill="currentColor" d="m0 7.354 2.113 9.292h.801a1.54 1.54 0 0 0 1.506-1.218l1.351-6.34a.171.171 0 0 1 .167-.137c.08 0 .15.058.167.137l1.352 6.34a1.54 1.54 0 0 0 1.506 1.218h.805l2.113-9.292h-.565c-.62 0-1.159.43-1.296 1.035l-1.26 5.545-1.106-5.176a1.76 1.76 0 0 0-2.19-1.324c-.639.176-1.113.716-1.251 1.365l-1.094 5.127-1.26-5.537A1.33 1.33 0 0 0 .563 7.354H0zm13.992 0a.951.951 0 0 0-.951.95v8.342h.635a.952.952 0 0 0 .951-.95V7.353h-.635zm1.778 0 3.158 4.66-3.14 4.632h1.325c.368 0 .712-.181.918-.486l1.756-2.59a.12.12 0 0 1 .197 0l1.754 2.59c.206.305.55.486.918.486h1.326l-3.14-4.632L24 7.354h-1.326c-.368 0-.712.181-.918.486l-1.772 2.617a.12.12 0 0 1-.197 0L18.014 7.84a1.108 1.108 0 0 0-.918-.486H15.77z" />,
  },
  {
    name: "Squarespace Design & Dev",
    badge: "bg-[#0B0B0B]",
    icon: <path fill="currentColor" d="M22.655 8.719c-1.802-1.801-4.726-1.801-6.564 0l-7.351 7.35c-.45.45-.45 1.2 0 1.65.45.449 1.2.449 1.65 0l7.351-7.351c.899-.899 2.362-.899 3.264 0 .9.9.9 2.364 0 3.264l-7.239 7.239c.9.899 2.362.899 3.263 0l5.589-5.589c1.836-1.838 1.836-4.763.037-6.563zm-2.475 2.437c-.451-.45-1.201-.45-1.65 0l-7.354 7.389c-.9.899-2.361.899-3.262 0-.45-.45-1.2-.45-1.65 0s-.45 1.2 0 1.649c1.801 1.801 4.726 1.801 6.564 0l7.351-7.35c.449-.487.449-1.239.001-1.688zm-2.439-7.35c-1.801-1.801-4.726-1.801-6.564 0l-7.351 7.351c-.45.449-.45 1.199 0 1.649s1.2.45 1.65 0l7.395-7.351c.9-.899 2.371-.899 3.27 0 .451.45 1.201.45 1.65 0 .421-.487.421-1.199-.029-1.649h-.021zm-2.475 2.437c-.45-.45-1.2-.45-1.65 0l-7.351 7.389c-.899.9-2.363.9-3.265 0-.9-.899-.9-2.363 0-3.264l7.239-7.239c-.9-.9-2.362-.9-3.263 0L1.35 8.719c-1.8 1.8-1.8 4.725 0 6.563 1.801 1.801 4.725 1.801 6.564 0l7.35-7.351c.451-.488.451-1.238 0-1.688h.002z" />,
  },
];

/**
 * "Platforms We Design & Build On": a frosted brand-blue card with a glass
 * button per platform, each badge in that platform's own colour. Used on the
 * Services page (default) and, larger, on the Web Design page.
 */
export default function PlatformsCard({ size = "default" }: { size?: "default" | "large" }) {
  const large = size === "large";
  return (
    <section
      data-surface="dark"
      aria-labelledby="platforms-heading"
      className={`relative overflow-hidden rounded-[24px] bg-[radial-gradient(70%_110%_at_15%_0%,rgba(27,90,240,0.55),transparent_60%),radial-gradient(60%_90%_at_100%_100%,rgba(14,116,144,0.35),transparent_62%),linear-gradient(180deg,#2F5FA8_0%,#6E8FBF_60%,#A3B6D2_100%)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] ${
        large ? "rounded-[28px] p-7 sm:p-12 lg:p-16" : "p-6 sm:p-9 xl:p-11"
      }`}
    >
      <h3
        id="platforms-heading"
        className={`font-display leading-[1.15] font-bold tracking-[-0.01em] ${
          large ? "mb-9 text-[clamp(24px,3vw,42px)] sm:mb-12" : "mb-7 text-[clamp(21px,2vw,30px)] sm:mb-8"
        }`}
      >
        Platforms <span className="font-semibold text-white/80">We Design &amp; Build On</span>
      </h3>

      <ul className={`grid gap-3 sm:grid-cols-2 ${large ? "sm:gap-5" : "sm:gap-4"}`}>
        {PLATFORMS.map((platform) => (
          <li key={platform.name}>
            <a
              href="#start-project"
              className={`group flex h-full items-center gap-4 rounded-[16px] border border-white/25 bg-white/[0.12] backdrop-blur-sm ${large ? "p-4 pr-6 sm:gap-5" : "p-3 pr-5"} transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.2]`}
            >
              <span
                className={`flex shrink-0 ${large ? "h-14 w-[84px]" : "h-11 w-[68px]"} items-center justify-center rounded-full text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_14px_-6px_rgba(0,0,0,0.45)] ${platform.badge}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className={large ? "size-6" : "size-5"}>
                  {platform.icon}
                </svg>
              </span>
              <span className={`flex-1 leading-[1.3] font-semibold ${large ? "text-[17px] sm:text-[18px]" : "text-[15.5px]"}`}>{platform.name}</span>
              <ArrowUpRight className="size-4 shrink-0 text-white/75 transition-colors group-hover:text-white" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
