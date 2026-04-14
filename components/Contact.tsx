"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { MapPin, Phone, Clock, Send, CheckCircle, Mail, Navigation } from "lucide-react";
import { SectionLeaves } from "./Leaf3D";
import { TulsiPlant, LotusFlower } from "./HerbIllustrations";

interface SiteSettings {
  phone1: string; phone2: string; email: string; whatsapp: string; address: string;
  opdMornStart: string; opdMornEnd: string; opdEveStart: string; opdEveEnd: string;
  sundayStart: string; sundayEnd: string; mapLat: string; mapLng: string;
}

const DEFAULTS: SiteSettings = {
  phone1:"+91 XXXXX XXXXX", phone2:"", email:"care@bmgsiddhahospital.in", whatsapp:"+91 XXXXX XXXXX",
  address:"Annammal Gnana Prakasam Campus,\nKannivadi Main Rd, Kuttathupatti\nDindigul – 624002",
  opdMornStart:"8:00 AM", opdMornEnd:"1:00 PM", opdEveStart:"4:00 PM", opdEveEnd:"8:00 PM",
  sundayStart:"8:00 AM", sundayEnd:"12:00 PM", mapLat:"10.377361", mapLng:"77.892111",
};

function getTimeSlots(dateStr: string, site: SiteSettings): string[] {
  if (!dateStr) return [];
  const day = new Date(dateStr).getDay(); // 0=Sun, 6=Sat
  if (day === 0) {
    return [`Morning: ${site.sundayStart} – ${site.sundayEnd}`];
  }
  return [
    `Morning: ${site.opdMornStart} – ${site.opdMornEnd}`,
    `Evening: ${site.opdEveStart} – ${site.opdEveEnd}`,
  ];
}

