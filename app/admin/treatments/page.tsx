"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

interface Treatment {
  _id: string; name: string; tamil: string; category: string;
  description: string; conditions: string[]; image: string; active: boolean;
}

export default function AdminTreatments() {
  const router = useRouter();
  const [items, setItems] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name:"", tamil:"", category:"Classical", description:"", conditions:"", image:"" });

  useEffect(() => {
    fetch("/api/auth/me").then(r => { if (!r.ok) router.replace("/login"); }).catch(() => router.replace("/login"));
    fetchItems();
  }, [router]);

  const fetchItems = () => {
    fetch("/api/treatments").then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    await fetch("/api/treatments", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({...form, conditions: form.conditions.split(",").map(s=>s.trim()).filter(Boolean)}) });
    setForm({ name:"", tamil:"", category:"Classical", description:"", conditions:"", image:"" });
    setShowForm(false); fetchItems(); setSaving(false);
  };

  const toggleActive = async (item: Treatment) => {
    await fetch(`/api/treatments/${item._id}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ active: !item.active }) });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this treatment?")) return;
    await fetch(`/api/treatments/${id}`, { method:"DELETE" }); fetchItems();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>
              <h1 className="text-2xl font-semibold text-gray-900">Treatments</h1>
              <p className="text-gray-400 text-sm">{items.length} treatments</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium">
              <Plus className="w-4 h-4" /> Add Treatment
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">Add Treatment</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Name *</label><input required value={form.name} onChange={e => setForm({...form,name:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Tamil Name</label><input value={form.tamil} onChange={e => setForm({...form,tamil:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Category</label><input value={form.category} onChange={e => setForm({...form,category:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Conditions (comma separated)</label><input value={form.conditions} onChange={e => setForm({...form,conditions:e.target.value})} placeholder="Arthritis, Pain, ..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                </div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Image URL *</label><input required value={form.image} onChange={e => setForm({...form,image:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description *</label><textarea required rows={3} value={form.description} onChange={e => setForm({...form,description:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300 resize-none" /></div>
                <div className="flex gap-3">
                  <button type="submit" disabled={saving} className="px-6 py-2.5 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium disabled:opacity-60">{saving ? "Saving..." : "Add"}</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" /></div>
          ) : (
            <div className="space-y-3">
              {items.map(item => (
                <div key={item._id} className={`bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex gap-4 ${!item.active ? "opacity-50" : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-20 h-16 object-cover rounded-xl flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      {item.tamil && <span className="text-gold-600 text-xs">{item.tamil}</span>}
                      <span className="px-2 py-0.5 bg-forest-50 text-forest-700 text-xs rounded-full">{item.category}</span>
                    </div>
                    <p className="text-gray-500 text-sm line-clamp-2">{item.description}</p>
                    <div className="flex flex-wrap gap-1 mt-1">{item.conditions.map(c => <span key={c} className="text-xs text-gold-700 bg-gold-50 px-2 py-0.5 rounded-full">{c}</span>)}</div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button onClick={() => toggleActive(item)} className="p-2 rounded-lg text-gray-400 hover:text-forest-600 hover:bg-forest-50">{item.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                    <button onClick={() => handleDelete(item._id)} className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
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
