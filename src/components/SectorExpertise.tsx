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

export function SectorExpertise() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      if (!isHovered) {
        scrollContainer.scrollLeft += 1;
        // Loop back to start
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isHovered]);

  // Buttons scroll
  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
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
          <motion.div className="mb-6">
            <span
              className="inline-block text-xs font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
              style={{
                color: "#FF6B00",
                background: "rgba(255,107,0,0.08)",
                border: "1px solid rgba(255,107,0,0.2)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Our Services
            </span>
          </motion.div>
          <h2
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            Industries We <span className="text-flame">Serve</span>
          </h2>
          <p className="text-gray-400 font-inter mt-4 max-w-2xl">
            We work across multiple industries with customized strategies for
            each sector.
          </p>
        </motion.div>

        {/* Scroll + Buttons wrapper */}
        <div className="relative flex items-center">
          {/* Left Button outside scroll */}
          <button
            onClick={scrollLeft}
            className="absolute -left-16 z-20 bg-dark-700 hover:bg-dark-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          >
            &#10094;
          </button>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto px-4 py-2 scroll-smooth"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              scrollbarWidth: "none", // Firefox
            }}
          >
            {industries.map((ind, i) => (
              <motion.div
                key={ind}
                initial={{ opacity: 0, x: 40, rotate: 2 }}
                animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex-shrink-0 w-[260px] p-6 rounded-2xl bg-dark-700 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,90,0,0.35)] hover:bg-dark-900 transition-all duration-350 cursor-default"
              >
                <CheckCircleIcon className="w-5 h-5 text-flame-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="font-syne font-700 text-white text-base leading-tight group-hover:text-flame-400 transition-colors duration-300">
                  {ind}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right Button outside scroll */}
          <button
            onClick={scrollRight}
            className="absolute -right-16 z-20 bg-dark-700 hover:bg-dark-900 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md"
          >
            &#10095;
          </button>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 text-gray-400 font-inter text-md max-w-2xl"
        >
          Every industry needs a different approach and we build strategies
          accordingly.
        </motion.p>
      </div>

    </section>
  );
}
