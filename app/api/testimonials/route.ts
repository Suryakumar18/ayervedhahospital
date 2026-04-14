import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Testimonial from '@/lib/models/Testimonial';
import { getAdminFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    const items = await Testimonial.find({ active: true }).sort({ createdAt: 1 });
    return NextResponse.json(items);
  } catch (err) {
    console.error('Testimonials GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    await connectDB();
    const item = await Testimonial.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error('Testimonials POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
