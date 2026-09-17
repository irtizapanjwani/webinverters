"use client";

import CountUp from "../CountUp";
import PhoneFrame from "../frames/PhoneFrame";

export default function SocialGraphic({ tiltDisabled = false }: { tiltDisabled?: boolean }) {
  return (
    <PhoneFrame tiltDisabled={tiltDisabled}>
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-2 font-display text-[11px] font-bold text-[#04101f]">
          WI
        </span>
        <div>
          <div className="text-[12.5px] font-bold">@webinventers</div>
          <div className="text-[10.5px] text-ink-faint">Sponsored</div>
        </div>
      </div>

      <div className="mb-3 aspect-[4/3] rounded-xl bg-[radial-gradient(120%_120%_at_30%_20%,#1B5AF0_0%,#0B1330_60%,#05070C_100%)]" />

      <div className="flex items-center justify-between text-[12px] font-semibold text-ink-dim">
        <span className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 text-accent-2"
          >
            <path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 6a5.5 5.5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9Z" />
          </svg>
          <CountUp to={2840} duration={1.3} format={(v) => Math.round(v).toLocaleString()} />
        </span>
        <span className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 text-accent-2"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
          </svg>
          <CountUp to={186} duration={1.3} />
        </span>
        <span className="flex items-center gap-1.5">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 text-accent-2"
          >
            <path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7" />
            <path d="M16 6l-4-4-4 4" />
            <path d="M12 2v13" />
          </svg>
          <CountUp to={94} duration={1.3} />
        </span>
      </div>
    </PhoneFrame>
  );
}
