import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  PaletteIcon,
  TrendingUpIcon,
  TargetIcon,
  VideoIcon,
  CodeIcon,
  BrainCircuitIcon,
  TestTube2Icon,
  RocketIcon,
  MegaphoneIcon,
  CalendarDaysIcon,
  SproutIcon,
  PrinterIcon,
} from "lucide-react";
const cards = [
  {
    icon: PaletteIcon,
    title: "Branding and Identity Design",
    desc: "We create strong brand foundations that help your business stand out and scale. From logo design to complete brand identity and guidelines, we build brands that are clear, consistent and memorable.",
  },
  {
    icon: TrendingUpIcon,
    title: "Social Media Marketing and Management",
    desc: "We help brands grow their online presence with structured content strategies, engaging creatives and performance tracking. Our focus is on building real audience connection and long term brand value.",
  },
  {
    icon: TargetIcon,
    title: "Performance Marketing",
    desc: "We run result driven campaigns on Meta, Google and YouTube to generate leads, sales and measurable ROI. Every campaign is optimized for performance and business growth.",
  },
  {
    icon: VideoIcon,
    title: "Creative & Media Production",
    desc: "From graphic design to video production, reels and brand films, we create content that captures attention and drives engagement. We combine storytelling with strategy to make your brand stand out.",
  },
  {
    icon: CodeIcon,
    title: "Website, App and Software Development",
    desc: "We design and develop scalable digital platforms including websites, mobile apps and business tools that support your growth and improve user experience.",
  },
  {
    icon: BrainCircuitIcon,
    title: "AI & Innovation Solutions",
    desc: "We build AI powered systems including chatbots, automation workflows, predictive marketing and intelligent content systems that help businesses grow faster and more efficiently.",
  },
  {
    icon: TestTube2Icon,
    title: "Software Testing and Quality Assurance",
    desc: "We ensure your digital products perform smoothly with manual and automation testing, performance validation and reliable quality assurance processes.",
  },
  {
    icon: RocketIcon,
    title: "Startup Launch Solutions",
    desc: "We provide complete startup launch support including branding, website development, pitch decks, PR and marketing setup so you can launch with confidence.",
  },
  {
    icon: SproutIcon,
    title: "Agriculture Branding and Agribusiness Growth Solutions",
    desc: "We help agriculture and agribusiness brands grow with strong branding, product packaging design and market positioning. From farmer engagement campaigns and dealer marketing to event branding and business consulting, we build strategies that connect with rural markets and drive real growth.",
  },
  {
    icon: CalendarDaysIcon,
    title: "Event Branding and Experiential Marketing",
    desc: "We create complete event branding solutions for corporate events, agri expos, tech events and sports events. From stage design and exhibition stalls to visual identity and on-ground creatives, we ensure your brand stands out and delivers a powerful experience.",
  },
  {
    icon: MegaphoneIcon,
    title: "Political Campaign Marketing",
    desc: "We build strong digital presence for political leaders and parties through strategic branding and content. From social media campaigns and WhatsApp outreach to voter engagement and narrative building, we create campaigns that influence perception and build trust.",
  },
  {
    icon: PrinterIcon,
    title: "Print Design Support",
    desc: "We provide complete print design solutions to help businesses communicate their brand effectively in the physical world. From brochures and flyers to banners, packaging, and event materials, we create a wide range of print-ready designs. Each design ensures clarity, consistency, and a professional look across all offline touchpoints.",
  },
];

function ExpertiseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  return (
    <section
      ref={ref}
      className="relative py-14 lg:py-36 bg-dark-900 overflow-visible"
    >
      {/* Grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg className="w-full h-full">
          <defs>
            <pattern
              id="eg"
              width="64"
              height="64"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 64 0 L 0 0 0 64"
                fill="none"
                stroke="#ff5a00"
                strokeWidth="0.6"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#eg)" />
        </svg>
      </div>

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
          <motion.div className="mb-6">
            <span
              className="inline-block text-xs font-semibold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full"
              style={{
                color: "#FF6B00",
                background: "rgba(255,107,0,0.08)",
                border: "1px solid rgba(255,107,0,0.2)",
                fontFamily: "Inter, sans-serif",
              }}
            >
              Our Services
            </span>
          </motion.div>
          <h2
            className="font-changa text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            What We <span className="text-flame">Build</span>
          </h2>

          <p className="text-gray-400 font-inter mt-4 max-w-xl text-base sm:text-md lg:text-lg xl:text-xl">
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
                  delay: i * 0.07,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="card-hover group p-6 rounded-2xl bg-dark-800 border border-[rgba(255,255,255,0.05)] cursor-default overflow-visible"
              >
                <div className="mb-5 w-14 h-14 rounded-xl bg-[rgba(255,90,0,0.1)] flex items-center justify-center group-hover:bg-[rgba(255,90,0,0.18)] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-flame-500 group-hover:rotate-[15deg] transition-transform duration-400" />
                </div>
                <h3 className=" font-700 text-white text-base mb-2 text-rendering: optimizeLegibility;">
                  {card.title}
                </h3>
                <p className="text-md text-gray-400 font-inter leading-relaxed">
                  {card.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ExpertiseSection;
