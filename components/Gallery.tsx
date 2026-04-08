"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { X, ZoomIn } from "lucide-react";
import { SectionLeaves } from "./Leaf3D";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GalleryItem {
  _id: string;
  src: string;
  caption: string;
  category: string;
  type: "image" | "video";
  span: string;
}

const CATEGORIES = ["All", "Treatment", "Herbs", "Medicines", "Diagnosis", "Consultation"];

export default function Gallery() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data: GalleryItem[]) => {
        // Show only image items on home page
        const images = Array.isArray(data) ? data.filter((i) => i.type === "image") : [];
        setItems(images);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((g) => g.category === activeCategory);

  return (
    <section id="gallery" ref={ref} className="py-24 bg-white relative overflow-hidden">
      <SectionLeaves count={3} colorScheme="forest" intensity="light" />

      <div className="absolute -top-32 left-0 w-80 h-80 rounded-full bg-forest-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold-50/60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-gold-600 text-xs font-semibold tracking-widest uppercase mb-4 bg-gold-50 px-4 py-1.5 rounded-full border border-gold-200">
            Our Gallery
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest-900 font-light leading-tight mb-4">
            Glimpses of <em className="text-forest-600">Healing</em>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            A window into the world of BMG Siddha — where ancient herbs, time-tested treatments
            and compassionate care come together.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                activeCategory === cat
                  ? "bg-forest-600 text-white shadow-md"
                  : "bg-forest-50 text-forest-700 border border-forest-200 hover:bg-forest-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Masonry Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
              {filtered.slice(0, 9).map((item, i) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  onClick={() => setLightbox(item)}
                  className={`relative rounded-2xl overflow-hidden cursor-pointer group ${item.span}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/45 transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-lg" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 px-3 py-2.5 bg-gradient-to-t from-black/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium">{item.caption}</p>
                    <p className="text-gold-300 text-[10px]">{item.category}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* View all link */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-10"
            >
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 px-7 py-3 bg-forest-700 hover:bg-forest-600 text-white font-semibold rounded-full shadow-md transition-all hover:-translate-y-0.5 text-sm"
              >
                View Full Gallery
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm"
            />
            <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ type: "spring", damping: 25, stiffness: 280 }}
                className="relative pointer-events-auto w-full max-w-3xl"
              >
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute -top-4 -right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-sm transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lightbox.src}
                    alt={lightbox.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-white font-medium">{lightbox.caption}</p>
                  <p className="text-gold-300 text-sm">{lightbox.category}</p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
