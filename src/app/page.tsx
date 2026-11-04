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
import Locations from "./components/Locations";

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
        {/* "Have a Project in Mind?" call to action, straight after the services */}
        <FinalCTA />
        <WhyUs />
        <FeaturedWork />
        <Process />
        {/* The Pricing page's plans (a three-card preview per category; the
            full list is on /pricing), then testimonials, then the About
            page's FAQ. The ids let the
            nav and other links jump straight to them. */}
        <div id="pricing" className="scroll-mt-20">
          <PricingPlans limit={3} viewAllHref="/pricing" />
        </div>
        <Testimonials />
        <div id="faq" className="scroll-mt-20">
          <FAQ />
        </div>
        {/* The Contact page's "Start the Conversation" form, above the footer on
            every page */}
        <ContactSection as="h2" className="pb-20 lg:pb-24" />
        {/* "Collaborating With Clients Across The Globe" — the office cards,
            above the footer on every page, as on the Contact page */}
        <Locations />
      </main>
      <Footer />
    </div>
  );
}
