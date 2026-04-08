"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronDown, Leaf } from "lucide-react";
import { SectionLeaves } from "./Leaf3D";

interface FAQItem {
  _id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/faqs")
      .then((r) => r.json())
      .then((data) => { setFaqs(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="faq" ref={ref} className="py-24 bg-cream-100 relative overflow-hidden">
      <SectionLeaves count={3} colorScheme="mixed" intensity="light" />
      <div className="absolute -top-32 right-0 w-80 h-80 rounded-full bg-forest-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="inline-block text-gold-600 text-xs font-semibold tracking-widest uppercase mb-4 bg-gold-50 px-4 py-1.5 rounded-full border border-gold-200">
            Common Questions
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest-900 font-light leading-tight mb-4">
            Frequently Asked <em className="text-forest-600">Questions</em>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm">
            Everything you need to know about Siddha medicine and your visit to BMG Siddha Hospital.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <motion.div
                  key={faq._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className={`rounded-2xl border overflow-hidden transition-all ${
                    openIndex === i
                      ? "border-forest-300 shadow-md bg-white"
                      : "border-cream-200 bg-white/70 hover:bg-white hover:border-forest-200"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left"
                  >
                    <div className="flex items-center gap-3 flex-1 pr-4">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                        openIndex === i ? "bg-forest-600" : "bg-forest-50"
                      }`}>
                        <Leaf className={`w-3.5 h-3.5 transition-colors ${
                          openIndex === i ? "text-white" : "text-forest-500"
                        }`} strokeWidth={1.5} />
                      </div>
                      <span className={`font-semibold text-sm leading-snug transition-colors ${
                        openIndex === i ? "text-forest-800" : "text-gray-700"
                      }`}>
                        {faq.question}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === i ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className={`w-5 h-5 transition-colors ${
                        openIndex === i ? "text-forest-600" : "text-gray-400"
                      }`} />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 pl-16">
                          <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-10 text-center"
            >
              <p className="text-gray-500 text-sm mb-4">Still have questions? We&apos;re happy to help.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => window.dispatchEvent(new Event("openContactModal"))}
                  className="px-7 py-3 bg-forest-600 text-white text-sm font-semibold rounded-full hover:bg-forest-700 transition-colors shadow-md"
                >
                  Book a Free Consultation
                </button>
                <a
                  href="https://wa.me/91XXXXXXXXXX?text=Hello%2C%20I%20have%20a%20question%20about%20BMG%20Siddha%20Hospital."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3 bg-[#25D366] text-white text-sm font-semibold rounded-full hover:bg-[#22c55e] transition-colors shadow-md flex items-center gap-2"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.557 4.116 1.529 5.843L.057 23.997l6.305-1.455A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.643-.497-5.17-1.367l-.37-.22-3.742.863.934-3.635-.242-.385A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                  </svg>
                  Ask on WhatsApp
                </a>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
