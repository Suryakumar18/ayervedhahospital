import mongoose, { Schema, Document } from 'mongoose';

export interface ITreatment extends Document {
  name: string;
  tamil: string;
  category: string;
  description: string;
  conditions: string[];
  image: string;
  order: number;
  active: boolean;
}

const TreatmentSchema = new Schema<ITreatment>({
  name: { type: String, required: true },
  tamil: { type: String, default: '' },
  category: { type: String, default: 'Classical' },
  description: { type: String, required: true },
  conditions: [{ type: String }],
  image: { type: String, required: true },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
});

export default mongoose.models.Treatment ||
  mongoose.model<ITreatment>('Treatment', TreatmentSchema);
