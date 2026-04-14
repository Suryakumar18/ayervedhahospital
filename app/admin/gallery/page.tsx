"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Eye, EyeOff, Video, ImageIcon } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

interface GalleryItem {
  _id: string; src: string; caption: string; category: string;
  type: "image" | "video"; span: string; order: number; active: boolean;
}

const CATEGORIES = ["Hospital", "Treatment", "Consultation", "Diagnosis", "Medicines", "Herbs"];

export default function AdminGallery() {
  const router = useRouter();
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ src: "", caption: "", category: "Hospital", type: "image" as "image"|"video", span: "", order: 0 });

  useEffect(() => {
    fetch("/api/auth/me").then(r => { if (!r.ok) router.replace("/login"); }).catch(() => router.replace("/login"));
    fetchItems();
  }, [router]);

  const fetchItems = () => {
    fetch("/api/gallery").then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/gallery", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setForm({ src: "", caption: "", category: "Hospital", type: "image", span: "", order: 0 }); setShowForm(false); fetchItems(); }
    setSaving(false);
  };

  const toggleActive = async (item: GalleryItem) => {
    await fetch(`/api/gallery/${item._id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ active: !item.active }) });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this gallery item?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    fetchItems();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>
              <h1 className="text-2xl font-semibold text-gray-900">Gallery Management</h1>
              <p className="text-gray-400 text-sm">{items.length} items</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium">
              <Plus className="w-4 h-4" /> Add Item
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">Add Gallery Item</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Image / Video URL *</label>
                  <input type="url" required value={form.src} onChange={e => setForm({...form,src:e.target.value})} placeholder="https://res.cloudinary.com/..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Caption *</label><input required value={form.caption} onChange={e => setForm({...form,caption:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label>
                    <select value={form.category} onChange={e => setForm({...form,category:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300">
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Type</label>
                    <select value={form.type} onChange={e => setForm({...form,type:e.target.value as "image"|"video"})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300">
                      <option value="image">Image</option><option value="video">Video</option>
                    </select>
                  </div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Grid Span</label>
                    <select value={form.span} onChange={e => setForm({...form,span:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300">
                      <option value="">Normal</option><option value="col-span-2">Wide (2 cols)</option><option value="row-span-2">Tall (2 rows)</option><option value="col-span-2 row-span-2">Large (2×2)</option>
                    </select>
                  </div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Order</label><input type="number" value={form.order} onChange={e => setForm({...form,order:Number(e.target.value)})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                </div>
                <div className="flex gap-3">
                  <button type="submit" disabled={saving} className="px-6 py-2.5 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium disabled:opacity-60">{saving ? "Saving..." : "Add Item"}</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" /></div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map(item => (
                <div key={item._id} className={`bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm ${!item.active ? "opacity-50" : ""}`}>
                  <div className="relative aspect-square bg-gray-100">
                    {item.type === "video" ? (
                      <div className="w-full h-full flex items-center justify-center bg-forest-900"><Video className="w-10 h-10 text-white/50" /></div>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.src} alt={item.caption} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute top-2 right-2">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${item.type === "video" ? "bg-forest-600 text-white" : "bg-white/90 text-gray-700"}`}>
                        {item.type === "video" ? <Video className="w-3 h-3 inline" /> : <ImageIcon className="w-3 h-3 inline" />}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-gray-800 text-sm font-medium truncate">{item.caption}</p>
                    <p className="text-gray-400 text-xs">{item.category}</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => toggleActive(item)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium bg-gray-50 hover:bg-gray-100 text-gray-600">
                        {item.active ? <><Eye className="w-3.5 h-3.5" /> Hide</> : <><EyeOff className="w-3.5 h-3.5" /> Show</>}
                      </button>
                      <button onClick={() => handleDelete(item._id)} className="flex items-center justify-center p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50">
                        <Trash2 className="w-3.5 h-3.5" />
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
