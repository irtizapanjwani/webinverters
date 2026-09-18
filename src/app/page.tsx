import Nav from "./components/Nav";
import Hero from "./components/Hero";
import HeroIntro from "./components/HeroIntro";
import Stats from "./components/Stats";
import Services from "./components/Services";
import WhyUs from "./components/WhyUs";
import FeaturedWork from "./components/FeaturedWork";
import Process from "./components/Process";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="w-full bg-bg">
      {/* homepage-only entrance animation */}
      <HeroIntro />
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
      </main>
      <Footer />
    </div>
  );
}
