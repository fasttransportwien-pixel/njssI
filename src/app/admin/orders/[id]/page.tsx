import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { formatEuroCents, formatDate } from '@/lib/utils';
import { OrderEditor } from '@/components/admin/OrderEditor';
import { requireAdmin } from '@/lib/admin-guard';

export const dynamic = 'force-dynamic';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  await requireAdmin();

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { stops: { orderBy: { position: 'asc' } }, invoice: true },
  }).catch(() => null);

  if (!order) return notFound();

  const finalGross = order.adminPriceCents ?? order.totalGrossCents;

  return (
    <div className="space-y-5">
      <Link href="/admin/orders" className="btn-ghost text-sm">
        <ArrowLeft className="h-4 w-4" /> Zurück
      </Link>
      <header>
        <h1 className="text-2xl font-extrabold text-ink-800">
          Auftragsdetails · <span className="font-mono text-base text-ink-500">{order.orderNumber}</span>
        </h1>
      </header>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="card p-5 md:col-span-2">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-600">Kunde & Logistik</h2>
          <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
            <Item k="Kunde" v={`${order.customerName}${order.customerCompany ? ' (' + order.customerCompany + ')' : ''}`} />
            <Item k="E-Mail" v={order.customerEmail} />
            <Item k="Telefon" v={order.customerPhone} />
            <Item k="Service" v={`${order.serviceType}${order.isExpress ? ' · Express' : ''}${order.isCooling ? ' · Kühlung' : ''}`} />
            <Item k="Ware" v={`${order.goodsType || '–'}${order.weightKg ? ` (${order.weightKg} kg)` : ''}`} />
            <Item k="Datum" v={`${formatDate(order.scheduledDate)}${order.scheduledTime ? ' · ' + order.scheduledTime : ''}`} />
            <Item k="Abholung" v={order.pickupAddress} />
            <Item k="Anzahl Adressen" v={String(order.numAddresses)} />
            <Item k="Notizen" v={order.notes || '–'} full />
          </dl>
          <h3 className="mt-5 text-xs font-bold uppercase tracking-wide text-ink-400">Lieferadressen</h3>
          <ol className="mt-2 space-y-1 text-sm text-ink-700">
            {order.stops.map((s) => (
              <li key={s.id} className="rounded-md bg-ink-50 px-3 py-1.5">
                <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">{s.position + 1}</span>
                {s.address}{s.contact ? ` · ${s.contact}` : ''}
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-5">
          <div className="card p-5">
            <h2 className="text-sm font-bold uppercase tracking-wide text-brand-600">Preis</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row k="Zwischensumme" v={formatEuroCents(order.subtotalGrossCents)} />
              <Row k="Rabatt" v={`−${formatEuroCents(order.discountCents)}`} />
              <div className="my-2 border-t border-ink-100" />
              <Row k="Ursprünglicher Preis" v={formatEuroCents(order.totalGrossCents)} />
              <Row k="Finaler Preis" v={formatEuroCents(finalGross)} bold />
            </dl>
            {order.appliedDiscountCode && (
              <p className="mt-2 text-xs text-ink-500">Code: <strong>{order.appliedDiscountCode}</strong></p>
            )}
          </div>
          <OrderEditor
            orderId={order.id}
            currentStatus={order.status}
            currentAdminPriceEuros={order.adminPriceCents == null ? '' : (order.adminPriceCents / 100).toFixed(2)}
            currentNote={order.adminNote || ''}
            invoiceId={order.invoice?.id || null}
            invoiceNumber={order.invoice?.invoiceNumber || null}
          />
        </div>
      </div>
    </div>
  );
}

function Item({ k, v, full }: { k: string; v: string; full?: boolean }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <dt className="text-xs font-bold uppercase tracking-wide text-ink-400">{k}</dt>
      <dd className="text-ink-800">{v}</dd>
    </div>
  );
}
function Row({ k, v, bold }: { k: string; v: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className={'text-ink-600 ' + (bold ? 'font-bold text-ink-800' : '')}>{k}</span>
      <span className={'tabular-nums ' + (bold ? 'text-lg font-extrabold text-brand-600' : 'font-semibold text-ink-800')}>{v}</span>
    </div>
  );
}
