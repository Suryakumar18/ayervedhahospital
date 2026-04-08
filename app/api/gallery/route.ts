import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import GalleryItem from '@/lib/models/GalleryItem';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const items = await GalleryItem.find({ active: true }).sort({ order: 1, createdAt: 1 });
    return NextResponse.json(items);
  } catch (err) {
    console.error('Gallery GET error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await req.json();
    await connectDB();
    const item = await GalleryItem.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error('Gallery POST error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
