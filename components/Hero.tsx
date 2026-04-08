"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, Leaf, Phone, MessageCircle } from "lucide-react";
import { Leaf3D } from "./Leaf3D";
import { BotanicalRing } from "./HerbIllustrations";

interface HeroSettings {
  backgroundImage: string;
  badge: string;
  heading: string;
  headingHighlight: string;
  tamil: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
  herbBadges: string[];
  address: string;
  whatsappNumber: string;
  callNumber: string;
}

const DEFAULTS: HeroSettings = {
  backgroundImage: "https://res.cloudinary.com/dx98orvo0/image/upload/v1775367195/weed-leaves-oil-product-still-life_jqpa3h.jpg",
  badge: "Ancient Siddha Wisdom · Since 2004",
  heading: "BMG Siddha",
  headingHighlight: "Hospital",
  tamil: "✦ சித்த மருத்துவம் · ஆரோக்கியமான வாழ்வு ✦",
  subtitle: "Rooted in the timeless science of Siddha medicine — healing body, mind and soul through the sacred power of nature's finest herbs and ancient wisdom.",
  stats: [{ value: "5000+", label: "Patients Healed" }, { value: "20+", label: "Years of Care" }, { value: "100+", label: "Siddha Herbs" }],
  ctaPrimary: "Book Consultation",
  ctaSecondary: "View Treatments",
  herbBadges: ["🌿 Tulsi", "🍃 Neem", "🌸 Lotus", "💛 Turmeric", "🌱 Ashwagandha"],
  address: "📍 Kuttathupatti, Kannivadi Rd, Dindigul – 624002",
  whatsappNumber: "+91 98765 43210",
  callNumber: "+91 98765 43210",
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY     = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const [hero, setHero] = useState<HeroSettings>(DEFAULTS);

  useEffect(() => {
    fetch("/api/hero")
      .then(r => r.json())
      .then(d => { if (d && d.backgroundImage) setHero(d); })
      .catch(() => {});
  }, []);

  const scrollToAbout = () =>
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });

  const whatsappLink = `https://wa.me/${hero.whatsappNumber.replace(/[^0-9]/g, "")}`;
  const callLink    = `tel:${hero.callNumber.replace(/\s/g, "")}`;

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── BACKGROUND ── */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${hero.backgroundImage}")` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/25" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(30,68,40,0.40)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(201,168,76,0.15)_0%,transparent_50%)]" />
      </motion.div>

      {/* ── CORNER LEAVES ── */}
      <Leaf3D type="banana" x="-1%"  y="4%"  size={60} color="#1a4731" delay={0}   duration={10} opacity={0.20} depth={0.8} zIndex={2} />
      <Leaf3D type="neem"   x="88%"  y="3%"  size={54} color="#1a4731" delay={0.8} duration={11} opacity={0.18} depth={0.8} zIndex={2} />
      <Leaf3D type="mango"  x="2%"   y="76%" size={42} color="#2d6a4f" delay={1.5} duration={9}  opacity={0.18} depth={0.7} zIndex={2} />
      <Leaf3D type="lotus"  x="87%"  y="74%" size={38} color="#c9a84c" delay={1.0} duration={10} opacity={0.16} depth={0.6} zIndex={2} />

      {/* Faint botanical ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[1]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 3 }}>
          <BotanicalRing size={640} className="opacity-[0.06]" />
        </motion.div>
      </div>

      {/* ── CONTENT ── */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 w-full max-w-3xl mx-auto px-6 sm:px-10 text-center py-24"
      >
        {/* Top rule */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="flex-1 max-w-[60px] h-px bg-gradient-to-r from-transparent to-gold-400/70" />
          <Leaf className="w-3.5 h-3.5 text-gold-400 opacity-80" />
          <span className="flex-1 max-w-[60px] h-px bg-gradient-to-l from-transparent to-gold-400/70" />
        </motion.div>

        {/* Badge */}
        <motion.p
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-gold-300 text-[11px] font-semibold tracking-[0.3em] uppercase mb-4"
        >
          {hero.badge}
        </motion.p>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif font-light text-white leading-[1.1] mb-3"
          style={{ fontSize: "clamp(2.4rem, 6.5vw, 4.4rem)" }}
        >
          {hero.heading}
          <br />
          <em className="text-gold-300 not-italic font-light">{hero.headingHighlight}</em>
        </motion.h1>

        {/* Tamil */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="text-gold-200/75 text-sm tracking-widest mb-5"
        >
          {hero.tamil}
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <span className="w-10 h-px bg-white/20" />
          <span className="text-base">🌿</span>
          <span className="w-10 h-px bg-white/20" />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="text-white/70 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-8 font-light"
        >
          {hero.subtitle}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center gap-8 sm:gap-12 mb-8"
        >
          {hero.stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-serif text-2xl sm:text-3xl text-gold-300 font-light leading-none">{s.value}</p>
              <p className="text-white/45 text-[10px] mt-1 tracking-widest uppercase">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 28px rgba(201,168,76,0.35)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => window.dispatchEvent(new Event("openContactModal"))}
            className="px-8 py-3.5 bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 font-semibold rounded-full text-sm tracking-widest uppercase shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all"
          >
            {hero.ctaPrimary}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.querySelector("#treatments")?.scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-3.5 border border-white/35 text-white font-medium rounded-full text-sm tracking-widest uppercase hover:bg-white/10 hover:border-white/60 transition-all backdrop-blur-sm"
          >
            {hero.ctaSecondary}
          </motion.button>
        </motion.div>

        {/* Quick contact */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="flex items-center justify-center gap-3 mb-5"
        >
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/15 text-xs backdrop-blur-sm transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 text-green-400" />
            WhatsApp: {hero.whatsappNumber}
          </a>
          <a
            href={callLink}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 hover:text-white hover:bg-white/15 text-xs backdrop-blur-sm transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-gold-400" />
            Call: {hero.callNumber}
          </a>
        </motion.div>

        {/* Herb badges */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="flex flex-wrap justify-center gap-2 mb-5"
        >
          {hero.herbBadges.map((h) => (
            <span key={h} className="px-3 py-1 text-xs text-white/65 bg-white/8 border border-white/15 rounded-full tracking-wide backdrop-blur-sm">
              {h}
            </span>
          ))}
        </motion.div>

        {/* Address */}
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-white/40 text-xs tracking-wide"
        >
          {hero.address}
        </motion.p>
      </motion.div>

      {/* Scroll cue */}
      <motion.button
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        onClick={scrollToAbout}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-white/35 hover:text-white/60 transition-colors"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase font-light">Scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.button>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 80L80 68C160 56 320 34 480 28C640 22 800 36 960 45C1120 54 1280 60 1360 63L1440 66V80H0Z" fill="#fdf6ec" />
        </svg>
      </div>
    </section>
  );
}
