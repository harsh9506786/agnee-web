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

// duplicate for infinite scroll
const loopedIndustries = [...industries, ...industries];

export function SectorExpertise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const DOT_COUNT = 6;

  // 🔥 ACTIVE INDEX CALCULATOR
  const updateActiveIndex = () => {
    const container = scrollRef.current;
    if (!container) return;

    const item = container.firstElementChild as HTMLElement;
    if (!item) return;

    const itemWidth = item.clientWidth + 16; // gap-4

    const rawIndex =
      Math.round(container.scrollLeft / itemWidth) % industries.length;

    // map 10 → 6
    const index = Math.floor((rawIndex / industries.length) * DOT_COUNT);

    setActiveIndex(index);

    setActiveIndex(index);
  };

  // detect desktop
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

  // auto scroll
  useEffect(() => {
    if (!isDesktop) return;

    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 0.7;

    const interval = setInterval(() => {
      if (!isHovered) {
        container.scrollLeft += scrollSpeed;

        updateActiveIndex(); // 🔥 sync dots

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered, isDesktop]);

  // arrows
  const scrollLeft = () => {
    if (!scrollRef.current) return;

    setIsHovered(true);
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });

    setTimeout(() => {
      updateActiveIndex();
      setIsHovered(false);
    }, 400);
  };

  const scrollRight = () => {
    if (!scrollRef.current) return;

    setIsHovered(true);
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

    setTimeout(() => {
      updateActiveIndex();
      setIsHovered(false);
    }, 400);
  };

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center lg:text-left"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full text-orange-500 bg-orange-500/10 border border-orange-500/20">
            Our Services
          </span>

          <h2 className="font-syne font-extrabold text-white mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
            Industries We <span className="text-flame">Serve</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto lg:mx-0">
            We work across multiple industries with customized strategies.
          </p>
        </motion.div>

        {/* Scroll Wrapper */}
        <div className="relative flex items-center">
          {isDesktop && (
            <button
              onClick={scrollLeft}
              className="absolute -left-20 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-dark-700 hover:bg-dark-900 text-white"
            >
              &#10094;
            </button>
          )}

          {/* SCROLL CONTAINER */}
          <div
            ref={scrollRef}
            onTouchStart={() => setIsUserScrolling(true)}
            onScroll={() => {
              const container = scrollRef.current;
              if (!container) return;

              updateActiveIndex(); // 🔥 MAIN

              if (container.scrollLeft <= 5) {
                setShowHints(true);
                setIsUserScrolling(false);
              }
            }}
            className="flex gap-4 overflow-x-auto px-4 py-2 scroll-smooth no-scrollbar"
          >
            {loopedIndustries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                className="flex-shrink-0 w-[260px] p-6 rounded-2xl bg-dark-700 border border-white/5"
              >
                <CheckCircleIcon className="w-5 h-5 text-orange-500 mb-4" />
                <div className="text-white font-semibold">{ind}</div>
              </motion.div>
            ))}
          </div>

          {isDesktop && (
            <button
              onClick={scrollRight}
              className="absolute -right-20 z-20 w-10 h-10 rounded-full flex items-center justify-center bg-dark-700 hover:bg-dark-900 text-white"
            >
              &#10095;
            </button>
          )}
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const container = scrollRef.current;
                if (!container) return;

                const item = container.firstElementChild as HTMLElement;
                if (!item) return;

                const itemWidth = item.clientWidth + 16;

                const targetIndex = Math.floor(
                  (i / DOT_COUNT) * industries.length,
                );

                container.scrollTo({
                  left: targetIndex * itemWidth,
                  behavior: "smooth",
                });
              }}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex
                  ? "w-6 h-2 bg-flame-500"
                  : "w-2 h-2 bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
