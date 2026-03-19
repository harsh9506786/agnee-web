import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
const testimonials = [
{
  quote:
  'Agnee transformed our digital presence. From structured social media to high performing ad campaigns, we saw measurable growth within months.',
  author: 'Rahul Sharma',
  company: 'TechVenture Solutions',
  role: 'Founder & CEO'
},
{
  quote:
  'Their clarity in strategy and execution stands out. They do not just design. They build scalable systems that actually drive revenue.',
  author: 'Priya Mehta',
  company: 'GrowthLab India',
  role: 'Marketing Director'
},
{
  quote:
  'Professional, responsive and performance focused. Agnee helped us position our brand strongly in a competitive market.',
  author: 'Vikram Singh',
  company: 'AgriTech Innovations',
  role: 'Co-Founder'
}];

export function TestimonialSection() {
  const [cur, setCur] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: '-80px'
  });
  useEffect(() => {
    const t = setInterval(
      () => setCur((p) => (p + 1) % testimonials.length),
      4500
    );
    return () => clearInterval(t);
  }, []);
  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-900 overflow-hidden">
      
      {/* Giant quote mark */}
      <div
        className="absolute top-8 left-1/2 -translate-x-1/2 font-syne font-800 text-[rgba(255,90,0,0.04)] select-none pointer-events-none"
        style={{
          fontSize: 'clamp(12rem, 25vw, 22rem)',
          lineHeight: 1
        }}>
        
        "
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
          'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(255,90,0,0.035) 0%, transparent 70%)'
        }} />
      

      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
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
          className="text-center mb-16">
          
          <span className="text-xs font-syne font-700 text-flame-500 tracking-widest uppercase block mb-4">
            Testimonials
          </span>
          <h2
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95
            }}>
            
            What Our Clients <span className="text-flame">Say</span>
          </h2>
        </motion.div>

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
            duration: 0.7,
            delay: 0.2
          }}>
          
          <div className="relative p-10 sm:p-14 rounded-3xl bg-dark-800 border border-[rgba(255,255,255,0.05)] overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(255,90,0,0.05) 0%, transparent 70%)'
              }} />
            

            <div className="relative min-h-[120px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={cur}
                  initial={{
                    opacity: 0,
                    y: 24,
                    filter: 'blur(6px)'
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)'
                  }}
                  exit={{
                    opacity: 0,
                    y: -24,
                    filter: 'blur(6px)'
                  }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="font-syne font-600 text-white text-center leading-snug"
                  style={{
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)'
                  }}>
                  
                  "{testimonials[cur].quote}"
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`a-${cur}`}
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.2
                }}
                className="mt-8 text-center">
                
                <div className="font-syne font-700 text-white text-sm">
                  {testimonials[cur].author}
                </div>
                <div className="text-xs text-flame-500 font-inter mt-1">
                  {testimonials[cur].role}, {testimonials[cur].company}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-3 mt-7">
            {testimonials.map((_, i) =>
            <button
              key={i}
              onClick={() => setCur(i)}
              className={`rounded-full transition-all duration-300 ${i === cur ? 'w-8 h-2 bg-flame-500' : 'w-2 h-2 bg-[#2a2a2a]'}`}
              aria-label={`Testimonial ${i + 1}`} />

            )}
          </div>
        </motion.div>
      </div>
    </section>);

}