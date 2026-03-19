import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircleIcon } from 'lucide-react';
const industries = [
'SaaS and Technology',
'Healthcare and Hospitals',
'Agriculture and Agri-Business',
'Education and Coaching Centers',
'Real Estate and Builders',
'Ecommerce and Retail',
'Corporate B2B and B2C',
'Manufacturing and Industrial',
'Political Campaigns',
'Startups and Entrepreneurs'];

export function SectorExpertise() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px'
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-800 overflow-hidden">
      
      {/* Neural network bg */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {[
          [120, 100],
          [350, 60],
          [580, 140],
          [800, 80],
          [1050, 120],
          [200, 280],
          [450, 320],
          [700, 260],
          [950, 300],
          [150, 440],
          [400, 480],
          [650, 420],
          [900, 460]].
          map(([x, y], i) =>
          <g key={i}>
              <circle cx={x} cy={y} r="5" fill="#ff5a00" />
              <circle cx={x} cy={y} r="18" fill="#ff5a00" opacity="0.3" />
            </g>
          )}
          {[
          [120, 100, 350, 60],
          [350, 60, 580, 140],
          [580, 140, 800, 80],
          [800, 80, 1050, 120],
          [120, 100, 200, 280],
          [350, 60, 450, 320],
          [580, 140, 700, 260],
          [800, 80, 950, 300],
          [200, 280, 450, 320],
          [450, 320, 700, 260],
          [700, 260, 950, 300],
          [200, 280, 150, 440],
          [450, 320, 400, 480],
          [700, 260, 650, 420],
          [950, 300, 900, 460]].
          map(([x1, y1, x2, y2], i) =>
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#ff5a00"
            strokeWidth="0.6" />

          )}
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={
          inView ?
          {
            opacity: 1,
            y: 0
          } :
          {}
          }
          transition={{
            duration: 0.7
          }}
          className="mb-14">
          
          <span className="text-xs font-syne font-700 text-flame-500 tracking-widest uppercase block mb-4">
            Sector Focus
          </span>
          <h2
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95
            }}>
            
            Industries We <span className="text-flame">Serve</span>
          </h2>
          <p className="text-[#555] font-inter mt-4 max-w-xl">
            Our strategies are built for real businesses across multiple
            sectors.
          </p>
        </motion.div>

        {/* Horizontal scroll cards */}
        <div ref={scrollRef} className="h-scroll-container pb-4">
          <div
            className="flex gap-4"
            style={{
              width: 'max-content'
            }}>
            
            {industries.map((ind, i) =>
            <motion.div
              key={ind}
              initial={{
                opacity: 0,
                x: 40,
                rotate: 2
              }}
              animate={
              inView ?
              {
                opacity: 1,
                x: 0,
                rotate: 0
              } :
              {}
              }
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="group flex-shrink-0 w-[260px] p-6 rounded-2xl bg-dark-700 border border-[rgba(255,255,255,0.05)] hover:border-[rgba(255,90,0,0.35)] hover:bg-dark-900 transition-all duration-350 cursor-default">
              
                <CheckCircleIcon className="w-5 h-5 text-flame-500 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <div className="font-syne font-700 text-white text-base leading-tight group-hover:text-flame-400 transition-colors duration-300">
                  {ind}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <motion.p
          initial={{
            opacity: 0,
            y: 16
          }}
          animate={
          inView ?
          {
            opacity: 1,
            y: 0
          } :
          {}
          }
          transition={{
            duration: 0.7,
            delay: 0.8
          }}
          className="mt-10 text-[#444] font-inter text-sm max-w-2xl">
          
          Each industry requires a different communication style, sales funnel
          and digital structure. We build strategies accordingly.
        </motion.p>
      </div>
    </section>);

}