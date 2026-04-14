"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Phone, Mail, Calendar, Clock, MessageSquare, CheckCircle, XCircle, RotateCcw, Trash2, Search } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

interface Appointment {
  _id: string; name: string; mobile: string; email: string;
  message: string; date: string; timeSlot: string;
  status: "pending" | "confirmed" | "cancelled"; createdAt: string;
}

export default function AdminAppointments() {
  const router = useRouter();
  const [items, setItems] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all"|"pending"|"confirmed"|"cancelled">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/auth/me").then(r => { if (!r.ok) router.replace("/login"); }).catch(() => router.replace("/login"));
    fetchItems();
  }, [router]);

  const fetchItems = () => {
    fetch("/api/appointments").then(r => r.json()).then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); }).catch(() => setLoading(false));
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`/api/appointments/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this enquiry?")) return;
    await fetch(`/api/appointments/${id}`, { method: "DELETE" });
    fetchItems();
  };

  const filtered = items
    .filter(a => filter === "all" || a.status === filter)
    .filter(a => !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.mobile.includes(search));

  const counts = {
    all: items.length,
    pending: items.filter(a => a.status === "pending").length,
    confirmed: items.filter(a => a.status === "confirmed").length,
    cancelled: items.filter(a => a.status === "cancelled").length,
  };

  const statusStyle = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    confirmed: "bg-green-50 text-green-700 border-green-200",
    cancelled: "bg-red-50 text-red-600 border-red-200",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="ml-60 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link href="/admin" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm mb-2"><ArrowLeft className="w-4 h-4" /> Dashboard</Link>
            <h1 className="text-2xl font-semibold text-gray-900">Appointments & Enquiries</h1>
            <p className="text-gray-400 text-sm">{counts.pending} pending · {counts.confirmed} confirmed · {counts.cancelled} cancelled</p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-4 gap-3 mb-6">
            {(["all","pending","confirmed","cancelled"] as const).map(s => (
              <button key={s} onClick={() => setFilter(s)}
                className={`rounded-2xl p-4 text-left border transition-all ${filter === s ? "border-forest-300 bg-forest-50" : "bg-white border-gray-100 hover:border-gray-200"}`}>
                <p className={`text-2xl font-bold ${s === "pending" ? "text-amber-600" : s === "confirmed" ? "text-green-600" : s === "cancelled" ? "text-red-500" : "text-gray-800"}`}>{counts[s]}</p>
                <p className="text-gray-400 text-xs capitalize mt-0.5">{s === "all" ? "Total" : s}</p>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or phone..." className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-300" />
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" /></div>
          ) : filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
              <Calendar className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">No enquiries found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map(a => (
                <div key={a._id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <p className="font-semibold text-gray-900 text-base">{a.name}</p>
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${statusStyle[a.status]}`}>{a.status}</span>
                        <span className="text-gray-300 text-xs ml-auto">{new Date(a.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" })}</span>
                      </div>

                      {/* Contact info */}
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <a href={`tel:${a.mobile}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-forest-700 group">
                          <span className="w-7 h-7 rounded-lg bg-forest-50 group-hover:bg-forest-100 flex items-center justify-center flex-shrink-0"><Phone className="w-3.5 h-3.5 text-forest-600" /></span>
                          {a.mobile}
                        </a>
                        {a.email && (
                          <a href={`mailto:${a.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-forest-700 group">
                            <span className="w-7 h-7 rounded-lg bg-forest-50 group-hover:bg-forest-100 flex items-center justify-center flex-shrink-0"><Mail className="w-3.5 h-3.5 text-forest-600" /></span>
                            <span className="truncate">{a.email}</span>
                          </a>
                        )}
                        {a.date && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0"><Calendar className="w-3.5 h-3.5 text-amber-600" /></span>
                            {a.date}
                          </div>
                        )}
                        {a.timeSlot && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0"><Clock className="w-3.5 h-3.5 text-amber-600" /></span>
                            {a.timeSlot}
                          </div>
                        )}
                      </div>

                      {/* Message */}
                      {a.message && (
                        <div className="flex gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
                          <MessageSquare className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-500 italic">{a.message}</p>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      {a.status !== "confirmed" && (
                        <button onClick={() => updateStatus(a._id,"confirmed")} className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-xs font-medium">
                          <CheckCircle className="w-3.5 h-3.5" /> Confirm
                        </button>
                      )}
                      {a.status !== "cancelled" && (
                        <button onClick={() => updateStatus(a._id,"cancelled")} className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-medium">
                          <XCircle className="w-3.5 h-3.5" /> Cancel
                        </button>
                      )}
                      {a.status !== "pending" && (
                        <button onClick={() => updateStatus(a._id,"pending")} className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg text-xs font-medium">
                          <RotateCcw className="w-3.5 h-3.5" /> Pending
                        </button>
                      )}
                      <button onClick={() => handleDelete(a._id)} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg text-xs font-medium">
                        <Trash2 className="w-3.5 h-3.5" /> Delete
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
