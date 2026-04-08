"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Eye, EyeOff } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

interface Service { _id: string; iconName: string; title: string; desc: string; color: string; active: boolean; }

const COLORS = [
  { label: "Green",  value: "bg-forest-50 text-forest-700 border-forest-200" },
  { label: "Amber",  value: "bg-amber-50 text-amber-700 border-amber-200" },
  { label: "Purple", value: "bg-purple-50 text-purple-700 border-purple-200" },
  { label: "Pink",   value: "bg-pink-50 text-pink-700 border-pink-200" },
  { label: "Orange", value: "bg-orange-50 text-orange-700 border-orange-200" },
  { label: "Teal",   value: "bg-teal-50 text-teal-700 border-teal-200" },
  { label: "Blue",   value: "bg-blue-50 text-blue-700 border-blue-200" },
  { label: "Rose",   value: "bg-rose-50 text-rose-700 border-rose-200" },
];

export default function AdminServices() {
  const router = useRouter();
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ iconName:"Stethoscope", title:"", desc:"", color:COLORS[0].value });

  useEffect(() => {
    fetch("/api/auth/me").then(r => { if (!r.ok) router.replace("/login"); }).catch(() => router.replace("/login"));
    fetchItems();
  }, [router]);

  const fetchItems = () => {
    fetch("/api/services").then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    await fetch("/api/services", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
    setForm({ iconName:"Stethoscope", title:"", desc:"", color:COLORS[0].value });
    setShowForm(false); fetchItems(); setSaving(false);
  };

  const toggleActive = async (item: Service) => {
    await fetch(`/api/services/${item._id}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ active: !item.active }) });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;
    await fetch(`/api/services/${id}`, { method:"DELETE" }); fetchItems();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>
              <h1 className="text-2xl font-semibold text-gray-900">Services</h1>
              <p className="text-gray-400 text-sm">{items.length} services</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium">
              <Plus className="w-4 h-4" /> Add Service
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">Add Service</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Icon Name</label><input value={form.iconName} onChange={e => setForm({...form,iconName:e.target.value})} placeholder="Stethoscope, Brain, Baby..." className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Color Theme</label>
                    <select value={form.color} onChange={e => setForm({...form,color:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300">
                      {COLORS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                </div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Title *</label><input required value={form.title} onChange={e => setForm({...form,title:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Description *</label><textarea required rows={3} value={form.desc} onChange={e => setForm({...form,desc:e.target.value})} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300 resize-none" /></div>
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
            <div className="grid grid-cols-2 gap-3">
              {items.map(item => (
                <div key={item._id} className={`bg-white rounded-2xl border border-gray-100 p-4 shadow-sm ${!item.active ? "opacity-50" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-gray-400 font-mono">{item.iconName}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${item.color}`}>color</span>
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">{item.title}</p>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">{item.desc}</p>
                    </div>
                    <div className="flex gap-1 ml-3 flex-shrink-0">
                      <button onClick={() => toggleActive(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-forest-600 hover:bg-forest-50">{item.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}</button>
                      <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
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
