"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Camera, Play, ArrowRight, Building2 } from "lucide-react";

interface GalleryItem { _id: string; src: string; caption: string; type: string; active: boolean; }

export default function ExploreHospital() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [previewImages, setPreviewImages] = useState<string[]>([
    "https://res.cloudinary.com/dx98orvo0/image/upload/v1775364174/WhatsApp_Image_2026-04-03_at_3.41.15_PM_1_whd741.jpg",
    "https://res.cloudinary.com/dx98orvo0/image/upload/v1775364174/WhatsApp_Image_2026-04-03_at_3.41.14_PM_m9x4ub.jpg",
    "https://res.cloudinary.com/dx98orvo0/image/upload/v1775364173/WhatsApp_Image_2026-04-03_at_3.41.12_PM_bccljo.jpg",
    "https://res.cloudinary.com/dx98orvo0/image/upload/v1775364173/WhatsApp_Image_2026-04-03_at_3.41.09_PM_o9tqbi.jpg",
  ]);
  const [totalImages, setTotalImages] = useState(15);
  const [hasVideo, setHasVideo] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then(r => r.json())
      .then((items: GalleryItem[]) => {
        const active = Array.isArray(items) ? items.filter(i => i.active) : [];
        const images = active.filter(i => i.type === "image");
        const videos = active.filter(i => i.type === "video");
        setTotalImages(images.length);
        setHasVideo(videos.length > 0);
        if (images.length >= 4) setPreviewImages(images.slice(0, 4).map(i => i.src));
      })
      .catch(() => {});
  }, []);

  return (
    <section ref={ref} className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #1a3a2f 0%, #245542 40%, #1e4436 100%)" }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold-400/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-forest-400/10 blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cpath d='M30 5 C15 5 5 20 5 30 C5 45 20 55 30 55 C45 55 55 40 55 30 C55 15 45 5 30 5Z' fill='%23c9a84c' opacity='0.4'/%3E%3C/svg%3E")`, backgroundSize:"60px 60px" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.8 }}>
            <span className="inline-flex items-center gap-2 text-gold-300 text-xs font-semibold tracking-widest uppercase mb-6 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-400/20">
              <Building2 className="w-3.5 h-3.5" /> Explore Our Hospital
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-white font-light leading-tight mb-6">
              Step Inside <em className="text-gold-300">BMG Siddha</em>
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-8 max-w-md">
              Take a visual tour of our hospital — from our serene treatment rooms and herbal medicine lab to our welcoming patient care areas. Every corner is designed for healing and peace.
            </p>

            {/* Stats */}
            <div className="flex gap-8 mb-10">
              {[
                { value: `${totalImages}+`, label: "Gallery Photos" },
                { value: hasVideo ? "1" : "0", label: "Hospital Tour Video" },
                { value: "6+", label: "Treatment Areas" },
              ].map(stat => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-gold-300 font-light">{stat.value}</p>
                  <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/explore" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold-500 hover:bg-gold-400 text-forest-900 font-semibold rounded-full shadow-lg shadow-gold-500/25 transition-all hover:-translate-y-0.5">
                <Camera className="w-4 h-4" /> View Full Gallery <ArrowRight className="w-4 h-4" />
              </Link>
              {hasVideo && (
                <Link href="/explore#video" className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full border border-white/20 transition-all">
                  <Play className="w-4 h-4 fill-white" /> Watch Video Tour
                </Link>
              )}
            </div>
          </motion.div>

          {/* Right: mosaic */}
          <motion.div initial={{ opacity:0, x:40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.8, delay:0.2 }} className="relative">
            <div className="grid grid-cols-2 gap-3">
              {previewImages.map((src, i) => (
                <motion.div key={src} initial={{ opacity:0, scale:0.9 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ duration:0.5, delay:0.3+i*0.1 }}
                  className={`relative rounded-2xl overflow-hidden ${i===0?"row-span-2":""}`} style={{ height:i===0?"320px":"150px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Hospital photo ${i+1}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </motion.div>
              ))}
            </div>

            {hasVideo && (
              <motion.div initial={{ opacity:0, scale:0.8 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ duration:0.5, delay:0.7 }}
                className="absolute -bottom-4 -left-4 bg-forest-900 border border-gold-400/30 rounded-2xl px-5 py-3.5 shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0"><Play className="w-4 h-4 text-forest-900 fill-forest-900" /></div>
                <div><p className="text-white text-sm font-semibold">Hospital Tour Video</p><p className="text-white/40 text-xs">Watch our facility walkthrough</p></div>
              </motion.div>
            )}

            <motion.div initial={{ opacity:0, scale:0.8 }} animate={inView?{opacity:1,scale:1}:{}} transition={{ duration:0.5, delay:0.8 }}
              className="absolute -top-4 -right-4 bg-gold-500 rounded-xl px-4 py-2 shadow-lg">
              <p className="text-forest-900 text-xs font-bold">{totalImages}+ Photos{hasVideo?" + Video":""}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
