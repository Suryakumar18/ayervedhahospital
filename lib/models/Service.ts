import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  iconName: string;
  title: string;
  desc: string;
  color: string;
  order: number;
  active: boolean;
}

const ServiceSchema = new Schema<IService>({
  iconName: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  color: { type: String, default: 'bg-forest-50 text-forest-700 border-forest-200' },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

export default mongoose.models.Service ||
  mongoose.model<IService>('Service', ServiceSchema);
