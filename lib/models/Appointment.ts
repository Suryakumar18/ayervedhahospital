import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  name: string;
  mobile: string;
  email: string;
  message: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, default: '' },
  message: { type: String, default: '' },
  date: { type: String, default: '' },
  timeSlot: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Appointment ||
  mongoose.model<IAppointment>('Appointment', AppointmentSchema);
