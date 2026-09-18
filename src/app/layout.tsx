import type { Metadata } from "next";
import { Manrope, Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

// ExtraBold only — used for the Hero heading specifically, not site-wide.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["800"],
});

export const metadata: Metadata = {
  title: "Web Inventers — Digital Solutions That Move Business Forward",
  description:
    "Web Inventers is a full-service digital agency helping ambitious brands build, grow, and stand out in the digital world.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg font-body text-ink">
        {children}
      </body>
    </html>
  );
}
