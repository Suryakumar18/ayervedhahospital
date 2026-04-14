"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Images, MessageSquare, Calendar,
  LogOut, Leaf, Users, Star, Sparkles, BookOpen,
  HeartHandshake, Phone, ExternalLink, Settings, Globe
} from "lucide-react";

const SECTIONS = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard",    icon: LayoutDashboard, href: "/admin" },
    ],
  },
  {
    label: "Page Sections",
    items: [
      { label: "Hero Section",      icon: Sparkles,      href: "/admin/hero" },
      { label: "Our Story",         icon: BookOpen,      href: "/admin/about" },
      { label: "Why Choose Us",     icon: HeartHandshake, href: "/admin/why-us" },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Gallery",      icon: Images,        href: "/admin/gallery" },
      { label: "Treatments",   icon: Leaf,          href: "/admin/treatments" },
      { label: "Services",     icon: Star,          href: "/admin/services" },
      { label: "FAQs",         icon: MessageSquare, href: "/admin/faqs" },
      { label: "Testimonials", icon: Users,         href: "/admin/testimonials" },
    ],
  },
  {
    label: "Enquiries",
    items: [
      { label: "Appointments", icon: Calendar, href: "/admin/appointments" },
    ],
  },
  {
    label: "Configuration",
    items: [
      { label: "Site Settings", icon: Settings, href: "/admin/settings" },
    ],
  },
];

export default function AdminSidebar({ username }: { username?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/login");
  };

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-forest-900 flex flex-col z-50 shadow-xl">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400/30 to-gold-600/20 border border-gold-400/30 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-white text-sm font-semibold leading-tight">BMG Siddha</p>
            <p className="text-gold-400/70 text-[10px] tracking-widest uppercase">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
        {SECTIONS.map((section) => (
          <div key={section.label}>
            <p className="text-white/30 text-[9px] font-bold uppercase tracking-widest px-3 mb-1">{section.label}</p>
            <div className="space-y-0.5">
              {section.items.map(({ label, icon: Icon, href }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] transition-all ${
                    isActive(href)
                      ? "bg-white/15 text-white font-medium"
                      : "text-white/60 hover:text-white hover:bg-white/8"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* View Site */}
        <div className="border-t border-white/10 pt-3">
          <Link href="/" target="_blank"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] text-white/40 hover:text-white/70 hover:bg-white/5 transition-all">
            <Globe className="w-4 h-4 flex-shrink-0" />
            View Site
            <ExternalLink className="w-3 h-3 ml-auto" />
          </Link>
        </div>
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-2.5 px-2 mb-3">
          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-xs text-white font-bold">
            {(username || "A")[0].toUpperCase()}
          </div>
          <div>
            <p className="text-white text-xs font-medium">{username || "admin"}</p>
            <p className="text-white/30 text-[10px]">Administrator</p>
          </div>
        </div>
        <button onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/50 hover:text-white hover:bg-white/8 text-[13px] transition-all">
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
