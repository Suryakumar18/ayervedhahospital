"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { SectionLeaves } from "./Leaf3D";
import { NeemBranch, LotusFlower, MortarPestle } from "./HerbIllustrations";

interface Treatment {
  _id: string;
  name: string;
  tamil: string;
  category: string;
  description: string;
  conditions: string[];
  image: string;
}

export default function Treatments() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState<string | null>(null);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/treatments")
      .then((r) => r.json())
      .then((data) => { setTreatments(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="treatments" ref={ref} className="py-24 bg-forest-800 relative overflow-hidden">
      <SectionLeaves count={5} colorScheme="forest" intensity="light" />

      <div className="absolute -top-10 -left-10 pointer-events-none opacity-[0.08]">
        <svg width="380" height="380" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 C20 10 10 80 10 100 C10 160 60 190 100 190 C140 190 190 160 190 100 C190 80 180 10 100 10Z" fill="#2d6a4f"/>
          <path d="M100 10 L100 190" stroke="#2d6a4f" strokeWidth="1.5" opacity="0.4"/>
          <path d="M100 40 Q130 60 150 90" stroke="#2d6a4f" strokeWidth="1" opacity="0.3" fill="none"/>
          <path d="M100 40 Q70 60 50 90" stroke="#2d6a4f" strokeWidth="1" opacity="0.3" fill="none"/>
        </svg>
      </div>
      <div className="absolute -bottom-10 -right-10 pointer-events-none opacity-[0.08] rotate-180">
        <svg width="340" height="340" viewBox="0 0 200 200" fill="none">
          <path d="M100 10 C20 10 10 80 10 100 C10 160 60 190 100 190 C140 190 190 160 190 100 C190 80 180 10 100 10Z" fill="#2d6a4f"/>
          <path d="M100 10 L100 190" stroke="#2d6a4f" strokeWidth="1.5" opacity="0.4"/>
        </svg>
      </div>
      <div className="absolute top-10 left-4 pointer-events-none hidden lg:block">
        <NeemBranch size={160} className="opacity-15" />
      </div>
      <div className="absolute bottom-16 right-6 pointer-events-none hidden lg:block">
        <LotusFlower size={140} className="opacity-12" />
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden xl:block" style={{ opacity: 0.05 }}>
        <MortarPestle size={200} />
      </div>
      <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full bg-forest-300/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-80 h-80 rounded-full bg-gold-200/25 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-400/20">
            Classical Siddha Therapies
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-white font-light leading-tight mb-5">
            Time-Tested <em className="text-gold-300">Treatments</em>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Our treatments are drawn from 5,000-year-old Siddha texts, administered by
            qualified physicians who understand both the science and the soul of this healing system.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-forest-400/40 border-t-gold-400 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onHoverStart={() => setHovered(t._id)}
                onHoverEnd={() => setHovered(null)}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl overflow-hidden cursor-default shadow-2xl shadow-black/40"
              >
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-white text-xs font-semibold tracking-wider uppercase bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20">
                      {t.category}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex items-end justify-between">
                    <span className="text-white font-serif text-lg font-semibold drop-shadow-lg">{t.name}</span>
                    {t.tamil && (
                      <span className="text-gold-300 text-xs font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                        {t.tamil}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card body */}
                <div className="bg-forest-700/80 border border-white/5 p-5">
                  <h3 className="font-serif text-xl text-white font-semibold mb-2 leading-tight">{t.name}</h3>
                  <p className="text-white/65 text-sm leading-relaxed mb-4">{t.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {t.conditions.map((c) => (
                      <span key={c} className="text-gold-300 text-xs bg-gold-400/10 px-2.5 py-1 rounded-full border border-gold-400/20 font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold-400 to-transparent"
                  animate={{ width: hovered === t._id ? "100%" : "0%" }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 60L48 54C96 48 192 36 288 33C384 30 480 36 576 39C672 42 768 42 864 36C960 30 1056 18 1152 15C1248 12 1344 18 1392 21L1440 24V60H0Z" fill="#fdf6ec" />
        </svg>
      </div>
    </section>
  );
}