// Today's date string for min attribute
const todayStr = () => new Date().toISOString().split("T")[0];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [site, setSite] = useState<SiteSettings>(DEFAULTS);
  const [treatments, setTreatments] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name:"", phone:"", email:"", concern:"", date:"", timeSlot:"", message:"" });

  useEffect(() => {
    fetch("/api/settings").then(r => r.json()).then(d => { if (d?.phone1) setSite(d); }).catch(() => {});
    fetch("/api/treatments").then(r => r.json()).then(d => {
      if (Array.isArray(d)) setTreatments(d.map((t: { name: string }) => t.name));
    }).catch(() => {});
  }, []);

  // Reset time slot when date changes
  const handleDateChange = (date: string) => {
    setForm(f => ({ ...f, date, timeSlot: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        mobile: form.phone,
        email: form.email,
        date: form.date,
        timeSlot: form.timeSlot,
        message: `${form.concern ? `[${form.concern}] ` : ""}${form.message}`,
      }),
    });
    setSubmitting(false);
    setSubmitted(true);
  };

  const timeSlots = getTimeSlots(form.date, site);

  const contactCards = [
    { icon: MapPin, label:"Address", value: site.address, color:"bg-forest-50 text-forest-700 border-forest-200", href: undefined },
    { icon: Phone, label:"Phone", value: [site.phone1, site.phone2].filter(Boolean).join("\n"), color:"bg-gold-50 text-gold-700 border-gold-200", href:`tel:${site.phone1}` },
    { icon: Mail, label:"Email", value: site.email, color:"bg-blue-50 text-blue-700 border-blue-200", href:`mailto:${site.email}` },
    { icon: Clock, label:"OPD Hours", value: `Mon–Sat: ${site.opdMornStart} – ${site.opdMornEnd}\nMon–Sat: ${site.opdEveStart} – ${site.opdEveEnd}\nSunday: ${site.sundayStart} – ${site.sundayEnd}`, color:"bg-teal-50 text-teal-700 border-teal-200", href: undefined },
  ];

  const inputCls = "w-full px-4 py-3 rounded-xl border border-cream-300 bg-cream-50 text-sm focus:outline-none focus:ring-2 focus:ring-forest-300";

  return (
    <section id="contact" ref={ref} className="py-24 bg-white relative overflow-hidden">
      <SectionLeaves count={4} colorScheme="forest" intensity="light" />
      <div className="absolute top-0 left-4 pointer-events-none hidden xl:block"><TulsiPlant size={100} className="opacity-15" /></div>
      <div className="absolute bottom-4 right-8 pointer-events-none hidden xl:block"><LotusFlower size={110} className="opacity-15" /></div>
      <div className="absolute -top-40 right-0 w-96 h-96 rounded-full bg-forest-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-gold-50 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity:0, y:30 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.8 }} className="text-center mb-16">
          <span className="inline-block text-gold-600 text-xs font-semibold tracking-widest uppercase mb-4 bg-gold-50 px-4 py-1.5 rounded-full border border-gold-200">Get In Touch</span>
          <h2 className="font-serif text-4xl sm:text-5xl text-forest-900 font-light leading-tight mb-5">Begin Your <em className="text-forest-600">Healing Journey</em></h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">Reach out to us to book a consultation, ask a question, or learn more about our Siddha treatments.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left */}
          <motion.div initial={{ opacity:0, x:-40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.8 }} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {contactCards.map((info, i) => (
                <motion.div key={info.label} initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:i*0.1, duration:0.5 }} className="p-5 bg-white rounded-2xl border border-cream-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 border ${info.color}`}><info.icon className="w-5 h-5" strokeWidth={1.5} /></div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">{info.label}</p>
                  {info.href
                    ? <a href={info.href} className="text-forest-800 text-sm font-medium hover:text-forest-600 whitespace-pre-line">{info.value}</a>
                    : <p className="text-forest-800 text-sm whitespace-pre-line">{info.value}</p>
                  }
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <motion.div initial={{ opacity:0, y:20 }} animate={inView?{opacity:1,y:0}:{}} transition={{ delay:0.4, duration:0.7 }} className="rounded-2xl overflow-hidden border border-cream-200 shadow-lg">
              <div className="bg-forest-50 px-4 py-3 flex items-center gap-2 border-b border-cream-200">
                <Navigation className="w-4 h-4 text-forest-600" />
                <span className="text-sm font-medium text-forest-800">Find Us</span>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${site.mapLat},${site.mapLng}`} target="_blank" rel="noopener noreferrer" className="ml-auto text-xs text-forest-600 hover:text-forest-800 font-medium underline">Get Directions →</a>
              </div>
              <div className="relative h-64 bg-gradient-to-br from-forest-100 to-forest-200 flex items-center justify-center">
                <div className="text-center px-8">
                  <MapPin className="w-12 h-12 text-forest-600 mx-auto mb-3" />
                  <p className="font-semibold text-forest-800 text-sm">BMG Siddha Hospital</p>
                  <p className="text-forest-600 text-xs mt-1">{site.mapLat}°N {site.mapLng}°E</p>
                  <a href={`https://www.google.com/maps?q=${site.mapLat},${site.mapLng}`} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-5 py-2 bg-forest-600 text-white text-xs font-medium rounded-full hover:bg-forest-700">Open in Google Maps</a>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right – form */}
          <motion.div initial={{ opacity:0, x:40 }} animate={inView?{opacity:1,x:0}:{}} transition={{ duration:0.8 }} className="bg-white rounded-3xl p-8 shadow-xl border border-cream-200">
            {submitted ? (
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-forest-50 flex items-center justify-center mb-5"><CheckCircle className="w-8 h-8 text-forest-600" /></div>
                <h3 className="font-serif text-2xl text-forest-900 mb-3">Thank You!</h3>
                <p className="text-gray-500 text-sm max-w-xs">Your appointment request has been received. Our team will contact you within 24 hours.</p>
                <button onClick={() => { setSubmitted(false); setForm({ name:"", phone:"", email:"", concern:"", date:"", timeSlot:"", message:"" }); }} className="mt-6 px-6 py-2.5 text-sm text-forest-600 border border-forest-200 rounded-full hover:bg-forest-50">Submit Another Request</button>
              </motion.div>
            ) : (
              <>
                <h3 className="font-serif text-2xl text-forest-900 font-semibold mb-2">Book an Appointment</h3>
                <p className="text-gray-400 text-sm mb-6">Fill out the form and our team will reach out to confirm.</p>
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name + Phone */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Full Name *</label>
                      <input type="text" required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your name" className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Phone Number *</label>
                      <input type="tel" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder={site.phone1} className={inputCls} />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Email Address</label>
                    <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder={site.email} className={inputCls} />
                  </div>

                  {/* Health Concern */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Health Concern</label>
                    <select value={form.concern} onChange={e=>setForm({...form,concern:e.target.value})} className={inputCls}>
                      <option value="">Select treatment area</option>
                      {treatments.length > 0
                        ? treatments.map(t => <option key={t} value={t}>{t}</option>)
                        : <>
                            <option>Varmam Therapy</option>
                            <option>Skin &amp; Dermatology</option>
                            <option>Chronic Disease Management</option>
                            <option>Neurological Disorders</option>
                            <option>Kayakalpa Rejuvenation</option>
                            <option>Pain Management</option>
                            <option>Paediatric Care</option>
                            <option>General Consultation</option>
                            <option>Other</option>
                          </>
                      }
                    </select>
                  </div>

                  {/* Date + Time Slot */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Preferred Date</label>
                      <input type="date" value={form.date} min={todayStr()} onChange={e=>handleDateChange(e.target.value)} onClick={e=>(e.target as HTMLInputElement).showPicker?.()} className={inputCls} />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Time Slot</label>
                      <select value={form.timeSlot} onChange={e=>setForm({...form,timeSlot:e.target.value})} className={inputCls} disabled={!form.date}>
                        <option value="">{form.date ? "Select a slot" : "Pick a date first"}</option>
                        {timeSlots.map(slot => <option key={slot} value={slot}>{slot}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2 uppercase tracking-wide">Brief Description</label>
                    <textarea rows={3} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Briefly describe your symptoms..." className={`${inputCls} resize-none`} />
                  </div>

                  <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }} type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-forest-600 to-forest-700 text-white font-semibold rounded-xl text-sm tracking-wide shadow-lg disabled:opacity-70">
                    <Send className="w-4 h-4" />
                    {submitting ? "Sending..." : "Send Appointment Request"}
                  </motion.button>

                  {/* Call Us */}
                  <p className="text-center text-xs text-gray-400">
                    Or call us directly:{" "}
                    <a href={`tel:${site.phone1}`} className="text-forest-600 font-medium hover:underline">{site.phone1}</a>
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
