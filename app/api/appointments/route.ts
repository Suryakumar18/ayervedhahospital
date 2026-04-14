import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Appointment from '@/lib/models/Appointment';
import SiteSettings from '@/lib/models/SiteSettings';
import { getAdminFromCookie } from '@/lib/auth';
import { sendAdminNotification } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function GET() {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await connectDB();
    const items = await Appointment.find().sort({ createdAt: -1 });
    return NextResponse.json(items);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.name || !body.mobile) {
      return NextResponse.json({ error: 'Name and mobile are required' }, { status: 400 });
    }
    await connectDB();
    const item = await Appointment.create(body);

    // Send admin notification email (fire-and-forget)
    const settings = await SiteSettings.findOne().lean() as { notificationEmail?: string } | null;
    const notificationEmail = settings?.notificationEmail;
    if (notificationEmail) {
      sendAdminNotification(notificationEmail, {
        name: body.name,
        mobile: body.mobile,
        email: body.email,
        date: body.date,
        timeSlot: body.timeSlot,
        message: body.message,
      });
    }

    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
