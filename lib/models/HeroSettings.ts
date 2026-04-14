import mongoose from 'mongoose';

const StatSchema = new mongoose.Schema({ value: String, label: String }, { _id: false });

const HeroSettingsSchema = new mongoose.Schema({
  backgroundImage: { type: String, default: 'https://res.cloudinary.com/dx98orvo0/image/upload/v1775367195/weed-leaves-oil-product-still-life_jqpa3h.jpg' },
  badge: { type: String, default: 'Ancient Siddha Wisdom · Since 2004' },
  heading: { type: String, default: 'BMG Siddha' },
  headingHighlight: { type: String, default: 'Hospital' },
  tamil: { type: String, default: '✦ சித்த மருத்துவம் · ஆரோக்கியமான வாழ்வு ✦' },
  subtitle: { type: String, default: "Rooted in the timeless science of Siddha medicine — healing body, mind and soul through the sacred power of nature's finest herbs and ancient wisdom." },
  stats: { type: [StatSchema], default: [{ value: '5000+', label: 'Patients Healed' }, { value: '20+', label: 'Years of Care' }, { value: '100+', label: 'Siddha Herbs' }] },
  ctaPrimary: { type: String, default: 'Book Consultation' },
  ctaSecondary: { type: String, default: 'View Treatments' },
  herbBadges: { type: [String], default: ['🌿 Tulsi', '🍃 Neem', '🌸 Lotus', '💛 Turmeric', '🌱 Ashwagandha'] },
  address: { type: String, default: '📍 Kuttathupatti, Kannivadi Rd, Dindigul – 624002' },
  whatsappNumber: { type: String, default: '+91 98765 43210' },
  callNumber: { type: String, default: '+91 98765 43210' },
}, { timestamps: true });

export default mongoose.models.HeroSettings || mongoose.model('HeroSettings', HeroSettingsSchema);
