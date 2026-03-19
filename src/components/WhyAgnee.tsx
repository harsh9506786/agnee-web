import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CompassIcon,
  CpuIcon,
  BarChart3Icon,
  LayersIcon,
  ZapIcon,
  MessageSquareIcon } from
'lucide-react';
const items = [
{
  icon: CompassIcon,
  title: 'Strategy Before Execution',
  desc: 'We define clarity before creating campaigns.'
},
{
  icon: CpuIcon,
  title: 'AI Combined With Human Creativity',
  desc: 'Technology enhances our creativity, it does not replace it.'
},
{
  icon: BarChart3Icon,
  title: 'Performance Driven Systems',
  desc: 'We focus on measurable growth, not vanity metrics.'
},
{
  icon: LayersIcon,
  title: 'Startup Friendly & Scalable',
  desc: 'Solutions designed for businesses at every growth stage.'
},
{
  icon: ZapIcon,
  title: 'Faster Releases, Fewer Bugs',
  desc: 'Technical accuracy and structured workflows.'
},
{
  icon: MessageSquareIcon,
  title: 'Transparent Communication',
  desc: 'Clear reporting, consistent updates and accountability.'
}];

export function WhyAgnee() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px'
  });
  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-900 overflow-hidden">
      
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
          'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,90,0,0.025) 0%, transparent 70%)'
        }} />
      

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
          className="mb-16">
          
          <span className="text-xs font-syne font-700 text-flame-500 tracking-widest uppercase block mb-4">
            Our Advantage
          </span>
          <h2
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95
            }}>
            
            Why Businesses <span className="text-flame">Work With Us</span>
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
                  duration: 0.6,
                  delay: i * 0.09,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="flex gap-5 p-6 rounded-2xl bg-dark-800 border border-[rgba(255,255,255,0.04)] hover:border-[rgba(255,90,0,0.2)] transition-all duration-300 group">
                
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[rgba(255,90,0,0.08)] flex items-center justify-center group-hover:bg-[rgba(255,90,0,0.16)] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-flame-500" />
                </div>
                <div>
                  <h3 className="font-syne font-700 text-white text-sm mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#555] font-inter leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>);

          })}
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
            delay: 0.7
          }}
          className="mt-12 text-center font-syne font-700 text-[#555]">
          
          We are not just service providers.{' '}
          <span className="text-flame">We operate as growth partners.</span>
        </motion.p>
      </div>
    </section>);

}