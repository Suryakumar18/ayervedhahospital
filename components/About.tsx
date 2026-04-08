"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Calendar, Leaf, BookOpen, GraduationCap, Building2, Heart, Clock, MapPin, Phone } from "lucide-react";
import { SectionLeaves } from "./Leaf3D";
import { HerbalSprig, TulsiPlant } from "./HerbIllustrations";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  BookOpen, Leaf, GraduationCap, Building2, Heart, Calendar, Clock, MapPin, Phone,
};

interface TimelineItem { _id?: string; iconName: string; year: string; colorClass: string; dotClass: string; title: string; desc: string; }
interface SiteSettings { phone1: string; opdMornStart: string; opdMornEnd: string; opdEveStart: string; opdEveEnd: string; sundayStart: string; sundayEnd: string; address: string; }
interface AboutData {
  badge: string; heading: string; headingHighlight: string; topQuote: string;
  timeline: TimelineItem[]; closingQuote: string; closingAuthor: string;
  stats: { v: string; l: string }[];
}

const DEFAULTS: AboutData = {
  badge: "Our Story", heading: "A Century of", headingHighlight: "Healing Wisdom",
  topQuote: "Long ago, in the ancient land of Tamil Nadu, the wisdom of healing flowed through the teachings of the great Siddhars.",
  timeline: [], closingQuote: "", closingAuthor: "Antony Gnana Prabhu, Founder",
  stats: [{ v: "3rd", l: "Generation" }, { v: "100+", l: "Years" }, { v: "5000+", l: "Patients" }],
};

