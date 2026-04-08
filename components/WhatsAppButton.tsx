"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, Phone, MessageCircle } from "lucide-react";

const PHONE = "+91XXXXXXXXXX";        // ← replace with real number
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // ← replace with real number (digits only)
const WHATSAPP_MSG = encodeURIComponent(
  "Vanakkam! I would like to book a consultation at BMG Siddha Hospital."
);

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

      {/* Popup panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 w-72 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-br from-forest-800 to-forest-950 px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-sm">BMG</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">BMG Siddha Hospital</p>
                  <p className="text-green-300 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                    Online — ready to help
                  </p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat bubble */}
            <div className="px-4 py-4 bg-[#e5ddd5]">
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm inline-block max-w-[95%]">
                <p className="text-gray-700 text-sm leading-relaxed">
                  🌿 <strong>Vanakkam!</strong> Welcome to BMG Siddha Hospital.<br />
                  How can we help you today?<br />
                  <span className="text-gray-500 text-xs">Book a consultation or ask us anything.</span>
                </p>
                <p className="text-gray-300 text-[10px] text-right mt-1">Just now</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="px-4 py-4 space-y-2.5">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MSG}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 w-full py-3 px-4 bg-[#25D366] hover:bg-[#22c55e] text-white font-semibold text-sm rounded-xl transition-colors shadow-md"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.557 4.116 1.529 5.843L.057 23.997l6.305-1.455A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.643-.497-5.17-1.367l-.37-.22-3.742.863.934-3.635-.242-.385A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                <div className="text-left">
                  <p className="leading-tight">Chat on WhatsApp</p>
                  <p className="text-white/70 text-[10px] font-normal">Opens WhatsApp instantly</p>
                </div>
              </a>

              {/* Phone Call */}
              <a
                href={`tel:${PHONE}`}
                className="flex items-center gap-3 w-full py-3 px-4 bg-forest-600 hover:bg-forest-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-md"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <div className="text-left">
                  <p className="leading-tight">Call Us Directly</p>
                  <p className="text-white/70 text-[10px] font-normal">{PHONE}</p>
                </div>
              </a>

              {/* Book online */}
              <button
                onClick={() => { setOpen(false); window.dispatchEvent(new Event("openContactModal")); }}
                className="flex items-center gap-3 w-full py-3 px-4 border-2 border-forest-200 text-forest-700 font-semibold text-sm rounded-xl hover:bg-forest-50 transition-colors"
              >
                <MessageCircle className="w-5 h-5 flex-shrink-0" />
                <div className="text-left">
                  <p className="leading-tight">Book Consultation</p>
                  <p className="text-gray-400 text-[10px] font-normal">Fill the appointment form</p>
                </div>
              </button>
            </div>

            <p className="text-center text-gray-400 text-[10px] pb-3">
              OPD: Mon–Sat 8AM–1PM &amp; 4PM–8PM · Sun 8AM–12PM
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Two side-by-side FABs when closed */}
      <div className="flex items-center gap-3">
        {/* Phone FAB */}
        <AnimatePresence>
          {!open && (
            <motion.a
              href={`tel:${PHONE}`}
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              transition={{ delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="w-12 h-12 rounded-full bg-forest-600 hover:bg-forest-700 shadow-xl shadow-forest-700/30 flex items-center justify-center"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5 text-white" />
            </motion.a>
          )}
        </AnimatePresence>

        {/* WhatsApp FAB */}
        <motion.button
          onClick={() => setOpen(!open)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#22c55e] shadow-2xl shadow-green-700/40 flex items-center justify-center transition-colors relative"
          aria-label="Contact us"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6 text-white" />
              </motion.div>
            ) : (
              <motion.div key="wa" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.557 4.116 1.529 5.843L.057 23.997l6.305-1.455A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.88 0-3.643-.497-5.17-1.367l-.37-.22-3.742.863.934-3.635-.242-.385A9.944 9.944 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>
          {!open && (
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
