"use client";

import CountUp from "../CountUp";
import PhoneFrame from "../frames/PhoneFrame";

const TRANSACTIONS = [
  { label: "Spotify", amount: "-$9.99", time: "Today" },
  { label: "Payroll", amount: "+$2,450.00", time: "Yesterday" },
  { label: "Whole Foods", amount: "-$64.20", time: "Yesterday" },
];

export default function MobileDevGraphic({ tiltDisabled = false }: { tiltDisabled?: boolean }) {
  return (
    <PhoneFrame tiltDisabled={tiltDisabled}>
      <div className="mb-5">
        <span className="text-[11px] font-semibold text-ink-faint">Total Balance</span>
        <div className="font-display text-2xl font-bold">
          <CountUp to={48210} duration={1.4} format={(v) => `$${Math.round(v).toLocaleString()}`} />
        </div>
        <span className="text-[11px] font-semibold text-accent-2">+2.4% this week</span>
      </div>
      <div className="flex flex-col gap-2">
        {TRANSACTIONS.map((t) => (
          <div
            key={t.label}
            className="flex items-center justify-between rounded-lg border border-border bg-bg-alt px-3 py-2.5"
          >
            <div>
              <div className="text-[12.5px] font-semibold">{t.label}</div>
              <div className="text-[11px] text-ink-faint">{t.time}</div>
            </div>
            <span
              className={`text-[12.5px] font-bold ${
                t.amount.startsWith("+") ? "text-accent-2" : "text-ink-dim"
              }`}
            >
              {t.amount}
            </span>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}
