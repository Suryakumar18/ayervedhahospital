"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, GripVertical } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminSaveBar from "@/components/AdminSaveBar";

interface TimelineItem { _id?: string; iconName: string; year: string; colorClass: string; dotClass: string; title: string; desc: string; order: number; }
interface AboutData {
  badge: string; heading: string; headingHighlight: string; topQuote: string;
  timeline: TimelineItem[];
  closingQuote: string; closingAuthor: string;
  stats: { v: string; l: string }[];
}

const COLORS = [
  { label: "Amber",  colorClass: "bg-amber-50 border-amber-200 text-amber-700",   dotClass: "bg-amber-400" },
  { label: "Green",  colorClass: "bg-forest-50 border-forest-200 text-forest-700", dotClass: "bg-forest-500" },
  { label: "Blue",   colorClass: "bg-blue-50 border-blue-200 text-blue-700",       dotClass: "bg-blue-500" },
  { label: "Gold",   colorClass: "bg-gold-50 border-gold-200 text-gold-700",       dotClass: "bg-gold-500" },
  { label: "Rose",   colorClass: "bg-rose-50 border-rose-200 text-rose-700",       dotClass: "bg-rose-500" },
  { label: "Purple", colorClass: "bg-purple-50 border-purple-200 text-purple-700", dotClass: "bg-purple-500" },
];

const D: AboutData = {
  badge:"Our Story", heading:"A Century of", headingHighlight:"Healing Wisdom",
  topQuote:"Long ago, in the ancient land of Tamil Nadu, the wisdom of healing flowed through the teachings of the great Siddhars.",
  timeline:[], closingQuote:"", closingAuthor:"Antony Gnana Prabhu, Founder",
  stats:[{v:"3rd",l:"Generation"},{v:"100+",l:"Years"},{v:"5000+",l:"Patients"}],
};

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300";

export default function AdminAbout() {
  const router = useRouter();
  const [data, setData] = useState<AboutData>(D);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then(r => { if (!r.ok) router.replace("/login"); }).catch(() => router.replace("/login"));
    fetch("/api/about").then(r => r.json()).then(d => { if (d?.badge) setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, [router]);

  const save = async (e?: React.FormEvent) => {
    e?.preventDefault(); setSaving(true);
    await fetch("/api/about", { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const updateTimeline = (i: number, field: keyof TimelineItem, val: string | number) => {
    const t = [...data.timeline]; t[i] = {...t[i], [field]: val}; setData({...data, timeline: t});
  };
  const addTimeline = () => setData({...data, timeline: [...data.timeline, { iconName:"Leaf", year:"", colorClass:COLORS[0].colorClass, dotClass:COLORS[0].dotClass, title:"", desc:"", order: data.timeline.length }]});
  const removeTimeline = (i: number) => { const t = [...data.timeline]; t.splice(i,1); setData({...data, timeline: t}); };

  const updateStat = (i: number, f: "v"|"l", v: string) => { const s=[...data.stats]; s[i]={...s[i],[f]:v}; setData({...data,stats:s}); };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>
              <h1 className="text-2xl font-semibold text-gray-900">Our Story Section</h1>
              <p className="text-gray-400 text-sm">Timeline, quotes, stats for the About section</p>
            </div>
            <span />
          </div>

          {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" /></div> : (
            <>
            <AdminSaveBar saving={saving} saved={saved} onSave={save} />
            <form onSubmit={save} className="space-y-6">

              {/* Header */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h2 className="font-semibold text-gray-900">✏️ Section Header</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Badge</label><input value={data.badge} onChange={e=>setData({...data,badge:e.target.value})} className={inputCls} /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Heading</label><input value={data.heading} onChange={e=>setData({...data,heading:e.target.value})} className={inputCls} /></div>
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Highlight (italic)</label><input value={data.headingHighlight} onChange={e=>setData({...data,headingHighlight:e.target.value})} className={inputCls} /></div>
                </div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Top Quote</label><textarea rows={2} value={data.topQuote} onChange={e=>setData({...data,topQuote:e.target.value})} className={`${inputCls} resize-none`} /></div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">📅 Timeline Items</h2>
                  <button type="button" onClick={addTimeline} className="flex items-center gap-1.5 px-4 py-2 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium"><Plus className="w-4 h-4" /> Add Item</button>
                </div>
                <div className="space-y-4">
                  {data.timeline.map((item, i) => (
                    <div key={i} className="border border-gray-100 rounded-2xl p-4 bg-gray-50 relative">
                      <div className="flex items-center gap-2 mb-3">
                        <GripVertical className="w-4 h-4 text-gray-300" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Item {i+1}</span>
                        <button type="button" onClick={() => removeTimeline(i)} className="ml-auto p-1 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div><label className="block text-xs text-gray-500 mb-1">Icon Name (Lucide)</label><input value={item.iconName} onChange={e=>updateTimeline(i,'iconName',e.target.value)} placeholder="BookOpen, Leaf, Building2..." className={inputCls} /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Year / Period</label><input value={item.year} onChange={e=>updateTimeline(i,'year',e.target.value)} className={inputCls} /></div>
                      </div>
                      <div className="mb-3"><label className="block text-xs text-gray-500 mb-1">Color Theme</label>
                        <select value={item.colorClass} onChange={e => { const c = COLORS.find(x=>x.colorClass===e.target.value); updateTimeline(i,'colorClass',e.target.value); if(c) updateTimeline(i,'dotClass',c.dotClass); }} className={inputCls}>
                          {COLORS.map(c=><option key={c.colorClass} value={c.colorClass}>{c.label}</option>)}
                        </select>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div><label className="block text-xs text-gray-500 mb-1">Title</label><input value={item.title} onChange={e=>updateTimeline(i,'title',e.target.value)} className={inputCls} /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Description</label><textarea rows={3} value={item.desc} onChange={e=>updateTimeline(i,'desc',e.target.value)} className={`${inputCls} resize-none`} /></div>
                      </div>
                    </div>
                  ))}
                  {data.timeline.length === 0 && <p className="text-gray-400 text-sm text-center py-6">No timeline items. Click "Add Item" to start.</p>}
                </div>
              </div>

              {/* Closing quote */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h2 className="font-semibold text-gray-900">💬 Closing Quote (dark card)</h2>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Quote</label><textarea rows={3} value={data.closingQuote} onChange={e=>setData({...data,closingQuote:e.target.value})} className={`${inputCls} resize-none`} /></div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Author</label><input value={data.closingAuthor} onChange={e=>setData({...data,closingAuthor:e.target.value})} className={inputCls} /></div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">📊 Stats (sidebar)</h2>
                <div className="grid grid-cols-3 gap-4">
                  {data.stats.map((s,i)=>(
                    <div key={i} className="bg-gray-50 rounded-xl p-3 space-y-2">
                      <div><label className="block text-xs text-gray-500 mb-1">Value</label><input value={s.v} onChange={e=>updateStat(i,'v',e.target.value)} className={inputCls} /></div>
                      <div><label className="block text-xs text-gray-500 mb-1">Label</label><input value={s.l} onChange={e=>updateStat(i,'l',e.target.value)} className={inputCls} /></div>
                    </div>
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
