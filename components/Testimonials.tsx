"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Play, ArrowRight } from "lucide-react";
import { SectionLeaves } from "./Leaf3D";
import { HerbalSprig, NeemBranch } from "./HerbIllustrations";
import Link from "next/link";

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

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  // once:false so it re-fires if user scrolls away and back
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [current, setCurrent] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/testimonials")
      .then((r) => r.json())
      .then((data) => {
        setTestimonials(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const prev = () => setCurrent((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  const next = () => setCurrent((p) => (p === testimonials.length - 1 ? 0 : p + 1));

  return (
    // Always keep the same section/ref in the DOM so useInView fires correctly
    <section ref={ref} className="py-24 bg-cream-100 relative overflow-hidden">
      <SectionLeaves count={3} colorScheme="forest" intensity="light" />

      <div className="absolute top-6 right-4 pointer-events-none hidden xl:block">
        <NeemBranch size={130} className="opacity-18" />
      </div>
      <div className="absolute bottom-6 left-4 pointer-events-none hidden xl:block">
        <HerbalSprig size={80} color="#c9a84c" className="opacity-22" />
      </div>
      <div className="absolute -top-40 left-0 w-80 h-80 rounded-full bg-forest-100/50 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-gold-600 text-xs font-semibold tracking-widest uppercase mb-4 bg-gold-50 px-4 py-1.5 rounded-full border border-gold-200">
            Patient Stories
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest-900 font-light leading-tight">
            Voices of <em className="text-forest-600">Healing</em>
          </h2>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
          </div>
        )}

        {/* Content */}
        {!loading && testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-white rounded-3xl shadow-xl shadow-forest-900/10 border border-cream-200 relative overflow-hidden"
              >
                {/* Video testimonial */}
                {testimonials[current].type === "video" && testimonials[current].videoUrl ? (
                  <div>
                    <div className="relative aspect-video bg-forest-900">
                      {testimonials[current].photoUrl && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={testimonials[current].photoUrl} alt={testimonials[current].name}
                          className="w-full h-full object-cover opacity-50" />
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <a href={testimonials[current].videoUrl} target="_blank" rel="noopener noreferrer"
                          className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                          <Play className="w-7 h-7 text-forest-700 fill-forest-700 ml-0.5" />
                        </a>
                      </div>
                      <div className="absolute top-4 left-4 px-3 py-1 bg-forest-700 text-white text-xs font-semibold rounded-full">
                        Video Testimonial
                      </div>
                    </div>
                    <div className="p-8 sm:p-10">
                      <span className="inline-block text-forest-600 text-xs font-medium tracking-wide uppercase bg-forest-50 px-3 py-1.5 rounded-full border border-forest-200 mb-4">
                        {testimonials[current].treatment}
                      </span>
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonials[current].rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-gold-500 fill-gold-500" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        ))}
                      </div>
                      {testimonials[current].text && (
                        <blockquote className="font-serif text-lg text-forest-900 font-light leading-relaxed italic mb-6">
                          &ldquo;{testimonials[current].text}&rdquo;
                        </blockquote>
                      )}
                      <div className="flex items-center gap-3">
                        {testimonials[current].photoUrl && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={testimonials[current].photoUrl} alt={testimonials[current].name}
                            className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <div>
                          <p className="font-semibold text-forest-800">{testimonials[current].name}</p>
                          <p className="text-gray-400 text-sm">{testimonials[current].location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Text testimonial */
                  <div className="p-8 sm:p-12">
                    <div className="absolute top-8 right-8 opacity-10">
                      <Quote className="w-16 h-16 text-forest-600" />
                    </div>
                    <span className="inline-block text-forest-600 text-xs font-medium tracking-wide uppercase bg-forest-50 px-3 py-1.5 rounded-full border border-forest-200 mb-6">
                      {testimonials[current].treatment}
                    </span>
                    <div className="flex gap-1 mb-5">
                      {[...Array(testimonials[current].rating)].map((_, i) => (
                        <svg key={i} className="w-5 h-5 text-gold-500 fill-gold-500" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <blockquote className="font-serif text-xl sm:text-2xl text-forest-900 font-light leading-relaxed italic mb-8">
                      &ldquo;{testimonials[current].text}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                      {testimonials[current].photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={testimonials[current].photoUrl} alt={testimonials[current].name}
                          className="w-10 h-10 rounded-full object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-forest-100 flex items-center justify-center text-forest-600 font-semibold">
                          {testimonials[current].name.charAt(0).toUpperCase()}
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-forest-800">{testimonials[current].name}</p>
                        <p className="text-gray-400 text-sm">{testimonials[current].location}</p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white border border-cream-200 shadow hover:shadow-md hover:border-forest-300 flex items-center justify-center text-forest-700 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 h-2.5 bg-forest-600"
                        : "w-2.5 h-2.5 bg-forest-200 hover:bg-forest-300"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full bg-white border border-cream-200 shadow hover:shadow-md hover:border-forest-300 flex items-center justify-center text-forest-700 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* See All Link */}
            <div className="text-center mt-8">
              <Link
                href="/testimonials"
                className="inline-flex items-center gap-2 text-forest-600 font-medium hover:text-forest-800 transition-colors group"
              >
                See all patient stories
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        )}

        {!loading && testimonials.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400">No testimonials yet.</p>
            <Link href="/testimonials" className="inline-flex items-center gap-2 text-forest-600 font-medium mt-3 hover:text-forest-800 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
