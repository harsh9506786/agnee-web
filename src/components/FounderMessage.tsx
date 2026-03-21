import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import shubhamimg2 from "../assets/team/shubhamjoshi2.png";
export function FounderMessage() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-900 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 30% 50%, rgba(255,90,0,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
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
            duration: 0.6,
          }}
          className="mb-16"
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
            From the Founder
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex justify-center lg:justify-end h-full"
          >
            <div className="relative w-full max-w-[450px] h-full flex items-end justify-center">
              {/* FULL HEIGHT IMAGE */}
              <img
                src={shubhamimg2}
                alt="Shubham Joshi"
                className="h-full w-full object-contain z-10 drop-shadow-[0_25px_50px_rgba(0,0,0,0.7)]"
              />

              {/* Badge */}
              <div className="absolute bottom-10 right-2 px-5 py-2.5 rounded-xl z-50 bg-[rgba(255,90,0,0.18)] border border-[rgba(255,90,0,0.4)] backdrop-blur-md shadow-[0_10px_30px_rgba(255,90,0,0.2)]">
                <div className="text-sm font-syne font-700 text-flame-400">
                  Founder & CEO
                </div>
              </div>
            </div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{
              opacity: 0,
              x: 40,
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
              duration: 0.9,
              delay: 0.3,
            }}
            className="space-y-6"
          >
            <h2
              className="font-syne font-extrabold text-white"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
              }}
            >
              <span className="block">A Message</span>
              <span className="text-flame block">from Founder</span>
            </h2>

            {[
              "Agnee was built on a simple belief that every business deserves clarity, structure and intelligent growth.",
              "In a world filled with noise and random digital activity, we focus on building systems that scale. We combine creative vision with technical precision and AI intelligence to deliver real business impact.",
              "If you are serious about growing your brand with strategy and execution, we would love to work with you.",
            ].map((p, i) => (
              <motion.p
                key={i}
                initial={{
                  opacity: 0,
                  y: 14,
                  filter: "blur(4px)",
                }}
                animate={
                  inView
                    ? {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                      }
                    : {}
                }
                transition={{
                  duration: 0.6,
                  delay: 0.5 + i * 0.14,
                }}
                className="text-[#777] font-inter leading-relaxed"
              >
                {p}
              </motion.p>
            ))}

            <div className="pt-4 border-t border-[rgba(255,255,255,0.05)]">
              <div className="font-syne font-800 text-white text-xl">
                Shubham Joshi
              </div>
              <div className="text-xs text-flame-500 font-syne font-600 mt-1 tracking-wide">
                Founder & CEO, Agnee
              </div>
            </div>

            <motion.a
              href="tel:9696933327"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="btn-flame inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm mt-2"
            >
              <span>Book a Strategy Call</span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
