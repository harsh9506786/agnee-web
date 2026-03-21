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

  // 🔥 Infinite auto-scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollSpeed = 0.7;

    const interval = setInterval(() => {
      if (!isHovered) {
        container.scrollLeft += scrollSpeed;

        // seamless loop
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered]);

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
          className="mb-14"
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

          <p className="text-gray-400 mt-4 max-w-2xl">
            We work across multiple industries with customized strategies.
          </p>
        </motion.div>

        {/* Scroll Wrapper */}
        <div className="relative flex items-center overflow-visible">
          {/* 🌫️ Left Fade */}
          <div
            className="pointer-events-none absolute left-0 top-0 h-full w-16 z-10"
            style={{
              background: "linear-gradient(to right, #0f0f0f, transparent)",
            }}
          />

          {/* 🌫️ Right Fade */}
          <div
            className="pointer-events-none absolute right-0 top-0 h-full w-16 z-10"
            style={{
              background: "linear-gradient(to left, #0f0f0f, transparent)",
            }}
          />

          {/* ⬅️ Left Button */}
          <button
            onClick={scrollLeft}
            className="absolute -left-20 z-20 w-10 h-10 rounded-full flex items-center justify-center
            bg-dark-700 hover:bg-dark-900 text-white
            transition-all duration-300 hover:scale-110
            hover:shadow-[0_0_15px_rgba(255,107,0,0.6)]"
          >
            &#10094;
          </button>

          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-4 py-2 scroll-smooth no-scrollbar"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {loopedIndustries.map((ind, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="flex-shrink-0 w-[260px] p-6 rounded-2xl bg-dark-700 border border-white/5
                hover:border-orange-500/40 hover:bg-dark-900 transition-all duration-300"
              >
                <CheckCircleIcon className="w-5 h-5 text-orange-500 mb-4" />
                <div className="text-white font-semibold">{ind}</div>
              </motion.div>
            ))}
          </div>

          {/* ➡️ Right Button */}
          <button
            onClick={scrollRight}
            className="absolute -right-20 z-20 w-10 h-10 rounded-full flex items-center justify-center
            bg-dark-700 hover:bg-dark-900 text-white
            transition-all duration-300 hover:scale-110
            hover:shadow-[0_0_15px_rgba(255,107,0,0.6)]"
          >
            &#10095;
          </button>
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
