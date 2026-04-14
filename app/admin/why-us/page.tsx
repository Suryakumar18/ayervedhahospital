"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminSaveBar from "@/components/AdminSaveBar";

interface Reason { _id?: string; iconName: string; title: string; desc: string; color: string; order: number; active: boolean; }
interface WhyUsData {
  badge: string; heading: string; headingHighlight: string; subheading: string; ctaText: string;
  stats: { num: string; label: string }[];
  reasons: Reason[];
}

const COLORS = [
  { label: "Green",  value: "bg-forest-600" }, { label: "Gold",  value: "bg-gold-500" },
  { label: "Teal",   value: "bg-teal-600" },   { label: "Amber", value: "bg-amber-500" },
  { label: "Rose",   value: "bg-rose-500" },   { label: "Blue",  value: "bg-blue-600" },
];

const D: WhyUsData = { badge:"Why Choose Us", heading:"Healing the Way", headingHighlight:"Nature Intended", subheading:"", ctaText:"Start Your Healing Journey", stats:[{num:"5000+",label:"Patients"},{num:"98%",label:"Satisfaction"},{num:"100+",label:"Herbs"}], reasons:[] };
const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300";

export default function AdminWhyUs() {
  const router = useRouter();
  const [data, setData] = useState<WhyUsData>(D);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then(r => { if (!r.ok) router.replace("/login"); }).catch(() => router.replace("/login"));
    fetch("/api/why-us").then(r => r.json()).then(d => { if (d?.badge) setData(d); setLoading(false); }).catch(() => setLoading(false));
  }, [router]);

  const save = async (e?: React.FormEvent) => {
    e?.preventDefault(); setSaving(true);
    await fetch("/api/why-us", { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(data) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  const updateReason = (i: number, f: keyof Reason, v: string | boolean | number) => { const r=[...data.reasons]; r[i]={...r[i],[f]:v}; setData({...data,reasons:r}); };
  const addReason = () => setData({...data, reasons:[...data.reasons,{iconName:"CheckCircle2",title:"",desc:"",color:"bg-forest-600",order:data.reasons.length,active:true}]});
  const removeReason = (i: number) => { const r=[...data.reasons]; r.splice(i,1); setData({...data,reasons:r}); };
  const updateStat = (i: number, f: "num"|"label", v: string) => { const s=[...data.stats]; s[i]={...s[i],[f]:v}; setData({...data,stats:s}); };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>
              <h1 className="text-2xl font-semibold text-gray-900">Why Choose Us</h1>
              <p className="text-gray-400 text-sm">Manage reasons, stats and heading</p>
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
                  <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Highlight</label><input value={data.headingHighlight} onChange={e=>setData({...data,headingHighlight:e.target.value})} className={inputCls} /></div>
                </div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Subheading</label><textarea rows={2} value={data.subheading} onChange={e=>setData({...data,subheading:e.target.value})} className={`${inputCls} resize-none`} /></div>
                <div><label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">CTA Button Text</label><input value={data.ctaText} onChange={e=>setData({...data,ctaText:e.target.value})} className={inputCls} /></div>
              </div>

              {/* Stats */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">📊 Stats Row</h2>
                <div className="grid grid-cols-3 gap-4">
                  {data.stats.map((s,i)=>(
                    <div key={i} className="bg-gray-50 rounded-xl p-3 space-y-2">
                      <div><label className="block text-xs text-gray-500 mb-1">Number</label><input value={s.num} onChange={e=>updateStat(i,'num',e.target.value)} className={inputCls} /></div>
                      <div><label className="block text-xs text-gray-500 mb-1">Label</label><input value={s.label} onChange={e=>updateStat(i,'label',e.target.value)} className={inputCls} /></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reasons */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-semibold text-gray-900">✅ Reasons / Cards</h2>
                  <button type="button" onClick={addReason} className="flex items-center gap-1.5 px-4 py-2 bg-forest-700 hover:bg-forest-600 text-white rounded-xl text-sm font-medium"><Plus className="w-4 h-4" /> Add Reason</button>
                </div>
                <div className="space-y-4">
                  {data.reasons.map((r,i)=>(
                    <div key={i} className="border border-gray-100 rounded-2xl p-4 bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-bold text-gray-400 uppercase">Reason {i+1}</span>
                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
                            <input type="checkbox" checked={r.active} onChange={e=>updateReason(i,'active',e.target.checked)} className="rounded" /> Active
                          </label>
                          <button type="button" onClick={()=>removeReason(i)} className="p-1 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div><label className="block text-xs text-gray-500 mb-1">Icon Name (Lucide)</label><input value={r.iconName} onChange={e=>updateReason(i,'iconName',e.target.value)} placeholder="CheckCircle2, Leaf, FlaskConical..." className={inputCls} /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Icon Color</label>
                          <select value={r.color} onChange={e=>updateReason(i,'color',e.target.value)} className={inputCls}>
                            {COLORS.map(c=><option key={c.value} value={c.value}>{c.label}</option>)}
                          </select>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div><label className="block text-xs text-gray-500 mb-1">Title</label><input value={r.title} onChange={e=>updateReason(i,'title',e.target.value)} className={inputCls} /></div>
                        <div><label className="block text-xs text-gray-500 mb-1">Description</label><textarea rows={2} value={r.desc} onChange={e=>updateReason(i,'desc',e.target.value)} className={`${inputCls} resize-none`} /></div>
                      </div>
                    </div>
                  ))}
                  {data.reasons.length === 0 && <p className="text-gray-400 text-sm text-center py-6">No reasons yet. Click "Add Reason".</p>}
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
