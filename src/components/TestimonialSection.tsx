import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

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

export function TestimonialSection() {
  const [cur, setCur] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Auto-change testimonials
  useEffect(() => {
    const t = setInterval(() => {
      setCur((p) => (p + 1) % testimonials.length);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-900 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Heading */}
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
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: "clamp(2.5rem,6vw,4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            What Our Clients <span className="text-flame">Say</span>
          </h2>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative p-10 sm:p-14 rounded-3xl bg-dark-800 border border-[rgba(255,255,255,0.05)] overflow-hidden">
            {/* Stars */}
            <div className="flex justify-center gap-1 mb-4">
              {Array(testimonials[cur].stars)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-flame-500 text-xl">
                    ⭐
                  </span>
                ))}
            </div>

            {/* Title */}
            <div className="text-center font-syne font-600 text-white text-lg sm:text-xl mb-3">
              {testimonials[cur].title}
            </div>

            {/* Description */}
            <div className="text-center text-gray-300 text-md sm:text-lg leading-relaxed">
              {testimonials[cur].description}
            </div>

            {/* Author */}
            <div className="mt-6 text-center font-syne font-700 text-white text-sm sm:text-base">
              {testimonials[cur].author}
            </div>
            <div className="text-center text-flame-500 font-inter text-xs sm:text-sm">
              {testimonials[cur].company}
            </div>
          </div>

          {/* Pagination Buttons */}
          <div className="flex justify-center gap-3 mt-7">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCur(i)}
                className={`rounded-full transition-all duration-300 ${i === cur ? "w-8 h-2 bg-flame-500" : "w-2 h-2 bg-gray-400"}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}  

