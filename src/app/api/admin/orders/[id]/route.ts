import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/auth';
import { adminPatchSchema } from '@/lib/validators';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function PATCH(req: Request, ctx: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }
  const parsed = adminPatchSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'invalid' }, { status: 400 });

  const update: any = {};
  if (parsed.data.status) update.status = parsed.data.status;
  if (parsed.data.adminPriceGrossEuros !== undefined) {
    update.adminPriceCents = Math.round(parsed.data.adminPriceGrossEuros * 100);
  }
  if (parsed.data.adminNote !== undefined) update.adminNote = parsed.data.adminNote ?? null;

  try {
    const order = await prisma.order.update({ where: { id: ctx.params.id }, data: update });
    return NextResponse.json({ ok: true, order });
  } catch (err) {
    console.error('Order update failed:', err);
    return NextResponse.json({ error: 'update failed' }, { status: 500 });
  }
}
