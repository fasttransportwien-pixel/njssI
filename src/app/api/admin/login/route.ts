import { NextResponse } from 'next/server';
import { adminLoginSchema } from '@/lib/validators';
import { ADMIN_COOKIE, adminCookieOptions, checkCredentials, createSessionToken } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = adminLoginSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'invalid' }, { status: 400 });

  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'admin not configured' }, { status: 500 });
  }
  if (!checkCredentials(parsed.data.email, parsed.data.password)) {
    return NextResponse.json({ error: 'invalid credentials' }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, token, adminCookieOptions());
  return res;
}
