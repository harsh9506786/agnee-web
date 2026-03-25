import React, { useEffect, useRef, useState, Suspense, lazy } from "react";
import { useInView } from "framer-motion";

// 👇 Lazy imports
const HeroSection = lazy(() => import("./components/HeroSection"));
const ImpactNumbers = lazy(() => import("./components/ImpactNumbers"));
const AboutSection = lazy(() => import("./components/AboutSection"));
const ExpertiseSection = lazy(() => import("./components/ExpertiseSection"));
const SectorExpertise = lazy(() => import("./components/SectorExpertise"));
const WhyAgnee = lazy(() => import("./components/WhyAgnee"));
const TeamSection = lazy(() => import("./components/TeamSection"));
const TestimonialSection = lazy(
  () => import("./components/TestimonialSection"),
);
const ClientLogos = lazy(() => import("./components/ClientLogos"));
const FounderMessage = lazy(() => import("./components/FounderMessage"));
const FinalCTA = lazy(() => import("./components/FinalCTA"));
const ContactForm = lazy(() => import("./components/ContactForm"));
const Footer = lazy(() => import("./components/Footer"));

// 👇 NON-LAZY (important)
import { Navbar } from "./components/Navbar";
import { CustomCursor } from "./components/CustomCursor";
import { Loader } from "./components/Loader";
import { WhatsAppFloat } from "./components/WhatsAppFloat";

// 🔥 LazySection wrapper (scroll pe render)
function LazySection({ children, height = "40vh" }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-150px", // thoda pehle load
  });

  return <div ref={ref}>{inView ? children : <div style={{ height }} />}</div>;
}

// 👇 Cursor Glow (same as yours)
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
      {/* Loader */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <CustomCursor />
      <div className="film-grain" aria-hidden="true" />
      <CursorGlow />
      <Navbar />

      <main>
        {/* 🔥 Hero (NO LazySection — always load) */}
        <Suspense fallback={<div className="h-[60vh]" />}>
          <section id="home">
            <HeroSection />
          </section>
        </Suspense>

        <div className="sep" />

        {/* 👇 बाकी सब LazySection me */}

        <LazySection>
          <section id="impact">
            <ImpactNumbers />
          </section>
        </LazySection>

        <div className="sep" />

        <LazySection>
          <section id="about">
            <AboutSection />
          </section>
        </LazySection>

        <div className="sep" />

        <LazySection>
          <section id="services">
            <ExpertiseSection />
          </section>
        </LazySection>

        <div className="sep" />

        <LazySection>
          <section id="industries">
            <SectorExpertise />
          </section>
        </LazySection>

        <div className="sep" />

        <LazySection>
          <section id="why">
            <WhyAgnee />
          </section>
        </LazySection>

        <div className="sep" />

        <LazySection>
          <section id="team">
            <TeamSection />
          </section>
        </LazySection>

        <div className="sep" />

        <LazySection>
          <section id="testimonials">
            <TestimonialSection />
          </section>
        </LazySection>

        <div className="sep" />

        <LazySection>
          <section id="clients">
            <ClientLogos />
          </section>
        </LazySection>

        <div className="sep" />

        <LazySection>
          <section id="founder">
            <FounderMessage />
          </section>
        </LazySection>

        <div className="sep" />

        <LazySection>
          <section id="cta">
            <FinalCTA />
          </section>
        </LazySection>

        <div className="sep" />

        <LazySection>
          <section id="contact">
            <ContactForm />
          </section>
        </LazySection>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      <WhatsAppFloat />
    </div>
  );
}
