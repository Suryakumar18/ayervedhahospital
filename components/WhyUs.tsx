"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { CheckCircle2, Leaf, FlaskConical, Users, MapPin, Star, Zap, Heart, ShieldCheck, Brain, Baby } from "lucide-react";
import { SectionLeaves } from "./Leaf3D";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  CheckCircle2, Leaf, FlaskConical, Users, MapPin, Star, Zap, Heart, ShieldCheck, Brain, Baby,
};

interface Reason { _id?: string; iconName: string; title: string; desc: string; color: string; active: boolean; }
interface WhyUsData {
  badge: string; heading: string; headingHighlight: string; subheading: string; ctaText: string;
  stats: { num: string; label: string }[];
  reasons: Reason[];
}

const DEFAULTS: WhyUsData = {
  badge:"Why Choose Us", heading:"Healing the Way", headingHighlight:"Nature Intended",
  subheading:"In a world of rushed appointments and generic prescriptions, BMG Siddha Hospital offers something different — the gift of time, attention and a healing philosophy that honours the complexity of the human body.",
  ctaText:"Start Your Healing Journey",
  stats:[{num:"5000+",label:"Patients Treated"},{num:"98%",label:"Satisfaction Rate"},{num:"100+",label:"Herbs in Use"}],
  reasons:[],
};

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [data, setData] = useState<WhyUsData>(DEFAULTS);

  useEffect(() => {
    fetch("/api/why-us").then(r => r.json()).then(d => { if (d?.badge) setData(d); }).catch(() => {});
  }, []);

  const activeReasons = data.reasons.filter(r => r.active);

  return (
    <section id="why-us" ref={ref} className="py-24 relative overflow-hidden bg-forest-800">
      <SectionLeaves count={4} colorScheme="mixed" intensity="light" />

      <div className="absolute left-0 bottom-0 pointer-events-none opacity-[0.07] hidden lg:block">
        <svg width="320" height="480" viewBox="0 0 200 300" fill="#2d6a4f">
          <rect x="92" y="200" width="16" height="100" rx="6"/>
          <path d="M100 220 Q70 200 40 180 Q60 175 80 185 Q70 160 50 140 Q75 140 90 160 Q85 130 65 105 Q95 115 100 145Z" />
          <path d="M100 220 Q130 200 160 180 Q140 175 120 185 Q130 160 150 140 Q125 140 110 160 Q115 130 135 105 Q105 115 100 145Z" />
          <path d="M100 145 Q85 100 90 60 Q100 80 100 60 Q100 80 110 60 Q115 100 100 145Z" />
        </svg>
      </div>
      <div className="absolute right-0 top-0 pointer-events-none opacity-[0.06] hidden lg:block">
        <svg width="260" height="420" viewBox="0 0 200 300" fill="#c9a84c">
          <rect x="92" y="200" width="16" height="100" rx="6"/>
          <path d="M100 220 Q70 200 40 180 Q60 175 80 185 Q70 160 50 140 Q75 140 90 160 Q85 130 65 105 Q95 115 100 145Z" />
          <path d="M100 220 Q130 200 160 180 Q140 175 120 185 Q130 160 150 140 Q125 140 110 160 Q115 130 135 105 Q105 115 100 145Z" />
          <path d="M100 145 Q85 100 90 60 Q100 80 100 60 Q100 80 110 60 Q115 100 100 145Z" />
        </svg>
      </div>
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-forest-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-gold-200/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity:0, y:25 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-14">
          <span className="inline-block text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-400/20">{data.badge}</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-light leading-tight mb-4">
            {data.heading}<br /><em className="text-gold-300">{data.headingHighlight}</em>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm leading-relaxed">{data.subheading}</p>
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7, delay:0.15 }} className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto">
          {data.stats.map(s => (
            <div key={s.label} className="text-center p-4 rounded-2xl bg-white/8 border border-white/15">
              <p className="font-serif text-3xl text-gold-300 font-semibold leading-none">{s.num}</p>
              <p className="text-white/55 text-xs mt-1.5 leading-tight">{s.label}</p>
            </div>
          ))}
        </motion.div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 ${activeReasons.length >= 5 ? "xl:grid-cols-5" : activeReasons.length === 4 ? "xl:grid-cols-4" : ""} gap-4`}>
          {activeReasons.map((r, i) => {
            const Icon = ICON_MAP[r.iconName] || Leaf;
            return (
              <motion.div key={r._id || i} initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:i*0.1 }} whileHover={{ y:-5, transition:{duration:0.2} }}
                className="bg-white/8 hover:bg-white/14 rounded-2xl p-5 border border-white/12 hover:border-white/25 transition-all group">
                <div className={`w-11 h-11 rounded-xl ${r.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-base text-white font-semibold mb-2 leading-tight">{r.title}</h3>
                <p className="text-white/55 text-xs leading-relaxed">{r.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.7, delay:0.6 }} className="text-center mt-12">
          <motion.button whileHover={{ scale:1.04 }} whileTap={{ scale:0.97 }} onClick={() => window.dispatchEvent(new Event("openContactModal"))}
            className="px-9 py-4 bg-gradient-to-r from-gold-500 to-gold-600 text-forest-950 font-semibold rounded-full text-sm tracking-wide shadow-lg hover:from-gold-400 hover:to-gold-500 transition-all">
            {data.ctaText}
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L80 50C160 40 320 22 480 17C640 12 800 20 960 27C1120 34 1280 40 1360 43L1440 46V60H0Z" fill="#fdf6ec" />
        </svg>
      </div>
    </section>
  );
}
