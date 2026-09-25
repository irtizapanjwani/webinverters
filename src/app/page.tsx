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
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import ContactSection from "./components/ContactSection";

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
          <Stats />
        </div>
        <Services />
        <WhyUs />
        <FeaturedWork />
        <Process />
        <Testimonials />
        <FinalCTA />
        {/* The Contact page's "Start the Conversation" form, above the footer on
            every page */}
        <ContactSection as="h2" className="pb-20 lg:pb-24" />
      </main>
      <Footer />
    </div>
  );
}
