import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import Admin from '@/lib/models/Admin';
import GalleryItem from '@/lib/models/GalleryItem';
import Testimonial from '@/lib/models/Testimonial';
import Treatment from '@/lib/models/Treatment';
import Service from '@/lib/models/Service';
import FAQItem from '@/lib/models/FAQItem';
import HeroSettings from '@/lib/models/HeroSettings';
import SiteSettings from '@/lib/models/SiteSettings';
import AboutSettings from '@/lib/models/AboutSettings';
import WhyUsSettings from '@/lib/models/WhyUsSettings';

const CLOUDINARY_IMAGES = [
  { src: 'https://res.cloudinary.com/dx98orvo0/video/upload/v1775364179/WhatsApp_Video_2026-04-03_at_3.44.20_PM_ob9sg5.mp4', caption: 'BMG Siddha Hospital — A Glimpse', category: 'Hospital', type: 'video', span: 'col-span-2 row-span-2', order: 0 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364174/WhatsApp_Image_2026-04-03_at_3.41.15_PM_1_whd741.jpg', caption: 'Hospital Facility', category: 'Hospital', type: 'image', span: '', order: 1 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364174/WhatsApp_Image_2026-04-03_at_3.41.15_PM_e14eqs.jpg', caption: 'Treatment Room', category: 'Treatment', type: 'image', span: '', order: 2 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364174/WhatsApp_Image_2026-04-03_at_3.41.14_PM_m9x4ub.jpg', caption: 'Siddha Consultation', category: 'Consultation', type: 'image', span: '', order: 3 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364174/WhatsApp_Image_2026-04-03_at_3.41.13_PM_zhf19u.jpg', caption: 'Herbal Medicine Preparation', category: 'Medicines', type: 'image', span: 'col-span-2', order: 4 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364174/WhatsApp_Image_2026-04-03_at_3.41.14_PM_1_ycvffl.jpg', caption: 'Varmam Therapy', category: 'Treatment', type: 'image', span: '', order: 5 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364174/WhatsApp_Image_2026-04-03_at_3.41.13_PM_2_s2gevl.jpg', caption: 'Herbal Garden', category: 'Herbs', type: 'image', span: '', order: 6 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364174/WhatsApp_Image_2026-04-03_at_3.41.13_PM_1_vqxeqe.jpg', caption: 'Traditional Healing', category: 'Treatment', type: 'image', span: '', order: 7 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364173/WhatsApp_Image_2026-04-03_at_3.41.12_PM_1_lhdwhi.jpg', caption: 'Patient Care', category: 'Consultation', type: 'image', span: '', order: 8 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364173/WhatsApp_Image_2026-04-03_at_3.41.12_PM_bccljo.jpg', caption: 'Naadi Pariksha — Pulse Diagnosis', category: 'Diagnosis', type: 'image', span: '', order: 9 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364173/WhatsApp_Image_2026-04-03_at_3.41.11_PM_rxtifu.jpg', caption: 'Siddha Medicines', category: 'Medicines', type: 'image', span: '', order: 10 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364173/WhatsApp_Image_2026-04-03_at_3.41.11_PM_1_raa2ox.jpg', caption: 'Hospital Reception', category: 'Hospital', type: 'image', span: '', order: 11 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364173/WhatsApp_Image_2026-04-03_at_3.41.10_PM_2_c8lzuk.jpg', caption: 'Lepanam Herbal Paste', category: 'Treatment', type: 'image', span: '', order: 12 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364173/WhatsApp_Image_2026-04-03_at_3.41.10_PM_mweqcp.jpg', caption: 'Herbal Decoctions', category: 'Medicines', type: 'image', span: '', order: 13 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364173/WhatsApp_Image_2026-04-03_at_3.41.09_PM_o9tqbi.jpg', caption: 'BMG Siddha Campus', category: 'Hospital', type: 'image', span: 'col-span-2', order: 14 },
  { src: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775364172/WhatsApp_Image_2026-04-03_at_3.41.10_PM_1_mw5sex.jpg', caption: 'Thokkanam Massage', category: 'Treatment', type: 'image', span: '', order: 15 },
];

const DEFAULT_TESTIMONIALS = [
  { name: 'Murugesan K.', location: 'Dindigul', text: 'I suffered from severe knee arthritis for 6 years. After just 3 months of Varmam therapy and herbal medicines at BMG Siddha, I am walking pain-free. The doctors truly listen and care deeply.', rating: 5, treatment: 'Varmam Therapy' },
  { name: 'Kamakshi S.', location: 'Palani', text: 'My daughter had persistent skin issues since childhood. Modern medicines only gave temporary relief. BMG Siddha found the root cause and in 4 months her skin is completely healed. Truly life-changing.', rating: 5, treatment: 'Siddha Dermatology' },
  { name: 'Dr. Rajendran M.', location: 'Dindigul', text: 'As a retired doctor myself, I was initially sceptical. But the scientific approach of the Siddha physicians here, combined with their knowledge of classical texts, completely won my trust.', rating: 5, treatment: 'Chronic Disease Management' },
  { name: 'Thangamuthu P.', location: 'Vedasandur', text: "Post-stroke, I had lost movement in my left hand. After 6 months of BMG Siddha's Varmam and Thokkanam treatments, I have regained about 80% mobility. I can write again!", rating: 5, treatment: 'Neurological Rehabilitation' },
  { name: 'Valarmathi D.', location: 'Oddanchatram', text: 'The Kayakalpa treatment at BMG Siddha gave me a new lease on life. My energy levels, digestion, and skin all improved dramatically. The staff treat you like family.', rating: 5, treatment: 'Kayakalpa Rejuvenation' },
];

const DEFAULT_TREATMENTS = [
  { name: 'Varmam Therapy', tamil: 'வர்மம்', category: 'Classical', description: 'Ancient Siddha technique targeting vital energy points to restore energy flow, relieve chronic pain, and heal structural disorders.', conditions: ['Paralysis', 'Joint Pain', 'Nerve Disorders', 'Headache'], image: 'https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=90', order: 0 },
  { name: 'Thokkanam Massage', tamil: 'தொக்கணம்', category: 'Classical', description: 'Siddha therapeutic massage using medicated herbal oils to balance the three humors and promote deep tissue rejuvenation.', conditions: ['Arthritis', 'Muscle Stiffness', 'Stress', 'Insomnia'], image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&q=90', order: 1 },
  { name: 'Kayakalpa', tamil: 'காயகல்பம்', category: 'Rejuvenation', description: 'The legendary Siddha anti-ageing system using rare herbs, metals, and minerals prepared through ancient alchemical processes.', conditions: ['Anti-Ageing', 'Immunity', 'Vitality', 'Longevity'], image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=90', order: 2 },
  { name: 'Herbal Decoctions', tamil: 'கஷாயம்', category: 'Internal Medicine', description: 'Precisely formulated Siddha decoctions from 100+ indigenous herbs, prepared fresh and tailored to individual constitution.', conditions: ['Diabetes', 'Liver Disorders', 'Skin Disease', 'Respiratory'], image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=90', order: 3 },
  { name: 'Lepanam Therapy', tamil: 'லேபனம்', category: 'External', description: 'Medicated herbal paste applications on affected body areas — highly effective for inflammatory conditions and skin disorders.', conditions: ['Skin Disorders', 'Swelling', 'Psoriasis', 'Eczema'], image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=90', order: 4 },
  { name: 'Naadi Pariksha', tamil: 'நாடி பரிட்சை', category: 'Diagnosis', description: 'The ancient pulse diagnosis technique — a skilled physician reads the subtle pulse to determine body constitution and root cause of disease.', conditions: ['Full Assessment', 'Dosha Analysis', 'Health Check', 'Prevention'], image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800&q=90', order: 5 },
];

const DEFAULT_SERVICES = [
  { iconName: 'Stethoscope', title: 'OPD Consultations', desc: 'Daily outpatient consultations with experienced Siddha physicians. Naadi pariksha and comprehensive health assessment.', color: 'bg-forest-50 text-forest-700 border-forest-200', order: 0 },
  { iconName: 'Activity', title: 'Chronic Disease Care', desc: 'Specialised management of diabetes, hypertension, arthritis, kidney ailments, and other lifestyle diseases through Siddha protocols.', color: 'bg-amber-50 text-amber-700 border-amber-200', order: 1 },
  { iconName: 'Brain', title: 'Neurological Disorders', desc: 'Varmam-based treatment for paralysis, stroke rehabilitation, sciatica, migraine, and other neurological conditions.', color: 'bg-purple-50 text-purple-700 border-purple-200', order: 2 },
  { iconName: 'Baby', title: 'Paediatric Siddha Care', desc: 'Gentle, safe Siddha treatments for children — from newborn care to adolescent health issues, including immune building.', color: 'bg-pink-50 text-pink-700 border-pink-200', order: 3 },
  { iconName: 'FlameKindling', title: 'Skin & Dermatology', desc: 'Deep-rooted treatment for psoriasis, eczema, vitiligo, and other skin disorders using classical Siddha internal and external medicines.', color: 'bg-orange-50 text-orange-700 border-orange-200', order: 4 },
  { iconName: 'TreeDeciduous', title: 'Panchakarma Detox', desc: 'Complete body purification programmes using Siddha\'s Kayakalpa principles — eliminate toxins and rejuvenate the body at a cellular level.', color: 'bg-teal-50 text-teal-700 border-teal-200', order: 5 },
  { iconName: 'ShieldCheck', title: 'Preventive Health', desc: 'Seasonal Siddha wellness protocols, immune-boosting regimens, and body constitution analysis for proactive health management.', color: 'bg-blue-50 text-blue-700 border-blue-200', order: 6 },
  { iconName: 'Zap', title: 'Pain Management', desc: 'Non-invasive relief for joint pain, back pain, sports injuries, and post-surgical recovery through Thokkanam and Varmam.', color: 'bg-rose-50 text-rose-700 border-rose-200', order: 7 },
];

const DEFAULT_FAQS = [
  { question: 'What is Siddha medicine and how is it different from Ayurveda?', answer: 'Siddha is one of the oldest medical systems in the world, originating from the Tamil Siddhar saints of South India. While Ayurveda originated in Sanskrit tradition, Siddha is rooted in the Tamil tradition and focuses on a unique combination of herbs, minerals, metals and energy-based therapies like Varmam. Both systems aim to restore balance but use different texts, herbs, and treatment protocols.', order: 0 },
  { question: 'Is Siddha medicine safe? Are there any side effects?', answer: 'Yes, when administered by qualified Siddha physicians, it is very safe. All our medicines are prepared from natural herbs, minerals and metals that undergo classical purification processes. Unlike synthetic drugs, properly prepared Siddha medicines have minimal side effects. However, self-medication without a physician\'s guidance is not recommended.', order: 1 },
  { question: 'How long does a Siddha treatment course typically take?', answer: 'It depends on the condition. Acute conditions may improve within 1–2 weeks. Chronic conditions like psoriasis, arthritis, neurological disorders, or diabetes typically require 3–6 months of consistent treatment. Kayakalpa rejuvenation programmes are usually 21–90 days. Our physicians will give you a realistic timeline after the initial consultation.', order: 2 },
  { question: 'What happens during the first consultation (Naadi Pariksha)?', answer: 'Our physician will first take a detailed history of your health complaints, lifestyle, diet and family history. Then they will perform Naadi Pariksha (pulse diagnosis) — reading your pulse to understand your body constitution (Prakriti) and the imbalance causing your illness. Based on this, a personalised treatment plan including internal medicines, external therapies and diet advice will be prepared.', order: 3 },
  { question: 'Can Siddha treatment be combined with modern/allopathic medicines?', answer: 'In most cases, yes — but always inform both your doctors. Our physicians are trained to work alongside modern medicine, especially for chronic conditions where patients may be on long-term medications. In many cases, as Siddha treatment progresses, the need for allopathic medicines reduces naturally.', order: 4 },
  { question: 'Do you offer treatments for children?', answer: 'Yes, we have specialised paediatric Siddha care. Siddha has a rich tradition of gentle, safe treatments for children — from newborn care to teenage health. Our formulations for children use mild herbs and lower dosages tailored to their age and constitution.', order: 5 },
  { question: 'What are your consultation charges and OPD timings?', answer: 'Our OPD runs Monday to Saturday: 8 AM – 1 PM and 4 PM – 8 PM. Sundays: 8 AM – 12 PM. Please contact us directly for current consultation charges. We believe in making authentic Siddha healing accessible to all.', order: 6 },
  { question: 'Can I book an appointment online or by phone?', answer: "Yes! You can book a consultation using the 'Book Consultation' button on this website, or call/WhatsApp us directly. Walk-in patients are also welcome during OPD hours, though prior appointments are preferred to reduce waiting time.", order: 7 },
];

export async function GET() {
  try {
    await connectDB();

    // Admin
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('bmg@admin123', 12);
      await Admin.create({ username: 'admin', password: hashedPassword });
    }

    // Gallery
    const galleryCount = await GalleryItem.countDocuments();
    if (galleryCount === 0) await GalleryItem.insertMany(CLOUDINARY_IMAGES);

    // Testimonials
    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0) await Testimonial.insertMany(DEFAULT_TESTIMONIALS);

    // Treatments
    const treatmentCount = await Treatment.countDocuments();
    if (treatmentCount === 0) await Treatment.insertMany(DEFAULT_TREATMENTS);

    // Services
    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0) await Service.insertMany(DEFAULT_SERVICES);

    // FAQs
    const faqCount = await FAQItem.countDocuments();
    if (faqCount === 0) await FAQItem.insertMany(DEFAULT_FAQS);

    // Hero Settings
    const heroCount = await HeroSettings.countDocuments();
    if (heroCount === 0) await HeroSettings.create({});

    // Site Settings
    const siteCount = await SiteSettings.countDocuments();
    if (siteCount === 0) await SiteSettings.create({});

    // About Settings
    const aboutCount = await AboutSettings.countDocuments();
    if (aboutCount === 0) await AboutSettings.create({
      timeline: [
        { iconName: 'BookOpen', year: '~100 Years Ago', colorClass: 'bg-amber-50 border-amber-200 text-amber-700', dotClass: 'bg-amber-400', title: 'The First Generation', desc: 'The journey of healing began with Gnana Prakasham, who devoted his life to the ancient art of Siddha medicine. Following the teachings of the legendary Sage Bogar, he believed that nature itself holds the power to cure every illness of the human body.', order: 0 },
        { iconName: 'Leaf', year: '2nd Generation', colorClass: 'bg-forest-50 border-forest-200 text-forest-700', dotClass: 'bg-forest-500', title: 'Arulanatham Carries the Torch', desc: 'His son Arulanatham faithfully continued the sacred tradition — preparing herbs, conducting treatments, and keeping alive the ancient formulations passed down through generations.', order: 1 },
        { iconName: 'GraduationCap', year: '2010 – 2013', colorClass: 'bg-blue-50 border-blue-200 text-blue-700', dotClass: 'bg-blue-500', title: 'Education & Modern Vision', desc: 'Antony Gnana Prabhu, son of Arulanatham, pursued his MSW at the prestigious Loyola College, Chennai. From childhood, he watched elders gather herbs, prepare medicines, and heal people — without expensive machines or chemicals.', order: 2 },
        { iconName: 'Building2', year: 'August 2023', colorClass: 'bg-gold-50 border-gold-200 text-gold-700', dotClass: 'bg-gold-500', title: 'A Dream Takes Shape', desc: 'After years of learning the traditional art of Siddha medicine, the building of BMG Siddha Hospital was started — a place where people from all walks of life could receive natural healing, with the blessings of his teachers and the guidance of ancient texts.', order: 3 },
        { iconName: 'Heart', year: 'Today', colorClass: 'bg-rose-50 border-rose-200 text-rose-700', dotClass: 'bg-rose-500', title: 'BMG Siddha Hospital', desc: 'What began as a humble clinic has grown into a respected Siddha Hospital — a place where ancient wisdom and compassionate care work together. The story of healing continues, one patient at a time.', order: 4 },
      ],
    });

    // WhyUs Settings
    const whyUsCount = await WhyUsSettings.countDocuments();
    if (whyUsCount === 0) await WhyUsSettings.create({
      reasons: [
        { iconName: 'CheckCircle2', title: 'Qualified Siddha Physicians', desc: 'BSMS/MD (Siddha) degree holders with deep practical training in classical Siddha medicine.', color: 'bg-forest-600', order: 0 },
        { iconName: 'Leaf', title: '100% Natural Medicines', desc: 'All medicines prepared in-house from organic, wild-harvested and sustainably sourced herbs. Zero synthetic additives.', color: 'bg-gold-500', order: 1 },
        { iconName: 'FlaskConical', title: 'Classical Preparations', desc: 'We follow exact formulations from Agasthiyar\'s texts — Mezhugu, Chendooram, Mathirai, Kashayam and more.', color: 'bg-teal-600', order: 2 },
        { iconName: 'Users', title: 'Personalised Treatment Plans', desc: 'Every patient receives a treatment tailored to their unique constitution (Prakriti), pulse reading and medical history.', color: 'bg-amber-500', order: 3 },
        { iconName: 'MapPin', title: 'Peaceful Natural Setting', desc: 'Located on a lush campus in Kuttathupatti — the serene surroundings complement and enhance the healing process.', color: 'bg-rose-500', order: 4 },
      ],
    });

    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully',
      credentials: { username: 'admin', password: 'bmg@admin123' },
    });
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: 'Seed failed', details: String(err) }, { status: 500 });
  }
}
