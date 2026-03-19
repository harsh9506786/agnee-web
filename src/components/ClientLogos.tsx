import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
const logos = [
'TechVenture',
'AgriGrow',
'MedCare Plus',
'EduLeap',
'BuildRight',
'RetailEdge',
'SaaSify',
'GreenField',
'UrbanBuild',
'DataFlow',
'TechVenture',
'AgriGrow',
'MedCare Plus',
'EduLeap',
'BuildRight',
'RetailEdge',
'SaaSify',
'GreenField',
'UrbanBuild',
'DataFlow'];

export function ClientLogos() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px'
  });
  return (
    <section ref={ref} className="relative py-20 bg-dark-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          initial={{
            opacity: 0,
            y: 24
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
          className="text-center mb-12">
          
          <span className="text-xs font-syne font-700 text-flame-500 tracking-widest uppercase block mb-4">
            Our Clients
          </span>
          <h2
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              letterSpacing: '-0.03em'
            }}>
            
            Brands That <span className="text-flame">Trust Agnee</span>
          </h2>
        </motion.div>

        <div className="relative overflow-hidden">
          <div className="absolute left-0 inset-y-0 w-28 bg-gradient-to-r from-dark-800 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-28 bg-gradient-to-l from-dark-800 to-transparent z-10 pointer-events-none" />
          <div className="flex marquee-track">
            {logos.map((logo, i) =>
            <div
              key={i}
              className="flex-shrink-0 mx-6 px-7 py-4 rounded-xl border border-[rgba(255,255,255,0.05)] bg-dark-700 hover:border-[rgba(255,90,0,0.3)] hover:bg-[rgba(255,90,0,0.04)] transition-all duration-300 group cursor-default">
              
                <span className="font-syne font-700 text-[#333] group-hover:text-flame-500 transition-colors duration-300 whitespace-nowrap text-sm tracking-wide">
                  {logo}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}