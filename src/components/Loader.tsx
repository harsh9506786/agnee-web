import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
interface LoaderProps {
  onComplete: () => void;
}
export function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center"
          style={{
            background: "#080808",
          }}
        >
          {/* Sphere */}
          <div className="relative mb-10">
            {/* Outer rings */}
            <div
              className="absolute inset-0 rounded-full border border-orange-500/20"
              style={{
                width: "140px",
                height: "140px",
                top: "-20px",
                left: "-20px",
                animation: "rotate-ring 3s linear infinite",
              }}
            />
            <div
              className="absolute inset-0 rounded-full border border-orange-500/10"
              style={{
                width: "180px",
                height: "180px",
                top: "-40px",
                left: "-40px",
                animation: "rotate-ring 5s linear infinite reverse",
              }}
            />
            {/* Core sphere */}
            <div
              className="animate-loader-pulse"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 35% 35%, #FF9500, #FF6B00, #cc4400)",
                boxShadow:
                  "0 0 40px rgba(255,107,0,0.6), 0 0 80px rgba(255,107,0,0.3), inset 0 0 30px rgba(255,150,0,0.4)",
              }}
            />
            {/* Inner glow lines */}
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <div
                key={angle}
                className="absolute"
                style={{
                  width: "1px",
                  height: "40px",
                  background:
                    "linear-gradient(to bottom, transparent, rgba(255,107,0,0.6), transparent)",
                  top: "30px",
                  left: "50px",
                  transformOrigin: "0.5px 20px",
                  transform: `rotate(${angle}deg)`,
                  opacity: 0.6,
                }}
              />
            ))}
          </div>

          {/* Agency name */}
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.3,
              duration: 0.6,
            }}
            className="mb-8 text-center"
          >
            <h1
              className="text-3xl font-bold tracking-[0.3em] text-white mb-1"
              style={{
                fontFamily: "Syne, sans-serif",
              }}
            >
              AGNEE
            </h1>
            <p className="text-xs tracking-[0.2em] text-gray-500 uppercase">
              Intelligent Growth Platform
            </p>
          </motion.div>

          {/* Loading bar */}
          <div
            className="relative overflow-hidden rounded-full"
            style={{
              width: "200px",
              height: "2px",
              background: "rgba(255,255,255,0.08)",
            }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: "linear-gradient(90deg, #FF6B00, #FF9500)",
                boxShadow: "0 0 10px rgba(255,107,0,0.8)",
              }}
              animate={{
                width: `${progress}%`,
              }}
              transition={{
                duration: 0.1,
                ease: "linear",
              }}
            />
          </div>
          <p className="mt-3 text-xs text-gray-600 tracking-widest">
            {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
