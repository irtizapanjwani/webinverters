import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  block?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  block = false,
  className = "",
  onClick,
  children,
}: ButtonProps) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 rounded-full font-bold whitespace-nowrap transition-[transform,box-shadow,background-color,border-color] duration-300 ease-[cubic-bezier(.2,.7,.3,1)] active:scale-[0.97]";
  const sizes =
    size === "sm" ? "px-5 py-[11px] text-sm" : "px-7 py-[15px] text-[15px]";
  const variants =
    variant === "primary"
      ? "bg-gradient-to-br from-accent to-[#4C7CFF] text-white shadow-[0_12px_30px_-8px_rgba(27,90,240,0.55)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-8px_rgba(27,90,240,0.7)]"
      : "bg-white/[0.02] text-ink border border-border-strong hover:bg-white/[0.06] hover:border-white/30 hover:-translate-y-0.5";

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`${base} ${sizes} ${variants} ${block ? "w-full" : ""} ${className}`}
    >
      {children}
    </Link>
  );
}
