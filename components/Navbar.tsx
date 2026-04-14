"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Leaf, Clock } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Home",         href: "#home",         page: false },
  { label: "About",        href: "#about",         page: false },
  { label: "Treatments",   href: "#treatments",    page: false },
  { label: "Services",     href: "#services",      page: false },
  { label: "Gallery",      href: "#gallery",       page: false },
  { label: "Testimonials", href: "/testimonials",  page: true  },
  { label: "FAQ",          href: "#faq",           page: false },
  { label: "Contact",      href: "#contact",       page: false },
];

// Which sections have dark backgrounds (need white text when transparent)
const darkSections = new Set(["home", "treatments", "why-us"]);

// Section-based navbar colour map
const sectionThemes: Record<string, { bg: string; text: string; accent: string }> = {
  home:       { bg: "bg-transparent",            text: "text-white",       accent: "text-gold-300" },
  about:      { bg: "bg-cream-100/95",            text: "text-forest-900",  accent: "text-forest-600" },
  treatments: { bg: "bg-forest-800/95",           text: "text-white",       accent: "text-gold-300" },
  services:   { bg: "bg-cream-100/95",            text: "text-forest-900",  accent: "text-forest-600" },
  gallery:    { bg: "bg-white/95",                text: "text-forest-900",  accent: "text-forest-600" },
  "why-us":   { bg: "bg-forest-800/95",           text: "text-white",       accent: "text-gold-300" },
  testimonials:{ bg: "bg-cream-100/95",           text: "text-forest-900",  accent: "text-forest-600" },
  faq:        { bg: "bg-cream-100/95",            text: "text-forest-900",  accent: "text-forest-600" },
  contact:    { bg: "bg-white/95",                text: "text-forest-900",  accent: "text-forest-600" },
};

export default function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll spy
  useEffect(() => {
    const ids = [...navLinks.map(l => l.href.replace("#", "")), "why-us", "testimonials"];
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: "-70px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const theme = scrolled
    ? (sectionThemes[activeSection] ?? sectionThemes.home)
    : sectionThemes.home;

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const isDark = !scrolled || darkSections.has(activeSection);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md shadow-sm
          ${scrolled ? `${theme.bg} shadow-black/10` : "bg-transparent shadow-none"}`}
      >
        {/* OPD info bar – visible only on scrolled light sections */}
        <AnimatePresence>
          {scrolled && !darkSections.has(activeSection) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-forest-700 overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-4 text-[11px] text-white/80">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-gold-300" /> <strong className="text-white">Mon–Sat:</strong> 8–1 AM &amp; 4–8 PM</span>
                  <span className="hidden sm:flex items-center gap-1"><Clock className="w-3 h-3 text-gold-300" /> <strong className="text-white">Sunday:</strong> 8 AM–12 PM</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3 gap-3">

            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 cursor-pointer flex-shrink-0"
              onClick={() => handleNav("#home")}
            >
              <div className="relative w-11 h-11 rounded-full bg-gradient-to-br from-forest-600 to-forest-800 flex items-center justify-center shadow-lg flex-shrink-0">
                <Leaf className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                <div className="absolute inset-0 rounded-full border-2 border-gold-400/30" />
              </div>
              <div>
                <p className={`font-serif text-lg font-semibold leading-tight transition-all duration-300 ${scrolled ? theme.text : "text-white"}`}>
                  BMG Siddha
                </p>
                <p className={`text-[10px] font-light tracking-widest uppercase transition-all duration-300 ${scrolled ? theme.accent : "text-gold-300"}`}>
                  Hospital · Dindigul
                </p>
              </div>
            </motion.div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                const linkClass = `relative px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 group ${
                  isActive
                    ? scrolled ? `${theme.text} font-semibold` : "text-white font-semibold"
                    : scrolled ? `${theme.text} opacity-70 hover:opacity-100` : "text-white/75 hover:text-white"
                }`;
                const underline = (
                  <span className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                    scrolled && !isDark ? "bg-forest-500" : "bg-gold-400"
                  } ${isActive ? "w-4" : "w-0 group-hover:w-4"}`} />
                );
                return link.page ? (
                  <Link key={link.label} href={link.href} className={linkClass}>
                    {link.label}{underline}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className={linkClass}
                  >
                    {link.label}{underline}
                  </button>
                );
              })}
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <motion.button
                onClick={() => window.dispatchEvent(new Event("openContactModal"))}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="hidden md:flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-forest-600 to-forest-700 text-white text-sm font-medium rounded-full shadow-lg hover:from-forest-500 hover:to-forest-600 transition-all"
              >
                Book Now
              </motion.button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${isDark ? "text-white hover:bg-white/10" : "text-forest-800 hover:bg-forest-50"}`}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }}
            className="fixed top-20 left-0 right-0 z-40 bg-white/97 backdrop-blur-xl shadow-2xl border-t border-forest-100 lg:hidden"
          >
            <div className="px-6 py-5 space-y-1">
              {/* OPD hours */}
              <div className="flex items-center gap-2 px-4 py-2 mb-2 bg-forest-50 rounded-xl">
                <Clock className="w-4 h-4 text-forest-600" />
                <p className="text-forest-700 text-xs font-medium">Mon–Sat: 8–1 &amp; 4–8 · Sun: 8–12</p>
              </div>
              {navLinks.map((link, i) =>
                link.page ? (
                  <Link key={link.label} href={link.href} onClick={() => setMenuOpen(false)}
                    className="block px-4 py-3 text-forest-800 font-medium rounded-xl hover:bg-forest-50 hover:text-forest-600 transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <motion.button key={link.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }} onClick={() => handleNav(link.href)}
                    className="w-full text-left px-4 py-3 text-forest-800 font-medium rounded-xl hover:bg-forest-50 hover:text-forest-600 transition-colors"
                  >
                    {link.label}
                  </motion.button>
                )
              )}
              <button onClick={() => { setMenuOpen(false); window.dispatchEvent(new Event("openContactModal")); }}
                className="w-full mt-1 px-4 py-3 bg-gradient-to-r from-forest-600 to-forest-700 text-white font-semibold rounded-xl text-sm">
                Book Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
