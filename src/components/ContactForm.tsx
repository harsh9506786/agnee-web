import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SendIcon, CheckCircleIcon } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";
const industries = [
  "SaaS and Technology",
  "Healthcare",
  "Agriculture",
  "Education",
  "Real Estate",
  "Ecommerce",
  "Corporate B2B/B2C",
  "Manufacturing",
  "Political Campaign",
  "Startup",
  "Other",
];

const services = [
  "Brand Strategy and Identity",
  "Social Media Growth",
  "Performance Marketing",
  "Creative and Media Production",
  "Technology and Development",
  "AI Solutions",
  "Software Testing and QA",
  "Startup Launch",
  "Full Growth Package",
];

function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-80px",
  });
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    industry: "",
    service: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.service) e.service = "Please select";
    return e;
  };
  const submit = (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    // 📩 WhatsApp Message Format
    const message = `
New Inquiry

Name: ${form.fullName}
Company: ${form.companyName || "-"}
Email: ${form.email}
Phone: ${form.phone}
Industry: ${form.industry || "-"}
Service: ${form.service}

Description:
${form.description || "-"}
  `;

    // 🔥 Encode message
    const encodedMessage = encodeURIComponent(message);

    // 👉 YOUR WHATSAPP NUMBER (without +)
    const phoneNumber = "919696933327";

    // 🚀 Open WhatsApp
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
    );

    setDone(true);
  };
  const inputCls = (f: string) =>
    `w-full px-4 py-3.5 rounded-xl bg-dark-700 border ${
      errors[f] ? "border-red-500" : "border-gray-400"
    } text-white placeholder-gray-400 font-inter text-sm focus:outline-none focus:border-flame-500 focus:bg-[rgba(255,90,0,0.025)] transition-all duration-300`;
  return (
    <section
      ref={ref}
      className="relative py-24 lg:py-36 bg-dark-800 overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(255,90,0,0.025) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-5 sm:px-8 relative z-10">
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
          className="mb-12 text-center lg:text-left"
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
            Contact us
          </span>
          <h2
            className="font-syne font-extrabold text-white"
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              letterSpacing: "-0.03em",
              lineHeight: 0.95,
            }}
          >
            Get In <span className="text-flame">Touch</span>
          </h2>
          <p className="text-gray-400 font-inter mt-4">
            Tell us about your project and we'll get back to you within 24
            hours.
          </p>
        </motion.div>

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
            delay: 0.2,
          }}
          className="p-8 sm:p-10 rounded-3xl bg-dark-700 border border-[rgba(255,255,255,0.05)]"
        >
          {done ? (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="text-center py-12 space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[rgba(255,90,0,0.1)] flex items-center justify-center mx-auto">
                <CheckCircleIcon className="w-8 h-8 text-flame-500" />
              </div>
              <h3 className="font-syne font-800 text-white text-2xl">
                Message Sent!
              </h3>
              <p className="text-gray-400 font-inter text-sm">
                Our team will contact you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setDone(false);
                  setForm({
                    fullName: "",
                    companyName: "",
                    email: "",
                    phone: "",
                    industry: "",
                    service: "",
                    description: "",
                  });
                }}
                className="btn-outline px-6 py-2.5 rounded-full text-sm mt-2"
              >
                Send Another
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-md font-syne font-700 text-gray-400 mb-2 uppercase tracking-widest">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.fullName}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        fullName: e.target.value,
                      });
                      setErrors({
                        ...errors,
                        fullName: "",
                      });
                    }}
                    className={inputCls("fullName")}
                  />

                  {errors.fullName && (
                    <p className="text-red-400 text-md mt-1 font-inter">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-md font-syne font-700 text-gray-400 mb-2 uppercase tracking-widest">
                    Company
                  </label>
                  <input
                    type="text"
                    placeholder="Company name"
                    value={form.companyName}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        companyName: e.target.value,
                      })
                    }
                    className={inputCls("companyName")}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-md font-syne font-700 text-gray-400 mb-2 uppercase tracking-widest">
                    Email *
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        email: e.target.value,
                      });
                      setErrors({
                        ...errors,
                        email: "",
                      });
                    }}
                    className={inputCls("email")}
                  />

                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 font-inter">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-md font-syne font-700 text-gray-400 mb-2 uppercase tracking-widest">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.phone}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        phone: e.target.value,
                      });
                      setErrors({
                        ...errors,
                        phone: "",
                      });
                    }}
                    className={inputCls("phone")}
                  />

                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1 font-inter">
                      {errors.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-md font-syne font-700 text-gray-400 mb-2 uppercase tracking-widest">
                    Industry
                  </label>
                  <div className="relative">
                    <select
                      value={form.industry}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          industry: e.target.value,
                        })
                      }
                      className={`${inputCls("industry")} appearance-none pr-10`}
                    >
                      <option value="" className="bg-dark-700">
                        Select industry
                      </option>
                      {industries.map((v) => (
                        <option key={v} value={v} className="bg-dark-700">
                          {v}
                        </option>
                      ))}
                    </select>

                    <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-md font-syne font-700 text-gray-400 mb-2 uppercase tracking-widest">
                    Service *
                  </label>
                  <div className="relative">
                    <select
                      value={form.service}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          service: e.target.value,
                        });
                        setErrors({
                          ...errors,
                          service: "",
                        });
                      }}
                      className={`${inputCls("service")} appearance-none pr-10`}
                    >
                      <option value="" className="bg-dark-700">
                        Select service
                      </option>
                      {services.map((v) => (
                        <option key={v} value={v} className="bg-dark-700">
                          {v}
                        </option>
                      ))}
                    </select>

                    <ChevronDownIcon className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  {errors.service && (
                    <p className="text-red-400 text-xs mt-1 font-inter">
                      {errors.service}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-md font-syne font-700 text-white mb-2 uppercase tracking-widest">
                  Project Description
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your project..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  className={`${inputCls("description")} resize-none`}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="btn-flame w-full py-4 rounded-full text-sm font-syne font-700 flex items-center justify-center gap-2"
              >
                <span>Send Message</span>
                <SendIcon className="w-4 h-4 relative z-10" />
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default ContactForm