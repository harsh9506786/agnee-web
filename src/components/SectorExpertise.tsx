import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircleIcon } from "lucide-react";
import saasIcon from "../assets/industryicons/Icons-01.png";
import healthcareIcon from "../assets/industryicons/Icons-02.png";
import agriIcon from "../assets/industryicons/Icons-03.png";
import educationIcon from "../assets/industryicons/Icons-04.png";
import realestateIcon from "../assets/industryicons/Icons-05.png";
import ecommerceIcon from "../assets/industryicons/Icons-06.png";
import corporateIcon from "../assets/industryicons/Icons-07.png";
import manufacturingIcon from "../assets/industryicons/Icons-08.png";
import politicalIcon from "../assets/industryicons/Icons-09.png";
import startupIcon from "../assets/industryicons/Icons-10.png";

const industries = [
  { name: "SaaS and Technology", icon: saasIcon },
  { name: "Healthcare and Hospitals", icon: healthcareIcon },
  { name: "Agriculture and Agri-Business", icon: agriIcon },
  { name: "Education and Coaching Centers", icon: educationIcon },
  { name: "Real Estate and Builders", icon: realestateIcon },
  { name: "Ecommerce and Retail", icon: ecommerceIcon },
  { name: "Corporate B2B and B2C", icon: corporateIcon },
  { name: "Manufacturing and Industrial", icon: manufacturingIcon },
  { name: "Political Campaigns", icon: politicalIcon },
  { name: "Startups and Entrepreneurs", icon: startupIcon },
];

// duplicate for infinite scroll

function SectorExpertise() {
  const loopedIndustries = useMemo(() => [...industries, ...industries], []);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [isDesktop, setIsDesktop] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const isHoveredRef = useRef(false);

  const DOT_COUNT = 6;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);

  const pauseTemporarily = () => {
    isHoveredRef.current = true;

    if (resumeTimeout.current) {
      clearTimeout(resumeTimeout.current);
    }

    resumeTimeout.current = setTimeout(() => {
      isHoveredRef.current = false;
    }, 250);
  };

  const position = useRef(0);
  const targetPosition = useRef(0);

  const updateActiveIndex = () => {
    const track = trackRef.current;
    if (!track) return;

    const item = track.firstElementChild as HTMLElement;
    if (!item) return;

    const itemWidth = item.clientWidth + 16;

    const rawIndex = Math.round(position.current / itemWidth);
    const normalizedIndex = rawIndex % industries.length;

    const itemsPerDot = industries.length / DOT_COUNT;
    const index = Math.floor(normalizedIndex / itemsPerDot);

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

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = isDesktop ? 0.3 : 0.3;

    const animate = () => {
      if (!isHoveredRef.current) {
        targetPosition.current += speed;
      }

      const ease = 0.08;
      position.current += (targetPosition.current - position.current) * ease;

      const halfWidth = track.scrollWidth / 2;

      // ✅ smooth infinite loop
      if (position.current >= halfWidth) {
        position.current -= halfWidth;
        targetPosition.current -= halfWidth;
      }

      if (position.current < 0) {
        position.current += halfWidth;
        targetPosition.current += halfWidth;
      }

      track.style.transform = `translateX(-${position.current}px)`;

      updateActiveIndex();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isDesktop]);

  const scrollLeft = () => {
    pauseTemporarily();
    targetPosition.current -= 300;
  };

  const scrollRight = () => {
    pauseTemporarily();
    targetPosition.current += 300;
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

          <h2 className="font-changa text-white mt-4 text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95]">
            Industries We <span className="text-flame">Serve</span>
          </h2>

          <p className="text-gray-400 mt-4 max-w-none lg:whitespace-nowrap text-base sm:text-md lg:text-lg xl:text-xl mx-auto lg:mx-0">
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

          {/* VIEWPORT */}
          <div className="overflow-hidden w-full px-6">
            <div
              ref={trackRef}
              onMouseEnter={() => (isHoveredRef.current = true)}
              onMouseLeave={() => {
                isHoveredRef.current = false;
              }}
              onTouchStart={(e) => {
                isDragging.current = true;
                isHoveredRef.current = true;

                startX.current = e.touches[0].clientX;
                lastX.current = e.touches[0].clientX;
              }}
              onTouchMove={(e) => {
                if (!isDragging.current) return;

                const x = e.touches[0].clientX;
                const delta = x - lastX.current;

                // movement apply
                position.current -= delta;
                targetPosition.current -= delta;

                // velocity track
                velocity.current = delta;

                lastX.current = x;
              }}
              onTouchEnd={() => {
                isDragging.current = false;

                let momentum = velocity.current;

                const applyMomentum = () => {
                  if (Math.abs(momentum) < 0.1) return;

                  momentum *= 0.95; // friction (slow down)

                  position.current -= momentum;
                  targetPosition.current -= momentum;

                  requestAnimationFrame(applyMomentum);
                };

                applyMomentum();

                setTimeout(() => {
                  isHoveredRef.current = false;
                }, 150);
              }}
              style={{
                width: "max-content",
                willChange: "transform",
              }}
              className="flex gap-4 py-2 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x scrollbar-hide"
            >
              {loopedIndustries.map((ind, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: Math.min(i * 0.03, 0.3) }}
                  style={{ willChange: "transform, opacity" }}
                  className="flex-shrink-0 w-[260px] snap-start p-6 rounded-2xl bg-dark-700 border border-white/5"
                >
                  <img
                    src={ind.icon}
                    alt={ind.name}
                    className="w-8 h-8 mb-4 object-contain"
                  />
                  <div className="text-white font-semibold">{ind.name}</div>
                </motion.div>
              ))}
            </div>
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
                const item = trackRef.current?.firstElementChild;
                if (!item) return;

                const itemWidth = item.clientWidth + 16;

                const targetIndex = Math.floor(
                  (i / DOT_COUNT) * industries.length,
                );

                targetPosition.current = targetIndex * itemWidth;

                updateActiveIndex();
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

export default SectorExpertise;
