import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import AboutStory from "../components/AboutStory";
import OurTeam from "../components/OurTeam";
import WhyUs from "../components/WhyUs";
import FAQ from "../components/FAQ";

export const metadata: Metadata = {
  title: "About — Web Inventers",
  description:
    "Web Inventers is a full-service digital agency engineering websites, apps, and brands that move businesses forward.",
};

export default function AboutPage() {
  return (
    <div className="relative w-full bg-bg">
      {/* Dark hero backdrop — gives the navbar the same transparent/white text
          look as the landing and portfolio pages */}
      <div className="absolute inset-x-0 top-0 z-0 h-[340px] bg-ink lg:h-[400px]" />

      <Nav />

      <main id="top" className="relative z-10">
        <PageHero
          eyebrow="About Us"
          title="About Web Inventers"
          description="Web Inventers is a full-service digital agency engineering websites, apps, and brands that move businesses forward."
        />

        {/* Our Team — heading rises away, portrait row travels sideways */}
        <OurTeam />

        {/* Who We Are / Our Vision / Our Mission — pinned scroll story */}
        <AboutStory />

        {/* The landing page's "Why Web Inventers" section, reused as-is */}
        <WhyUs />

        {/* Frequently Asked Questions, from public/faqs.txt */}
        <FAQ />
      </main>

      {/* Carries the "Let's build, something awesome!" scroller beneath it */}
      <Footer />
    </div>
  );
}
