import Link from 'next/link';
import { prisma } from '@/lib/db';
import { formatEuroCents, formatDate } from '@/lib/utils';
import { StatusPill } from '@/components/admin/StatusPill';
import { requireAdmin } from '@/lib/admin-guard';

export const dynamic = 'force-dynamic';

interface DashStats {
  openOrders: number;
  inProgress: number;
  deliveredMonth: number;
  revenueMonth: number;
  latest: any[];
}

async function loadStats(): Promise<DashStats | null> {
  try {
    const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const [openOrders, inProgress, deliveredMonth, revAgg, latest] = await Promise.all([
      prisma.order.count({ where: { status: { in: ['RECEIVED', 'IN_REVIEW'] } } }),
      prisma.order.count({ where: { status: 'IN_PROGRESS' } }),
      prisma.order.count({ where: { status: 'DELIVERED', updatedAt: { gte: monthStart } } }),
      prisma.order.aggregate({
        _sum: { totalGrossCents: true, adminPriceCents: true },
        where: {
          status: { in: ['CONFIRMED', 'IN_PROGRESS', 'DELIVERED'] },
          createdAt: { gte: monthStart },
        },
      }),
      prisma.order.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true, orderNumber: true, customerName: true, status: true,
          totalGrossCents: true, adminPriceCents: true, createdAt: true,
        },
      }),
    ]);
    const revenueMonth = (revAgg._sum.adminPriceCents ?? 0) || (revAgg._sum.totalGrossCents ?? 0);
    return { openOrders, inProgress, deliveredMonth, revenueMonth, latest };
  } catch (err) {
    console.error('Dashboard query failed:', err);
    return null;
  }
}

export default async function AdminDashboard() {
  await requireAdmin();
  const stats = await loadStats();

  if (!stats) {
    return (
      <div className="card p-8 text-center">
        <h2 className="text-lg font-bold text-ink-800">Datenbank nicht erreichbar</h2>
        <p className="mt-2 text-sm text-ink-500">
          Bitte prüfen, ob <code>DATABASE_URL</code> gesetzt ist und das Schema deployt wurde
          (<code>npx prisma db push</code>).
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header><h1 className="text-2xl font-extrabold text-ink-800">Dashboard</h1></header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Offene Bestellungen" value={String(stats.openOrders)} />
        <Kpi label="In Bearbeitung" value={String(stats.inProgress)} />
        <Kpi label="Zugestellt (Monat)" value={String(stats.deliveredMonth)} />
        <Kpi label="Umsatz (Monat)" value={formatEuroCents(stats.revenueMonth)} accent />
      </div>
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="text-base font-bold text-ink-800">Neueste Bestellungen</h2>
          <Link href="/admin/orders" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            Alle anzeigen →
          </Link>
        </div>
        <table className="min-w-full divide-y divide-ink-100 text-sm">
          <thead className="bg-ink-50/60 text-left text-xs font-bold uppercase text-ink-500">
            <tr>
              <th className="px-5 py-3">#</th>
              <th className="px-5 py-3">Kunde</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Datum</th>
              <th className="px-5 py-3 text-right">Betrag</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {stats.latest.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-ink-400">Keine Bestellungen.</td></tr>
            ) : stats.latest.map((o: any) => (
              <tr key={o.id} className="hover:bg-ink-50">
                <td className="px-5 py-3 font-mono text-xs">
                  <Link className="text-brand-700 hover:underline" href={`/admin/orders/${o.id}`}>{o.orderNumber}</Link>
                </td>
                <td className="px-5 py-3">{o.customerName}</td>
                <td className="px-5 py-3"><StatusPill status={o.status} /></td>
                <td className="px-5 py-3 text-ink-500">{formatDate(o.createdAt)}</td>
                <td className="px-5 py-3 text-right font-semibold tabular-nums">
                  {formatEuroCents(o.adminPriceCents ?? o.totalGrossCents)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Kpi({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-ink-400">{label}</p>
      <p className={'mt-2 text-2xl font-extrabold ' + (accent ? 'text-brand-600' : 'text-ink-800')}>{value}</p>
    </div>
  );
}
