"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Eye, EyeOff, ChevronDown, Pencil, Check, X } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

interface FAQItem { _id: string; question: string; answer: string; order: number; active: boolean; }

export default function AdminFAQs() {
  const router = useRouter();
  const [items, setItems] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ question: "", answer: "", order: 0 });
  const [form, setForm] = useState({ question:"", answer:"", order:0 });

  useEffect(() => {
    fetch("/api/auth/me").then(r => { if (!r.ok) router.replace("/login"); }).catch(() => router.replace("/login"));
    fetchItems();
  }, [router]);

  const fetchItems = () => {
    fetch("/api/faqs").then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault(); setSaving(true);
    await fetch("/api/faqs", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
    setForm({ question:"", answer:"", order:0 }); setShowForm(false); fetchItems(); setSaving(false);
  };

  const startEdit = (item: FAQItem) => {
    setEditingId(item._id);
    setEditForm({ question: item.question, answer: item.answer, order: item.order });
    setExpanded(item._id);
  };

  const saveEdit = async (id: string) => {
    await fetch(`/api/faqs/${id}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify(editForm) });
    setEditingId(null); fetchItems();
  };

  const toggleActive = async (item: FAQItem) => {
    await fetch(`/api/faqs/${item._id}`, { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ active: !item.active }) });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this FAQ?")) return;
    await fetch(`/api/faqs/${id}`, { method:"DELETE" }); fetchItems();
  };

  const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300";

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>
              <h1 className="text-2xl font-semibold text-gray-900">FAQs</h1>
              <p className="text-gray-400 text-sm">{items.length} questions</p>
            </div>
            <button onClick={() => setShowForm(!showForm)} className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium">
              <Plus className="w-4 h-4" /> Add FAQ
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
              <h2 className="font-semibold text-gray-900 mb-4">Add FAQ</h2>
              <form onSubmit={handleAdd} className="space-y-4">
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Question *</label><input required value={form.question} onChange={e => setForm({...form,question:e.target.value})} className={inputCls} /></div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Answer *</label><textarea required rows={4} value={form.answer} onChange={e => setForm({...form,answer:e.target.value})} className={`${inputCls} resize-none`} /></div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Order</label><input type="number" value={form.order} onChange={e => setForm({...form,order:Number(e.target.value)})} className="w-32 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                <div className="flex gap-3">
                  <button type="submit" disabled={saving} className="px-6 py-2.5 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium disabled:opacity-60">{saving ? "Saving..." : "Add FAQ"}</button>
                  <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium">Cancel</button>
                </div>
              </form>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" /></div>
          ) : (
            <div className="space-y-2">
              {items.map((item, i) => (
                <div key={item._id} className={`bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden ${!item.active ? "opacity-50" : ""}`}>
                  {/* Header row */}
                  <div className="flex items-center justify-between px-5 py-4 gap-3">
                    <button onClick={() => setExpanded(expanded === item._id ? null : item._id)} className="flex items-center gap-3 flex-1 text-left min-w-0">
                      <span className="w-6 h-6 rounded-full bg-forest-50 text-forest-700 text-xs font-bold flex items-center justify-center flex-shrink-0">{i+1}</span>
                      <span className="text-sm font-medium text-gray-900 truncate">{item.question}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${expanded === item._id ? "rotate-180" : ""}`} />
                    </button>
                    <div className="flex gap-1 flex-shrink-0">
                      <button onClick={() => startEdit(item)} title="Edit" className="p-1.5 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => toggleActive(item)} className="p-1.5 rounded-lg text-gray-400 hover:text-forest-600 hover:bg-forest-50">{item.active ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}</button>
                      <button onClick={() => handleDelete(item._id)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>

                  {/* Expanded: view or edit */}
                  {expanded === item._id && (
                    <div className="border-t border-gray-50 px-5 pb-5 pt-4">
                      {editingId === item._id ? (
                        <div className="space-y-3">
                          <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Question</label><input value={editForm.question} onChange={e=>setEditForm({...editForm,question:e.target.value})} className={inputCls} /></div>
                          <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Answer</label><textarea rows={4} value={editForm.answer} onChange={e=>setEditForm({...editForm,answer:e.target.value})} className={`${inputCls} resize-none`} /></div>
                          <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Order</label><input type="number" value={editForm.order} onChange={e=>setEditForm({...editForm,order:Number(e.target.value)})} className="w-24 px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" /></div>
                          <div className="flex gap-2 pt-1">
                            <button onClick={() => saveEdit(item._id)} className="flex items-center gap-1.5 px-4 py-2 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium"><Check className="w-3.5 h-3.5" /> Save</button>
                            <button onClick={() => setEditingId(null)} className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm"><X className="w-3.5 h-3.5" /> Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 leading-relaxed">{item.answer}</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
