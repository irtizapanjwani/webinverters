"use client";

import CountUp from "../CountUp";
import BrowserFrame from "../frames/BrowserFrame";

const PRODUCTS = [
  { color: "from-accent to-accent-2", price: "$68" },
  { color: "from-accent-2 to-accent", price: "$124" },
  { color: "from-[#8B5CF6] to-accent", price: "$42" },
  { color: "from-accent to-[#22D3EE]", price: "$96" },
];

export default function EcommerceGraphic({ tiltDisabled = false }: { tiltDisabled?: boolean }) {
  return (
    <BrowserFrame url="shop.yourbrand.com" tiltDisabled={tiltDisabled}>
      <div className="mb-4 flex items-center justify-between">
        <span className="font-display text-xs font-bold tracking-[0.14em] text-ink-faint uppercase">
          Storefront
        </span>
        <div className="relative flex size-8 items-center justify-center rounded-lg border border-border bg-bg-alt">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.7}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-4 text-ink-dim"
          >
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
            <path d="M3 4h2l2.4 11.5a2 2 0 0 0 2 1.5h7.2a2 2 0 0 0 2-1.6L20 8H6.2" />
          </svg>
          <span className="absolute -top-1.5 -right-1.5 flex size-4.5 items-center justify-center rounded-full bg-accent-2 text-[10px] font-bold text-[#04101f]">
            <CountUp to={3} duration={1} />
          </span>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-4 gap-2">
        {PRODUCTS.map((p, i) => (
          <div key={i} className="overflow-hidden rounded-lg border border-border">
            <div className={`aspect-square bg-gradient-to-br ${p.color} opacity-80`} />
            <div className="bg-bg-alt px-1.5 py-1 text-center text-[10.5px] font-bold">
              {p.price}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border bg-bg-alt px-3 py-2.5">
        <span className="text-[12px] font-semibold text-ink-dim">Revenue today</span>
        <span className="font-display text-base font-bold text-accent-2">
          <CountUp to={4218} duration={1.4} format={(v) => `$${Math.round(v).toLocaleString()}`} />
        </span>
      </div>
    </BrowserFrame>
  );
}
