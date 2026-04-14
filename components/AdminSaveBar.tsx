"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, CheckCircle2 } from "lucide-react";

interface Props {
  saving: boolean;
  saved: boolean;
  onSave: () => void;
  label?: string;
}

export default function AdminSaveBar({ saving, saved, onSave, label = "Save Changes" }: Props) {
  const [showToast, setShowToast] = useState(false);
  const [toastOut, setToastOut] = useState(false);

  useEffect(() => {
    if (saved) {
      setToastOut(false);
      setShowToast(true);
      const hide = setTimeout(() => setToastOut(true), 2800);
      const remove = setTimeout(() => setShowToast(false), 3300);
      return () => { clearTimeout(hide); clearTimeout(remove); };
    }
  }, [saved]);

  return (
    <>
      {/* ── Floating Save Button (fixed right side, vertically centered) ── */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[60] flex flex-col items-end pr-0">
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className={`
            group flex items-center gap-0 overflow-hidden
            h-12 rounded-l-2xl shadow-xl border-l border-t border-b border-white/20
            transition-all duration-300 ease-out
            ${saving
              ? "bg-forest-600 w-12 cursor-not-allowed"
              : saved
              ? "bg-green-600 w-12 hover:w-40"
              : "bg-forest-700 hover:bg-forest-600 w-12 hover:w-40"
            }
          `}
        >
          <span className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
            {saving
              ? <Loader2 className="w-5 h-5 text-white animate-spin" />
              : saved
              ? <CheckCircle2 className="w-5 h-5 text-white" />
              : <Save className="w-5 h-5 text-white" />
            }
          </span>
          <span className="text-white text-sm font-semibold whitespace-nowrap pr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200 overflow-hidden">
            {saving ? "Saving…" : saved ? "Saved!" : label}
          </span>
        </button>
      </div>

      {/* ── Toast notification ── */}
      {showToast && (
        <div
          className={`fixed bottom-6 right-6 z-[70] flex items-center gap-3 px-5 py-4 bg-gray-900 text-white rounded-2xl shadow-2xl border border-white/10 transition-all duration-500 ${
            toastOut ? "opacity-0 translate-y-4 scale-95" : "opacity-100 translate-y-0 scale-100"
          }`}
          style={{ minWidth: "240px" }}
        >
          {/* Animated ring + check */}
          <div className="relative flex-shrink-0">
            <svg className="w-8 h-8" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="100" strokeDashoffset="100"
                style={{ animation: "strokeDash 0.5s ease forwards", strokeLinecap: "round" }} />
            </svg>
            <CheckCircle2 className="w-5 h-5 text-green-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">Saved successfully!</p>
            <p className="text-white/50 text-xs mt-0.5">All changes have been updated.</p>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{ animation: "shrink 3s linear forwards" }}
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes strokeDash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes shrink {
          from { width: 100%; }
          to   { width: 0%; }
        }
      `}</style>
    </>
  );
}
