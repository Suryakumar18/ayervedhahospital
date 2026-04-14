import mongoose, { Schema, Document } from 'mongoose';

export interface IFAQItem extends Document {
  question: string;
  answer: string;
  order: number;
  active: boolean;
}

const FAQItemSchema = new Schema<IFAQItem>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

export default mongoose.models.FAQItem ||
  mongoose.model<IFAQItem>('FAQItem', FAQItemSchema);
