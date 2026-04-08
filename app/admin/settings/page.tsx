"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";
import AdminSaveBar from "@/components/AdminSaveBar";

interface Settings {
  phone1: string; phone2: string; email: string; whatsapp: string;
  address: string; addressShort: string;
  opdMornStart: string; opdMornEnd: string;
  opdEveStart: string; opdEveEnd: string;
  sundayStart: string; sundayEnd: string;
  mapLat: string; mapLng: string;
  notificationEmail: string;
}

const inputCls = "w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300";

function Field({ label, id, multiline = false, form, setForm }: {
  label: string; id: keyof Settings; multiline?: boolean;
  form: Settings; setForm: React.Dispatch<React.SetStateAction<Settings>>;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">{label}</label>
      {multiline
        ? <textarea rows={4} value={form[id]} onChange={e => setForm(f => ({...f,[id]:e.target.value}))} className={`${inputCls} resize-none`} />
        : <input value={form[id]} onChange={e => setForm(f => ({...f,[id]:e.target.value}))} className={inputCls} />
      }
    </div>
  );
}

const D: Settings = {
  phone1:"+91 XXXXX XXXXX", phone2:"", email:"care@bmgsiddhahospital.in", whatsapp:"+91 XXXXX XXXXX",
  address:"Annammal Gnana Prakasam Campus,\nPaduvai Antoniyar Nagar,\nKannivadi Main Rd, Kuttathupatti (Po)\nDindigul – 624002",
  addressShort:"Kuttathupatti, Kannivadi Rd, Dindigul – 624002",
  opdMornStart:"8:00 AM", opdMornEnd:"1:00 PM",
  opdEveStart:"4:00 PM", opdEveEnd:"8:00 PM",
  sundayStart:"8:00 AM", sundayEnd:"12:00 PM",
  mapLat:"10.377361", mapLng:"77.892111",
  notificationEmail: "",
};

export default function AdminSettings() {
  const router = useRouter();
  const [form, setForm] = useState<Settings>(D);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then(r => { if (!r.ok) router.replace("/login"); }).catch(() => router.replace("/login"));
    fetch("/api/settings").then(r => r.json()).then(d => { if (d?.phone1) setForm(d); setLoading(false); }).catch(() => setLoading(false));
  }, [router]);

  const save = async (e?: React.FormEvent) => {
    e?.preventDefault(); setSaving(true);
    await fetch("/api/settings", { method:"PUT", headers:{"Content-Type":"application/json"}, body: JSON.stringify(form) });
    setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Link href="/admin" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>
              <h1 className="text-2xl font-semibold text-gray-900">Site Settings</h1>
              <p className="text-gray-400 text-sm">Contact info, OPD hours, address — used across the whole site</p>
            </div>
            <span />
          </div>

          {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" /></div> : (
            <>
            <AdminSaveBar saving={saving} saved={saved} onSave={save} />
            <form onSubmit={save} className="space-y-6">

              {/* Contact */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h2 className="font-semibold text-gray-900">📞 Contact Numbers & Email</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field form={form} setForm={setForm} label="Phone 1" id="phone1" />
                  <Field form={form} setForm={setForm} label="Phone 2 (optional)" id="phone2" />
                  <Field form={form} setForm={setForm} label="Email" id="email" />
                  <Field form={form} setForm={setForm} label="WhatsApp Number" id="whatsapp" />
                </div>
              </div>

              {/* Address */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h2 className="font-semibold text-gray-900">📍 Address</h2>
                <Field form={form} setForm={setForm} label="Full Address (multiline)" id="address" multiline />
                <Field form={form} setForm={setForm} label="Short Address (one line, shown in hero)" id="addressShort" />
              </div>

              {/* OPD Hours */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">🕐 OPD Hours</h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Morning (Mon–Sat)</p>
                    <div className="grid grid-cols-2 gap-4"><Field form={form} setForm={setForm} label="Start" id="opdMornStart" /><Field form={form} setForm={setForm} label="End" id="opdMornEnd" /></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Evening (Mon–Sat)</p>
                    <div className="grid grid-cols-2 gap-4"><Field form={form} setForm={setForm} label="Start" id="opdEveStart" /><Field form={form} setForm={setForm} label="End" id="opdEveEnd" /></div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wide mb-2">Sunday</p>
                    <div className="grid grid-cols-2 gap-4"><Field form={form} setForm={setForm} label="Start" id="sundayStart" /><Field form={form} setForm={setForm} label="End" id="sundayEnd" /></div>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
                <h2 className="font-semibold text-gray-900">🗺️ Map Location</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Field form={form} setForm={setForm} label="Latitude" id="mapLat" />
                  <Field form={form} setForm={setForm} label="Longitude" id="mapLng" />
                </div>
              </div>

              {/* Email Notifications */}
              <div className="bg-white rounded-2xl border border-forest-200 shadow-sm p-6 space-y-4">
                <div>
                  <h2 className="font-semibold text-gray-900">✉️ Appointment Email Notifications</h2>
                  <p className="text-gray-400 text-sm mt-1">
                    When a patient books an appointment, a notification is sent to this email. When you confirm an appointment, the patient receives a confirmation email automatically.
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                    Admin Notification Email
                  </label>
                  <input
                    type="email"
                    value={form.notificationEmail}
                    onChange={e => setForm({ ...form, notificationEmail: e.target.value })}
                    placeholder="e.g. appointments@bmgsiddhahospital.in"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">Leave empty to disable admin notifications.</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <p className="text-amber-800 text-xs font-medium">⚠️ Note: Patient confirmation emails are sent only if the patient provided their email address when booking.</p>
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
