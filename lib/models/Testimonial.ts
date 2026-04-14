import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  location: string;
  text: string;
  rating: number;
  treatment: string;
  type: 'text' | 'video';
  videoUrl: string;
  photoUrl: string;
  active: boolean;
  createdAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>({
  name: { type: String, required: true },
  location: { type: String, default: '' },
  text: { type: String, default: '' },
  rating: { type: Number, required: true, min: 1, max: 5, default: 5 },
  treatment: { type: String, required: true },
  type: { type: String, enum: ['text', 'video'], default: 'text' },
  videoUrl: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Testimonial ||
  mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
