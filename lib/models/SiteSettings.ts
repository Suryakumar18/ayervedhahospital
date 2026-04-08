import mongoose from 'mongoose';

const SiteSettingsSchema = new mongoose.Schema({
  phone1:       { type: String, default: '+91 XXXXX XXXXX' },
  phone2:       { type: String, default: '' },
  email:        { type: String, default: 'care@bmgsiddhahospital.in' },
  whatsapp:     { type: String, default: '+91 XXXXX XXXXX' },
  address:      { type: String, default: 'Annammal Gnana Prakasam Campus,\nPaduvai Antoniyar Nagar,\nKannivadi Main Rd, Kuttathupatti (Po)\nDindigul – 624002' },
  addressShort: { type: String, default: 'Kuttathupatti, Kannivadi Rd, Dindigul – 624002' },
  opdMornStart: { type: String, default: '8:00 AM' },
  opdMornEnd:   { type: String, default: '1:00 PM' },
  opdEveStart:  { type: String, default: '4:00 PM' },
  opdEveEnd:    { type: String, default: '8:00 PM' },
  sundayStart:  { type: String, default: '8:00 AM' },
  sundayEnd:    { type: String, default: '12:00 PM' },
  mapLat:       { type: String, default: '10.377361' },
  mapLng:       { type: String, default: '77.892111' },
  notificationEmail: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema);
