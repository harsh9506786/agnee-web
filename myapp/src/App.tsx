import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import HeroSection from "./components/HeroSection";
import ImpactNumbers from "./components/ImpactNumbers";
import AboutSection from "./components/AboutSection";
import ExpertiseSection from "./components/ExpertiseSection";
import SectorExpertise from "./components/SectorExpertise";
import WhyAgnee from "./components/WhyAgnee";
import TeamSection from "./components/TeamSection";
import TestimonialSection from "./components/TestimonialSection";
import ClientLogos from "./components/ClientLogos";
import FounderMessage from "./components/FounderMessage";
import FinalCTA from "./components/FinalCTA";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { Loader } from "./components/Loader";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    let raf: number;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let tx = cx;
    let ty = cy;
    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("mousemove", onMove);
    const tick = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
export function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Agnee — AI Driven Branding & Digital Growth Agency";
  }, []);
  return (
    <div className="min-h-screen bg-dark-900 text-white overflow-x-hidden">
      {/* ✅ Loader */}
      {loading && <Loader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <div className="film-grain" aria-hidden="true" />
      <CursorGlow />
      <Navbar />
      <main>
        <section id="home">
          <HeroSection />
        </section>
        <div className="sep" />
        <section id="clients">
          <ClientLogos />
        </section>
        <div className="sep" />
        <section id="impact">
          <ImpactNumbers />
        </section>
        <div className="sep" />
        <section id="about">
          <AboutSection />
        </section>
        <div className="sep" />
        <section id="services">
          <ExpertiseSection />
        </section>
        <div className="sep" />
        <section id="industries">
          <SectorExpertise />
        </section>
        <div className="sep" />
        <section id="why">
          <WhyAgnee />
        </section>
        <div className="sep" />
        <section id="team">
          <TeamSection />
        </section>
        <div className="sep" />
        <section id="testimonials">
          <TestimonialSection />
        </section>

        <div className="sep" />
        <section id="founder">
          <FounderMessage />
        </section>
        <div className="sep" />
        <section id="cta">
          <FinalCTA />
        </section>
        <div className="sep" />
        <section id="contact">
          <ContactForm />
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
