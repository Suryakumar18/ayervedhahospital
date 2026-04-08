import { NextRequest, NextResponse } from 'next/server';
import { getAdminFromCookie } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const admin = await getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    return NextResponse.json(
      { error: 'Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME and CLOUDINARY_UPLOAD_PRESET in .env.local' },
      { status: 500 }
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const resourceType = (formData.get('resourceType') as string) || 'image';

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

    const cloudFormData = new FormData();
    cloudFormData.append('file', file);
    cloudFormData.append('upload_preset', uploadPreset);
    cloudFormData.append('folder', 'bmg-testimonials');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
      { method: 'POST', body: cloudFormData }
    );

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ error: data.error?.message || 'Upload failed' }, { status: 400 });
    }

    return NextResponse.json({ url: data.secure_url, publicId: data.public_id });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
