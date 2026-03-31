import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import shubhamimg from "../assets/team/shubhamwebp.webp";
import chitranshimg from "../assets/team/chitranshwebp.webp";
import rishabhimg from "../assets/team/rishabhwebp.webp";
import rishiimg from "../assets/team/rishiwebp.webp";
import shivaimg from "../assets/team/shivawebp.webp";
import harshimg from "../assets/team/harshwebp.webp";
import anshulimg from "../assets/team/anshulwebp.webp";
import dishitaimg from "../assets/team/dikhshitawebp.webp";
import piyushimg from "../assets/team/piyushwebp.webp";
import shailendraimg from "../assets/team/shailendrawebp.webp";
import praveenimg from "../assets/team/praveenwebp.webp";
import chitranimg from "../assets/team/chitranwebp.webp";
const team = [
  {
    name: "Shubham Joshi",
    role: "Founder & CEO",
    desc: "Shubham Joshi is the founder of Agnee and a UI/UX and brand design consultant with more than nine years of experience in the creative and digital industry. Over the years he has worked on more than a thousand projects helping startups, SaaS companies and agribusinesses build strong brand identities and scalable digital presence. His focus is on combining design thinking, business strategy and AI powered creativity to create brands that grow.",
    seed: "Shubham",
    img: shubhamimg,
  },
  {
    name: "Rishabh Joshi",
    role: "Co-Founder",
    desc: "Rishabh Joshi works closely on performance marketing and creative campaigns at Agnee. He has strong expertise in Meta Ads, Google Ads and social media marketing. Along with paid campaigns he also specializes in motion graphics and content strategy, helping brands turn creative ideas into measurable results and real business growth.",
    seed: "Rishabh",
    img: rishabhimg,
  },
  {
    name: "Preveen Bhargava",
    role: "Chief Experience Officer",
    desc: "Praveen Bhargava focuses on user experience and product quality across digital platforms. With experience in software testing and usability analysis, he ensures that every product and platform performs smoothly and delivers a reliable experience for users.",
    seed: "Preveen",
    img: praveenimg,
  },
  {
    name: "Shiva Gupta",
    role: "Chief Technology Officer",
    desc: "Shiva Gupta leads the technology and development side of Agnee. His work focuses on building scalable websites, applications and digital tools that support modern businesses. He works on system architecture, development strategy and technical execution to ensure that every digital product is stable, secure and future ready.",
    seed: "Shiva",
    img: shivaimg,
  },
  {
    name: "Rishi Tiwari",
    role: "Senior Advisor",
    desc: "Rishi Tiwari supports the team with operations and client relationship management. His role focuses on maintaining smooth workflows, ensuring strong communication with clients and making sure every project moves forward efficiently from planning to delivery.",
    seed: "Rishi",
    img: rishiimg,
  },

  {
    name: "Chitransh Tiwari",
    role: "Creative Head",
    desc: "Chitransh Tiwari leads the creative direction at Agnee. He works on visual storytelling, motion graphics and advertising creatives that help brands stand out in crowded d",
    seed: "Chitransh",
    img: chitranshimg,
  },

  {
    name: "Shailendra Joshi",
    role: "Lead – Print & Publications",
    desc: "Shailendra Joshi brings more than twenty five years of experience in print and publication design. He has worked extensively on layout design, editorial formats and print production, helping brands present their content in a clear, professional and visually appealing way. His deep understanding of typography, structure and print aesthetics ensures every publication looks refined and impactful.",
    seed: "Shailendra",
    img: shailendraimg,
  },
  {
    name: "Chitran Tiwari",
    role: "Business Marketing Head",
    desc: "Chitran Tiwari leads the marketing and growth initiatives at Agnee, focusing on building strong brand positioning and effective marketing strategies. He works closely on campaign planning, business development and market outreach, ensuring that every effort is aligned with measurable growth and long-term brand success.",
    seed: "chitran",
    img: chitranimg,
  },
  {
    name: "Anshul Joshi",
    role: "Print & Publication Specialist",
    desc: "Anshul Joshi has over fifteen years of experience in print and publication layout design. He focuses on creating well structured layouts for magazines, reports, brochures and other printed materials. His attention to detail and understanding of print formatting helps ensure every design maintains clarity, consistency and strong visual balance.",
    seed: "Anshul",
    img: anshulimg,
  },
  {
    name: "Piyush Tiwari",
    role: "Lead – Digital Marketing",
    desc: "Piyush Tiwari leads digital marketing initiatives at Agnee. His work focuses on building structured online growth strategies through social media marketing, paid advertising and performance driven campaigns. He helps businesses strengthen their digital presence and reach the right audience with effective marketing systems.",
    seed: "piyush",
    img: piyushimg,
  },
  {
    name: "Dishita Soni",
    role: "Lead Design & Concept",
    desc: "Gungun Soni works on concept development and creative design. She specializes in visual ideation and 3D animation, helping transform ideas into engaging visuals for campaigns, branding and digital experiences.",
    seed: "dishita",
    img: dishitaimg,
  },
  {
    name: "Harshvardhan Sharma",
    role: "Senior developer",
    desc: "Harshvardhan Sharma is responsible for development and technical implementation. He builds and maintains websites, applications and digital systems that are fast, reliable and scalable for growing businesses.",
    seed: "harsh",
    img: harshimg,
  },
];
function TeamSection() {
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
          className="mb-16 text-center lg:text-left"
        >
          <span
            className="inline-block text-xs font-semibold tracking-[0.25em] mb-6 uppercase px-3 py-1.5 rounded-full"
            style={{
              color: "#FF6B00",
              background: "rgba(255,107,0,0.08)",
              border: "1px solid rgba(255,107,0,0.2)",
              fontFamily: "Inter, sans-serif",
            }}
          >
            Our Team
          </span>
          <h2
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            The minds <span className="text-white">behind the </span>
            <span className="text-flame-600">magic</span>
          </h2>
          <p className="text-md sm:text-md lg:text-lg text-gray-400 font-inter mt-4 max-w-xl">
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
                  src={
                    member.img
                      ? member.img
                      : `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.seed}&backgroundColor=b6e3f4`
                  }
                  alt={member.name}
                  className="team-avatar w-full h-full rounded-full ring-2 ring-[rgba(255,90,0,0.25)] group-hover:ring-[rgba(255,90,0,0.6)]"
                />
              </div>
              <h3 className="font-700 text-white text-md mb-1">
                {member.name}
              </h3>
              <div className="text-sm  font-600 text-flame-500 mb-3">
                {member.role}
              </div>
              <p className="text-sm text-gray-400 font-inter leading-relaxed">
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
          className="mt-10 text-center text-gray-400 font-inter text-md"
        >
          We are strategists, designers, developers and marketers working as one
          integrated growth unit.
        </motion.p>
      </div>
    </section>
  );
}

export default TeamSection;
