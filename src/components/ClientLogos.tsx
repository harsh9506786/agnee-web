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
function ClientLogos() {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const DOT_COUNT = 6;
  const ITEMS_PER_DOT = Math.ceil(logos.length / DOT_COUNT);
  // 21 / 6 = ~3.5 → 4

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);

  const duplicatedLogos = [...logos, ...logos];

  // 🔥 ACTIVE INDEX
  const updateActiveIndex = () => {
    const container = scrollRef.current;
    if (!container) return;

    const item = container.firstElementChild;
    if (!(item instanceof HTMLElement)) return;

    const itemWidth = item.clientWidth + 24;

    const rawIndex = Math.floor(container.scrollLeft / itemWidth);

    // 🔥 normalize (important)
    const normalizedIndex = rawIndex % logos.length;

    const index = Math.floor(normalizedIndex / ITEMS_PER_DOT);

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

    const interval = setInterval(() => {
      if (!isPaused) {
        container.scrollLeft += 0.7;

        updateActiveIndex(); // 🔥 sync dots

        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft -= container.scrollWidth / 2;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused, isDesktop]);

  // arrows
  const scrollLeft = () => {
    const container = scrollRef.current;
    if (!container) return;

    setIsPaused(true);
    container.scrollBy({ left: -400, behavior: "smooth" });

    setTimeout(() => {
      updateActiveIndex();
      setIsPaused(false);
    }, 400);
  };

  const scrollRight = () => {
    const container = scrollRef.current;
    if (!container) return;

    setIsPaused(true);
    container.scrollBy({ left: 400, behavior: "smooth" });

    setTimeout(() => {
      updateActiveIndex();
      setIsPaused(false);
    }, 400);
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
          <span className="inline-block text-xs font-semibold tracking-[0.25em] mb-6 uppercase px-3 py-1.5 rounded-full text-orange-500 bg-orange-500/10 border border-orange-500/20">
            Our Clients
          </span>

          <h2 className="font-zendots font-extrabold text-white text-[clamp(2rem,4vw,3.2rem)]">
            Brands That <span className="text-flame">Trust Agnee</span>
          </h2>
        </motion.div>

        {/* Scroll Section */}
        <div className="relative flex items-center overflow-visible">
          {/* LEFT */}
          {isDesktop && (
            <button
              onClick={scrollLeft}
              className="absolute -left-24 z-20 bg-dark-700 hover:bg-dark-900 text-white w-10 h-10 rounded-full flex items-center justify-center"
            >
              &#10094;
            </button>
          )}

          {/* SCROLL */}
          <div
            ref={scrollRef}
            onTouchStart={() => setIsUserScrolling(true)}
            onScroll={() => {
              const container = scrollRef.current;
              if (!container) return;

              updateActiveIndex(); // 🔥

              if (isUserScrolling) setShowHints(false);

              if (container.scrollLeft <= 5) {
                setShowHints(true);
                setIsUserScrolling(false);
              }
            }}
            className="flex gap-6 overflow-x-auto py-2 scroll-smooth no-scrollbar"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedLogos.map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 px-6 py-4 rounded-xl border border-gray-400 hover:border-orange-400/30 hover:bg-orange-400/5 transition"
              >
                <span className="text-white whitespace-nowrap">{logo}</span>
              </div>
            ))}
          </div>

          {isDesktop && (
            <button
              onClick={scrollRight}
              className="absolute -right-24 z-20 bg-dark-700 hover:bg-dark-900 text-white w-10 h-10 rounded-full flex items-center justify-center"
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

                const item = container.firstElementChild;
                if (!(item instanceof HTMLElement)) return;

                const itemWidth = item.clientWidth + 24;

                const ITEMS_PER_DOT = Math.ceil(logos.length / DOT_COUNT);

                const targetIndex = i * ITEMS_PER_DOT;

                // last dot → force end
                const finalIndex =
                  i === DOT_COUNT - 1
                    ? logos.length - ITEMS_PER_DOT
                    : targetIndex;

                container.scrollTo({
                  left: finalIndex * itemWidth,
                  behavior: "smooth",
                });
              }}
              className={`transition-all duration-300 rounded-full ${
                i === activeIndex
                  ? "w-6 h-2 bg-orange-500"
                  : "w-2 h-2 bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientLogos;
