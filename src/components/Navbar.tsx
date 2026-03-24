import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MenuIcon, XIcon, FlameIcon, PhoneIcon } from "lucide-react";
import logoimg from "../assets/agneelogo/Agnee Logo.png";
const links = [
  {
    label: "Home",
    href: "#home",
  },
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
    label: "Work",
    href: "#clients",
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

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({
      behavior: "smooth",
    });
  };
  return (
    <>
      <motion.nav
        initial={{
          y: -70,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 $scrolled
  ? "bg-[rgba(11,11,11,0.85)] backdrop-blur-xl border-b border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
  : "bg-transparent"`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-4">
          <div className="flex items-center justify-between h-16 lg:h-20">
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
                src={logoimg}
                alt="Agnee Logo"
                className="h-16 w-auto object-contain"
              />
            </a>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className="relative px-3.5 py-2 text-sm font-inter font-medium text-[#888] hover:text-white transition-colors duration-200 group"
                >
                  {l.label}
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-px bg-gradient-to-r from-flame-500 to-flame-700 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:block">
              <motion.a
                href="tel:9696933327"
                whileHover={{
                  scale: 1.04,
                }}
                whileTap={{
                  scale: 0.96,
                }}
                className="btn-flame inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
              >
                <PhoneIcon className="w-3.5 h-3.5 relative z-10" />
                <span>Connect with us</span>
              </motion.a>
            </div>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 text-white"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              {open ? (
                <XIcon className="w-5 h-5" />
              ) : (
                <MenuIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: -16,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -16,
            }}
            transition={{
              duration: 0.25,
            }}
            className="fixed top-16 inset-x-0 z-40 bg-[rgba(11,11,11,0.97)] backdrop-blur-2xl border-b border-[rgba(255,90,0,0.12)] lg:hidden"
          >
            <div className="px-5 py-5 space-y-1">
              {links.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  initial={{
                    opacity: 0,
                    x: -16,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  transition={{
                    delay: i * 0.04,
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    go(l.href);
                  }}
                  className="block px-4 py-3 text-[#888] hover:text-white hover:bg-[rgba(255,90,0,0.06)] rounded-xl transition-all font-inter text-sm"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="pt-3">
                <a
                  href="tel:9696933327"
                  className="btn-flame flex items-center justify-center gap-2 w-full py-3 rounded-full text-sm"
                >
                  <PhoneIcon className="w-3.5 h-3.5 relative z-10" />
                  <span>Book a Strategy Call</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
