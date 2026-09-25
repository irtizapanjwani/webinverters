import type { Metadata } from "next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import PricingPlans from "../components/PricingPlans";
import FeaturedWork from "../components/FeaturedWork";
import Testimonials from "../components/Testimonials";
import ContactSection from "../components/ContactSection";

export const metadata: Metadata = {
  title: "Pricing — Web Inventers",
  description:
    "Every Web Inventers project is quoted on its scope, with a clear, upfront price before work begins.",
};

export default function PricingPage() {
  return (
    <div className="relative w-full bg-bg">
      {/* Dark hero backdrop — gives the navbar the same transparent/white text
          look as the portfolio and about pages */}
      <div className="absolute inset-x-0 top-0 z-0 h-[340px] bg-ink lg:h-[400px]" />

      <Nav />

      <main id="top" className="relative z-10">
        <PageHero
          eyebrow="Pricing"
          title="Pricing that fits your project"
          description="Every project is quoted on its scope. Tell us what you need and we'll give you a clear, upfront price before any work begins."
        />

        {/* Our Pricing Plans — heading and package category tabs */}
        <PricingPlans />

        {/* The landing page's Featured Work section, with its padding trimmed
            so it doesn't stack with the sections either side */}
        <FeaturedWork compact />

        {/* The landing page's testimonial section, reused as-is */}
        <Testimonials />

        {/* The Contact page's "Start the Conversation" section — the full
            form, so visitors can reach us without leaving the page */}
        <ContactSection as="h2" className="pb-20 lg:pb-24" />
      </main>

      {/* Carries the "Let's build, something awesome!" scroller beneath it */}
      <Footer />
    </div>
  );
}
