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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);

  const position = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);

  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const duplicatedLogos = [...logos, ...logos];
  const targetPosition = useRef(0);
  const velocity = useRef(0);
  const pauseTemporarily = () => {
    setIsPaused(true);

    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }

    resumeTimeout.current = setTimeout(() => {
      setIsPaused(false);
    }, 300); // adjust delay if needed
  };
  // ✅ detect desktop
  useEffect(() => {
    const check = () => {
      setIsDesktop(
        window.matchMedia("(pointer: fine)").matches &&
          window.innerWidth >= 1024,
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🔥 NETFLIX AUTO SCROLL (core)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 0.5;

    const animate = () => {
      if (!isDragging.current) {
        if (!isPaused) {
          targetPosition.current += speed;
        }

        const ease = 0.08;

        // smooth move towards target
        position.current += (targetPosition.current - position.current) * ease;

        // infinite loop
        const halfWidth = track.scrollWidth / 2;

        if (position.current >= halfWidth) {
          position.current -= halfWidth;
          targetPosition.current -= halfWidth;
        }

        if (position.current < 0) {
          position.current += halfWidth;
          targetPosition.current += halfWidth;
        }

        track.style.transform = `translateX(-${position.current}px)`;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused]);

  // 🔥 TOUCH (mobile swipe)
  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    setIsPaused(true);
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentX = e.touches[0].clientX;
    const diff = startX.current - currentX;

    velocity.current = diff; // track speed
    targetPosition.current += diff * 1.2;

    startX.current = currentX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;

    // 👇 inertia feel
    targetPosition.current += velocity.current * 10;

    setIsPaused(false);
  };

  const scrollLeft = () => {
    pauseTemporarily();
    targetPosition.current -= 300;
  };

  const scrollRight = () => {
    pauseTemporarily();
    targetPosition.current += 300;
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

          <h2 className="font-changa text-white text-[clamp(2rem,4vw,3.2rem)]">
            Brands That <span className="text-flame">Trust Agnee</span>
          </h2>
        </motion.div>

        <div className="flex items-center gap-4">
          {/* LEFT BUTTON */}
          {isDesktop && (
            <button
              onClick={scrollLeft}
              className="bg-dark-700 hover:bg-dark-900 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            >
              &#10094;
            </button>
          )}

          {/* TRACK WRAPPER */}
          <div
            className="overflow-hidden flex-1"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={trackRef}
              className="flex gap-6 py-2"
              style={{
                width: "max-content",
                willChange: "transform",
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
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
          </div>

          {/* RIGHT BUTTON */}
          {isDesktop && (
            <button
              onClick={scrollRight}
              className="bg-dark-700 hover:bg-dark-900 text-white w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
            >
              &#10095;
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ClientLogos;
