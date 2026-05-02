import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { isAdmin } from '@/lib/auth';
import { buildInvoicePdf } from '@/lib/invoice-pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, ctx: { params: { id: string } }) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

  try {
    const invoice = await prisma.invoice.findUnique({
      where: { id: ctx.params.id },
      include: { order: true },
    });
    if (!invoice) return NextResponse.json({ error: 'not found' }, { status: 404 });

    const customerLines: string[] = [];
    if (invoice.order.customerCompany) customerLines.push(invoice.order.customerCompany);
    customerLines.push(invoice.customerAddress);

    const pdfBytes = await buildInvoicePdf({
      invoiceNumber: invoice.invoiceNumber,
      issuedAt: invoice.issuedAt,
      dueDays: invoice.dueDays,
      customer: { name: invoice.customerName, addressLines: customerLines.filter(Boolean) },
      company: {
        name: 'Fast Transport Wien E.U.',
        addressLines: ['Walter/Jurmann/Gasse 5A/4/16, 1230 Wien'],
        phone: '+43 676 4507663',
        email: 'fasttransportwien@gmail.com',
        uid: 'ATU82169528',
        iban: 'AT95 2011 1844 4323 3703',
      },
      items: [{ label: invoice.description, grossCents: invoice.grossCents }],
      netCents: invoice.netCents,
      vatCents: invoice.vatCents,
      grossCents: invoice.grossCents,
    });

    return new NextResponse(Buffer.from(pdfBytes), {
      status: 200,
      headers: {
        'content-type': 'application/pdf',
        'content-disposition': `inline; filename="${invoice.invoiceNumber}.pdf"`,
        'cache-control': 'private, max-age=0, must-revalidate',
      },
    });
  } catch (err) {
    console.error('Invoice PDF failed:', err);
    return NextResponse.json({ error: 'pdf failed' }, { status: 500 });
  }
}
