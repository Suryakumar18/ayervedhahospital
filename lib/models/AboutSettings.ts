import mongoose from 'mongoose';

const TimelineItemSchema = new mongoose.Schema({
  iconName:   { type: String, default: 'Leaf' },
  year:       { type: String, default: '' },
  colorClass: { type: String, default: 'bg-forest-50 border-forest-200 text-forest-700' },
  dotClass:   { type: String, default: 'bg-forest-500' },
  title:      { type: String, default: '' },
  desc:       { type: String, default: '' },
  order:      { type: Number, default: 0 },
}, { _id: true });

const StatSchema = new mongoose.Schema({ v: String, l: String }, { _id: false });

const AboutSettingsSchema = new mongoose.Schema({
  badge:            { type: String, default: 'Our Story' },
  heading:          { type: String, default: 'A Century of' },
  headingHighlight: { type: String, default: 'Healing Wisdom' },
  topQuote:         { type: String, default: 'Long ago, in the ancient land of Tamil Nadu, the wisdom of healing flowed through the teachings of the great Siddhars — among them, the legendary Sage Bogar, who believed that nature itself held the power to cure every illness of the human body.' },
  timeline:         { type: [TimelineItemSchema], default: [] },
  closingQuote:     { type: String, default: 'As the years passed, the small clinic grew into a respected Siddha Hospital — a place where ancient wisdom and compassionate care work together, healing generations of families across Dindigul.' },
  closingAuthor:    { type: String, default: 'Antony Gnana Prabhu, Founder' },
  stats:            { type: [StatSchema], default: [{ v: '3rd', l: 'Generation' }, { v: '100+', l: 'Years' }, { v: '5000+', l: 'Patients' }] },
}, { timestamps: true });

export default mongoose.models.AboutSettings || mongoose.model('AboutSettings', AboutSettingsSchema);
