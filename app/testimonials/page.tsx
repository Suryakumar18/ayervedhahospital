"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, Play, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Testimonial {
  _id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  treatment: string;
  type: "text" | "video";
  videoUrl: string;
  photoUrl: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i <= rating ? "text-gold-500 fill-gold-500" : "text-gray-200 fill-gray-200"}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-3xl aspect-video bg-black rounded-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 bg-black/60 rounded-full text-white hover:bg-black/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <video src={url} controls autoPlay className="w-full h-full object-contain" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"all" | "written" | "video">("all");
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        setTestimonials(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtered = testimonials.filter((t) => {
    if (tab === "written") return t.type === "text" || !t.type;
    if (tab === "video") return t.type === "video";
    return true;
  });

  const writtenCount = testimonials.filter((t) => t.type === "text" || !t.type).length;
  const videoCount = testimonials.filter((t) => t.type === "video").length;

  return (
    <div className="min-h-screen bg-cream-100">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-forest-800 text-white pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-gold-400 text-xs font-semibold tracking-widest uppercase mb-4 bg-gold-400/10 px-4 py-1.5 rounded-full border border-gold-400/20">
            BMG Siddha Hospital
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-4">
            Patient <em className="text-gold-400">Testimonials</em>
          </h1>
          <p className="text-white/60 text-lg max-w-xl">
            Real stories from real patients — their healing journeys with Siddha medicine.
          </p>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-3">
            {[
              { key: "all", label: "All", count: testimonials.length },
              { key: "written", label: "Written Reviews", count: writtenCount },
              { key: "video", label: "Video Testimonials", count: videoCount },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key as typeof tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  tab === t.key
                    ? "bg-forest-700 text-white shadow"
                    : "text-gray-500 hover:text-forest-700 hover:bg-forest-50"
                }`}
              >
                {t.label}
                <span
                  className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                    tab === t.key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {t.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading && (
          <div className="flex justify-center py-24">
            <div className="w-10 h-10 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-24 text-gray-400">
            <Quote className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No {tab === "all" ? "" : tab} testimonials yet.</p>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((t, i) => (
              <motion.div
                key={t._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                layout
              >
                {t.type === "video" ? (
                  /* Video Card */
                  <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 hover:shadow-xl transition-shadow group">
                    <div
                      className="relative aspect-video bg-forest-900 cursor-pointer"
                      onClick={() => t.videoUrl && setPlayingVideo(t.videoUrl)}
                    >
                      {t.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.photoUrl} alt={t.name} className="w-full h-full object-cover opacity-60" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-forest-800 to-forest-900" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 text-forest-700 fill-forest-700 ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute top-3 left-3 px-2 py-1 bg-forest-700 text-white text-[10px] font-bold rounded-full uppercase tracking-wide">
                        Video
                      </div>
                    </div>
                    <div className="p-5">
                      <span className="text-forest-600 text-[11px] font-medium uppercase tracking-wide bg-forest-50 px-2.5 py-1 rounded-full">
                        {t.treatment}
                      </span>
                      <StarRating rating={t.rating} />
                      <p className="font-semibold text-gray-900 mt-3">{t.name}</p>
                      <p className="text-gray-400 text-sm">{t.location}</p>
                      {t.text && (
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2 italic">&ldquo;{t.text}&rdquo;</p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Text Card */
                  <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-shadow flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-forest-600 text-[11px] font-medium uppercase tracking-wide bg-forest-50 px-2.5 py-1 rounded-full">
                        {t.treatment}
                      </span>
                      <Quote className="w-8 h-8 text-forest-200 flex-shrink-0" />
                    </div>
                    <StarRating rating={t.rating} />
                    <blockquote className="font-serif text-gray-700 text-base leading-relaxed italic mt-4 flex-1">
                      &ldquo;{t.text}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3 mt-5 pt-5 border-t border-gray-50">
                      {t.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={t.photoUrl} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-forest-600 font-semibold text-sm">
                          {t.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                        <p className="text-gray-400 text-xs">{t.location}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Video Modal */}
      {playingVideo && (
        <VideoModal url={playingVideo} onClose={() => setPlayingVideo(null)} />
      )}

      <Footer />
    </div>
  );
}
