"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, Eye, EyeOff, Star, Video, FileText, X, Loader2 } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

interface Testimonial {
  _id: string; name: string; location: string; text: string;
  rating: number; treatment: string; type: "text" | "video";
  videoUrl: string; photoUrl: string; active: boolean;
}

const defaultForm = {
  name: "", location: "", text: "", rating: 5, treatment: "",
  type: "text" as "text" | "video", videoUrl: "", photoUrl: "",
};

export default function AdminTestimonials() {
  const router = useRouter();
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    fetch("/api/auth/me").then(r => { if (!r.ok) router.replace("/login"); }).catch(() => router.replace("/login"));
    fetchItems();
  }, [router]);

  const fetchItems = () => {
    fetch("/api/testimonials")
      .then(r => r.json())
      .then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm(defaultForm);
    setShowForm(false);
    fetchItems();
    setSaving(false);
  };

  const toggleActive = async (item: Testimonial) => {
    await fetch(`/api/testimonials/${item._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !item.active }),
    });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300";

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Testimonials</h1>
              <p className="text-gray-400 text-sm">{items.length} patient stories</p>
            </div>
            <button
              onClick={() => { setForm(defaultForm); setShowForm(true); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium"
            >
              <Plus className="w-4 h-4" /> Add Testimonial
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-900">Add Testimonial</h2>
                <button onClick={() => setShowForm(false)} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Type Selector */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {(["text", "video"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, type: t }))}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all ${
                      form.type === t
                        ? "border-forest-600 bg-forest-50 text-forest-800"
                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    {t === "video" ? <Video className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                    <div className="text-left">
                      <p className="font-medium text-sm capitalize">{t} Testimonial</p>
                      <p className="text-xs opacity-60">{t === "video" ? "Cloudinary video link" : "Written review"}</p>
                    </div>
                  </button>
                ))}
              </div>

              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Name *</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Location</label>
                    <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                      placeholder="City / Town" className={inputCls} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Treatment *</label>
                    <input required value={form.treatment} onChange={e => setForm({ ...form, treatment: e.target.value })}
                      placeholder="e.g. Varmam Therapy" className={inputCls} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Rating</label>
                    <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })} className={inputCls}>
                      {[5, 4, 3, 2, 1].map(r => <option key={r} value={r}>{r} Stars</option>)}
                    </select>
                  </div>
                </div>

                {/* Video URL (Cloudinary link) */}
                {form.type === "video" && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                      Cloudinary Video URL *
                    </label>
                    <input
                      required
                      type="url"
                      value={form.videoUrl}
                      onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                      placeholder="https://res.cloudinary.com/..."
                      className={inputCls}
                    />
                  </div>
                )}

                {/* Review Text */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Review Text {form.type === "text" && "*"}
                  </label>
                  <textarea rows={3} required={form.type === "text"} value={form.text}
                    onChange={e => setForm({ ...form, text: e.target.value })}
                    placeholder={form.type === "video" ? "Optional caption / description" : "Patient's review..."}
                    className={`${inputCls} resize-none`} />
                </div>

                {/* Patient Photo URL */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Patient Photo URL <span className="font-normal normal-case text-gray-400">(optional — Cloudinary link)</span>
                  </label>
                  <input
                    type="url"
                    value={form.photoUrl}
                    onChange={e => setForm({ ...form, photoUrl: e.target.value })}
                    placeholder="https://res.cloudinary.com/..."
                    className={inputCls}
                  />
                  {form.photoUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={form.photoUrl} alt="preview" className="mt-2 w-12 h-12 rounded-full object-cover border border-gray-200" />
                  )}
                </div>

                <div className="flex gap-3 pt-1">
                  <button type="submit" disabled={saving}
                    className="px-6 py-2.5 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium disabled:opacity-60 flex items-center gap-2">
                    {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                    {saving ? "Saving..." : "Add Testimonial"}
                  </button>
                  <button type="button" onClick={() => setShowForm(false)}
                    className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {items.map(item => (
                <div key={item._id} className={`bg-white rounded-2xl border border-gray-100 p-5 shadow-sm ${!item.active ? "opacity-50" : ""}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-shrink-0">
                      {item.type === "video" ? (
                        <div className="w-12 h-12 rounded-xl bg-forest-900 flex items-center justify-center">
                          <Video className="w-5 h-5 text-white/70" />
                        </div>
                      ) : item.photoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={item.photoUrl} alt={item.name} className="w-12 h-12 rounded-xl object-cover" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-forest-100 flex items-center justify-center text-forest-600 font-bold text-lg">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <p className="font-semibold text-gray-900">{item.name}</p>
                        {item.location && <><span className="text-gray-300">·</span><p className="text-gray-400 text-sm">{item.location}</p></>}
                        <span className="px-2 py-0.5 bg-forest-50 text-forest-700 text-xs rounded-full">{item.treatment}</span>
                        {item.type === "video" && (
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded-full font-medium">Video</span>
                        )}
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(item.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-gold-400 fill-gold-400" />)}
                      </div>
                      {item.text && (
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{item.text}</p>
                      )}
                      {item.type === "video" && item.videoUrl && (
                        <a href={item.videoUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-forest-600 text-xs mt-1 hover:underline">
                          <Video className="w-3 h-3" /> View video
                        </a>
                      )}
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <button onClick={() => toggleActive(item)}
                        className="p-2 rounded-lg text-gray-400 hover:text-forest-600 hover:bg-forest-50">
                        {item.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <button onClick={() => handleDelete(item._id)}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
