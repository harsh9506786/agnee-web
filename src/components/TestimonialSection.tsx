import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import TeamSection from "./TeamSection";

const testimonials = [
  {
    stars: 5,
    title: "“Professional team with strong creative understanding.”",
    description:
      "Working with the Agnee team has been a great experience. They understood our requirements clearly and helped us present our hospital’s services in a more professional and impactful way online. Their creative approach and timely support made the entire process smooth. Highly recommended.",
    author: "Dr. Tanul Jain",
    company: "Lifeline Superspeciality Hospital & Heart Centre, Jhansi",
  },
  {
    stars: 5,
    title: "“They truly understand how to present services digitally.”",
    description:
      "Agnee helped us improve the way we communicate our medical services online. From design to strategy, the team was very supportive and responsive throughout the process. Their understanding of healthcare branding really helped us showcase our work more effectively.",
    author: "Dr. Satyendra Rajput",
    company: "Dr. Rajput's Laparoscopy",
  },
  {
    stars: 5,
    title: "“Creative ideas that strengthen local business presence.”",
    description:
      "The Agnee team has been very professional and creative in their approach. They understand how local businesses need to position themselves digitally and helped us build a stronger presence in our area. Their designs and marketing ideas have been impressive.",
    author: "Mr. Ashish Joshi",
    company: "Franchise Owner, Dr. Lal PathLabs, Jhansi",
  },
  {
    stars: 5,
    title: "“Great creativity and smooth collaboration.”",
    description:
      "We wanted our brand to look more professional and appealing, and Agnee delivered exactly that. The team is creative, responsive and very easy to work with. Their designs and marketing support have helped us communicate our brand better with our customers.",
    author: "Mr. Vikas Patel",
    company: "Owner, Avadh Foods",
  },
  {
    stars: 5,
    title: "“Creativity backed with real strategy.”",
    description:
      "Agnee has a great understanding of modern branding and digital communication. The team combines creativity with practical strategies, which is very important for businesses today. Their dedication and attention to detail really stand out.",
    author: "Dr. Manoj Sharma",
    company: "Founder & CEO, Bort Technology (OPC) Pvt. Ltd.",
  },
  {
    stars: 5,
    title: "“A reliable and supportive creative team.”",
    description:
      "Our experience with Agnee has been very positive. They helped us present our institution in a professional and modern way. The team is supportive, creative and always open to feedback. We appreciate their commitment to quality work.",
    author: "Mr. Shubh Agrawal",
    company: "Owner, Ramdarshan Public School, Pithora, Chhattisgarh",
  },
  {
    stars: 5,
    title: "“Strong branding support and creative execution.”",
    description:
      "Agnee helped us strengthen our brand identity and marketing communication. Their creative designs and understanding of branding helped our business look more structured and professional. It has been great working with such a dedicated team.",
    author: "Mr. Raghava Modi",
    company: "Owner, Lottery Foods",
  },
  {
    stars: 5,
    title: "“Fresh ideas and strong digital strategy.”",
    description:
      "The Agnee team brings fresh ideas and strong creative thinking to the table. They helped us build better digital communication for our brand. Their professionalism and commitment to delivering quality work is something we truly appreciate.",
    author: "Mr. Arnav Singh",
    company: "Owner, Bharat Solar Infrastructure Pvt. Ltd.",
  },
  {
    stars: 5,
    title: "“Creative, professional and easy to collaborate with.”",
    description:
      "Agnee understands how to present a brand in a way that connects with the audience. Their work reflects creativity, clarity and professionalism. It has been a good experience collaborating with their team.",
    author: "Mr. Pramod Gautam",
    company: "Jhansi Times Media Group",
  },
  {
    stars: 5,
    title: "“Perfect balance of elegance and branding.”",
    description:
      "Working with Agnee has been a wonderful experience for our brand. They understood the elegance and uniqueness that jewellery brands require and translated that beautifully into our branding and digital presence. Their creative approach and attention to detail truly stand out.",
    author: "NP Jewels",
    company: "Gurugram",
  },
];

