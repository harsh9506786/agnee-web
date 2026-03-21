import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const logos = [
  "Np Jewels",
  "Avadh Foods",
  "Lifeline Superspeciality Hospital and Heart Center",
  "Dr. Rajput Laparoscopy",
  "Shiv Collection Centre",
  "Coffee Express",
  "Life Secure",
  "SRS Industries",
  "Jhansi Times",
  "Bort Technology",
  "News 360",
  "Lottery Foods",
  "Bharat Solar",
  "Shree G Solar",
  "Shammtech",
  "Ramdarshan Public School",
  "Sensaji Scaffolding",
  "Empire Salon",
  "Welltopia",
  "Yumiko",
  "Coffee Spot",
];

export function ClientLogos() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const duplicatedLogos = [...logos, ...logos];

  // 1️⃣ Detect desktop vs mobile
  useEffect(() => {
    const check = () => {
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isLargeScreen = window.innerWidth >= 1024;
      setIsDesktop(isFinePointer && isLargeScreen);
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 2️⃣ Auto scroll (desktop only)
  useEffect(() => {
    if (!isDesktop) return;
    const container = scrollRef.current;
    if (!container) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused, isDesktop]);

  // 3️⃣ Button scroll
  const scrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;

    setIsPaused(true);
    container.scrollBy({ left: -400, behavior: "smooth" });
    setTimeout(() => setIsPaused(false), 800);
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;

    setIsPaused(true);
    container.scrollBy({ left: 400, behavior: "smooth" });
    setTimeout(() => setIsPaused(false), 800);
  };

  return (
    <section ref={ref} className="relative py-20 bg-dark-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.25em] mb-6 uppercase px-3 py-1.5 rounded-full"
            style={{
              color: "#FF6B00",
              background: "rgba(255,107,0,0.08)",
              border: "1px solid rgba(255,107,0,0.2)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Our Clients
          </span>

          <h2
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Brands That <span className="text-flame">Trust Agnee</span>
          </h2>
        </motion.div>

        {/* Scroll Section */}
        <div className="relative flex items-center overflow-visible">
          {/* Left button / mobile hint */}
          {isDesktop ? (
            <button
              onClick={scrollLeft}
              className="absolute -left-24 z-20 bg-dark-700 hover:bg-dark-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
            >
              &#10094;
            </button>
          ) : (
            showHints && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute left-2 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-dark-700/80 text-white pointer-events-none"
              >
                &#10094;
              </motion.div>
            )
          )}

          {/* Scroll container */}
          <div
            ref={scrollRef}
            onTouchStart={() => setIsUserScrolling(true)}
            onScroll={() => {
              if (isUserScrolling) setShowHints(false);
            }}
            className="flex gap-6 overflow-x-auto py-2 scroll-smooth no-scrollbar touch-pan-x"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {duplicatedLogos.map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-6 py-4 rounded-xl border border-gray-400 hover:border-[rgba(255,90,0,0.3)] hover:bg-[rgba(255,90,0,0.04)] transition-all duration-300 group cursor-default"
              >
                <span className="font-syne font-700 text-white group-hover:text-flame-500 transition-colors duration-300 whitespace-nowrap text-md tracking-wide">
                  {logo}
                </span>
              </div>
            ))}
          </div>

          {/* Right button / mobile hint */}
          {isDesktop ? (
            <button
              onClick={scrollRight}
              className="absolute -right-24 z-20 bg-dark-700 hover:bg-dark-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
            >
              &#10095;
            </button>
          ) : (
            showHints && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-dark-700/80 text-white pointer-events-none"
              >
                &#10095;
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
