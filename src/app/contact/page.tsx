"use client";

import { useEffect } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import NextSteps from "../components/NextSteps";
import Locations from "../components/Locations";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full bg-bg">
      {/* Page starts on white — the nav renders its dark-text treatment */}
      <Nav onLight />

      <main id="top">
        <ContactSection className="pt-3 lg:pt-5" />

        <NextSteps />
        <Locations />
      </main>

      <Footer />
    </div>
  );
}