function TestimonialSection() {
  const [cur, setCur] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isDesktop, setIsDesktop] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const DOT_COUNT = 6;
  const ITEMS_PER_DOT = Math.ceil(testimonials.length / DOT_COUNT);

  // Auto-change testimonials
  useEffect(() => {
    const t = setInterval(() => {
      setCur((p) => {
        const nextDot = (p + 1) % DOT_COUNT;

        const container = scrollRef.current;
        if (container) {
          const item = container.firstElementChild;
          if (item instanceof HTMLElement) {
            const itemWidth = item.clientWidth + 24;

            const targetIndex =
              nextDot === DOT_COUNT - 1
                ? testimonials.length - ITEMS_PER_DOT
                : nextDot * ITEMS_PER_DOT;

            container.scrollTo({
              left: targetIndex * itemWidth,
              behavior: "smooth",
            });
          }
        }

        return nextDot;
      });
    }, 4500);

    return () => clearInterval(t);
  }, []);

  // Detect desktop
  useEffect(() => {
    const check = () => {
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isLargeScreen = window.innerWidth >= 1024;
      setIsDesktop(isFinePointer && isLargeScreen);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 👈 Manual scroll for desktop buttons
  const scrollLeft = () => {
    if (!scrollRef.current) return;

    setIsUserScrolling(true);
    scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });

    setTimeout(() => {
      updateActiveIndex(); // 🔥
      setIsUserScrolling(false);
    }, 400);
  };
  const updateActiveIndex = () => {
    const container = scrollRef.current;
    if (!container) return;

    const item = container.firstElementChild;
    if (!(item instanceof HTMLElement)) return;

    const itemWidth = item.clientWidth + 24;

    const rawIndex = Math.round(container.scrollLeft / itemWidth);

    const index = Math.floor(rawIndex / ITEMS_PER_DOT);

    setCur(Math.min(index, DOT_COUNT - 1));
  };
  const scrollRight = () => {
    if (!scrollRef.current) return;

    setIsUserScrolling(true);
    scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });

    setTimeout(() => {
      updateActiveIndex(); // 🔥
      setIsUserScrolling(false);
    }, 400);
  };

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-900 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
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
            Testimonials
          </span>

          <h2
            className="font-changa text-white
    whitespace-normal lg:whitespace-nowrap"
            style={{
              fontSize: "clamp(2rem,5vw,3.8rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            What Our Clients <span className="text-flame">Say</span>
          </h2>
        </motion.div>

        {/* Scroll Container */}
        <div className="relative flex items-center overflow-visible">
          {/* LEFT ARROW */}
          {isDesktop && (
            <button
              onClick={scrollLeft}
              className="absolute -left-12 z-20 w-10 h-10 rounded-full flex items-center justify-center
    bg-dark-700 hover:bg-dark-900 text-white"
            >
              &#10094;
            </button>
          )}

          {/* Testimonial Card */}
          <div
            ref={scrollRef}
            onTouchStart={() => setIsUserScrolling(true)}
            onScroll={() => {
              if (isUserScrolling) setShowHints(false);
              const container = scrollRef.current;
              if (container && container.scrollLeft <= 5) setShowHints(true);
            }}
            className="flex overflow-x-auto scroll-smooth no-scrollbar gap-6 snap-x snap-mandatory"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex-shrink-0 w-full snap-start p-10 sm:p-14 rounded-3xl bg-dark-800 border border-[rgba(255,255,255,0.05)]"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-4">
                  {Array(t.stars)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-flame-500 text-xl">
                        ⭐
                      </span>
                    ))}
                </div>

                {/* Title */}
                <div className="text-center  font-600 text-white text-lg sm:text-xl mb-3">
                  {t.title}
                </div>

                {/* Description */}
                <div className="text-center text-gray-500 text-sm sm:text-lg leading-relaxed">
                  {t.description}
                </div>

                {/* Author */}
                <div className="mt-6 text-center font-700 text-white text-sm sm:text-base">
                  {t.author}
                </div>
                <div className="text-center text-flame-500 font-inter text-xs sm:text-sm">
                  {t.company}
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT ARROW */}
          {isDesktop && (
            <button
              onClick={scrollRight}
              className="absolute -right-12 z-20 w-10 h-10 rounded-full flex items-center justify-center
    bg-dark-700 hover:bg-dark-900 text-white"
            >
              &#10095;
            </button>
          )}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-7">
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const container = scrollRef.current;
                if (!container) return;

                const item = container.firstElementChild;
                if (!(item instanceof HTMLElement)) return;

                const itemWidth = item.clientWidth + 24;

                const targetIndex =
                  i === DOT_COUNT - 1
                    ? testimonials.length - ITEMS_PER_DOT
                    : i * ITEMS_PER_DOT;

                container.scrollTo({
                  left: targetIndex * itemWidth,
                  behavior: "smooth",
                });

                setCur(i);
              }}
              className={`rounded-full transition-all duration-300 ${
                i === cur ? "w-8 h-2 bg-flame-500" : "w-2 h-2 bg-gray-400"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
