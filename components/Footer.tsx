"use client";

import { motion } from "framer-motion";
import { Leaf, MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Treatments", href: "#treatments" },
  { label: "Our Services", href: "#services" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const treatments = [
  "Varmam Therapy",
  "Thokkanam Massage",
  "Kayakalpa Treatments",
  "Herbal Decoctions",
  "Lepanam Therapy",
  "Naadi Pariksha",
];

export default function Footer() {
  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-forest-950 text-white relative overflow-hidden">
      {/* Top border glow */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />

      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-forest-600 to-forest-800 flex items-center justify-center border border-gold-400/30">
                <Leaf className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-serif text-base font-semibold text-white leading-tight">
                  BMG Siddha
                </p>
                <p className="text-gold-400 text-xs tracking-widest uppercase font-light">
                  Hospital
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Rooted in the ancient Siddha tradition, we bring authentic healing to the
              people of Dindigul and beyond.
            </p>

            {/* Social links */}
            <div className="flex gap-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Youtube, label: "YouTube" },
              ].map(({ Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-forest-700 border border-white/10 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4 text-white/70" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-base text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-gold-400" />
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNav(link.href)}
                    className="text-white/55 text-sm hover:text-gold-300 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold-400 transition-all duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h4 className="font-serif text-base text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-gold-400" />
              Treatments
            </h4>
            <ul className="space-y-3">
              {treatments.map((t) => (
                <li key={t}>
                  <button
                    onClick={() => handleNav("#treatments")}
                    className="text-white/55 text-sm hover:text-gold-300 transition-colors flex items-center gap-2 group text-left"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-gold-400 transition-all duration-200" />
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-serif text-base text-white font-semibold mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-gold-400" />
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-white/55 text-sm leading-relaxed">
                  Annammal Gnana Prakasam Campus,<br />
                  Paduvai Antoniyar Nagar,<br />
                  Kannivadi Main Rd, Kuttathupatti,<br />
                  Dindigul – 624002
                </p>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <a href="tel:+91XXXXXXXXXX" className="text-white/55 text-sm hover:text-gold-300 transition-colors">
                  +91 XXXXX XXXXX
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <a href="mailto:care@bmgsiddhahospital.in" className="text-white/55 text-sm hover:text-gold-300 transition-colors break-all">
                  care@bmgsiddhahospital.in
                </a>
              </li>
              <li className="flex gap-3">
                <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-white/55 text-sm leading-relaxed">
                  Mon–Sat: 8AM–1PM, 4PM–8PM<br />
                  Sunday: 8AM–12PM
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 mb-6" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-white/35 text-xs">
          <p>© {new Date().getFullYear()} BMG Siddha Hospital. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Crafted with
            <Leaf className="w-3 h-3 text-forest-500 fill-forest-500" />
            for authentic Siddha healing
          </p>
          <p>Dindigul, Tamil Nadu, India</p>
        </div>
      </div>
    </footer>
  );
}
