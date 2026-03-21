import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";

const industries = [
  "SaaS and Technology",
  "Healthcare and Hospitals",
  "Agriculture and Agri-Business",
  "Education and Coaching Centers",
  "Real Estate and Builders",
  "Ecommerce and Retail",
  "Corporate B2B and B2C",
  "Manufacturing and Industrial",
  "Political Campaigns",
  "Startups and Entrepreneurs",
];

// 🔁 duplicate for infinite scroll
const loopedIndustries = [...industries, ...industries];

export function SectorExpertise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  // 👉 Manual scroll (with pause)
  const scrollLeft = () => {
    if (!scrollRef.current) return;

    setIsHovered(true);
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });

    setTimeout(() => setIsHovered(false), 800);
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;

    setIsHovered(true);
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

    setTimeout(() => setIsHovered(false), 800);
  };

  const [isDesktop, setIsDesktop] = useState(false);

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

  useEffect(() => {
    if (!isDesktop) return; // 🚀 MOBILE FIX

    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 0.7;

    const interval = setInterval(() => {
      if (!isHovered) {
        container.scrollLeft += scrollSpeed;

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered, isDesktop]);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.7,
          }}
          className="mb-16 text-center lg:text-left"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
            style={{
              color: "#FF6B00",
              background: "rgba(255,107,0,0.08)",
              border: "1px solid rgba(255,107,0,0.2)",
            }}
          >
            Our Services
          </span>

          <h2 className="font-syne font-extrabold text-white mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
            Industries We <span className="text-flame">Serve</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            We work across multiple industries with customized strategies.
          </p>
        </motion.div>

        {/* Scroll Wrapper */}
        <div className="relative flex items-center overflow-visible">
          {/* LEFT */}
          {isDesktop ? (
            <button
              onClick={scrollLeft}
              className="absolute -left-20 z-20 w-10 h-10 rounded-full flex items-center justify-center
      bg-dark-700 hover:bg-dark-900 text-white"
            >
              &#10094;
            </button>
          ) : (
            showHints && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute left-2 z-20 w-8 h-8 rounded-full flex items-center justify-center
        bg-dark-700/80 text-white pointer-events-none"
              >
                &#10094;
              </motion.div>
            )
          )}

          {/* ✅ SCROLL CONTAINER (YAHI MAIN CHEEZ HAI) */}
          <div
            ref={scrollRef}
            onTouchStart={() => setIsUserScrolling(true)} // 👈 user touch detect
            onScroll={() => {
              if (isUserScrolling) {
                setShowHints(false); // 👈 sirf user scroll pe hide
              }
            }}
            className="flex gap-4 overflow-x-auto px-4 py-2 scroll-smooth no-scrollbar touch-pan-x"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {loopedIndustries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="flex-shrink-0 w-[260px] p-6 rounded-2xl bg-dark-700 border border-white/5"
              >
                <CheckCircleIcon className="w-5 h-5 text-orange-500 mb-4" />
                <div className="text-white font-semibold">{ind}</div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT */}
          {isDesktop ? (
            <button
              onClick={scrollRight}
              className="absolute -right-20 z-20 w-10 h-10 rounded-full flex items-center justify-center
      bg-dark-700 hover:bg-dark-900 text-white"
            >
              &#10095;
            </button>
          ) : (
            showHints && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, x: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                className="absolute right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center
        bg-dark-700/80 text-white pointer-events-none"
              >
                &#10095;
              </motion.div>
            )
          )}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 text-gray-400 max-w-2xl"
        >
          Every industry needs a different approach and we build strategies
          accordingly.
        </motion.p>
      </div>
    </section>
  );
}
