import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import Capabilities from "../components/Capabilities";
import WhyUs from "../components/WhyUs";
import ContactSection from "../components/ContactSection";

export const metadata: Metadata = {
  title: "Services — Web Inventers",
  description:
    "Web design and development, mobile apps, e-commerce, branding, SEO and social media — every Web Inventers service is built to compound into business growth.",
};

export default function ServicesPage() {
  return (
    <div className="relative w-full bg-bg">
      {/* Dark hero backdrop — gives the navbar the same transparent/white text
          look as the about and pricing pages */}
      <div className="absolute inset-x-0 top-0 z-0 h-[340px] bg-ink lg:h-[400px]" />

      <Nav />

      <main id="top" className="relative z-10">
        <PageHero
          eyebrow="Services"
          title="Services built to move your business forward"
          description="From first sketch to shipped product — every service is built to compound into business growth."
        />

        {/* Our Capabilities — the service list beside a card per service */}
        <Capabilities />

        {/* The landing page's "Why Web Inventers" section — video testimonials,
            trust cards and the awards carousel */}
        <WhyUs />

        {/* The Contact page's "Start the Conversation" form, above the footer on
            every page */}
        <ContactSection as="h2" className="pt-12 pb-20 lg:pt-16 lg:pb-24" />
      </main>

      {/* Carries the "Let's build, something awesome!" scroller beneath it */}
      <Footer />
    </div>
  );
}
