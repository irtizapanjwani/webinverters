import { BRAND_PATHS } from "./brandIcons";
import { WEB_PLATFORMS, type PlatformItem } from "./servicePages";

function ArrowUpRight({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function Mark({ item }: { item: PlatformItem }) {
  if (item.code || !item.brand) {
    return (
      <g fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="m8 7-5 5 5 5" />
        <path d="m16 7 5 5-5 5" />
        <path d="m13.5 4-3 16" />
      </g>
    );
  }
  return <path fill="currentColor" d={BRAND_PATHS[item.brand]} />;
}

type PlatformsCardProps = {
  size?: "default" | "large";
  /** The heading, in two tones: "Platforms" + "We Design & Build On". */
  lead?: string;
  rest?: string;
  items?: PlatformItem[];
};

/**
 * A frosted brand-blue card with a glass button per platform or tool, each
 * badge in that brand's own colour. Used on the Services page (web platforms,
 * default size) and, larger, on every service page with that service's tools.
 */
export default function PlatformsCard({
  size = "default",
  lead = "Platforms",
  rest = "We Design & Build On",
  items = WEB_PLATFORMS,
}: PlatformsCardProps) {
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
        {lead} <span className="font-semibold text-white/80">{rest}</span>
      </h3>

      <ul className={`grid gap-3 sm:grid-cols-2 ${large ? "sm:gap-5" : "sm:gap-4"}`}>
        {items.map((item) => (
          <li key={item.name}>
            <a
              href="#start-project"
              className={`group flex h-full items-center gap-4 rounded-[16px] border border-white/25 bg-white/[0.12] backdrop-blur-sm ${large ? "p-4 pr-6 sm:gap-5" : "p-3 pr-5"} transition-colors duration-300 hover:border-white/40 hover:bg-white/[0.2]`}
            >
              <span
                className={`flex shrink-0 ${large ? "h-14 w-[84px]" : "h-11 w-[68px]"} items-center justify-center rounded-full text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_14px_-6px_rgba(0,0,0,0.45)] ${item.badge}`}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" className={large ? "size-6" : "size-5"}>
                  <Mark item={item} />
                </svg>
              </span>
              <span className={`flex-1 leading-[1.3] font-semibold ${large ? "text-[17px] sm:text-[18px]" : "text-[15.5px]"}`}>{item.name}</span>
              <ArrowUpRight className="size-4 shrink-0 text-white/75 transition-colors group-hover:text-white" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
