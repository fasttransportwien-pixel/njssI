import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { contactSchema } from '@/lib/validators';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid' }, { status: 400 });

  try {
    await prisma.contactMessage.create({ data: parsed.data });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact save failed:', err);
    return NextResponse.json({ error: 'Datenbank nicht erreichbar.' }, { status: 503 });
  }
}
