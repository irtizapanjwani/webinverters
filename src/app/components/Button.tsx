import Link from "next/link";
import type { ReactNode } from "react";

/** The system's standard state transition: 300ms on the decelerating curve,
 *  limited to non-layout properties. */
export const TRANSITION =
  "transition-[transform,box-shadow,background-color,border-color] duration-300 ease-[cubic-bezier(.2,.7,.3,1)]";

/** The primary action surface — Signal Blue Lift into Signal Blue, lit from the
 *  top-left, over the tight blue glow.
 *
 *  Exported because the newsletter field needs a real <button type="submit">
 *  and so cannot use this component, which renders a link. Sharing the string
 *  keeps the two from drifting: there is one definition of what a primary
 *  action looks like, not one per call site. */
export const PRIMARY_SURFACE =
  "bg-gradient-to-br from-accent-lift to-accent text-white shadow-[0_12px_30px_-8px_rgba(27,90,240,0.55)] hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-8px_rgba(27,90,240,0.7)]";

type ButtonProps = {
  href: string;
  variant?: "primary" | "ghost";
  size?: "md" | "sm";
  /** Which background the ghost variant sits on. Almost everything is on the
   * page's light surface now; "dark" is only for buttons placed on a
   * permanently-dark panel (e.g. FinalCTA), regardless of the site theme. */
  surface?: "light" | "dark";
  block?: boolean;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export default function Button({
  href,
  variant = "primary",
  size = "md",
  surface = "light",
  block = false,
  className = "",
  onClick,
  children,
}: ButtonProps) {
  const base = `group inline-flex items-center justify-center gap-2.5 rounded-full font-bold whitespace-nowrap ${TRANSITION} active:scale-[0.97]`;
  const sizes =
    size === "sm" ? "px-5 py-[11px] text-sm" : "px-7 py-[15px] text-[15px]";
  const ghostLight =
    "bg-black/[0.02] text-ink border border-border-strong hover:bg-black/[0.05] hover:border-black/20 hover:-translate-y-0.5";
  const ghostDark =
    "bg-white/[0.04] text-white border border-white/15 hover:bg-white/[0.09] hover:border-white/30 hover:-translate-y-0.5";
  const variants =
    variant === "primary"
      ? PRIMARY_SURFACE
      : surface === "dark"
        ? ghostDark
        : ghostLight;

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
