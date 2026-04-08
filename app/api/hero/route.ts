import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import HeroSettings from '@/lib/models/HeroSettings';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    let hero = await HeroSettings.findOne();
    if (!hero) hero = await HeroSettings.create({});
    return NextResponse.json(hero);
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
    let hero = await HeroSettings.findOne();
    if (!hero) {
      hero = await HeroSettings.create(body);
    } else {
      Object.assign(hero, body);
      await hero.save();
    }
    return NextResponse.json(hero);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
