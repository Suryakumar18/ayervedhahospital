"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { SectionLeaves } from "./Leaf3D";
import { HerbalSprig, BotanicalRing } from "./HerbIllustrations";
import {
  Activity, Baby, Brain, FlameKindling, ShieldCheck,
  Stethoscope, TreeDeciduous, Zap, Heart, Leaf, Star,
  Pill, Thermometer, Microscope, Wind, Sun,
} from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Stethoscope, Activity, Brain, Baby, FlameKindling, TreeDeciduous, ShieldCheck, Zap,
  Heart, Leaf, Star, Pill, Thermometer, Microscope, Wind, Sun,
};

interface Service {
  _id: string;
  iconName: string;
  title: string;
  desc: string;
  color: string;
}

export default function Services() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/services")
      .then((r) => r.json())
      .then((data) => { setServices(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="services" ref={ref} className="py-24 bg-cream-100 relative overflow-hidden">
      <SectionLeaves count={4} colorScheme="forest" intensity="light" />
      <div className="absolute -bottom-4 right-12 pointer-events-none hidden xl:block">
        <HerbalSprig size={90} color="#2d6a4f" className="opacity-20" />
      </div>
      <div className="absolute top-8 left-8 pointer-events-none hidden xl:block opacity-10">
        <BotanicalRing size={200} />
      </div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
      <div className="absolute -top-40 right-0 w-80 h-80 rounded-full bg-gold-100/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold-600 text-xs font-semibold tracking-widest uppercase mb-4 bg-gold-50 px-4 py-1.5 rounded-full border border-gold-200">
            Our Specialities
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest-900 font-light leading-tight mb-5">
            Comprehensive <em className="text-forest-600">Siddha Services</em>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            From diagnosis to long-term wellness, we offer a complete spectrum of Siddha medical
            services tailored to every stage of your health journey.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => {
              const Icon = ICON_MAP[s.iconName] || Leaf;
              return (
                <motion.div
                  key={s._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-shadow border border-cream-200 group cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${s.color} group-hover:scale-110 transition-transform`}>
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg text-forest-900 font-semibold mb-2 leading-tight">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
