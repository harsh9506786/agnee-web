import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  PaletteIcon,
  TrendingUpIcon,
  TargetIcon,
  VideoIcon,
  CodeIcon,
  BrainCircuitIcon,
  TestTube2Icon,
  RocketIcon } from
'lucide-react';
const cards = [
{
  icon: PaletteIcon,
  title: 'Brand Strategy & Identity',
  desc: 'Positioning, visual identity, brand guidelines and scalable brand foundations.'
},
{
  icon: TrendingUpIcon,
  title: 'Social Media Growth',
  desc: 'Structured content strategy, premium creatives, audience engagement and performance tracking.'
},
{
  icon: TargetIcon,
  title: 'Performance Marketing',
  desc: 'Meta Ads, Google Ads, YouTube Ads, WhatsApp marketing and ROI driven campaigns.'
},
{
  icon: VideoIcon,
  title: 'Creative & Media Production',
  desc: 'Graphic design, motion graphics, reels, product shoots and brand storytelling.'
},
{
  icon: CodeIcon,
  title: 'Technology & Development',
  desc: 'Websites, mobile apps, dashboards, automation systems and scalable digital infrastructure.'
},
{
  icon: BrainCircuitIcon,
  title: 'AI & Innovation Solutions',
  desc: 'AI powered content systems, automation workflows, predictive marketing and intelligent optimization.'
},
{
  icon: TestTube2Icon,
  title: 'Software Testing & QA',
  desc: 'Manual and automation testing, performance validation and scalable quality assurance.'
},
{
  icon: RocketIcon,
  title: 'Startup Launch Solutions',
  desc: 'Complete launch kits including branding, website, pitch deck, PR and growth setup.'
}];

export function ExpertiseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px'
  });
  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-900 overflow-hidden">
      
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="eg"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse">
              
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="#ff5a00"
                strokeWidth="0.6" />
              
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eg)" />
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
          className="mb-16">
          
          <span className="text-xs font-syne font-700 text-flame-500 tracking-widest uppercase block mb-4">
            Our Services
          </span>
          <h2
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95
            }}>
            
            What We <span className="text-flame">Build</span>
          </h2>
          <p className="text-[#555] font-inter mt-4 max-w-xl">
            We design more than visuals. We build complete digital ecosystems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{
                  opacity: 0,
                  y: 40
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
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="card-hover group p-6 rounded-2xl bg-dark-800 border border-[rgba(255,255,255,0.05)] cursor-default">
                
                <div className="mb-5 w-14 h-14 rounded-xl bg-[rgba(255,90,0,0.1)] flex items-center justify-center group-hover:bg-[rgba(255,90,0,0.18)] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-flame-500 group-hover:rotate-[15deg] transition-transform duration-400" />
                </div>
                <h3 className="font-syne font-700 text-white text-base mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-xs text-[#555] font-inter leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>);

          })}
        </div>
      </div>
    </section>);

}