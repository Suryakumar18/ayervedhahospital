import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import SiteSettings from '@/lib/models/SiteSettings';
import { getAdminFromCookie } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();
    let s = await SiteSettings.findOne();
    if (!s) s = await SiteSettings.create({});
    return NextResponse.json(s);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const admin = await getAdminFromCookie();
    if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const body = await req.json();
    let s = await SiteSettings.findOne();
    if (!s) s = await SiteSettings.create(body);
    else { Object.assign(s, body); await s.save(); }
    return NextResponse.json(s);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
