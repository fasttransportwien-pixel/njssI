import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { createOrderSchema } from '@/lib/validators';
import { computePricing } from '@/lib/pricing';
import { nextOrderNumber } from '@/lib/order-number';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }); }

  const parsed = createOrderSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 400 });
  }
  const data = parsed.data;

  const breakdown = computePricing({
    numAddresses: data.stops.length,
    weightKg: data.weightKg ?? undefined,
    isExpress: data.isExpress,
    isCooling: data.isCooling,
    discountCode: data.discountCode ?? null,
  });

  try {
    const orderNumber = await nextOrderNumber();

    const order = await prisma.order.create({
      data: {
        orderNumber,
        status: 'RECEIVED',
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        customerCompany: data.customerCompany ?? null,
        serviceType: data.serviceType,
        goodsType: data.goodsType ?? null,
        weightKg: data.weightKg ?? null,
        isExpress: data.isExpress ?? false,
        isCooling: data.isCooling ?? false,
        pickupAddress: data.pickupAddress,
        pickupLat: data.pickupLat ?? null,
        pickupLng: data.pickupLng ?? null,
        scheduledDate: new Date(data.scheduledDate),
        scheduledTime: data.scheduledTime ?? null,
        notes: data.notes ?? null,
        stops: {
          create: data.stops.map((s, i) => ({
            position: i,
            address: s.address,
            lat: s.lat ?? null,
            lng: s.lng ?? null,
            contact: s.contact ?? null,
          })),
        },
        subtotalGrossCents: breakdown.subtotalGrossCents,
        discountCents: breakdown.discountCents,
        totalGrossCents: breakdown.totalGrossCents,
        appliedDiscountCode: breakdown.appliedDiscountCode,
        numAddresses: breakdown.numAddresses,
      },
    });

    return NextResponse.json({ ok: true, orderNumber, id: order.id });
  } catch (err) {
    console.error('Order creation failed:', err);
    return NextResponse.json({ error: 'Datenbank nicht erreichbar. Bitte später erneut versuchen.' }, { status: 503 });
  }
}
