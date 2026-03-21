import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CompassIcon,
  CpuIcon,
  BarChart3Icon,
  LayersIcon,
  MessageSquareIcon,
  RocketIcon,
} from "lucide-react";
const items = [
  {
    icon: CompassIcon,
    title: "Strategy First Approach",
    desc: "We focus on strategy before execution so every campaign has clarity and direction.",
  },
  {
    icon: CpuIcon,
    title: "AI Powered Creativity",
    desc: "We combine AI with human creativity to deliver better and faster results.",
  },
  {
    icon: BarChart3Icon,
    title: "Performance Driven Systems",
    desc: "We build performance driven systems that focus on real growth instead of vanity metrics.",
  },
  {
    icon: LayersIcon,
    title: "Scalable Growth Solutions",
    desc: "We offer startup friendly and scalable solutions that grow with your business.",
  },

  {
    icon: MessageSquareIcon,
    title: "Transparent Communication Always",
    desc: "We maintain transparent communication with clear reporting and regular updates.",
  },
  {
    icon: RocketIcon,
    title: "Your Growth Partner",
    desc: "We work as your growth partner and not just a service provider.",
  },
];

export function WhyAgnee() {
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
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,90,0,0.025) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 lg:text-left text-center"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.25em] mb-6 uppercase px-3 py-1.5 rounded-full mx-auto lg:mx-0"
            style={{
              color: "#FF6B00",
              background: "rgba(255,107,0,0.08)",
              border: "1px solid rgba(255,107,0,0.2)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Our Advantages
          </span>
          <h2 className="font-syne font-extrabold text-white text-[clamp(2rem,7vw,4.5rem)] sm:text-[clamp(2.3rem,6vw,4.5rem)] leading-[1] break-words px-2 lg:px-0">
            Why Businesses <span className="text-flame">Work With us</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
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
                  duration: 0.6,
                  delay: i * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex gap-5 p-6 rounded-2xl bg-dark-800 border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,90,0,0.2)] transition-all duration-300 group"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[rgba(255,90,0,0.08)] flex items-center justify-center group-hover:bg-[rgba(255,90,0,0.16)] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-flame-500" />
                </div>
                <div>
                  <h3 className="font-syne font-700 text-white text-sm mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-inter leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
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
            delay: 0.7,
          }}
          className="mt-12 text-center font-syne font-700 text-gray-400"
        >
          We are not just service providers.{" "}
          <span className="text-flame">We operate as growth partners.</span>
        </motion.p>
      </div>
    </section>
  );
}
