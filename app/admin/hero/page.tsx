"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminSaveBar from "@/components/AdminSaveBar";

interface HeroSettings {
  backgroundImage: string;
  badge: string;
  heading: string;
  headingHighlight: string;
  tamil: string;
  subtitle: string;
  stats: { value: string; label: string }[];
  ctaPrimary: string;
  ctaSecondary: string;
  herbBadges: string[];
  address: string;
  whatsappNumber: string;
  callNumber: string;
}

const DEFAULT: HeroSettings = {
  backgroundImage: "https://res.cloudinary.com/dx98orvo0/image/upload/v1775367195/weed-leaves-oil-product-still-life_jqpa3h.jpg",
  badge: "Ancient Siddha Wisdom · Since 2004",
  heading: "BMG Siddha",
  headingHighlight: "Hospital",
  tamil: "✦ சித்த மருத்துவம் · ஆரோக்கியமான வாழ்வு ✦",
  subtitle: "Rooted in the timeless science of Siddha medicine — healing body, mind and soul through the sacred power of nature's finest herbs and ancient wisdom.",
  stats: [{ value: "5000+", label: "Patients Healed" }, { value: "20+", label: "Years of Care" }, { value: "100+", label: "Siddha Herbs" }],
  ctaPrimary: "Book Consultation",
  ctaSecondary: "View Treatments",
  herbBadges: ["🌿 Tulsi", "🍃 Neem", "🌸 Lotus", "💛 Turmeric", "🌱 Ashwagandha"],
  address: "📍 Kuttathupatti, Kannivadi Rd, Dindigul – 624002",
  whatsappNumber: "+91 98765 43210",
  callNumber: "+91 98765 43210",
};

export default function AdminHero() {
  const router = useRouter();
  const [form, setForm] = useState<HeroSettings>(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [herbBadgesText, setHerbBadgesText] = useState("");

  useEffect(() => {
    fetch("/api/auth/me").then(r => { if (!r.ok) router.replace("/login"); }).catch(() => router.replace("/login"));
    fetch("/api/hero").then(r => r.json()).then(d => {
      if (d && d.backgroundImage) {
        setForm(d);
        setHerbBadgesText(Array.isArray(d.herbBadges) ? d.herbBadges.join(", ") : "");
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [router]);

  const setStat = (i: number, field: "value" | "label", val: string) => {
    const stats = [...form.stats];
    stats[i] = { ...stats[i], [field]: val };
    setForm({ ...form, stats });
  };

  const handleSave = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      herbBadges: herbBadgesText.split(",").map(s => s.trim()).filter(Boolean),
    };
    await fetch("/api/hero", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  );

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300 bg-white";

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>
              <h1 className="text-2xl font-semibold text-gray-900">Hero Section</h1>
              <p className="text-gray-400 text-sm">Edit the homepage hero — background, text, numbers, buttons</p>
            </div>
            <span />
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" /></div>
          ) : (
            <>
            <AdminSaveBar saving={saving} saved={saved} onSave={handleSave} />
            <form onSubmit={handleSave} className="space-y-6">

              {/* Background */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">🖼️ Background Image</h2>
                <Field label="Background Image URL">
                  <input value={form.backgroundImage} onChange={e => setForm({...form,backgroundImage:e.target.value})} className={inputCls} placeholder="https://..." />
                </Field>
                {form.backgroundImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={form.backgroundImage} alt="preview" className="mt-3 w-full h-40 object-cover rounded-xl border border-gray-100" />
                )}
              </div>

              {/* Contact Numbers */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">📞 Contact Numbers</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="WhatsApp Number">
                    <input value={form.whatsappNumber} onChange={e => setForm({...form,whatsappNumber:e.target.value})} className={inputCls} placeholder="+91 98765 43210" />
                  </Field>
                  <Field label="Call Number">
                    <input value={form.callNumber} onChange={e => setForm({...form,callNumber:e.target.value})} className={inputCls} placeholder="+91 98765 43210" />
                  </Field>
                </div>
              </div>

              {/* Text Content */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">✏️ Text Content</h2>
                <div className="space-y-4">
                  <Field label="Badge Text (top small label)">
                    <input value={form.badge} onChange={e => setForm({...form,badge:e.target.value})} className={inputCls} />
                  </Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Main Heading">
                      <input value={form.heading} onChange={e => setForm({...form,heading:e.target.value})} className={inputCls} />
                    </Field>
                    <Field label="Heading Highlight (gold text)">
                      <input value={form.headingHighlight} onChange={e => setForm({...form,headingHighlight:e.target.value})} className={inputCls} />
                    </Field>
                  </div>
                  <Field label="Tamil Text">
                    <input value={form.tamil} onChange={e => setForm({...form,tamil:e.target.value})} className={inputCls} />
                  </Field>
                  <Field label="Subtitle / Description">
                    <textarea rows={3} value={form.subtitle} onChange={e => setForm({...form,subtitle:e.target.value})} className={`${inputCls} resize-none`} />
                  </Field>
                  <Field label="Address Line">
                    <input value={form.address} onChange={e => setForm({...form,address:e.target.value})} className={inputCls} />
                  </Field>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">📊 Statistics (3 numbers shown in hero)</h2>
                <div className="grid grid-cols-3 gap-4">
                  {form.stats.map((s, i) => (
                    <div key={i} className="bg-gray-50 rounded-xl p-4 space-y-3">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Stat {i+1}</p>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Value (e.g. 5000+)</label>
                        <input value={s.value} onChange={e => setStat(i,"value",e.target.value)} className={inputCls} />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1">Label</label>
                        <input value={s.label} onChange={e => setStat(i,"label",e.target.value)} className={inputCls} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">🔘 CTA Buttons</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Primary Button (gold)">
                    <input value={form.ctaPrimary} onChange={e => setForm({...form,ctaPrimary:e.target.value})} className={inputCls} />
                  </Field>
                  <Field label="Secondary Button (outline)">
                    <input value={form.ctaSecondary} onChange={e => setForm({...form,ctaSecondary:e.target.value})} className={inputCls} />
                  </Field>
                </div>
              </div>

              {/* Herb Badges */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">🌿 Herb Badges</h2>
                <Field label="Badges (comma separated)">
                  <input value={herbBadgesText} onChange={e => setHerbBadgesText(e.target.value)} className={inputCls} placeholder="🌿 Tulsi, 🍃 Neem, 🌸 Lotus, ..." />
                </Field>
                <div className="flex flex-wrap gap-2 mt-3">
                  {herbBadgesText.split(",").map(s=>s.trim()).filter(Boolean).map((h,i) => (
                    <span key={i} className="px-3 py-1 text-xs text-white/65 bg-forest-800 border border-white/15 rounded-full">{h}</span>
                  ))}
                </div>
              </div>

              <div className="pb-24" />
            </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