const SITE_DEFAULTS: SiteSettings = { phone1: "+91 XXXXX XXXXX", opdMornStart:"8 AM", opdMornEnd:"1 PM", opdEveStart:"4 PM", opdEveEnd:"8 PM", sundayStart:"8 AM", sundayEnd:"12 PM", address:"Kuttathupatti, Dindigul – 624002" };

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [about, setAbout] = useState<AboutData>(DEFAULTS);
  const [site, setSite] = useState<SiteSettings>(SITE_DEFAULTS);

  useEffect(() => {
    fetch("/api/about").then(r => r.json()).then(d => { if (d?.badge) setAbout(d); }).catch(() => {});
    fetch("/api/settings").then(r => r.json()).then(d => { if (d?.phone1) setSite(d); }).catch(() => {});
  }, []);

  return (
    <section id="about" ref={ref} className="py-24 bg-cream-100 relative overflow-hidden">
      <SectionLeaves count={4} colorScheme="mixed" intensity="light" />
      <div className="absolute top-8 right-4 pointer-events-none hidden xl:block"><HerbalSprig size={80} color="#c9a84c" className="opacity-20" /></div>
      <div className="absolute bottom-10 left-2 pointer-events-none hidden xl:block"><TulsiPlant size={110} className="opacity-15" /></div>
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-forest-100/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-gold-100/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity:0, y:25 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-16">
          <span className="inline-block text-gold-600 text-xs font-semibold tracking-widest uppercase mb-4 bg-gold-50 px-4 py-1.5 rounded-full border border-gold-200">{about.badge}</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest-900 font-light leading-tight mb-4">
            {about.heading} <em className="text-forest-600">{about.headingHighlight}</em>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed italic font-light">
            &ldquo;{about.topQuote}&rdquo;
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_340px] gap-12 items-start">
          {/* Timeline */}
          <div className="space-y-0">
            {about.timeline.map((item, i) => {
              const Icon = ICON_MAP[item.iconName] || Leaf;
              return (
                <motion.div key={item._id || i} initial={{ opacity:0, x:-30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.6, delay:i*0.13 }} className="flex gap-5 group">
                  <div className="flex flex-col items-center">
                    <div className={`w-4 h-4 rounded-full border-2 border-white shadow-md flex-shrink-0 mt-1 ${item.dotClass}`} />
                    {i < about.timeline.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-gray-300 to-transparent my-2 min-h-[40px]" />}
                  </div>
                  <div className="flex-1 mb-8 p-5 rounded-2xl border bg-white/80 hover:bg-white shadow-sm hover:shadow-md transition-all group-hover:border-forest-200">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center flex-shrink-0 ${item.colorClass}`}>
                        <Icon className="w-4 h-4" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.year}</span>
                    </div>
                    <h3 className="font-serif text-xl text-forest-900 font-semibold mb-2 leading-tight">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}

            {about.closingQuote && (
              <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8, delay:0.7 }} className="ml-9 p-6 rounded-2xl bg-gradient-to-br from-forest-800 to-forest-950 text-white">
                <p className="font-serif text-lg font-light leading-relaxed italic text-white/90 mb-3">&ldquo;{about.closingQuote}&rdquo;</p>
                <div className="flex items-center gap-2 text-gold-300 text-xs tracking-widest uppercase">
                  <span className="w-8 h-px bg-gold-400" />
                  <span>{about.closingAuthor}</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right panel */}
          <motion.div initial={{ opacity:0, x:30 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.8, delay:0.3 }} className="lg:sticky lg:top-28 space-y-4">
            <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-5"><span className="w-6 h-px bg-gold-400" /><p className="text-gold-600 text-xs font-bold tracking-widest uppercase">Quick Access</p></div>
              <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} onClick={() => window.dispatchEvent(new Event("openContactModal"))}
                className="w-full flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-forest-600 to-forest-700 text-white rounded-xl text-sm font-semibold tracking-wide shadow-lg mb-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0"><Calendar className="w-4 h-4" /></div>
                <div className="text-left"><p className="font-bold leading-tight">Book Consultation</p><p className="text-white/65 text-xs font-normal mt-0.5">Free first visit assessment</p></div>
              </motion.button>
              <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} onClick={() => document.querySelector("#treatments")?.scrollIntoView({ behavior:"smooth" })}
                className="w-full flex items-center gap-3 px-5 py-4 border-2 border-forest-200 text-forest-700 rounded-xl text-sm font-semibold hover:bg-forest-50">
                <div className="w-8 h-8 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0"><Leaf className="w-4 h-4 text-forest-600" /></div>
                <div className="text-left"><p className="font-bold leading-tight">View Treatments</p><p className="text-gray-400 text-xs font-normal mt-0.5">Explore Siddha therapies</p></div>
              </motion.button>
            </div>

            {/* OPD Hours */}
            <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4"><Clock className="w-4 h-4 text-forest-600" strokeWidth={1.5} /><p className="font-semibold text-forest-800 text-sm">OPD Hours</p></div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Mon – Sat (Morning)</span><span className="text-forest-700 font-medium">{site.opdMornStart} – {site.opdMornEnd}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Mon – Sat (Evening)</span><span className="text-forest-700 font-medium">{site.opdEveStart} – {site.opdEveEnd}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Sunday</span><span className="text-forest-700 font-medium">{site.sundayStart} – {site.sundayEnd}</span></div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-2xl border border-cream-200 shadow-sm p-5 space-y-3">
              <a href={`tel:${site.phone1}`} className="flex items-center gap-3 group">
                <div className="w-9 h-9 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center group-hover:bg-forest-100"><Phone className="w-4 h-4 text-forest-600" strokeWidth={1.5} /></div>
                <div><p className="text-[10px] text-gray-400 uppercase tracking-widest">Call Us</p><p className="text-forest-800 text-sm font-semibold">{site.phone1}</p></div>
              </a>
              <div className="h-px bg-cream-200" />
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold-50 border border-gold-100 flex items-center justify-center flex-shrink-0"><MapPin className="w-4 h-4 text-gold-600" strokeWidth={1.5} /></div>
                <div><p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Address</p><p className="text-forest-800 text-xs leading-relaxed whitespace-pre-line">{site.address}</p></div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {about.stats.map(s => (
                <div key={s.l} className="bg-white rounded-xl border border-cream-200 shadow-sm p-3 text-center">
                  <p className="font-serif text-xl text-forest-700 font-semibold leading-none">{s.v}</p>
                  <p className="text-gray-400 text-[10px] mt-1 uppercase tracking-wide">{s.l}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
