import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/agneelogo/Agnee Logo.png"; // apne path ke according change karo
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
          <div className=" flex justify-center items-center">
            <motion.img
              src={logo}
              alt="Agnee Logo"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-[180px] h-[150px] object-contain"
              style={{
                filter: "drop-shadow(0 0 20px rgba(255,107,0,0.6))",
              }}
            />
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
            className="mb-4 text-center"
          >
          
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
          <p className="mt-2 text-xs text-gray-300 tracking-widest">
            {progress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
