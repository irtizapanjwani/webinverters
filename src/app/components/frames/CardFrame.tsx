import type { ReactNode } from "react";

export default function CardFrame({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.4)]">
      {children}
    </div>
  );
}
