import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Appointment from '@/lib/models/Appointment';
import { getAdminFromCookie } from '@/lib/auth';
import { sendPatientConfirmation } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    await connectDB();

    const prev = await Appointment.findById(params.id).lean() as {
      status?: string; name: string; mobile: string; email?: string;
      date?: string; timeSlot?: string; message?: string;
    } | null;

    const item = await Appointment.findByIdAndUpdate(params.id, body, { new: true });
    if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    // Send patient confirmation when status changes to "confirmed"
    if (body.status === 'confirmed' && prev?.status !== 'confirmed' && prev?.email) {
      sendPatientConfirmation({
        name: prev.name,
        mobile: prev.mobile,
        email: prev.email,
        date: prev.date,
        timeSlot: prev.timeSlot,
        message: prev.message,
      });
    }

    return NextResponse.json(item);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    await Appointment.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
