import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/auth';
import { nextInvoiceNumber } from '@/lib/order-number';
import { getPricingConfig } from '@/lib/pricing';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(_req: Request, ctx: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  try {
    const order = await prisma.order.findUnique({
      where: { id: ctx.params.id },
      include: { invoice: true },
    });
    if (!order) return NextResponse.json({ error: 'not found' }, { status: 404 });
    if (order.invoice) return NextResponse.json(order.invoice);

    const cfg = getPricingConfig();
    const grossCents = order.adminPriceCents ?? order.totalGrossCents;
    const netCents = Math.round(grossCents / (1 + cfg.vatRate));
    const vatCents = grossCents - netCents;

    const invoiceNumber = await nextInvoiceNumber();
    const description = `${order.numAddresses} Adressen – ${(grossCents / 100).toFixed(2).replace('.', ',')} €`;
    const customerAddress = [order.customerCompany, order.pickupAddress].filter(Boolean).join(' · ') || '–';

    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        orderId: order.id,
        customerName: order.customerName,
        customerAddress,
        description,
        netCents,
        vatCents,
        grossCents,
      },
    });

    return NextResponse.json(invoice);
  } catch (err) {
    console.error('Invoice create failed:', err);
    return NextResponse.json({ error: 'create failed' }, { status: 500 });
  }
}
