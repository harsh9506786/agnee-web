import React, { useRef, useEffect, useState, useCallback } from "react";
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

const DOT_COUNT = 6;

function dotToIndex(dotI: number, visibleCount: number): number {
  const maxIdx = logos.length - visibleCount;
  if (dotI === DOT_COUNT - 1) return maxIdx;
  return Math.round((dotI / (DOT_COUNT - 1)) * maxIdx);
}

function indexToDot(idx: number, visibleCount: number): number {
  const maxIdx = logos.length - visibleCount;
  if (maxIdx <= 0) return 0;
  return Math.min(Math.round((idx / maxIdx) * (DOT_COUNT - 1)), DOT_COUNT - 1);
}

function getVisibleCount(width: number): number {
  if (width < 480) return 2;
  if (width < 768) return 3;
  return 4;
}

function ClientLogos() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [itemWidth, setItemWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartXRef = useRef(0);
  const isPausedRef = useRef(false);

  // isPaused ko ref mein bhi sync karo taaki interval mein stale closure na ho
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // Desktop detect
  useEffect(() => {
    const check = () => {
      setIsDesktop(
        window.matchMedia("(pointer: fine)").matches &&
          window.innerWidth >= 768,
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Measure item width + visible count
  const measure = useCallback(() => {
    const track = trackRef.current;
    const inner = innerRef.current;
    if (!track || !inner) return;
    const vc = getVisibleCount(track.offsetWidth);
    setVisibleCount(vc);
    const first = inner.firstElementChild as HTMLElement | null;
    if (first) setItemWidth(first.offsetWidth + 16);
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Apply transform
  useEffect(() => {
    const inner = innerRef.current;
    if (!inner || itemWidth === 0) return;
    inner.style.transition = "transform 0.4s ease";
    inner.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }, [currentIndex, itemWidth]);

  const maxIndex = logos.length - visibleCount + 1;

  const goTo = useCallback(
    (idx: number) => {
      setCurrentIndex(Math.max(0, Math.min(idx, maxIndex)));
    },
    [maxIndex],
  );

  const stepNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const stepPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Auto play
  const startAuto = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      if (!isPausedRef.current) {
        setCurrentIndex((prev) => {
          const max = logos.length - visibleCount;
          return prev >= max ? 0 : prev + 1;
        });
      }
    }, 2200);
  }, [visibleCount]);

  const resetAuto = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    setTimeout(startAuto, 800);
  }, [startAuto]);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [startAuto]);

  // Touch handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsPaused(true);
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
    }
    setIsPaused(false);
    resetAuto();
  };

  const activeDot = indexToDot(currentIndex, visibleCount);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-dark-800 overflow-hidden"
    >
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
          <h2 className="font-changa font-light text-white text-[clamp(2rem,4vw,3.2rem)]">
            Brands That <span className="text-flame">Trust Agnee</span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-center gap-3">
          {/* Left Arrow - sirf desktop pe */}
          {isDesktop && (
            <button
              onClick={() => {
                stepPrev();
                resetAuto();
              }}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-dark-700 hover:bg-dark-600 border border-gray-600 text-white flex items-center justify-center transition"
            >
              &#10094;
            </button>
          )}

          {/* Track */}
          <div
            ref={trackRef}
            className="flex-1 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              ref={innerRef}
              className="flex gap-2.5  pr-4"
              style={{ willChange: "transform" }}
            >
              {logos.map((logo, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-5 py-3.5 rounded-xl border border-gray-500 hover:border-orange-400/40 hover:bg-orange-400/5 transition text-white text-sm whitespace-nowrap"
                >
                  {logo}
                </div>
              ))}
            </div>
          </div>

          {/* Right Arrow - sirf desktop pe */}
          {isDesktop && (
            <button
              onClick={() => {
                stepNext();
                resetAuto();
              }}
              className="flex-shrink-0 w-9 h-9 rounded-full bg-dark-700 hover:bg-dark-600 border border-gray-600 text-white flex items-center justify-center transition"
            >
              &#10095;
            </button>
          )}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(dotToIndex(i, visibleCount));
                resetAuto();
              }}
              className={`transition-all duration-300 rounded-full h-2 ${
                i === activeDot ? "w-6 bg-orange-500" : "w-2 bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientLogos;
