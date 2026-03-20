import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { value: 10, suffix: "+", label: "Years of Experience" },
  { value: 1000, suffix: "+", label: "Projects Completed" },
  { value: 500, suffix: "+", label: "Satisfied Clients" },
  { value: 8, suffix: "+", label: "Countries Served" },
  { value: 15, suffix: "+", label: "Industries Impacted" },
];

/* ─── COUNTER ─── */
function Counter({
  value,
  suffix,
  active,
}: {
  value: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;

    let startTime: number;
    let last = -1;
    const duration = 2000;

    const animate = (time: number) => {
      if (!startTime) startTime = time;

      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(progress * value);

      if (current !== last) {
        setCount(current);
        last = current;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(value);
        setDone(true);
      }
    };

    requestAnimationFrame(animate);
  }, [active, value]);

  return (
    <span
      className="font-syne font-extrabold transition-all duration-500 flex items-baseline justify-center gap-1"
      style={{
        fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
        lineHeight: 1,
        letterSpacing: "-0.02em",
        fontVariantNumeric: "tabular-nums",
        whiteSpace: "nowrap",
      }}
    >
      {/* number */}
      <span className="text-white">{count}</span>

      {/* suffix */}
      <span className="text-flame">{suffix}</span>
    </span>
  );
}

/* ─── MAIN SECTION ─── */
export function ImpactNumbers() {
  const [startCount, setStartCount] = useState(false);

  return (
    <motion.section
      onViewportEnter={() => setStartCount(true)}
      viewport={{ once: true, amount: 0.5 }}
      className="relative py-24 lg:py-36 bg-dark-900 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 50%, rgba(255,90,0,0.035) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 lg:mb-20"
        >
          <h2
            className="font-syne font-extrabold text-white mb-3"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Unleash Your Brand's <span className="text-flame">Potential</span>
          </h2>

          <p className="text-gray-400 font-inter max-w-xl mx-auto text-sm">
            Every number represents businesses that trusted us and scaled with structured execution.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.65,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center"
            >
              <Counter value={s.value} suffix={s.suffix} active={startCount} />

              <div className="mt-3">
                <div className="text-xs font-syne font-700 text-gray-400 uppercase tracking-widest">
                  {s.label}
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.1,
                  }}
                  className="mt-1.5 h-px bg-gradient-to-r from-flame-500 to-flame-700 origin-left"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
