import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

import fireimg from "../assets/agneelogo/Fire1.webp";

const lines = [
  "A Growth Focused Branding and Digital Marketing Agency",
  "Agnee is built for businesses that want more than just designs and random marketing activities. We work with startups, SaaS companies, agribusinesses, enterprises and political leaders to build structured and scalable growth systems.",
  "We combine branding, technology, content and performance marketing to create a strong digital presence that delivers measurable results.",
  "Our approach is simple. We focus on clarity, positioning and execution. Every strategy is built to generate real growth, not just impressions.",
  "Whether you are launching a new product, entering a new market or building authority in your industry, Agnee helps you move forward with confidence and consistency.",
];

function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-800 overflow-visible"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 70% at 25% 50%, rgba(255,90,0,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center text-center lg:text-left">
          {/* LEFT */}
          <div className="flex flex-col items-center lg:items-start">
            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={
                inView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.8,
              }}
            >
              <div
                className="font-syne font-extrabold overflow-visible"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                }}
              >
                <div className="flex flex-col items-center lg:items-start">
                  <div className="text-white">ABOUT</div>
                  <div className="text-flame">AGNEE</div>
                </div>
              </div>
            </motion.div>

            <div className="mt-10 space-y-5">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }} // y reduced, blur removed
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.25 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="text-[#777] font-inter leading-relaxed text-base text-center lg:text-left"
                >
                  {line}
                </motion.p>
              ))}
            </div>

            <motion.div
              initial={{
                opacity: 0,
                y: 16,
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
                delay: 1.0,
              }}
              className="mt-10 p-5 rounded-2xl border text-center lg:text-left border-[rgba(255,90,0,0.14)] bg-[rgba(255,90,0,0.04)]"
            >
              <div className="flex flex-wrap items-center gap-2 text-sm font-syne font-700">
                <span className="text-white">Human Intelligence</span>
                <span className="text-flame-500 text-lg">+</span>
                <span className="text-white">AI Efficiency</span>
                <span className="text-flame-500 text-lg">+</span>
                <span className="text-white">Relentless Execution</span>
                <span className="text-flame-500 text-lg">=</span>
                <span className="text-flame font-800">Brands That Win.</span>
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full items-center lg:items-start mt-10"
            >
              <motion.a
                href="tel:9696933327"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                className="btn-flame w-full sm:w-auto justify-center inline-flex items-center gap-3 px-8 py-4 rounded-full text-base font-syne font-700 pulse-glow"
              >
                <span>Connect with us</span>
              </motion.a>

              <motion.button
                onClick={() => {
                  const el = document.getElementById("contact");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-6 sm:px-7 py-3.5 rounded-full font-semibold transition-all duration-300 hover:text-[#FF6B00] hover:border-[#FF6B00] hover:bg-[rgba(255,107,0,0.05)] hover:shadow-[0_0_10px_rgba(255,107,0,0.4)] text-center"
                style={{
                  color: "#E5E5E5",
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.03)",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Book a call
              </motion.button>
            </motion.div>
          </div>

          {/* RIGHT: 3D */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.85,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    scale: 1,
                  }
                : {}
            }
            transition={{
              duration: 1.1,
              delay: 0.3,
            }}
            className="relative h-[320px] sm:h-[380px] lg:h-[480px] flex justify-center lg:justify-end lg:pl-10 lg:-mt-60"
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(255,90,0,0.09) 0%, transparent 70%)",
              }}
            />
            <div className="w-full max-w-[250px] sm:max-w-[280px] lg:max-w-none mx-auto lg:mx-0">
              <img
                src={fireimg}
                alt="Agnee Visual"
                className="w-full h-auto object-contain"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
