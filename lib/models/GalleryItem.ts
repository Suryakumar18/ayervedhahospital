import mongoose, { Schema, Document } from 'mongoose';

export interface IGalleryItem extends Document {
  src: string;
  caption: string;
  category: string;
  type: 'image' | 'video';
  span: string;
  order: number;
  active: boolean;
  createdAt: Date;
}

const GalleryItemSchema = new Schema<IGalleryItem>({
  src: { type: String, required: true },
  caption: { type: String, required: true },
  category: { type: String, required: true, default: 'Hospital' },
  type: { type: String, enum: ['image', 'video'], default: 'image' },
  span: { type: String, default: '' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.GalleryItem ||
  mongoose.model<IGalleryItem>('GalleryItem', GalleryItemSchema);
