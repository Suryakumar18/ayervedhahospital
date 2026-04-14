import mongoose from 'mongoose';

const ReasonSchema = new mongoose.Schema({
  iconName: { type: String, default: 'CheckCircle2' },
  title:    { type: String, default: '' },
  desc:     { type: String, default: '' },
  color:    { type: String, default: 'bg-forest-600' },
  order:    { type: Number, default: 0 },
  active:   { type: Boolean, default: true },
}, { _id: true });

const StatSchema = new mongoose.Schema({ num: String, label: String }, { _id: false });

const WhyUsSettingsSchema = new mongoose.Schema({
  badge:            { type: String, default: 'Why Choose Us' },
  heading:          { type: String, default: 'Healing the Way' },
  headingHighlight: { type: String, default: 'Nature Intended' },
  subheading:       { type: String, default: 'In a world of rushed appointments and generic prescriptions, BMG Siddha Hospital offers something different — the gift of time, attention and a healing philosophy that honours the complexity of the human body.' },
  ctaText:          { type: String, default: 'Start Your Healing Journey' },
  stats:            { type: [StatSchema], default: [{ num: '5000+', label: 'Patients Treated' }, { num: '98%', label: 'Satisfaction Rate' }, { num: '100+', label: 'Herbs in Use' }] },
  reasons:          { type: [ReasonSchema], default: [] },
}, { timestamps: true });

export default mongoose.models.WhyUsSettings || mongoose.model('WhyUsSettings', WhyUsSettingsSchema);
