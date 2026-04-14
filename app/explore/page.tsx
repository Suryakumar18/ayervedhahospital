"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, ZoomIn, Play, ArrowLeft, Camera, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactModal from "@/components/ContactModal";

interface GalleryItem {
  _id: string;
  src: string;
  caption: string;
  category: string;
  type: "image" | "video";
  span: string;
}

const CATEGORIES = ["All", "Hospital", "Treatment", "Consultation", "Diagnosis", "Medicines", "Herbs"];

export default function ExplorePage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => {
        setItems(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Scroll to video section if hash
  useEffect(() => {
    if (window.location.hash === "#video" && videoRef.current) {
      setTimeout(() => {
        videoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 500);
    }
  }, [items]);

  const filtered =
    activeCategory === "All" ? items : items.filter((i) => i.category === activeCategory);

  const videoItem = items.find((i) => i.type === "video");
  const imageItems = filtered.filter((i) => i.type === "image");
  const showVideo = activeCategory === "All" || activeCategory === "Hospital";

  return (
    <main>
      <Navbar />

      {/* Hero banner */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='30' fill='none' stroke='%23c9a84c' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="inline-flex items-center gap-2 text-gold-300 text-xs font-semibold tracking-widest uppercase mb-4 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-400/20">
              <Camera className="w-3.5 h-3.5" />
              Photo Gallery
            </span>
            <h1 className="font-serif text-5xl sm:text-6xl text-white font-light mb-4">
              Explore <em className="text-gold-300">Our Hospital</em>
            </h1>
            <p className="text-white/50 max-w-lg mx-auto text-sm leading-relaxed mb-8">
              A visual journey through BMG Siddha Hospital — our spaces, treatments, and the healing environment we&apos;ve built for you.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="none">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category filter */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all ${
                  activeCategory === cat
                    ? "bg-forest-700 text-white shadow-md shadow-forest-900/20"
                    : "bg-forest-50 text-forest-700 border border-forest-200 hover:bg-forest-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Video section */}
              {showVideo && videoItem && (
                <motion.div
                  ref={videoRef}
                  id="video"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="mb-12"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gold-100 flex items-center justify-center">
                      <Video className="w-4 h-4 text-gold-600" />
                    </div>
                    <h2 className="font-serif text-2xl text-forest-900 font-light">
                      Hospital Tour Video
                    </h2>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden bg-forest-900 max-w-3xl shadow-2xl shadow-forest-900/20">
                    <video
                      controls
                      className="w-full aspect-video object-cover"
                      poster=""
                    >
                      <source src={videoItem.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="p-4 bg-forest-900">
                      <p className="text-white font-medium text-sm">{videoItem.caption}</p>
                      <p className="text-gold-300 text-xs mt-0.5">{videoItem.category}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Photos grid */}
              {imageItems.length > 0 && (
                <>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-forest-100 flex items-center justify-center">
                      <Camera className="w-4 h-4 text-forest-600" />
                    </div>
                    <h2 className="font-serif text-2xl text-forest-900 font-light">
                      Photo Gallery{" "}
                      <span className="text-forest-400 text-lg font-sans">
                        ({imageItems.length})
                      </span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[200px]">
                    {imageItems.map((item, i) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
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
                </>
              )}

              {filtered.length === 0 && (
                <div className="text-center py-20 text-forest-400">
                  <Camera className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No photos in this category yet.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

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

      <Footer />
      <ContactModal />
      <WhatsAppButton />
    </main>
  );
}
