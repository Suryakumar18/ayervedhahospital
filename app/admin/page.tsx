"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Images, MessageSquare, Calendar, Clock } from "lucide-react";
import AdminSidebar from "@/components/AdminSidebar";

interface Stats {
  gallery: number;
  testimonials: number;
  appointments: number;
  pending: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [stats, setStats] = useState<Stats>({ gallery: 0, testimonials: 0, appointments: 0, pending: 0 });
  const [appointments, setAppointments] = useState<Array<{
    _id: string; name: string; mobile: string; date: string;
    timeSlot: string; status: string; createdAt: string;
  }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => {
        if (!r.ok) { router.replace("/login"); return null; }
        return r.json();
      })
      .then((data) => { if (data) setUsername(data.username); })
      .catch(() => router.replace("/login"));
  }, [router]);

  useEffect(() => {
    Promise.all([
      fetch("/api/gallery").then((r) => r.json()),
      fetch("/api/testimonials").then((r) => r.json()),
      fetch("/api/appointments").then((r) => r.json()),
    ])
      .then(([gallery, testimonials, appts]) => {
        const apptArr = Array.isArray(appts) ? appts : [];
        setStats({
          gallery: Array.isArray(gallery) ? gallery.length : 0,
          testimonials: Array.isArray(testimonials) ? testimonials.length : 0,
          appointments: apptArr.length,
          pending: apptArr.filter((a: { status: string }) => a.status === "pending").length,
        });
        setAppointments(apptArr.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Gallery Items", value: stats.gallery, icon: Images, href: "/admin/gallery" },
    { label: "Testimonials", value: stats.testimonials, icon: MessageSquare, href: "/admin/testimonials" },
    { label: "Total Appointments", value: stats.appointments, icon: Calendar, href: "/admin/appointments" },
    { label: "Pending Appointments", value: stats.pending, icon: Clock, href: "/admin/appointments" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar username={username} />

      <main className="ml-60 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Welcome back, {username || "admin"}!</p>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-4 border-forest-200 border-t-forest-600 rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {cards.map(({ label, value, icon: Icon, href }) => (
                  <Link key={label} href={href}
                    className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-forest-50 group-hover:bg-forest-100 flex items-center justify-center transition-colors">
                        <Icon className="w-5 h-5 text-forest-600" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
                    <p className="text-gray-400 text-sm">{label}</p>
                  </Link>
                ))}
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="font-semibold text-gray-900">Recent Appointments</h2>
                  <Link href="/admin/appointments" className="text-forest-600 text-sm hover:underline">
                    View all →
                  </Link>
                </div>
                {appointments.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center py-8">No appointments yet.</p>
                ) : (
                  <div className="space-y-3">
                    {appointments.map((a) => (
                      <div key={a._id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                        <div>
                          <p className="text-gray-900 text-sm font-medium">{a.name}</p>
                          <p className="text-gray-400 text-xs">{a.mobile} · {a.date} {a.timeSlot && `· ${a.timeSlot}`}</p>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          a.status === "confirmed" ? "bg-green-50 text-green-700" :
                          a.status === "cancelled" ? "bg-red-50 text-red-600" :
                          "bg-amber-50 text-amber-700"
                        }`}>
                          {a.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
