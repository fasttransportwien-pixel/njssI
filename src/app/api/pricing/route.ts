import { NextResponse } from 'next/server';
import { computePricing, toPublicSummary } from '@/lib/pricing';
import { pricingInputSchema } from '@/lib/validators';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = pricingInputSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });

  const breakdown = computePricing({
    numAddresses: parsed.data.numAddresses,
    weightKg: parsed.data.weightKg ?? undefined,
    isExpress: parsed.data.isExpress,
    isCooling: parsed.data.isCooling,
    discountCode: parsed.data.discountCode ?? null,
  });

  return NextResponse.json(toPublicSummary(breakdown, !!parsed.data.discountCode));
}
