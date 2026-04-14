"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Send, CheckCircle, Phone, Leaf } from "lucide-react";

export default function ContactModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "", date: "", timeSlot: "" });

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("openContactModal", handler);
    return () => window.removeEventListener("openContactModal", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    } catch {
      // Still show success — don't block the user
    }
    setSubmitted(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] bg-black/65 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md max-h-[92vh] overflow-y-auto pointer-events-auto"
            >
              {/* Header */}
              <div className="relative bg-gradient-to-br from-forest-800 via-forest-900 to-forest-950 rounded-t-3xl px-7 py-7">
                <div className="absolute inset-0 rounded-t-3xl overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(201,168,76,0.18)_0%,transparent_60%)]" />
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/80 hover:text-white transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-forest-700 border border-gold-400/30 flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-gold-400" strokeWidth={1.5} />
                  </div>
                  <p className="text-gold-300 text-xs tracking-widest uppercase font-medium">BMG Siddha Hospital</p>
                </div>
                <h3 className="font-serif text-2xl text-white font-light leading-tight">
                  Book a Consultation
                </h3>
                <p className="text-white/50 text-xs mt-1.5 tracking-wide">
                  We&apos;ll confirm your appointment within 24 hours
                </p>
              </div>

              <div className="px-7 py-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-8 h-8 text-forest-600" />
                    </div>
                    <h4 className="font-serif text-xl text-forest-900 mb-2">Thank You!</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Your request has been received. Our team will contact you shortly to confirm your booking.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setOpen(false); }}
                      className="mt-6 px-6 py-2.5 text-sm text-forest-600 border border-forest-200 rounded-full hover:bg-forest-50 transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Your name"
                          className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-forest-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-forest-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                          Mobile *
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.mobile}
                          onChange={e => setForm({ ...form, mobile: e.target.value })}
                          placeholder="+91 XXXXX XXXXX"
                          className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-forest-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-forest-400 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                        Email <span className="normal-case text-gray-300 font-normal">(optional)</span>
                      </label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-forest-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-forest-400 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                        Message <span className="normal-case text-gray-300 font-normal">(optional)</span>
                      </label>
                      <textarea
                        rows={2}
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Describe your symptoms or health concern..."
                        className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-forest-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-forest-300 transition-all resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                          Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={form.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={e => setForm({ ...form, date: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-forest-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300 focus:border-forest-400 transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
                          Time Slot *
                        </label>
                        <select
                          required
                          value={form.timeSlot}
                          onChange={e => setForm({ ...form, timeSlot: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl border border-gray-200 bg-gray-50 text-forest-900 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300 transition-all"
                        >
                          <option value="">Select slot...</option>
                          <optgroup label="Morning (8 AM – 1 PM)">
                            <option>8:00 AM – 9:00 AM</option>
                            <option>9:00 AM – 10:00 AM</option>
                            <option>10:00 AM – 11:00 AM</option>
                            <option>11:00 AM – 12:00 PM</option>
                            <option>12:00 PM – 1:00 PM</option>
                          </optgroup>
                          <optgroup label="Evening (4 PM – 8 PM)">
                            <option>4:00 PM – 5:00 PM</option>
                            <option>5:00 PM – 6:00 PM</option>
                            <option>6:00 PM – 7:00 PM</option>
                            <option>7:00 PM – 8:00 PM</option>
                          </optgroup>
                        </select>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-forest-600 to-forest-700 text-white font-semibold rounded-xl text-sm tracking-wide shadow-lg hover:from-forest-500 hover:to-forest-600 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      Send Appointment Request
                    </motion.button>

                    <div className="flex items-center justify-center gap-2 pt-1">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-400 text-xs">Or call us:</span>
                      <a href="tel:+91XXXXXXXXXX" className="text-forest-600 text-xs font-semibold hover:underline">
                        +91 XXXXX XXXXX
                      </a>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
