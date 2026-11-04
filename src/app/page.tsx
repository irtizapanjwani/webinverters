import Nav from "./components/Nav";
import Hero from "./components/Hero";
import HeroVideo from "./components/HeroVideo";
import HeroIntro from "./components/HeroIntro";
import Stats from "./components/Stats";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import FeaturedWork from "./components/FeaturedWork";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import PricingPlans from "./components/PricingPlans";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ContactSection from "./components/ContactSection";

/** Trust & Results section (and its blue orb expansion out of the hero) is
 *  hidden for now, not removed. Set to true to bring it back. */
const SHOW_TRUST_RESULTS = false;

export default function Home() {
  return (
    <div className="relative w-full bg-bg">
      {/* homepage-only entrance animation */}
      <HeroIntro />
      {/* Spans the header and the hero, ending at the "Trusted by" strip. */}
      <HeroVideo />
      <Nav />
      <main id="top">
        {/* Scoped clip for the Trust & Results orb expansion: the circle may
            grow up across the hero boundary, but never past this wrapper into
            the sections below. */}
        <div className="relative overflow-hidden">
          <Hero />
          {SHOW_TRUST_RESULTS && <Stats />}
        </div>
        <Services />
        <WhyUs />
        <FeaturedWork />
        <Process />
        <Testimonials />
        {/* The Pricing page's plans and the About page's FAQ, reused as-is:
            proof, then price, then answers to the questions price raises,
            right before the final call to action. The ids let the nav and
            other links jump straight to them. */}
        <div id="pricing" className="scroll-mt-20">
          {/* A three-card preview per category; the full list is on /pricing */}
          <PricingPlans limit={3} viewAllHref="/pricing" />
        </div>
        <div id="faq" className="scroll-mt-20">
          <FAQ />
        </div>
        <FinalCTA />
        {/* The Contact page's "Start the Conversation" form, above the footer on
            every page */}
        <ContactSection as="h2" className="pb-20 lg:pb-24" />
      </main>
      <Footer />
    </div>
  );
}
