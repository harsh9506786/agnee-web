import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const team = [
  {
    name: "Shubham Joshi",
    role: "Founder & CEO",
    desc: "9+ years in UI/UX, graphic design and brand strategy.",
    
  },
  {
    name: "Rishabh Joshi",
    role: "Co-Founder & Performance Strategist",
    desc: "5+ years in Meta and Google Ads.",
    
  },
  {
    name: "Preveen Bhargava",
    role: "Senior Advisor",
    desc: "Guides long term strategy.",
  
  },
  {
    name: "Rishi Tiwari",
    role: "Chief Experience Officer",
    desc: "Customer journey optimization.",
    
  },
  {
    name: "Shiva Gupta",
    role: "CTO",
    desc: "Tech & automation systems.",
  
  },
  {
    name: "Chitransh Tiwari",
    role: "Creative Head",
    desc: "Creative direction.",
  
  },
  {
    name: "Gungun Soni",
    role: "Lead Design",
    desc: "Visual execution.",
    
  },
];

export function TeamSection() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-800 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(255,90,0,0.025) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
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
            duration: 0.7,
          }}
          className="mb-16"
        >
          <span className="text-xs font-syne font-700 text-flame-500 tracking-widest uppercase block mb-4">
            The Team
          </span>
          <h2
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            Meet The <span className="text-flame">Core Team</span>
          </h2>
          <p className="text-[#555] font-inter mt-4 max-w-xl">
            Behind every successful campaign is a team that understands
            strategy, creativity and execution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{
                opacity: 0,
                y: 40,
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
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="team-card group relative p-6 rounded-2xl bg-dark-700 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,90,0,0.4)] transition-all duration-400 text-center cursor-default"
              style={{
                transition:
                  "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s ease, border-color 0.35s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(-10px)";
                el.style.boxShadow =
                  "0 0 35px rgba(255,90,0,0.22), 0 24px 48px rgba(0,0,0,0.6)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
              }}
            >
              <div className="relative w-20 h-20 mx-auto mb-4">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=}&backgroundColor=b6e3f4`}
                  alt={member.name}
                  className="team-avatar w-full h-full rounded-full ring-2 ring-[rgba(255,90,0,0.25)] group-hover:ring-[rgba(255,90,0,0.6)]"
                />
              </div>
              <h3 className="font-syne font-700 text-white text-sm mb-1">
                {member.name}
              </h3>
              <div className="text-xs font-syne font-600 text-flame-500 mb-3">
                {member.role}
              </div>
              <p className="text-xs text-[#555] font-inter leading-relaxed">
                {member.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={
            inView
              ? {
                  opacity: 1,
                }
              : {}
          }
          transition={{
            duration: 0.7,
            delay: 0.7,
          }}
          className="mt-10 text-center text-[#444] font-inter text-sm"
        >
          We are strategists, designers, developers and marketers working as one
          integrated growth unit.
        </motion.p>
      </div>
    </section>
  );
}
