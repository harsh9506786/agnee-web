import React from "react";
import { motion } from "framer-motion";
import {
  FlameIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
} from "lucide-react";
import { FaBehance, FaPinterestP } from "react-icons/fa";
import agneelogo from "../assets/agneelogo/Agnee Logo.png";
const quickLinks = [
  {
    label: "About",
    href: "#about",
  },
  {
    label: "Services",
    href: "#services",
  },
  {
    label: "Industries",
    href: "#industries",
  },
  {
    label: "Team",
    href: "#team",
  },
  {
    label: "Contact",
    href: "#contact",
  },
  {
    label: "Careers",
    href: "#contact",
  },
];

const socials = [
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/agneehybridcreativeagency",
  },
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://www.facebook.com/agneeofficiall",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/agnee__official/",
  },
  {
    icon: FaBehance,
    label: "Behance",
    href: "https://www.behance.net/agnee_official",
  },

  {
    icon: FaPinterestP,
    label: "Pinterest",
    href: "#",
  },
];

function Footer() {
  const go = (href: string) =>
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });
  return (
    <footer className="relative bg-[#080808] overflow-hidden">
      {/* Top glow border */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,90,0,0.5), transparent)",
          boxShadow: "0 0 20px rgba(255,90,0,0.3)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              {/* Logo */}
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  go("#home");
                }}
                className="flex items-center gap-2.5 group"
              >
                <img
                  src={agneelogo}
                  alt="Agnee Logo"
                  className="h-20 w-auto object-contain"
                />
              </a>
            </div>
            <p className="text-md text-gray-400 font-inter leading-relaxed">
              AI Driven Branding and Digital Growth Agency helping ambitious
              businesses scale with clarity and structure.
            </p>
            <div className="flex gap-2.5">
              {socials.map(({ icon: Icon, label, href }) => {
                const isSpecial = label === "Behance" || label === "Pinterest";

                return (
                  <motion.a
                    key={label}
                    href={href}
                    target={href === "#" ? undefined : "_blank"}
                    rel={href === "#" ? undefined : "noopener noreferrer"}
                    onClick={(e) => {
                      if (href === "#") e.preventDefault();
                    }}
                    whileHover={{
                      scale: 1.12,
                      y: -2,
                    }}
                    aria-label={label}
                    className="w-10 h-10 rounded-xl bg-dark-700 border border-[rgba(255,255,255,0.05)] flex items-center justify-center text-gray-400 hover:text-flame-500 hover:border-[rgba(255,90,0,0.3)] transition-all duration-300"
                  >
                    <Icon
                      className={`w-5 h-5 ${
                        isSpecial ? "scale-125" : "scale-100"
                      }`}
                    />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h4 className="text-md font-zendots font-700 text-white uppercase tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(l.href);
                    }}
                    className="text-md text-gray-400 hover:text-flame-500 font-inter transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-flame-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <h4 className="text-md font-zendots font-700 text-white uppercase tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3.5">
              <li>
                <a
                  href="tel:9696933327"
                  className="flex items-start gap-2.5 text-md text-gray-400 hover:text-flame-500 font-inter transition-colors duration-300"
                >
                  <PhoneIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  96969 33327
                </a>
              </li>
              <li>
                <a
                  href="tel:8808301673"
                  className="flex items-start gap-2.5 text-md text-gray-400 hover:text-flame-500 font-inter transition-colors duration-300"
                >
                  <PhoneIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  88083 01673
                </a>
              </li>
              <li>
                <a
                  href="mailto:agneeagency@gmail.com"
                  className="flex items-start gap-2.5 text-md text-gray-400 hover:text-flame-500 font-inter transition-colors duration-300"
                >
                  <MailIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  agneeagency@gmail.com
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-md text-gray-400 font-inter">
                  <MapPinIcon className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                  <span>
                    Jhansi, India
                    <br />
                    <span className="text-gray-400">
                      Serving Clients Worldwide
                    </span>
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="space-y-5">
            <h4 className="text-md font-zendots font-700 text-white uppercase tracking-widest">
              Ready to Scale?
            </h4>
            <p className="text-md text-gray-400 font-inter leading-relaxed">
              Book a strategy call and let's build your growth engine together.
            </p>
            <motion.a
              href="tel:9696933327"
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="btn-flame inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs"
            >
              <PhoneIcon className="w-3.5 h-3.5 relative z-10" />
              <span>Book a Call</span>
            </motion.a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.03)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 font-inter">
            © 2026 Agnee. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 font-inter">
            AI Driven Branding & Digital Growth Agency
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;